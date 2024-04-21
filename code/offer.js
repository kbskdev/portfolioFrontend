import {SmallOfferBlock} from "./smallOfferBlock.js";

window.addEventListener("loadOferta", init);


const container = document.getElementById("oferta_Container")
function init(){

    const myEngine = Matter.Engine.create({})//positionIterations:2,velocityIterations:2,constraintIterations:2

    const myRunner = Matter.Runner.create()

    const myRender = Matter.Render.create({
        element:container,
        engine:myEngine,
        options:{
            width:container.offsetWidth,
            height:container.offsetHeight,
            backgroundAlpha:0,
            wireframes: false

        }

    })
    const myMouse = Matter.Mouse.create(container)
        const myMouseConstraint = Matter.MouseConstraint.create(myEngine, {
            mouse: myMouse,
            constraint: {
                stiffness: 0.01,
                render: {
                    visible: false
                }
            },
        });

    Matter.Render.run(myRender)
    Matter.Runner.run(myRunner,myEngine)

    Matter.Composite.add(myEngine.world, [myMouseConstraint]);

    if(window.innerWidth<750){
        var seoBlock = new SmallOfferBlock(
            "oferta_seo", {x: .2, y: .15}, 0.25, 0.06)

        var grafikaBlock = new SmallOfferBlock(
            "oferta_grafika", {x: .50, y: .15}, 0.25, 0.06)

        var hostingBlock = new SmallOfferBlock(
            "oferta_hosting", {x: .80, y: .15}, 0.25, 0.06)

        var biznesBlock = new SmallOfferBlock(
            "oferta_biznes", {x: .3, y: .35}, 0.3, 0.08)

        var stronyBlock = new SmallOfferBlock(
            "oferta_strony", {x: .70, y: .35}, 0.3, 0.08)
    }
    else
    {
        var seoBlock = new SmallOfferBlock(
            "oferta_seo", {x: .15, y: .1}, 0.15, 0.12)

        var grafikaBlock = new SmallOfferBlock(
            "oferta_grafika", {x: .15, y: .35}, 0.15, 0.12)

        var hostingBlock = new SmallOfferBlock(
            "oferta_hosting", {x: .15, y: .60}, 0.15, 0.12)

        var biznesBlock = new SmallOfferBlock(
            "oferta_biznes", {x: .45, y: .15}, 0.20, 0.15)

        var stronyBlock = new SmallOfferBlock(
            "oferta_strony", {x: .45, y: .50}, 0.20, 0.15)
    }
    let blocks = [seoBlock, grafikaBlock, hostingBlock, biznesBlock, stronyBlock]
    let contactBlock = document.getElementById("contact")
    contactBlock.addEventListener("pointerup",()=>{
        let hideEvent = new CustomEvent("hideRest",{detail:{'selector':"none"}})
        window.dispatchEvent(hideEvent)
        let header = document.getElementById(`oferta_aboutme_articleHeader`)
        let text = document.getElementById(`oferta_aboutme_articleText`)

        header.style.display = "block"
        text.style.display = "block"
    })

    window.addEventListener("lengthen",()=>{
        blocks.forEach(block=>{
            let header = document.getElementById(`${block.selector}_articleHeader`)
            let text = document.getElementById(`${block.selector}_articleText`)
            console.log(header)
            header.style.display = "none"
            text.style.display = "none"
            Matter.World.remove(myEngine.world, [block.body,block.pin,block.leftString,block.rightString])
        })
        Matter.World.clear(myEngine.world);
        Matter.Engine.clear(myEngine);
        Matter.Render.stop(myRender);
        Matter.Runner.stop(myRunner);
        myRender.canvas.remove();
        myRender.canvas = null;
        myRender.context = null;
        myRender.textures = {};

    })
    window.addEventListener("hideRest",(event)=>{
        let header = document.getElementById(`oferta_aboutme_articleHeader`)
        let text = document.getElementById(`oferta_aboutme_articleText`)

        header.style.display = "none"
        text.style.display = "none"
        blocks.forEach((block)=>{
            if(block.selector!==event.detail.selector){
                let header = document.getElementById(`${block.selector}_articleHeader`)
                let text = document.getElementById(`${block.selector}_articleText`)

                header.style.display = "none"
                text.style.display = "none"
            }
            else{

                let header = document.getElementById(`${block.selector}_articleHeader`)
                let text = document.getElementById(`${block.selector}_articleText`)
                console.log(header)
                header.style.display = "block"
                text.style.display = "block"
            }

        })
    })

    setTimeout(()=>{
        seoBlock.addToWorld(myEngine,"left")
        grafikaBlock.addToWorld(myEngine,"left")
        hostingBlock.addToWorld(myEngine,"left")
        biznesBlock.addToWorld(myEngine,"right")
        stronyBlock.addToWorld(myEngine,"right")
    },2)


    // window.addEventListener("resize", (event) => {
    //     myRender.options.width=container.offsetWidth
    //     myRender.options.height=container.offsetHeight
    //     myRender.canvas.width=container.offsetWidth
    //     myRender.canvas.height=container.offsetHeight
    // });


}