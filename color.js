class Color {
  constructor (...[vals]) {
    this.vals = vals.map(x => Math.round(x));
  }

  get r() { return this.vals[0]; }
  get g() { return this.vals[1]; }
  get b() { return this.vals[2]; }
  toString() {
    return `rgb(${this.r},${this.g},${this.b})`;
  }

  //returns average color from ImageData
  static fromImageData(imgData) {
    let arr = imgData.data;

    let rgb = [0,0,0];
    let count = 0;
    for (let i = 0; i < arr.length; i += 4) {
      count++;
      rgb[0] += arr[i];
      rgb[1] += arr[i+1];
      rgb[2] += arr[i+2];
    }

    return new Color(rgb.map(x => x/count));
  }
}

