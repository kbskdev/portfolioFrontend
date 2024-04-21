

export class SmallOfferBlock{



    constructor(selector,position= {x:0,y:0},width, height){
        this.position = {x:position.x * window.innerWidth,y:position.y * window.innerHeight}
        this.width = width * window.innerWidth
        this.height = height * window.innerHeight
        this.selector = selector
        this.elem = document.getElementById(this.selector)
        this.elemPin = document.getElementById(`pin_${this.selector}`)

        this.hideEvent = new CustomEvent("hideRest",{detail:{'selector':selector}})

        this.body = Matter.Bodies.rectangle(
            this.position.x, this.position.y + this.height,
            this.width, this.height, {
                render: {visible: false},
                frictionAir: 0.01, collisionFilter: {group: -1}
            })

        if(window.innerWidth<750){
            this.pin = Matter.Bodies.circle(this.position.x,this.position.y,6,{
                isStatic:true,render:{fillStyle:"#3A3A3A"},collisionFilter:{group:-1}})
        }
        else {
            this.pin = Matter.Bodies.circle(this.position.x, this.position.y, 10, {
                isStatic: true, render: {fillStyle: "#3A3A3A"}, collisionFilter: {group: -1}
            })
        }
        this.leftString = Matter.Constraint.create({
            bodyA:this.body,
            pointA:{x:this.width/2-10,y:10},
            bodyB:this.pin,
            stiffness:1,
            render:{type:"line"}

        })
        this.rightString = Matter.Constraint.create({
            bodyA:this.body,
            pointA:{x:10-this.width/2,y:10},
            bodyB:this.pin,
            stiffness:1,

            render:{type:"line"}

        })


    }

    addToWorld(engine,direction){
        Matter.Composite.add(engine.world, [this.body,this.leftString,this.rightString,this.pin]);

        let speed=9*(Math.random() + 1)
        if(direction==="left"){
            Matter.Body.setPosition(this.pin,{x:this.pin.position.x-window.innerWidth,y:this.pin.position.y})
            Matter.Body.setPosition(this.body,{x:this.body.position.x-window.innerWidth,y:this.body.position.y})

            let initialAnimation = setInterval(()=>{
                if(window.innerWidth<750){
                    Matter.Body.setPosition(this.pin,{x:this.pin.position.x+speed/3,y:this.pin.position.y})
                }else {
                    Matter.Body.setPosition(this.pin,{x:this.pin.position.x+speed,y:this.pin.position.y})
                }

                Matter.Body.setAngularVelocity(this.body,0)

                if(this.pin.position.x>this.position.x){

                    Matter.Body.setVelocity(this.body,{x:0,y:this.body.velocity.y})
                    clearInterval(initialAnimation)
                }
            },3)
        }
        else if(direction==="right"){
            Matter.Body.setPosition(this.pin,{x:this.pin.position.x+window.innerWidth/2,y:this.pin.position.y})
            Matter.Body.setPosition(this.body,{x:this.body.position.x+window.innerWidth/1.5,y:this.body.position.y})
            let initialAnimation = setInterval(()=>{

                if(window.innerWidth<750){
                    Matter.Body.setPosition(this.pin,{x:this.pin.position.x-speed/3,y:this.pin.position.y})
                }else {
                    Matter.Body.setPosition(this.pin,{x:this.pin.position.x-speed,y:this.pin.position.y})
                }
                Matter.Body.setAngularVelocity(this.body,0)

                if(this.pin.position.x<this.position.x){
                    setTimeout(()=>{
                        Matter.Body.setVelocity(this.body,{x:0,y:this.body.velocity.y})
                    },100)

                    clearInterval(initialAnimation)
                }
            },10)

        }


        let render = setInterval(()=>{
            let x = this.body.position.x;
            let y = this.body.position.y;

            this.elem.style.top = `${y-this.height/2}px`
            this.elem.style.left = `${x - this.width/2}px`;
            this.elem.style.transform = `rotate(${this.body.angle}rad)`;

            // Matter.Body.setPosition(this.pin,{x:this.pin.position.x+1,y:this.pin.position.y+1})
            if(window.innerWidth<750){
                this.elemPin.style.top = `${this.pin.position.y-6}px`
                this.elemPin.style.left = `${this.pin.position.x-6}px`;
            }
            else{
                this.elemPin.style.top = `${this.pin.position.y-10}px`
                this.elemPin.style.left = `${this.pin.position.x-10}px`;
            }



        },1000/60)
        let limitSped = setInterval(()=>{
            this.limitMaxSpeed(10,10)
        },1)

        this.elem.addEventListener("pointerup",()=>{
            //this.elem.style.display = "block"
            window.dispatchEvent(this.hideEvent)
        })
        window.addEventListener("lengthen",()=>{
            clearInterval(render)
        })

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