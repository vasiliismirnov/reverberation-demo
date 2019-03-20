class Particle {
    constructor(x = 0, y = 0, velocityX = 0, velocityY = 0) {
        this.x = x;
        this.y = y;

        this.velocityX = velocityX;
        this.velocityY = velocityY;

        this.radius = 10;
        this.decayCoef = 1.2;

        let colors = ['#EF476F', '#FFD166', '#06D6A0'];

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
        if ((this.x >= fieldWidth - this.radius && this.velocityX > 0) || (this.x <= this.radius && this.velocityX < 0)) {
            this.velocityX *= -1;

            this.decay();
        }
    
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