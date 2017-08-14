import steal from '@loader';
import route from 'can-route';

export default {
    init () {
        route('{configName}', {configName: 'viewer'});
        route.ready();
    },
    loadConfig (vm) {

        const config = route.data.configName;

        return new Promise((resolve) => {
            steal.import(`${vm.configRoot}/${config}/${config}`).then((module) => {
                resolve(module.default);
            });
        });
    }
};