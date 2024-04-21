import {baseBall} from "./Ball.js";
import {Constraint} from "./Contraint.js";

window.addEventListener("load", init);
function init(){

    let short = false
    let cradleReady = true
    let ballCaught = {caught:false,number:0}
    let wrongPosition = 0
    let constraints = []

    const firstBallCategory  = 0b00001;
    const secondBallCategory  = 0b00010;
    const thirdBallCategory  = 0b00100;
    const fourthBallCategory  = 0b01000;
    const worldCategory = 0b10000;

    const loadDemo = new Event("loadDemo",{page:"demo"})
    const loadIrlandia = new Event("loadIrlandia",{page:"irlandia"})
    const loadFakturownia = new Event("loadFakturownia",{page:"fakturownia"})
    const loadOferta = new Event("loadOferta",{page:"oferta"})
    const shortenEvent = new Event("shorten")
    const lengthenEvent = new Event("lengthen")


    /*htmlElements*/

        const container = document.getElementById("container")

        const pinBoardContainer = document.getElementById("pb_container")
        const pinArticleBoardHeader = document.getElementById("pb_articleHeader")
        const pinArticleBoardText = document.getElementById("pb_articleText")

        const irelandContainer = document.getElementById("ir_container")
        const irelandArticleHeader = document.getElementById("ir_articleHeader")
        const irelandArticleText = document.getElementById("ir_articleText")

        const fakt_Container = document.getElementById("fakt_container")
        const fakt_ArticleHeader = document.getElementById("fakturownia_articleHeader")
        const fakt_ArticleText = document.getElementById("fakturownia_articleText")

        const oferta_Container = document.getElementById("oferta_Container")
        const oferta_aboutme_ArticleHeader = document.getElementById("oferta_aboutme_articleHeader")
        const oferta_aboutme_ArticleText = document.getElementById("oferta_aboutme_articleText")

        const Article = document.getElementById("article")

        const mainName = document.getElementById("name")
        const intro = document.getElementById("initialAnimation")


    // setTimeout(()=>{
    //     intro.remove()
    // },5000)


    const myEngine = Matter.Engine.create({})//positionIterations:2,velocityIterations:2,constraintIterations:2

    const myRunner = Matter.Runner.create()

    //addingMouse
    {const myMouse = Matter.Mouse.create(document.body)
        const myMouseConstraint = Matter.MouseConstraint.create(myEngine, {
            mouse: myMouse,
            constraint: {
                stiffness: 0.005,
                render: {
                    visible: false
                }
            },

        });
    Matter.Composite.add(myEngine.world, myMouseConstraint)}
    const ceiling = Matter.Bodies.rectangle(0,-42, window.innerWidth*2,80,{isStatic:true, })
    const leftWall = Matter.Bodies.rectangle(-81,0, 160,window.innerHeight,{isStatic:true, })
    const rightWall = Matter.Bodies.rectangle(window.innerWidth+81,0, 160,window.innerHeight,{isStatic:true, })

    class Ball extends baseBall{
        constructor(radius, position, positionNormal, selector,first = false, category, mask) {
            super(radius, position, positionNormal, selector,first , category, mask);

            if(window.innerWidth<750 && selector==="#oferta"){
                this.elem.innerHTML = "<a>Oferta <br> O mnie</a>"
            }

            // this.elem.addEventListener("pointerdown", event=>{
            //     balls.forEach( (ball)=>{
            //         ball.body.collisionFilter = {category:ball.body.collisionFilter.category ,mask: firstBallCategory | secondBallCategory |thirdBallCategory | fourthBallCategory | worldCategory,group:0}
            //     })
            //
            //     ballCaught = {caught: true,number: this.positionNormal}
            // })
            this.elem.addEventListener("pointerup", event=>{
                if(!this.moved && !short){shorten(selector)}
                else if(!this.moved && short){showPages(selector)}
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
        new Ball(85,-3,1,"#pinboard",true),
        new Ball(85,-1,2,"#fakturownia",false),
        new Ball(85,1,3,"#oferta",false),
        new Ball(85,3,4,"#irlandia",false)
    ]

    //addingConstraints
    balls.forEach((ball,index) => {
        setTimeout(() => {

            constraints.push(new Constraint(ball,ceiling))
            Matter.Composite.add(myEngine.world, [ball.body])
            ball.elem.style.display="flex"

        }, 1000)
    })

    mainName.addEventListener("click", ()=>{
        if(short){
            lengthen()
        }

    })

    function shorten(selector) {
        if(cradleReady) {
            cradleReady = false

            showPages(selector)
            window.dispatchEvent(shortenEvent)
            myEngine.collisionActive = false
            constraints.forEach(constraint => {

                if (window.innerWidth > 550) {
                    constraint.shortenLength(0.15).then((value)=>{cradleReady = value})
                    constraint.shortenSize(0.5)
                    constraint.shortenPosition()
                } else {
                    constraint.shortenLength(0.20).then((value)=>{cradleReady = value})
                    constraint.shortenSize(0.5)
                }

                setTimeout(() => {
                    Article.style.display = "block"
                    Article.style.opacity = 1
                    mainName.style.backgroundColor = "#272727"
                }, 1000)
                short = true
            })
        }
    }
    function lengthen(){
            if(cradleReady){
                cradleReady = false
                window.dispatchEvent(lengthenEvent)
                constraints.forEach(constraint => {
                    constraint.lengthenLength().then((value)=>{cradleReady=value})
                    if(window.innerWidth>750){
                        constraint.lengthenSize(2)
                        constraint.lengthenPosition()
                    }

                    clearPages()


                    short = false
                })
            }

    }

    //fixing swapped balls
    // balls.forEach((ball,index) => {
    //     const swapCheck = setInterval(()=>{
    //         //pierwsza kula
    //         if(balls[0].body.position.x+balls[0].radius>balls[1].body.position.x && !ballCaught.caught && (wrongPosition ===0 || wrongPosition===1) && ballCaught.number === 1){
    //
    //             wrongPosition =1
    //
    //             balls[0].body.collisionFilter={category:firstBallCategory ,mask: worldCategory,group:0}
    //
    //         }
    //         else if(!ballCaught.caught && wrongPosition === 1){
    //
    //             balls[0].body.collisionFilter.mask = secondBallCategory | worldCategory;
    //             wrongPosition=0
    //             ballCaught = {caught: false,number: ballCaught.number===1?0:ballCaught.number}
    //         }
    //
    //         //czwarta kula
    //         if(balls[3].body.position.x<balls[2].body.position.x+balls[2].radius && !ballCaught.caught && (wrongPosition ===0 || wrongPosition===4) && ballCaught.number === 4 ){
    //             wrongPosition =4
    //             balls[3].body.collisionFilter={category:balls[3].ogCategory ,mask:worldCategory,group:0}
    //         }
    //         else if(!ballCaught.caught && wrongPosition === 4){
    //             wrongPosition=0
    //             balls[3].body.collisionFilter=balls[3].ogFilter
    //             ballCaught = {caught: false,number:  ballCaught.number===4?0:ballCaught.number}
    //         }
    //
    //         //druga kula
    //         if(balls[1].body.position.x<balls[0].body.position.x+balls[0].radius && !ballCaught.caught && (wrongPosition ===0 || wrongPosition===2) && ballCaught.number === 2 ){
    //             balls[1].body.collisionFilter={category:balls[1].ogCategory ,mask:thirdBallCategory | worldCategory,group:0}
    //             balls[2].body.collisionFilter={category:balls[2].ogCategory ,mask:balls[2].ogMask | firstBallCategory,group:0}
    //             balls[0].body.collisionFilter={category:balls[0].ogCategory ,mask:balls[0].ogMask | thirdBallCategory,group:0}
    //         }
    //         else if(balls[1].body.position.x+balls[2].radius>balls[2].body.position.x && !ballCaught.caught && (wrongPosition ===0 || wrongPosition===2) && ballCaught.number === 2 ){
    //             balls[1].body.collisionFilter={category:balls[1].ogCategory ,mask:firstBallCategory | worldCategory,group:0}
    //
    //             balls[0].body.collisionFilter={category:balls[0].ogCategory ,mask:balls[0].ogMask | thirdBallCategory,group:0}
    //             balls[2].body.collisionFilter={category:balls[2].ogCategory ,mask:balls[2].ogMask | firstBallCategory,group:0}
    //         }
    //         else  if(!ballCaught.caught && wrongPosition === 2 ){
    //             balls[1].body.collisionFilter = balls[1].ogFilter
    //
    //             balls[0].body.collisionFilter = balls[0].ogFilter
    //             balls[2].body.collisionFilter=balls[2].ogFilter
    //
    //             wrongPosition=0
    //             ballCaught = {caught: false,number: 0}
    //         }
    //
    //         //trzecia kula
    //         if(balls[2].body.position.x+balls[2].radius>balls[3].body.position.x && !ballCaught.caught && (wrongPosition ===0 || wrongPosition===3)&& ballCaught.number === 3 ){
    //             wrongPosition = 3
    //             balls[2].body.collisionFilter={category:balls[2].ogCategory ,mask:secondBallCategory | worldCategory,group:0}
    //
    //             balls[1].body.collisionFilter={category:balls[1].ogCategory ,mask:balls[1].ogMask | fourthBallCategory,group:0}
    //             balls[3].body.collisionFilter={category:balls[3].ogCategory ,mask:balls[3].ogMask | secondBallCategory,group:0}
    //         }
    //         else if(balls[2].body.position.x<balls[1].body.position.x+balls[1].radius && !ballCaught.caught && (wrongPosition ===0 || wrongPosition===3)&& ballCaught.number ===3 ){
    //             wrongPosition =3
    //             balls[2].body.collisionFilter={category:balls[2].ogCategory ,mask:firstBallCategory | fourthBallCategory | worldCategory,group:0}
    //
    //             balls[3].body.collisionFilter={category:balls[3].ogCategory ,mask:balls[3].ogMask | secondBallCategory ,group:0}
    //             balls[1].body.collisionFilter={category:balls[1].ogCategory ,mask:balls[1].ogMask | fourthBallCategory ,group:0}
    //
    //             balls[0].body.collisionFilter={category:balls[0].ogCategory ,mask:balls[0].ogMask ,group:0}
    //         }
    //         else  if(!ballCaught.caught && wrongPosition === 3){
    //             balls[2].body.collisionFilter = balls[2].ogFilter
    //
    //             balls[1].body.collisionFilter = balls[1].ogFilter
    //             balls[3].body.collisionFilter=balls[3].ogFilter
    //
    //             wrongPosition=0
    //             ballCaught = {caught: false,number: 0}
    //         }
    //     },100)
    //
    // })

    // window.addEventListener("pointerup", () => {
    //         balls.forEach((ball) => {
    //             ball.body.collisionFilter = {category: ball.ogCategory, mask: ball.ogMask, group: 0}
    //         })
    //     ballCaught.caught = false
    //     })

    //stiffness of constraints
    balls.forEach((ball,index) => {
        setTimeout(()=>{
            let slowingBall = setInterval(()=>{
                ball.body.frictionAir += 0.001
                if(ball.body.position.y >= window.innerHeight*0.40){
                    clearInterval(slowingBall)
                    console.log(ball.body.frictionAir)
                }},30)},700);

        const fallingCatch = setInterval(()=>{
        if(ball.body.position.y >= window.innerHeight*0.40){
            Matter.Composite.add(myEngine.world, [constraints[index].constr])
            Matter.Composite.add(myEngine.world, ceiling)
            ball.body.frictionAir = 0.003

            //Matter.Body.setVelocity(ball.body,{x:ball.body.velocity.x,y:0})
            clearInterval(fallingCatch)
            // setTimeout( ()=>{
            //     const increaseStiffness = setInterval(()=>{
            //         if(constraints[index].constr.stiffness<1){
            //             constraints[index].constr.stiffness += 0.003
            //         }
            //         else clearInterval(increaseStiffness)
            //     },20)
            //     },1000)


        }
    },1)
    })
    //
    // window.addEventListener("deviceorientation", (event)=>{mainName.textContent= event.alpha;console.log(event.alpha)}, true);
    //limitMaxSpeed
    const limitMaxSpeed = () => {
        let maxSpeed = 30;
        let maxPositionImpulse = 30
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
            backgroundAlpha:0,

        }

    })
    window.addEventListener("resize", (event) => {
        myRender.options.width=container.offsetWidth
        myRender.options.height=container.offsetHeight
        myRender.canvas.width=container.offsetWidth
        myRender.canvas.height=container.offsetHeight
        Matter.Body.set(rightWall, "position", {x: window.innerWidth+81, y: 0})
    });

    Matter.Render.run(myRender)
    Matter.Runner.run(myRunner,myEngine)



    function showPages(selector){
        clearPagesWithoutArticle()
        if(selector==="#pinboard"){
            setTimeout(()=>{
                pinBoardContainer.style.display = "block"
                pinBoardContainer.style.left = "8vw"


                pinArticleBoardHeader.style.display = "flex"
                pinArticleBoardText.style.display = "block"
                window.dispatchEvent(loadDemo)
            },1500)


        }
        if(selector==="#irlandia"){
            irelandContainer.style.display = "block"
            irelandContainer.style.left = "8vw"

            irelandArticleHeader.style.display = "flex"
            irelandArticleText.style.display = "block"

            window.dispatchEvent(loadIrlandia)
        }

        if(selector==="#fakturownia"){
            fakt_Container.style.display = "block"

            fakt_ArticleHeader.style.display = "flex"
            fakt_ArticleText.style.display = "block"

            window.dispatchEvent(loadFakturownia)
        }

        if(selector==="#oferta"){
            oferta_Container.style.display = "flex"
            oferta_aboutme_ArticleHeader.style.display = "block"
            oferta_aboutme_ArticleText.style.display = "block"
            window.dispatchEvent(loadOferta)
        }
    }

    function clearPages(){
        pinBoardContainer.style.display = "none"
        pinBoardContainer.style.left = "-100vw"

        pinArticleBoardHeader.style.display = "none"
        pinArticleBoardText.style.display = "none"


        irelandContainer.style.display = "none"
        irelandArticleHeader.style.display = "none"
        irelandArticleText.style.display = "none"

        fakt_Container.style.display = "none"
        fakt_ArticleHeader.style.display = "none"
        fakt_ArticleText.style.display = "none"

        oferta_Container.style.display = "none"
        oferta_aboutme_ArticleHeader.style.display = "none"
        oferta_aboutme_ArticleText.style.display = "none"

        Article.style.display = "none"
        Article.style.opacity = "0"
        mainName.style.backgroundColor = "rgba(0,0,0,0)"
    }
    function clearPagesWithoutArticle(){
        pinBoardContainer.style.display = "none"
        pinBoardContainer.style.left = "-100vw"

        pinArticleBoardHeader.style.display = "none"
        pinArticleBoardText.style.display = "none"


        irelandContainer.style.display = "none"
        irelandArticleHeader.style.display = "none"
        irelandArticleText.style.display = "none"

        fakt_Container.style.display = "none"
        fakt_ArticleHeader.style.display = "none"
        fakt_ArticleText.style.display = "none"

        oferta_Container.style.display = "none"
        oferta_aboutme_ArticleHeader.style.display = "none"
        oferta_aboutme_ArticleText.style.display = "none"

        window.dispatchEvent(lengthenEvent)
    }
}

