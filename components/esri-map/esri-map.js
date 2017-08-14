import Component from 'can-component';
import ViewModel from './ViewModel';
import './esri-map.less';

Component.extend({
    tag: 'esri-map',
    ViewModel: ViewModel,
    events: {
        inserted (element) {
            this.viewModel.element = element;
        },
        removed () {
            this.viewModel.element = null;
        }
    }
});
