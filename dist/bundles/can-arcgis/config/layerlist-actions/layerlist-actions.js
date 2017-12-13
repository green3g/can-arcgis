/*can-arcgis@1.0.0#config/layerlist-actions/actions/getInfo*/
define('can-arcgis@1.0.0#config/layerlist-actions/actions/getInfo', [
    'exports',
    'sweetalert2',
    'esri-promise',
    'sweetalert2/dist/sweetalert2.min.css'
], function (exports, _sweetalert, _esriPromise) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = function (event) {
        _sweetalert2.default.showLoading();
        (0, _esriPromise2.default)(['esri/request']).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 1), Request = _ref2[0];
            new Request(event.item.layer.url, {
                query: { f: 'json' },
                responseType: 'json'
            }).then(function (response) {
                (0, _sweetalert2.default)({
                    title: event.item.layer.title,
                    text: response.data.description
                });
            });
        });
    };
    var _sweetalert2 = _interopRequireDefault(_sweetalert);
    var _esriPromise2 = _interopRequireDefault(_esriPromise);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;
            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);
                    if (i && _arr.length === i)
                        break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i['return'])
                        _i['return']();
                } finally {
                    if (_d)
                        throw _e;
                }
            }
            return _arr;
        }
        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError('Invalid attempt to destructure non-iterable instance');
            }
        };
    }();
});
/*can-arcgis@1.0.0#config/layerlist-actions/layerlist-actions*/
define('can-arcgis@1.0.0#config/layerlist-actions/layerlist-actions', [
    'exports',
    './actions/getInfo'
], function (exports, _getInfo) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _getInfo2 = _interopRequireDefault(_getInfo);
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
            layers: [
                {
                    type: 'feature',
                    options: {
                        url: 'https://services1.arcgis.com/6bXbLtkf4y11TosO/arcgis/rest/services/Restaurants/FeatureServer/0',
                        id: 'workorders',
                        outFields: ['*']
                    }
                },
                {
                    type: 'dynamic',
                    options: {
                        url: 'https://server.arcgisonline.com/arcgis/rest/services/Demographics/USA_Median_Household_Income/MapServer',
                        title: 'US Median Household Income'
                    }
                }
            ]
        },
        widgets: [{
                type: 'esri',
                parent: 'view',
                position: 'top-right',
                path: 'esri/widgets/LayerList',
                onCreate: function onCreate(layerList) {
                    layerList.on('trigger-action', function (event) {
                        var id = event.action.id;
                        switch (id) {
                        case 'info':
                            (0, _getInfo2.default)(event);
                            break;
                        case 'increase-opacity':
                        case 'decrease-opacity': {
                                var modifier = id === 'increase-opacity' ? 0.2 : -0.2;
                                event.item.layer.opacity += modifier;
                            }
                            break;
                        default:
                            return;
                        }
                    });
                },
                options: {
                    listItemCreatedFunction: function listItemCreatedFunction(event) {
                        event.item.actionsSections = [
                            [{
                                    title: 'Layer Information',
                                    className: 'esri-icon-description',
                                    id: 'info'
                                }],
                            [
                                {
                                    title: 'Increase opacity',
                                    className: 'esri-icon-up',
                                    id: 'increase-opacity'
                                },
                                {
                                    title: 'Decrease opacity',
                                    className: 'esri-icon-down',
                                    id: 'decrease-opacity'
                                }
                            ]
                        ];
                    }
                }
            }]
    };
});