import EditViewModel from '../edit-attribute-dialog/ViewModel';

export default EditViewModel.extend('EditFeatureWidget', {
    editMode: {value: 'add'},
    view: {},
    editLayer: {},
    editGraphic: {
        get () {
            if (this.graphicsLayer && this.graphicsLayer.graphics.length) { 
                const g = this.graphicsLayer.graphics.items[0];
                g.attributes = {};
                return g;
            }
            return {};
        }
    },
    graphicsLayer: {},
    activate (layer) {
        this.editLayer = layer;
    },
    deactivate () {
        this.editLayer = null;
        return false;
    },
    submitForm () {
        EditViewModel.prototype.submitForm.apply(this, arguments).then(() => {
            this.graphicsLayer.graphics.removeAll();
        });
    }
});