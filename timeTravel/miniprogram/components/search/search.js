// components/search.js
import {KeywordModel} from "../../modules/keyword"
import {BookModel} from "../../modules/book"
import {pageBeh} from "../behaviors/pagination"

const keywordModel = new KeywordModel();
const bookModel = new BookModel();
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[pageBeh],
  properties: {
    more:{
      type:Number,
      observer:"_loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords:[],
    hotWords:[],
    resulting:false, //是否显示搜索结果
    q:"",//输入框数据绑定
    loading:false,//锁变量,控制加载动效底部
    loadingCenter:false,//加载动效1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //加载更多结果
    _loadMore(){
      if(!this.data.q){return;}
      if(this._isLocked()){return;}
      
      if(this.hasMore()){ //如果没有数据，不再发送请求
        this._addLock();// 不可以连续提交请求，表示正在加载
        bookModel.searchBook(this.getLength(),this.data.q).then(res=>{
          //新取的数据添加到原数组后面
          this.setMoreData(res.books);
          this._unLock(); 
        },()=>{
          this._unLock();
        });
      }
    },
    //取消搜索，回到书籍页面
    onCancel(){
      this.triggerEvent("cancel",{},{});
    },
    //用户在输入框搜索关键字，或标签关键字
    onConfirm(e){
      this._showLoadingCenter();
      this.setData({resulting:true});//显示搜索结果
      let keyword = e.detail.value || e.detail.text;
      keywordModel.addHistory(keyword);
      //请求搜索结果
      bookModel.searchBook(0,keyword).then(res=>{
        this._hideLoadingCenter();
        //更新total
        this.setTotal(res.total);
        //初次更新搜索结果
        this.setMoreData(res.books);
        this.setData({
          q:keyword
        });
      })
    },
    //点击叉号取消当前搜索，同时清空搜索数据，添加历史记录
    cancelSearch(){
      const historyWords = keywordModel.getHistory();
      this.setData({
        resulting:false,
        q:"",
        historyWords
      });
      //清空搜索数据
      this.clearData();
    },
    //生成加载动效
    _showLoadingCenter(){
      this.setData({loadingCenter:true});
    },
    _hideLoadingCenter(){
      this.setData({loadingCenter:false});
    },
    //判断、封装加锁、解锁
    _isLocked(){
      return this.data.loading?true:false;
    },
    _addLock(){
      this.setData({loading:true})
    },
    _unLock(){
      this.setData({loading:false})
    }
  },
  
  // 打开搜索面板就要呈现关键字
  attached(){
    const historyWords = keywordModel.getHistory();
    this.setData({historyWords});
    keywordModel.getHot().then(res=>{
      this.setData({hotWords:res.hot});
    });
  }
})
