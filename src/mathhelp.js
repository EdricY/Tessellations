
export default class MathHelp {
  static lerp(a, b, frac) {
    return (a * frac) + (b * (1-frac))
  }

  static randFloat(a, b) {
    let rng = b-a;
    return (Math.random() * rng) + a
  }

  static randInt(a, b) {
    let rng = b-a;
    return Math.floor(Math.random() * rng) + a
  }

  static compareInts(a, b) { return a-b }
  
  static randNearHalf() {
    return Math.round(MathHelp.randFloat(.4,.6) * 100) / 100
  }
}
