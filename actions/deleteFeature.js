/**
 * deletes a graphic from a feature layer using the applyEdits method.
 * Display a sweetalert which prompts a user to confirm first
 */

// import a custom alert js library for our delete action
import swal from 'sweetalert2';

export default {

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

        const featureName = selected.attributes[selected.layer.displayField] || selected.attributes[selected.layer.objectIdField];
        // sweet alert confirm dialog
        swal({
            type: 'warning',
            title: 'Delete',

            // sweet es6 template goodness
            text: `Are you sure you want to delete this feature: ${featureName}?`,
            showConfirmButton: true,
            showCancelButton: true
        }).then(({dismiss}) => {
            if (dismiss) {
                return;
            }
            // if the user confirms, delete the selected feature
            selected.layer.applyEdits({
                deleteFeatures: [selected]
            }).then(() => {
                swal({
                    title: 'Item Deleted', 
                    text: 'The item was successfully deleted', 
                    type: 'success',
                    toast: true,
                    timer: 5000
                });
                componentVM.view.popup.close();
            });
        });
    }
};