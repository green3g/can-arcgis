/*can-admin@0.2.0#util/string/string*/
define('can-admin@0.2.0#util/string/string', [
    'exports',
    'can-util/js/string/string'
], function (exports, _string) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.makeSentenceCase = makeSentenceCase;
    var _string2 = _interopRequireDefault(_string);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    function makeSentenceCase(text) {
        text = String(text);
        return _string2.default.capitalize(String.prototype.trim.call(text.split('_').join(' ').toLowerCase().replace(/ +/g, ' ')));
    }
});
/*can-arcgis@1.0.0#components/identify/util/identifyMapImage*/
define('can-arcgis@1.0.0#components/identify/util/identifyMapImage', [
    'exports',
    'esri-promise',
    'can-util/js/get/get'
], function (exports, _esriPromise, _get) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = identify;
    var _esriPromise2 = _interopRequireDefault(_esriPromise);
    var _get2 = _interopRequireDefault(_get);
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
    function identify(event, view, layer, layerInfos) {
        return new Promise(function (resolve) {
            (0, _esriPromise2.default)([
                'esri/tasks/support/IdentifyParameters',
                'esri/tasks/IdentifyTask'
            ]).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2), IdentifyParameters = _ref2[0], IdentifyTask = _ref2[1];
                var include = (0, _get2.default)(layerInfos, layer.id + '.include');
                var exclude = (0, _get2.default)(layerInfos, layer.id + '.exclude');
                var layerIds = layer.sublayers.filter(function (l) {
                    if (include && include.length && include.indexOf(l.id) === -1) {
                        return false;
                    }
                    if (exclude && exclude.length && exclude.indexOf(l.id) > -1) {
                        return false;
                    }
                    return l.visible;
                }).map(function (l) {
                    return l.id;
                });
                var params = new IdentifyParameters({
                    layerIds: layerIds,
                    layerOption: 'visible',
                    returnGeometry: true,
                    spatialReference: event.mapPoint.spatialReference,
                    tolerance: 15,
                    geometry: event.mapPoint,
                    height: view.height,
                    width: view.width,
                    mapExtent: view.extent
                });
                var task = new IdentifyTask({ url: layer.url });
                task.execute(params).then(function (result) {
                    resolve(result);
                });
            });
        });
    }
});
/*can-arcgis@1.0.0#components/identify/identify*/
define('can-arcgis@1.0.0#components/identify/identify', [
    'exports',
    'can-define/map/map',
    './util/identifyMapImage',
    'can-util/js/dev/dev',
    'can-util/js/get/get',
    'can-util/js/assign/assign',
    'esri-promise',
    'can-admin/util/string/string'
], function (exports, _map, _identifyMapImage, _dev, _get, _assign, _esriPromise, _string) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.IDENTIFY_METHODS = undefined;
    var _map2 = _interopRequireDefault(_map);
    var _identifyMapImage2 = _interopRequireDefault(_identifyMapImage);
    var _dev2 = _interopRequireDefault(_dev);
    var _get2 = _interopRequireDefault(_get);
    var _assign2 = _interopRequireDefault(_assign);
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
    var IDENTIFY_METHODS = exports.IDENTIFY_METHODS = { 'esri.layers.MapImageLayer': _identifyMapImage2.default };
    var geometryEngine = void 0;
    (0, _esriPromise2.default)(['esri/geometry/geometryEngine']).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1), engine = _ref2[0];
        geometryEngine = engine;
    });
    exports.default = _map2.default.extend({
        clickHandle: '*',
        layerInfos: _map2.default,
        view: {
            type: '*',
            set: function set(view) {
                if (this.clickHandle) {
                    this.clickHandle.remove();
                }
                if (view) {
                    this.clickHandle = view.on('click', this.identify.bind(this));
                }
                return view;
            }
        },
        identify: function identify(event) {
            var _this = this;
            this.view.popup.features = [];
            var promises = this.view.popup.promises.map(function (p) {
                return new Promise(function (resolve) {
                    p.then(resolve);
                });
            });
            this.view.map.allLayers.forEach(function (layer) {
                if (!layer.visible) {
                    return;
                }
                if (IDENTIFY_METHODS.hasOwnProperty(layer.declaredClass)) {
                    var _promise = IDENTIFY_METHODS[layer.declaredClass](event, _this.view, layer, _this.layerInfos);
                    var promise = new Promise(function (resolve) {
                        _promise.then(function (result) {
                            resolve({
                                result: result,
                                layerId: layer.id
                            });
                        });
                    });
                    promises.push(promise);
                } else {
                    _dev2.default.warn('no identify function registered for type ' + layer.declaredClass);
                }
            });
            setTimeout(function () {
                Promise.all(promises).then(function (data) {
                    var identifiedFeatures = data.reduce(function (a, b) {
                        return a.concat(_this.assignPopupTemplate(b));
                    }, []).sort(function (a, b) {
                        var geoms = [
                            a,
                            b
                        ].map(function (f) {
                            return f.geometry.extent ? f.geometry.extent.center : f.geometry;
                        });
                        var distances = geoms.map(function (geom, index) {
                            return geometryEngine.distance(event.mapPoint, geoms[index], 'feet');
                        });
                        var ret = distances[0] < distances[1] ? -1 : distances[0] > distances[1] ? 1 : 0;
                        return ret;
                    });
                    var features = _this.view.popup.features.concat(identifiedFeatures);
                    if (features.length) {
                        _this.view.popup.open({
                            selectedFeatureIndex: 0,
                            features: features,
                            updateLocationEnabled: true
                        });
                    }
                });
            }, 400);
        },
        assignPopupTemplate: function assignPopupTemplate(data) {
            var _this2 = this;
            var layerId = data.layerId, result = data.result;
            return result.results ? result.results.map(function (props) {
                var template = (0, _get2.default)(_this2, 'popupTemplates.' + layerId + '.' + props.layerId) || {};
                props.feature.popupTemplate = (0, _assign2.default)({
                    title: props.layerName,
                    content: [{
                            type: 'fields',
                            fieldInfos: Object.keys(props.feature.attributes).map(function (f) {
                                return {
                                    fieldName: f,
                                    label: (0, _string.makeSentenceCase)(f),
                                    visible: true
                                };
                            })
                        }]
                }, template.serialize ? template.serialize() : template);
                return props.feature;
            }) : [];
        }
    });
});