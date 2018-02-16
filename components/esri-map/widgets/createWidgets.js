import dev from 'can-util/js/dev/dev';
import createEsriWidget from './createEsriWidget';
import createRendererWidget from './createRendererWidget';
import {loadModules} from 'esri-loader';

const DEFAULT_POSITION = 'top-left',
    DEFAULT_ICON = 'esri-icon-expand';

function addWidget (view, widget) {
    switch (widget.parent) {
    case 'expand': 
        // expand type widget. places a widget inside a expand wrapper that is toggle able and mobile friendly
        // https://developers.arcgis.com/javascript/latest/sample-code/widgets-expand/index.html
        //!steal-remove-start
        if (widget.iconClass) {
            //eslint-disable-next-line
            console.warn('widget.iconClass is deprecated: use widget.parentOptions.expandIconClass instead')
        }
        //!steal-remove-end
        loadModules(['esri/widgets/Expand']).then(([Expand]) => {
            const expand = new Expand(Object.assign({

                // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
                expandIconClass: widget.iconClass || DEFAULT_ICON,
                view: view,
                content: widget.component
            }, widget.parentOptions || {}));
                    
            view.ui.add({
                component: expand,
                position: widget.position || DEFAULT_POSITION,
                index: widget.index
            });
        });
        break;

    case 'view':
        if (!widget.component) { 
            dev.warn('createWidget::Widget not created, no component exists');
            return;
        }
        view.ui.add(widget); 
        break;
    default:
        if (typeof widget.parent === 'string') {
            widget.parent = document.getElementById(widget.parent);
        }

        if (!widget.parent) { 
            dev.warn('createWidget::parent was not found'); 
            return;
        }

        widget.parent.appendChild(widget.component);
    }

    if (typeof widget.onCreate === 'function') {
        widget.onCreate(widget.component);
    }
}

/**
 * Creates widgets for you
 * @param {Object} options the options object
 * @param {esri/views/MapView} options.view The esri view
 * @param {Array<Object>} options.widgets The array of json widget objects
 * @returns {Array<Promise>} promise that resolves to the widgets
 */
export default function createWidgets (options) {
    if (!options.view) {
        return [];
    }
    const promises = [];

    
    options.widgets.forEach((widgetConfig) => {

        switch (widgetConfig.type) {

        // esri types need to be imported and created using esriPromise
        case 'esri':
            promises.push(createEsriWidget(options.view, widgetConfig).then((widget) => {
                addWidget(options.view, widget);
            }));
            break;
        
        // renderers are a function that renders a stache template
        case 'renderer':
            addWidget(options.view, createRendererWidget(options.view, widgetConfig));
            break;

        // component is a ui component to add directly to the ui 
        case 'component': 
            addWidget(options.view, widgetConfig);
            break;

        // default is an object is constructed with the view parameter
        // eslint-disable-next-line
        default:
            if (!widgetConfig.Constructor) {
                dev.warn('createWidget::widget needs Constructor option if no type is provided');
                return;
            }

            const opts = Object.assign({}, widgetConfig.options);
            const widget = new widgetConfig.Constructor(Object.assign(opts, {
                view: options.view
            }));
            addWidget(options.view, Object.assign(widgetConfig, {component: widget}));
        }

    });

    // return promises
    return promises;
}
