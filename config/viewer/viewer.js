/**
 * this config provides a simple setup with one layer, and
 * a custom delete action on the layer
 */

// import a custom alert js library for our delete action
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

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

                // creating a custom popup template with actions that perform some editing capability
                popupTemplate: {
                    actions: [{

                        // action title text
                        title: 'Delete',

                        // unique action id
                        id: 'complete',

                        // icon class
                        className: 'esri-icon-trash',

                        // special function to call when the action is clicked
                        // receives 3 arguments, the selected feature, the action event, and the esri-map component view model
                        // The map component has references to the `view`, `map`, `element` (map element) 
                        // and other various viewmodel properties
                        onClick (selected, event, componentVM) {

                            // sweet alert confirm dialog
                            swal({
                                type: 'warning',
                                title: 'Delete',

                                // sweet es6 template goodness
                                text: `Are you sure you want to delete ID: ${selected.attributes.OBJECTID}?`,
                                showConfirmButton: true,
                                showCancelButton: true
                            }).then(() => {

                                // if the user confirms, delete the selected feature
                                selected.layer.applyEdits({
                                    deleteFeatures: [selected]
                                }).then(() => {
                                    swal('Item Deleted', 'The item was successfully deleted', 'success');
                                    componentVM.view.popup.close();
                                });
                            });
                        }
                    }]
                }
            }
        }]
    }
};