import React,{Component} from "react";
import ReactDom from "react-dom";
import Confirm from "./confirm";
//创建节点

export default function (msg,btns) {
    console.log(msg,btns);
    let div=document.createElement("div");
    document.body.appendChild(div);
    let ConfirmInit=ReactDom.render(<Confirm/>,div);
    //向confirm.js中的方法传参数
    ConfirmInit.setData(msg,btns,div);
}
