/**
 * opens the edit-widget popup using the pubsub topic 'editGrpahic'.
 * To use this, you need to add the edit-widget using 
 * {
        parent: document.body,
        type: 'renderer',
        renderer: stache('<edit-attribute-dialog pubsubTopic="editGraphic" />'),
        options: {}
    }
 */
import '../components/edit-attribute-dialog/edit-attribute-dialog';
import pubsub from 'pubsub-js';

export default {
    className: 'esri-icon-edit',
    title: 'Edit',
    id: 'edit',
    onClick (selected, event, vm) {
        pubsub.publish('editGraphic', {editGraphic: selected});
        vm.view.popup.close();
    }
};