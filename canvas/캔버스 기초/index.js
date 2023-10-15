/*

모니터들이 각각 해상도가 달라 주사율에 따라 requestAnimationFrame이 다르지만
우리가 정하는 fps로 1초에 몇번 코드를 실행시킬지 정해 now, then값으 차이를 통해 모든 모니터에서 동일하게 animation을 찍어낼 수 있다

*/

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // 도구 선택 getContext
/* dpr 높을수록 더 선명하다 */
const dpr = window.devicePixelRatio;
/*
캠퍼스 사이즈를 조절하는 방식
1. 직접 css로 작업
2. method 이용
*/

const canvasWidth = innerWidth; // 전체화면으로 초기화
const canvasHeight = innerHeight;

canvas.style.width = canvasWidth + "px";
canvas.style.height = canvasHeight + "px";

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

const feGaussianBlur = document.querySelector("feGaussianBlur");
const feColorMatrix = document.querySelector("feColorMatrix");

const controls = new (function () {
  this.blurValue = 40;
  this.alphaChannel = 100;
  this.alphaOffset = -23;
  this.acc = 1.03;
})();

let gui = new dat.GUI();

const f1 = gui.addFolder("Gooey Effect");
f1.open();
f1.add(controls, "blurValue", 0, 100).onChange((value) => {
  feGaussianBlur.setAttribute("stdDeviation", value);
});
f1.add(controls, "alphaChannel", 1, 200).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${controls.alphaOffset}`
  );
});
f1.add(controls, "alphaOffset", -40, 40).onChange((value) => {
  feColorMatrix.setAttribute(
    "values",
    `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${value}`
  );
});
const f2 = gui.addFolder("Particle Property");
f2.open();
f2.add(controls, "acc", 1, 1.5, 0.01).onChange((value) => {
  particles.forEach((particle) => (particle.acc = value));
});

// 사각형
// ctx.fillRect(10, 10, 50, 50);
// fillRect(시작하는 x위치, 시작하는 y위치, 가로길이, 세로길이) 사각형
class Particle {
  // particle을 class instance로 생성
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy; // 속도
    this.acc = 1.03; // 가속도
  }
  update() {
    this.vy *= this.acc;
    this.y += this.vy;
  }
  draw() {
    // 원
    ctx.beginPath(); // 경로 그리기 시작한다고 알려줘야함
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    // fillRect(시작하는 x위치, 시작하는 y위치, 반지름길이, 시작하는 각도, 끝나는 각도, 시계방향일지 반시계방향일지) 원
    // ctx.stroke(); //선만 준다
    ctx.fillStyle = "orange";
    ctx.fill(); //섹싱을 준다
    ctx.closePath(); // 끝냈다고 알려줘야함
  }
}

const x = 100;
const y = 100;
const radius = 50;

const particle = new Particle(x, y, radius);
const TOTAL = 20;
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

let particles = [];
for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvasWidth);
  const y = randomNumBetween(0, canvasHeight);
  const radius = randomNumBetween(50, 100);
  const vy = randomNumBetween(1, 5);
  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}

let interval = 1000 / 60; // 60 fps를 타겟으로
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;

  if (delta < interval) return;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // clearRect(시작하는 x위치, 시작하는 y위치, width, height) => 매 순번마다 지우고 다시그리기를 반복
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth);
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });
  then - now - (delta % interval);
}

animate();
