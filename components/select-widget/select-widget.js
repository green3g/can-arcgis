import Component from 'can-component';
import template from './template.stache';
import ViewModel from './ViewModel';

import '../draw-widget/draw-widget';
import 'spectre-canjs/sp-form/sp-form';
import 'spectre-canjs/sp-form/fields/sp-select-field/sp-select-field';
import 'spectre-canjs/sp-toast/sp-toast';

export default Component.extend({
    tag: 'select-widget',
    ViewModel: ViewModel,
    view: template
});