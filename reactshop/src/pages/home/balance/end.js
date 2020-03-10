import React from 'react';
import Css from "../../../assets/css/home/balance/index.css";
import HeaderComponent from "../../../components/header/subheader";
import config from "../../../assets/js/conf/config";
import {connect} from 'react-redux';
import {request} from "../../../assets/js/utils/request";
import {withRouter} from "react-router"

class BalanceEnd extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            orderNum:''
        };
    }
    componentDidMount() {
        this.getOrderNum();
    }
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        }
    }

    //获取订单编号
    getOrderNum=()=>{
        let surl=config.baseURL+'/api/order/lastordernum?uid='+this.props.state.user.uid+'&token='+config.token;
        request(surl).then(res=>{
            //console.log(res);
            if(res.code===200){
                this.setState({orderNum:res.data.ordernum});
            }
        })
    };
    //跳转我的订单页面
    goPage(url){
        this.props.history.push(config.path+url);
    };
    render() {
        return (
                <div className={Css['page']}>
                    <HeaderComponent title="订单结束"></HeaderComponent>
                    <div className={Css["main"]} style={{color:'blue',textAlign:'center',fontWeight:'bold'}}>
                        订单已提交成功！<br/>
                        订单编号：{this.state.orderNum}<br/>
                        <div onClick={this.goPage.bind(this,"myorder/order?status=0")}>查看订单</div>
                        <div>去付款</div>
                    </div>
                </div>
        )
    }
}

export default connect((state)=>{
    return {state:state}
})(BalanceEnd);