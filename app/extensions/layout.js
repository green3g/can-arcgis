import template from './layout/template.stache';
import defaultTemplate from './layout/defaultTemplate.stache';

export default {
    init (vm) {
        const domNode = document.getElementById(vm.domNode) || document.body;
        vm.set('defaultTemplate', defaultTemplate);
        domNode.appendChild(template(vm));
    }
};