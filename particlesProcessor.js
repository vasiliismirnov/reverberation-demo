class ParticlesProcessor {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext("2d");
        
        this.isProcessActive = false;
        this.processId = 0;
        this.particles = [];

        this.velocityCoef = 4;
    }

    clearFiled() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    process() {
        this.clearFiled();

        this.particles.forEach(particle => {
            particle.update(this.canvasContext, this.canvas.width, this.canvas.height);
        });
    };

    getVelocity(angular) {
        let velocity = { x: this.velocityCoef, y: this.velocityCoef };

        velocity.x *= Math.cos(angular);
        velocity.y *= Math.sin(angular);

        return velocity;
    }

    spawnParticles() {
        let centerPoint = { x: this.canvas.width / 2, y: this.canvas.height / 2 };

        let angular = Math.random() * Math.PI * 2;

        for (let i = 0; i < 9; i++) {
            let velocity = this.getVelocity(angular + i * 0.15);
            this.particles.push(new Particle(centerPoint.x, centerPoint.y, velocity.x, velocity.y));
        }
    };

    startProcessing() {
        if (!this.isProcessActive) {
            this.isProcessActive = true;
    
            this.spawnParticles();
    
            this.processId = setInterval(this.process.bind(this), 1000 / 60);
        } else {
            this.isProcessActive = false;
            this.clearFiled();
            this.particles = [];
            clearInterval(this.processId);
        }
    };
}