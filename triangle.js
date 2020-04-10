class Point {
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

class Triangle {
  constructor(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }

  get boundingBox() {
    let { p1, p2, p3 } = this;
    let xs = [p1.x, p2.x, p3.x];
    let ys = [p1.y, p2.y, p3.y];
    xs.sort(MathHelp.compareInts);
    ys.sort(MathHelp.compareInts);
    let x = xs[0];
    let y = ys[0];
    let w = xs[2] - xs[0];
    let h = ys[2] - ys[0];
    return { x, y, w, h };
  }

  get area2() {
    let { p1, p2, p3 } = this;
    return Math.abs(p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y))
  }

  get area() {
    return this.area2 / 2
  }

  get centroid() {
    let x = (this.p1.x + this.p2.x + this.p3.x) / 3;
    let y = (this.p1.y + this.p2.y + this.p3.y) / 3;
    return new Point(x, y);
  }

  draw(ctx, fillColor="orange", strokeColor="#555") {
    ctx.fillStyle = fillColor.toString();
    ctx.strokeStyle = strokeColor;
    ctx.lineJoin = "bevel";
    ctx.lineWidth = Math.sqrt(this.area) / 10;
    if (ctx.lineWidth < 2) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = fillColor;
    }
    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.lineTo(this.p3.x, this.p3.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  
  getSubSierpinksis() {
    let { p1, p2, p3 } = this;
    let p4 = Point.midpoint(p1, p2, MathHelp.randNearHalf());
    let p5 = Point.midpoint(p1, p3, MathHelp.randNearHalf());
    let p6 = Point.midpoint(p2, p3, MathHelp.randNearHalf());
    return [
      new Triangle(p1, p4, p5),
      new Triangle(p2, p4, p6),
      new Triangle(p3, p5, p6),
      new Triangle(p4, p5, p6),
    ]
  }

  getHalves() {
    let { p1, p2, p3 } = this;
    let d1 = Point.distsq(p2, p3);
    let d2 = Point.distsq(p1, p3);
    let d3 = Point.distsq(p1, p2);

    let d = Math.max(d1, d2, d3)

    //rotate points so p1 is across from longest dist
    if (d2 == d) {
      let temp = p1;
      p1 = p2;
      p2 = temp;

    } else if (d3 == d) {
      let temp = p1;
      p1 = p3;
      p3 = temp;
    }

    let mp = Point.midpoint(p2, p3, MathHelp.randNearHalf());

    return [
      new Triangle(p1, p2, mp),
      new Triangle(p1, p3, mp),
    ]
  }

  getCentroidSubs() {
    let { p1, p2, p3 } = this;
    let c = this.centroid;
    return [
      new Triangle(c, p1, p2),
      new Triangle(c, p1, p3),
      new Triangle(c, p2, p3),
    ]
  }
}
