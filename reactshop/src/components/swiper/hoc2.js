//高阶组件实现轮播图
//hoc组件接收到app传来的图片data，再传给index页面,hoc组件写逻辑，index写页面
import React,{Component} from "react";
import PropTypes from 'prop-types'
export default function Hoc(WithComponent) {
    return class HocComponent extends Component{
        //检测属性类型与必传
        static propTypes={
            data:PropTypes.array.isRequired
        };
        constructor(){
            super();
            this.state={
                data:[]
            };
            this.aData=[];//全局变量
            this.isInit=true;//设置初始图片变量
            this.index=0;//设置轮播图索引
            this.timer=null;
        };
        //将data值放在state中，以便在render中改变active属性
        componentDidMount() {
            // this.setState({
            //     data: this.props.data
            // })
            this.autoPlay();
        };
        componentWillUnmount() {
            //离开页面时关闭定时器
            clearInterval(this.timer);
        };

        //点击切换图片
        changeImg(index){
            this.isInit=false;
            this.index=index;
            if(this.aData.length>0){
                for(let i=0;i<this.aData.length;i++){
                    if(this.aData[i].active){
                        this.aData[i].active=false;
                        break;
                    }
                }
            }
            this.aData[index].active=true;
            this.setState({data:this.aData});//作用是调用render方法，也可以换成this.setState({})
            //console.log(this.state.data);
        };

        //自动播放
        autoPlay(){
            //定时器
            this.timer=setInterval(()=>{
                if(this.aData.length>0){
                    this.isInit=false;
                    for(let i=0;i<this.aData.length;i++){
                        if(this.aData[i].active){
                            this.aData[i].active=false;
                            break;
                        }
                    }
                    if(this.index<this.aData.length-1){
                        this.index++;
                    }else {
                        this.index=0;
                    }
                    this.aData[this.index].active=true;
                    this.setState({data:this.aData});
                }
            },3000)

        };
        //鼠标放置停止
        stop(){
            clearInterval(this.timer);
        };

        render() {

                this.aData = this.props.data;
                //默认显示第一张照片
                if (this.aData.length > 0 && this.isInit) {
                    for (let i = 0; i < this.aData.length; i++) {
                        if (i === 0) {
                            this.aData[i].active = true;
                        } else {
                            this.aData[i].active = false;
                        }
                    }
                }
            //console.log(this.props);
            //将data传给index
            return(
                <WithComponent {...this.props} changeImg={this.changeImg.bind(this)}
                stop={this.stop.bind(this)} autoplay={this.autoPlay.bind(this)}></WithComponent>
            )
        }
    }
}