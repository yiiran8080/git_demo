# 时光旅行--音乐播放、电影推荐、书籍搜索小程序

本项目由三个主要页面，与若干组件构成。点赞组件、分享组件、搜索组件等均进行了封装，可以根据不同页面的需求多次调用。

### 项目特色

-微信小程序官方提倡使用原生组件<button>获取用户授权信息，本项目将该组件封装成图片插槽<slot>与<button>共同构成的组件，能够将按钮外观设置成自定义图片，用于获取用户授权信息，以及设置分享功能。具体在"我的"页面（pages/my/my）可以查看。

-项目对组件的封装高度可复用。点赞等功能组件均在组件内部进行了基本的功能实现，不涉及具体的业务逻辑。在多个不同页面调用时，由页面通过传递propertise的形式传递数据。除小程序外也可用于PC端、移动端。

### 效果图片

--音乐播放中，可通过外部音乐播放器管理。

![网络不佳](https://github.com/yiran8080/git_demo/blob/master/timeTravel/final_images/%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E4%B8%AD.jpg)

--影视推荐

![网络不佳](https://github.com/yiran8080/git_demo/blob/master/timeTravel/final_images/%E7%94%B5%E5%BD%B1.jpg)

--关键词图书搜索组件

![网络不佳](https://github.com/yiran8080/git_demo/blob/master/timeTravel/final_images/%E6%90%9C%E7%B4%A2%E7%BB%84%E4%BB%B6.jpg)

--图书搜索结果

![网络不佳](https://github.com/yiran8080/git_demo/blob/master/timeTravel/final_images/%E6%90%9C%E7%B4%A2%E5%9B%BE%E4%B9%A6.jpg)

--添加图书点评

![网络不佳](https://github.com/yiran8080/git_demo/blob/master/timeTravel/final_images/%E6%B7%BB%E5%8A%A0%E7%9F%AD%E8%AF%84.jpg)

--点击按钮发起授权请求

![网络不佳](https://github.com/yiran8080/git_demo/blob/master/timeTravel/final_images/%E8%AF%B7%E6%B1%82%E6%8E%88%E6%9D%83.jpg)

--授权成功，展示用户信息

![网络不佳](https://github.com/yiran8080/git_demo/blob/master/timeTravel/final_images/%E8%8E%B7%E5%8F%96%E6%8E%88%E6%9D%83%E5%90%8E.jpg)

