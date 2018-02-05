/**
 * custom basemap example 
 * basemap, like mapOptions.layers use a simplified layer syntax
 */

export default {
    title: 'Loading a custom basemap',

    // restore hook
    restore: true,
    mapOptions: {
        basemap: {
            baseLayers: [{
                path: 'esri/layers/WebTileLayer',
                options: {
                    title: 'Terrain',
                    id: 'terrain',
                    thumbnailUrl: 'https://stamen-tiles.a.ssl.fastly.net/terrain/10/177/409.png',
                    urlTemplate: 'http://{subDomain}.tile.stamen.com/terrain/{level}/{col}/{row}.png',
                    subDomains: ['a', 'b', 'c', 'd'],
                    copyright: 'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ' +
                      'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ' +
                      'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ' +
                      'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
                }
            }]
        }
    }
};