import getFragNode from '~/util/dom/getFragNode';
import stache from 'can-stache';

const popupTemplate = stache('<property-table id="stachePropTable" {object}="graphic.attributes" />');


// creating a custom dom node to add to the widget ui
const element = document.createElement('p');
element.innerHTML = 'Hello!';
element.style = `background-color: #4CAF50; 
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;`;

element.onclick = function () {
    //eslint-disable-next-line
    alert('you clicked me!');
};

export default {
    viewOptions: {
        center: [-93.28697204589844, 44.294471740722656],
        zoom: 12
    },
    mapOptions: {
        basemap: {
            baseLayers: [{
                title: 'Terrain',
                id: 'terrain',
                thumbnailUrl: 'https://stamen-tiles.a.ssl.fastly.net/terrain/10/177/409.png',
                path: 'esri/layers/WebTileLayer',
                options: {
                    urlTemplate: 'http://{subDomain}.tile.stamen.com/terrain/{level}/{col}/{row}.png',
                    subDomains: ['a', 'b', 'c', 'd'],
                    copyright: 'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ' +
                      'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ' +
                      'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ' +
                      'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
                }
            }]
        },
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
                        className: 'esri-icon-check-mark'
                        // onClick (event, selected) {
                        //     selected.attributes.feature_status = 'Closed';
                        //     selected.layer.applyEdits([selected]);
                        // }
                    }]
                }
            }
        }]
    },
    widgets: [{
        type: 'esri',
        parent: 'expand', 
        path: 'dijit/layout/ContentPane', 
        position: 'top-right',
        iconClass: 'esri-icon-description',
        options: {
            style: 'background-color: #ff8040',
            content: 'Hello!'
        }
    }, {
        parent: 'view',
        component: element,
        position: 'bottom-left'
    }, {
        type: 'esri',
        parent: 'expand',
        path: 'esri/widgets/LayerList',
        position: 'top-right'
    }]
};