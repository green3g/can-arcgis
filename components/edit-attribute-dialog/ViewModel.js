import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import convertEsriFields from 'can-arcgis/util/convertEsriFields';
import decorateAccessor from 'can-arcgis/util/decorateAccessor';

const editProps = {
    'update': 'updateFeatures',
    'add': 'addFeatures'
};

export default DefineMap.extend('EditWidget', {
    layerInfos: DefineMap,
    modal: '*',
    error: {
        type: 'string',
        set (error) {
            if (error) {
                this.resetScroll();
            }
            return error;
        }
    },
    editLayer: {},
    editMode: {default: 'update', type: 'string'},
    editTitle: {
        get () {
            if (this.editGraphic) {
                return 'Edit ' + this.editGraphic.layer.title;
            }
            return '';
        }
    },
    editGraphic: {
        set (graphic) {
            decorateAccessor(graphic);
            if (graphic.layer) {
                this.editLayer = graphic.layer;
            }
            return graphic;
        }
    },
    editFields: {
        Type: DefineList,
        get (fields) {
            if (fields && fields.length) {
                return fields;
            }
            if (this.editLayer) {
                return convertEsriFields(this.editLayer.fields);
            }
            return [];
        }
    },
    modalVisible: {
        type: 'boolean',
        default: false,
        set (val) {
            this.resetScroll();
            return val;
        }
    },
    isSaving: 'boolean',
    /**
     * Opens the edit dialog with the ViewModel properties passed
     * @param {String} event event dispatched from the dispatcher
     * @param {Object} args the attributes to assign to the view model
     */
    openDialog (args) {
        this.modalVisible = true;
        this.assign(args);
    },
    /**
     * 
     * @param {Array<Object>} args the event arguments
     * @param {Object} args.0 The attributes that have been modified
     * @returns {Promise} a promise object when the apply edits function resolves
     */
    submitForm (args) {
        this.error = null;
        const attributes = args[0].serialize();
        Object.assign(this.editGraphic.attributes, attributes);
        const propName = editProps[this.editMode];
        const params = {
            [propName]: [this.editGraphic]
        };

        // wrap esri's applyEdits with a a native then/catch promise
        return Promise.resolve(this.editLayer.applyEdits(params)).then((result) => {
            const resultProps = Object.keys(result);
            resultProps.forEach((resultProp) => {
                result[resultProp].forEach((feature) => {
                    if (feature.error && feature.error.message) {
                        this.error = feature.error.message;
                    }
                });
            });
            if (this.error) {
                this.isSaving = false;
                throw new Error(this.error);
            } else {
                this.assign({
                    isSaving: false,
                    modalVisible: false
                });
            }
        }).catch((e) => {
            //!steal-remove-start
            //eslint-disable-next-line
            console.warn(e);
            //!steal-remove-end
        });
    },
    cancelForm () {
        this.assign({
            isSaving: false,
            modalVisible: false
        });
    },
    resetScroll () {
        setTimeout(() => {
            const modal = document.querySelector('.modal-body');
            if (modal) { 
                modal.scrollTop = 0; 
            } 
        });
    }
    
});