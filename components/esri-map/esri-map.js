import Component from 'can-component';
import ViewModel from './ViewModel';
import './esri-map.less';

Component.extend({
    tag: 'esri-map',
    ViewModel: ViewModel,
    events: {
        inserted (element) {
            this.viewModel.createMap(element);
        },
        removed (element) {
            this.viewModel.view.destroy();
            this.viewModel.set({}, true);
        }
    }
});
