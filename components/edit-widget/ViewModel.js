import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import get from 'can-util/js/get/get';
import decorateAccessor from '../_common/decorateAccessor';
import pubsub from 'pubsub-js';
import dev from 'can-util/js/dev/dev';


const TEXT_TYPES = {
    'small-integer': 'number',
    integer: 'number',
    single: 'numer',
    date: 'date',
    double: 'number',
    string: 'text'
};

const EXCLUDE = {
    xml: 1,
    'global-id': 1,
    guid: 1,
    raster: 1,
    blob: 1,
    geometry: 1,
    oid: 1
};

function getFieldType (f) {
    if (f.domain) {
        return 'select';
    }
    return 'text';
}

function getMixin (f) {
    let mixin = {};
    if (f.domain && f.domain.codedValues) {
        mixin = {
            type: 'select',
            options: f.domain.codedValues.map((item) => {
                return {
                    label: item.name,
                    value: item.code
                };
            })
        };
    }

    if (f.type === 'date') {
        mixin = {
            type: 'text',
            ui: 'datepicker',
            uiOptions: {
                yearRange: '1900:2050',
                changeMonth: true,
                changeYear: true
            }
        };
    }

    return mixin;
}
function getTextType (f) {
    return TEXT_TYPES[f.type] || 'text';
}

function getFields (esriFields) {
    return esriFields.filter((f) => {
        return !EXCLUDE[f.type];
    }).map((f) => {
        const mixin = getMixin(f);
        return Object.assign({
            name: f.name,
            alias: f.alias,
            fieldType: getFieldType(f),
            textType: getTextType(f.type)
        }, mixin);
    });
}

export default DefineMap.extend('EditWidget', {
    layerInfos: DefineMap,
    mode: 'string',
    editGraphic: {},
    editFields: DefineList,
    view: {
        set (view) {
            // init pubsub
            pubsub.subscribe('editGraphic', (topic, graphic) => {
                decorateAccessor(graphic);
                this.assign({
                    editGraphic: graphic,
                    modalVisible: true,
                    editFields: getFields(graphic.layer.fields)
                });
            });


            // get editable layers
            const layerPromises = view.map.layers.map((l) => {
                return new Promise((resolve) => {
                    l.then((l) => {
                        resolve({layer: l});
                    });
                });
            }).toArray();
            Promise.all(layerPromises).then((layers) => {
                this.layers = layers.map((l) => {
                    return l.layer; 
                }).filter((l) => {
                    return get(l, 'capabilities.operations.supportsEditing') && get(l, 'capabilities.operations.supportsUpdate');
                });
            });
        
            return view;
        }
    },
    layers: {
        Type: DefineList,
        set (layers) {
            return layers;
        }
    },
    modalVisible: {
        type: 'boolean',
        value: false
    },
    isSaving: 'boolean',
    submitForm (vm, element, event, attributes) {
        Object.assign(this.editGraphic.attributes, attributes);
        this.editGraphic.layer.applyEdits({
            updateFeatures: [this.editGraphic]
        }).then(() => {
            this.assign({
                isSaving: false,
                modalVisible: false
            });
        }).otherwise((response) => {
            dev.warn(response);
        });
    },
    cancelForm () {
        this.assign({
            isSaving: false,
            modalVisible: false
        });
    }
    
});