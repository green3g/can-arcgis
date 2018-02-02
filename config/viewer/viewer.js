/**
 * this config provides a simple setup with one layer, and
 * a custom delete action on the layer
 */


export default {
    title: 'Welcome to can-arcgis',
    debug: true,

    // viewOptions - options to be passed to view constructor
    viewOptions: {
        center: [-93.28697204589844, 44.294471740722656],
        zoom: 12
    },

    // mapOptions - options to be passed to map constructor 
    // layers are special and are passed to their designated layer constructor
    // before map is created 
    mapOptions: {
        basemap: 'gray',
        layers: [{
            
            // you can use "type" for a short hand version of the layer path
            // see [types](can-arcgis/util/createLayers.js) for all the types
            // or you can provide the full path, like this:
            // path: 'esri/layers/FeatureLayer',
            type: 'feature',
            options: {
                url: 'https://services1.arcgis.com/6bXbLtkf4y11TosO/arcgis/rest/services/Restaurants/FeatureServer/0',
                id: 'workorders',
                outFields: ['*']
            }
        }]
    }
};