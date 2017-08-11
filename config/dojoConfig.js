(function (global) {
    var path = location.pathname.replace(/[^\/]+$/, '');
    global.dojoConfig = {
        packages: [{
            name: 'widgets',
            location: path + 'widgets'
        }]
    };
})(window);