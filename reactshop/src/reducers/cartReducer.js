
let cartData={
    aCartData:localStorage['cartData']!==undefined?JSON.parse(localStorage['cartData']):[],//商品详情信息
    total:localStorage['total']!==undefined?parseFloat(localStorage['total']):0,//总价格
    freight: 0
};
//localStorage.clear();
function cartReducer(state=cartData, action) {
    //console.log(action);
    switch (action.type) {
        case "addCart":
            addCart(state,action.data);//相当于  state.aCartData.push(action);
            return Object.assign({},state,action);
        case "delItem":
            delItem(state,action.data);
            return Object.assign({},state,action);
        case "checkItem":
            checkItem(state,action.data);
            return Object.assign({},state,action);
        case "setAllChecked":
            setAllChecked(state,action.data);
            return Object.assign({},state,action);
        case "incAmount":
            incAmount(state,action.data);
            return Object.assign({},state,action);
        case "decAmount":
            decAmount(state,action.data);
            return Object.assign({},state,action);

        default:
            return state;
    }
}
function addCart(state,action) {
    //判断购物车里是否已经有相同商品
    let bSameItem=false;

    if(state.aCartData.length>0){
        for(let key in state.aCartData){
            if(state.aCartData[key].gid===action.gid &&
                JSON.stringify(state.aCartData[key].attrs)===JSON.stringify(action.attrs)){
                    state.aCartData[key].amount+=action.amount;
                    bSameItem=true;
                    break;
                }
        }
    }
    if (!bSameItem){
            state.aCartData.push(action);
    }
    setTotal(state);
    localStorage['cartData']=JSON.stringify(state.aCartData);

}
//删除购物车商品
function delItem(state,action) {
    state.aCartData.splice(action.index,1);
    setTotal(state);
    localStorage['cartData']=JSON.stringify(state.aCartData);
}
//选择购物车商品
function checkItem(state,action) {
    state.aCartData[action.index].checked=action.checked;
    setTotal(state);
    localStorage['cartData']=JSON.stringify(state.aCartData);
    //console.log(state);
}
//全选购物车商品
function setAllChecked(state,action) {
    for(let key in state.aCartData){
        state.aCartData[key].checked=action.checked;
    }
    setTotal(state);
    localStorage['cartData']=JSON.stringify(state.aCartData);

}
//重新计算商品总价
function setTotal(state) {
    let total=0;
    //计算商品总价=单价*数量
    for(let key in state.aCartData){
        if(state.aCartData[key].checked){
            total+=parseFloat(state.aCartData[key].price)*parseInt(state.aCartData[key].amount);
        }
    }
    //四舍五入后保留两位小数
    state.total=parseFloat(Math.round(total).toFixed(2));
    localStorage['total']=state.total;
}
//购物车增加数量
function incAmount(state,action) {
    state.aCartData[action.index].amount+=1;
    if(state.aCartData[action.index].checked){
        setTotal(state);
    }
    localStorage['cartData']=JSON.stringify(state.aCartData);
}
//减少购物车数量
function decAmount(state,action) {
    if(state.aCartData[action.index].amount>1){
        state.aCartData[action.index].amount-=1;
        if(state.aCartData[action.index].checked){
            setTotal(state);
        }
    }
    localStorage['cartData']=JSON.stringify(state.aCartData);
}
export default cartReducer;