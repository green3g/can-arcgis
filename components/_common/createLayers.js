import defaultContent from './defaultContent';
import esriPromise from 'esri-promise';
import deepAssign from 'can-util/js/deep-assign/deep-assign';

const TYPES = {
    csv: 'esri/layers/CSVLayer',
    elevation: 'esri/layers/ElevationLayer',
    feature: 'esri/layers/FeatureLayer',
    rss: 'esri/layers/GeoRSSLayer',
    graphics: 'esri/layers/GraphicsLayer',
    group: 'esri/layers/Group',
    imagery: 'esri/layers/ImageryLayer',
    mesh: 'esri/layers/IntegratedMeshLayer',
    kml: 'esri/layers/KMLLayer',
    dynamic: 'esri/layers/MapImageLayer',
    notes: 'esri/layers/MapNotesLayer',
    osm: 'esri/layers/OpenStreetMapLayer',
    pointCloud: 'esri/layers/PointCloudLayer',
    scene: 'esri/layers/SceneLayer',
    stream: 'esri/layers/StreamLayer',
    tile: 'esri/layers/TileLayer',
    vectorTile: 'esri/layers/VectorTileLayer',
    webTile: 'esri/layers/WebTileLayer',
    wms: 'esri/layers/WMSLayer',
    wmts: 'esri/layers/WMTSLayer'
};

const Defaults = {
    outFields: ['*'],
    popupTemplate: {
        content: defaultContent
    }
};

const promise = new Promise((resolve) => {
    resolve(promise);
});

export default function createLayers (layers) {
    const layerPromises = layers.reverse().map((layer) => {

        const path = layer.path ? layer.path : TYPES[layer.type] || 'esri/layers/UnknownLayer';

        return new Promise((resolve) => {
            esriPromise([path]).then(([LayerClass]) => {

                const layerOptions = deepAssign({}, layer.options, Defaults);

                // handle group layers
                if (path === 'esri/layers/GroupLayer') {
                    const groupPromise = createLayers(layerOptions.layers || []);
                    groupPromise.then((newLayers) => {
                        layerOptions.layers = newLayers.map((l) => {
                            return l.layer; 
                        });
                        resolve({layer: new LayerClass(layerOptions)});
                    });
                
                } else { 
                    const l = new LayerClass(layerOptions);
                    resolve({layer: l}); 
                }
            });
        });
    });

    return Promise.all(layerPromises);
}
