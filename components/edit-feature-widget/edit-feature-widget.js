import Component from 'can-component';
import template from './template.stache';
import ViewModel from './ViewModel';
import './styles.less';

import '../draw-widget/draw-widget';
import 'spectre-canjs/sp-form/sp-form';
import 'spectre-canjs/sp-form/fields/sp-text-field/sp-text-field';
import 'spectre-canjs/sp-form/fields/sp-select-field/sp-select-field';

export default Component.extend({
    tag: 'edit-feature-widget',
    ViewModel: ViewModel,
    view: template
});