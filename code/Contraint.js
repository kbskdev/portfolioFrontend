export class Constraint {


    constructor(ball,ceiling) {

        this.ball = ball
        this.constr = Matter.Constraint.create({
            bodyA: ball.body,
            bodyB: ceiling,
            pointB: {x: window.innerWidth / 2 + ball.position * ball.radius, y: 40},
            ogPoint:window.innerWidth / 2 + ball.position * ball.radius,
            stiffness: 1.45,
            damping:1,
            length: window.innerHeight * 0.40,
            render: {type:"line"}
        })
    }


    shortenLength(scale){
        return new Promise((resolve)=>{
            const shortening = setInterval(()=>{
                if(this.constr.length > window.innerHeight*scale){
                    this.constr.length-=4;

                }else{
                    resolve(true)
                    clearInterval(shortening)
                }
            }, 10,)
        })

    }

    shortenSize(scale){
        if(window.innerWidth>750) {
            this.ball.radius = this.ball.radius * scale
            this.ball.elem.style.height = `${this.ball.radius * 2}px`
            this.ball.elem.style.width = `${this.ball.radius * 2}px`

            this.ball.shadowElemFirst.style.height = `${this.ball.radius * 2 -16}px`
            this.ball.shadowElemFirst.style.width = `${this.ball.radius * 2 -16}px`

            this.ball.shadowElemSecond.style.height = `${this.ball.radius * 2 -32}px`
            this.ball.shadowElemSecond.style.width = `${this.ball.radius * 2 -32}px`

            this.ball.shadowElemThird.style.height = `${this.ball.radius * 2 -48}px`
            this.ball.shadowElemThird.style.width = `${this.ball.radius * 2 -48}px`

            this.ball.shadowElemFourth.style.height = `${this.ball.radius * 2 -64}px`
            this.ball.shadowElemFourth.style.width = `${this.ball.radius * 2 -64}px`




            setTimeout(()=>{
                Matter.Body.scale(this.ball.body, scale, scale)
            },1)

        }

            if(this.ball.name==="#pinboard" || this.ball.name==="#fakturownia" ){
                if(window.innerWidth>750){this.ball.elem.style.fontSize = "13px";}
                else{ this.ball.elem.style.fontSize = "10px";}
            }
            else if(this.ball.name==="#irlandia"){
                if(window.innerWidth>750){this.ball.elem.style.fontSize = "11px";}
                else{ this.ball.elem.style.fontSize = "8px";}
            }
            else if(this.ball.name==="#oferta"){
                if(window.innerWidth>750){
                    this.ball.elem.style.fontSize = "13px"
                    this.ball.elem.innerHTML = "<a>Oferta <br> O mnie</a>"
                }else {
                    this.ball.elem.style.fontSize = "11px"
                    this.ball.elem.innerHTML = "<a>Oferta <br> O mnie</a>"
                }
            }


    }

    lengthenLength(){
        return new Promise(resolve => {
            let i = 0
            const lengthening =setInterval(()=>{
                i++
                console.log(i)
            if(this.constr.length < window.innerHeight*0.6){
                this.constr.length += 3;
            }else{ resolve(true);clearInterval(lengthening) }
        }, 10,)
    })}


    lengthenSize(scale){
        setTimeout(()=>{
            this.ball.radius = this.ball.radius*scale
            this.ball.elem.style.height = `${this.ball.radius*2}px`
            this.ball.elem.style.width = `${this.ball.radius*2}px`
            this.ball.elem.style.fontSize = "17px"



                this.ball.shadowElemFirst.style.height = `${this.ball.radius * 2 -16}px`
                this.ball.shadowElemFirst.style.width = `${this.ball.radius * 2 -16}px`

                this.ball.shadowElemSecond.style.height = `${this.ball.radius * 2 -32}px`
                this.ball.shadowElemSecond.style.width = `${this.ball.radius * 2 -32}px`

                this.ball.shadowElemThird.style.height = `${this.ball.radius * 2 -48}px`
                this.ball.shadowElemThird.style.width = `${this.ball.radius * 2 -48}px`

                this.ball.shadowElemFourth.style.height = `${this.ball.radius * 2 -64}px`
                this.ball.shadowElemFourth.style.width = `${this.ball.radius * 2 -64}px`

            setTimeout(()=>{

                Matter.Body.scale(this.ball.body,scale,scale)
            },1)
        })
    }

    shortenPosition(){
        if(this.ball.position<0){
            let moveInterval = setInterval(()=>{
                if(this.constr.pointB.x<window.innerWidth / 2 + this.ball.position * this.ball.radius+10){
                    this.constr.pointB.x +=1
                }
                else {
                    clearInterval(moveInterval)
                }
            },10)
        }
        if(this.ball.position>0){
            let moveInterval = setInterval(()=>{
                if(this.constr.pointB.x>window.innerWidth / 2 + this.ball.position * this.ball.radius+10){
                    this.constr.pointB.x -=1
                }
                else {
                    clearInterval(moveInterval)
                }
            },10)
        }
    }

    lengthenPosition(){
        if(this.ball.position<0){
            let moveInterval = setInterval(()=>{
                if(this.constr.pointB.x>window.innerWidth / 2 + this.ball.position * this.ball.radius+10){
                    this.constr.pointB.x -=1
                }
                else {
                    clearInterval(moveInterval)
                }
            },10)
        }
        if(this.ball.position>0){
            let moveInterval = setInterval(()=>{
                if(this.constr.pointB.x<window.innerWidth / 2 + this.ball.position * this.ball.radius+10){
                    this.constr.pointB.x +=1
                }
                else {
                    clearInterval(moveInterval)
                }
            },10)
        }
    }
}