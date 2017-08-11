import './feature-table.less';
import ListTable from 'can-admin/components/list-table/list-table';
import DefineList from 'can-define/list/list';
import dev from 'can-util/js/dev/dev';
import esriPromise from 'esri-promise';

export default ListTable.extend({
    tag: 'feature-table',
    ViewModel: ListTable.ViewModel.extend({
        fields: DefineList,
        objects: {Value: DefineList},
        layerId: 'string',
        view: {
            type: '*', 
            set (view) {
                view.map.layers.watch('length', () => {
                    const layer = view.map.findLayerById(this.layerId);
                    if (!layer) {
                        dev.warn('feature-table:layer not found');
                        return view;
                    }

                    view.whenLayerView(layer).then((layerView) => {
                        this.layerView = layerView;
                    });
                });

                return view;
            }
        },
        layerView: {
            type: '*',
            set (layerView) {
                layerView.watch('updating', (updating) => {
                    if (!updating) {
                        esriPromise(['esri/tasks/support/Query']).then((Query) => {
                        const q = new Query();
                        q.geometry = this.view.extent;
                        layerView.queryFeatures(q).then((result) => {
                            this.objects = result.map((row) => {
                                return row.attributes;
                            });
                            });
                    }
                });

                return layerView;
            }
        }
    })
});