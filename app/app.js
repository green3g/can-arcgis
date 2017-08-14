import DefineMap from 'can-define/map/map';
import extensions from './extensions';
import isPromiseLike from 'can-util/js/is-promise-like/is-promise-like';

import '../components/esri-map/esri-map';
import './styles.less';
import 'arcgis-js-api/themes/light/main.css';
import 'arcgis-js-api/themes/light/view.css';
import 'can-stache-bindings';
import route from 'can-route';
import dev from 'can-util/js/dev/dev';

// init dojo config
import '../config/dojoConfig';

export default DefineMap.extend('App', 

    //allow extra props to be added to viewmodel from template or other
    {seal: false}, {
        extensions: {
            type: '*',
            value: extensions,
            serialize: false
        },
        debug: {
            value: true, 
            type: 'boolean',
            serialize: false
        },
        defaultTemplate: {
            type: '*',
            serialize: false
        },
        
        /**
         * @property {String}
         * @description The name of the config file to load
         * The default is 'viewer' and is loaded via the config extension 
         * which loads the config file in 'config/viewer/viewer.js'
         */
        configName: {
            value: 'viewer', 
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
                // trigger observation
                this.get('configName');

                const promise = new Promise((resolve) => {
                    this.handleEvent('loadConfig').then((config) => {
    
                        // only handle first one for now...
                        resolve(config[0]);
                    });
                });

                return promise;
            }
        },
        config: {
            serialize: false, 
            get (val, set) {
                
                // reset initialization flags 
                this.set({
                    configured: false,
                    started: false
                });

                this.configPromise.then((config) => {
                    set(config);
                    
                    if (config.debug) {
                        window.app = this;
                    }
                    
                    // event after config loads but before startup is called
                    this.handleEvent('postConfig').then(() => {
                        this.set('configured', true);

                        // event to start layout
                        this.handleEvent('startup');
                        this.set('started', true);
                    });
                });
            }
        },
        configured: {
            type: 'boolean',
            serialize: false
        },
        started: {
            type: 'boolean',
            serialize: false
        },
        /**
         * @property {esri/views/MapView}
         */
        view: {
            type: '*',
            serialize: false
        },
        /**
         * initializes the viewmodel event listeners
         */
        init () {
            route.data = this;

            // init event is for logic that only needs to happen once
            // i.e. routing
            this.handleEvent('init');

            this.on('view', () => {
                
                // "postView" occurs after view is intialized and 
                // app is ready for widgets etc
                this.handleEvent('postView');
            });
            
        },
        /**
         * Implements the extension api for various event names
         * @param {String} eventName The name of the event to call on extensions
         * @returns {Promise<any>}
         */
        handleEvent (eventName) {
            const promises = [];
            this.extensions.forEach((ext) => {
                if (typeof ext[eventName] === 'function') {
                    const result = ext[eventName](this);
                    if (isPromiseLike(result)) {
                        promises.push(result);
                        result.catch((error) => {
                            dev.warn('app::promise threw ' + error);
                        });
                    }
                }
            });

            // allow extension methods to be passed by config also?
            // if (typeof this[eventName] === 'function') {
            //     this[eventName](this);
            // }
            return Promise.all(promises);
        }
    });
