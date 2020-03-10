import React, {lazy, Suspense} from 'react';
import {connect} from "react-redux";
import HeaderComponent from "../../../components/header/subheader";
import Css from "../../../assets/css/user/myorder/index.css"
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/utils/request";
import {localParam} from "../../../assets/js/utils/util";
import {HashRouter, Route, Switch,Redirect} from "react-router-dom";

const OrderPage =lazy(()=>import("./order"));


class MyOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            status:localParam(this.props.location.search).search.status?
                localParam(this.props.location.search).search.status:'',  //url页面参数
        }
    }
    componentDidMount() {
        //根据参数变化改变页面：获取Url参数
        //console.log(localParam(this.props.location.search).search.status);
    }
    //解决点击完不刷新的情况,做到立即刷新
    componentWillReceiveProps(nextProps) {
        this.setState({status:localParam(nextProps.location.search).search.status});
    }

    replacePage(url){
        this.props.history.replace(config.path+"transfer");
        setTimeout(()=>{
            this.props.history.replace(config.path+url);
        },10);
    };

    render() {
        return (
            <div className={Css["page"]}>
                <HeaderComponent title="我的订单"></HeaderComponent>
                <ul className={Css["main"]}>
                    <li className={this.state.status==='all'?Css["tag"]+" "+Css['active']:Css["tag"]} onClick={this.replacePage.bind(this,"myorder/order?status=all")}>全部订单</li>
                    <li className={this.state.status==='0'?Css["tag"]+" "+Css['active']:Css["tag"]} onClick={this.replacePage.bind(this,"myorder/order?status=0")}>待付款</li>
                    <li className={this.state.status==='1'?Css["tag"]+" "+Css['active']:Css["tag"]} onClick={this.replacePage.bind(this,"myorder/order?status=1")}>待收货</li>
                    <li className={this.state.status==='2'?Css["tag"]+" "+Css['active']:Css["tag"]} onClick={this.replacePage.bind(this,"myorder/order?status=2")}>待评价</li>
                </ul>
            {/*    子路由，订单页面*/}
                <div className={Css['sub-page']}>
                    <React.Fragment>
                        <HashRouter>
                            <Switch>
                                <Suspense fallback={<div>Loading</div>}>
                                    <Route path={config.path+"myorder/order"} component={OrderPage}></Route>
                                </Suspense>
                            </Switch>
                        </HashRouter>
                    </React.Fragment>
                </div>

            </div>
        )
    }
}

export default connect((state)=>{
    return {state:state}
})(MyOrder);