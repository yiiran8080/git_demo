import React from 'react';
import Css from "../../../assets/css/home/goods/search.css"
import ReactDOM from 'react-dom'
import SearchComponent from "../../../components/search/search";
import {request} from "../../../assets/js/utils/request";
import config from "../../../assets/js/conf/config";
import { PullToRefresh, Button } from 'antd-mobile';
import {localParam} from "../../../assets/js/utils/util";

class Index extends React.Component {
    constructor() {
        super();
        this.state={
            screenMove:"",
            mask:"none",
            search:{display:"none"},
            aGoods:[],
            skeywords:""
            //下拉刷新相关
            // refreshing: false,
            // down: true,
            // height: document.documentElement.clientHeight,
            // data: [],
        };
        this.oType="all";
        this.skeywords="";
    }
    componentDidMount() {
        //获取用户搜索关键词
        //console.log(decodeURI(localParam(this.props.location.search).search.keywords));
        this.skeywords=decodeURI(localParam(this.props.location.search).search.keywords);
        this.setState({skeywords:this.skeywords});
        this.getData();
};
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        }
    }
    getData(){
      let url=config.baseURL+"api/home/goods/search?kwords="+this.skeywords+"&param=&page=1&price1=&price2=&otype="+this.oType+"&cid=&token="
        +config.token;
      request(url).then(res=>{
          //console.log(res);
          if(res.code===200){
              this.setState({aGoods:res.data})
          }
      })
    };

    //点击筛选，显示蒙版
    showScreen(){
        this.refs['mask'].addEventListener("touchmove",function (e) {
            e.preventDefault();
        },false);
        this.refs['screen'].addEventListener("touchmove",function (e) {
            e.preventDefault();
        },false);
        this.setState({screenMove:Css['move'],mask:"block"});
    };
    //隐藏筛选界面
    hideScreen(){
        this.setState({screenMove:Css['back'],mask:"none"});
    };
    //返回首页
    goBack(){
        this.props.history.push(config.path+"home/index");
    };
    //打开搜索页面，向子组件传值
    changeSearch(){
        this.setState({search:{"display":"block"}})
    };
    //关闭搜索页面（接收从子组件传过来的值）
    getStyle(val){
        this.setState({search:val});
    };
    //接收从子组件传来的关键词，解决本页面调用组件不能跳转的问题
    getChildKeywords(val){
        //console.log(val);
        // this.setState({})
       this.skeywords=val;
       this.getData();
       //不显示搜索组件
        this.setState({search:{"display":"none"},skeywords:val})
    };
    pushPage(url){
        this.props.history.push(config.path+url);
    };

    //商品主页下拉刷新
    // genData() {
    //     const dataArr = [];
    //     for (let i = 0; i < 20; i++) {
    //         dataArr.push(i);
    //     }
    //     return dataArr;
    // }

    render() {
        return (
            <div className={Css['page']}>
                <div className={Css['search-top']}>
                <div className={Css['search-header']}>
                    <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                    <div className={Css['search-wrap']} onClick={this.changeSearch.bind(this)}>
                        <div className={Css['search-icon']}></div>
                        <div className={Css['search-text']}>{this.skeywords}</div>
                    </div>
                    <div className={Css['screen-btn']} onClick={this.showScreen.bind(this)}>筛选</div>
                </div>
                    <div className={Css['order-main']}>
                        <div className={Css['order-item']}>
                            <div className={Css['order-text']}>综合</div>
                            <div className={Css['order-icon']}></div>
                        </div>
                        <div className={Css['order-item']}>
                            <div className={Css['order-text']}>销量</div>
                        </div>
                    </div>
                </div>

                <div className={Css['goods-main']}>
                    {
                        this.state.aGoods.length>0?
                            this.state.aGoods.map((item,index)=>{
                                return(
                                    <div className={Css['goods-list']} key={index} onClick={
                                        this.pushPage.bind(this,"goods/details/item?gid="+item.gid)
                                    }>
                                        <div className={Css['image']}><img src={item.image} alt={item.title}/></div>
                                        <div className={Css['goods-content']}>
                                            <div className={Css['goods-title']}>{item.title}</div>
                                            <div className={Css['price']}>￥{item.price}</div>
                                            <div className={Css['sales']}>销量<span>{item.sales}</span>件</div>
                                        </div>
                                    </div>
                                )
                            }):""
                    }

                </div>

                <div ref="mask" className={Css['mask']} style={{display:this.state.mask}}
                onClick={this.hideScreen.bind(this)}></div>
                <div ref="screen" className={Css['screen']+" "+this.state.screenMove}></div>

                <SearchComponent pageStyle={this.state.search} childStyle={this.getStyle.bind(this)}
                                 isLocal="1" childKeywords={this.getChildKeywords.bind(this)} keywords={this.state.skeywords}
                ></SearchComponent>

            </div>
        )
    }
}

export default Index;