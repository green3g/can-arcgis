/**
 * a sample using group layers
 * Layer syntax is the same as mapOptions.layers - simplified
 * 
 * This example also demonstrates the use of identifying map image layers
 * inside of group layers. It works the same as regular layers.
 */
import Identify from 'can-arcgis/components/identify/identify';

export default {
    title: 'Using group layers',
    debug: true,
    mapOptions: {
        basemap: 'gray',
        layers: [{
            type: 'group',
            //path: 'esri/layers/GroupLayer',
            options: {
                title: 'US Demographics',
                visible: true,
                visibilityMode: 'exclusive',
                layers: [{
                    path: 'esri/layers/MapImageLayer',
                    options: {
                        url: 'https://server.arcgisonline.com/arcgis/rest/services/Demographics/USA_Median_Net_Worth/MapServer',
                        title: 'US Median Net Worth',
                        visible: false
                    }
                }, {
                    path: 'esri/layers/MapImageLayer',
                    // we could also specify the type instead of path
                    // type: 'dynamic'
                    options: {
                        url: 'https://server.arcgisonline.com/arcgis/rest/services/Demographics/USA_Median_Household_Income/MapServer',
                        title: 'US Median Household Income'
                    }
                }]
            }
        }]
    },
    widgets: [{
        path: 'esri/widgets/LayerList',
        type: 'esri',
        parent: 'view',
        position: 'bottom-left'
    }, {
        Constructor: Identify
    }]
};