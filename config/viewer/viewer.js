import getFragNode from '~/util/dom/getFragNode';
import 'spectre-canjs/property-table/property-table';
import stache from 'can-stache';

const popupTemplate = stache('<property-table id="stachePropTable" {object}="graphic.attributes" />');

const element = document.createElement('p');
element.innerHTML = 'Hello!';

export default {
    viewOptions: {
        center: [-93.28697204589844, 44.294471740722656],
        zoom: 12
    },
    mapOptions: {
        layers: [{
            path: 'esri/layers/FeatureLayer',
            options: {
                url: 'https://services1.arcgis.com/6bXbLtkf4y11TosO/arcgis/rest/services/Restaurants/FeatureServer/0',
                id: 'workorders',
                outFields: ['*'],
                popupTemplate: {
                    title: '{task_name} Task - {id}',
                    content (data) {
                        return getFragNode(popupTemplate(data));
                    },
                    actions: [{
                        title: 'Quick Complete',
                        id: 'complete',
                        className: 'esri-icon-check-mark',
                        onClick (selected) {
                            selected.attributes.feature_status = 'Closed';
                            selected.layer.applyEdits([selected]);
                        }
                    }]
                }
            }
        }]
    },
    widgets: [{
        type: 'expand', 
        path: 'dijit/layout/ContentPane', 
        position: 'top-right',
        iconClass: 'esri-icon-description',
        options: {
            style: 'background-color: #fff',
            content: 'Hello!'
        }
    }, {
        type: 'view',
        component: element
    }, {
        type: 'expand',
        path: 'esri/widgets/LayerList',
        position: 'top-right'
    }, {
        type: 'loading',
        path: 'widgets/LoginCookie'
    }]
};