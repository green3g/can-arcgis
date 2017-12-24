# Edit feature widget

Create new geometries and attributes

## Usage as widget:
```javascript
{
        parent: 'view',
        position: 'top-right',
        type: 'renderer',
        renderer: stache(`<edit-feature-widget 
            layerInfos:from="layerInfos"
            view:from="view" />`
        ),
        options: {
            layerInfos: {
                workorders: { // feature layer id
                    // fields: ['test', 'field', {ui: 'datepicker', name: 'test_date', alias: 'Im a date'}] // supply custom fields
                    // exclude: true //exclude from editing
                }
            }
        }
    }
```

