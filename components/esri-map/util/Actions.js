import assign from 'can-util/js/assign/assign';
import dev from 'can-util/js/dev/dev';

function noop (selected, event) {
    dev.warn(`No handler registered for popup template action ${event.action.id}`);
}

export default (function () {
    const _actionHandlers = {};
    return {
        register (handlers) {
            assign(_actionHandlers, handlers);
        },
        get (id) {
            return _actionHandlers[id] || noop;
        }
    };
})();
