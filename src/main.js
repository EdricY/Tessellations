import BinaryHeap from "./heap";
import ScreenSplitter from "./screensplit";
import Color from "./color";

export default class ImageTessellator {

  static get FitOptions() {
    return {
      FIT: 0,      // largest possible size while still fitting inside canvas
      FILL: 1,     // fill canvas completely while keeping aspect ratio
      SAME: 2,     // draw at original image size
      STRETCH: 3,  // stretch to canvas dimensions
    }
  }

  static get TraversalOptions() {
    return {
      LARGEST_FIRST: 0,
      IN_ORDER: 1,
      RANDOM_ORDER: 2,
    }
  }

  static get SplitOptions() {
    return {
      HALVE: 0,
      SIERPINSKI: 1,
      CENTROID: 2,
    }
  }

  static get defaultOptions() {
    return {
      imgSampleRatio: .01, // 0 to 1. smaller value means less color accuracy but faster processing

      fitMethod: ImageTessellator.FitOptions.FIT,
      
      traversalMode: ImageTessellator.TraversalOptions.LARGEST_FIRST,

      splitMode: ImageTessellator.SplitOptions.HALVE,
      
      loadCallback: null,
      
      backgroundColor: "#567",
      strokeColor: "#555",
      doStroke: true,

      minColorArea: 50,
      itersPerTick: 200,
      areaPerTick: 10000,
      tickMinDuration: 0,

      renderImgPieces: false, //set to true to draw pieces of the actual image when triangles are tiny

      //fade can only happen if renderImgPieces is false
      doFadeAfter: false,
      fadeDelay: 500, //in ms
    }
  }

  constructor(canvas, image, options) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.tessellatingComplete = false;
    this.done = false;
    if (options == null) options = {};
    this.options = {}
    for (let key in ImageTessellator.defaultOptions) {
      if (options.hasOwnProperty(key)) this.options[key] = options[key];
      else this.options[key] = ImageTessellator.defaultOptions[key];
    }

    if (typeof image == "string") {
      let src = image;
      image = new Image()
      image.src = src;
    }
    image.crossOrigin = "Anonymous";
    this.imgLoaded = image.complete

    this.tempCanvas = new OffscreenCanvas(1, 1);
    this.tempCtx = this.tempCanvas.getContext("2d");
    
    // init triangles collection
    switch (this.options.traversalMode) {
      case ImageTessellator.TraversalOptions.RANDOM_ORDER:
        this.triangles = new BinaryHeap(() => Math.random());
        break;
      case ImageTessellator.TraversalOptions.LARGEST_FIRST:
        this.triangles = new BinaryHeap(triangle => triangle.area2);
        break;
      case ImageTessellator.TraversalOptions.IN_ORDER:
        this.triangles = [];
        break;
    }

    if (this.imgLoaded) setTimeout(this.imgAfterLoad(image), 0);
    else image.addEventListener("load", e => this.imgAfterLoad(e.target))
  }

  imgAfterLoad(img) {
    // setup canvas, imgCanvas, and pieceCanvas
    this.imgLoaded = true;
    let cw = this.canvas.clientWidth;
    let ch = this.canvas.clientHeight;
    this.canvas.width = cw;
    this.canvas.height = ch;
    this.ctx.fillStyle = this.options.backgroundColor;
    this.ctx.fillRect(0, 0, cw, ch)

    this.tempCanvas.width = cw;
    this.tempCanvas.height = ch;

    this.imgCanvas = new OffscreenCanvas(cw, ch);
    this.imgCtx = this.imgCanvas.getContext("2d");
    this.imgCtx.fillStyle = this.options.backgroundColor;
    this.imgCtx.fillRect(0, 0, cw, ch);

    this.imgBounds = this.placeImage(this.imgCtx, img, this.options.fitMethod);
    // this.addPrimerTriangles(box);
    
    if (this.options.renderImgPieces) {
      this.pieceCanvas = new OffscreenCanvas(cw, ch);
      this.pieceCtx = this.pieceCanvas.getContext("2d");
    }

    let onload = this.options.loadCallback
    if (typeof onload == "function") onload();
    if (typeof onload == "string") this[onload]();
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} context 
   * @param {CanvasImageSource} img 
   * @param {number} fitMethod 
   * @returns {{x:number, y:number, w:number, h:number}} 
   *    rectangle representing image position on canvas 
   */
  placeImage(context, img, fitMethod) {
    context.save();
    let imgw = img.width;
    let imgh = img.height;
    let cw = context.canvas.width;
    let ch = context.canvas.height;

    if (fitMethod == ImageTessellator.FitOptions.SAME) {
      let x = Math.round((cw-imgw)/2);
      let y = Math.round((ch-imgh)/2);
      context.drawImage(img, x, y);
      return { x, y, w: imgw, h: imgh };
    }

    if (fitMethod == ImageTessellator.FitOptions.STRETCH) {
      context.drawImage(img, 0, 0, imgw, imgh, 0, 0, cw, ch);
      return { x: 0, y: 0, w: cw, h: ch };
    }

    let aspectRatio = imgw / imgh;
    let canvasRatio = cw / ch;
    let w = cw;
    let h = ch;
  
    if (fitMethod == ImageTessellator.FitOptions.FIT) {
      if (canvasRatio > aspectRatio) w = Math.round(h * aspectRatio);
      else h = Math.round(w / aspectRatio);
    }
    
    else if (fitMethod == ImageTessellator.FitOptions.FILL) {
      if (canvasRatio > aspectRatio) h = Math.round(w / aspectRatio);
      else w = Math.round(h * aspectRatio);
    }
  
    let cbox = { x: Math.round((cw-w)/2), y: Math.round((ch-h)/2), w, h }
    context.drawImage(img,
      0, 0, imgw, imgh,
      cbox.x, cbox.y, cbox.w, cbox.h
    );

    return cbox;
  }

  getPrimerTriangles(box) {
    if (!this.imgLoaded) throw new Error("Tried to add priming triangles before image was loaded.");
    let splitter = new ScreenSplitter(box.x, box.y, box.w, box.h);
    return splitter.randomSplit();
  }

  /**
   * Checks if a triangle should be represented by a solid color
   * @param {Triangle} triangle 
   * @returns true if the triangle should be drawn as a solid color
   */
  isRenderable(triangle) {
    return triangle.area > this.options.minColorArea;
  }

  /**
   * Finds the color for which the given triangle should be drawn 
   * @param {Triangle} triangle 
   */
  getTriangleColor(triangle) {
    if (!this.imgLoaded) throw new Error("Tried to calculate color before image was loaded.");
    let box = triangle.boundingBox;
    let { x, y, w, h } = box;
    x = Math.floor(x);
    y = Math.floor(y);
    w = Math.ceil(w);
    h = Math.ceil(h);
    if (w < 1) w = 1;
    if (h < 1) h = 1;
    let sampleW = Math.ceil(w * this.options.imgSampleRatio)
    let sampleH = Math.ceil(h * this.options.imgSampleRatio)

    this.tempCtx.fillStyle = this.options.backgroundColor;

    this.tempCtx.drawImage(this.imgCanvas, x, y, w, h, 0, 0, sampleW, sampleH);
    let imgData = this.tempCtx.getImageData(0, 0, sampleW, sampleH)
    return Color.fromImageData(imgData);
  }

  /**
   * Takes the intersection of the triangles drawn to pieceCanvas and
   * the actual image and flushes them to the main canvas
   */
  flushImagePieces() {
    this.pieceCtx.save();
    this.pieceCtx.globalCompositeOperation = "source-in";
    this.pieceCtx.drawImage(this.imgCanvas, 0, 0, this.pieceCanvas.width, this.pieceCanvas.height);
    this.pieceCtx.restore();
    this.ctx.drawImage(this.pieceCanvas, 0, 0);
  }

  playAnimation() {
    window.cancelAnimationFrame(this.currentRafId);
    this.lastTick = 0;
    window.requestAnimationFrame(t => this.animate(t));
  }

  pauseAnimation() {
    window.cancelAnimationFrame(this.currentRafId);
  }

  animate(t) {
    if (this.tessellatingComplete) return;

    if (t - this.lastTick > this.options.tickMinDuration) {
      this.lastTick = t;
      this.tick();
    }

    this.currentRafId = window.requestAnimationFrame(t => this.animate(t));
  }

  tick() {
    let flushPieces = false;
    let iters = 0;
    let area = 0;
    while (true) {
      let triangle = this.processOne();
      
      //non-renderables only count if we render pieces
      if (this.isRenderable(triangle)) {
        iters++;
        area += triangle.area;
      } else if (this.options.renderImgPieces) {
        flushPieces = true;
        iters++;
        area += triangle.area;
      }
      
      if (this.tessellatingComplete) break;
      if (iters >= this.options.itersPerTick) break;
      if (area >= this.options.areaPerTick) break;
    }
  
    // console.log(area, iters);
  
    if (this.options.renderImgPieces && flushPieces) this.flushImagePieces();
  
    if (this.tessellatingComplete) {
      //either draw to fill in gaps, fade to image, or leave it alone
      if (this.options.renderImgPieces) {
        this.ctx.drawImage(this.imgCanvas, 0, 0, this.canvas.width, this.canvas.height);
        this.done = true;
      }
      if (!this.options.doFadeAfter) this.done = true;
      else this.beginFade();
      return;
    }
  }

  /**
   * Processes and draws one triangle. If there are no triangles left, the tessellatingComplete flag is set.
   */
  processOne() {
    let { traversalMode, splitMode, doStroke, strokeColor, renderImgPieces } = this.options;
    if (this.triangles.length == 0) { // first time called
      let primers = this.getPrimerTriangles(this.imgBounds);
      for (let tri of primers) {
        tri.draw(this.ctx, this.getTriangleColor(tri), doStroke, strokeColor);
        this.triangles.push(tri)
      }
      return { area: this.imgBounds.w * this.imgBounds.h };
    }

    let triangle = traversalMode == ImageTessellator.TraversalOptions.IN_ORDER 
    ? this.triangles.shift()
    : this.triangles.pop();

    if (this.triangles.length == 0) this.tessellatingComplete = true;
    
    let subs = this.getSubTriangles(triangle, splitMode);
    if (this.isRenderable(triangle)) {
      for (let sub of subs) {
        sub.draw(this.ctx, this.getTriangleColor(sub), doStroke, strokeColor);
        this.triangles.push(sub)
      }
    } else if (renderImgPieces) { //dispose img-triangle intersection to piece canvas
      triangle.draw(this.pieceCtx);
    }

    return triangle;
  }

  getSubTriangles(triangle, splitMode) {
    switch (splitMode) {
      case ImageTessellator.SplitOptions.HALVE:
        return triangle.getHalves();
      case ImageTessellator.SplitOptions.SIERPINSKI:
        return triangle.getSubSierpinksis();
      case ImageTessellator.SplitOptions.CENTROID:
        return triangle.getCentroidSubs();
    }
    return [];
  }

  beginFade() {
    // reuse tempCanvas to store current state
    this.tempCtx.fillStyle = this.options.backgroundColor;
    this.tempCtx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.tempCtx.drawImage(this.canvas, 0, 0);

    this.fadeAlpha = 0;
    requestAnimationFrame(() => this.fadeToImg());
  }
  
  fadeToImg() {
    this.ctx.globalAlpha = 1;
    this.ctx.drawImage(this.tempCanvas, 0, 0);
    this.fadeAlpha += .01
    this.ctx.globalAlpha = this.fadeAlpha;
    this.ctx.drawImage(this.imgCanvas, 0, 0, this.canvas.width, this.canvas.height);
    
    if (this.fadeAlpha < 1) requestAnimationFrame(() => this.fadeToImg());
  }

}

if (!window.OffscreenCanvas) {
  window.OffscreenCanvas = class OffscreenCanvas {
    constructor(width, height) {
      let canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      return canvas;
    }
  };
}

if (process.browser) window.ImageTessellator = ImageTessellator;
