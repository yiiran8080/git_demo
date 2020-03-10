//搜索页面
import React from 'react';
import Css from '../../assets/css/temp/search.css'
import config from "../../assets/js/conf/config";
import {request} from "../../assets/js/utils/request";
import {connect} from "react-redux"
import {withRouter} from "react-router"
import action from "../../actions"

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            aHotKeywords:[],
            keywords:""
        };
        this.histroyKeywords=props.state.hk.keywords;
    };
    componentDidMount() {
        this.getHotKeywords();
        //console.log(this.props.pageStyle)
    };
    componentWillUnmount() {
        this.setState=(state,callback)=>{
            return;
        }
    }
    getHotKeywords(){
        request(config.baseURL+"api/home/public/hotwords?token="+config.token).then(res=>{
            //console.log(res);
            if(res.code===200){
                this.setState({aHotKeywords:res.data});
            }

        })
    };
    addHistory(){
        //console.log(this.state.keywords);
        for(let i=0;i<this.histroyKeywords.length;i++){
            if(this.histroyKeywords[i]===this.state.keywords){
                this.histroyKeywords.splice(i--,1);
            }
        }
        this.histroyKeywords.unshift(this.state.keywords);
        //console.log(this.histroyKeywords);
        //将历史记录存入redux中，以及Localstorage（先转成字符串）
        localStorage['hk']=JSON.stringify(this.histroyKeywords);
        this.props.dispatch(action.hk.addHistoryKeywords({keywords:this.histroyKeywords}));
        // this.props.dispatch({type:"addHK",keywords:this.histroyKeywords});
        //跳转相应页面
        this.goPage("goods/search?keywords="+this.state.keywords,this.state.keywords);
    };
    clearHistory(){
        localStorage.removeItem("hk");
        //this.props.dispatch({type:"addHK",keywords:[]});
        this.props.dispatch(action.hk.addHistoryKeywords({keywords:[]}));
        this.histroyKeywords=[];

    };
    //点击搜索记录、热门搜索后跳转至相应页面
    goPage(url,keywords){
        //如果是search页面要求跳转，则把关键词传过去，无法直接跳转
        if(this.props.isLocal==='1'){
            this.props.childKeywords(keywords);
        }
      this.props.history.push(config.path+url);
    };

    render() {
        return (
            <div style={this.props.pageStyle} className={Css['page']}>
                <div className={Css['search-header']}>
                    <div className={Css['close']} onClick={this.props.childStyle.bind(this,{display:"none"})}></div>
                    <div className={Css['search-wrap']}>
                        <div className={Css['search-input-wrap']}>
                        <input type="text" className={Css['search']} placeholder="请输入宝贝名称" defaultValue={this.props.keywords}
                               onChange={(e)=> {
                                   this.setState({keywords:e.target.value})}}
                                  />
                        </div>
                        <button type="button" className={Css['search-btn']} onClick={this.addHistory.bind(this)}></button>
                    </div>
                </div>
                <div className={Css['search-main']}>
                    <div className={Css['search-title-wrap']}>
                        {/*从reducer中取值*/}
                        <div className={Css['search-title']}>最近搜索</div>
                        <div className={Css['bin']} onClick={this.clearHistory.bind(this)}></div>
                    </div>
                    <div className={Css['search-keywords-wrap']}>
                        {
                            this.props.state.hk.keywords!=null?
                                this.props.state.hk.keywords.map((item,index)=>{
                                    return(
                                        <div className={Css['keywords']} key={index}
                                        onClick={this.goPage.bind(this,'goods/search?keywords='+item,item)}>{item}</div>
                                    )
                                }):''
                        }

                    </div>
                </div>
                <div className={Css['search-main']}>
                    <div className={Css['search-title-wrap']}>
                        <div className={Css['search-title']}>热门搜索</div>
                        <div className={Css['bin']}></div>
                    </div>
                    <div className={Css['search-keywords-wrap']}>
                        {
                            this.state.aHotKeywords!=null?
                            this.state.aHotKeywords.map((item,index)=>{
                                return(
                                    <div className={Css['keywords']} key={index}
                                         onClick={this.goPage.bind(this,'goods/search?keywords='+item.title,item.title)}>
                                        {item.title}</div>
                                )
                            }):""
                        }

                    </div>
                </div>

            </div>
        )
    }
}

export default connect((state)=>{
    return {state:state}

})(withRouter(SearchComponent));