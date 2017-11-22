import dev from 'can-util/js/dev/dev';
import createEsriWidget from './createEsriWidget';
import createRendererWidget from './createRendererWidget';
import esriPromise from 'esri-promise';
import assign from 'can-util/js/assign/assign';

const DEFAULT_POSITION = 'top-left',
    DEFAULT_ICON = 'esri-icon-expand';

function addWidget (view, widget) {
    switch (widget.parent) {
    case 'expand': 
        // expand type widget. places a widget inside a expand wrapper that is toggle able and mobile friendly
        // https://developers.arcgis.com/javascript/latest/sample-code/widgets-expand/index.html
        esriPromise(['esri/widgets/Expand']).then(([Expand]) => {
            const expand = new Expand(assign({

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
}

export default function createWidgets (options) {
    const promises = [];

    
    options.widgets.forEach((widgetConfig) => {

        switch (widgetConfig.type) {

        // esri types need to be imported and created using esriPromise
        case 'esri':
            promises.push(createEsriWidget(options.view, widgetConfig, addWidget));
            break;
        
        // renderers are a function that renders a stache template
        case 'renderer':
            createRendererWidget(options.view, widgetConfig, addWidget);
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
            const opts = widgetConfig.options.serialize ? widgetConfig.options.serialize() : assign({}, widgetConfig.options);
            const widget = new widgetConfig.Constructor(assign(opts, {
                view: options.view
            }));
            addWidget(options.view, assign(widgetConfig, {component: widget}));
        }

    });

    // return promises
    return promises;
}
