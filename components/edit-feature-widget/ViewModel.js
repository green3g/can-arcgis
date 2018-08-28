import EditViewModel from '../edit-attribute-dialog/ViewModel';
import canReflect from 'can-reflect';
import DefineMap from 'can-define/map/map';
import get from 'can-util/js/get/get';

export default EditViewModel.extend('EditFeatureWidget', {
  title: {type: 'string', default: 'Create Features'},
  editMode: {type: 'string', default: 'add'},
  layerInfos: {Default: DefineMap},
  view: {},
  layers: {
    get () {
      const layers = canReflect.getKeyValue(this.view.map.layers, 'items');
      const info = this.layerInfos;
      return layers.filter((l) => {
        if (canReflect.getKeyValue(info, `${l.id}.exclude`)) {
          return false;
        }
        if (!canReflect.getKeyValue(l, 'loaded')) {
          return false;
        }
        return canReflect.getKeyValue(l, 'capabilities.editing.supportsGeometryUpdate');
      });
    }
  },
  editLayer: {},
  editGraphic: {
    get () {
      if (this.graphicsLayer && this.graphicsLayer.graphics.length) {
        const g = this.graphicsLayer.graphics.items[0];
        g.attributes = {};
        this.view.graphics.add(g);
        return g;
      }
      return {};
    }
  },
  graphicsLayer: {},
  clearGraphics () {
    this.view.graphics.remove(this.editGraphic);
    this.graphicsLayer.graphics.removeAll();
  },
  activate (layer) {
    const info = get(this.layerInfos, `${layer.id}.fields`);
    this.assign({
      editLayer: layer,
      editFields: info || null
    });
  },
  deactivate () {
    this.clearGraphics();
    this.editLayer = null;
    return false;
  },
  submitForm () {
    EditViewModel.prototype.submitForm.apply(this, arguments).then(() => {
      this.clearGraphics();
    });
  },
  cancelForm () {
    EditViewModel.prototype.cancelForm.apply(this, arguments);
    this.clearGraphics();
  },
  resetScroll () {
    setTimeout(() => {
      const node = document.querySelector('edit-feature-widget');
      if (node) {
        node.scrollTop = 0;
      }
    });
  }
});
