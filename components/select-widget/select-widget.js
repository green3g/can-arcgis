import Component from 'can-component';
import template from './template.stache';
import ViewModel from './ViewModel';
import './draw/polygon';

import 'can-admin/components/form-widget/form-widget';
import 'can-admin/components/nav-container/nav-container';
import 'can-admin/components/nav-page/nav-page';
import 'can-admin/components/form-widget/field-components/select-field/select-field';

export default Component.extend({
    tag: 'select-widget',
    ViewModel: ViewModel,
    view: template
});