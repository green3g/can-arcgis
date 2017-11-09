export default {
    debug: true,
    mapOptions: {
        basemap: 'gray',
        layers: [{
            path: 'esri/layers/GroupLayer',
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
    }]
};