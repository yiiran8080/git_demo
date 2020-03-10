import React from 'react';
import Css from "../../../assets/css/home/goods/items.css"
import {request} from "../../../assets/js/utils/request";
import config from "../../../assets/js/conf/config";
import IScroll from "../../../assets/js/libs/iscroll";
import {localParam} from "../../../assets/js/utils/util";
import {lazyImg} from "../../../assets/js/utils/util";

class GoodsItems extends React.Component {
    constructor() {
        super();
        this.state={
            aGoods:[]
        };
        this.myScroll=null;
    };

    componentDidMount() {
        //console.log(this.props);
        this.getData(this.props);
        //console.log(this.props.location);
    };
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        this.getData(nextProps);
    };
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        }
    }
    eventScroll(){
        let srollGoods=this.refs["goods-content-main"];
        srollGoods.addEventListener("touchmove",
            function (e) {e.preventDefault();},false);
        this.myScroll= new IScroll(srollGoods, {
            scrollX : false,
            scrollY : true,
            preventDefault : false
        })
    };
    getData(props){
        //获取商品类目cid参数
        let cid=props.location.search?localParam(props.location.search).search.cid:"";
        //console.log(cid);
        request(config.baseURL+"api/home/category/show?cid="+cid+"&token="+config.token).then(res=>{
            //console.log(res);
            if(res.code===200){
                this.setState({aGoods:res.data},()=>{
                    this.eventScroll();
                    // lazyImg();
                    // this.myScroll.on("scrollEnd",()=>{
                    //     lazyImg();
                    // })
                });
            }else{
                this.setState({aGoods:[]})
            }
        })
    };
    pushPage(url){
        this.props.history.push(config.path+url);
    };

    render() {
        return (
            <div ref="goods-content-main" className={Css['goods-content-main']}>
                <div>
                {this.state.aGoods.length>0?
                    this.state.aGoods.map((item,index)=>{
                        return(
                            <div className={Css['goods-wrap']} key={index}>
                                <div className={Css['classify-name']}>{item.title}</div>
                                <div className={Css['goods-items-wrap']}>
                                    {
                                        item.goods!=null?
                                            item.goods.map((item2,index2)=>{
                                                return(
                                                    <ul key={index2} onClick={
                                                        this.pushPage.bind(this,"goods/details/item?gid="+item2.gid)
                                                    }>
                                                        <li><img src={item2.image} alt={item.title}/></li>
                                                        <li>{item2.title}</li>
                                                    </ul>
                                                )
                                            }):""
                                    }
                                </div>
                            </div>
                        )
                    }):<div>没有相关商品</div>
                }
                </div>
            </div>
        )
    }
}

export default GoodsItems;