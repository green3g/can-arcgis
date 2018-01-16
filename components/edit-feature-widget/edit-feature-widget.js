import Component from 'can-component';
import template from './template.stache';
import ViewModel from './ViewModel';
import './styles.less';

import '../draw-widget/draw-widget';
import 'spectre-canjs/sp-form/sp-form';
import 'spectre-canjs/sp-form/fields/sp-text-field/sp-text-field';
import 'spectre-canjs/sp-form/fields/sp-select-field/sp-select-field';
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