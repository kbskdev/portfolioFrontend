//import * as PIXI from "pixi.js"
import {ImageTile} from "./imageTile.js";

 window.addEventListener("loadDemo", init);

 const canvas = document.getElementById('pb_canvas')

function init(){




    fetch("http://pinboard.pl/api/v1/publicImages/getOneComp/65ee50961d3e2b1e8fbd717e/65ee50a51d3e2b1e8fbd7184").then((response) => {
        return response.json();
    }).then((data) => {
        const comp = data.data.composition[0];

        let images = []
        comp.images.forEach( image => {images.push(new ImageTile(image))})

        images.forEach(image =>{ image.loadImage().then(()=>{mainContainer.addChild(image.container)})
        })

    }).catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

    let pressedCanvas= {mouseX:0,mouseY:0,canvasX:0,canvasY:0}

    const mainContainer = new PIXI.Container()
    const app = new PIXI.Application({
        width: canvas.offsetWidth-10,
        height: canvas.offsetHeight-10,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        antialias: true,
        backgroundAlpha: 0
    })

    canvas.appendChild(app.view);
    if(window.innerWidth<900) {
        mainContainer.scale.set(0.35)
    }else {mainContainer.scale.set(0.7)}
    app.stage.addChild(mainContainer)

    canvas.addEventListener('pointerdown' , (e) =>{

        pressedCanvas = {
            mouseY: e.clientY,
            mouseX: e.clientX,
            canvasX: e.clientX - mainContainer.x,
            canvasY: e.clientY - mainContainer.y
        }


    })

    app.renderer.view.onpointermove = (e)=>{
        if(e.buttons === 1){
            mainContainer.x=e.clientX-pressedCanvas.canvasX
            mainContainer.y=e.clientY-pressedCanvas.canvasY
        }
    }
}