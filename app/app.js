import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/';
import steal from '@loader';
import '../components/esri-map/esri-map';
import './styles.less';
import 'arcgis-js-api/themes/light/main.css';
import 'arcgis-js-api/themes/light/view.css';
import 'spectre.css';
import 'can-stache-bindings';
import route from 'can-route';

import hooks from './hooks';

// preload the esri api
import {loadScript} from 'esri-loader';
loadScript({
    url: 'https://js.arcgis.com/4.7/'
});

// init dojo config
import '../config/dojoConfig';

export default DefineMap.extend('App', 

    //allow extra props to be added to viewmodel from template or other
    {seal: false}, {

        links: {
            get () {
                return steal.bundle.map((bundle) => {
                    const parts = bundle.split('/');
                    const id = parts[parts.length - 1];
                    const title = id.substring(0, 1).toUpperCase() + id.substring(1, id.length);
                    return {
                        id: id, 
                        title: title
                    };
                });
            }
        },

        /**
         * hooks to run
         */
        hooks: {
            serialize: false,
            default: hooks,
            Type: DefineList
        },
        configRoot: {
            default: 'can-arcgis/config',
            serialize: false
        },
    
        /**
     * @property {String}
     * @description The name of the config file to load
     * The default is 'viewer' and is loaded via the config extension 
     * which loads the config file in 'config/viewer/viewer.js'
     */
        configName: {
            default: 'viewer', 
            type: 'string'
        },
        /**
     * @property {Promise<Object>}
     * @description The promise that will resolve to the first promise 
     * resolved from the `loadConfig` extension
     */
        configPromise: {
            serialize: false,
            get () {
                const configName = this.configName;
                return steal.import(`${this.configRoot}/${configName}/${configName}`).then((module) => {
                    return this.callHooks('preConfig', module.default);
                });
            }
        },
        config: {
            serialize: false, 
            get (val, set) {
                this.configPromise.then((config) => {
                    set(config);
                    return this.callHooks('postConfig', this);
                });
            }
        },
        /**
     * @property {esri/views/MapView}
     */
        view: {
            serialize: false,
            set (view) {
                if (view) { 
                    setTimeout(() => {
                        this.callHooks('postView', this); 
                    }, 100);
                }
                return view;
            }
        },
        /**
     * initializes the viewmodel event listeners
     */
        init () {
            this.callHooks('init', this);
            route.register('{configName}', {configName: 'viewer'});
            route.data = this; 
            route.start();
        },
        /**
         * Calls hooks that return a promise in order
         * @param {String} name The name of the hook
         * @param {Object} args The arguments to pass
         * @return {Promise} that resolves to the modified args object
         */
        callHooks (name, args) {
            const hooks = this.hooks.filter((hook) => {
                return hook.hasOwnProperty(name);
            }).map((hook) => {
                return hook[name];
            });

            if (!hooks.length) {
                return Promise.resolve(args);
            }

            return hooks.reduce((chain, func) => {
                return chain && chain.then ? chain.then(func) : func(args);
            }, null);
        }
    });

