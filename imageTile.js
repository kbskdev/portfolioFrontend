import * as PIXI from "./node_modules/pixi.js/dist/browser/pixi.min.mjs"

export class ImageTile{
    reader = new FileReader()
    constructor(imageData) {
        this.container = new PIXI.Container()


        fetch(`http://pinboard.pl/api/v1/publicImages/getImage/65ee50961d3e2b1e8fbd717e/65ee50a51d3e2b1e8fbd7184/${imageData._id}.${imageData.extension}`).then((response) => {
            return response.blob();
        }).then((response) => {
            this.imageData = imageData
            this.imageData.position = imageData.position
            this.imageData.imageBlob = response
            console.log(this.imageData._id)
            this.reader.readAsDataURL(this.imageData.imageBlob)

        })
        this.reader.addEventListener("loadend", () => {


            //console.log(texture)
            this.imageSprite = new PIXI.Sprite(new PIXI.Texture((new PIXI.BaseTexture( this.reader.result))))

            this.imageData.imageString = this.reader.result

            //this.imageData.currentSize = {height: this.imageSprite.height, width: this.imageSprite.width}

            this.container.sortableChildren = true

            this.container.x = this.imageData.position.x
            this.container.y = this.imageData.position.y

            this.container.addChild(this.imageSprite)
        })
    }

    loadImage(){
        return new Promise((resolve,reject) => {
            this.reader.onloadend = (variable)=>  resolve()
        })
    }
}