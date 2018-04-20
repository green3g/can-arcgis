

// showing how to use esri-loader with `getOptions`

import {loadModules} from 'esri-loader';
import thumbnailUrl from './thumbnail';
export default {
    title: 'Loading complex options via async promise',
    debug: true,
    viewOptions: {
        center: [-85.05019999999857, 33.12552399999943],
        zoom: 6
    },
    mapOptions: {
        basemap: 'gray'
    },
    widgets: [{
        type: 'esri',
        parent: 'view',
        position: 'top-right',
        path: 'esri/widgets/BasemapToggle',
        getOptions(){
            return loadModules(['esri/Basemap', 'esri/layers/WebTileLayer'])
            .then(([BaseMap, WebTileLayer]) => {
                return {
                    titleVisible: true,
                    nextBasemap: new BaseMap({
                        title: 'Terrain',
                        id: 'terrain',
                        thumbnailUrl,
                        baseLayers: [new WebTileLayer({
                            urlTemplate: 'http://{subDomain}.tile.stamen.com/terrain/{level}/{col}/{row}.png',
                            subDomains: ['a', 'b', 'c', 'd'],
                            copyright: 'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ' +
                              'under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. ' +
                              'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ' +
                              'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
                        })]
                    })
                };
            })
        }
    }]
};