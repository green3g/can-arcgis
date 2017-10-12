import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import string from 'can-util/js/string/string';
import esriPromise from 'esri-promise';
import assignGraphics from '../_common/assignGraphics';

export default DefineMap.extend('WorkorderCreator', {seal: false}, {
    title: {
        value: 'Create a workorder'
    },
    // select layer dropdown
    layerOptions: {
        Value: DefineList,
        Type: DefineList
    },
    layerAlias: {
        value: 'Layer to assign workorders'
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
    query: 'string',
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
    drawLayerLength: 'number',
    drawLayer: {
        // async getter
        // eslint-disable-next-line
        get (val, set) {
            if (val) {
                return val;
            }
            esriPromise(['esri/layers/GraphicsLayer']).then(([GraphicsLayer]) => {
                val = new GraphicsLayer();
                val.graphics.on('change', () => {
                    this.drawLayerLength = val.graphics.length;
                });
                set(val);
            });
        }
    },

    singleClickHandle: '*',
    singleActive: {
        type: 'boolean',
        set (active) {
            if (active) {

                // cleanup handle 
                if (this.singleClickHandle) {
                    this.singleClickHandle.remove();
                }
                this.singleClickHandle = this.view.on('click', (event) => {
                    
                    // clean up listener
                    this.singleClickHandle.remove(); 
                    this.singleClickHandle = null;
                    this.singleActive = false;
                    
                    // prevent the event from bubbling 
                    event.stopPropagation();
                    
                    this.selectFeatures({
                        geometry: event.mapPoint,
                        distance: 15,
                        units: 'feet'
                    });
                });
            }
        }
    },
    multipleActive: {
        type: 'boolean',
        set (val) {
            if (val) {
                this.singleActive = false;
            }
            return val;
        }
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

    // initializes the single selection mode
    initSelectSingle () {
        this.singleActive = !this.singleActive;
    },

    // initializes the multiple selection mode 
    initSelectMultiple () {
        // this.multipleActive = true;
        // this.selectClickHandle = this.view.on('click', (event) => {
        //     event.stopPropagation();

        //     this.selectActive = true;
        // });
    },
    searchSelectMultiple () {
        if (this.drawLayerLength === 1) {
            this.selectFeatures({
                geometry: this.drawLayer.graphics.getItemAt(0).geometry
            });
            this.clearSelectMultiple();
        } else if (this.drawLayerLength > 1) {

            // get the geometries
            const geometries = this.drawLayer.graphics.map((g) => {
                return g.geometry;
            }).toArray();

            esriPromise(['esri/geometry/geometryEngine']).then(([geometryEngine]) => {
                const geom = geometryEngine.union(geometries);
            
                this.selectFeatures({
                    geometry: geom
                });
            });
            this.clearSelectMultiple();
        }
        
        
    },
    clearSelectMultiple () {
        this.drawLayer.graphics.removeAll();
    },
    initGraphicsLayer () {
        return new Promise((resolve) => {
            if (!this.graphicsLayer) {
                esriPromise(['esri/layers/GraphicsLayer']).then(([GraphicsLayer]) => {
                    
                    this.graphicsLayer = new GraphicsLayer({
                        visible: true,
                        title: 'Selected Features',
                        graphics: []
                    }); 
                
                    this.view.map.add(this.graphicsLayer);
                    resolve();
                });
            } else {
                resolve();
            }
        });
    },
    
    selectFeatures (queryProps) {

        this.initGraphicsLayer().then(() => {
        

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