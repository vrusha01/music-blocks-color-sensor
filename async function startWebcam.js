async function startWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        return video;
    } catch (err) {
        console.error("Error accessing webcam:", err);
        return null;
    }
}