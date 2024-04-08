export class Constraint {
    constructor(ball,ceiling) {
        this.ball = ball
        this.constr = Matter.Constraint.create({
            bodyA: ball.body,
            bodyB: ceiling,
            pointB: {x: window.innerWidth / 2 + ball.position * ball.radius, y: 0},
            ogPoint:window.innerWidth / 2 + ball.position * ball.radius,
            stiffness: 0.045,
            damping:0.0016,
            length: window.innerHeight * 0.5,
            render: {type:"line"}
        })
    }


    shortenLength(){
        const shortening = setInterval(()=>{
            if(this.constr.length > Math.max(window.innerHeight*0.15,window.innerWidth>550?120:220)){
                this.constr.length-=4;

            }else{
                clearInterval(shortening)
            }
        }, 10,)
    }

    shortenSize(scale){
            this.ball.radius = this.ball.radius*scale
            this.ball.elem.style.height = `${this.ball.radius*2}px`
            this.ball.elem.style.width = `${this.ball.radius*2}px`

            if(this.ball.name==="#pinboard" || this.ball.name==="#fakturownia" ){
                this.ball.elem.style.fontSize = "13px"
            }
            else if(this.ball.name==="#irlandia"){
                this.ball.elem.style.fontSize = "11px"
            }
            else if(this.ball.name==="#oferta"){
                this.ball.elem.style.fontSize = "13px"
                this.ball.elem.innerHTML = "<a>Oferta <br> O mnie</a>"
            }

            setTimeout(()=>{
                Matter.Body.scale(this.ball.body, scale, scale)
            },1)
    }

    lengthenLength(){
        const lengthening =setInterval(()=>{
            if(this.constr.length < window.innerHeight*0.6){
                this.constr.length += 3;
            }else{ clearInterval(lengthening) }
        }, 10,)
    }
    lengthenSize(scale){
        setTimeout(()=>{
            this.ball.radius = this.ball.radius*scale
            this.ball.elem.style.height = `${this.ball.radius*2}px`
            this.ball.elem.style.width = `${this.ball.radius*2}px`
            this.ball.elem.style.fontSize = "17px"
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