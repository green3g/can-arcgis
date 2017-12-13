/*can-arcgis@1.0.0#config/viewer/viewer*/
define('can-arcgis@1.0.0#config/viewer/viewer', [
    'exports',
    'sweetalert2',
    'sweetalert2/dist/sweetalert2.min.css'
], function (exports, _sweetalert) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _sweetalert2 = _interopRequireDefault(_sweetalert);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.default = {
        debug: true,
        viewOptions: {
            center: [
                -93.28697204589844,
                44.294471740722656
            ],
            zoom: 12
        },
        mapOptions: {
            basemap: 'gray',
            layers: [{
                    type: 'feature',
                    options: {
                        url: 'https://services1.arcgis.com/6bXbLtkf4y11TosO/arcgis/rest/services/Restaurants/FeatureServer/0',
                        id: 'workorders',
                        outFields: ['*'],
                        popupTemplate: {
                            actions: [{
                                    title: 'Delete',
                                    id: 'complete',
                                    className: 'esri-icon-trash',
                                    onClick: function onClick(selected, event, componentVM) {
                                        (0, _sweetalert2.default)({
                                            type: 'warning',
                                            title: 'Delete',
                                            text: 'Are you sure you want to delete ID: ' + selected.attributes.OBJECTID + '?',
                                            showConfirmButton: true,
                                            showCancelButton: true
                                        }).then(function () {
                                            selected.layer.applyEdits({ deleteFeatures: [selected] }).then(function () {
                                                (0, _sweetalert2.default)('Item Deleted', 'The item was successfully deleted', 'success');
                                                componentVM.view.popup.close();
                                            });
                                        });
                                    }
                                }]
                        }
                    }
                }]
        }
    };
});