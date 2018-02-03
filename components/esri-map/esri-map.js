import Component from 'can-component';
import ViewModel from './ViewModel';
import './esri-map.less';
import 'can-3-4-compat/dom-mutation-events';

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
