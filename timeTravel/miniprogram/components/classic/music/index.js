// components/classic/music/index.js
import {classicBeh} from '../classic-behavior.js'
const mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[classicBeh],
  properties: {
    musicSrc:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    pauseSrc:"images/pause.png",
    playSrc:"images/playing.png"
  },
  //页面渲染后调用
  attached:function(){
    //设置当前音乐的播放状态
    this._musicStatus();
    this._outSwitch();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //图片播放暂停
    onPlay:function(){
      if(!this.data.playing){
        this.setData({playing:true});
        mMgr.src = this.properties.musicSrc;
        mMgr.title = this.properties.musicSrc;
      }else{
        this.setData({playing:false});
        mMgr.pause();//暂停音乐
      }
    },
    //设置播放音乐的状态
    _musicStatus(){
      if(mMgr.paused){
        this.setData({playing:false});
      }else 
      if( this.properties.musicSrc === mMgr.src){
        //判断当前页面的音乐地址是否与正在播放的地址相同
        this.setData({playing:true});
      }else{
        this.setData({playing:false});
      }
    },
    //控制音乐播放的外部开关,能监听到播放、暂停的动作
    _outSwitch(){
      mMgr.onPlay(()=>{
        this._musicStatus();
      });
      mMgr.onPause(()=>{
        this._musicStatus();
      });
      //关门音频播放器
      mMgr.onStop(()=>{
        this._musicStatus();
      });
      //自然播放结束
      mMgr.onEnded(()=>{
        this._musicStatus();
      });
    }
  }
})
