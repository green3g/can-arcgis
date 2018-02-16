import dev from 'can-util/js/dev/dev';

function noop (selected, event) {
    dev.warn(`No handler registered for popup template action ${event.action.id}`);
}

export default (function () {
    const _actionHandlers = {};
    return {
        register (handlers) {
            Object.assign(_actionHandlers, handlers);
        },
        get (id) {
            return _actionHandlers[id] || noop;
        }
    };
})();
