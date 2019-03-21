class Reciever {
    constructor(x = 0, y = 0, size = 0) {
        this.x = x;
        this.y = y;
        this.size = size;
    };

    draw(canvasContext, isHighlighted) {
        canvasContext.fillStyle = isHighlighted ? RECEIVER_HIGHLIGHT_COLOR : RECEIVER_COLOR;
        canvasContext.fillRect(this.x - this.size / 2, 
            this.y - this.size / 2, this.size, this.size);
    };

    checkParticleCollision(particle) {
        if (particle.x >= this.x - this.size / 2 && particle.x <= this.x + this.size / 2 &&
                particle.y >= this.y - this.size / 2 && particle.y <= this.y + this.size / 2) {
            return true;
        }

        return false;
    };
}