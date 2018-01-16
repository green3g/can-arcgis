import {loadModules} from 'esri-loader';
import dev from 'can-util/js/dev/dev';

const TYPES = {
    csv: 'esri/layers/CSVLayer',
    elevation: 'esri/layers/ElevationLayer',
    feature: 'esri/layers/FeatureLayer',
    rss: 'esri/layers/GeoRSSLayer',
    graphics: 'esri/layers/GraphicsLayer',
    group: 'esri/layers/GroupLayer',
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

export function getDefaultFieldInfos (layer) {
    return layer.fields ? [{
        type: 'fields',
        fieldInfos: layer.fields.map((field) => {
            return {
                fieldName: field.name,
                label: field.alias,
                visible: true
            };
        })
    }] : undefined;
}

export function getDefaultPopupTemplate (layer) {
    if (! layer.popupTemplate) { 
        layer.popupTemplate = {}; 
    }
    return {
        title: layer.popupTemplate.title || layer.title || layer.name,
        content: layer.popupTemplate.content || getDefaultFieldInfos(layer)
    };
}

export function assignDefaultPopupTemplate (layer) {
    if (!layer.popupTemplate) {
        layer.popupTemplate = {};
    }

    const template = getDefaultPopupTemplate(layer);
    
    Object.assign(layer.popupTemplate, template);
}

export default function createLayers (layers) {
    const layerPromises = layers.reverse().map((layer) => {

        const path = layer.path ? layer.path : TYPES[layer.type] || 'esri/layers/UnknownLayer';

        return new Promise((resolve) => {
            loadModules([path]).then(([LayerClass]) => {

                const layerOptions = Object.assign({}, layer.options, {
                    outFields: ['*']
                });

                // handle group layers
                if (path === 'esri/layers/GroupLayer') {
                    const groupPromise = createLayers(layerOptions.layers || []);
                    groupPromise.then((newLayers) => {
                        layerOptions.layers = newLayers.map((l) => {
                            return l.layer; 
                        });
                        const l = new LayerClass(layerOptions);
                        l.then((readyLayer) => {
                            assignDefaultPopupTemplate(readyLayer);
                        }).otherwise((error) => {
                            dev.warn(`layer failed to initialize: ${l.id}`, error);
                        });
                        resolve({layer: l});
                    });
                
                } else { 
                    const l = new LayerClass(layerOptions);
                    l.then((readyLayer) => {

                        // default popup template for feature layers!
                        if (path === 'esri/layers/FeatureLayer') { 
                            assignDefaultPopupTemplate(readyLayer); 
                        }
                        
                    }).otherwise((error) => {
                        dev.warn(`layer failed to initialize: ${l.id}`, error);
                    });
                    resolve({layer: l});
                }
            });
        });
    });

    return Promise.all(layerPromises);
}
