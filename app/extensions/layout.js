import template from './layout/template.stache';
import defaultTemplate from './layout/defaultTemplate.stache';

export default {
    init (vm) {
        vm.set('defaultTemplate', defaultTemplate);
        document.body.appendChild(template(vm));
    }
};