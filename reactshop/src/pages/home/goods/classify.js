//主路由界面
import React, {lazy, Suspense} from 'react';
import {HashRouter,Route,Switch,Link} from "react-router-dom";
import Css from "../../../assets/css/home/goods/classify.css"
import config from "../../../assets/js/conf/config";
import IScroll from "../../../assets/js/libs/iscroll";
import {request} from "../../../assets/js/utils/request";
import {localParam} from "../../../assets/js/utils/util";

import SearchComponent from "../../../components/search/search";
const ItemComponent=lazy(()=>import("./items"));

class GoodsClassify extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            aClassify:[],
            search:{display:"none"}
        };
        this.myScroll=null;
        this.cid=props.location.search?localParam(props.location.search).search.cid:"492";
        //console.log(this.cid);
    };
    componentDidMount() {
        this.getClassifyData();
    };
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        }
    }

    goBack(){
        this.props.history.goBack();
    };
    replacePage(url){
        this.props.history.replace(config.path+url);
    };
    //点击后将相应分类变成红色
    changeStyle(url,index){
        for(let i=0;i<this.state.aClassify.length;i++){
            this.state.aClassify[i].bActive=false;
        }
        this.state.aClassify[index].bActive=true;
        //console.log(config.path+url);
        //点击后跳转至相应页面
        this.replacePage(url);
    };
    eventScroll(){
        //根据ref,而不是根据id获取dom
        let srollClassify=this.refs["scroll-classify"];
        srollClassify.addEventListener("touchmove",
            function (e) {e.preventDefault();},false);
             this.myScroll= new IScroll(srollClassify, {
                 scrollX : false,
                 scrollY : true,
                 preventDefault : false
    })
    };
    getClassifyData(){
        request(config.baseURL+"api/home/category/menu?token="+config.token).then(res=>{
            //console.log(res);
            if(res.code===200){
                this.setState({aClassify:res.data},()=>{
                    //增加bActive属性
                    for(let i=0;i<this.state.aClassify.length;i++){
                        this.state.aClassify[i].bActive=false;
                    }
                    this.defaultStyle();
                    //滑动效果
                    this.eventScroll();
                });

            }
        })
    };
    //商品分类初始状态是否为active
    defaultStyle(){
        if(this.state.aClassify.length>0){
             for (let i=0;i<this.state.aClassify.length;i++){
                if(this.state.aClassify[i].cid===this.cid){
                    this.state.aClassify[i].bActive=true;
                    break;
                }
            }//console.log(this.state.aClassify);
        }

    };
    //搜索页面是否显示
    changeSearch(){
        this.setState({search:{"display":"block"}})
    };
    //关闭搜索页面（接收从子组件传过来的值）
    getStyle(val){
        this.setState({search:val});
    };

    render() {
        return (
            <div>
              <div className={Css['search-header']}>
                  <div className={Css['back']} onClick={this.goBack.bind(this)}></div>
                  <div className={Css['search']}  onClick={this.changeSearch.bind(this)}>请输入宝贝名称</div>
              </div>
            {/*   商品部分*/}
              <div className={Css['goods-main']}>
                  {/*索引部分--主路由*/}
                  <div ref="scroll-classify" className={Css['classify-wrap']}>
                      <div>
                          {
                              this.state.aClassify!=null?
                                  this.state.aClassify.map((item,index)=>{
                                      return(
                                          <div className={item.bActive?Css['classify-item']+" "+Css['active']:Css['classify-item']}
                                               onClick={this.changeStyle.bind(this,"goods/classify/items?cid="+item.cid+'',index)}
                                               key={index}>{item.title}</div>
                                      )
                                  }):""
                          }
                      </div>
                  </div>
                  {/*商品内容--子路由*/}
                  <div className={Css['goods-content']}>
                      <React.Fragment>
                        <HashRouter>
                          <Switch>
                            <Suspense fallback={<React.Fragment/>}>
                            <Route path={config.path+"goods/classify/items"} component={ItemComponent}></Route>
                            </Suspense>
                          </Switch>
                        </HashRouter>
                      </React.Fragment>
                  </div>
              </div>
                <SearchComponent pageStyle={this.state.search} childStyle={this.getStyle.bind(this)}></SearchComponent>
            </div>
        )
    }
}

export default GoodsClassify;