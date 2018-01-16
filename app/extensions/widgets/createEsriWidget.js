import {loadModules} from 'esri-loader';
import assign from 'can-util/js/assign/assign';
function constructWidget (WidgetClass, widgetConfig, options, callback, resolve) {
    
    const node = widgetConfig.node || document.createElement('div');
    
    const component = new WidgetClass(options, node);

    // create a widget component structure
    const widget = Object.assign({}, {
        component: component
    }, widgetConfig);

    // call the appropriate addWidget function
    callback(options.view, widget);
            
    resolve(widget);
}

export default function createEsriWidget (view, widgetConfig, callback) {
    return new Promise((resolve) => {

        loadModules([widgetConfig.path]).then(([WidgetClass]) => {

            // if optionsPromise, wait for options, then construct widget
            if (widgetConfig.optionsPromise) {
                widgetConfig.optionsPromise.then((options) => {
                    options = assign(options, {
                        view: view
                    });
                    constructWidget(WidgetClass, widgetConfig, options, callback, resolve);
                });
                return;
            } 

            // othherwisise construct the widget class
            const options = assign((widgetConfig.options || {}), {
                view: view
            });
            constructWidget(WidgetClass, widgetConfig, options, callback, resolve);

        });
    });
}