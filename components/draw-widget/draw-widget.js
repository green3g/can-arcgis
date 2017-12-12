import Component from 'can-component';
import template from './template.stache';
import ViewModel from './ViewModel';

export default Component.extend({
    tag: 'draw-widget',
    ViewModel: ViewModel,
    view: template,
    events: {
        removed () {
            this.viewModel.view = null;
        }
    }
});