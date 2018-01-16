import ViewModel from 'spectre-canjs/sp-list-table/ViewModel';
import {loadModules} from 'esri-loader';
import dev from 'can-util/js/dev/dev';

export default ViewModel.extend('FeatureTable', {
    layerId: 'string',
    view: {
        set (view) {
            const layer = view.map.findLayerById(this.layerId);
            if (!layer) {
                dev.warn('feature-table:layer not found');
                return view;
            }

            view.whenLayerView(layer).then((layerView) => {
                this.layerView = layerView;
            });

            return view;
        }
    },
    layerView: {
        type: '*',
        set (layerView) {
            layerView.watch('updating', (updating) => {
                if (!updating) {
                    loadModules(['esri/tasks/support/Query']).then((Query) => {
                        const q = new Query();
                        q.geometry = this.view.extent;
                        layerView.queryFeatures(q).then((result) => {
                            this.objects = result.map((row) => {
                                return row.attributes;
                            });
                        });
                    });
                }
                
            });

            return layerView;
        }
    }
});