import DefineMap from 'can-define/map/map';
import mapImage from './util/identifyMapImage';
import {loadModules} from 'esri-loader'; 
// asynchronously load the geometry engine
let geometryEngine;
loadModules(['esri/geometry/geometryEngine']).then((modules) => {
    [geometryEngine] = modules;
});

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


/**
 * identify class
 * performs identify on additional layers, like map image
 * usage: new Identify(properties)
 */
export default DefineMap.extend({
    clickHandle: '*',
    layerInfos: DefineMap,
    timeout: {type: 'number', value: 2000},
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
        const layers = this.view.map.allLayers;

        // put feature layers on top
        // don't sort the allLayers array, get a copy
        layers.toArray().sort((a, b) => {
            if (a.declaredClass === 'esri.layers.FeatureLayer') {
                return -1;
            }
            const aIndex = layers.indexOf(a);
            const bIndex = layers.indexOf(b);
            return bIndex - aIndex;
        })

        // for each layer, idenitify it, and push a promise
            .forEach((layer) => {

                if (!layer.visible) {
                    return;
                }
                if (IDENTIFY_METHODS.hasOwnProperty(layer.declaredClass)) {

                // get a promise that should resolve to some identify result
                    const promise = new Promise((resolve) => {
                        let isResolved = false;
                        IDENTIFY_METHODS[layer.declaredClass](event, layer, this).then((result) => {
                            if (isResolved) {
                                //!steal-remove-start
                                //eslint-disable-next-line
                                console.warn('identify: promise was already resolved');
                                //!steal-remove-end
                            }
                            isResolved = true;
                            resolve(result);
                        }).catch((e) => {
                            //!steal-remove-start
                            //eslint-disable-next-line
                            console.warn('identify: promise returned an error!', e);
                            //!steal-remove-end
                            resolve([]);
                        });

                        setTimeout(() => {
                            if (isResolved) {
                                return;
                            }                          
                            //!steal-remove-start
                            //eslint-disable-next-line  
                            console.warn('identify: promise timeout exceeded');
                            //!steal-remove-end
                            resolve([]);
                        }, this.timeout);
                    });
                

                    promises.push(promise);
                } else {
                    //!steal-remove-start
                    //eslint-disable-next-line
                    console.warn(`identify: no identify function registered for type ${layer.declaredClass}`);
                    //!steal-remove-end
                }
            });

        // after all promises resolve, update the popup
        const identifyPromise = new Promise((resolve) => {
            Promise.all(promises).then((data) => {

            // reduce and sort to a plain array of features
                const identifiedFeatures = data.reduce((a, b) => { 
                    return a.concat(b); 
                }, []);
            
                // sort according to distance from map click
                identifiedFeatures.sort((a, b) => {
                    const geoms = [a, b].map((f) => {
                        return f.geometry.extent ? f.geometry.extent.center : f.geometry;
                    });
                    const distances = geoms.map((geom, index) => {
                        return geometryEngine.distance(event.mapPoint, geoms[index], 'feet');
                    });
                        
                    const ret = distances[0] - distances[1];//distances[0] < distances[1] ? -1 : distances[0] > distances[1] ? 1 : 0;
                        
                    // if distance is a tie, sort so feature layers come first
                    if (Math.round(ret * 100) / 100 === 0) {
                        if (a.layer && a.layer.declaredClass === 'esri.layers.FeatureLayer') {
                            return -1;
                        }
                        if (b.layer && b.layer.declaredClass === 'esri.layers.FeatureLayer') {
                            return 1;
                        }
                    }
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