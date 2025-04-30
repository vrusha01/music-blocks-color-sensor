function getColorAtPosition(x, y, sources) {
    // sources should include canvas, webcamVideo, uploadedImage
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    // Set canvas size
    tempCanvas.width = 1;
    tempCanvas.height = 1;
    
    // Draw the relevant portion from each source
    if (sources.webcamVideo) {
        tempCtx.drawImage(sources.webcamVideo, x, y, 1, 1, 0, 0, 1, 1);
    }
    if (sources.uploadedImage) {
        tempCtx.drawImage(sources.uploadedImage, x, y, 1, 1, 0, 0, 1, 1);
    }
    if (sources.canvas) {
        tempCtx.drawImage(sources.canvas, x, y, 1, 1, 0, 0, 1, 1);
    }
    
    // Get the pixel data
    const pixel = tempCtx.getImageData(0, 0, 1, 1).data;
    return {
        r: pixel[0],
        g: pixel[1],
        b: pixel[2],
        a: pixel[3]
    };
}