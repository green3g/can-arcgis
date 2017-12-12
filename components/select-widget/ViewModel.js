import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import string from 'can-util/js/string/string';
import esriPromise from 'esri-promise';
import assignGraphics from '../_common/assignGraphics';
import reflect from 'can-reflect';

export default DefineMap.extend('SelectWidget', {seal: false}, {
    view: { },
    continueDraw: 'boolean',
    title: {
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
    selectedFeatures: {Value: DefineList},
    graphicsLayer: {},
    

    // form query submit
    searchFormSubmit (obj) {
        const where = string.sub(this.selectedQuery.queryTemplate || '1=1', obj);
        this.selectFeatures({
            where: where
        });
    },
    searchGraphics () {
        this.activeButton = null;

        if (this.graphicsLayer.graphics.items.length === 1) {
            this.selectFeatures({
                geometry: this.graphicsLayer.graphics.getItemAt(0).geometry
            });
            this.clearGraphics();

        } else if (this.graphicsLayer.graphics.items.length > 1) {
            
            // if graphics is more than one, we need to union them
            // get the geometries
            const geometries = this.graphicsLayer.graphics.map((g) => {
                return g.geometry;
            }).toArray();

            esriPromise(['esri/geometry/geometryEngine']).then(([geometryEngine]) => {
                const geom = geometryEngine.union(geometries);
            
                this.clearGraphics();
                this.selectFeatures({
                    geometry: geom
                });
            });
        }
        
        
    },
    clearGraphics () {
        this.graphicsLayer.graphics.removeAll();
    },
    
    clearSelected () {
        this.selectedFeatures.replace([]);
        this.graphicsLayer.graphics.removeAll();
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
                this.highlightFeatures(result.features);
                this.selectedFeatures.replace(result.features.map((f) => {
                    return f.attributes;
                }));

                if (this.selectedFeatures.length) {
                    this.view.goTo(result.features);
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
                this.graphicsLayer.removeAll();
                this.graphicsLayer.addMany(updatedFeatures);
            });
        }
                        
    },
    onActionClick (action) {
        action.onClick(this);
        return false;
    }
    
});