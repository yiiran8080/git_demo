import React from 'react';
import {connect} from 'react-redux';
import Css from "../../../assets/css/user/myorder/order.css"
import {localParam} from "../../../assets/js/utils/util";
import config from "../../../assets/js/conf/config";
import {request} from "../../../assets/js/utils/request";
import {Toast,Modal} from "antd-mobile";
import {safeAuth} from "../../../assets/js/utils/util";

class Order extends React.Component {
    constructor(props) {
        super(props);
        safeAuth(props);
        this.state={
            status:localParam(this.props.location.search).search.status?
                localParam(this.props.location.search).search.status:'',  //url页面参数
            aOrder:[],
            text:''
        }
    }
    componentWillMount() {
        Toast.loading("正在加载...",1);
    }

    componentDidMount() {
        this.getData();
    }
    //解决点击完不刷新的情况,做到立即刷新
    componentWillReceiveProps(nextProps) {
        this.setState({status:localParam(nextProps.location.search).search.status});
        //消耗性能，不用这个生命周期解决页面不刷新问题
        //this.getData();
    }

    //取消订单
    cancelOrder(ordernum,index){
        Modal.alert("","确认取消订单吗？",[
            {text:'取消',onPress:()=>{},style:"default"},
            {text:'确认',onPress:()=>{
                //console.log(ordernum);
                    let url=config.baseURL+"/api/user/myorder/clearorder?uid="+this.props.state.user.uid+"&ordernum="+ordernum+"&token="+config.token;
                    request(url).then(res=>{
                        if(res.code===200){
                            this.state.aOrder.splice(index,1);
                            this.setState({aOrder:this.state.aOrder});
                        }
                    })
                }}
        ]);

    };

    //获取我的订单数据
    getData=()=>{
        let surl=config.baseURL+'/api/user/myorder/index?uid='+this.props.state.user.uid+"&status="+this.state.status
            +"&token="+config.token+"&page=1";
        request(surl).then(res=>{
            //console.log(res);
            if(res.code===200){
                this.setState({aOrder:res.data})
            }else if(res.code===201){
                this.setState({aOrder:[],text:res.data});
            }
        })
    };

    render() {
        Toast.hide();
        return (
            <div className={Css['sub-page']}>
                {this.state.aOrder[0]?
                    this.state.aOrder.map((item,index)=>{
                        return(
                            <div className={Css['order-list']} key={item.ordernum}>
                                <div className={Css['order-top-wrap']}>
                                    <div className={Css['order-num']}>订单编号&nbsp;{item.ordernum}</div>
                                    <div className={Css['status']}>{item.status==='0'?"待付款":item.status==='1'?"待收货":item.status==='2'?"已收货":''}</div>
                                </div>
                                {
                                    item.goods.map((item2,index2)=>{
                                        return(
                                            <div className={Css['item-list']} key={index2}>
                                                <div className={Css["image"]}><img src={item2.image} alt={item2.title}/></div>
                                                <div className={Css["title"]}>{item2.title}</div>
                                                <div className={Css["amount"]}>x{item2.amount}</div>
                                            </div>
                                        )
                                    })
                                }

                                <div className={Css["total-wrap"]}>
                                    <div className={Css["total"]}>实付金额 ￥{item.total}</div>
                                    <div className={Css["status-btn"]} onClick={this.cancelOrder.bind(this,item.ordernum,index)}>{item.status==='0'?"取消订单":item.status==='1'?"确认收货":item.status==='2'?"评价订单":''} </div>
                                </div>
                            </div>
                        )
                    }):<div className={Css['blank-text']}>{this.state.text}</div>
                }

            </div>
        )
    }
}

export default connect((state)=>{
    return {state:state}
})(Order);