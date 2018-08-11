/**
 * opens the edit-widget popup using the event dispatcher
 * To use this, you need to add the edit-widget using
 * {
        parent: document.body,
        type: 'renderer',
        renderer: stache('<edit-attribute-dialog dispatcher:from="dispatcher" />'),
        options: {dispatcher}
    }
 */
import '../components/edit-attribute-dialog/edit-attribute-dialog';
import canViewModel from 'can-view-model';

export default {
  className: 'esri-icon-edit',
  title: 'Edit',
  id: 'edit',
  onClick (selected, event, vm) {
    canViewModel('edit-attribute-dialog').openDialog({
      editGraphic: selected
      // we could add other props here too,
      // like editMode
    });
    vm.view.popup.close();
  }
};
