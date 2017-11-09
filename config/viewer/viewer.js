// import a custom alert js library for our delete action
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
    debug: true,
    viewOptions: {
        center: [-93.28697204589844, 44.294471740722656],
        zoom: 12
    },
    mapOptions: {
        basemap: 'gray',
        layers: [{
            path: 'esri/layers/FeatureLayer',
            options: {
                url: 'https://services1.arcgis.com/6bXbLtkf4y11TosO/arcgis/rest/services/Restaurants/FeatureServer/0',
                id: 'workorders',
                outFields: ['*'],
                popupTemplate: {
                    actions: [{
                        title: 'Delete',
                        id: 'complete',
                        className: 'esri-icon-trash',
                        onClick (selected, event, componentVM) {

                            // Sweet: es6 template goodness:
                            swal({
                                type: 'warning',
                                title: 'Delete',
                                text: `Are you sure you want to delete ID: ${selected.attributes.OBJECTID}?`,
                                showConfirmButton: true,
                                showCancelButton: true
                            }).then(() => {
                                selected.layer.applyEdits({
                                    deleteFeatures: [selected]
                                }).then(() => {
                                    swal('Item Deleted', 'The item was successfully deleted', 'success');
                                    componentVM.view.popup.close();
                                });
                            });
                            // selected.attributes.feature_status = 'Closed';
                            // selected.layer.applyEdits([selected]);
                        }
                    }]
                }
            }
        }]
    }
};