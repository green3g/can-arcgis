import Component from 'can-component';
import template from './template.stache';
import ViewModel from './ViewModel';
import './draw/polygon';
export default Component.extend({
    tag: 'select-widget',
    ViewModel: ViewModel,
    view: template
});