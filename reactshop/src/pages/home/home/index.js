//底部导航栏

import React,{lazy,Suspense} from 'react';
import Css from "../../../assets/css/home/home/index.css"
import  {HashRouter,Route,Switch}  from  'react-router-dom';
import {connect} from "react-redux"
import axios from "axios"
import {request} from '../../../assets/js/utils/request'
import config from "../../../assets/js/conf/config";
import {AuthRoute} from "../../../routes_identify/private"

const IndexPage=lazy(()=>import("../index/index"));
const CartPage=lazy(()=>import("../cart/index"));
const UserPage=lazy(()=>import("../../user/index"));

class HomeComponent extends React.Component{
    constructor() {
        super();
        this.state={
            navs:[],
            isHome:true,
            isCart:false,
            isMy:false
        };
        this.num=0;
    };
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        this.handleNavStyle(nextProps);
    };
    componentWillMount() {
        //console.log(this.props);
    };
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        }
    }

    handleNavStyle(props){
        switch (props.location.pathname) {
            case config.path+"home/index":
                this.setState({
                    isHome:true,
                    isCart:false,
                    isMy:false
                });
                break;
            case config.path+"home/cart":
                this.setState({
                    isHome:false,
                    isCart:true,
                    isMy:false
                });
                break;
            case config.path+"home/my":
                this.setState({
                    isHome:false,
                    isCart:false,
                    isMy:true
                });
                break;

        }
    };

    componentDidMount() {
        //首页导航接口
        // axios.get("http://vueshop.glbuys.com/api/home/index/nav?token=1ec949a15fb709370f").then((res)=>{
        //     //console.log(res);
        //     if(res.data.code===200){
        //         this.setState({navs:res.data.data})
        //     }
        // })
        request("http://vueshop.glbuys.com/api/home/index/nav?token=1ec949a15fb709370f").then((res)=>{
            if(res.code===200){
                this.setState({navs:res.data})
            }
        })
        //fetch--get
        // fetch("http://vueshop.glbuys.com/api/home/index/nav?token=1ec949a15fb709370f").then(res=>
        //     res.json()).then(res=>{
        //         if(res.code===200){
        //             this.setState({navs:res.data})
        //         }
        // })
    }
    goPage(url){
        this.props.history.push(config.path+url);
    };
    render() {
        return(
            <div>
                        <React.Fragment>
                            <Switch>
                                <Suspense fallback={<React.Fragment/>}>
                                    {/*配置子路由--首页*/}
                                    <Route path={config.path+"home/index"} component={IndexPage}></Route>
                                    <AuthRoute path={config.path+"home/cart"} component={CartPage}></AuthRoute>
                                    <AuthRoute path={config.path+"home/my"} component={UserPage}></AuthRoute>
                                </Suspense>
                            </Switch>
                        </React.Fragment>

            <div className={Css["bottom-nav"]}>
                <ul onClick={this.goPage.bind(this,"home/index")}>
                    <li className={this.state.isHome?Css['home']+" "+Css['active']:Css['home']}></li>
                    <li className={this.state.isHome?Css['text']+" "+Css['active']:Css['text']}>首页</li>
                </ul>
                <ul onClick={this.goPage.bind(this,"home/cart")}>
                    <li className={this.state.isCart?Css['cart']+" "+Css['active']:Css['cart']}></li>
                    <li className={this.state.isCart?Css['text']+" "+Css['active']:Css['text']}>购物车</li>
                    <li className={this.props.state.cart.aCartData.length>0?Css["spot"]:Css["spot"]+" hide"}></li>
                </ul>
                <ul onClick={this.goPage.bind(this,"home/my")}>
                    <li className={this.state.isMy?Css['my']+" "+Css['active']:Css['my']}></li>
                    <li className={this.state.isMy?Css['text']+" "+Css['active']:Css['text']}>我的</li>
                </ul>

            </div>
            </div>
        )
    }
}
export default connect((state)=>{
    return {state:state}
})(HomeComponent);
