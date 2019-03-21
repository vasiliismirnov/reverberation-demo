class Particle {
    constructor(x = 0, y = 0, velocityX = 0, velocityY = 0) {
        this.x = x;
        this.y = y;

        this.velocityX = velocityX;
        this.velocityY = velocityY;

        this.radius = PARTICLE_INITIAL_RADIUS;
        this.decayCoef = EDGE_DECAY_COEF;

        let colors = [PARTICLE_COLOR_1, PARTICLE_COLOR_2, PARTICLE_COLOR_3];

        // set particle color to one of the random colors
        this.color = colors[Math.floor(Math.random() * colors.length)];
    };

    decay() {
        this.radius /= this.decayCoef;
    }

    draw(canvasContext) {
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        canvasContext.fillStyle = this.color;
        canvasContext.fill();
    };

    handleEdgesCollision(fieldWidth, fieldHeight) {

        // check if the particle is out of the horizontal edges and change particle direction.
        if ((this.x >= fieldWidth - this.radius && this.velocityX > 0) || (this.x <= this.radius && this.velocityX < 0)) {
            this.velocityX *= -1;

            this.decay();
        }
    
        // check if the particle is out of the vertical edges and change particle direction.
        if ((this.y >= fieldHeight - this.radius && this.velocityY > 0) || (this.y <= this.radius && this.velocityY < 0)) {
            this.velocityY *= -1;

            this.decay();
        }
    };

    update(canvasContext, fieldWidth, fieldHeight) {
        this.handleEdgesCollision(fieldWidth, fieldHeight);
    
        this.x += this.velocityX;
        this.y += this.velocityY;

        this.draw(canvasContext);
    };
};