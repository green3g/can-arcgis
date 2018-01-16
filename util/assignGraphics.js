import {loadModules} from 'esri-loader';

// assigns a default set of graphics to features
export default function getGraphics (features) {
    return new Promise((resolve) => {
        loadModules([
            'esri/symbols/SimpleMarkerSymbol',
            'esri/symbols/SimpleLineSymbol',
            'esri/symbols/SimpleFillSymbol'
        ]).then(([SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol]) => {
    
            features.forEach((f) => {
                let symbol;
                switch (f.geometry.type) {
                case 'polyline':
                    symbol = new SimpleLineSymbol({
                        color: '#de4343',
                        width: '5px',
                        style: 'solid'
                    });
                    break;
                case 'polygon': 
                    symbol = new SimpleFillSymbol({
                        color: '#de4343',
                        style: 'solid',
                        outline: { // autocasts as esri/symbols/SimpleLineSymbol
                            color: '#000',
                            width: 1
                        }
                    });
                    break;
                case 'point':
                default:
                    symbol = new SimpleMarkerSymbol({
                        color: 'red',
                        outline: {
                            color: '#000',
                            width: '0.5px'
                        }
                    });
                }
                f.symbol = symbol;
            });

            resolve(features);
        });
    
    });
}