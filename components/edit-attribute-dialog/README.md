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
        renderer: stache('<edit-attribute-dialog pubsubTopic="editGraphic" />'),
        options: {}
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

Pubsub-js Usage (like from another widget):

Render the component passing the topic name:
```html
<edit-attribute-dialog pusubTopic="editGraphic" />
```

Pass a graphic to the edit widget via pubsub-js.
```javascript
import pubsub from 'pubsub-js';

// other app code

// pass a feature/graphic to the edit widget
pubsub.publish('editGraphic', selectedFeature);
```