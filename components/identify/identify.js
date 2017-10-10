import DefineMap from 'can-define/map/map';
import mapImage from './util/mapImage';
import dev from 'can-util/js/dev/dev';
import get from 'can-util/js/get/get';
import assign from 'can-util/js/assign/assign';
import stache from 'can-stache';
import esriPromise from 'esri-promise';

function defaultContent (data) {
    const node = document.createElement('div');
    node.appendChild(stache('<property-table vm:object:from="graphic.attributes" />')(data));
    return node;
}

const methods = {
    'esri.layers.MapImageLayer': mapImage
};

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
        this.view.popup.features = [];
        const promises = [];
        this.view.map.layers.forEach((layer) => {
            if (!layer.visible) {
                return;
            }
            if (methods.hasOwnProperty(layer.declaredClass)) {

                // get a promise that should resolve to some identify result
                const promise = methods[layer.declaredClass](event, this.view, layer, this.layerInfos);
                promises.push(promise);
                promise.then(this.identifyResolved.bind(this, layer.id, event));
            } else {
                dev.warn(`no identify function registered for type ${layer.declaredClass}`);
            }
        });
        Promise.all(promises).then(() => {
            this.view.popup.open({
                selectedFeatureIndex: 0
            });
        });
    },
    identifyResolved (layerId, event, result) {
        if (result.results) { 

            esriPromise(['esri/geometry/geometryEngine']).then(([GeometryEngine]) => {

                
                const features = result.results.map((props) => {

                // get a default popup template from popupTemplates.layerId.sublayerId
                    const template = get(this, `popupTemplates.${layerId}.${props.layerId}`) || {};

                    // mixin props
                    props.feature.popupTemplate = assign({
                        title: props.layerName,
                        content: defaultContent
                    }, template.serialize ? template.serialize() : template);

                    // return the modified feature
                    return props.feature;
                }).sort((a, b) => {
                    const geoms = [a, b].map((f) => {
                        return f.geometry.extent ? f.geometry.extent.center : f.geometry;
                    });
                    const distances = geoms.map((geom, index) => {
                        return GeometryEngine.distance(event.mapPoint, geoms[index], 'feet');
                    });
                    const ret = distances[0] < distances[1] ? -1 : distances[0] > distances[1] ? 1 : 0;
                    return ret;
                });

                // add graphics ? doesn't work
                // getGraphics(features).then((updatedFeatures) => {
                // });
                
                // open the features
                if (features.length) { 
                    this.view.popup.features = this.view.popup.features.concat(features);
                }
            });
        }
        
    }
});