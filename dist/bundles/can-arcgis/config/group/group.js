/*can-arcgis@1.0.0#config/group/group*/
define('can-arcgis@1.0.0#config/group/group', [
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
        debug: true,
        mapOptions: {
            basemap: 'gray',
            layers: [{
                    type: 'group',
                    options: {
                        title: 'US Demographics',
                        visible: true,
                        visibilityMode: 'exclusive',
                        layers: [
                            {
                                path: 'esri/layers/MapImageLayer',
                                options: {
                                    url: 'https://server.arcgisonline.com/arcgis/rest/services/Demographics/USA_Median_Net_Worth/MapServer',
                                    title: 'US Median Net Worth',
                                    visible: false
                                }
                            },
                            {
                                path: 'esri/layers/MapImageLayer',
                                options: {
                                    url: 'https://server.arcgisonline.com/arcgis/rest/services/Demographics/USA_Median_Household_Income/MapServer',
                                    title: 'US Median Household Income'
                                }
                            }
                        ]
                    }
                }]
        },
        widgets: [
            {
                path: 'esri/widgets/LayerList',
                type: 'esri',
                parent: 'view',
                position: 'bottom-left'
            },
            { Constructor: _identify2.default }
        ]
    };
});