const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // 도구 선택 getContext
/* dpr 높을수록 더 선명하다 */
const dpr = window.devicePixelRatio;
/*
캠퍼스 사이즈를 조절하는 방식
1. 직접 css로 작업
2. method 이용
*/

const canvasWidth = 300;
const canvasHeight = 300;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

// 사각형
// ctx.fillRect(10, 10, 50, 50);
// fillRect(시작하는 x위치, 시작하는 y위치, 가로길이, 세로길이) 사각형

class Particle {
  // particle을 class instance로 생성
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    // 원
    ctx.beginPath(); // 경로 그리기 시작한다고 알려줘야함
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    // fillRect(시작하는 x위치, 시작하는 y위치, 반지름길이, 시작하는 각도, 끝나는 각도, 시계방향일지 반시계방향일지) 원
    // ctx.stroke(); //선만 준다
    ctx.fillStyle = "red";
    ctx.fill(); //섹싱을 준다
    ctx.closePath(); // 끝냈다고 알려줘야함
  }
}

const x = 100;
const y = 100;
const radius = 50;

const particle = new Particle(x, y, radius);
particle.draw();

function animate() {
  window.requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // clearRect(시작하는 x위치, 시작하는 y위치, width, height) => 매 순번마다 지우고 다시그리기를 반복
  particle.draw();
}

animate();
