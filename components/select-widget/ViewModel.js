import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import string from 'can-util/js/string/string';
import esriPromise from 'esri-promise';
import assignGraphics from '../_common/assignGraphics';
import reflect from 'can-reflect';
import {graphics, buttons} from './draw/defaults';

export default DefineMap.extend('SelectWidget', {seal: false}, {
    sketch: '*',
    sketchHandle: '*',
    view: {
        set (view) {
            if (this.graphicsLayer && this.view) {
                // clean up
                this.view.remove(this.graphicsLayer);
                this.graphicsLayer = null;
                this.sketch.destroy();
                this.sketchHandle.remove();
                this.sketchHandle = null;
                this.sketch = null;
            }

            if (view) {
                esriPromise([
                    'esri/layers/GraphicsLayer',
                    'esri/widgets/Sketch/SketchViewModel'
                ]).then(([GraphicsLayer, SketchViewModel]) => {

                    // create a graphics layer
                    const gl = new GraphicsLayer({
                        title: 'Selection Graphics',
                        listMode: 'hide'
                    });
                    gl.graphics.on('change', () => {
                        this.graphicsLength = gl.graphics.length;
                    });
                    this.graphicsLayer = gl;
                    view.map.add(gl);

                    // create a sketch view model
                    const sketch = new SketchViewModel({
                        view: view,
                        pointSymbol: graphics.pointSymbol,
                        polylineSymbol: graphics.polylineSymbol,
                        polygonSymbol: graphics.polygonSymbol
                    });
                    this.sketchHandle = sketch.on('draw-complete', (evt) => {
                        this.graphicsLayer.add(evt.graphic);
                        if (this.continueDraw) {
                            sketch.create(this.activeButton);
                        } else {

                            // let the view's click event get stopped first, then deactivate
                            setTimeout(() => {
                                this.activeButton = null;
                            });
                        }
                    });
                    this.sketch = sketch;
                });
            }
            return view;
        }
    },
    viewHandle: {
        type: '*',
        set (handle) {
            if (this.viewHandle) {
                this.viewHandle.remove();
            }
            return handle;
        }
    },
    buttons: {
        value: buttons
    },
    activeButton: {
        type: 'string',
        set (type) {
            if (!type) {
                this.viewHandle = null;
                this.sketch.reset();
                return type;
            }
        
            this.viewHandle = this.view.on('click', (evt) => {
                evt.stopPropagation();
            });
            this.sketch.create(type);
            return type;
        }
    },
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
    // allow the user to submit their own geometries to an action
    allowCustom: 'htmlbool',

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
    graphicsLayer: '*',
    graphicsLength: 'number',
    draw (type) {
        this.activeButton = type === this.activeButton ? null : type;
    },

    // set layer to custom when custom tab is displayed
    selectCustom () {
        this.layer = 'custom';
    },
    
    reset () {
        if (this.graphicsLayer) {
            this.graphicsLayer.graphics = [];
        }
    },
    clearSelected () {
        this.selectedFeatures.replace([]);
        this.graphicsLayer.graphics.removeAll();
        this.formIsSaving = false;
    },

    // form query submit
    searchFormSubmit (obj) {
        const where = string.sub(this.selectedQuery.queryTemplate || '1=1', obj);
        this.selectFeatures({
            where: where
        });
    },
    searchGraphics () {
        this.activeButton = null;
        if (this.graphicsLength === 1) {
            this.selectFeatures({
                geometry: this.graphicsLayer.graphics.getItemAt(0).geometry
            });
            this.clearSelectMultiple();
        } else if (this.graphicsLength > 1) {

            // get the geometries
            const geometries = this.graphicsLayer.graphics.map((g) => {
                return g.geometry;
            }).toArray();

            esriPromise(['esri/geometry/geometryEngine']).then(([geometryEngine]) => {
                const geom = geometryEngine.union(geometries);
            
                this.clearSelectMultiple();
                this.selectFeatures({
                    geometry: geom
                });
            });
        }
        
        
    },
    clearSelectMultiple () {
        this.graphicsLayer.graphics.removeAll();
    },
    
    selectFeatures (queryProps) {
        

        if (this.selectedLayer === 'custom') {

            // higlight and insert fake feature
            this.highlightFeatures([{
                geometry: queryProps.geometry
            }]);
            this.selectedFeatures.replace([{
                type: 'custom'
            }]);
            return;
        } 
        const idProp = this.selectedLayer.idProp || 'cid';
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
                    return f.attributes[idProp];
                }));

                if (!this.selectedFeatures.length) {
                    this.formIsSaving = false;
                } else {
                    this.view.goTo(result.features);
                }
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