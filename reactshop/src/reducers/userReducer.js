let defaultData={
    uid:localStorage['uid']!==undefined?localStorage['uid']:"",
    nickname:localStorage['nickname']!==undefined?localStorage['nickname']:"",
    authToken:localStorage['authToken']!==undefined?localStorage['authToken']:"",
    isLogin:localStorage['isLogin']!==undefined?Boolean(localStorage['isLogin']):false
};
//localStorage.clear();
function userReducer(state=defaultData, action) {
    //console.log(action);
    switch (action.type) {
        case "login":
            //console.log(Object.assign({},state,action.data));
            return Object.assign({},state,action.data);
        case "outLogin":
            localStorage.removeItem("uid");
            localStorage.removeItem("nickname");
            localStorage.removeItem("authToken");
            localStorage.removeItem("isLogin");
            localStorage.removeItem("total");
            localStorage.removeItem("cartData");
            state.uid='';
            state.nickname='';
            state.authToken='';
            state.isLogin=false;
            return Object.assign({},state,action.data);

        default:
            return state;
    }
}
export default userReducer;