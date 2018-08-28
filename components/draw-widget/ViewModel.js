import DefineMap from 'can-define/map/map';
import {buttons} from './defaults';
import {loadModules} from 'esri-loader';
import assignGraphics, {symbols} from '~/util/assignGraphics';

export default DefineMap.extend('DrawWidget', {
  modulePromise: {
    get () {
      return loadModules([
        'esri/layers/GraphicsLayer',
        'esri/widgets/Sketch/SketchViewModel'
      ]).then(([GraphicsLayer, SketchViewModel]) => {
        this.modules = {GraphicsLayer, SketchViewModel};
      });
    }
  },
  modules: {
    set (modules, resolve) {
      const view = this.view;
      const {GraphicsLayer, SketchViewModel} = modules;
      // create a graphics layer
      const gl = this.graphicsLayer || new GraphicsLayer({
        title: 'Selection Graphics',
        listMode: 'hide'
      });
      view.map.add(gl);
      this.graphicsLayer = gl;

      // create a sketch view model
      const sketch = new SketchViewModel({
        layer: gl,
        view,
        pointSymbol: symbols.point,
        polylineSymbol: symbols.polyline,
        polygonSymbol: symbols.polygon
      });
      this.sketch = sketch;
      return modules;
    }
  },
  sketch: {
    type: '*',
    set (sketch) {
      if (this.sketch) {
        try {
          this.sketch.destroy();
        } catch (e) {
          //! steal-remove-start
          // eslint-disable-next-line
                    console.warn(e);
          //! steal-remove-end
        }
      }

      if (sketch) {
        this.sketchHandle = sketch.on('create-complete', (evt) => {
          if (this.continueDraw) {
            setTimeout(() => {
              sketch.create(this.active);
            });
          } else {
            // let the view's click event get stopped first, then deactivate
            setTimeout(() => {
              this.active = null;
            }, 100);
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
        try {
          this.sketch._defaultGraphicsLayer.listMode = 'hide';
        } catch (e) {
          console.warn(e);
        }
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
  },
  connectedCallback () {
    return () => {
      this.assign({
        view: null,
        sketch: null
      });
    };
  }
});
