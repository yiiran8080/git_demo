var WINDOW_WIDTH = document.documentElement.clientWidth;
var WINDOW_HEIGHT = document.documentElement.clientHeight;

//canvas中的打断文字自动换行
function canvasTextAutoLine(str,ctx,initX,initY,lineHeight){
    ctx.fillStyle='#fff';
    ctx.font = '20px 宋体';
    var lineWidth = 0;
    var canvasWidth = WINDOW_WIDTH;
    var lastSubStrIndex= 0;
    for(let i=0;i<str.length;i++){
        lineWidth+=ctx.measureText(str[i]).width;
        if(lineWidth>canvasWidth/8*3){
            ctx.fillText(str.substring(lastSubStrIndex,i),initX,initY);
            initY+=lineHeight;
            lineWidth=0;
            lastSubStrIndex=i;
        }
        if(i===str.length-1){
            ctx.fillText(str.substring(lastSubStrIndex,i+1),initX,initY);
        }
    }
}
//用于修饰的长方形
var p;var q;//长方形的绘制坐标
function drawRect(p,q) {
   // console.log(p,q);
    ctx.strokeStyle = '#5599ff';
    ctx.lineWidth = '5';
    ctx.strokeRect(p,q,WINDOW_WIDTH/2,WINDOW_HEIGHT/2);
}
//仿Prezi转场动画效果
var move_log;
var a;//小画布移动的横坐标
var b;//小画布移动的纵坐标
var k2;
function offInit() {
  //  [a,b] = canvasStart();
    k2 = a/b;
    transition();
}

function transition() {
    canvasMove();
    move_log = window.requestAnimationFrame(transition);
}

var main_left=0;//main_offcanvas的坐标，用作计算画布移动距离
var main_top=0;
var k = WINDOW_WIDTH / WINDOW_HEIGHT;//main_offcanvas移动时，x与y的比值，即移动斜率
var center;//小canvas是否移动到画面中心的标记

//画布移动
function canvasMove() {
  //  console.log(id);
    //drawRect(p,q);
    //如果对应的小offcanvas移动到中心，center为true,就停止移动
    center = Math.abs(main_left) >= WINDOW_WIDTH / 4 && Math.abs(main_top) >= WINDOW_HEIGHT / 4;
    //console.log(id);//从主canvas接收的id参数，知道被点击的是第几个圆形
    //计算mainoffcanvas应该向哪个方向移动
    [main_left,main_top] = canvasMoveDirection();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(mainOffCanvas,0,0,WINDOW_WIDTH,WINDOW_HEIGHT,main_left,main_top,WINDOW_WIDTH,WINDOW_HEIGHT);
    if(center){
        window.cancelAnimationFrame(move_log);
        //放大mainoffcanvas画布
       slowLarge();
    }
}

var whichCanvas;
function canvasMoveDirection() {//根据id判断画布应该移动的方向
    if(id === 1){
        whichCanvas = offCanvas1;
        main_left+=5*k;
        main_top+=5;
        if(center){
            main_left=WINDOW_WIDTH/4;
            main_top =WINDOW_HEIGHT/4;
        }
    }else if(id === 2){
        whichCanvas = offCanvas2;
        main_left-=5*k; //画布向左移动
        main_top+=5;
        if(center){
            main_left=-WINDOW_WIDTH/4;
            main_top =WINDOW_HEIGHT/4;
        }
    }
    else if(id === 3){
        whichCanvas = offCanvas3;
        main_left+=5*k;
        main_top-=5;//向上移动
        if(center){
            main_left=WINDOW_WIDTH/4;
            main_top =-WINDOW_HEIGHT/4;
        }
    }
    else if(id === 4){
        whichCanvas = offCanvas4;
        main_left-=5*k;
        main_top-=5;
        if(center){
            main_left=-WINDOW_WIDTH/4;
            main_top =-WINDOW_HEIGHT/4;
        }
    }
    return [main_left,main_top];
}

var scale = 1;
//将mainOffcanvas画布缓慢放大，与后面真正的具体画布无缝衔接
function slowLarge() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(mainOffCanvas,0,0,WINDOW_WIDTH,WINDOW_HEIGHT,main_left,main_top,WINDOW_WIDTH*scale,WINDOW_HEIGHT*scale);
    scale+=0.0005;
     let log2 = window.requestAnimationFrame(slowLarge);
    if(scale >= 2){
        scale = 2;
        window.cancelAnimationFrame(log2);
        moveRightCanvas();
    }
}
//将对应id的画布移动到正确位置
//根据不同的id，设置对应画布的不同起点

function moveRightCanvas(){
    a-=0.2*k2;
    b-=0.2;
    let log3 = window.requestAnimationFrame(moveRightCanvas);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(whichCanvas,0,0,WINDOW_WIDTH,WINDOW_HEIGHT,a,b,WINDOW_WIDTH,WINDOW_HEIGHT);
    if(a<=0){a=0;}
    if(b<=0){b=0;}
    if(a<=0 && b<=0){
        window.cancelAnimationFrame(log3);
    }
}

//计算对应画布应该开始移动的起点
function canvasStart() {
    if(id === 1){
        a = WINDOW_WIDTH/4;
        b = WINDOW_HEIGHT/4;
        p=q=0;
    }
    if(id === 2){
        a = WINDOW_WIDTH*3/4;
        b = WINDOW_HEIGHT/4;
        p = WINDOW_WIDTH/2;
        q = 0;
    }
    if(id === 3){
        a = WINDOW_WIDTH/4;
        b = WINDOW_HEIGHT*3/4;
        p = 0;
        q = WINDOW_HEIGHT/2;
    }
    if(id === 4){
        a = WINDOW_WIDTH*3/4;
        b = WINDOW_HEIGHT*3/4;
        p = WINDOW_WIDTH/2;
        q = WINDOW_HEIGHT/2;
    }
    return [a,b,p,q];
}