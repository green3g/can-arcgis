import {loadModules} from 'esri-loader';
import assign from 'can-util/js/assign/assign';
function constructWidget (WidgetClass, widgetConfig, options, callback) {
    
    const node = widgetConfig.node || document.createElement('div');
    
    const component = new WidgetClass(options, node);

    // create a widget component structure
    const widget = Object.assign({}, {
        component: component
    }, widgetConfig);

    // call the appropriate addWidget function
    callback(options.view, widget);
            
    return component;
}

export default function createEsriWidget (view, widgetConfig, callback) {

    return loadModules([widgetConfig.path]).then(([WidgetClass]) => {

        // if optionsPromise, wait for options, then construct widget
        if (widgetConfig.optionsPromise) {
            widgetConfig.optionsPromise.then((options) => {
                options = assign(options, {
                    view: view
                });
                return constructWidget(WidgetClass, widgetConfig, options, callback);
            });
        } 

        // othherwisise construct the widget class
        const options = assign((widgetConfig.options || {}), {
            view: view
        });
        return constructWidget(WidgetClass, widgetConfig, options, callback);

    });
}