import createWidgets from './widgets/createWidgets';

export default {
    postView (scope) {
        createWidgets({widgets: scope.config.widgets || [], view: scope.view, types: ['view', 'expand']});
    }
};