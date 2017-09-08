import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';

export default DefineMap.extend('Tool', {
    view: '*',
    iconClass: 'string',
    tooltip: 'string',
    active: 'boolean',
    graphics: DefineList.extend({
        '#': '*'
    }),
    toggle (val) {
        if (typeof val !== 'undefined') {
            this.active = val;
        } else {
            this.active = !this.active;
        }
    },
    activate () {
        this.active = true;
    },
    deactivate () {
        this.active = false;
    }
});