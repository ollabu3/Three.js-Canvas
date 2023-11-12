import CanvasOption from "./canvasOption.js";

export default class Particle extends CanvasOption {
  constructor(x, y, vx, vy, opacity, color) {
    super();
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.opacity = opacity;
    this.gravity = 0.12;
    this.friction = 0.93;
    this.color = color;
  }
  update() {
    this.vy += this.gravity;

    this.vx *= this.friction; //점점느려져서 0으로 수렴하게
    this.vy *= this.friction; //점점느려져서 0으로 수렴하게
    this.x += this.vx;
    this.y += this.vy;

    this.opacity -= 0.01;
  }

  // 기본 원
  draw() {
    this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65%, ${this.opacity}`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
