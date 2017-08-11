import DefineMap from 'can-define/map/map';
import assign from 'object-assign';
import esriPromise from 'esri-promise';

import actions from './util/Actions';
import createLayers from './util/createLayers';

export default DefineMap.extend('EsriMap', {seal: false}, {
    mapOptions: {
        type: '*',
        value: {}
    },
    viewOptions: {
        type: '*',
        value: {}
    },
    map: '*',
    view: '*',
    createMap (element) {
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
                    const selected = this.view.popup.selectedFeature;
                    if (typeof event.action.onClick === 'function') {
                        event.action.onClick(selected, event, this);
                    } else {
                        actions.get(event.action.id)(selected, event, this);
                    }
                });
     
            });
        });   
    }
});
