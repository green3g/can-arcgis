import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import string from 'can-util/js/string/string';
import esriPromise from 'esri-promise';
import assignGraphics from '../_common/assignGraphics';
import decorate from '../_common/decorateAccessor';
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
                    esriPromise(['esri/layers/GraphicsLayer']).then(([GraphicsLayer]) => {
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
        value: 'Select Features'
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
        value: 'Layer to select'
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
            return this.layers[this.layer] || 'custom';
        }
    },

    actions: DefineList,

    // select query dropdown
    query: {
        type: 'string',
        value: 'spatial'
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
            const queries = this.queries.filter((query) => {
                return query.value === this.query;
            });
            
            return queries.length ? queries[0] : {};
        }
    },
    queryFormObject: {
        Value: DefineMap
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
        this.assign({
            message: null,
            activeButton: null
        });

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

            esriPromise(['esri/geometry/geometryEngine']).then(([geometryEngine]) => {
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
        esriPromise([
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
                console.log(error);
            });
        });
    },
    highlightFeatures (features) {
        
        if (features.length) {
            assignGraphics(features).then((updatedFeatures) => {
                this.drawGraphicsLayer.removeAll();
                this.selectGraphicsLayer.addMany(updatedFeatures);
                this.view.goTo(updatedFeatures);
            });
        }
                        
    },
    onActionClick (action) {
        action.onClick(this.selectGraphicsLayer.graphics, this);
        return false;
    }
    
});