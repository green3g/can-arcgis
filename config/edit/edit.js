/**
 * a full featured attribute editing experience
 * configuration not yet available, but planned
 * geometry updates not yet functional but are planned
 */

import '../../components/edit-widget/edit-widget';
import stache from 'can-stache';
import pubsub from 'pubsub-js';
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
            
            // you can use "type" for a short hand version of the layer path
            // see [types](../components/_common/createLayers.js) for all the types
            // or you can provide the full path, like this:
            // path: 'esri/layers/FeatureLayer',
            type: 'feature',
            options: {
                url: 'https://services1.arcgis.com/6bXbLtkf4y11TosO/arcgis/rest/services/Restaurants/FeatureServer/0',
                id: 'workorders',
                outFields: ['*'],
                popupTemplate: {

                    // add a custom publish call, which calls the edit-widget topic that 
                    // its subscribed to!
                    actions: [{
                        className: 'esri-icon-edit',
                        title: 'Edit',
                        id: 'edit',
                        onClick (selected) {
                            pubsub.publish('editGraphic', selected);
                        }
                    }]
                }
            }
        }]
    },
    widgets: [{
        parent: document.body,
        type: 'renderer',
        renderer: stache('<edit-widget view:from="view" />'),
        options: {}
    }]
};