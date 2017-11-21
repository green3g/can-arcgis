// custom basemap

export default {
    mapOptions: {
        basemap: {
            baseLayers: [{
                title: 'Terrain',
                id: 'terrain',
                thumbnailUrl: 'https://stamen-tiles.a.ssl.fastly.net/terrain/10/177/409.png',
                path: 'esri/layers/WebTileLayer',
                options: {
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