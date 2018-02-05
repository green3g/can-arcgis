import _debounce from 'lodash.debounce';

function store (obj, props, key) {
    const data = {};
    props.forEach((prop) => {
        data[prop] = obj[prop] && obj[prop].toJSON ? obj[prop].toJSON() : obj[prop];
    });
    localStorage.setItem(key, JSON.stringify(data));
}

export default {
    /**
     * Initializes the config object with defaults from local storage
     * @param {Object} config the config object
     * @returns {Object} the config
     */
    preConfig (config) {
        if (!config.restore) {
            return config;
        }
        const {mapCenter} = localStorage;
        config.viewOptions = config.viewOptions || {};
        if (mapCenter) { 
            try {
                Object.assign(config.viewOptions, JSON.parse(mapCenter)); 
            } catch (e) {
                //!steal-remove-start
                console.warn(e);
                //!steal-remove-end
            }
        }

        return config;
    },
    /**
     * After the view is created, start watching it for changes
     * @param {DefineMap} viewModel the app view model
     * @returns {DefineMap} app view model
     */
    postView (viewModel) {
        const {config, view} = viewModel;
        if (!config.restore) {
            return view;
        }

        // don't run updates every time the event fires
        const storeAsync = _debounce(store, 500);
        view.watch('center', () => {
            storeAsync(view, ['center', 'zoom'], 'mapCenter');
        });

        return viewModel;
    }
};