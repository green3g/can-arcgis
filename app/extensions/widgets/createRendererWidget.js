import getFragNode from '../../../util/dom/getFragNode';
import assign from 'can-util/js/assign/assign';
import stache from 'can-stache';
import DefineMap from 'can-define/map/map';

export default function createRendererWidget (view, widgetConfig, callback) {

    const scope = new DefineMap(assign({
        view: view
    }, widgetConfig.options));

    if (!widgetConfig.renderer || widgetConfig.template) { 
        dev.warn('renderer widget needs either a renderer function or a template property'); 
        return;
    }

    const renderer = widgetConfig.renderer || stache(widgetConfig.template);
    
    
    const node = document.createElement('div');
    node.appendChild(renderer(scope));

    const widget = assign({
        component: node
    }, widgetConfig);

    callback(view, widget);
}