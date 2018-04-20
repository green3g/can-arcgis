
function noop (selected, event) {
    //!steal-remove-start
    //eslint-disable-next-line
    console.warn(`No handler registered for popup template action ${event.action.id}`);
    //!steal-remove-end
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
