import React from 'react';
import Css from "../../../assets/css/home/index/index.css"
import Swiper from "../../../assets/js/libs/swiper"
import "../../../assets/css/common/swiper.css"
import {request} from "../../../assets/js/utils/request";
import config from "../../../assets/js/conf/config";
import {connect} from 'react-redux';
import {setScrollTop} from "../../../assets/js/utils/util";
import global from "../../../assets/js/conf/global"
import SearchComponent from "../../../components/search/search";
import HeaderComponent from "../../../components/header/subheader";
class Index extends React.Component {

    constructor() {
        super();
        this.state = {
            aSwiper: [],
            aNav: [],
            aGoods: [],
            bScroll:false,
            search:{display:"none"}
        }
    }

    componentDidMount() {
        setScrollTop( global.scrollTop.index);
        this.getSwiper();
        this.getNav();
        this.getGoodsLevel();
        window.addEventListener("scroll",this.eventScroll.bind(this),false);
    };
    componentWillUnmount() {
        //防止内存溢出
        window.removeEventListener("scroll",this.eventScroll.bind(this));
        this.setState=(state,callback)=>{
            return;
        }
    };
    eventScroll(){
        let iScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
        global.scrollTop.index=iScrollTop;
        //console.log( global.scrollTop.index);
        if(iScrollTop>=80){
            this.setState({bScroll:true});
        }else {
            this.setState({bScroll:false});
        }
    };

    getSwiper() {
        request(config.baseURL + "/api/home/index/slide?token=" + config.token).then(res => {
            if (res.code === 200) {
                this.setState({aSwiper: res.data}, () => {
                    var mySwiper = new Swiper(this.refs['swiper-wrap'], {
                        autoplay: 2000,//可选选项，自动滑动
                        pagination: '.swiper-pagination',
                        disableOnInteraction: false
                    })
                });
            }
        });
    };
    //快速导航
    getNav() {
        request(config.baseURL + "/api/home/index/nav?token=" + config.token).then(res => {
            if (res.code === 200) {
                this.setState({aNav: res.data});
            }
        })
    };
    //商品内容
    getGoodsLevel() {
        request(config.baseURL + "/api/home/index/goodsLevel?token=" + config.token).then(res => {
            if (res.code === 200) {
                this.setState({aGoods: res.data});
            }
        })
    };
    //跳转页面
    pushPage(url){
        this.props.history.push(config.path+url);
    };
    //打开搜索页面，向子组件传值
    changeSearch(){
        this.setState({search:{"display":"block"}})
    };
    //关闭搜索页面（接收从子组件传过来的值）
    getStyle(val){
        this.setState({search:val});
    };

    render() {
        return (
            <div className={Css['page']}>
                {/*顶部搜索栏*/}
                <div className={this.state.bScroll?Css['header-search'] + " " + Css['red-bg']:Css['header-search']}>
                    <div className={Css['classify-icon']} onClick={this.pushPage.bind(this,"goods/classify/items")}></div>
                    <div className={Css['search-wrap']} onClick={this.changeSearch.bind(this)}>
                        <div className={Css['search-icon']}></div>
                        <div className={Css['search-text']}>请输入宝贝名称</div>
                    </div>
                    <div className={Css['login-wrap']}>
                        {
                            this.props.state.user.isLogin?<div className={Css["my"]} onClick={this.pushPage.bind(this,"home/my")}></div>:
                                <div className={Css['login-text']} onClick={this.pushPage.bind(this,"login/index")}>登录</div>
                        }
                    </div>
                </div>
                {/*顶部幻灯片*/}
                <div ref="swiper-wrap" className={Css['swiper-wrap']}>
                    <div className="swiper-wrapper">
                        {this.state.aSwiper ?
                            this.state.aSwiper.map((item, index) => {
                                return (
                                    <div key={index} className="swiper-slide"><a href={item.webs}><img src={item.image}
                                                                                                       alt={item.title}/></a>
                                    </div>
                                )
                            }) : ""
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                {/*中部快速导航*/}
                <div className={Css['quick-nav']}>
                    {this.state.aNav ?
                        this.state.aNav.map((item, index) => {
                            return (
                                <ul className={Css['item']} key={index}>
                                    <li className={Css['item-img']}><img src={item.image} alt={item.title}
                                    onClick={this.pushPage.bind(this,"goods/classify/items?cid="+item.cid)}/></li>
                                    <li className={Css['item-text']}>{item.title}</li>
                                </ul>
                            )
                        }) : ""
                    }
                </div>
                {/*商品分类*/}
                {
                    this.state.aGoods ?
                        this.state.aGoods.map((item, index) => {
                            return (
                                <div className={Css['goods-level-wrap']} key={index}>
                                    <div
                                        className={Css['classify-title'] + " " + Css['color' + (index + 1)]}>{item.title}</div>
                                    {/*  index 1：品牌男装*/}
                                    {index % 2 === 1 ?
                                        <div className={Css['goods-level1-wrap']}>
                                            {   item.items?
                                                item.items.slice(0,2).map((item2,index2)=>{
                                                    return(
                                                        <div className={Css['goods-level1-item0']} key={index2} onClick={this.pushPage.bind(this,"goods/details/item?gid="+item2.gid)}>
                                                            <div className={Css['goods-title2']}>{item2.title}</div>
                                                            <div className={Css['goods-text2']}>火爆开售</div>
                                                            <div className={Css['goods-img2']}><img src={item2.image} alt={item2.title}/></div>
                                                        </div>
                                                    )
                                                }):""
                                            }

                                        </div>
                                        //index0,3:其他分类
                                        : <div className={Css['goods-level1-wrap']}>
                                            <div className={Css['goods-level1-item0']}
                                                 onClick={this.pushPage.bind(this,"goods/details/item?gid="+(item.items[0].gid?item.items[0].gid:""))}>
                                                <div className={Css['goods-title']}>{item.items[0].title}</div>
                                                <div className={Css['goods-text']}>精品打折</div>
                                                <div className={Css['goods-price' + (index + 1)]}>{item.items[0].price}</div>
                                                <div className={Css['goods-img']}><img src={item.items[0].image}/></div>
                                            </div>
                                            <div className={Css['goods-level1-item1']}>
                                                {item.items?
                                                    item.items.slice(1,3).map((item2,index2)=>{
                                                        return(
                                                            <div className={Css['goods-row']} key={index2} onClick={this.pushPage.bind(this,"goods/details/item?gid="+item2.gid)}>
                                                                <div
                                                                    className={Css['goods-row-title']}>{item2.title}
                                                                </div>
                                                                <div className={Css['goods-row-text']}>品质精选</div>
                                                                <div className={Css['goods-row-img']}><img src={item2.image} alt={item2.title}/></div>
                                                            </div>
                                                        )
                                                    }):""
                                                }

                                            </div>
                                        </div>}
                                    <div className={Css['goods-list-wrap']}>
                                        {
                                            item.items?
                                                item.items.slice(index%2===1?2:3).map((item2,index2)=>{
                                                    return(
                                                        <div className={Css['goods-list']} key={index2} onClick={this.pushPage.bind(this,"goods/details/item?gid="+item2.gid)}>
                                                            <div className={Css['title']}>{item2.title}</div>
                                                            <div className={Css['img']}><img src={item2.image} alt={item2.title}/></div>
                                                            <div className={Css['price']}>{item2.price}</div>
                                                            <div className={Css['unprice']}>{item2.price*2}</div>
                                                        </div>
                                                    )
                                                }):""
                                        }

                                    </div>
                                </div>)
                        }) : ""
                }
                <SearchComponent pageStyle={this.state.search} childStyle={this.getStyle.bind(this)}></SearchComponent>
            </div>

        )
    }
}

export default connect((state)=>{
    return {state:state}
})(Index);
