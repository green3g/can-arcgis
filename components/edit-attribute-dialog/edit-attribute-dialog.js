import Component from 'can-component';
import ViewModel from './ViewModel';
import template from './template.stache';

// our required field components
import 'can-admin/components/modal-dialog/modal-dialog';
import 'can-admin/components/form-widget/form-widget';
import 'can-admin/components/form-widget/field-components/text-field/text-field';
import 'can-admin/components/form-widget/field-components/select-field/select-field';


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