import esriPromise from 'esri-promise';
import get from 'can-util/js/get/get';

export default function identify (event, view, layer, layerInfos) {
    return new Promise((resolve, reject) => {
        
        esriPromise([
            'esri/tasks/support/IdentifyParameters', 
            'esri/tasks/IdentifyTask'
        ]).then(([IdentifyParameters, IdentifyTask]) => {

            const include = get(layerInfos, `${layer.id}.include`);
            const exclude = get(layerInfos, `${layer.id}.exclude`);

            // get an array of visible layer ids
            const layerIds = layer.sublayers.filter((l) => {

                // exclude nonconfigured ids
                if (include && include.length && include.indexOf(l.id) === -1) {
                    return false;
                }

                // exclude excluded ids 
                if (exclude && exclude.length && exclude.indexOf(l.id) > -1) {
                    return false;
                }

                // exclude invisible layers
                return l.visible;
            }).map((l) => {
                return l.id;
            });

            const params = Object.assign(new IdentifyParameters(), {
                layerIds: layerIds,
                layerOption: 'visible',
                returnGeometry: true,
                spatialReference: event.mapPoint.spatialReference,
                tolerance: 15,
                geometry: event.mapPoint,
                height: view.height,
                width: view.width,
                mapExtent: view.extent
            });

            const task = new IdentifyTask({
                url: layer.url
            });

            task.execute(params).then((result) => {
                console.log(result);
                resolve(result);
            });
        });
    });
}