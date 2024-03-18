import * as PIXI from "./node_modules/pixi.js/dist/browser/pixi.min.mjs"
import {ImageTile} from "./imageTile.js";

 window.addEventListener("load", init);

 const canvas = document.getElementById('pb_page')

function init(){

    fetch("http://pinboard.pl/api/v1/publicImages/getOneComp/65ee50961d3e2b1e8fbd717e/65ee50a51d3e2b1e8fbd7184").then((response) => {
        return response.json();
    }).then((data) => {
        const comp = data.data.composition[0];


        let images = []
        comp.images.forEach( image => {images.push(new ImageTile(image))})



        images.forEach(image =>{ image.loadImage().then(()=>{
            mainContainer.addChild(image.container)
            console.log(image.imageSprite)})
        })



    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

    let pressedCanvas= {mouseX:0,mouseY:0,canvasX:0,canvasY:0}

    const mainContainer = new PIXI.Container()
    const app = new PIXI.Application({
        width: canvas.offsetWidth,
        height: canvas.offsetHeight,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        antialias: true,
        backgroundAlpha: 0
    })
    canvas.appendChild(app.view);
    app.stage.addChild(mainContainer)

    app.renderer.view.onpointerdown = (e) =>{
        pressedCanvas = {
            mouseY: e.clientY,
            mouseX: e.clientX,
            canvasX: e.clientX - mainContainer.x,
            canvasY: e.clientY - mainContainer.y
        }
        console.log(pressedCanvas)
    }

    app.renderer.view.onpointermove = (e)=>{
        if(e.buttons === 1){
            mainContainer.x=e.clientX-pressedCanvas.canvasX
            mainContainer.y=e.clientY-pressedCanvas.canvasY
        }

    }



}