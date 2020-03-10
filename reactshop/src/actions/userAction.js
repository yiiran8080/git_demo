//用户登录
function login(data) {
    return{
        type:"login",
        data:data
    }
}
//退出登录
function outLogin() {
    return{
        type:"outLogin",
        data:{}
    }
}

export {
    login,
    outLogin
}