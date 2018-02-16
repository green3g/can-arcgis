# Edit dialog

A configureable dialog used to edit attributes of a feature or graphic.

 - Edit features using different types of input widgets
 - Validate field inputs using existing domains and custom validation functions
 - Exclude fields or include "virtual" additional fields

Basic usage: 

Use the can-arcgis application:
```javascript
{
        parent: document.body,
        type: 'renderer',
        renderer: stache('<edit-attribute-dialog dispatcher:from="dispatcher"  />'),
        options: {dispatcher}
    },
```

Or render a stache template with the `edit-attribute-dialog` component. 

editDialog.stache template:
```html
<edit-attribute-dialog editFeature:from="graphic" editFields:from="fields">
```

```javascript
import render from './editDialog.stache'
import convertEsriFields from 'can-argis/util/convertEsriFields';
document.body.appendChild(render({
    graphic: view.popup.selectedFeature
}));
```

Event Usage (like from another widget):

Render the component passing the topic name:
```html
<edit-attribute-dialog dispatcher:from="dispatcher" eventName:from="'editGraphic'" />
```

Pass a graphic to the edit widget via event.
```javascript

const dispatcher = new DefineMap();

// other app code

// pass a feature/graphic to the edit widget
dispatcher.dispatch('editGraphic', {
    editGraphic: selectedFeature
});
```