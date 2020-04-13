//公共逻辑--分页，分次加载数据行为
export const pageBeh = Behavior({
  data:{
    searchResult:[],
    total:null,
    noneResult:false
  },

  methods:{
    setMoreData(newResult){
      const temp  = this.data.searchResult.concat(newResult);
      this.setData({
        searchResult:temp,
      });
    },
    //当前所有数据的数组长度
    getLength(){
      return this.data.searchResult.length;
    },
    //服务器是否还有更多数据可以请求，比较total与当前数组长度
    hasMore(){
      const length = this.getLength();
      if(length >= this.data.total){
        return false;
      }else{
        return true;
      }
    },
    //设置total
    setTotal(total){
      this.data.total = total;
      if(total===0){
        this.setData({noneResult:true});
      }
    },
    //清空上一次搜索数据,必须用setData()
    clearData(){
      this.setData({
        searchResult:[],
        noneResult:false
      })
      this.data.total = null;
    }
  }
}) 