/**
 * this example demonstrates adding a 3d web scene
 */

export default {
    title: 'Loading a 3d map',
    debug: true,
    mapOptions: {
        basemap: 'satellite',

        // the main difference is we need to specify the map type as "WebScene"
        // this can be either "WebMap" (default) or "WebScene"
        type: 'WebScene',
        portalItem: { // autocasts as new PortalItem()
            id: 'b1f8fb3b2fd14cc2a78728de108776b0'
        }
    },
    viewOptions: {

        // We also need to specify the view type
        // this can be either "MapView" (default) or "SceneView"
        type: 'SceneView'
    }
};