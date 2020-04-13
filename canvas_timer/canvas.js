var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 568;
var RADIUS = 8;
var MARGIN_LEFT = 0;
var MARGIN_TOP = 0;

//倒计时截止时间,设置成永远比当前时间后推1小时
var endTime = new Date();
endTime.setTime(endTime.getTime() + 3600*1000);
//屏幕上显示的时间秒数
var showTime = 0;
var timer = null;
//初始化小球颜色
var balls = [];
var colors = ["#33b5e5","#09c","#a6c","#93c", "#9c0","#690","#fb3","#f80", "#f44","#cc0000"];
var len = colors.length;

//初始化画面属性
window.onload=function () {
    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    console.log(WINDOW_WIDTH,WINDOW_HEIGHT);

    showTime = getShowTimeSeconds();
    //设置定时器，每隔一段时间，调用一次render()
    timer = setInterval(()=>{
        render(context);
        update();
    },50);
};
//获取当前时间秒数
function getShowTimeSeconds() {
    //=当前时间.getTime()-endTime.getTime();
    var currentTime = new Date();
    var ret = endTime.getTime()-currentTime.getTime();//毫秒数
    ret = Math.round(ret/1000);//整数秒数
    return ret >= 0? ret:0;
}
//时间变化，小球运动随之变化
function update() {

    //检测当前的时分秒与前一刻的时分秒是否有变化，有变化则生成小球
    let nextShowTime = getShowTimeSeconds();
    let nextHours = parseInt(nextShowTime/3600);
    let nextMinutes = parseInt((nextShowTime-nextHours*3600)/60);
    let nextSeconds = nextShowTime%60;
    //定时器上一次记录的时间
    let hours = parseInt(showTime/3600); //时间差值，距离endTime还剩多少时间
    let minutes = parseInt((showTime-hours*3600)/60);
    let seconds = showTime%60;
    //为变化的时间数值设置小球，加入balls数组
    if(nextSeconds != seconds){

        if(parseInt(nextHours/10) != parseInt(hours/10)){//小时第一位
            addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10));
        }
        if(parseInt(nextHours%10) != parseInt(hours%10)){//小时第二位
            addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10));
        }
        if(parseInt(nextMinutes/10) != parseInt(minutes/10)){//分钟第一位
            addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10));
        }
        if(parseInt(nextMinutes%10) != parseInt(minutes%10)){//分钟第二位
            addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10));
        }
        if(parseInt(nextSeconds/10) != parseInt(seconds/10)){//秒第一位
            addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10));
        }
        if(parseInt(nextSeconds%10) != parseInt(seconds%10)){//秒第二位
            addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10) );
        }

        showTime = nextShowTime;
    }
    updateBalls();
}
//传输需要渲染的 位置坐标、时间数值（即数组索引）、context对象
function render(cxt) {
    //刷新清空原来的图像
    cxt.clearRect(0,0,cxt.canvas.width,cxt.canvas.height);//context查找自己使用的是那一块画布
    // updateBalls();
    let hours = parseInt(showTime/3600); //时间差值，距离endTime还剩多少时间
    let minutes = parseInt((showTime-hours*3600)/60);
    let seconds = showTime%60;

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);//hours第一位
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);//hour第二位
    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt); //冒号：

    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);//minutes
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);//:

    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);//seconds
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

    //遍历balls彩球数组，渲染动画效果
    for(let i=0;i<balls.length;i++){
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
        cxt.closePath();

        cxt.fill();
    }

}
//遍历二维数组，设置画面属性
function renderDigit(x,y,index,cxt) {
cxt.fillStyle = "rgb(30,82,193)";//填充颜色状态

    for(let i = 0;i<digit[index].length;i++){ //二维数组的行数,即二维数组的长度
        for(let j = 0;j<digit[index][i].length;j++){ //二维数组第i行的长度，即列数
            if(digit[index][i][j]==1){ //如果该处为实心圆点
                let x1 = x+j*2*(RADIUS+1)+RADIUS+1;
                let y1 = y+i*2*(RADIUS+1)+RADIUS+1;
                cxt.beginPath();
                cxt.arc(x1,y1,RADIUS,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}
//在每一个值为1的数据上添加彩色小球
function addBalls(x,y,index) {
    for(let i = 0;i<digit[index].length;i++) { //二维数组的行数,即二维数组的长度
        for (let j = 0; j < digit[index][i].length; j++) { //二维数组第i行的长度，即列数
            if (digit[index][i][j] == 1) {
                let num = Math.floor(len*Math.random());//0到color数组长度之间的随机数
                let aBall = {
                    x:x+j*2*(RADIUS+1)+RADIUS+1,
                    y:y+i*2*(RADIUS+1)+RADIUS+1,
                    g:1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random()*1000)) *4, //x方向速度：4或-4
                    vy: -5,//y方向速度-5，开始向上抛
                    color:colors[num]
                };
                balls.push(aBall);
            }
        }
    }
}
//更新balls数组的数据，设置小球运动效果,即坐标变化
//性能优化：出界面的小球从数组里删除
function updateBalls() {
    for(let i=0; i<balls.length;i++){
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;
        //对地板位置碰撞检测
        if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
            balls[i].y=WINDOW_HEIGHT-RADIUS;
            balls[i].vy=-balls[i].vy * 0.75; //反弹后，速度方向相反，速度减小
        }
    }
    let count=0;//留在窗口内的小球数量都放在数组前count位，count位之后的都删除
    for(let i=0; i<balls.length;i++){
        if(balls[i].x+RADIUS>0 && balls[i].x-RADIUS<WINDOW_WIDTH){
            balls[count++]=balls[i];
        }
    }
    while (balls.length > Math.max(300,count)){
        balls.pop();
    }
}