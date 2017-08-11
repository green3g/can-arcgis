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

export default DefineMap.extend('App', 

    //allow extra props to be added to viewmodel from template or other
    {seal: false}, {
        extensions: {
            type: '*',
            value: extensions
        },
        mapOptions: {type: '*'},
        viewOptions: {type: '*'},
        debug: {value: true, type: 'boolean'},
        /**
         * A place for all route data...anything set in here will be put in the url hash
         */
        routeData: {
            Value: DefineMap.extend({seal: false}, {       
                /**
                 * @property {String}
                 * @description The name of the config file to load
                 * The default is 'viewer' and is loaded via the config extension 
                 * which loads the config file in 'config/viewer/viewer.js'
                 */
                configName: {value: 'viewer', type: 'string'}
            })
        },
        /**
         * @property {Promise<Object>}
         * @description The promise that will resolve to the first promise 
         * resolved from the `loadConfig` extension
         */
        configPromise: {
            get () {

                // trigger observation
                this.get('routeData.configName');
            
                return new Promise((resolve) => {
                    this.handleEvent('loadConfig').then((config) => {

                    // only handle first one for now...
                        resolve(config[0]);
                    });
                });
            }
        },
        config: {
            serialize: false, 
            type: '*',
            get (val, set) {
                this.configPromise.then((config) => {
                    if (!config) {
                        return; 
                    }
                    if (set) { 
                        set(config); 
                    }

                    if (this.debug) {
                        window.app = this;
                    }

                    // event after config loads but before startup is called
                    this.handleEvent('postConfig').then(() => {
                        this.set(config);
                        // event to start layout
                        this.handleEvent('startup');
                    });

                });
            }
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
            route.data = this.routeData;

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
