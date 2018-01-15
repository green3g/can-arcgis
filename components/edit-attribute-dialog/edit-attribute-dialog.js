import Component from 'can-component';
import ViewModel from './ViewModel';
import template from './template.stache';

// our required field components
import 'spectre-canjs/sp-modal/sp-modal';
import 'spectre-canjs/sp-form/sp-form';
import 'spectre-canjs/sp-form/fields/sp-text-field/sp-text-field';
import 'spectre-canjs/sp-form/fields/sp-select-field/sp-select-field';


// jquery ui datepicker
import 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/datepicker.css';

export default Component.extend({
    tag: 'edit-attribute-dialog',
    ViewModel: ViewModel,
    view: template
});