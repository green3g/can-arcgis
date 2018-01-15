/**
 * select layers and perform actions on selected features
 */
import '../../components/select-widget/select-widget';
import 'spectre-canjs/sp-form/fields/sp-text-field/sp-text-field';
import stache from 'can-stache';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const layerUrl = 'https://services1.arcgis.com/6bXbLtkf4y11TosO/arcgis/rest/services/Restaurants/FeatureServer/0';
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
            // see [types](can-arcgis/util/createLayers.js) for all the types
            // or you can provide the full path, like this:
            // path: 'esri/layers/FeatureLayer',
            type: 'feature',
            options: {
                url: layerUrl,
                id: 'resteraunts',
                outFields: ['*']
            }
        }]
    },
    widgets: [{
        parent: 'expand',
        iconClass: 'esri-icon-search',
        type: 'renderer',
        renderer: stache(`<select-widget 
            layers:from="layers"
            view:from="view"
            actions:from="actions" />`),
        options: {
            layers: {
                'Resteraunts': {
            
                    // url to a feature layer
                    url: layerUrl,
            
                    // an array of query objects
                    queries: [{
                        value: 'name',
                        label: 'Establishment Name',
                        fields: ['name'],
                        queryTemplate: 'EstablishmentName LIKE \'%{name}%\''
                    }, {
                        value: 'riskType',
                        label: 'Risk Type',
                        queryTemplate: 'RiskType = {risk}',
                        fields: [{
                            name: 'risk',
                            alias: 'Risk Type',
                            fieldType: 'select',
                            options: [{
                                value: 1,
                                label: 'Inspected one time per year'
                            }, {
                                value: 2,
                                label: 'Inspected two times per year'
                            }, {
                                value: 3,
                                label: 'Inspected three times per year'
                            }]
                        }]
                    }]
                }
            },
            actions: [{
                label: 'Log Selected Features',
                iconClass: 'esri-icon-announcement',
                onClick (graphics) {
                    swal({
                        title: 'Features',
                        html: graphics.map((graphic) => {
                            return `<li>${graphic.attributes.EstablishmentName}</li>`;
                        }).join('')
                    });
                }
            }]
        }
    }]
};