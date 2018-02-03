export default {
    title: `can-arcgis provides an auth hook that will store passwords for you. 
        Try entering user1 for the username/password and refreshing the page`,
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

