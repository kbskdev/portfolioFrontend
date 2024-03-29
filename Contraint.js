export class Constraint {
    constructor(ball,ceiling) {
        this.ball = ball
        this.constr = Matter.Constraint.create({
            bodyA: ball.body,
            bodyB: ceiling,
            pointB: {x: window.innerWidth / 2 + ball.position * ball.radius, y: 0},
            stiffness: 0.045,
            damping:0.0016,
            length: window.innerHeight * 0.5,
            render: {type:"line"}
        })
    }
}