import {loadModules} from 'esri-loader';
function constructWidget (WidgetClass, widgetConfig, options) {
    
    const node = widgetConfig.node || document.createElement('div');
    
    const component = new WidgetClass(options, node);

    // create a widget component structure
    const widget = Object.assign({}, {
        component: component
    }, widgetConfig);
     
    return widget;
}

export default function createEsriWidget (view, widgetConfig) {

    return loadModules([widgetConfig.path]).then(([WidgetClass]) => {

        let resolver;

        // if optionsPromise, wait for options, then construct widget - DEPRECATED
        if (widgetConfig.optionsPromise) {
            //!steal-remove-start
            //eslint-disable-next-line
            console.warn('createEsriWidget:optionsPromise is deprecated, use getOptions function and return a promise instead');
            //!steal-remove-end
            resolver = widgetConfig.optionsPromise;
        } else if (typeof widgetConfig.getOptions === 'function') {
            resolver = widgetConfig.getOptions();
        } else {
            resolver = widgetConfig.options;
        }

        return Promise.resolve(resolver).then((options) => {
            // othherwise construct the widget class
            options = Object.assign({}, (options || {}), {
                view: view
            });
            return constructWidget(WidgetClass, widgetConfig, options);
        });

    });
}