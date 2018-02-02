/**
 * identify and use map image layers
 * 
 * This example uses the identify widget, which adds popup 
 * templates to layers that don't get them by default. 
 * 
 * Currently only map-image layers are enhanced with 
 * a popup template but additional layers may be added.
 * 
 */

import Identify from 'can-arcgis/components/identify/identify';

export default {
    title: 'Identifying map image layers',
    mapOptions: {
        basemap: 'gray-vector',
        layers: [{
            type: 'dynamic',
            options: {
                url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/PoolPermits/MapServer',
                sublayers: [{
                    id: 1,
                    visible: true
                }, {
                    id: 0,
                    visible: true
                }]
            }
        }]
    },
    viewOptions: {
        center: [-117.4621, 33.8954],
        zoom: 14
    },
    widgets: [{
        type: 'esri',
        position: 'bottom-left',
        path: 'esri/widgets/LayerList',
        parent: 'view'
    }, {
        Constructor: Identify
    }]
};