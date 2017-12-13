/*can-arcgis@1.0.0#components/select-widget/template.stache!steal-stache@3.1.3#steal-stache*/
define('can-arcgis@1.0.0#components/select-widget/template.stache!steal-stache@3.1.3#steal-stache', [
    'module',
    'can-stache',
    'can-stache/src/mustache_core',
    'can-view-import@3.2.5#can-view-import',
    'can-stache-bindings@3.11.2#can-stache-bindings'
], function (module, stache, mustacheCore) {
    var renderer = stache('components/select-widget/template.stache', [
        {
            'tokenType': 'start',
            'args': [
                'div',
                false,
                1
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                1
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'workorder-picker container',
                1
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                1
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'style',
                1
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'background:#fff;width:300px;padding:10px;',
                1
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'style',
                1
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false,
                2
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n    ',
                2
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'p',
                false,
                3
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                3
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'text-bold',
                3
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                3
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'p',
                false,
                3
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                'title',
                3
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'p',
                3
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n\r\n    ',
                3
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '#if(selectedFeatures.length)',
                5
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n        ',
                5
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'p',
                false,
                6
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'p',
                false,
                6
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                'You\'ve selected ',
                6
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                'selectedFeatures.length',
                6
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                ' features.\r\n            ',
                6
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'button',
                false,
                7
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                7
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'btn',
                7
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                7
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'type',
                7
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'button',
                7
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'type',
                7
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'on:el:click',
                7
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'clearSelected()',
                7
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'on:el:click',
                7
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'button',
                false,
                7
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                'Cancel',
                7
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'button',
                7
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n        ',
                7
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'p',
                8
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n        ',
                8
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'ul',
                false,
                9
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                9
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'menu',
                9
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                9
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'ul',
                false,
                9
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n            ',
                9
            ]
        },
        {
            'tokenType': 'comment',
            'args': [
                ' menu header text ',
                10
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n            ',
                10
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'li',
                true,
                11
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                11
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'divider',
                11
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                11
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'data-content',
                11
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'Actions',
                11
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'data-content',
                11
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'li',
                true,
                11
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n            ',
                11
            ]
        },
        {
            'tokenType': 'comment',
            'args': [
                ' menu item ',
                12
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n            ',
                12
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '#each(actions)',
                13
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                ',
                13
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'li',
                false,
                14
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                14
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'menu-item',
                14
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                14
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'li',
                false,
                14
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                    ',
                14
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'a',
                false,
                15
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'href',
                15
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                '#',
                15
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'href',
                15
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'on:el:click',
                15
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'onActionClick(.)',
                15
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'on:el:click',
                15
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'a',
                false,
                15
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                        ',
                15
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'i',
                false,
                16
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                16
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                'iconClass',
                16
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                16
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'i',
                false,
                16
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'i',
                16
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                ' ',
                16
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                'label',
                16
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                    ',
                16
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'a',
                17
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                ',
                17
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'li',
                18
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n            ',
                18
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '/each',
                19
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n        ',
                19
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'ul',
                20
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n    ',
                20
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                'else',
                21
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n\r\n        ',
                21
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'select-field',
                true,
                23
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'vm:properties:from',
                23
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'layerProperties',
                23
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'vm:properties:from',
                23
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'vm:value:bind',
                23
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'layer',
                23
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'vm:value:bind',
                23
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'select-field',
                true,
                23
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n\r\n        ',
                23
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '#if(layer)',
                25
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n\r\n            ',
                25
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'select-field',
                true,
                27
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'vm:properties:from',
                27
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'queryProperties',
                27
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'vm:properties:from',
                27
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'vm:value:bind',
                27
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'query',
                27
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'vm:value:bind',
                27
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'select-field',
                true,
                29
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                ' \r\n\r\n            ',
                29
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '#if(query)',
                31
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                ',
                31
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '#eq(query, \'spatial\')',
                32
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                    ',
                32
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'draw-widget',
                true,
                33
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'view:from',
                33
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'view',
                33
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'view:from',
                33
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'graphics:u:layer:bind',
                33
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'graphicsLayer',
                33
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'graphics:u:layer:bind',
                33
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'draw-widget',
                true,
                35
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                    \r\n                    ',
                35
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '#if(graphicsLayer.graphics.items.length)',
                37
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                        ',
                37
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'button',
                false,
                38
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                38
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'btn btn-primary',
                38
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                38
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'on:el:click',
                38
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'searchGraphics',
                38
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'on:el:click',
                38
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'button',
                false,
                38
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                            ',
                38
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'i',
                false,
                39
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                39
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'esri-icon-search',
                39
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                39
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'i',
                false,
                39
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'i',
                39
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                ' Search',
                39
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'button',
                39
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                ' \r\n                    ',
                39
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '/if',
                40
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                ',
                40
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                'else',
                41
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                    ',
                41
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'form-widget',
                true,
                42
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'vm:is:u:saving:bind',
                42
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'formIsSaving',
                42
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'vm:is:u:saving:bind',
                42
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'vm:fields:from',
                42
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'selectedQuery.fields',
                42
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'vm:fields:from',
                42
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'vm:form:u:object:from',
                42
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'queryFormObject',
                42
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'vm:form:u:object:from',
                42
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'on:vm:submit',
                42
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'searchFormSubmit(queryFormObject)',
                42
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'on:vm:submit',
                42
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'on:vm:cancel',
                42
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'reset',
                42
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'on:vm:cancel',
                42
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'form-widget',
                true,
                47
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                ',
                47
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '/eq',
                48
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n            ',
                48
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '/if',
                49
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n        ',
                49
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '/if',
                50
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n    ',
                50
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '/if',
                51
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n',
                51
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'div',
                52
            ]
        },
        {
            'tokenType': 'done',
            'args': [52]
        }
    ]);
    return function (scope, options, nodeList) {
        var moduleOptions = { module: module };
        if (!(options instanceof mustacheCore.Options)) {
            options = new mustacheCore.Options(options || {});
        }
        return renderer(scope, options.add(moduleOptions), nodeList);
    };
});
/*can-arcgis@1.0.0#components/_common/assignGraphics*/
define('can-arcgis@1.0.0#components/_common/assignGraphics', [
    'exports',
    'esri-promise'
], function (exports, _esriPromise) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = getGraphics;
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
    function getGraphics(features) {
        return new Promise(function (resolve) {
            (0, _esriPromise2.default)([
                'esri/symbols/SimpleMarkerSymbol',
                'esri/symbols/SimpleLineSymbol',
                'esri/symbols/SimpleFillSymbol'
            ]).then(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 3), SimpleMarkerSymbol = _ref2[0], SimpleLineSymbol = _ref2[1], SimpleFillSymbol = _ref2[2];
                features.forEach(function (f) {
                    var symbol = void 0;
                    switch (f.geometry.type) {
                    case 'polyline':
                        symbol = new SimpleLineSymbol({
                            color: '#de4343',
                            width: '5px',
                            style: 'solid'
                        });
                        break;
                    case 'polygon':
                        symbol = new SimpleFillSymbol({
                            color: '#de4343',
                            style: 'solid',
                            outline: {
                                color: '#000',
                                width: 1
                            }
                        });
                        break;
                    case 'point':
                    default:
                        symbol = new SimpleMarkerSymbol({
                            color: 'red',
                            outline: {
                                color: '#000',
                                width: '0.5px'
                            }
                        });
                    }
                    f.symbol = symbol;
                });
                resolve(features);
            });
        });
    }
});
/*can-arcgis@1.0.0#components/select-widget/ViewModel*/
define('can-arcgis@1.0.0#components/select-widget/ViewModel', [
    'exports',
    'can-define/map/map',
    'can-define/list/list',
    'can-util/js/string/string',
    'esri-promise',
    '../_common/assignGraphics',
    'can-reflect'
], function (exports, _map, _list, _string, _esriPromise, _assignGraphics, _canReflect) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _map2 = _interopRequireDefault(_map);
    var _list2 = _interopRequireDefault(_list);
    var _string2 = _interopRequireDefault(_string);
    var _esriPromise2 = _interopRequireDefault(_esriPromise);
    var _assignGraphics2 = _interopRequireDefault(_assignGraphics);
    var _canReflect2 = _interopRequireDefault(_canReflect);
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
    exports.default = _map2.default.extend('SelectWidget', { seal: false }, {
        view: {},
        continueDraw: 'boolean',
        title: { value: 'Select Features' },
        layerOptions: {
            get: function get() {
                var _this = this;
                var keys = _canReflect2.default.getOwnEnumerableKeys(this.layers);
                var options = keys.map(function (key) {
                    return {
                        label: _this.layers[key].label || key,
                        value: key
                    };
                });
                return options;
            }
        },
        layerAlias: { value: 'Layer to select' },
        layerProperties: {
            get: function get() {
                return {
                    options: this.layerOptions,
                    alias: this.layerAlias
                };
            }
        },
        layers: _map2.default,
        layer: {
            type: 'string',
            set: function set(name) {
                if (!name) {
                    return name;
                }
                localStorage.selectedLayer = name;
                if (!this.layers[name]) {
                    return name;
                }
                var layerProps = this.layers[name];
                var layer = this.view.map.findLayerById(layerProps.supportId);
                if (layer) {
                    layer.sublayers.forEach(function (l) {
                        l.visible = layerProps.supportIds.indexOf(l.id) > -1;
                    });
                }
                return name;
            }
        },
        selectedLayer: {
            get: function get() {
                return this.layers[this.layer] || 'custom';
            }
        },
        actions: _list2.default,
        query: {
            type: 'string',
            value: 'spatial'
        },
        queries: {
            get: function get() {
                var props = this.selectedLayer;
                var options = props.queries || [];
                return options.concat([{
                        value: 'spatial',
                        label: 'From the map'
                    }]);
            }
        },
        queryProperties: {
            get: function get() {
                return {
                    options: this.queries,
                    alias: 'Select features by'
                };
            }
        },
        selectedQuery: {
            get: function get() {
                var _this2 = this;
                var queries = this.queries.filter(function (query) {
                    return query.value === _this2.query;
                });
                return queries.length ? queries[0] : {};
            }
        },
        queryFormObject: { Value: _map2.default },
        formIsSaving: 'boolean',
        selectedFeatures: { Value: _list2.default },
        graphicsLayer: {},
        searchFormSubmit: function searchFormSubmit(obj) {
            var where = _string2.default.sub(this.selectedQuery.queryTemplate || '1=1', obj);
            this.selectFeatures({ where: where });
        },
        searchGraphics: function searchGraphics() {
            var _this3 = this;
            this.activeButton = null;
            if (this.graphicsLayer.graphics.items.length === 1) {
                this.selectFeatures({ geometry: this.graphicsLayer.graphics.getItemAt(0).geometry });
                this.clearGraphics();
            } else if (this.graphicsLayer.graphics.items.length > 1) {
                var geometries = this.graphicsLayer.graphics.map(function (g) {
                    return g.geometry;
                }).toArray();
                (0, _esriPromise2.default)(['esri/geometry/geometryEngine']).then(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 1), geometryEngine = _ref2[0];
                    var geom = geometryEngine.union(geometries);
                    _this3.clearGraphics();
                    _this3.selectFeatures({ geometry: geom });
                });
            }
        },
        clearGraphics: function clearGraphics() {
            this.graphicsLayer.graphics.removeAll();
        },
        clearSelected: function clearSelected() {
            this.selectedFeatures.replace([]);
            this.graphicsLayer.graphics.removeAll();
            this.formIsSaving = false;
        },
        selectFeatures: function selectFeatures(queryProps) {
            var _this4 = this;
            (0, _esriPromise2.default)([
                'esri/tasks/QueryTask',
                'esri/tasks/support/Query'
            ]).then(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2), QueryTask = _ref4[0], Query = _ref4[1];
                var query = Object.assign(new Query(), {
                    outFields: ['*'],
                    returnGeometry: true,
                    outSpatialReference: _this4.view.spatialReference
                }, queryProps);
                var task = new QueryTask({ url: _this4.selectedLayer.url + '/query' });
                task.execute(query).then(function (result) {
                    _this4.highlightFeatures(result.features);
                    _this4.selectedFeatures.replace(result.features.map(function (f) {
                        return f.attributes;
                    }));
                    if (_this4.selectedFeatures.length) {
                        _this4.view.goTo(result.features);
                    }
                    _this4.formIsSaving = false;
                }).otherwise(function (error) {
                    console.log(error);
                });
            });
        },
        highlightFeatures: function highlightFeatures(features) {
            var _this5 = this;
            if (features.length) {
                (0, _assignGraphics2.default)(features).then(function (updatedFeatures) {
                    _this5.graphicsLayer.removeAll();
                    _this5.graphicsLayer.addMany(updatedFeatures);
                });
            }
        },
        onActionClick: function onActionClick(action) {
            action.onClick(this);
            return false;
        }
    });
});
/*can-arcgis@1.0.0#components/select-widget/select-widget*/
define('can-arcgis@1.0.0#components/select-widget/select-widget', [
    'exports',
    'can-component',
    './template.stache',
    './ViewModel',
    '../draw-widget/draw-widget',
    'can-admin/components/form-widget/form-widget',
    'can-admin/components/form-widget/field-components/select-field/select-field'
], function (exports, _canComponent, _template, _ViewModel) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _canComponent2 = _interopRequireDefault(_canComponent);
    var _template2 = _interopRequireDefault(_template);
    var _ViewModel2 = _interopRequireDefault(_ViewModel);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.default = _canComponent2.default.extend({
        tag: 'select-widget',
        ViewModel: _ViewModel2.default,
        view: _template2.default
    });
});
/*can-arcgis@1.0.0#config/select/select*/
define('can-arcgis@1.0.0#config/select/select', [
    'exports',
    'can-stache',
    '../../components/select-widget/select-widget',
    'can-admin/components/form-widget/field-components/text-field/text-field'
], function (exports, _canStache) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _canStache2 = _interopRequireDefault(_canStache);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var layerUrl = 'https://services1.arcgis.com/6bXbLtkf4y11TosO/arcgis/rest/services/Restaurants/FeatureServer/0';
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
                        url: layerUrl,
                        id: 'resteraunts',
                        outFields: ['*']
                    }
                }]
        },
        widgets: [{
                parent: 'expand',
                iconClass: 'esri-icon-search',
                type: 'renderer',
                renderer: (0, _canStache2.default)('<select-widget \n            layers:from="layers"\n            view:from="view"\n            actions:from="actions" />'),
                options: {
                    layers: {
                        'Resteraunts': {
                            url: layerUrl,
                            queries: [
                                {
                                    value: 'name',
                                    label: 'Establishment Name',
                                    fields: ['name'],
                                    queryTemplate: 'EstablishmentName LIKE \'%{name}%\''
                                },
                                {
                                    value: 'riskType',
                                    label: 'Risk Type',
                                    queryTemplate: 'RiskType = {risk}',
                                    fields: [{
                                            name: 'risk',
                                            alias: 'Risk Type',
                                            fieldType: 'select',
                                            options: [
                                                {
                                                    value: 1,
                                                    label: 'Inspected one time per year'
                                                },
                                                {
                                                    value: 2,
                                                    label: 'Inspected two times per year'
                                                },
                                                {
                                                    value: 3,
                                                    label: 'Inspected three times per year'
                                                }
                                            ]
                                        }]
                                }
                            ]
                        }
                    },
                    actions: [{
                            label: 'Log Selected Features',
                            iconClass: 'esri-icon-announcement',
                            onClick: function onClick(selectViewModel) {
                                var graphics = selectViewModel.graphicsLayer.graphics.toArray();
                                var attributes = selectViewModel.selectedFeatures;
                                console.log(graphics, attributes);
                                alert('Check your browser console for feature information');
                            }
                        }]
                }
            }]
    };
});