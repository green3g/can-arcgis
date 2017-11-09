# can-arcgis-map

[![Join the chat at https://gitter.im/can-arcgis/Lobby](https://badges.gitter.im/can-arcgis/Lobby.svg)](https://gitter.im/can-arcgis/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

A configureable mapping app bundled with StealJS. Work in progress. Inspired by [cmv-app](https://github.com/cmv/cmv-app)

![screenshot](docs/images/zoom.gif)

## Features

 - Configure multiple apps using a simple JSON like syntax 
 - Utilize existing Esri API widgets, layers, and map views
 - Generate compact, progressivly loaded bundles with `steal-tools`
 - Extend functionality by creating widgets or [extensions](#extensions) in 
    ES6, commonjs format and `stache` (mustache like) templating language

## Quick Start

### Install

```
git clone https://github.com/this/repo.git
cd repo
npm install 
```

### Customize

Configs are loaded via the config extension. By default, configs are stored in the config folder. Each config should be placed
in its own folder, and related files can be placed next to that file. Each config gets its own url: `https://roemhildtg.github.io/can-arcgis/index-prod.html#!scene`. For example, you can link to other configs within the app just by specifying its hash: 

```html
<a href="#!scene">Scene Viewer App</a>
```

This will navigate the user to the config file in `config/viewer/viewer.js`.

Customize a config file in the config folder. The syntax is a jsonlike 
structure that gets passed to esri's api constructors. 

Each config module exports a default object.

```javascript
export default {

};
```

Within this object are the configuration parameters for widgets, layers, and map views. 

#### `mapOptions`

Options passed to the map constructor. These options are passed via 
binding in the navigation extension.

```javascript
mapOptions: {
    layers: [] // layer config
}
```

##### `layers`

A simplified json structure for creating esri layer objects. This should
be inside the `mapOptions` object. 

```javascript
    layers: [{
            // path to feature layer class
            path: 'esri/layers/FeatureLayer',

            // options to pass to constructor
            options: {
                url: '/arcgis/rest/services/servicename/MapServer/132',
                id: 'workorders',
                outFields: ['*'],
                popupTemplate: {
                    // popup template
                    }
                }
            }
        }]]
```

#### `viewOptions` 

Options to be passed to the map view constructor.These options are passed via 
binding in the navigation extension.

```javascript
viewOptions: {
    center: [-93.28697204589844, 44.294471740722656],
    zoom: 12
}
```

#### `widgets`

Array of widget config objects. Implemented by the widgets extension. 

```javascript
widgets: [{

    // type of widget
    // 'esri', 'renderer', or none
    type: 'esri', 
    
    // parent type 
    // options include 'expand', 'view', or 'invisible'
    parent: 'view', 

    // path to widget class
    path: 'dijit/layout/ContentPane', 

    // position to place widget in (if type is view)
    position: 'top-right',

    // widget constructor options
    options: {
        content: 'Hello!'
    }
}]
```

Each config can include these properties or import them from other modules.
 For instance, you could have one file `widgets.js` that looks like this:

```javascript
export default [{
    // widget config
}]
```

and you can import that into your config by adding an import line to the top

```javascript
import myWidgets from './widgets';

export default {
    // other config props
    widgets: myWidgets
};
```

For options that require esri modules, you'll need to use the esriPromise 
library along with the `optionsPromise` property. This allows you to resolve
your options with a promise, rather than passing them in. 

Example: configuring a BasemapToggle widget with `optionsPromise`:

```javascript
// viewer.js config file
import esriPromise from 'esri-promise';

export default {
    // ...
    // other config properties
    // ...
    widgets: [{
    path: 'esri/widgets/BasemapToggle',
    parent: 'view',
    type: 'esri',
    position: 'top-left',
    iconClass: 'esri-icon-basemap',
    optionsPromise: new Promise((resolve) => {
        esriPromise([
            'esri/Basemap', 
            'esri/layers/TileLayer',
            'esri/layers/MapImageLayer'
        ]).then(([Basemap, TileLayer, MapImageLayer]) => {
            const base = new Basemap({
                thumbnailUrl: 'https://js.arcgis.com/4.5/esri/images/basemap/hybrid.jpg',
                id: 'aerial',
                baseLayers: [new TileLayer({
                    url: `${url}/basemaps/imagery_2016/MapServer`
                })],
                referenceLayers: [new MapImageLayer({
                    url: `${url}/basemaps/gray_labels/MapServer`
                })]
            });
            resolve({
                nextBasemap: base
            });
        });
    })
},
}
```

### Test

Open `index-dev.html` in a web server to get a live preview of the app. 
If you need a development web server, 
```
npm i -g live-server
live-server
```
 will start up a development server. 

### Build 

Before building, make sure you have added all of your config files as bundles to the `package.json` file. Specify your bundles in the `steal.bundles` array
like `"can-arcgis/config/viewer/viewer"`.

Each bundle will be scanned for dependencies using `steal-tools` and 
steal will automatically optimize the files into progressivly 
loaded bundles.

To build the application use the npm script `build`. 

```
npm run build
```

Now you can copy the output `dist` folder and `index.html` to production.

## Extensions 

Extensions are the core of this app. Extensions may be added or removed via the 
`app/extensions.js` config file.

Extensions are simple modules that export an object with one or more 
of the following methods. All methods accept one parameter
`viewModel` which is the application view model. From this object, `config` may be accessed in addition to any other property necessary.

## Application Lifecycle

The application lifecycle begins when the app is constructed using `new App()`.
Each method is called in order and the cycle repeats every time the `app.configName` 
changes. This is to ensure the config is reloaded and the map and widgets are 
created correctly.

### `init`: 

Called immediately, but does not halt program execution so all methods should 
be synchronous if program requires them to function.

Expected return: `undefined`

### `loadConfig`:

Called immediately. At the moment, one plugin should implement this method and 
load a config object. and following methods will wait on any promises returned by 
this method.

Expected return: `Promise<Object>` - a promise that resolves to the config object

### `postConfig`:

Called after `loadConfig` to allow for modifications to the config object. 

Expected return: `Promise` OR `undefined`

### `startup`:

The final stage to the application loading process. A perfect time 
to initialize widgets on the view, change map layers, or any other 
runtime stuff.

## FAQ

**Why stealjs?**

Steal provides a minimal effort configuration for your app to get started developing and generate distributable bundles. 

**Are dojo modules bundled?**

At this time, dojo modules are loaded from the Esri CDN. 