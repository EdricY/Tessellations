(function init() {
  img.src = srcs[MathHelp.randInt(0, srcs.length)];
  img.addEventListener("load", () => {
    // finish setting up globals with img width
    
    let aspectRatio = img.width / img.height
    let windowRatio = window.innerWidth / window.innerHeight;
    let w = window.innerWidth
    let h = window.innerHeight
    if (windowRatio > aspectRatio) w = Math.round(h * aspectRatio)
    else h = Math.round(w / aspectRatio)
    canvas.width = w;
    canvas.height = h;
    if (canvas.width > 1920) { //scale down if too large...
      canvas.height *= 1920 / canvas.width;
      canvas.width = 1920;
      canvas.style.width = w + "px"
      canvas.style.height = h + "px"
    }
    imgCanvas = newOffscreenCanvas(img.width * IMG_COMPRESSION, img.height * IMG_COMPRESSION)
    imgCtx = imgCanvas.getContext("2d");
    imgCtx.drawImage(img,
      0, 0, img.width, img.height,
      0, 0, imgCanvas.width, imgCanvas.height
    );

    imgRatio = imgCanvas.width / canvas.width;
  
    pieceCanvas = newOffscreenCanvas(canvas.width, canvas.height);
    pieceCtx = pieceCanvas.getContext("2d");
    
    MIN_RENDERABLE_AREA = 16;
    AREA_PER_TICK = canvas.width * canvas.height / 64;
    beginTessellation()
  })
})(); //iife

function beginTessellation() {
  if (mode == TraversalMode.RANDOM) triangles = new BinaryHeap(() => Math.random());
  else if (mode == TraversalMode.LARGEST) triangles = new BinaryHeap(score);
  else if (mode == TraversalMode.IN_ORDER) triangles = [];
  let c = new Point(
    MathHelp.lerp(0, canvas.width, MathHelp.randFloat(.1,.9)),
    MathHelp.lerp(0, canvas.height, MathHelp.randFloat(.1,.9))
  );

  let splitter = new ScreenSplitter(canvas.width, canvas.height);
  let firstTriangles = splitter.randomSplit();
  firstTriangles.forEach(tri => triangles.push(tri));

  requestAnimationFrame(tick);
}

function score(triangle) {
  return triangle.area2;
}

/**
 * Checks if a triangle should be represented by a solid color or not
 * @param {Triangle} triangle 
 * @returns true if the triangle should be drawn as a solid color
 */
function isRenderable(triangle) {
  return triangle.area > MIN_RENDERABLE_AREA;
}

/**
 * Finds the color for which the given triangle should be drawn 
 * @param {Triangle} triangle 
 */
function getTriangleColor(triangle) {
  //TODO: maybe this should go in the Triangle class
  let box = triangle.boundingBox;
  let { x, y, w, h } = box;
  x = Math.floor(x * imgRatio);
  y = Math.floor(y * imgRatio);
  w = Math.ceil(w * imgRatio);
  h = Math.ceil(h * imgRatio);
  if (w < 1) w = 1;
  if (h < 1) h = 1;
  let imgData = imgCtx.getImageData(x, y, w, h);
  return Color.fromImageData(imgData);
}

/**
 * Takes the intersection of the triangles drawn to the piece canvas and
 * the actual image and flushes them to the main canvas
 */
function flushImagePieces() {
  pieceCtx.globalCompositeOperation = "source-in";
  pieceCtx.drawImage(img, 0, 0, pieceCanvas.width, pieceCanvas.height);
  ctx.drawImage(pieceCanvas, 0, 0);
}

/**
 * Handles iterating the correct number of times and flushing the piece canvas.
 * Also requests for itself to be run again.
 * Should be passed into requestAnimationFrame.
 */
function tick(time) {
  let flushPieces = false; 
  let iters = 0;
  let area = 0;
  while (true) {
    let triangle = iterate();
    if (done) break;

    //non-renderables only count when we draw pieces
    if (isRenderable(triangle)) {
      iters++;
      area += triangle.area;
    } else if (USE_IMG_PIECES) {
      flushPieces = true;
      iters++;
      area += triangle.area;
    }
    
    if (iters >= ITERS_PER_TICK) break;
    if (area > AREA_PER_TICK) break;
  }

  // console.log(area, iters);

  if (USE_IMG_PIECES && flushPieces) flushImagePieces();

  if (done) {
    console.log("done!");
    //reuse piece canvas to store current state (for fading)
    ctx.globalCompositeOperation = "source-over";
    pieceCtx.drawImage(canvas, 0, 0);
    requestAnimationFrame(fadeToImg);
    return;
  }

  requestAnimationFrame(tick)
}

/**
 * Processes and draws one triangle. If there are no triangles left, the done flag is set.
 */
function iterate() {
  let triangle = triangles.pop()
  
  if (triangle == null) {
    done = true;
    return null;
  }

  if (isRenderable(triangle)) { 
    triangle.draw(ctx, getTriangleColor(triangle));
    let subs = triangle.getSubTriangles()

    if (mode == TraversalMode.IN_ORDER) subs.forEach(sub => triangles.unshift(sub))
    else subs.forEach(sub => triangles.push(sub))
  } else if (USE_IMG_PIECES) { //dispose img-triangle intersection to piece canvas
    pieceCtx.globalCompositeOperation = "source-over";
    triangle.draw(pieceCtx);
  }
  return triangle;
}

let fadeAlpha = 0;
function fadeToImg() {
  ctx.globalAlpha = 1;
  ctx.drawImage(pieceCanvas, 0, 0);

  ctx.globalAlpha = fadeAlpha += .01;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  if (fadeAlpha < 1) requestAnimationFrame(fadeToImg)
  else console.log("fade done!")
}
