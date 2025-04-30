unction handleImageUpload(event, callback) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            callback(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}