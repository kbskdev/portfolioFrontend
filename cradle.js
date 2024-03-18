window.addEventListener("load", init);
function init(){

    const pinBoardArticle = document.getElementById("pb_page")
    const mainName = document.getElementById("name")

    const myEngine = Matter.Engine.create()
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
            if(first){this.body = Matter.Bodies.circle(window.innerWidth/2 + 2*position*75,window.innerHeight *0.5, radius, {restitution:1,frictionAir:0.0052})}
            else{this.body = Matter.Bodies.circle(window.innerWidth/2 + position*75,window.innerHeight *0.5, radius, {restitution:1,frictionAir:0.005})}


            //
            this.elem.addEventListener("mousedown", event=>{
                this.elem.style.backgroundColor = "#491385"

                })
            this.elem.addEventListener("mouseup", event=>{
                if(!this.moved)constraints.forEach( constr =>{constr.shorten()})

                this.elem.style.backgroundColor = "#ffffff"
                this.movement = 0;
                this.moved = false
            })
            this.elem.addEventListener("mousemove", event=>{
                if(event.which === 1){

                    this.movement++;

                    if(this.movement>40)
                    {
                        this.moved = true;
                         this.elem.style.backgroundColor = "#ffffff"
                    }
                }

            })
            //this.elem.addEventListener("click",event=>{constraints.forEach( constr =>{constr.shorten()})})
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
            this.constr = Matter.Constraint.create({bodyA:ball.body,bodyB:ceiling,pointB:{x:window.innerWidth/2 + ball.position*ball.radius,y:0},stiffness:1,length:window.innerHeight*0.5})
        }
        shorten(){

                const shortening = setInterval(()=>{
                    if(this.constr.length > window.innerHeight*0.15)this.constr.length-=2;}, 10,)
                setTimeout(()=>{
                    pinBoardArticle.style.visibility = "visible"
                    pinBoardArticle.style.left = "15vw"
                    Matter.Body.scale(this.ball.body,0.66,0.66)
                    this.ball.elem.style.height = `100px`
                    this.ball.elem.style.width = `100px`
                    this.ball.elem.style.fontSize = "16px"
                    mainName.style.right = "5vw"
                    mainName.style.bottom = "5vh"
                },500)
            }
        }


    const balls = [new Ball(75,-3,"#pinboard",true),new Ball(75,-1,"#fakturownia"),new Ball(75,1,"#oferta"),new Ball(75,3,"#irlandia")]
    let constraints = []
    balls.forEach((ball,index) =>{
        constraints.push(new Constraint(ball))
        Matter.Composite.add(myEngine.world,[ball.body, constraints[index].constr])
    })
    function rerender() {
        balls.forEach(ball=>{ball.render()})
        Matter.Engine.update(myEngine);
        requestAnimationFrame(rerender);
    }
    rerender()

    Matter.Composite.add(myEngine.world, [ceiling,leftWall,rightWall]);



    Matter.Runner.run(myRunner,myEngine)
}
