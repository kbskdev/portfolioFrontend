export class baseBall{

    constructor(radius, position, positionNormal, selector,first = false, category, mask) {
        this.ogMask = mask
        this.ogCategory = category
        this.ogFilter = {category:category,mask:mask,group:0}

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
        setTimeout(()=>{this.elem.style.zIndex=4},100)

        if(first){
            this.body = Matter.Bodies.circle(
                window.innerWidth/2 + 1.5*position*this.radius,
                -2*this.radius,
                this.radius,
            {
                restitution:1.001,
                frictionAir:-.03,
                collisionFilter:
                    {category:category, mask:mask, group:0 },
                render:{visible:false}
            })}
        else{this.body = Matter.Bodies.circle(
            window.innerWidth/2 + position*this.radius,
            -2*this.radius,
            this.radius,
            {
                restitution:1.001,
                frictionAir:-.03,
                collisionFilter:
                    {category:category,mask:mask, group:0 },
                render:{visible:false}
            })}
    }
    render(){
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