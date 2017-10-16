import Tool from './_Tool';
import Component from 'can-component';
import template from './template.stache';
import esriPromise from 'esri-promise';

let drawConfig;
esriPromise(['esri/symbols/SimpleFillSymbol']).then(([SimpleFillSymbol]) => {
    drawConfig = {
        drawingSymbol: new SimpleFillSymbol({
            color: [102, 0, 255, 0.15],
            outline: {
                color: '#6600FF',
                width: 2
            }
        }),
        finishedSymbol: new SimpleFillSymbol({
            color: [102, 0, 255, 0.45],
            outline: {
                color: '#6600FF',
                width: 2
            }
        }),
        activePolygon: null,
        isDrawActive: false
    };
});

export const ViewModel = Tool.extend('PolygonTool', {
    iconClass: {
        value: 'esri-icon-polygon'
    },
    tooltip: {
        value: 'Draw a shape'
    },
    pointerDownListener: {
        type: '*',
        set (handle) {
            if (this.pointerDownListener) {
                this.pointerDownListener.remove();
            }
            return handle;
        }
    },
    pointerMoveListener: {
        type: '*',
        set (handle) {
            if (this.pointerMoveListener) {
                this.pointerMoveListener.remove();
            }
            return handle;
        }
    },
    doubleClickListener: {
        type: '*',
        set (handle) {
            if (this.doubleClickListener) {
                this.doubleClickListener.remove();
            }
            return handle;
        }
    },
    clickListener: {
        type: '*',
        set (handle) {
            if (this.clickListener) {
                this.clickListener.remove();
            }
            return handle;
        }
    },
    graphicsLayer: {
        type: '*', 
        set (layer) {
            if (this.graphicsLayer) {
                this.view.map.remove(this.graphicsLayer);
            }
            this.view.map.add(layer);
            return layer;
        }
    },
    activeGraphic: {
        type: '*', 
        set (g) {
            if (this.activeGraphic) {
                this.graphicsLayer.remove(this.activeGraphic);
            }
            return g;
        }
    },
    activePolygon: {
        type: '*',
        set (poly) {
            if (poly) {
                esriPromise(['esri/Graphic', 'esri/layers/GraphicsLayer']).then(([Graphic, GraphicsLayer]) => {
                    if (!this.graphicsLayer) {
                        this.graphicsLayer = new GraphicsLayer();
                    }
                    const graphic = new Graphic({
                        geometry: poly,
                        symbol: this.active ? drawConfig.drawingSymbol : drawConfig.finishedSymbol
                    });
                    
                    this.activeGraphic = this.active ? graphic : null;
                    this.graphicsLayer.add(graphic);
                });
            }
            return this.active ? poly : null;
        }
    },
    active: {
        set (active) {
            if (active) {
                this.clickListener = this.view.on('click', this.onClick.bind(this));
                this.pointerDownListener = this.view.on('pointer-down', 
                    this.onPointerDown.bind(this));
                this.pointerMoveListener = this.view.on('pointer-move',
                    this.onPointerMove.bind(this));
                this.doubleClickListener = this.view.on('double-click', 
                    this.onDoubleClick.bind(this));
            } else {
                this.set({
                    pointerDownListener: null,
                    pointerMoveListener: null,
                    doubleClickListener: null,
                    clickListener: null
                });
            }
            return active;
        }
    },
    onClick (event) {
        event.stopPropagation();
    },
    onPointerDown (event) {
        event.stopPropagation();
        this.addVertex(this.createPoint(event));
    },
    onPointerMove (event) {
        this.updateFinalVertex(this.createPoint(event));
    },
    onDoubleClick (event) {
        this.active = false;
        this.updateFinalVertex(this.createPoint(event), true);
    },
    // Converts screen coordinates returned
    // from an event to an instance of esri/geometry/Point
    createPoint (event) {
        event.stopPropagation();
        return this.view.toMap(event);
    },
    /**
     * Adds a vertex to the activePolygon. Fires each time
     * the view is clicked.
     * @param {esri/geometry/Point} point - Adds the given poing to the active
     *   polygon then resets the active polygon.
     */
    addVertex (point) {
        esriPromise(['esri/geometry/Polygon', 'esri/geometry/geometryEngine']).then(([Polygon]) => {
            
            var polygon = this.activePolygon;
            var ringLength;
            
            if (!polygon) {
                polygon = new Polygon({
                    spatialReference: {
                        wkid: 3857
                    }
                });
                polygon.addRing([point, point]);
            } else {
                ringLength = polygon.rings[0].length;
                polygon.insertPoint(0, ringLength - 1, point);
            }
            
            this.activePolygon = polygon;
            
        });
    },
    redrawPolygon (polygon, finished) {
        esriPromise(['esri/geometry/geometryEngine']).then(([geometryEngine]) => {
        
        // simplify the geometry so it can be drawn accross
        // the dateline and accepted as input to other services
            var geometry = finished ? geometryEngine.simplify(polygon)
                : polygon;
        
            if (!geometry && finished) {
                console.log(
                    'Cannot finish polygon. It must be a triangle at minimum. Resume drawing...'
                );
                return;
            }
            this.activePolygon = geometry;
        });
    },
    updateFinalVertex (point, finished) {
        if (!this.activePolygon) {
            return; 
        }
        var polygon = this.activePolygon.clone();

        var ringLength = polygon.rings[0].length;
        polygon.insertPoint(0, ringLength - 1, point);
        this.redrawPolygon(polygon, finished);
    }
});

export default Component.extend({
    tag: 'polygon-tool',
    view: template,
    ViewModel: ViewModel
});