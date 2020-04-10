class ImageTessellator {

  static FitOptions = {
    FIT: 0,      // largest possible size while still fitting inside canvas
    FILL: 1,     // fill canvas completely while keeping aspect ratio
    SAME: 2,     // draw at original image size
    STRETCH: 3,  // stretch to canvas dimensions
  }

  static TraversalOptions = {
    LARGEST_FIRST: 0,
    IN_ORDER: 1,
    RANDOM_ORDER: 2,
  }

  static defaultOptions = {
    //TODO rename me, reuse with tempcanvas in color calculation
    imgCompressionRatio: .25, // img used for determining color will be stored at this side-length ratio
    // number from 0 to 1. smaller value means less color accuracy but faster processing
    
    //TODO: is this option useful? maxCanvasWidth: 1920,

    fitMethod: ImageTessellator.FitOptions.FIT,
    
    traversalMode: ImageTessellator.TraversalOptions.LARGEST_FIRST,
    
    loadCallback: null,
    
    backgroundColor: "#555",
    strokeColor: "#555",
    //TODO: no stroke option

    minColorArea: 50,
    itersPerTick: Infinity,//200,
    areaPerTick: 10000,

    renderImgPieces: false, //set to true to draw pieces of the actual image when triangles are tiny

    //fade can only happen if renderImgPieces is false
    doFadeAfter: false,
    fadeDelay: 500, //in ms
  }

  constructor(canvas, image, options) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.tessellatingComplete = false;
    this.done = false;
    this.options = {};
    for (let key in ImageTessellator.defaultOptions) {
      if (options.hasOwnProperty(key)) this.options[key] = options[key];
      else this.options[key] = ImageTessellator.defaultOptions[key];
    }

    if (typeof image == "string") {
      let src = image;
      image = new Image()
      image.src = src;
    }
    this.imgLoaded = image.complete
    image.crossOrigin = "Anonymous";

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

    if (this.imgLoaded) this.imgAfterLoad(image);
    else image.addEventListener("load", e => this.imgAfterLoad(e.target))
  }

  imgAfterLoad(img) {
    // setup canvas, imgCanvas, and pieceCanvas
    this.imgLoaded = true;
    
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;

    this.imgCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
    this.imgCtx = this.imgCanvas.getContext("2d");
    this.imgCtx.fillStyle = this.options.backgroundColor;
    this.imgCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.placeImage(this.imgCtx, img, this.options.fitMethod);
  
    if (this.options.renderImgPieces) {
      this.pieceCanvas = new OffscreenCanvas(this.canvas.width, this.canvas.height);
      this.pieceCtx = this.pieceCanvas.getContext("2d");
    }

    this.addPrimerTriangles();

    let onload = this.options.loadCallback
    if (typeof onload == "function") onload();
    if (typeof onload == "string") this[onload]();
  }

  placeImage(context, img, fitMethod) {
    context.save();
    let imgw = img.width;
    let imgh = img.height;
    let cw = context.canvas.width;
    let ch = context.canvas.height;

    if (fitMethod == ImageTessellator.FitOptions.SAME) {
      context.drawImage(img, Math.round((cw-imgw)/2), Math.round((ch-imgh)/2));
      return;
    }

    if (fitMethod == ImageTessellator.FitOptions.STRETCH) {
      context.drawImage(img, 0, 0, imgw, imgh, 0, 0, cw, ch);
      return;
    }

    let aspectRatio = imgw / imgh;
    let canvasRatio = cw / ch;
    let w = imgw;
    let h = imgh;
  
    if (fitMethod == ImageTessellator.FitOptions.FIT) {
      if (canvasRatio > aspectRatio) w = Math.round(h * canvasRatio)
      else h = Math.round(w / canvasRatio)
    }
  
    else if (fitMethod == ImageTessellator.FitOptions.FILL) {
      if (canvasRatio > aspectRatio) h = Math.round(w / canvasRatio)
      else w = Math.round(h * canvasRatio)
    }
  
    context.drawImage(img,
      Math.round((imgw - w)/2), Math.round((imgh - h)/2), w, h,
      0, 0, cw, ch
    );

  }

  addPrimerTriangles() {
    if (!this.imgLoaded) throw new Error("Tried to add priming triangles before image was loaded.");
    //TODO: if desired, black bars from fit/same should removed at this stage.
    let splitter = new ScreenSplitter(this.canvas.width, this.canvas.height);
    let firstTriangles = splitter.randomSplit();
    firstTriangles.forEach(tri => this.triangles.push(tri));
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
    this.tempCtx.fillStyle = this.options.backgroundColor;
    this.tempCtx.fillRect(0, 0, 1, 1);
    this.tempCtx.drawImage(this.imgCanvas, x, y, w, h, 0, 0, 1, 1);
    let data = this.tempCtx.getImageData(0,0,1,1).data
    return new Color(data);

    //TODO cleanup new implementation
    /*
    let imgData = this.imgCtx.getImageData(x, y, w, h);
    return Color.fromImageData(imgData);
    */
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
    cancelAnimationFrame(this.currentRafId);
    requestAnimationFrame(() => this.animate());
  }

  pauseAnimation() {
    cancelAnimationFrame(this.currentRafId);
  }

  animate() {
    if (this.tessellatingComplete) return;
    this.tick();
    this.currentRafId = requestAnimationFrame(() => this.animate());
  }

  tick() {
    let flushPieces = false; 
    let iters = 0;
    let area = 0;
    while (true) {
      let triangle = this.processOne();
      if (this.tessellatingComplete) break;
  
      //non-renderables only count if we render pieces
      if (this.isRenderable(triangle)) {
        iters++;
        area += triangle.area;
      } else if (this.options.renderImgPieces) {
        flushPieces = true;
        iters++;
        area += triangle.area;
      }
      
      if (iters >= this.options.itersPerTick) break;
      if (area >= this.options.areaPerTick) break;
    }
  
    // console.log(area, iters);
  
    if (this.options.renderImgPieces && flushPieces) this.flushImagePieces();
  
    if (this.tessellatingComplete) {
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
    let triangle = this.options.traversalMode == ImageTessellator.TraversalOptions.IN_ORDER 
      ? this.triangles.shift()
      : this.triangles.pop()
    ;

    if (triangle == null) {
      this.tessellatingComplete = true;
      return null;
    }

    if (this.isRenderable(triangle)) { 
      triangle.draw(this.ctx, this.getTriangleColor(triangle), this.options.strokeColor);
      let subs = triangle.getSubTriangles()
      subs.forEach(sub => this.triangles.push(sub))
    } else if (this.options.renderImgPieces) { //dispose img-triangle intersection to piece canvas
      triangle.draw(this.pieceCtx);
    }
    return triangle;
  }

  beginFade() {
    // reuse tempCanvas to store current state
    this.tempCanvas.width = this.canvas.width;
    this.tempCanvas.height = this.canvas.height;

    this.tempCtx.fillStyle = this.options.backgroundColor;
    this.tempCtx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    this.tempCtx.drawImage(this.canvas, 0, 0);

    this.fadeAlpha = 0;
    requestAnimationFrame(() => this.fadeToImg());
  }
  
  fadeToImg() {
    this.ctx.globalAlpha = 1;
    this.ctx.drawImage(this.tempCanvas, 0, 0);

    this.ctx.globalAlpha = this.fadeAlpha += .01;
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