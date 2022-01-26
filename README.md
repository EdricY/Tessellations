# Tessellations
This project is a cute little program that loads up a random image and draws triangles over it. It is meant to be nothing more than a simple screen saver like application.

Available as an [npm package](https://www.npmjs.com/package/image-tessellator)
## Live Demo
Navigate to https://edricy.github.io/Tessellations/demo (tested in Google Chrome)
## Download
`npm install image-tessellator`
### File include
`<script src="tessellator.js"></script>`
### ES6 Module
`import ImageTessellator from path/to/tessellator.es.js';`
### CommonJS
`require("image-tesselator");`
## Basic Usage
See the [demo code](demo/index.html)

Setup your canvas like you want it.
```
<style>
#c {
	width: 50vw;
	height: 50vh;
}
</style>
<canvas id="c"></canvas>
```
include the script
`<script src="/path/to/tessellator.js"></script>`

call the constructor
```
let c = document.getElementById("c");
let src = "path/to/img.png"
let tess = new  ImageTessellator(c, src, {loadCallback: "playAnimation"});
```

## Options

| Property            | Default    | Notes |
| --------------------|------------|-------|
| `imgSampleRatio    `| `.01`                            | 0 to 1. smaller value means less color accuracy but faster processing     |
| `fitMethod         `| `FitOptions.FIT`                 | Specifies how the canvas is fit to the container                          |
| `traversalMode     `| `TraversalOptions.LARGEST_FIRST` | Specifies what order triangles are processed                              |
| `splitMode         `| `SplitOptions.HALVE`             | Specifies how the triangles are split                                     |
| `loadCallback      `| `null`                           | called after the image loads                                              |
| `backgroundColor   `| `#567`                           |                                                                           |
| `strokeColor       `| `#555`                           |                                                                           |
| `doStroke          `| `true`                           |                                                                           |
| `minColorArea      `| `50`                             |                                                                           |
| `itersPerTick      `| `200`                            |                                                                           |
| `areaPerTick       `| `10000`                          |                                                                           |
| `tickMinDuration   `| `0`                              |                                                                           |
| `renderImgPieces   `| `false`                          | set to true to draw pieces of the actual image when triangles are tiny    |
| `doFadeAfter       `| `false`                          | fade the actual image on top when finished. renderImgPieces must be false |
| `fadeDelay         `| `500`,                           | number of ms to wait before doing the after fade                          |


An example with different options specified:
https://edricy.github.io/Tessellations/demo?splitMode=1&traversalMode=1&doStroke=false&doFadeAfter=true
```
FitOptions:
FIT: 0      // largest possible size while still fitting inside canvas
FILL: 1     // fill canvas completely while keeping aspect ratio
SAME: 2     // draw at original image size
STRETCH: 3  // stretch to canvas dimensions

TraversalOptions:
LARGEST_FIRST: 0
IN_ORDER: 1
RANDOM_ORDER: 2

SplitOptions:
HALVE: 0
SIERPINSKI: 1
CENTROID: 2
```
