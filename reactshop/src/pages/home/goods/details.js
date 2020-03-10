import React, {lazy, Suspense} from 'react';
import Css from '../../../assets/css/home/goods/details.css'
import {HashRouter, Route, Switch,Redirect} from "react-router-dom";
import config from "../../../assets/js/conf/config";
import {localParam} from "../../../assets/js/utils/util";
import {connect} from "react-redux"

const GoodsItem=lazy(()=>import("./details_item"));
const GoodsContent=lazy(()=>import("./details_content"));
const GoodsReview=lazy(()=>import("./details_review"));

class GoodsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            gid:props.location.search!=''?localParam(props.location.search).search.gid:'',
            pathname:''
        };

    };
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        this.setTabStyle(nextProps);

    };
    componentDidMount() {
        this.setTabStyle(this.props);
    };
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        }
    }
    //设置选项卡切换样式
    setTabStyle(props){
        this.setState({pathname:props.location.pathname});
    }


    goBack(){
        this.props.history.goBack();
    };
    //跳转页面
    replacePage(url){
        this.props.history.replace(config.path+url);
    };
    pushPage(url){
        this.props.history.push(config.path+url);
    };
    render() {
        return (
            <div>
                <div className={Css['details-header']}>
                    <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                    <div className={Css['tab-wrap']}>
                        <div className={this.state.pathname==='/goods/details/item'?Css['tab-name']+" "+Css['active']:Css['tab-name']} onClick={this.replacePage.bind(this,"goods/details/item?gid="+this.state.gid)}>商品</div>
                        <div className={this.state.pathname==='/goods/details/content'?Css['tab-name']+" "+Css['active']:Css['tab-name']} onClick={this.replacePage.bind(this,"goods/details/content?gid="+this.state.gid)}>详情</div>
                        <div className={this.state.pathname==='/goods/details/review'?Css['tab-name']+" "+Css['active']:Css['tab-name']} onClick={this.replacePage.bind(this,"goods/details/review?gid="+this.state.gid)}>评价</div>
                    </div>
                    <div id="cart-icon" className={Css['cart-icon']} onClick={this.pushPage.bind(this,"home/cart")}>
                        <div className={this.props.state.cart.aCartData.length>0?Css['spot']:Css['spot']+" hide"}></div>
                    </div>
                </div>

            {/*    子路由：商品页,商品详情，商品评论*/}
                <div className={Css['sub-page']}>
                        <React.Fragment>
                            <HashRouter>
                                <Switch>
                                    <Suspense fallback={<React.Fragment/>}>
                                        <Route path={config.path+"goods/details/item"} component={GoodsItem}></Route>
                                        <Route path={config.path+"goods/details/content"} component={GoodsContent}></Route>
                                        <Route path={config.path+"goods/details/review"} component={GoodsReview}></Route>
                                        {/*<Redirect to={config.path+"goods/details/item?gid="+this.state.gid}></Redirect>*/}
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
})(GoodsDetails);
