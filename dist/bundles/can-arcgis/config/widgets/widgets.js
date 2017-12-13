/*can-arcgis@1.0.0#config/widgets/widgets*/
define('can-arcgis@1.0.0#config/widgets/widgets', [
    'exports',
    'can-stache',
    'can-route'
], function (exports, _canStache, _canRoute) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _canStache2 = _interopRequireDefault(_canStache);
    var _canRoute2 = _interopRequireDefault(_canRoute);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var widget = (0, _canStache2.default)('\n    <p style="background:#fff;padding:10px;">Current Zoom: {{round(view.zoom, 0)}}<br />\n    Coordinates: {{round(view.center.longitude,4)}}, {{round(view.center.latitude, 4)}}</p>\n');
    var element = document.createElement('div');
    element.style = 'background: #fff;display:block; padding:10px;';
    element.innerHTML = _canRoute2.default.link('Back to Viewer', { configName: 'viewer' });
    exports.default = {
        debug: true,
        viewOptions: {
            center: [
                -85.05019999999857,
                33.12552399999943
            ],
            zoom: 6
        },
        mapOptions: {
            basemap: 'gray',
            layers: [{
                    path: 'esri/layers/FeatureLayer',
                    options: {
                        url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/counties_politics_poverty/FeatureServer/0',
                        renderer: {
                            type: 'simple',
                            symbol: {
                                type: 'simple-fill',
                                outline: {
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
                                        }
                                    ]
                                }]
                        },
                        outFields: ['*'],
                        popupTemplate: {
                            title: '{COUNTY}, {STATE}',
                            content: '{POP_POVERTY} of {TOTPOP_CY} people live below the poverty line.',
                            fieldInfos: [
                                {
                                    fieldName: 'POP_POVERTY',
                                    format: {
                                        digitSeparator: true,
                                        places: 0
                                    }
                                },
                                {
                                    fieldName: 'TOTPOP_CY',
                                    format: {
                                        digitSeparator: true,
                                        places: 0
                                    }
                                }
                            ]
                        }
                    }
                }]
        },
        widgets: [
            {
                parent: 'view',
                position: 'top-right',
                type: 'component',
                component: element
            },
            {
                parent: 'view',
                type: 'renderer',
                renderer: widget,
                options: {
                    round: function round(value, places) {
                        var mult = Math.pow(10, places);
                        return Math.round(value * mult) / mult;
                    }
                },
                position: 'bottom-left'
            },
            {
                type: 'esri',
                parent: 'view',
                path: 'esri/widgets/Legend',
                position: 'bottom-right'
            },
            {
                type: 'esri',
                parent: 'expand',
                path: 'esri/widgets/LayerList',
                iconClass: 'esri-icon-layers',
                position: 'top-right'
            },
            {
                type: 'esri',
                parent: 'view',
                path: 'esri/widgets/Home',
                position: 'top-left'
            },
            {
                type: 'esri',
                parent: 'expand',
                iconClass: 'esri-icon-basemap',
                path: 'esri/widgets/BasemapGallery'
            }
        ]
    };
});