import createWidgets from './widgets/createWidgets';

export default {
    postView (scope) {
        createWidgets({widgets: scope.widgets.serialize() || [], view: scope.view, types: ['view', 'expand']});
    }
};