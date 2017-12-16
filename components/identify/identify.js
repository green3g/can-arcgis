import DefineMap from 'can-define/map/map';
import mapImage from './util/identifyMapImage';
import dev from 'can-util/js/dev/dev';
import esriPromise from 'esri-promise';

export const IDENTIFY_METHODS = {
    'esri.layers.MapImageLayer': mapImage,
    'esri.layers.FeatureLayer': function (event, layer, scope) {
        return new Promise((resolve) => {
            scope.view.hitTest(event).then((hitTest) => {

                //return the result, filtering out any vector tile results
                resolve(hitTest.results.filter((result) => {
                    return result.graphic.layer.declaredClass !== 'esri.layers.VectorTileLayer';
                }).map((result) => {
                    return result.graphic;
                }));
            });
        });
    }
};


// asynchronously load the geometry engine
let geometryEngine;
esriPromise(['esri/geometry/geometryEngine']).then((modules) => {
    [geometryEngine] = modules;
});

/**
 * identify class
 * performs identify on additional layers, like map image
 * usage: new Identify(properties)
 */
export default DefineMap.extend({
    clickHandle: '*',
    layerInfos: DefineMap,
    view: {
        type: '*',
        set (view) {
            
            // cleanup click handle 
            if (this.clickHandle) {
                this.clickHandle.remove();
            }

            // register click handle
            if (view) {
                this.clickHandle = view.on('click', this.identify.bind(this));
            }

            return view;
            
        }
    }, 
    identify (event) {
        event.stopPropagation();

        // clear out existing features
        this.view.popup.features = [];

        const promises = [];

        // for each layer, idenitify it, and push a promise
        this.view.map.allLayers.forEach((layer) => {
            if (!layer.visible) {
                return;
            }
            if (IDENTIFY_METHODS.hasOwnProperty(layer.declaredClass)) {

                // get a promise that should resolve to some identify result
                const promise = IDENTIFY_METHODS[layer.declaredClass](event, layer, this);

                promises.push(promise);
            } else {
                dev.warn(`no identify function registered for type ${layer.declaredClass}`);
            }
        });

        // after all promises resolve, update the popup
        const identifyPromise = new Promise((resolve) => {
            Promise.all(promises).then((data) => {

            // reduce and sort to a plain array of features
                const identifiedFeatures = data.reduce((a, b) => { 
                    return a.concat(b); 
                }, [])
            
                // sort according to distance from map click
                    .sort((a, b) => {
                        const geoms = [a, b].map((f) => {
                            return f.geometry.extent ? f.geometry.extent.center : f.geometry;
                        });
                        const distances = geoms.map((geom, index) => {
                            return geometryEngine.distance(event.mapPoint, geoms[index], 'feet');
                        });
                        const ret = distances[0] < distances[1] ? -1 : distances[0] > distances[1] ? 1 : 0;
                        return ret;
                    });

                if (identifiedFeatures.length) { 
                    this.view.popup.open({
                        selectedFeatureIndex: 0,
                        features: identifiedFeatures,
                        updateLocationEnabled: true
                    });
                }
                resolve(identifiedFeatures);
            });
        });
        // this.view.popup.open({
        //     promises: [identifyPromise]
        // })
        return identifyPromise;
    }
});