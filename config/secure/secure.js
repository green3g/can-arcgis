export default {
    mapOptions: {
        basemap: 'topo',
        layers: [{
            type: 'feature',
            options: {
                url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/SaveTheBay/FeatureServer/0'
            }
        }]
    },
    viewOptions: {
        center: [-120.723, 35.165],
        zoom: 12
    }
};