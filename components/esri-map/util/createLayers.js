import defaultContent from './defaultContent';
import DefineMap from 'can-define/map/map';
import esriPromise from 'esri-promise';

const Defaults = DefineMap.extend({
    outFields: {value: ['*']},
    popupTemplate: {
        Type: DefineMap.extend({
            content: {
                value () {
                    return defaultContent;
                }
            }
        })
    }
});

export default function createLayers (layers) {
    const requiresMap = {};
    const requiresArray = [];
    layers.reverse().forEach((layer) => {
        if (!requiresMap[layer.path]) {
            requiresArray.push(layer.path);
            requiresMap[layer.path] = requiresArray.length - 1;
        }
    });
    return new Promise((resolve) => {
        esriPromise(requiresArray).then(function (modules) {
            if (layers.serialize) {
                layers = layers.serialize();
            }
            layers = layers.map((layer) => {
                layer.options = new Defaults(layer.options).serialize();
                const index = requiresMap[layer.path];
                const LayerClass = modules[index];
                return new LayerClass(layer.options);
            });
            resolve(layers);
        });
    });
}
