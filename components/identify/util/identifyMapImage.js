import esriPromise from 'esri-promise';
import get from 'can-util/js/get/get';
import assign from 'can-util/js/assign/assign';
import {makeSentenceCase} from 'can-admin/util/string/string';


function assignPopupTemplate (data, popupTemplates, layer) {

    return data.results ? data.results.map((props) => {

        // get a default popup template from popupTemplates.layerId.sublayerId
        const template = get(popupTemplates, `${layer.id}.${props.layerId}`) || {};

        // mixin props
        props.feature.popupTemplate = assign({
            title: props.layerName,
            content: [{
                type: 'fields',
                fieldInfos: Object.keys(props.feature.attributes).map((f) => {
                    return {
                        fieldName: f,
                        label: makeSentenceCase(f),
                        visible: true
                    };
                })
            }]
        }, template.serialize ? template.serialize() : template);

        // return the modified feature
        return props.feature;
    }) : [];
}

export default function identify (event, layer, scope) {
    return new Promise((resolve) => {
        
        esriPromise([
            'esri/tasks/support/IdentifyParameters', 
            'esri/tasks/IdentifyTask'
        ]).then(([IdentifyParameters, IdentifyTask]) => {

            const include = get(scope.layerInfos, `${layer.id}.include`);
            const exclude = get(scope.layerInfos, `${layer.id}.exclude`);

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

            const params = new IdentifyParameters({
                layerIds: layerIds,
                layerOption: 'visible',
                returnGeometry: true,
                spatialReference: event.mapPoint.spatialReference,
                tolerance: 15,
                geometry: event.mapPoint,
                height: scope.view.height,
                width: scope.view.width,
                mapExtent: scope.view.extent
            });

            const task = new IdentifyTask({
                url: layer.url
            });

            task.execute(params).then((result) => {
                const features = assignPopupTemplate(result, scope.popupTemplates, layer);
                resolve(features);
            });
        });
    });
}