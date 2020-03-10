import React,{Component} from "react";
import ReactDom from "react-dom";
import Toast from "./toast";

export default function (opts) {
    //console.log(opts);
    //创建div元素
    let div=document.createElement("div");
    let duration=opts.duration||2000;

    document.body.appendChild(div);
//将Toast,div挂载到render
//返回对象toast可以调用Toast组件中的方法
    let toastInit=ReactDom.render(<Toast/>,div);
// console.log(toastInit);
    //将参数（警示信息）传递给toast组件方法
    toastInit.setOpts(opts);

    //提示框自动消失
    setTimeout(()=>{
        document.body.removeChild(div);
    },duration);
};
