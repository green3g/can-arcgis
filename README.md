# Flexible Esri App

## Quick Start

### Install

```
git clone https://github.com/this/repo.git
cd repo
npm install 
```

### Customize

Customize a config file in the config folder. The syntax is a jsonlike 
structure that gets passed to esri's api constructors. 

Each config module exports a default object.

```javascript
export default {

};
```

Within this object are the configuration parameters for widgets, layers, and map views. 

#### `mapOptions`

Options passed to the map constructor.

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

Options to be passed to the map view constructor.

```javascript
viewOptions: {
    center: [-93.28697204589844, 44.294471740722656],
    zoom: 12
}
```

#### `widgets`

Array of widget config objects.

```javascript
widgets: [{

    // type of widget
    type: 'view', 

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

### Test

Open `index-dev.html` in a web server to get a live preview of the app. 
If you need a development web server, 
```
npm i -g live-server
live-server
```
 will start up a development server. 

### Build 

To build the application use the npm script `build`. 

```
npm run build
```

Now you can copy the output `dist` folder and `index.html` to production.

## Application Lifecycle and Extensions

The application lifecycle begins when the app is constructed using `new App()`.
Each method is called in order and the cycle repeats every time the `app.configName` 
changes. This is to ensure the config is reloaded and the map and widgets are 
created correctly.

Extensions are the core of this app. Extensions may be added or removed via the 
`app/extensions.js` config file.

Extensions are simple modules that export an 
object with one or more of the following methods. All methods accept one parameter
`viewModel` which is the application view model. From this object, `config` may 
be accessed in addition to any other property necessary.

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

