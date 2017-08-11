var stealTools = require('steal-tools');
var path = require('path');

stealTools.build({
    config: path.join(__dirname, 'package.json!npm')
}, {
    // bundleSteal: true,
    bundleAssets: true,
    sourceMaps: true,

    // ignore dojo modules
    ignore: [
        'esri'
    ]
    
});
