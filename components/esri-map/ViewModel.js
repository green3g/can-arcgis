import DefineMap from 'can-define/map/map';
import assign from 'object-assign';
import esriPromise from 'esri-promise';

import actions from './util/Actions';
import createLayers from './util/createLayers';

function serialize (obj) {
    return obj && obj.serialize ? obj.serialize() : obj;
}

export default DefineMap.extend('EsriMap', {seal: false}, {
    mapOptions: {
        set (val) {
            return serialize(val);
        },
        value: {}
    },
    viewOptions: {
        set (val) {
            return serialize(val);
        },
        value: {}
    },
    map: '*',
    view: '*',
    element: {
        set (element) {
            if (!element && this.view) {
                this.view.destroy();
                this.set({
                    view: null,
                    map: null
                });
                return element;
            }
            esriPromise(['esri/Map', 'esri/views/MapView']).then(([Map, MapView]) => {

            // create and add custom layers
                const layers = this.mapOptions.layers;
                createLayers(layers).then((l) => {
            
                    const mapOptions = assign({
                        basemap: 'streets-night-vector'
                    }, this.mapOptions, {
                        layers: l
                    });

                    // create a map
                    this.map = new Map(mapOptions);

                    // create the view
                    this.view = new MapView(assign({
                        container: element,
                        map: this.map
                    }, this.viewOptions));


                    // register custom action callers
                    this.view.popup.on('trigger-action', (event) => {
                        const selected = event.target.selectedFeature;
                        if (typeof event.action.onClick === 'function') {
                            event.action.onClick(selected, event, this);
                        } else {
                            actions.get(event.action.id)(selected, event, this);
                        }
                    });
     
                });
            });   
            return element;
        }
    }
});
