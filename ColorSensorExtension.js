class ColorSensorExtension {
    constructor(mb) {
        this.mb = mb;
        this.webcamVideo = null;
        this.uploadedImage = null;
        this.isWebcamActive = false;
        
        this._setupUI();
        this._extendTurtle();
    }
    
    _setupUI() {
        // Add webcam toggle button
        const webcamBtn = document.createElement('button');
        webcamBtn.textContent = 'Toggle Webcam';
        webcamBtn.onclick = () => this.toggleWebcam();
        document.getElementById('controls').appendChild(webcamBtn);
        
        // Add image upload input
        const uploadInput = document.createElement('input');
        uploadInput.type = 'file';
        uploadInput.accept = 'image/*';
        uploadInput.onchange = (e) => this.handleImageUpload(e);
        document.getElementById('controls').appendChild(uploadInput);
    }
    
    _extendTurtle() {
        const originalSenseColor = Turtle.prototype.senseColor;
        
        Turtle.prototype.senseColor = function() {
            // First try the original method
            const originalColor = originalSenseColor.call(this);
            if (originalColor) return originalColor;
            
            // Then try webcam and uploaded image
            const x = this.x + this.canvas.width / 2;
            const y = this.canvas.height / 2 - this.y;
            
            const colorSources = {
                canvas: this.canvas,
                webcamVideo: this.mb.extensions.colorSensor?.webcamVideo,
                uploadedImage: this.mb.extensions.colorSensor?.uploadedImage
            };
            
            const color = getColorAtPosition(x, y, colorSources);
            return this._convertToMBColorFormat(color);
        };
    }
    
    async toggleWebcam() {
        if (this.isWebcamActive) {
            if (this.webcamVideo && this.webcamVideo.srcObject) {
                this.webcamVideo.srcObject.getTracks().forEach(track => track.stop());
            }
            this.webcamVideo = null;
            this.isWebcamActive = false;
        } else {
            this.webcamVideo = await startWebcam();
            if (this.webcamVideo) {
                this.isWebcamActive = true;
                // Position the video element off-screen
                this.webcamVideo.style.position = 'absolute';
                this.webcamVideo.style.left = '-9999px';
                document.body.appendChild(this.webcamVideo);
            }
        }
    }
    
    handleImageUpload(event) {
        handleImageUpload(event, (img) => {
            this.uploadedImage = img;
            // Optional: display the uploaded image on canvas
            this.mb.paintUtils.stampImage(img, 0, 0);
        });
    }
}

// Register the extension with Music Blocks
if (window.MusicBlocks) {
    MusicBlocks.registerExtension('colorSensor', (mb) => new ColorSensorExtension(mb));
}