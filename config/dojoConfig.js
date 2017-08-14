(function (global) {
    //eslint-disable-next-line
    var path = location.pathname.replace(/[^\/]+$/, '');
    global.dojoConfig = {
        packages: [{
            name: 'widgets',
            location: path + 'widgets'
        }]
    };
})(window);