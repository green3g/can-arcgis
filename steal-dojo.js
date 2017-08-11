import loader from '@loader';
import * as esriLoader from 'esri-loader';

function isNode () {
    //Scans the global variable space for variables unique to node.js
    if (typeof module !== 'undefined' && module.exports && typeof require !== 'undefined' && require.resolve) {
        return true;
    } else {
        return false;
    }
}

const bootstrap = (function () {
    if (isNode()) {
        return function () {
            return new Promise((resolve) => {
                resolve({
                    dojoRequire (deps, callback) { 
                        callback({});
                    }
                });
            });
        };
    }
    var promise;
    return function () {
        if (promise) { 
            return promise; 
        }
        promise = new Promise((resolve, reject) => {
            // preload the ArcGIS API
            esriLoader.bootstrap((err) => {
                if (err) {
                    // handle any loading errors
                    reject(err);
                } else {
                    resolve(esriLoader);
                }
            }, {
                // use a specific version instead of latest 4.x
                url: 'https://js.arcgis.com/4.4/'
            });
        });
        return promise;
    };
})();


function getDojoName (module) {
    // we just replace SystemJS.baseURL with '';
    return module.replace(loader.baseURL, '');
}

export function fetch (load) {
    return new Promise((resolve) => {
        var dojoName = getDojoName(load.name.split('!')[0]);
        bootstrap().then((esri) => {
            esri.dojoRequire([dojoName], () => {
                resolve('');
            });
        });
    });
}

export function instantiate (load) {
    var dojoName = getDojoName(load.name.split('!')[0]);
    return new Promise((resolve) => {
        bootstrap().then((esri) => {
            esri.dojoRequire([dojoName], (mod) => {
                resolve({
                    deps: [],
                    execute: function () {
                        return loader.newModule({
                            default: mod
                        });
                    }
                });
            });
        });
    });
}

export var includeInBuild = true;
