import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import string from 'can-util/js/string/string';
import {loadModules} from 'esri-loader';
import assignGraphics from 'can-arcgis/util/assignGraphics';
import decorate from 'can-arcgis/util/decorateAccessor';
import reflect from 'can-reflect';

export default DefineMap.extend('SelectWidget', {seal: false}, {
    message: 'string',
    view: { 
        set (view) {
            if (this.view) {
                this.view.map.remove(this.selectGraphicsLayer);
            }

            if (view) {
                if (!this.selectGraphicsLayer) {
                    loadModules(['esri/layers/GraphicsLayer']).then(([GraphicsLayer]) => {
                        this.selectGraphicsLayer = decorate(new GraphicsLayer({
                            listMode: 'hide'
                        }));
                        view.map.add(this.selectGraphicsLayer);
                    });
                }

            }

            return view;
        }
    },
    title: {
        type: 'string',
        default: 'Select Features'
    },
    // select layer dropdown
    layerOptions: {
        get () {
            const keys = reflect.getOwnEnumerableKeys(this.layers);

            const options = keys.map((key) => {
                return {
                    label: this.layers[key].label || key,
                    value: key
                };
            });

            return options;
        }
    },
    layerAlias: {
        default: 'Layer to select'
    },
    layerProperties: {
        get () {
            return {
                options: this.layerOptions,
                alias: this.layerAlias
            };
        }
    },

    // arcgis server layer props
    layers: DefineMap,
    layer: {
        type: 'string',
        set (name) {
            
            if (!name) {
                return name;
            }
            localStorage.selectedLayer = name;
            if (!this.layers[name]) { 
                return name; 
            }
    
            const layerProps = this.layers[name];
            const layer = this.view.map.findLayerById(layerProps.supportId);
            if (layer) { 
                layer.sublayers.forEach((l) => {
                    l.visible = layerProps.supportIds.indexOf(l.id) > -1;
                }); 
            }
            return name;
        }
    },
    selectedLayer: {
        get () {
            return this.layers[this.layer];
        }
    },

    actions: DefineList,

    // select query dropdown
    query: {
        type: 'string',
        default: 'spatial'
    },
    queries: {
        get () {
            const props = this.selectedLayer;
            const options = props.queries || [];
            return options.concat([{
                value: 'spatial',
                label: 'From the map'
            }]);
        }
    },
    queryProperties: {
        get () {
            return {
                options: this.queries,
                alias: 'Select features by'
            };
        }
    },
    selectedQuery: {
        get () {
            // reset form object
            this.queryFormObject = new DefineMap();
            
            const q = this.query;
            const queries = this.queries.filter((query) => {
                return query.value === q;
            });
            
            return queries.length ? queries[0] : {fields: []};
        }
    },
    queryFormObject: {
        Default: DefineMap
    },
    formIsSaving: 'boolean',
    drawGraphicsLayer: {},
    selectGraphicsLayer: {},
    

    // form query submit
    searchFormSubmit (obj) {
        const where = string.sub(this.selectedQuery.queryTemplate || '1=1', obj);
        this.selectFeatures({
            where: where
        });
    },
    searchGraphics () {
        this.activeButton = null;

        if (this.drawGraphicsLayer.graphics.items.length === 1) {
            this.selectFeatures({
                geometry: this.drawGraphicsLayer.graphics.getItemAt(0).geometry
            });
            this.clearDrawing();

        } else if (this.drawGraphicsLayer.graphics.items.length > 1) {
            
            // if graphics is more than one, we need to union them
            // get the geometries
            const geometries = this.drawGraphicsLayer.graphics.map((g) => {
                return g.geometry;
            }).toArray();

            loadModules(['esri/geometry/geometryEngine']).then(([geometryEngine]) => {
                const geom = geometryEngine.union(geometries);
            
                this.clearDrawing();
                this.selectFeatures({
                    geometry: geom
                });
            });
        }
        
        
    },
    clearDrawing () {
        this.drawGraphicsLayer.graphics.removeAll();
    },
    
    clearSelected () {
        this.selectGraphicsLayer.graphics.removeAll();
        this.drawGraphicsLayer.graphics.removeAll();
        this.formIsSaving = false;
    },
    
    selectFeatures (queryProps) {
        this.message = null;
        loadModules([
            'esri/tasks/QueryTask', 
            'esri/tasks/support/Query'
        ]).then(([QueryTask, Query]) => {
            const query = Object.assign(new Query(), {
                outFields: ['*'],
                returnGeometry: true,
                outSpatialReference: this.view.spatialReference
            }, queryProps);

            const task = new QueryTask({
                url: `${this.selectedLayer.url}/query`
            });

            task.execute(query).then((result) => {
                if (result.features.length) { 
                    this.highlightFeatures(result.features); 
                } else {
                    this.message = 'No features were selected';
                }
                this.formIsSaving = false;
            }).otherwise((error) => {
                this.message = error.message;
                this.formIsSaving = false;
            });
        });
    },
    highlightFeatures (features) {
        
        if (features.length) {
            assignGraphics(features);
            this.drawGraphicsLayer.removeAll();
            this.selectGraphicsLayer.addMany(features);
            this.view.goTo(features);
        }
                        
    },
    onActionClick (action, event) {
        if (event) {
            event.preventDefault();
        }
        action.onClick(this.selectGraphicsLayer.graphics, this);
        return false;
    }
    
});