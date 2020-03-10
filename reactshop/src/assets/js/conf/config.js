let devUrl="/proxy";//开发环境
let prodUrl="http://vueshop.glbuys.com/api";//生产环境
let baseURL=process.env.NODE_ENV==="production"?prodUrl:devUrl;
export default {
    baseURL:baseURL,
    path:"/",
    token:"1ec949a15fb709370f"
}