import React, {lazy,Suspense} from 'react';
import './assets/css/app.css'
import {HashRouter,Route,Switch,Redirect} from "react-router-dom"
import {AuthRoute} from "./routes_identify/private"
import config from "./assets/js/conf/config";
//底部导航栏
const HomeComponent=lazy(()=>import("./pages/home/home"));
const GoodsClassify=lazy(()=>import("./pages/home/goods/classify"));
const GoodsSearch=lazy(()=>import("./pages/home/goods/search"));
const GoodsDetails=lazy(()=>import("./pages/home/goods/details"));
const LoginPage=lazy(()=>import("./pages/home/login"));
const RegPage=lazy(()=>import("./pages/home/register"));
const BalancePage=lazy(()=>import("./pages/home/balance"));
const BalanceEnd=lazy(()=>import("./pages/home/balance/end"));
const MyOrder=lazy(()=>import("./pages/user/myorder"));
const Transfer=lazy(()=>import("./pages/transfer/transfer"));
//路由懒加载方式一
//import asyncComponent from "./components/async/AsyncComponent";
//const IndexPage=asyncComponent(()=>import ("./pages/index"))
//路由懒加载方式二：lazy(),suspense

/*router.js
HashRouter:有#号
BrowserRouter:没有#号
Route：设置路由与组件关联
Switch:只要匹配到一个地址不往下匹配，相当于for循环里面的break
Link:跳转页面，相当于vue里面的router-link
exact :完全匹配路由
Redirect:路由重定向
*/
class RouterComponent extends React.Component{

    render() {

        return(
            <React.Fragment>
                <HashRouter>
                    <React.Fragment>
                        <Switch>
                        <Suspense fallback={<React.Fragment/>}>
                        <Route path={config.path+"home"} component={HomeComponent}></Route>
                        <Route path={config.path+"goods/classify"} component={GoodsClassify}></Route>
                        <Route path={config.path+"goods/search"} component={GoodsSearch}></Route>
                        <Route path={config.path+"goods/details"} component={GoodsDetails}></Route>

                        <Route path={config.path+"login/index"}  component={LoginPage}></Route>
                        <Route path={config.path+"reg/index"}  component={RegPage}></Route>
                        <Route path={config.path+"balance/index"}  component={BalancePage}></Route>
                        <Route path={config.path+"balance/end"}  component={BalanceEnd}></Route>
                        <Route path={config.path+"myorder"}  component={MyOrder}></Route>
                        <Route path={config.path+"transfer"}  component={Transfer}></Route>
                        {/*<Redirect to={config.path+"home/index"}></Redirect>*/}
                        </Suspense>
                    </Switch>
                    </React.Fragment>
                </HashRouter>
            </React.Fragment>
        )
    }
}

export default RouterComponent;
