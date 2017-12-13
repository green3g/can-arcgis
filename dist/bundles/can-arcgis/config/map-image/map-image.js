/*can-arcgis@1.0.0#config/map-image/map-image*/
define('can-arcgis@1.0.0#config/map-image/map-image', [
    'exports',
    'can-arcgis/components/identify/identify'
], function (exports, _identify) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _identify2 = _interopRequireDefault(_identify);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.default = {
        mapOptions: {
            basemap: 'gray-vector',
            layers: [{
                    type: 'dynamic',
                    options: {
                        url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/PoolPermits/MapServer',
                        sublayers: [
                            {
                                id: 1,
                                visible: true
                            },
                            {
                                id: 0,
                                visible: true
                            }
                        ]
                    }
                }]
        },
        viewOptions: {
            center: [
                -117.4621,
                33.8954
            ],
            zoom: 14
        },
        widgets: [
            {
                type: 'esri',
                position: 'bottom-left',
                path: 'esri/widgets/LayerList',
                parent: 'view'
            },
            { Constructor: _identify2.default }
        ]
    };
});