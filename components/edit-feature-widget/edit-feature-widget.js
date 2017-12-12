import Component from 'can-component';
import template from './template.stache';
import ViewModel from './ViewModel';

import '../draw-widget/draw-widget';
import 'can-admin/components/form-widget/form-widget';
import 'can-admin/components/form-widget/field-components/text-field/text-field';
import 'can-admin/components/form-widget/field-components/select-field/select-field';
import 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/datepicker.css';

export default Component.extend({
    tag: 'edit-feature-widget',
    ViewModel: ViewModel,
    view: template
});