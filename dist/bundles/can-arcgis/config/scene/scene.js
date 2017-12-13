/*can-arcgis@1.0.0#config/scene/scene*/
define('can-arcgis@1.0.0#config/scene/scene', ['exports'], function (exports) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    exports.default = {
        debug: true,
        mapOptions: {
            type: 'WebScene',
            portalItem: { id: 'b1f8fb3b2fd14cc2a78728de108776b0' }
        },
        viewOptions: {
            type: 'SceneView',
            environment: { lighting: { directShadowsEnabled: false } }
        }
    };
});