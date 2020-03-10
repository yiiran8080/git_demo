//高阶组件做轮播图
import React,{Component} from "react";
import "./style.css"
import Hoc from "./hoc"

export default Hoc((props)=>{

    //从hoc接收传过来的data参数
    console.log(props.data);
    let aData=props.data;

        return (
            <div className="my-swiper-main" onMouseOver={props.stop}>
                {
                    aData.length > 0 && aData.map((item, index) => {
                        return (
                            //图片：只有在active为true时才显示该图片
                            <div className={item.active ? "my-slide show" : "my-slide"} key={index}>
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    <img src={item.src} alt=""/>
                                </a>
                            </div>
                        )
                    })
                }
                <div className="pagination">
                    {
                        aData.length > 0 && aData.map((item, index) => {
                            return (
                                <div className={item.active ? "dot active" : "dot"} key={index} onClick={()=>{props.changeImg(index)}}></div>
                            )
                        })
                    }
                </div>

            </div>
        )
})

