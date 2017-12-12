export const graphics = {
    pointSymbol: { // symbol used for points
        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
        style: 'square',
        color: '#8A2BE2',
        size: '16px',
        outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 3 // points
        }
    },
    polylineSymbol: { // symbol used for polylines
        type: 'simple-line', // autocasts as new SimpleMarkerSymbol()
        color: '#8A2BE2',
        width: '4',
        style: 'dash'
    },
    polygonSymbol: { // symbol used for polygons
        type: 'simple-fill', // autocasts as new SimpleMarkerSymbol()
        color: 'rgba(138,43,226, 0.8)',
        style: 'solid',
        outline: {
            color: 'white',
            width: 1
        }
    }
};

export const buttons = {
    point: {
        type: 'point',
        tooltip: 'Draw a point',
        iconClass: 'esri-icon-blank-map-pin'
    }, 
    polyline: {
        type: 'polyline',
        tooltip: 'Draw a line',
        iconClass: 'esri-icon-polyline'
    }, 
    polygon: {
        type: 'polygon',
        tooltip: 'Draw a polygon',
        iconClass: 'esri-icon-polygon'
    }
};