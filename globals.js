let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const srcs = [
  "imgs/image1.jpg",
  "imgs/image2.jpg",
  "imgs/image3.jpg",
  "imgs/image4.jpg",
  "imgs/image5.png",
]

let imgCanvas;
let imgCtx;
let img = new Image();
let imgRatio; // img will be stored at this side-length ratio
const IMG_COMPRESSION = .25; // img will be stored at this side-length ratio

let pieceCanvas;
let pieceCtx;


let triangles;
let done = false;

const TraversalMode = { LARGEST: 0, IN_ORDER: 1, RANDOM: 2 }
let mode = TraversalMode.LARGEST;
// let mode = Math.floor(Math.random() * 3);

 // TODO: maybe set all of these after finding out the img size?
const COLOR_SKIP = 0; //higher # should improve runtime by lowering color accuracy
const TAU = 2 * Math.PI;
// triangles will flush to canvas once iters or area quota has been reached
let ITERS_PER_TICK = 200;  // lower value makes ending slower
let AREA_PER_TICK = 10000; // lower value makes beginning slower
let MIN_RENDERABLE_AREA = 16;

const USE_IMG_PIECES = false; //set to true to draw pieces of the actual image when triangles are tiny
