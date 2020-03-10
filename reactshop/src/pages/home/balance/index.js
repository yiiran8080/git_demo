import React from 'react';
import {connect} from 'react-redux';
import action from "../../../actions";
import config from "../../../assets/js/conf/config";
import {safeAuth} from "../../../assets/js/utils/util";
import Css from "../../../assets/css/home/balance/index.css"
import HeaderComponent from "../../../components/header/subheader";
import {request} from "../../../assets/js/utils/request";

class BalanceIndex extends React.Component {
    constructor(props) {
        super(props);
        //safeAuth(props);
        this.bSubmit=true;//允许提交订单,防止重复提交订单
        this.submitData=[];
    }
    componentDidMount() {
        this.isChecked();
    }

    //筛选aCartData中被checked的商品，才能提交订单
    isChecked(){
        for(let key in this.props.state.cart.aCartData){
            if(this.props.state.cart.aCartData[key].checked){
                this.submitData.push(this.props.state.cart.aCartData[key]);
            }
        }
    };
    submit(){
      if(this.props.state.cart.total>0){
          if(this.bSubmit){
              this.bSubmit=false;
              let sUrl=config.baseURL+"/api/order/add?token="+config.token;
              let jData={uid:this.props.state.user.uid,
                          freight:this.props.state.cart.freight,
                          addsid:"1696",
                          goodsData:JSON.stringify(this.submitData)
                    };
              request(sUrl,"post",jData).then(res=>{
                  //console.log(res);
                  if(res.code===200){
                      this.props.history.push(config.path+"balance/end");
                  }
              })
          }
      }
    };
    render() {
        //console.log(this.props.state.cart.aCartData);
        return (
            <div className={Css['page']}>
                <HeaderComponent title="确认订单"></HeaderComponent>
                <div className={Css["main"]}>
                    <div className={Css["address-wrap"]}>
                        <div className={Css["person-info"]}>
                            <span>姓名：王五</span>电话：15811221122
                        </div>
                        <div className={Css["address"]}><img src={require("../../../assets/images/home/cart/map.png")}/>天津</div>
                    </div>
                    <div className={Css["goods-wrap"]}>
                        {
                            this.props.state.cart.aCartData.length>0?
                            this.props.state.cart.aCartData.map((item,index)=>{
                                return(
                                    item.checked?
                                        <div className={Css["goods-list"]} key={index}>
                                            <div className={Css["image"]}><img src={item.img}/></div>
                                            <div className={Css["goods-param"]}>
                                                <div className={Css["title"]}>{item.title}</div>
                                                <div className={Css["attr"]}>
                                                    {
                                                        item.attrs.length>0?
                                                            item.attrs.map((item2,index2)=>{
                                                                return(
                                                                    <span key={index2}>{item2.title}:
                                                                        {
                                                                            item2.param.length>0?
                                                                                item2.param.map((item3,index3)=>{
                                                                                    return(
                                                                                        <React.Fragment key={index3}>{item3.title}</React.Fragment>
                                                                                    )
                                                                                })

                                                                                :""

                                                                         }</span>
                                                                )
                                                            })
                                                            :""
                                                    }
                                                    </div>
                                                <div className={Css["amount"]}>x {item.amount}</div>
                                                <div className={Css["price"]}>￥{item.price}</div>
                                            </div>
                                        </div>
                                    :''
                                )
                            })
                            :''
                        }

                    </div>
                    <ul className={Css['total-wrap']}>
                        <li>商品总价</li>
                        <li>￥{this.props.state.cart.total}</li>
                    </ul>
                    <ul className={Css['total-wrap']}>
                        <li>运费</li>
                        <li>￥0</li>
                    </ul>
                </div>
                <div className={Css["balance-wrap"]}>
                    <div className={Css["price-wrap"]}>实付金额:<span>￥{this.props.state.cart.total}</span></div>
                    <div className={Css["balance-btn"]} onClick={this.submit.bind(this)}>提交订单</div>
                </div>
            </div>
        )
    }
}
export default connect((state)=>{
    return {state:state}
})(BalanceIndex);