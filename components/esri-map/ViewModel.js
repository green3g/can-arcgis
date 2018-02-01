import DefineMap from 'can-define/map/map';
import {loadModules} from 'esri-loader';

import actions from './util/Actions';
import createLayers from 'can-arcgis/util/createLayers';
import createWidgets from './widgets/createWidgets';
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
    widgets: {},
    map: {},
    view: {
        set (view) {
            if (this.widgets) { 
                createWidgets({
                    view: view,
                    widgets: this.widgets
                }); 
            }
            return view;
        }
    },
    element: {
        set (element) {
            if (!element && this.view) {
                this.view.destroy();
                this.assign({
                    view: null,
                    map: null
                });
                return element;
            }

            // create and add custom layers
            const layers = this.mapOptions.layers || [];
            createLayers(layers).then((l) => {
                this.mapOptions.layers = l.map((l) => {
                    return l.layer;
                });
                // create custom basemaps
                const defaultBasemap = this.mapOptions.basemap;
                if (defaultBasemap && typeof defaultBasemap === 'object') {
                    loadModules(['esri/Basemap']).then(([Basemap]) => {
                        createLayers(defaultBasemap.baseLayers).then((baseLayers) => {
                            baseLayers = baseLayers.map((bl) => {
                                return bl.layer;
                            });
                            this.mapOptions.basemap = new Basemap(Object.assign(defaultBasemap, {
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

        // check for view options and map options types for scene view capability
        const viewType = this.viewOptions.type || 'MapView';
        const mapType = this.mapOptions.type || 'Map';

        loadModules([`esri/${mapType}`, `esri/views/${viewType}`]).then(([Map, MapView]) => {


            // create a map
            if (!this.map) { 
                this.map = decorate(new Map(this.mapOptions)); 
            }

            // create the view
            this.view = decorate(new MapView(Object.assign({
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
