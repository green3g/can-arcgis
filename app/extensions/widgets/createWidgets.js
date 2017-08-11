import dev from 'can-util/js/dev/dev';
import createEsriWidget from './createEsriWidget';
import createRendererWidget from './createRendererWidget';
import esriPromise from 'esri-promise';

const DEFAULT_POSITION = 'top-left',
    DEFAULT_ICON = 'esri-icon-expand';

function addWidget (view, widget) {
    switch (widget.parent) {
    case 'expand': 
        // expand type widget. places a widget inside a expand wrapper that is toggle able and mobile friendly
        // https://developers.arcgis.com/javascript/latest/sample-code/widgets-expand/index.html
        esriPromise(['esri/widgets/Expand']).then(([Expand]) => {
            const expand = new Expand({

                // see https://developers.arcgis.com/javascript/latest/guide/esri-icon-font/
                expandIconClass: widget.iconClass || DEFAULT_ICON,
                view: view,
                content: widget.component
            });
                    
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
        
    case 'invisible':
        break;
    default:
        dev.warn('createWidget::parent was not found');
    }
}

export default function createWidgets (options) {
    const promises = [];

    
    options.widgets.forEach((widgetConfig) => {

        switch (widgetConfig.type) {
        case 'esri':
            promises.push(createEsriWidget(options.view, widgetConfig, addWidget));
            break;
        
        case 'renderer':
            createRendererWidget(options.view, widgetConfig, addWidget);
            break;
        default:
            addWidget(options.view, widgetConfig, widgetConfig.parent);
        }

    });

    // return promises
    return promises;
}
