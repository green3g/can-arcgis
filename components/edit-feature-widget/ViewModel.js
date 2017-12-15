import EditViewModel from '../edit-attribute-dialog/ViewModel';

export default EditViewModel.extend('EditFeatureWidget', {
    title: 'Create Features',
    editMode: {value: 'add'},
    view: {},
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
        this.editLayer = layer;
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
    }
});