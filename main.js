(function main() {
    let canvasContainer = document.getElementById("reverb-container");
    mainCanvas = document.getElementById("main-canvas");
    mainCanvas.width = canvasContainer.clientWidth;
    mainCanvas.height = canvasContainer.clientHeight;

    let processor = new ParticlesProcessor(mainCanvas);
    mainCanvas.addEventListener("click", processor.startProcessing.bind(processor), false);
})();