function testLegoNotation() {
    const mb = window.MusicBlocks;
    const turtle = mb.turtles[0];
    
    // Simulate moving over light and dark areas
    turtle.setPosition(100, 100);
    const color1 = turtle.senseColor();
    console.log('Color at 100,100:', color1);
    
    turtle.setPosition(200, 200);
    const color2 = turtle.senseColor();
    console.log('Color at 200,200:', color2);
    
    // Detect Lego brick colors
    const brick1 = detectLegoBrickColor(100, 100, {
        canvas: turtle.canvas,
        webcamVideo: mb.extensions.colorSensor?.webcamVideo,
        uploadedImage: mb.extensions.colorSensor?.uploadedImage
    });
    
    console.log('Brick at 100,100 is:', brick1);
}