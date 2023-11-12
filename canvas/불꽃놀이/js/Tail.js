import CanvasOption from "./canvasOption.js";
import { randomNumBetween } from "./utils.js";

export default class Tail extends CanvasOption {
  // y값은 아래에 고정되어있고, 꼬리가 하늘로 올라갈 때 vy값 필요
  constructor(x, vy, colorDeg) {
    super();
    this.x = x;
    this.y = this.canvasHeight;
    this.vy = vy;
    this.colorDeg = colorDeg;
    this.angle = randomNumBetween(0, 2);
    this.friction = 0.985;
  }
  update() {
    this.vy *= this.friction;
    this.y += this.vy;

    this.x += Math.cos(this.angle) * this.vy * 0.2; // 좌우로 왔다갔다

    this.opacity = -this.vy * 0.1;
  }
  // 기본 원
  draw() {
    this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65%, ${this.opacity}`;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
}
