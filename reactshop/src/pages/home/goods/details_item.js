import React from 'react';
import Css from '../../../assets/css/home/goods/details-item.css'
import {request} from "../../../assets/js/utils/request";
import {ReactDOM} from 'react-dom'
import {withRouter} from "react-router"
import config from "../../../assets/js/conf/config";
import Swiper from "../../../assets/js/libs/swiper";
import {Toast} from "antd-mobile";
import {localParam,setScrollTop} from "../../../assets/js/utils/util";
import global from "../../../assets/js/conf/global"
import {connect} from "react-redux"
import action from "../../../actions"
import TweenMax from "../../../assets/js/libs/TweenMax"

class GoodsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            aSwiper:[],
            sMask:{display:"none"},
            sCart:Css["down"],
            gid:props.location.search!=''?localParam(props.location.search).search.gid:'',
            aAttr:[],
            iAmount:1,
            sGoodsTitle:'',
            fPrice:0,
            fFreight:0,
            iSales:0,
            aReviews:[],
            iReviewTotal:0
        };
        this.bMove=false;
    }


    componentDidMount() {
        //解决白屏问题
        setScrollTop();
        this.getGoodsInfo();
        this.getGoodsAttr();
        this. getReviews();
        this.refs['mask'].addEventListener("touchmove",function (e) {
            e.preventDefault();
        },false);
        this.refs['cart-panel'].addEventListener("touchmove",function (e) {
            e.preventDefault();
        },false);
    };
    //解决内存泄露的问题
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        }
    }
    //获取轮播图等商品信息
    getGoodsInfo() {

        request(config.baseURL + "/api/home/goods/info?gid="+this.state.gid+"&type=details&token=" + config.token).then(res => {
            if (res.code === 200) {
                this.setState({aSwiper: res.data.images,sGoodsTitle:res.data.title,fPrice:res.data.price,
                fFreight:res.data.freight,iSales:res.data.sales}, () => {
                    new Swiper(this.refs['swiper-wrap'], {
                        autoplay: 3000,//可选选项，自动滑动
                        pagination: '.swiper-pagination',
                        autoplayDisableOnInteraction: false
                    })
                });
            }
        });
    };
    //获取购物车商品属性
    getGoodsAttr(){
      request(config.baseURL + "/api/home/goods/info?gid="+this.state.gid+"&type=spec&token=" + config.token).then(res=>{
          //console.log(res);
          if(res.code===200){
              this.setState({aAttr:res.data});
          }
      })
    };
    //获取商品评价
    getReviews(){
        request(config.baseURL + "/api/home/reviews/index?gid="+this.state.gid+"&type=spec&token=" + config.token+"&page=1").then(res=>{
            //console.log(res);
            if(res.code===200){
                this.setState({aReviews:res.data,iReviewTotal:res.pageinfo.total});
            }else {
                this.setState({aReviews:[]});
            }
        })
    };
    //显示购物车面板
    showCart(){
        this.setState({sCart:Css['up'],sMask:{display:"block"}})

    };
    //隐藏购物面板
    hideCart(){
      if(!this.bMove){
          this.setState({sCart:Css['down'],sMask:{display:"none"}})
      }
    };
    //加入收藏
    addFav(){
      Toast.info("收藏成功",1,null);
    };
    //跳转更多评论页面
        replacePage(url){
            this.props.history.replace(config.path+url);
        };
    //选择购物车属性
    checkAttr(attrIndex,valIndex){
        let aAttr=this.state.aAttr;
        if(aAttr.length>0){
            for(let key in aAttr[attrIndex].values){
                aAttr[attrIndex].values[key].checked=false;
            }
            aAttr[attrIndex].values[valIndex].checked=true;
            this.setState({aAttr:aAttr });
        }
    };
    //增加购物车数量
    incAmount(){
        let iAmount=this.state.iAmount;
        this.setState({iAmount:++iAmount});
    };
    //减少购物车数量
    decAmount(){
        let iAmount=this.state.iAmount;
        if(iAmount>1){
            this.setState({iAmount:--iAmount});
        }
    };
    //点击确定，商品加入购物车
    addCart(){
        console.log(localStorage['isLogin']);
        if(localStorage['isLogin']){

        this.checkAttrSelected(()=>{
            if(!this.bMove){
                this.bMove=true;
                let oGoodsImg=this.refs['goods-img'],oGoodsInfo=this.refs['goods-info'],oCartPanel=this.refs['cart-panel'];
                let oCloneImg=oGoodsImg.cloneNode(true);
                oGoodsInfo.appendChild(oCloneImg);
                //虚拟dom获取购物车图标，速度快
                //let oCartIcon=ReactDOM.findDOMNode(document.getElementById("cart-icon"));
                let oCartIcon=document.getElementById("cart-icon");
                //console.log(oCartIcon);
                oCloneImg.style.cssText="width:1rem;height:1rem;position:absolute;z-index:1;left:0.5rem;top:0.5rem;";
                //console.log(oCloneImg);
                let srcX=oGoodsImg.offsetLeft;
                let cloneY=parseInt(window.innerHeight-oCartPanel.offsetHeight+oGoodsImg.offsetTop
                    - oCartIcon.offsetTop);
                TweenMax.to(oCloneImg, 1, {bezier:[{x:srcX,y:-100},{x:oCartIcon.offsetLeft,y:-cloneY}],
                    onComplete:()=>{
                        oCloneImg.remove();
                        this.bMove=false;

                        //将商品添加到redux
                        //获取商品属性与属性值,拼接字符串
                        let aAttr=[],aParam=[];
                        if(this.state.aAttr.length>0){
                            for(let key in this.state.aAttr){
                                if(this.state.aAttr[key].values.length>0){
                                    aParam=[];
                                    for(let key2 in this.state.aAttr[key].values ){
                                        if(this.state.aAttr[key].values[key2].checked){
                                            aParam.push({paramid:this.state.aAttr[key].values[key2].vid,title:this.state.aAttr[key].values[key2].value})
                                        }
                                    }
                                }
                                 aAttr.push({attrid:this.state.aAttr[key].attrid,title:this.state.aAttr[key].title,param:aParam});
                            }
                        }

                        this.props.dispatch(action.cart.addCart({gid:this.state.gid,title:this.state.sGoodsTitle,
                            amount:parseInt(this.state.iAmount),price:this.state.fPrice,img:this.state.aSwiper[0],checked:true,
                            freight: this.state.fFreight,attrs:aAttr}));
                    }});
                TweenMax.to(oCloneImg,0.2,{rotation:360,repeat:-1});
            };
        })
        }else
        {Toast.info("请先登录！",1)}
    };
    //检测商品属性是否被选中,不能为空
    checkAttrSelected(callback){
        let aAttr=this.state.aAttr,bSelect=false;
        if(aAttr.length>0){
            for(let key in aAttr){
                bSelect=false;
                for(let key2 in aAttr[key].values){
                    if(aAttr[key].values[key2].checked){
                        bSelect=true;
                        break;
                    }
                }
            }
            if(!bSelect){
                //alert("请选择商品属性");
                Toast.info("请选择商品属性",2);
            }
            if(bSelect){
                callback();
            }
        }

    };

    render() {
        return (
            <div>
                <div ref="swiper-wrap" className={Css['swiper-wrap']}>
                    <div className="swiper-wrapper">
                        {
                            this.state.aSwiper.length>0?
                                this.state.aSwiper.map((item,index)=>{
                                    return(
                                        <div className="swiper-slide" key={index}><img src={item} alt=""/></div>
                                    )
                                }):<div className={Css["null-item"]}>网络出现问题</div>
                        }

                    </div>
                    <div className="swiper-pagination"></div>
                </div>

                <div className={Css["goods-ele-main"]}>
                    <div className={Css["goods-title"]}>{this.state.sGoodsTitle}</div>
                    <div className={Css["price"]}>￥{this.state.fPrice}</div>
                    <ul className={Css["sales-wrap"]}>
                        <li>快递：{this.state.fFreight}元</li>
                        <li>月销量：{this.state.iSales}</li>
                    </ul>
                </div>

                <div className={Css["reviews-main"]}>
                    <div className={Css["reviews-title"]}>商品评价 ({this.state.iReviewTotal})</div>
                    <div className={Css["reviews-wrap"]}>
                        {
                            this.state.aReviews.length>0?
                                this.state.aReviews.map((item,index)=>{
                                    return(
                                        <div className={Css["reviews-list"]} key={index}>
                                            <div className={Css["uinfo"]}>
                                                <div className={Css["head"]}><img src={item.head}/></div>
                                                <div className={Css["nickname"]}>{item.nickname}</div>
                                            </div>
                                            <div className={Css["reviews-content"]}>{item.content}</div>
                                            <div className={Css["reviews-date"]}>{item.times}</div>
                                        </div>
                                    )
                                })
                                :<div className="null-item">没有任何评价</div>
                        }
                </div>
                    <div className={this.state.iReviewTotal>0?Css['reviews-more']:Css['reviews-more']+" hide"} onClick={this.replacePage.bind(this,"goods/details/review?gid="+this.state.gid)}>查看更多评价</div>
                </div>
                <div className={Css["bottom-btn-wrap"]}>
                    <div className={Css["btn"]+" "+Css["fav"]} onClick={this.addFav.bind(this)}>收藏</div>
                    <div className={Css["btn"]+" "+Css['cart']}
                         onClick={this.showCart.bind(this)}>加入购物车</div>
                </div>

                <div ref="mask" className={Css["mask"]} style={this.state.sMask}></div>
                <div ref="cart-panel" className={Css["cart-panel"]+" "+this.state.sCart}>
                    <div ref="goods-info" className={Css["goods-info"]}>
                        <div className={Css["close-panel-wrap"]}>
                            <div className={Css["line"]}></div>
                            <div className={Css["close"]} onClick={this.hideCart.bind(this)}></div>
                            <div className={Css["spot"]}></div>
                        </div>

                        <div ref="goods-img" className={Css["goods-img"]}><img src={this.state.aSwiper.length>0?
                            this.state.aSwiper[0]:''}/></div>
                        <div className={Css["goods-wrap"]}>
                            <div className={Css["goods-title"]}>{this.state.sGoodsTitle}</div>
                            <div className={Css["price"]}>￥{this.state.fPrice}</div>
                        </div>
                    </div>
                    <div className={Css["attr-wrap"]}>
                            {
                                this.state.aAttr.length>0?
                                    this.state.aAttr.map((item,index)=>{
                                        return(
                                            <div className={Css["attr-list"]} key={index}>
                                                <div className={Css["attr-name"]}>{item.title}</div>
                                                <div className={Css["attr-val-wrap"]}>
                                                    {
                                                        item.values.length>0?
                                                            item.values.map((item2,index2)=> {
                                                                return (
                                                                    <div className={item2.checked?Css["val"]+" "+Css["active"]:Css["val"]} key={index2} onClick={this.checkAttr.bind(this,index,index2)}>{item2.value}</div>
                                                                )
                                                            }):''
                                                    }
                                                </div>
                                            </div>
                                        )
                                    }):''

                            }
                    <div className={Css['amount-wrap']}>
                        <div className={Css['amount-name']}>购买数量</div>
                        <div className={Css['amount-input-wrap']}>
                            <div className={this.state.iAmount<=1?Css['btn']+" "+Css['dec']+" "+Css['active']:Css['btn']+" "+Css['dec']} onClick={this.decAmount.bind(this)}>-</div>
                            <div className={Css['amount-input']}><input type="tel" value={this.state.iAmount}
                                                                        onChange={(e)=>{this.setState
                                                                        ({iAmount:e.target.value.replace(/[a-zA-Z]|[\u4e00-\u9fa5]|[#|*|,|+|;|\.]/g,'')})}}/></div>
                            <div className={Css['btn']+" "+Css['inc']} onClick={this.incAmount.bind(this)}>+</div>

                        </div>
                    </div>
                    <div className={Css["sure-btn"]} onClick={this.addCart.bind(this)}>确定</div>
                </div>
            </div>
            </div>
        )
    }
}

export default connect((state)=>{
    return {state:state}
})(withRouter(GoodsItem))
