/*can-arcgis@1.0.0#components/edit-attribute-dialog/template.stache!steal-stache@3.1.3#steal-stache*/
define('can-arcgis@1.0.0#components/edit-attribute-dialog/template.stache!steal-stache@3.1.3#steal-stache', [
    'module',
    'can-stache',
    'can-stache/src/mustache_core',
    'can-view-import@3.2.5#can-view-import',
    'can-stache-bindings@3.11.2#can-stache-bindings'
], function (module, stache, mustacheCore) {
    var renderer = stache('components/edit-attribute-dialog/template.stache', [
        {
            'tokenType': 'start',
            'args': [
                'modal-dialog',
                false,
                1
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'active:bind',
                1
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'modalVisible',
                1
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'active:bind',
                1
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'title',
                1
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'Edit ',
                1
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                'editGraphic.layer.title',
                1
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'title',
                1
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'on:el:inserted',
                1
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'setModal(scope.element)',
                1
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'on:el:inserted',
                1
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'on:el:beforeremove',
                1
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'setModal()',
                1
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'on:el:beforeremove',
                1
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'modal-dialog',
                false,
                1
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n    ',
                1
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'form-widget',
                true,
                2
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'is:u:saving:bind',
                2
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'isSaving',
                2
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'is:u:saving:bind',
                2
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'form:u:object:from',
                2
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'editGraphic.attributes',
                2
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'form:u:object:from',
                2
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'on:submit',
                2
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'submitForm',
                2
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'on:submit',
                2
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'on:cancel',
                2
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'cancelForm',
                2
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'on:cancel',
                2
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'fields:from',
                2
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'editFields',
                2
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'fields:from',
                2
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'form-widget',
                true,
                2
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n',
                2
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'modal-dialog',
                3
            ]
        },
        {
            'tokenType': 'done',
            'args': [3]
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
/*can-admin@0.2.0#components/modal-dialog/modal-dialog.stache!steal-stache@3.1.3#steal-stache*/
define('can-admin@0.2.0#components/modal-dialog/modal-dialog.stache!steal-stache@3.1.3#steal-stache', [
    'module',
    'can-stache',
    'can-stache/src/mustache_core',
    'can-view-import@3.2.5#can-view-import',
    'can-stache-bindings@3.11.2#can-stache-bindings'
], function (module, stache, mustacheCore) {
    var renderer = stache('components/modal-dialog/modal-dialog.stache', [
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
            'tokenType': 'special',
            'args': [
                '#if backdrop',
                1
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'modal',
                1
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                'else',
                1
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'modal-dialog-no-backdrop',
                1
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '/if',
                1
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '#active',
                1
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                ' active',
                1
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '/active',
                1
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '#small',
                1
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                ' modal-sm',
                1
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '/small',
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
            'tokenType': 'end',
            'args': [
                'div',
                false,
                1
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n    ',
                1
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '#if backdrop',
                2
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n        ',
                2
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'div',
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
                'modal-overlay',
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
                'div',
                false,
                3
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'div',
                3
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n    ',
                3
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '/if',
                4
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n    ',
                4
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'div',
                false,
                5
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                5
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'modal-container',
                5
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                5
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false,
                5
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n\r\n        ',
                5
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '#if customBody',
                7
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n            ',
                7
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'content',
                true,
                8
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'content',
                true,
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
            'tokenType': 'special',
            'args': [
                'else',
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
            'tokenType': 'start',
            'args': [
                'div',
                false,
                10
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                10
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'modal-header',
                10
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                10
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false,
                10
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                ',
                10
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'button',
                false,
                11
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'on:el:click',
                11
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'hide',
                11
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'on:el:click',
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
                'btn btn-clear float-right',
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
            'tokenType': 'end',
            'args': [
                'button',
                false,
                11
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'button',
                11
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                ',
                11
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'div',
                false,
                12
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                12
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'modal-title',
                12
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                12
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false,
                12
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                'title',
                12
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'div',
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
            'tokenType': 'close',
            'args': [
                'div',
                13
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n            ',
                13
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'div',
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
                'modal-body',
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
                'div',
                false,
                14
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                ',
                14
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'div',
                false,
                15
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                15
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'content',
                15
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                15
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false,
                15
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                    ',
                15
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'content',
                true,
                16
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'content',
                true,
                16
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                ',
                16
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'div',
                17
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n            ',
                17
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'div',
                18
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n\r\n            ',
                18
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'div',
                false,
                20
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                20
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'modal-footer',
                20
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                20
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'div',
                false,
                20
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n                ',
                20
            ]
        },
        {
            'tokenType': 'start',
            'args': [
                'button',
                false,
                21
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'on:el:click',
                21
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'hide',
                21
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'on:el:click',
                21
            ]
        },
        {
            'tokenType': 'attrStart',
            'args': [
                'class',
                21
            ]
        },
        {
            'tokenType': 'attrValue',
            'args': [
                'btn btn-link',
                21
            ]
        },
        {
            'tokenType': 'attrEnd',
            'args': [
                'class',
                21
            ]
        },
        {
            'tokenType': 'end',
            'args': [
                'button',
                false,
                21
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                'Close',
                21
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'button',
                21
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n            ',
                21
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'div',
                22
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n        ',
                22
            ]
        },
        {
            'tokenType': 'special',
            'args': [
                '/if',
                23
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n    ',
                23
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'div',
                24
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n',
                24
            ]
        },
        {
            'tokenType': 'close',
            'args': [
                'div',
                25
            ]
        },
        {
            'tokenType': 'chars',
            'args': [
                '\r\n',
                25
            ]
        },
        {
            'tokenType': 'done',
            'args': [26]
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
/*can-admin@0.2.0#components/modal-dialog/ViewModel*/
define('can-admin@0.2.0#components/modal-dialog/ViewModel', [
    'exports',
    'can-define/map/map',
    'can-event',
    'can-util/js/assign/assign'
], function (exports, _map, _canEvent, _assign) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _map2 = _interopRequireDefault(_map);
    var _canEvent2 = _interopRequireDefault(_canEvent);
    var _assign2 = _interopRequireDefault(_assign);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    var ViewModel = _map2.default.extend('ModalDialog', {
        active: {
            value: false,
            type: 'htmlbool'
        },
        customBody: {
            value: false,
            type: 'htmlbool'
        },
        small: {
            value: false,
            type: 'htmlbool'
        },
        backdrop: {
            value: true,
            type: 'boolean'
        },
        show: function show() {
            this.active = true;
            this.dispatch('show');
        },
        hide: function hide() {
            this.active = false;
            this.dispatch('hide');
        },
        toggle: function toggle(visible) {
            if (typeof visible !== 'undefined') {
                this.active = Boolean(visible);
            } else {
                this.active = !this.active;
            }
        }
    });
    (0, _assign2.default)(ViewModel.prototype, _canEvent2.default);
    exports.default = ViewModel;
});
/*can-admin@0.2.0#components/modal-dialog/modal-dialog*/
define('can-admin@0.2.0#components/modal-dialog/modal-dialog', [
    'can-component',
    './modal-dialog.stache',
    './ViewModel',
    './modal-dialog.less'
], function (_canComponent, _modalDialog, _ViewModel) {
    'use strict';
    var _canComponent2 = _interopRequireDefault(_canComponent);
    var _modalDialog2 = _interopRequireDefault(_modalDialog);
    var _ViewModel2 = _interopRequireDefault(_ViewModel);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    _canComponent2.default.extend({
        ViewModel: _ViewModel2.default,
        view: _modalDialog2.default,
        tag: 'modal-dialog'
    });
});
/*can-arcgis@1.0.0#components/edit-attribute-dialog/edit-attribute-dialog*/
define('can-arcgis@1.0.0#components/edit-attribute-dialog/edit-attribute-dialog', [
    'exports',
    'can-component',
    './ViewModel',
    './template.stache',
    'can-admin/components/modal-dialog/modal-dialog',
    'can-admin/components/form-widget/form-widget',
    'can-admin/components/form-widget/field-components/text-field/text-field',
    'can-admin/components/form-widget/field-components/select-field/select-field',
    'jquery',
    'jquery-ui',
    'jquery-ui/ui/widgets/datepicker',
    'jquery-ui/themes/base/core.css',
    'jquery-ui/themes/base/theme.css',
    'jquery-ui/themes/base/datepicker.css'
], function (exports, _canComponent, _ViewModel, _template) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _canComponent2 = _interopRequireDefault(_canComponent);
    var _ViewModel2 = _interopRequireDefault(_ViewModel);
    var _template2 = _interopRequireDefault(_template);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
    }
    exports.default = _canComponent2.default.extend({
        tag: 'edit-attribute-dialog',
        ViewModel: _ViewModel2.default,
        view: _template2.default
    });
});
/*can-arcgis@1.0.0#config/edit/edit*/
define('can-arcgis@1.0.0#config/edit/edit', [
    'exports',
    'can-stache',
    'pubsub-js',
    '../../components/edit-attribute-dialog/edit-attribute-dialog'
], function (exports, _canStache, _pubsubJs) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _canStache2 = _interopRequireDefault(_canStache);
    var _pubsubJs2 = _interopRequireDefault(_pubsubJs);
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
                                    className: 'esri-icon-edit',
                                    title: 'Edit',
                                    id: 'edit',
                                    onClick: function onClick(selected, event, vm) {
                                        _pubsubJs2.default.publish('editGraphic', { editGraphic: selected });
                                        vm.view.popup.close();
                                    }
                                }]
                        }
                    }
                }]
        },
        widgets: [{
                parent: document.body,
                type: 'renderer',
                renderer: (0, _canStache2.default)('<edit-attribute-dialog pubsubTopic="editGraphic" />'),
                options: {}
            }]
    };
});