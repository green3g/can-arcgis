import stache from 'can-stache';
import DefineMap from 'can-define/map/map';
import dev from 'can-util/js/dev/dev';

export default function createRendererWidget (view, widgetConfig) {

    const scope = new DefineMap(Object.assign({
        view: view
    }, widgetConfig.options));

    if (!widgetConfig.renderer && !widgetConfig.template) { 
        dev.warn('renderer widget needs either a renderer function or a template property'); 
        return null;
    }

    const renderer = widgetConfig.renderer || stache(widgetConfig.template);
    
    
    const node = document.createElement('div');
    node.appendChild(renderer(scope));

    const widget = Object.assign({
        component: node
    }, widgetConfig);

    return widget;
}