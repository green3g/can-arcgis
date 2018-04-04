import DefineMap from 'can-define/map/map';
import {buttons} from './defaults';
import decorate from 'can-arcgis/util/decorateAccessor';
import {loadModules} from 'esri-loader';
import assignGraphics, {symbols} from '~/util/assignGraphics';

export default DefineMap.extend('DrawWidget', {
    sketch: {
        type: '*',
        set (sketch) {
            if (this.sketch) {
                try {
                    this.sketch.destroy();
                } catch (e) {
                    //!steal-remove-start
                    //eslint-disable-next-line
                    console.warn(e);
                    //!steal-remove-end
                }
            }

            if (sketch) { 
                this.sketchHandle = sketch.on('draw-complete', (evt) => {
                    const g = assignGraphics([{
                        geometry: evt.geometry
                    }]);
                    this.graphicsLayer.add(g[0]);
                    if (this.continueDraw) {
                        setTimeout(() => {
                            sketch.create(this.active);
                        });
                    } else {

                    // let the view's click event get stopped first, then deactivate
                        setTimeout(() => {
                            this.active = null; 
                        });
                    }
                }); 
            }

            return sketch;
        }
    },
    sketchHandle: {
        type: '*',
        set (handle) {
            if (this.sketchHandle) { 
                this.sketchHandle.remove(); 
            }
            return handle;
        }
    },
    graphicsLayer: {},
    active: {
        type: 'string',
        set (type) {
            if (!type) {
                if (this.sketch) {
                    this.sketch.reset();
                }
                this.viewHandle = null;
                return type;
            }
        
            this.viewHandle = this.view.on('click', (evt) => {
                evt.stopPropagation();
            });
            this.sketch.create(type);
            return type;
        }
    },
    geometries: {
        type (types) {
            if (typeof types === 'string') {
                return types.split(',');
            }
            return types;
        },
        value () {
            return ['point', 'polyline', 'polygon'];
        }
    },
    buttons: {default: buttons},
    allowContinuous: {default: true, type: 'boolean'},
    continueDraw: {default: false, type: 'boolean'},
    view: {
        set (view) {
            if (this.graphicsLayer && this.view && this.view.map) {
                // clean up
                this.view.map.remove(this.graphicsLayer);
            }
            this.sketchHandle = null;
            this.sketch = null;
            this.viewHandle = null;

            if (view) {
                loadModules([
                    'esri/layers/GraphicsLayer',
                    'esri/widgets/Sketch/SketchViewModel'
                ]).then(([GraphicsLayer, SketchViewModel]) => {

                    // create a graphics layer
                    const gl = this.graphicsLayer || decorate(new GraphicsLayer({
                        title: 'Selection Graphics',
                        listMode: 'hide'
                    }));
                    view.map.add(gl);
                    this.graphicsLayer = gl;

                    // create a sketch view model
                    const sketch = new SketchViewModel({
                        view: view,
                        pointSymbol: symbols.point,
                        polylineSymbol: symbols.polyline,
                        polygonSymbol: symbols.polygon
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
    draw (type) {
        this.active = type === this.active ? null : type;
    },
    clearGraphics () {
        this.graphicsLayer.graphics.removeAll();
    }
});