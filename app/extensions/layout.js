import template from './layout/template.stache';

export default {
    init (vm) {
        const domNode = document.getElementById(vm.domNode) || document.body;
        domNode.appendChild(template(vm));
    }
};