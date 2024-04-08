window.addEventListener("loadFakturownia", init);

const leftArrow = document.getElementById("leftArrow")
const rightArrow = document.getElementById("rightArrow")
const bigImage = document.getElementById("bigImage")
const bigImageContainer= document.getElementById("bigImageContainer")
function init(){

    let currentMiddle = 0
    let bigImageBool = false
    class Image{
        constructor(selector){
            this.elem = document.getElementById(selector)

            this.elem.addEventListener("click",()=>{
                console.log(`${this.elem.src}`)
                bigImage.src=`${this.elem.src}`
                bigImageContainer.style.display="flex"
                bigImageContainer.style.opacity="1"
                bigImageBool = true
            })
            bigImageContainer.addEventListener("click",()=>{
                bigImage.src=``
                bigImageContainer.style.display="none"
                bigImageContainer.style.opacity="0"
                bigImageBool = false
            })
        }


    }

    const images = [
        new Image("first"),
        new Image("second"),
        new Image("third"),
        new Image("fourth"),
        new Image("fifth"),
        new Image("sixth"),
    ]

    leftArrow.addEventListener("click",()=>{

        if(currentMiddle!==0){
            currentMiddle--
            images[currentMiddle].elem.className="centerImage"
            changeClasses()
            if(currentMiddle===0){
                leftArrow.style.opacity="0"
                leftArrow.style.cursor="default"
            }
            else {
                leftArrow.style.cursor="pointer"
                rightArrow.style.cursor="pointer"
                leftArrow.style.opacity = "1"
                rightArrow.style.opacity = "1"
            }
        }

        })
    rightArrow.addEventListener("click",()=>{

        if(currentMiddle!==images.length-1) {
            currentMiddle++
            images[currentMiddle].elem.className = "centerImage"
            changeClasses()
            if (currentMiddle === images.length - 1) {
                rightArrow.style.opacity = "0"
                rightArrow.style.cursor="default"
            }
            else {
                leftArrow.style.cursor="pointer"
                rightArrow.style.cursor="pointer"
                leftArrow.style.opacity = "1"
                rightArrow.style.opacity = "1"
            }
        }
    })

    function  changeClasses(){
        images.forEach((image,index)=>{
            if(index===currentMiddle-1){
                image.elem.className="leftImage"
            }
            else if(index===currentMiddle+1){
                image.elem.className="rightImage"
            }
            else if(index>currentMiddle+1) {
                image.elem.className="rightHiddenImage"
            }
            else if(index<currentMiddle-1){
                image.elem.className="leftHiddenImage"
            }
        })
    }
}