const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const unit = 50;
const column = canvas.width / unit; // 1000 / 50 = 20
const row = canvas.height / unit; // 600 / 50 = 12

let ball = { x: 60, y: 20 , radius: 20, xSpeed: 20, ySpeed: 20 };
// let ballD = "RightDown";
let ground = { x: 100, y: 500, height: 5 };
let brickArray = [];

//min, max
function getRandomArbitrary(min, max){
    return min + Math.floor(Math.random() * (max - min));
}

class Brick {
    constructor(x, y){
        // this.x = Math.floor(Math.random() * column) * unit;
        this.x = x;
        // this.y = Math.floor(Math.random() * row) * unit;
        this.y = y;
        this.width = 50;
        this.height = 50;
        brickArray.push(this);
    }
    drawBrick() {
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    touchingBall(ballX, ballY) {
        return (ballX >= this.x - ball.radius && 
            ballX <= this.x + this.width + ball.radius && 
            ballY >= this.y - ball.radius && 
            ballY <= this.y + this.height + ball.radius);
    }
};
// let brick1 = new Brick();

//製作所有的brick
for(let i = 0; i < 10; i++){
    new Brick(getRandomArbitrary(0, 950), getRandomArbitrary(0, 550));
}

canvas.addEventListener("mousemove", (e) => {
    ground.x = e.clientX;
});

function draw() {
    //確認球是否有打到磚塊
    brickArray.forEach((brick, index) => {
        if(brick.touchingBall(ball.x, ball.y)){
            //改變x, y方向速度，並且將brick從brickArray中移除
            if(ball.y >= brick.y + brick.height){  //從下方撞擊
                ball.ySpeed *= -1;
            } else if(ball.y <= brick.y){   //從上方撞擊
                ball.ySpeed *= -1;
            } else if( ball.x <= brick.x){   //從左側撞擊
                ball.xSpeed *= -1;
            } else if ( ball.x >= brick.x + brick.width){  //從右側撞擊
                ball.xSpeed *=-1;
            }

            brickArray.splice(index, 1); //從array刪掉一個值
            if(brickArray.length == 0){
                alert("遊戲結束！");
                clearInterval(myGame);
            }
        }
    })

    //確認球有沒有打到橘色地板
    if(ball.x >= ground.x - ball.radius && ball.x <= ground.x + 200 + ball.radius && ball.y >= ground.y - ball.radius && ball.y <= ground.y + ball.radius){
        if(ball.ySpeed > 0){
            ball.y -= 40;
        } else {
            ball.y += 40;
        }
        ball.ySpeed *= -1;
    }

    //確認球有沒有打到邊界
    if(ball.x >= canvas.width - ball.radius){ // 右邊邊界
        ball.xSpeed *= -1;
    }
    if(ball.x <= ball.radius){ //  左邊邊界
        ball.xSpeed *= -1;
    }
    if(ball.y >= canvas.height - ball.radius){ // 下邊界
        ball.ySpeed *= -1;
    }
    if(ball.y < ball.radius){  //上邊界
        ball.ySpeed *= -1;
    }
    // 更動圓的座標
    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;
    // 我寫的確認球有沒有打到邊界
    // if(ballD == "RightDown"){
    //     ball.x += ball.xSpeed;
    //     ball.y += ball.ySpeed;
    //     if(ball.y > canvas.height - ball.radius){
    //         ball.y -= ball.ySpeed;
    //         ballD = "RightUp";
    //     } else if(ball.x > canvas.width - ball.radius){
    //         ball.x -= ball.xSpeed;
    //         ballD = "LeftDown";
    //     }
    // } else if(ballD == "RightUp"){
    //     ball.y -= ball.ySpeed;
    //     ball.x += ball.xSpeed;
    //     if(ball.x > canvas.width - ball.radius){
    //         ball.x -= ball.xSpeed;
    //         ballD = "LeftUp";
    //     } else if(ball.y < ball.radius ){
    //         ball.y += ball.ySpeed;
    //         ballD = "RightDown";
    //     }
    // } else if(ballD == "LeftUp"){
    //     ball.y -= ball.ySpeed;
    //     ball.x -= ball.xSpeed;
    //     if(ball.x < ball.radius){
    //         ball.x += ball.xSpeed;
    //         ballD = "RightUp";
    //     } else if(ball.y < ball.radius ){
    //         ball.y += ball.ySpeed;
    //         ballD = "LeftDown";
    //     }
    // } else if(ballD == "LeftDown"){
    //     ball.y += ball.ySpeed;
    //     ball.x -= ball.xSpeed;
    //     if(ball.x < ball.radius){
    //         ball.x += ball.xSpeed;
    //         ballD = "RightDown";
    //     } else if(ball.y > canvas.height - ball.radius){
    //         ball.y -= ball.ySpeed;
    //         ballD = "LeftUp";
    //     }
    // }

    // 每次背景要塗過一遍，背景全設定為黑色
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //畫出可控制的地板
    ctx.fillStyle = "orange";
    ctx.fillRect(ground.x, ground.y, 200, 5);

    //畫出圓球
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill();
    // ctx.fillRect(50, 0, unit, unit);

    //畫出所有的磚塊
    brickArray.forEach((brick) => {
        brick.drawBrick();
        console.log("drawBrick");
    });
}

let myGame = setInterval(draw, 25);