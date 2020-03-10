/*eslint-disable*/
import "babel-polyfill"
import "url-search-params-polyfill"
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/common/public.css';
import RouterComponent from './router';
import * as serviceWorker from './serviceWorker';
import {createStore,combineReducers,applyMiddleware} from "redux";
import {Provider} from "react-redux"
import reducers from "./reducers";
//import thunk from 'redux-thunk'

//2.redux第二步，商品装车,action第一步已触发
//历史记录装车
//localstorage与reducer相关联
// let historyKeywords=localStorage['hk']!==undefined?JSON.parse(localStorage['hk']):[];
// function hkReducer(state={keywords:historyKeywords},action) {
//     console.log(action);
//     switch (action.type) {
//         case "addHK":
//             return Object.assign({},state,action);
//         default:
//             return state;
//     }
// };
function counterReducer(state={count:0},action) {
    //console.log(action)
    //判断商品类型
    switch (action.type) {
        case "INC":
            //浅拷贝，相当于 state=action.data
            return {...state,...action.data};
        case "DEC":
            return {...state,...action.data};
        default:
            return  state;
    }
    //return  Object.assign({},state,action.data);
}
//会员登录装车
let defaultState={
    username:localStorage["username"]?localStorage["username"]:"",
    isLogin:localStorage["isLogin"]?Boolean(localStorage["isLogin"]):false
};
function userReducer(state=defaultState,action){
    switch (action.type) {
        //会员登录
        case "LOGIN":
            localStorage["username"]=action.data.username;
            localStorage["isLogin"]=true;
            return {...state,...action.data};
        //安全退出
            case "OUTLOGIN":
            localStorage.clear();
            //console.log(action);
            return {...state,...{username:"",isLogin:false}}
        default:
            return state;
    }
}

//3.存入仓库
let store=createStore(reducers);
//,applyMiddleware(thunk)

//4.从仓库取出，即在路由页面中使用(通过 provider)

//用无状态组件包裹Router,为redux准备
function App(){
    return(
        <React.Fragment>
            <Provider store={store}>
                <RouterComponent></RouterComponent>
            </Provider>
        </React.Fragment>
    )
}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
