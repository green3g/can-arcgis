import Component from 'can-component';
import ViewModel from './ViewModel';
import template from './template.stache';

// our required field components
import 'spectre-canjs/sp-modal/sp-modal';
import 'spectre-canjs/sp-form/sp-form';
import 'spectre-canjs/sp-form/fields/sp-text-field/sp-text-field';
import 'spectre-canjs/sp-form/fields/sp-select-field/sp-select-field';


export default Component.extend({
    tag: 'edit-attribute-dialog',
    ViewModel: ViewModel,
    view: template
});