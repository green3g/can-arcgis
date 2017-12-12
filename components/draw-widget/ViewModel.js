import DefineMap from 'can-define/map/map';
import {graphics, buttons} from './defaults';
import decorate from '../_common/decorateAccessor';
import esriPromise from 'esri-promise';

export default DefineMap.extend('DrawWidget', {
    sketch: '*',
    sketchHandle: '*',
    graphicsLayer: {},
    active: {
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
    buttons: {value: buttons},
    allowContinuous: {value: true, type: 'boolean'},
    continueDraw: {value: false, type: 'boolean'},
    view: {
        set (view) {
            if (this.graphicsLayer && this.view) {
                // clean up
                this.view.remove(this.graphicsLayer);
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
                    const gl = this.graphicsLayer || decorate(new GraphicsLayer({
                        title: 'Selection Graphics',
                        listMode: 'hide'
                    }));
                    view.map.add(gl);
                    this.graphicsLayer = gl;

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
                            sketch.create(this.active);
                        } else {

                            // let the view's click event get stopped first, then deactivate
                            setTimeout(() => {
                                this.active = null; 
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
    draw (type) {
        this.active = type === this.active ? null : type;
    },
    clearGraphics () {
        this.graphicsLayer.graphics.removeAll();
    }
});