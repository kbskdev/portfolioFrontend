window.addEventListener("load", init);
function init(){
    let short = false

    const loadDemo = new Event("loadDemo",{page:"demo"})

    const container = document.getElementById("container")

    const pinBoardHeader = document.getElementById("pb_header")
    const pinBoardCanvas = document.getElementById("pb_canvas")
    const pinBoardArticle = document.getElementById("pb_article")

    const mainName = document.getElementById("name")
    const intro = document.getElementById("initialAnimation")

    setTimeout(()=>{
        intro.remove()
    },3000)


    const myEngine = Matter.Engine.create({positionIterations:1,velocityIterations:1,constraintIterations:1})
    console.log(myEngine)
    const myRunner = Matter.Runner.create()
    //addingMouse
    {const myMouse = Matter.Mouse.create(document.body)
        const myMouseConstraint = Matter.MouseConstraint.create(myEngine, {
            mouse: myMouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
        Matter.Composite.add(myEngine.world, myMouseConstraint)}
    const ceiling = Matter.Bodies.rectangle(0,-40, window.innerWidth*2,80,{isStatic:true})
    const leftWall = Matter.Bodies.rectangle(-80,0, 160,window.innerHeight,{isStatic:true})
    const rightWall = Matter.Bodies.rectangle(window.innerWidth+80,0, 160,window.innerHeight,{isStatic:true})

    class Ball {
        constructor(radius, position, selector,first = false) {
            this.movement = 0
            this.moved = false

            this.position = position
            this.name = selector
            this.radius = radius
            this.elem = document.querySelector(`${selector}`)
            this.elem.style.width = `${2*this.radius}px`
            this.elem.style.height = `${2*this.radius}px`
            if(first){this.body = Matter.Bodies.circle(window.innerWidth/2 + 2*position*75,-13*radius, radius, {restitution:1,frictionAir:0.015})}
            else{this.body = Matter.Bodies.circle(window.innerWidth/2 + position*75,-13*radius, radius, {restitution:1,frictionAir:0.015})}
            //
            this.elem.addEventListener("pointerdown", event=>{


                }, )
            this.elem.addEventListener("pointerup", event=>{
                if(!this.moved && !short)shorten()
                else if(!this.moved && short)lengthen()
                this.elem.style.transform = "rotate(0deg)"
                this.movement = 0;
                this.moved = false
            }, )
            this.elem.addEventListener("pointermove", event=>{
                if(event.buttons === 1){
                    this.movement++;

                    if(!this.moved){this.elem.style.transform = `rotate(${12 + this.movement}deg)`}
                    if(this.movement>50) {
                        this.moved = true;
                        this.elem.style.transform = "rotate(12deg)"
                    }
                }
            }, )

        }
        render(){
            const {x,y} = this.body.position;
            this.elem.style.top = `${y-this.radius}px`
            this.elem.style.left = `${x - this.radius }px`;
            //this.elem.style.transform = `rotate(${this.body.angle}rad)`;
        }
    }


    class Constraint {
        constructor(ball) {
            this.ball = ball
            this.constr = Matter.Constraint.create({
                bodyA: ball.body,
                bodyB: ceiling,
                pointB: {x: window.innerWidth / 2 + ball.position * ball.radius, y: 0},
                stiffness: 0.02,
                length: window.innerHeight * 0.5,
                render: {type:"line"}
            })
        }
    }

    function shorten() {

        window.dispatchEvent(loadDemo)

        constraints.forEach( constraint => {
            const shortening = setInterval(()=>{
                if(constraint.constr.length > window.innerHeight*0.15){
                    constraint.constr.length-=2;
                }else{ clearInterval(shortening) }
                }, 10,)


        setTimeout(() => {
            pinBoardCanvas.style.visibility = "visible"
            pinBoardCanvas.style.left = "8vw"

            pinBoardHeader.style.visibility = "visible"
            pinBoardHeader.style.left = pinBoardCanvas.style.left
            pinBoardHeader.style.top = "17vh"

            pinBoardArticle.style.visibility = "visible"
            pinBoardArticle.style.opacity = 1



            Matter.Body.scale(constraint.ball.body, 0.66, 0.66)
            constraint.ball.radius = constraint.ball.radius*0.66
            constraint.ball.elem.style.height = `${constraint.ball.radius*2}px`
            constraint.ball.elem.style.width = `${constraint.ball.radius*2}px`
            constraint.ball.elem.style.fontSize = "16px"


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
                    console.log(constraint.constr.length)
                    constraint.constr.length += 2;
                }else{ clearInterval(lengthening) }
                }, 10,)

            pinBoardHeader.style.visibility = "invisible"
            pinBoardHeader.style.left = "-100vw"

            pinBoardCanvas.style.visibility = "invisible"
            pinBoardCanvas.style.left = "-100vw"

            pinBoardArticle.style.visibility = "invisible"
            pinBoardArticle.style.opacity = "0"

        setTimeout(()=>{
            Matter.Body.scale(constraint.ball.body,1.5,1.5)
            constraint.ball.radius = constraint.ball.radius*1.5
            constraint.ball.elem.style.height = `${constraint.ball.radius*2}px`
            constraint.ball.elem.style.width = `${constraint.ball.radius*2}px`
            //this.ball.elem.style.fontSize = "16px"

        },1500)
        mainName.style.right = "5vw"
        mainName.style.bottom = "5vh"
        short = false
        })
    }



    const balls = [new Ball(85,-3,"#pinboard",true),new Ball(85,-1,"#fakturownia"),new Ball(85,1,"#oferta"),new Ball(85,3,"#irlandia")]
    let constraints = []
    balls.forEach((ball,index) => {

        console.log(ball.body.position.y)
        setTimeout(() => {

            constraints.push(new Constraint(ball))
            Matter.Composite.add(myEngine.world, [ball.body])


        }, 1000)
    })
    balls.forEach((ball,index) => {
    const fallingCatch = setInterval(()=>{
        if(ball.body.position.y > window.innerHeight*0.4){
            Matter.Composite.add(myEngine.world, [constraints[index].constr])

            clearInterval(fallingCatch)
            const changeStiffness = setTimeout( () => {
                console.log("???????????????????????")
                constraints.forEach( constraint => {constraint.constr.stiffness = 0.5})
            },3000)
        }
    },100)})


    function rerender() {
        balls[0].render()
        balls[1].render()
        balls[2].render()
        balls[3].render()
        // Matter.Engine.update(myEngine);
        // requestAnimationFrame(rerender);

    }
    // rerender()
    setInterval(()=>{
       rerender()
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
