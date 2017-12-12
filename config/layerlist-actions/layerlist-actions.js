/**
 * This config shows how to use the "onCreate" method provided by 
 * the widget extension to initialize layerlist actions.
 * When a widget is created, and an onCreate method is provided, 
 * it will be passed the widget. 
 */

import getInfo from './actions/getInfo';

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
                outFields: ['*']
            }
        }, {
            type: 'dynamic',
            options: {
                url: 'https://server.arcgisonline.com/arcgis/rest/services/Demographics/USA_Median_Household_Income/MapServer',
                title: 'US Median Household Income'
            }
        }]
    },
    widgets: [{
        type: 'esri',
        parent: 'view',
        position: 'top-right',
        path: 'esri/widgets/LayerList',
        onCreate (layerList) {
            layerList.on('trigger-action', (event) => {
                const id = event.action.id;

                switch (id) {
                case 'info':
                    getInfo(event);
                    break;
                case 'increase-opacity':
                case 'decrease-opacity':
                    {
                        const modifier = id === 'increase-opacity' ? 0.2 : -0.2;
                        event.item.layer.opacity += modifier;
                    }
                    break;
                default:
                    return;
                }
            });
        },
        options: {
            listItemCreatedFunction (event) {
                event.item.actionsSections = [
                    [{
                        title: 'Layer Information',
                        className: 'esri-icon-description',
                        id: 'info'
                    }],
                    [{
                        title: 'Increase opacity',
                        className: 'esri-icon-up',
                        id: 'increase-opacity'
                    }, {
                        title: 'Decrease opacity',
                        className: 'esri-icon-down',
                        id: 'decrease-opacity'
                    }]
                ];
            }
        }
    }]
};