class ParticlesProcessor {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasContext = this.canvas.getContext("2d");
        
        this.isProcessActive = false;
        this.processId = 0;
        this.particles = [];
        this.reciever = null;
    }

    clearFiled() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    process() {
        this.clearFiled();

        let isRecieverAffectedByParticle = false;

        this.particles.forEach(particle => {
            particle.update(this.canvasContext, this.canvas.width, this.canvas.height);

            if (!isRecieverAffectedByParticle) {
                isRecieverAffectedByParticle = this.reciever.checkParticleCollision(particle);
            }
        });

        this.reciever.draw(this.canvasContext, isRecieverAffectedByParticle);
    };

    getVelocity(angular) {
        let velocity = { x: PARTICLES_VELOCITY_COEF, y: PARTICLES_VELOCITY_COEF };

        velocity.x *= Math.cos(angular);
        velocity.y *= Math.sin(angular);

        return velocity;
    }

    spawnParticles() {
        let centerPoint = { x: this.canvas.width / 2, y: this.canvas.height / 2 };

        // get random initial angular as start direction for particles.
        let angular = Math.random() * Math.PI * 2;

        for (let i = 0; i < PARTICLES_COUNT; i++) {
            let velocity = this.getVelocity(angular + i * PARTICLES_SPREAD_COEF);
            this.particles.push(new Particle(centerPoint.x, centerPoint.y, velocity.x, velocity.y));
        }
    };

    startProcessing() {
        if (!this.isProcessActive) {
            this.isProcessActive = true;
    
            this.spawnParticles();
            this.reciever = new Reciever(this.canvas.width / 2, this.canvas.height / 2, RECEIVER_SIZE);
    
            this.processId = setInterval(this.process.bind(this), PROCESS_FRAME_TIMING);
        } else {
            this.isProcessActive = false;
            this.clearFiled();
            this.particles = [];
            this.reciever = null;
            clearInterval(this.processId);
        }
    };
}