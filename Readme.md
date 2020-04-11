# Tessellations
This project is a cute little program that loads up a random image and draws triangles over it. It is meant to be nothing more than a simple screen saver like application.
## Live Demo
Navigate to https://edricy.github.io/Tessalations/demo (tested in Google Chrome)
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