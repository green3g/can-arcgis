
export const WidgetMap = DefineMap.extend('Widget', {seal: false}, {
    
    options: '*'
});
    
export const ConfigMap = DefineMap.extend('Config', {seal: false}, {
    mapOptions: {
        type: '*',
        serialize: false
    },
    viewOptions: {
        type: '*',
        serialize: false
    },
    widgets: DefineList.extend({
        '#': WidgetMap
    })
});