import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import convertEsriFields from '../_common/convertEsriFields';
import decorateAccessor from '../_common/decorateAccessor';
import pubsub from 'pubsub-js';
import dev from 'can-util/js/dev/dev';


export default DefineMap.extend('EditWidget', {
    layerInfos: DefineMap,
    modal: '*',
    editGraphic: {
        set (graphic) {
            decorateAccessor(graphic);
            return graphic;
        }
    },
    editFields: {
        Type: DefineList,
        get (fields) {
            if (fields && fields.length) {
                return fields;
            }
            if (this.editGraphic) {
                return convertEsriFields(this.editGraphic.layer.fields);
            }
            return [];
        }
    },
    pubsubTopic: {
        type: 'string',
        set (topic) {
            
            if (this.pubsubToken) {
                pubsub.unsubscribe(this.pubsubToken);
                this.pubsubToken = null;
            }

            if (topic) { 
                this.pubsubToken = pubsub.subscribe(topic, (tpc, graphic) => {
                    this.assign({
                        editGraphic: graphic,
                        modalVisible: true
                    });
                }); 
            } 
            return topic;
        }
    },
    pubsubToken: '*',
    modalVisible: {
        type: 'boolean',
        value: false,
        set (val) {
            if (this.modal) { 
                setTimeout(() => {
                    this.modal.querySelector('.modal-body').scrollTop = 0; 
                });
            }
            return val;
        }
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
    },
    setModal (element) {
        console.log(element);
        this.modal = element;
    }
    
});