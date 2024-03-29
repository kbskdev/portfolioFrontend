import {baseBall} from "./Ball.js";
import {Constraint} from "./Contraint.js";

window.addEventListener("load", init);
function init(){
    let short = false
    let ballCaught = {caught:false,number:0}
    let wrongPosition = 0
    let constraints = []

    const firstBallCategory  = 0b00001;
    const secondBallCategory  = 0b00010;
    const thirdBallCategory  = 0b00100;
    const fourthBallCategory  = 0b01000;
    const worldCategory = 0b10000;

    const loadDemo = new Event("loadDemo",{page:"demo"})

    const container = document.getElementById("container")

    const pinBoardContainer = document.getElementById("pb_container")
    const pinBoardHeader = document.getElementById("pb_header")
    const pinBoardCanvas = document.getElementById("pb_canvas")
    const pinBoardArticle = document.getElementById("pb_article")

    const mainName = document.getElementById("name")
    const intro = document.getElementById("initialAnimation")

    setTimeout(()=>{
        intro.remove()
    },6000)


    const myEngine = Matter.Engine.create({})//positionIterations:2,velocityIterations:2,constraintIterations:2

    const myRunner = Matter.Runner.create()

    //addingMouse
    {const myMouse = Matter.Mouse.create(document.body)
        const myMouseConstraint = Matter.MouseConstraint.create(myEngine, {
            mouse: myMouse,
            constraint: {
                stiffness: 0.002,
                render: {
                    visible: false
                }
            },
            collisionFilter:{category:worldCategory}
        });
    Matter.Composite.add(myEngine.world, myMouseConstraint)}
    const ceiling = Matter.Bodies.rectangle(0,-40, window.innerWidth*2,80,{isStatic:true, collisionFilter:{mask:firstBallCategory | secondBallCategory | thirdBallCategory | fourthBallCategory, category:worldCategory}})
    const leftWall = Matter.Bodies.rectangle(-80,0, 160,window.innerHeight,{isStatic:true, collisionFilter:{mask:firstBallCategory | secondBallCategory | thirdBallCategory | fourthBallCategory, category:worldCategory}})
    const rightWall = Matter.Bodies.rectangle(window.innerWidth+80,0, 160,window.innerHeight,{isStatic:true, collisionFilter:{mask:firstBallCategory | secondBallCategory | thirdBallCategory | fourthBallCategory, category:worldCategory}})

    class Ball extends baseBall{
        constructor(radius, position, positionNormal, selector,first = false, category, mask) {
            super(radius, position, positionNormal, selector,first = false, category, mask);

            this.elem.addEventListener("pointerdown", event=>{
                balls.forEach( (ball)=>{
                    ball.body.collisionFilter = {category:ball.body.collisionFilter.category ,mask: firstBallCategory | secondBallCategory |thirdBallCategory | fourthBallCategory | worldCategory,group:0}
                })

                ballCaught = {caught: true,number: this.positionNormal}
            })
            this.elem.addEventListener("pointerup", event=>{
                if(!this.moved && !short){shorten()}
                else if(!this.moved && short){lengthen()}
                this.movement = 0;
                this.moved = false
            }, )
            this.elem.addEventListener("pointermove", event=>{
                if(event.buttons === 1){
                    this.movement++;
                    if(this.movement>50) {
                        this.moved = true;
                        this.elem.style.transform = "rotate(0deg)!important"}
                }
            })

        }
    }
    const balls = [
        new Ball(85,-3,1,"#pinboard",true,firstBallCategory,secondBallCategory | worldCategory),
        new Ball(85,-1,2,"#fakturownia",false,secondBallCategory,firstBallCategory | thirdBallCategory | worldCategory),
        new Ball(85,1,3,"#oferta",false,thirdBallCategory, secondBallCategory | fourthBallCategory | worldCategory),
        new Ball(85,3,4,"#irlandia",false,fourthBallCategory, thirdBallCategory | worldCategory)
    ]

    //addingConstraints
    balls.forEach((ball,index) => {
        setTimeout(() => {
            constraints.push(new Constraint(ball,ceiling))
            Matter.Composite.add(myEngine.world, [ball.body])
        }, 1000)
    })

    function shorten() {
        window.dispatchEvent(loadDemo)
        myEngine.collisionActive = false
        constraints.forEach( constraint => {
            const shortening = setInterval(()=>{
                if(constraint.constr.length > Math.max(window.innerHeight*0.15,120)){
                    constraint.constr.length-=2;
                }else{ clearInterval(shortening) }
                }, 10,)


        setTimeout(() => {
            pinBoardContainer.style.visibility = "visible"
            pinBoardContainer.style.left = "8vw"


            pinBoardArticle.style.visibility = "visible"
            pinBoardArticle.style.opacity = 1

            if(window.innerWidth>600){
                Matter.Body.scale(constraint.ball.body, 0.66, 0.66)
                constraint.ball.radius = constraint.ball.radius*0.66
                constraint.ball.elem.style.height = `${constraint.ball.radius*2}px`
                constraint.ball.elem.style.width = `${constraint.ball.radius*2}px`
                constraint.ball.elem.style.fontSize = "16px"
            }
        }, 1500)
            mainName.style.right = "2vw"
            mainName.style.bottom = "2vh"
            short = true
        })
    }
    function lengthen(){
        //window.dispatchEvent(loadDemo)

        constraints.forEach(constraint => {
            const lengthening =setInterval(()=>{
                if(constraint.constr.length < window.innerHeight*0.6){
                    constraint.constr.length += 2;
                }else{ clearInterval(lengthening) }
                }, 10,)
            pinBoardHeader.style.left = "-100vw"

            pinBoardCanvas.style.visibility = "invisible"
            pinBoardCanvas.style.left = "-100vw"

            pinBoardArticle.style.visibility = "invisible"
            pinBoardArticle.style.opacity = "0"

        setTimeout(()=>{
            if(window.innerWidth>600){
            Matter.Body.scale(constraint.ball.body,1.5,1.5)
            constraint.ball.radius = constraint.ball.radius*1.5
            constraint.ball.elem.style.height = `${constraint.ball.radius*2}px`
            constraint.ball.elem.style.width = `${constraint.ball.radius*2}px`
            }
        },1500)
        mainName.style.right = "5vw"
        mainName.style.bottom = "5vh"
        short = false
        })
    }

    //fixing swapped balls
    balls.forEach((ball,index) => {
        const swapCheck = setInterval(()=>{
            //pierwsza kula
            if(balls[0].body.position.x+balls[0].radius>balls[1].body.position.x && !ballCaught.caught && (wrongPosition ===0 || wrongPosition===1) && ballCaught.number === 1){

                wrongPosition =1

                balls[0].body.collisionFilter={category:firstBallCategory ,mask: worldCategory,group:0}

            }
            else if(!ballCaught.caught && wrongPosition === 1){

                balls[0].body.collisionFilter.mask = secondBallCategory | worldCategory;
                wrongPosition=0
                ballCaught = {caught: false,number: ballCaught.number===1?0:ballCaught.number}
            }

            //czwarta kula
            if(balls[3].body.position.x<balls[2].body.position.x+balls[2].radius && !ballCaught.caught && (wrongPosition ===0 || wrongPosition===4) && ballCaught.number === 4 ){
                wrongPosition =4
                balls[3].body.collisionFilter={category:balls[3].ogCategory ,mask:worldCategory,group:0}
            }
            else if(!ballCaught.caught && wrongPosition === 4){
                wrongPosition=0
                balls[3].body.collisionFilter=balls[3].ogFilter
                ballCaught = {caught: false,number:  ballCaught.number===4?0:ballCaught.number}
            }

            //druga kula
            if(balls[1].body.position.x<balls[0].body.position.x+balls[0].radius && !ballCaught.caught && (wrongPosition ===0 || wrongPosition===2) && ballCaught.number === 2 ){
                balls[1].body.collisionFilter={category:balls[1].ogCategory ,mask:thirdBallCategory | worldCategory,group:0}
                balls[2].body.collisionFilter={category:balls[2].ogCategory ,mask:balls[2].ogMask | firstBallCategory,group:0}
                balls[0].body.collisionFilter={category:balls[0].ogCategory ,mask:balls[0].ogMask | thirdBallCategory,group:0}
            }
            else if(balls[1].body.position.x+balls[2].radius>balls[2].body.position.x && !ballCaught.caught && (wrongPosition ===0 || wrongPosition===2) && ballCaught.number === 2 ){
                balls[1].body.collisionFilter={category:balls[1].ogCategory ,mask:firstBallCategory | worldCategory,group:0}

                balls[0].body.collisionFilter={category:balls[0].ogCategory ,mask:balls[0].ogMask | thirdBallCategory,group:0}
                balls[2].body.collisionFilter={category:balls[2].ogCategory ,mask:balls[2].ogMask | firstBallCategory,group:0}
            }
            else  if(!ballCaught.caught && wrongPosition === 2 ){
                balls[1].body.collisionFilter = balls[1].ogFilter

                balls[0].body.collisionFilter = balls[0].ogFilter
                balls[2].body.collisionFilter=balls[2].ogFilter

                wrongPosition=0
                ballCaught = {caught: false,number: 0}
            }

            //trzecia kula
            if(balls[2].body.position.x+balls[2].radius>balls[3].body.position.x && !ballCaught.caught && (wrongPosition ===0 || wrongPosition===3)&& ballCaught.number === 3 ){
                wrongPosition = 3
                balls[2].body.collisionFilter={category:balls[2].ogCategory ,mask:secondBallCategory | worldCategory,group:0}

                balls[1].body.collisionFilter={category:balls[1].ogCategory ,mask:balls[1].ogMask | fourthBallCategory,group:0}
                balls[3].body.collisionFilter={category:balls[3].ogCategory ,mask:balls[3].ogMask | secondBallCategory,group:0}
            }
            else if(balls[2].body.position.x<balls[1].body.position.x+balls[1].radius && !ballCaught.caught && (wrongPosition ===0 || wrongPosition===3)&& ballCaught.number ===3 ){
                wrongPosition =3
                balls[2].body.collisionFilter={category:balls[2].ogCategory ,mask:firstBallCategory | fourthBallCategory | worldCategory,group:0}

                balls[3].body.collisionFilter={category:balls[3].ogCategory ,mask:balls[3].ogMask | secondBallCategory ,group:0}
                balls[1].body.collisionFilter={category:balls[1].ogCategory ,mask:balls[1].ogMask | fourthBallCategory ,group:0}

                balls[0].body.collisionFilter={category:balls[0].ogCategory ,mask:balls[0].ogMask ,group:0}
            }
            else  if(!ballCaught.caught && wrongPosition === 3){
                balls[2].body.collisionFilter = balls[2].ogFilter

                balls[1].body.collisionFilter = balls[1].ogFilter
                balls[3].body.collisionFilter=balls[3].ogFilter

                wrongPosition=0
                ballCaught = {caught: false,number: 0}
            }
        },100)

    })

    window.addEventListener("pointerup", () => {
            balls.forEach((ball) => {
                ball.body.collisionFilter = {category: ball.ogCategory, mask: ball.ogMask, group: 0}
            })
        ballCaught.caught = false
        })

    //stiffness of constraints
    balls.forEach((ball,index) => {
        const fallingCatch = setInterval(()=>{
        if(ball.body.position.y > window.innerHeight*0.4){
            ball.body.frictionAir = 0.005
            Matter.Composite.add(myEngine.world, [ceiling,constraints[index].constr])
            clearInterval(fallingCatch)
            setTimeout( ()=>{
                const increaseStiffness = setInterval(()=>{
                    if(constraints[index].constr.stiffness<1){
                        constraints[index].constr.stiffness += 0.003
                    }
                    else clearInterval(increaseStiffness)
                },20)
                },1000)


        }
    },100)
    })

    //limitMaxSpeed
    const limitMaxSpeed = () => {
        let maxSpeed = 18;
        let maxPositionImpulse = 20
        balls.forEach( (ball)=>{
            ball.limitMaxSpeed(maxSpeed,maxPositionImpulse)
        })
    }
    setTimeout(()=>{Matter.Events.on(myEngine, 'beforeUpdate', limitMaxSpeed);},2000)

    setInterval(()=>{
        balls[0].render()
        balls[1].render()
        balls[2].render()
        balls[3].render()
    },1000/60)

    Matter.Composite.add(myEngine.world, [leftWall,rightWall]);

    const myRender = Matter.Render.create({
        element:container,
        engine:myEngine,
        options:{
            width:container.offsetWidth,
            height:container.offsetHeight,
            backgroundAlpha:0
        }

    })
    Matter.Render.run(myRender)
    Matter.Runner.run(myRunner,myEngine)
}
