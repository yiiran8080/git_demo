//hooks 无状态组件实现轮播图

import React, {Component, useEffect, useState,useRef} from "react";
import PropTypes from 'prop-types'

export default function Hoc(WithComponent) {
    //无状态组件
    function HocComponent(props) {
        let [data,setData]=useState([]);
        let [isInit,setIsInit]=useState(true);
        let [iIndex,setIndex]=useState(0);
        //创建标识，通用容器
        let timer=useRef(null);

        //点击切换图片
        function changeImg(index){
            let isInit=false;
            setIndex(index);
            if(data.length>0){
                for(let i=0;i<data.length;i++){
                    if(data[i].active){
                        data[i].active=false;
                        break;
                    }
                }
            }
            data[index].active=true;
            setData(data);//作用是调用return中的{data}实时更新
        };
        //自动播放
        function autoPlay(){
            let tmpIndex=iIndex;
            clearInterval(timer.current);
            //定时器
            timer.current=setInterval(()=>{
                if(data.length>0){
                    isInit=false;
                    for(let i=0;i<data.length;i++){
                        if(data[i].active){
                            data[i].active=false;
                            break;
                        }
                    }
                    if(tmpIndex<data.length-1){
                        tmpIndex++;
                    }else {
                        tmpIndex=0;
                    }
                    data[tmpIndex].active=true;
                    setIndex(tmpIndex);
                }
            },3000)

        };
        function stop(){
            clearInterval(timer.current);
        };

        useEffect(()=>{
            if(props.data&&props.data.length>0){
                for (let i = 0; i < props.data.length; i++) {
                    if (i === 0) {
                        props.data[i].active = true;
                    } else {
                        props.data[i].active = false;
                    }
                }
                setData(props.data);
            }
            //console.log(props.data);
            autoPlay();
            return ()=>{
                clearInterval(timer.current);
            }
        });
        return(
            <WithComponent {...props} data={data} changeImg={changeImg} stop={stop}></WithComponent>
        )
    }
    HocComponent.propTypes={
        data:PropTypes.array.isRequired
    };
    return HocComponent;
}