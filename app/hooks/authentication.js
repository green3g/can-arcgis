const COOKIE_KEY = 'esri_cred';
import {loadModules} from 'esri-loader';

/**
     * Checks for local storage support
     * @return {Boolean}  whether or not local storage is supported
     */
function supportsLocalStorage () {
    try {
        return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
        return false;
    }
}

/**
     * initialize the esri identity manager with credentials if they were stored
     * 
     * tokens look like:
     * {
     *  token: 'lskadjflsdakjflsdkjf',
     *  expires: 1283948932834,
     *  server: 'https://my-server.com/arcgis/rest/services',
     *  ssl: true,
     * }
     * 
     * @param {Array|Object} tokens array of tokens or one object token
     * @param {esri/identity/IdentityManager} esriId the esri identity manager 
     */
function loadCredentials (tokens, esriId) {
    if (tokens) {
        tokens = tokens.length ? tokens : [tokens];
        tokens.forEach((token) => {
            esriId.registerToken(token);
        });
    }
    var idJson, idObject;

    if (supportsLocalStorage()) {
        // read from local storage
        idJson = window.localStorage.getItem(COOKIE_KEY);
    } else {
        // read from a cookie
        // idJson = cookie(this.key);
    }

    if (idJson && idJson !== 'null' && idJson.length > 4) {
        try {
            idObject = JSON.parse(idJson);
            esriId.initialize(idObject);
            // console.log('creds loaded from local storage', idObject);
        } catch (e) {
            //TODO: growl
            // console.log(e);
        }
    } else {
        // console.log('didn\'t find anything to load :(');
    }
}

/**
     * Store the credentials in local storage for next time
     * @param {esri/identity/IdentityManager} esriId the identity manager
     */
function storeCredentials (esriId) {

    // make sure there are some credentials to persist
    if (esriId.credentials.length === 0) {
        return;
    }

    // serialize the ID manager state to a string
    var idString = JSON.stringify(esriId.toJSON());
    // store it client side
    if (supportsLocalStorage()) {
        // use local storage
        window.localStorage.setItem(COOKIE_KEY, idString);
        // console.log("wrote to local storage");
    } else {
        // use a cookie
        // cookie(this.key, idString, {
        //     expires: 1
        // });
        // console.log("wrote a cookie :-/");
    }
}

/**
     * clears existing credentials from local storage or cookie. Essentially
     * like a logout function, except it doesn't remove credentials from memory
     * in the identity manager
     */
export function clearCredentials () {
    if (supportsLocalStorage()) {
        window.localStorage.removeItem(COOKIE_KEY);
    } else {
        // cookie(this.key, '', {});
    }
}

            
export default {
    /**
     * Registers tokens with identity manager, or rehydrates the identity manager with locally cached tokens
     * @param {Object} config the config object
     * @param {Array|Object} config.tokens Array of esri token objects or one individual token object
     * @returns {Object} the config
     */
    preConfig (config = {}) {

        // return a promise that loads the identity manager
        return loadModules(['esri/identity/IdentityManager']).then(([esriId]) => {
            
            //remember credentials once they're created
            esriId.on('credential-create', () => {
                storeCredentials(esriId);
            });

            //initialize our saved credentials
            loadCredentials(config.tokens, esriId);
            return config;
        });
    }
};