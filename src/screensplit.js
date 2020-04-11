import Triangle from "./triangle"
import Point from "./point"
import MathHelp from "./mathhelp";

export default class ScreenSplitter {
  constructor(x, y, w, h) {
    this.tl = new Point(x, y);
    this.tr = new Point(x+w, y);
    this.bl = new Point(x, y+h);
    this.br = new Point(x+w, y+h);

    this.tm = Point.midpoint(this.tl, this.tr, MathHelp.randNearHalf());
    this.bm = Point.midpoint(this.bl, this.br, MathHelp.randNearHalf());
    this.ml = Point.midpoint(this.tl, this.bl, MathHelp.randNearHalf());
    this.mr = Point.midpoint(this.tr, this.br, MathHelp.randNearHalf());
    
    this.c = new Point(
      MathHelp.lerp(0, w, MathHelp.randFloat(.1,.9)),
      MathHelp.lerp(0, h, MathHelp.randFloat(.1,.9))
    );

  }

  randomSplit() {
    let splitMethods = [
      "split1",
      "split2",
      "split3",
      "split4",
      "split5",
      "split6",
      "split7",
      "split8",
      "split9",
    ]
    let idx = MathHelp.randInt(0, splitMethods.length);
    let method = this[splitMethods[idx]];
    return method.call(this);
  }

  // split like: |\|
  split1() {
    return [
      new Triangle(this.tl, this.bl, this.br),
      new Triangle(this.tr, this.br, this.tl),
    ]
  }

  // split like: |/|
  split2() {
    return [
      new Triangle(this.tl, this.bl, this.tr),
      new Triangle(this.tr, this.br, this.bl),
    ]
  }

  // split like: |/\|
  split3() {
    return [
      new Triangle(this.tl, this.bl, this.tm),
      new Triangle(this.br, this.bl, this.tm),
      new Triangle(this.br, this.tr, this.tm),
    ]
  }

  // split like: |\/|
  split4() {
    return [
      new Triangle(this.tl, this.bl, this.bm),
      new Triangle(this.tl, this.tr, this.bm),
      new Triangle(this.br, this.tr, this.bm),
    ]
  }

  // split like: |>|
  split5() {
    return [
      new Triangle(this.tl, this.mr, this.tr),
      new Triangle(this.tl, this.mr, this.bl),
      new Triangle(this.br, this.mr, this.bl),
    ]
  }

  // split like: |<|
  split6() {
    return [
      new Triangle(this.tl, this.ml, this.tr),
      new Triangle(this.br, this.ml, this.tr),
      new Triangle(this.br, this.ml, this.bl),
    ]
  }

  // split like: |><|
  split7() {
    return [
      new Triangle(this.tl, this.tr, this.c),
      new Triangle(this.br, this.tr, this.c),
      new Triangle(this.bl, this.br, this.c),
      new Triangle(this.tl, this.bl, this.c),
    ]
  }

  // split like: |<->|
  split8() {
    return [
      new Triangle(this.tl, this.tm, this.ml),
      new Triangle(this.tr, this.tm, this.mr),
      new Triangle(this.bl, this.bm, this.ml),
      new Triangle(this.br, this.bm, this.mr),
      new Triangle(this.tm, this.ml, this.mr),
      new Triangle(this.bm, this.ml, this.mr),
    ]
  }

  // split like: |<|>|
  split9() {
    return [
      new Triangle(this.tl, this.tm, this.ml),
      new Triangle(this.tr, this.tm, this.mr),
      new Triangle(this.bl, this.bm, this.ml),
      new Triangle(this.br, this.bm, this.mr),
      new Triangle(this.tm, this.bm, this.mr),
      new Triangle(this.tm, this.bm, this.ml),
    ]
  }
}