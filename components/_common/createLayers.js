import defaultContent from './defaultContent';
import esriPromise from 'esri-promise';
import deepAssign from 'can-util/js/deep-assign/deep-assign';
import assign from 'can-assign';

const Defaults = {
    outFields: ['*'],
    popupTemplate: {
        content: defaultContent
    }
};

const promise = new Promise((resolve) => {
    resolve(promise);
});

export default function createLayers (layers) {
    const layerPromises = layers.reverse().map((layer) => {
        return new Promise((resolve) => {
            esriPromise([layer.path]).then(([LayerClass]) => {

                const layerOptions = deepAssign({}, layer.options, Defaults);

                // handle group layers
                if (layer.path === 'esri/layers/GroupLayer') {
                    const groupPromise = createLayers(layerOptions.layers || []);
                    groupPromise.then((newLayers) => {
                        layerOptions.layers = newLayers.map((l) => {
                            return l.layer; 
                        });
                        resolve({layer: new LayerClass(layerOptions)});
                    });
                
                } else { 
                    const l = new LayerClass(layerOptions);
                    resolve({layer: l}); 
                }
            });
        });
    });

    return Promise.all(layerPromises);
}
