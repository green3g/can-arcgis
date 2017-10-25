import DefineMap from 'can-define/map/map';
import assign from 'can-assign';
import esriPromise from 'esri-promise';

import actions from './util/Actions';
import createLayers from '../_common/createLayers';
import decorate from 'can-arcgis/util/decorateAccessor';

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
    map: {},
    view: {},
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

            // create and add custom layers
            const layers = this.mapOptions.layers;
            createLayers(layers).then((l) => {
                this.mapOptions.layers = l;

                // create custom basemaps
                const defaultBasemap = this.mapOptions.basemap;
                if (typeof defaultBasemap === 'object') {
                    esriPromise(['esri/Basemap']).then(([Basemap]) => {
                        createLayers(defaultBasemap.baseLayers).then((baseLayers) => {
                            this.mapOptions.basemap = new Basemap(assign(defaultBasemap, {
                                baseLayers: baseLayers
                            }));
                            this.createMap(element);
                        });
                    });
                } else {
                    this.createMap(element);
                }
            });
            return element;
        }
    },
    createMap (element) {
        
        esriPromise(['esri/Map', 'esri/views/MapView']).then(([Map, MapView]) => {

            const mapOptions = assign({
                basemap: 'streets-night-vector'
            }, this.mapOptions);

            // create a map
            this.map = decorate(new Map(mapOptions));

            // create the view
            this.view = decorate(new MapView(assign({
                container: element,
                map: this.map
            }, this.viewOptions)));

            // default dock options 
            this.view.popup.dockOptions.position = 'bottom-right';

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
    }
});
