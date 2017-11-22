/**
 * this config demonstrates how to integrate various widgets into the viewer 
 * in this case, we're using stache templates for some widgets, as well 
 * as various esri widgets. 
 */

// import stache for templates
// stache templates let us create live binding 
// templates to bind data to dom nodes in our widgets
import stache from 'can-stache';

// since we use can-route to switch between configs, import it so we can use it below
import route from 'can-route';

// create a simple canjs widget renderer to append to the view
// this widget keeps track of the location and zoom level of the map
// widget renderers always have the view variable in the scope, so you can pass
// it to a component and access/manipulate its properties
const widget = stache(`
    <p style="background:#fff;padding:10px;">Current Zoom: {{round(view.zoom, 0)}}<br />
    Coordinates: {{round(view.center.longitude,4)}}, {{round(view.center.latitude, 4)}}</p>
`);

// create a simple plain dom element, that will link us to a different config
// in this case, we're using vanilla js, as well as a can-route helper
// that creates a link to the `#!viewer` page
const element = document.createElement('div');
element.style = 'background: #fff;display:block; padding:10px;';
element.innerHTML = route.link('Back to Viewer', {configName: 'viewer'});

export default {
    debug: true,
    viewOptions: {
        center: [-85.05019999999857, 33.12552399999943],
        zoom: 6
    },
    mapOptions: {
        basemap: 'gray',
        layers: [{
            path: 'esri/layers/FeatureLayer',
            options: {
                url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0',
                renderer: {
                    type: 'simple', // autocasts as new SimpleRenderer()
                    symbol: {
                        type: 'simple-fill', // autocasts as new SimpleFillSymbol()
                        outline: { // autocasts as new SimpleLineSymbol()
                            color: 'lightgray',
                            width: 0.5
                        }
                    },
                    label: '% population in poverty by county',
                    visualVariables: [{
                        type: 'color',
                        field: 'POP_POVERTY',
                        normalizationField: 'TOTPOP_CY',
                        stops: [
                            {
                                value: 0.1,
                                color: '#FFFCD4',
                                label: '<10%'
                            },
                            {
                                value: 0.3,
                                color: '#350242',
                                label: '>30%'
                            }]
                    }]
                },
                outFields: ['*'],
                popupTemplate: { // autocasts as new PopupTemplate()
                    title: '{COUNTY}, {STATE}',
                    content: '{POP_POVERTY} of {TOTPOP_CY} people live below the poverty line.',
                    fieldInfos: [
                        {
                            fieldName: 'POP_POVERTY',
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }, {
                            fieldName: 'TOTPOP_CY',
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        }]
                } 
            }
        }]
    },
    widgets: [{

        // where to place this widget
        parent: 'view', 

        // ui position
        position: 'top-right',

        // type of widget/component
        type: 'component',

        // the element to give to the ui
        component: element
    }, {
        parent: 'view',
        type: 'renderer',
        renderer: widget,
        options: {

            // options will be passed to the renderer scope, so 
            // the template can access various properties like
            // `round` - a rounding function for our widget to use
            // in displaying the lat/lon
            round (value, places) {
                const mult = Math.pow(10, places);
                return Math.round(value * mult) / mult;
            }
        },
        position: 'bottom-left'
    }, {

        // type esri means dojoRequire will be used to import the widget
        type: 'esri',
        parent: 'view',

        // path must be specified for esri widgets
        path: 'esri/widgets/Legend',
        position: 'bottom-right'
    }, {
        type: 'esri',

        // parent: expand means the widget will be placed inside an esri/widgets/Expand widget
        parent: 'expand',
        path: 'esri/widgets/LayerList',
        iconClass: 'esri-icon-layers',
        position: 'top-right'
    }, {
        type: 'esri',
        parent: 'view',
        path: 'esri/widgets/Home',
        position: 'top-left'
    }, {
        type: 'esri',
        parent: 'expand',
        iconClass: 'esri-icon-basemap',
        path: 'esri/widgets/BasemapGallery'
    }]
};