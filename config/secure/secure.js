export default {
    title: 'Accessing secure resources <i class="esri-icon-key"></i><code>user1</code>',
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