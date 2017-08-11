import assign from 'can-util/js/assign/assign';
import esriPromise from 'esri-promise';

export default function createEsriWidget (view, widgetConfig, callback) {
    return new Promise((resolve) => {

        esriPromise([widgetConfig.path]).then(([WidgetClass]) => {

            // create the widget class
            const component = new WidgetClass(assign((widgetConfig.options || {}), {
                view: view
            }), widgetConfig.node || document.createElement('div'));

                // create a widget component structure
            const widget = assign({
                component: component
            }, widgetConfig);

                // call the appropriate addWidget function
            callback(view, widget);

            resolve(widget);
        });
    });
}