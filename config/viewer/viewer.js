import stache from 'can-stache';

// import a custom alert js library
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import route from 'can-route';


// render a can-component in the popup template
const popupTemplate = stache('<property-table id="stachePropTable" {object}="graphic.attributes" />');

// create a simple widget renderer to append to the view
const widget = stache(`
    <p style="background:#fff;padding:10px;">Current Zoom: {{round(view.zoom, 0)}}<br />
    Coordinates: {{round(view.center.longitude,4)}}, {{round(view.center.latitude, 4)}}</p>
`);

export default {
    debug: true,
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
                        const node = document.createElement('div');
                        node.appendChild(popupTemplate(data));
                        return node;
                    },
                    actions: [{
                        title: 'Delete',
                        id: 'complete',
                        className: 'esri-icon-trash',
                        onClick (selected, event, componentVM) {

                            // Sweet: es6 template goodness:
                            swal({
                                type: 'warning',
                                title: 'Delete',
                                text: `Are you sure you want to delete ID: ${selected.attributes.OBJECTID}?`,
                                showConfirmButton: true,
                                showCancelButton: true
                            }).then(() => {
                                selected.layer.applyEdits({
                                    deleteFeatures: [selected]
                                }).then(() => {
                                    swal('Item Deleted', 'The item was successfully deleted', 'success');
                                    componentVM.view.popup.close();
                                });
                            });
                            // selected.attributes.feature_status = 'Closed';
                            // selected.layer.applyEdits([selected]);
                        }
                    }]
                }
            }
        }]
    },
    widgets: [{
        type: 'esri',
        parent: 'view', 
        path: 'dijit/layout/ContentPane', 
        position: 'top-right',
        iconClass: 'esri-icon-description',
        options: {
            style: 'background-color: #ff8040;padding:15px;',
            content: route.link('Switch Apps', {
                configName: 'poverty'
            })
        }
    }, {
        parent: 'view',
        type: 'renderer',
        renderer: widget,
        options: {

            // pass a rounding function for our widget to use
            round (value, places) {
                const mult = Math.pow(10, places);
                return Math.round(value * mult) / mult;
            }
        },
        position: 'bottom-left'
    }, {
        type: 'esri',
        parent: 'expand',
        path: 'esri/widgets/LayerList',
        position: 'top-right'
    }]
};