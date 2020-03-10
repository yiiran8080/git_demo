import React from 'react';
import HeaderComponent from "../../../components/header/subheader";
import Css from "../../../assets/css/home/cart/index.css"
import {connect} from "react-redux"
import action from "../../../actions"
import config from "../../../assets/js/conf/config";
import {safeAuth} from "../../../assets/js/utils/util";

class CartIndex extends React.Component {
    constructor(props) {
        super(props);
        safeAuth(props);
        this.state={
            bAllChecked:false
        }
    }
    componentDidMount() {
        //console.log(localStorage['cartData']);
        this.isAllChecked();
    }

    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        }
    };
    //删除
    delItem(index){
        if(this.props.state.cart.aCartData.length>0){
            this.props.dispatch(action.cart.delItem({index:index}));
        }
        this.isAllChecked();
    };
    //选择
    selectItem(index,checked){
        if(this.props.state.cart.aCartData.length>0){
            this.props.dispatch(action.cart.checkItem({index:index,checked:checked}));
            this.isAllChecked();
        }
    };
    //判断是否为全选状态
    isAllChecked(){
        if(this.props.state.cart.aCartData.length>0){
            for(let key in this.props.state.cart.aCartData){
                if(!this.props.state.cart.aCartData[key].checked){
                    this.setState({bAllChecked:false});
                    break;
                }
                else {this.setState({bAllChecked:true})}
            }
        }else{
            this.setState({bAllChecked:false});
        }
    };
    //点击全选按钮
    setAllChecked(checked){
        if(this.props.state.cart.aCartData.length>0){
            this.setState({bAllChecked:checked});
            this.props.dispatch(action.cart.setAllChecked({checked:checked}));
        }
    };
    //购物车加数量
    incAmount(index){
        if(this.props.state.cart.aCartData.length>0){
            this.props.dispatch(action.cart.incAmount({index:index}));
        }
    };
    //购物车减数量
    decAmount(index){
        if(this.props.state.cart.aCartData.length>0){
            this.props.dispatch(action.cart.decAmount({index:index}));
        }
    };
    //去结算
    goBalance(){
        if(this.props.state.cart.total>0){
            this.props.history.push(config.path+"balance/index");
        }
    };
    render() {
        return (
            <div>
                <HeaderComponent title="购物车"></HeaderComponent>
                <div className={Css["cart-main"]}>
                    {
                        this.props.state.cart.aCartData.length>0?
                        this.props.state.cart.aCartData.map((item,index)=>{
                            return(
                                <div className={Css["cart-list"]} key={index}>
                                    <div className={item.checked?Css["select-btn"]+" "+Css['active']:Css["select-btn"]} onClick={this.selectItem.bind(this,index,!item.checked)}></div>
                                    <div className={Css["image-wrap"]}>
                                        <div className={Css["image"]}><img src={item.img} alt={item.title}/></div>
                                        <div className={Css["del"]} onClick={this.delItem.bind(this,index)}>删除</div>
                                    </div>
                                    <div className={Css["goods-wrap"]}>
                                        <div className={Css["goods-title"]}>{item.title}</div>
                                        <div className={Css["goods-attr"]}>
                                            {
                                                item.attrs.length>0?
                                                    item.attrs.map((item2,index2)=>{
                                                        return(
                                                            <span key={index2}>{item2.title}:{
                                                                item2.param.length>0?
                                                                    item2.param.map((item3,index3)=>{
                                                                        return(
                                                                            <React.Fragment key={index3}>{item3.title}</React.Fragment>
                                                                        )
                                                                    })
                                                                    :''
                                                            }</span>
                                                        )
                                                    })
                                                    :""
                                            }
                                        </div>
                                        <div className={Css["buy-wrap"]}>
                                            <div className={Css["price"]}>￥{item.price}</div>
                                            <div className={Css['amount-input-wrap']}>
                                                <div className={item.amount>1? Css['btn']+" "+Css['dec']:Css['btn']+" "+Css['dec']+" "+Css['active']}
                                                     onClick={this.decAmount.bind(this,index)}>-</div>
                                                <div className={Css['amount-input']}><input type="tel" value={item.amount} readOnly/></div>
                                                <div className={Css['btn']+" "+Css['inc']} onClick={this.incAmount.bind(this,index)}>+</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }):<div className="null-item" style={{marginTop:"3rem"}}>您还没有选择商品！</div>
                    }
                    <div className={Css["orderend-wrap"]}>
                        <div className={Css["select-area"]}>
                            <div className={Css["select-wrap"]}>
                                <div className={this.state.bAllChecked?Css["select-btn"]+" "+Css['active']:Css["select-btn"]}
                                      onClick={this.setAllChecked.bind(this,!this.state.bAllChecked)}></div>
                                <div className={Css["select-text"]}>全选</div>
                            </div>
                            <div className={Css["total"]}>合计： <span>￥{this.props.state.cart.total}</span></div>
                        </div>
                        <div className={this.props.state.cart.total>0?Css["orderend-btn"]:Css["orderend-btn"]+" "+Css['disable']}
                        onClick={this.goBalance.bind(this)}>去结算</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state)=>{
    return {state:state}
})(CartIndex);