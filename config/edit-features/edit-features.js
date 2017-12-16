/**
 * a full featured feature editing experience
 */

import '../../components/edit-feature-widget/edit-feature-widget';
import stache from 'can-stache';
import './edit.less';
import deleteFeature from '../../actions/deleteFeature';
import openEditPopup from '../../actions/openEditPopup';

const popupTemplate = {
    actions: [deleteFeature, openEditPopup]
};

export default {
    debug: true,

    // viewOptions - options to be passed to view constructor
    viewOptions: {
        center: [-93.28697204589844, 44.294471740722656],
        zoom: 12
    },

    // mapOptions - options to be passed to map constructor 
    // layers are special and are passed to their designated layer constructor
    // before map is created 
    mapOptions: {
        basemap: 'gray',
        layers: [{
            type: 'feature',
            options: {
                url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer/6',
                popupTemplate: popupTemplate
            }
        }, {
            type: 'feature',
            options: {
                url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer/8',
                popupTemplate: popupTemplate
            }
        }, {
            type: 'feature',
            options: {
                url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Military/FeatureServer/9',
                popupTemplate: popupTemplate
            }
        }, {
            
            // you can use "type" for a short hand version of the layer path
            // see [types](can-arcgis/util/createLayers.js) for all the types
            // or you can provide the full path, like this:
            // path: 'esri/layers/FeatureLayer',
            type: 'feature',
            options: {
                url: 'https://services1.arcgis.com/6bXbLtkf4y11TosO/arcgis/rest/services/Restaurants/FeatureServer/0',
                id: 'workorders',
                outFields: ['*'],
                popupTemplate: popupTemplate
            }
        }]
    },
    widgets: [{
        parent: document.body,
        type: 'renderer',
        renderer: stache('<edit-attribute-dialog pubsubTopic="editGraphic" />'),
        options: {}
    }, {
        parent: 'view',
        position: 'top-right',
        type: 'renderer',
        renderer: stache(`<edit-feature-widget 
            layerInfos:from="layerInfos"
            view:from="view" />`
        ),
        options: {
            layerInfos: {
                workorders: {
                    // fields: ['test', 'field', {ui: 'datepicker', name: 'test_date', alias: 'Im a date'}] // supply custom fields
                    // exclude: true //exclude from editing
                }
            }
        }
    }]
};