export const symbols = {
    point: { // symbol used for points
        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
        style: 'round',
        color: '#8A2BE2',
        size: '10px',
        outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 1 // points
        }
    },
    polyline: { // symbol used for polylines
        type: 'simple-line', // autocasts as new SimpleMarkerSymbol()
        color: '#8A2BE2',
        width: '2',
        style: 'solid'
    },
    polygon: { // symbol used for polygons
        type: 'simple-fill', // autocasts as new SimpleMarkerSymbol()
        color: 'rgba(138,43,226, 0.2)',
        style: 'solid',
        outline: {
            color: 'white',
            width: 1
        }
    }
};


// assigns a default set of graphics to features
export default function getGraphics (features, defaults = symbols) {
    features.forEach((f) => {
        f.symbol = defaults[f.geometry.type] || defaults.point;
    });

    return features;
}