import steal from '@loader';
import route from 'can-route';
export default {
    init () {
        route('{page}/{configName}', {
            page: 'map',
            configName: 'viewer'
        });
        route('{page}/{configName}/{x}/{y}/{z}');
        route('{page}/{configName}/{x}/{y}');
        
        route.ready();
    },
    loadConfig () {
        // allow config paths to be folders by using special character '__'
        const config = route.data.configName.replace(/__/g, '/').split(':');

        return new Promise((resolve) => {
            Promise.all([
                steal.import(`~/config/${config[0]}`),
                steal.import(`can-admin/${config[1]}`)
            ]).then((modules) => {
                const c = Object.assign({}, modules[0].default, {
                    admin: modules[1].default
                });
                resolve(c);
            });
        });
    }
};