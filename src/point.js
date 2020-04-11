import MathHelp from "./mathhelp";
export default class Point {
  constructor(x, y) {
    if (x == null) x = 0;
    if (y == null) y = 0;
    this.vals = [x, y];
  }
  
  get x() { return this.vals[0]; }
  get y() { return this.vals[1]; }

  static midpoint(p1, p2, frac=.5) {
    let x = MathHelp.lerp(p1.x, p2.x, frac);
    let y = MathHelp.lerp(p1.y, p2.y, frac);
    return new Point(x, y);
  }

  static distsq(p1, p2) {
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    return dx*dx + dy*dy
  }

  static dist(p1, p2) {
    return Math.sqrt(Point.distsq(p1, p2));
  }
}