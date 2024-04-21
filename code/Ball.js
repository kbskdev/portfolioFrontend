export class baseBall{

    constructor(radius, position, positionNormal, selector,first = false) {

        this.previousPosition = []
        this.movement = 0
        this.moved = false
        this.positionNormal=positionNormal
        this.position = position
        this.name = selector
        this.radius = radius



        if(window.innerWidth<1200 && window.innerWidth>551){
            this.radius /=1.3
        }

        if(window.innerWidth<550){
            this.radius /=2.5
        }
        this.elem = document.querySelector(`${selector}`)
        this.elem.style.width = `${2*this.radius}px`
        this.elem.style.height = `${2*this.radius}px`
        this.elem.style.zIndex = -1

        this.shadowElemFirst = document.querySelector(`${selector}_shadowFirst`)
        this.shadowElemFirst.style.width = `${2*this.radius-16}px`
        this.shadowElemFirst.style.height = `${2*this.radius-16}px`

        this.shadowElemSecond = document.querySelector(`${selector}_shadowSecond`)
        this.shadowElemSecond.style.width = `${2*this.radius-32}px`
        this.shadowElemSecond.style.height = `${2*this.radius-32}px`

        this.shadowElemThird = document.querySelector(`${selector}_shadowThird`)
        this.shadowElemThird.style.width = `${2*this.radius-48}px`
        this.shadowElemThird.style.height = `${2*this.radius-48}px`

        this.shadowElemFourth = document.querySelector(`${selector}_shadowFourth`)
        this.shadowElemFourth.style.width = `${2*this.radius-64}px`
        this.shadowElemFourth.style.height = `${2*this.radius-64}px`



        setTimeout(()=>{this.elem.style.zIndex=4},100)

        if(first){
            this.body = Matter.Bodies.circle(
                window.innerWidth/2 + 1.5*position*this.radius,
                -2*this.radius,
                this.radius,
            {
                restitution:1.001,
                frictionAir:-.03,
                render:{visible:false}
            })}
        else{this.body = Matter.Bodies.circle(
            window.innerWidth/2 + position*this.radius,
            -2*this.radius,
            this.radius,
            {
                restitution:1.001,
                frictionAir:-.03,
                render:{visible:false}
            })}
    }
    render(){
        let position = JSON.parse(JSON.stringify(this.body.position))
        this.previousPosition.push(position)
        if(this.previousPosition.length>9){
            this.shadowElemFirst.style.display = "block"
            this.shadowElemSecond.style.display = "block"
            this.shadowElemThird.style.display = "block"
            this.shadowElemFourth.style.display = "block"


            this.previousPosition.shift()
            this.shadowElemFirst.style.top = `${this.previousPosition[3].y-this.radius+8}px`
            this.shadowElemFirst.style.left = `${this.previousPosition[3].x - this.radius+8 }px`;

            this.shadowElemSecond.style.top = `${this.previousPosition[2].y-this.radius+16}px`
            this.shadowElemSecond.style.left = `${this.previousPosition[2].x - this.radius+16 }px`;

            this.shadowElemThird.style.top = `${this.previousPosition[1].y-this.radius+24}px`
            this.shadowElemThird.style.left = `${this.previousPosition[1].x - this.radius+24 }px`;

            this.shadowElemFourth.style.top = `${this.previousPosition[0].y-this.radius+32}px`
            this.shadowElemFourth.style.left = `${this.previousPosition[0].x - this.radius+32 }px`;

        }
        const {x,y} = this.body.position;
        this.elem.style.top = `${y-this.radius}px`
        this.elem.style.left = `${x - this.radius }px`;
    }

    limitMaxSpeed(maxSpeed,maxPositionImpulse){
            if (this.body.velocity.x > maxSpeed) {
                Matter.Body.setVelocity(this.body, { x: maxSpeed, y: this.body.velocity.y });
            }
            if (this.body.velocity.x < -maxSpeed) {
                Matter.Body.setVelocity(this.body, { x: -maxSpeed, y: this.body.velocity.y });
            }
            if (this.body.velocity.y > maxSpeed) {
                Matter.Body.setVelocity(this.body, { x: this.body.velocity.x, y: maxSpeed });
            }
            if (this.body.velocity.y < -maxSpeed) {
                Matter.Body.setVelocity(this.body, { x: -this.body.velocity.x, y: -maxSpeed });
            }

            if (this.body.positionImpulse.x > maxPositionImpulse) {
                this.body.positionImpulse.x = maxPositionImpulse;
            }
            if (this.body.positionImpulse.y > maxPositionImpulse) {
                this.body.positionImpulse.y = maxPositionImpulse;
            }
        }
}