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
var mode = TraversalMode.LARGEST;
// var mode = Math.floor(Math.random() * 3);

 // TODO: maybe set all of these after finding out the img size?
const COLOR_SKIP = 0; //higher # should improve runtime by lowering color accuracy
const TAU = 2 * Math.PI;
const TICK_DUR = 50; //in ms - longer tick means more is processed per tick, so it will be choppier,
                     //but not necessarily slower
const MAX_ITERS_PER_TICK = Infinity; //decrese for slower ending
const MAX_AREA_PER_TICK = 50000; //bounding box area - decrease for slower beginning
var MIN_RENDERABLE_AREA;
