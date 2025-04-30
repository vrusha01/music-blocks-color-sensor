function detectLegoBrickColor(x, y, sources) {
    const color = getColorAtPosition(x, y, sources);
    
    // Simple threshold-based detection (can be enhanced)
    const brightness = (color.r * 0.299 + color.g * 0.587 + color.b * 0.114);
    
    // Return 'light' or 'dark' for Lego notation
    return brightness > 128 ? 'light' : 'dark';
}