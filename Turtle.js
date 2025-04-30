// Modified turtle color sensing method
Turtle.prototype.senseColor = function() {
    const x = this.x;
    const y = this.y;
    
    const colorSources = {
        canvas: this.canvas,
        webcamVideo: this.webcamVideo,
        uploadedImage: this.uploadedImage
    };
    
    const color = getColorAtPosition(x, y, colorSources);
    
    // Convert to Music Blocks color format if needed
    return this._convertToMBColorFormat(color);
};