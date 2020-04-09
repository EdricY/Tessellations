(function init() {
  img.src = srcs[MathHelp.randInt(0, srcs.length)];
  img.addEventListener("load", () => {
    // finish setting up globals with img width
    let w = img.width
    let h = img.height
    canvas.width = w;
    canvas.height = h;
    imgCanvas = newOffscreenCanvas(w * imgRatio, h * imgRatio)
    imgCtx = imgCanvas.getContext("2d");
    imgCtx.drawImage(img,
      0, 0, w, h,
      0, 0, imgCanvas.width, imgCanvas.height
    );
  
    pieceCanvas = newOffscreenCanvas(canvas.width, canvas.height);
    pieceCtx = pieceCanvas.getContext("2d");
    
    let minw = Math.ceil((canvas.width / canvas.clientWidth) * 5);
    let minh = Math.ceil((canvas.height / canvas.clientHeight) * 5);
    MIN_RENDERABLE_AREA = minw * minh;
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
  console.log(firstTriangles)
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
  pieceCtx.drawImage(img, 0, 0);
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
  while (performance.now() - time < TICK_DUR) {
    let triangle = iterate();
    if (done) break;
    area += triangle.area;
    iters++;
    if (!isRenderable(triangle)) flushPieces = true;
    if (iters >= MAX_ITERS_PER_TICK) break;
    if (area > MAX_AREA_PER_TICK) break;
  }

  // console.log(area, iters);

  // if (flushPieces) flushImagePieces();

  if (done) {
    console.log("done!");
    requestAnimationFrame(fadeToImg);
    // setTimeout(() => ctx.drawImage(img, 0, 0), 1000);
    return;
  }

  let remaining = TICK_DUR - (performance.now() - time);
  if (remaining <= 0) requestAnimationFrame(tick) // no time to spare!
  else setTimeout(() => requestAnimationFrame(tick), Math.floor(remaining))
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
  } else { //dispose img-triangle intersection to piece canvas
    pieceCtx.globalCompositeOperation = "source-over";
    triangle.draw(pieceCtx);
  }
  return triangle;
}

let fadeAlpha = 0;
function fadeToImg() {
  fadeAlpha += .001;
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = fadeAlpha;
  ctx.drawImage(img, 0, 0);
  requestAnimationFrame(fadeToImg)
}
