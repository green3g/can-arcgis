define("can-arcgis@2.1.3#config/layerlist-actions/actions/getInfo",["exports","sweetalert2","esri-loader","sweetalert2/dist/sweetalert2.min.css"],function(e,t,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(e){r.default.showLoading(),(0,i.loadModules)(["esri/request"]).then(function(t){new(0,n(t,1)[0])(e.item.layer.url,{query:{f:"json"},responseType:"json"}).then(function(t){(0,r.default)({title:e.item.layer.title,text:t.data.description})})})};var r=function(e){return e&&e.__esModule?e:{default:e}}(t),n=function(){function e(e,t){var i=[],r=!0,n=!1,a=void 0;try{for(var o,s=e[Symbol.iterator]();!(r=(o=s.next()).done)&&(i.push(o.value),!t||i.length!==t);r=!0);}catch(e){n=!0,a=e}finally{try{!r&&s.return&&s.return()}finally{if(n)throw a}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()}),define("can-arcgis@2.1.3#config/layerlist-actions/layerlist-actions",["exports","./actions/getInfo"],function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(e){return e&&e.__esModule?e:{default:e}}(t);e.default={title:"Creating custom layerlist actions",debug:!0,viewOptions:{center:[-93.28697204589844,44.294471740722656],zoom:12},mapOptions:{basemap:"gray",layers:[{type:"feature",options:{url:"https://services1.arcgis.com/6bXbLtkf4y11TosO/arcgis/rest/services/Restaurants/FeatureServer/0",id:"workorders",outFields:["*"]}},{type:"dynamic",options:{url:"https://server.arcgisonline.com/arcgis/rest/services/Demographics/USA_Median_Household_Income/MapServer",title:"US Median Household Income"}}]},widgets:[{type:"esri",parent:"view",position:"top-right",path:"esri/widgets/LayerList",onCreate:function(e){e.on("trigger-action",function(e){var t=e.action.id;switch(t){case"info":(0,i.default)(e);break;case"increase-opacity":case"decrease-opacity":var r="increase-opacity"===t?.2:-.2;e.item.layer.opacity+=r;break;default:return}})},options:{listItemCreatedFunction:function(e){e.item.actionsSections=[[{title:"Layer Information",className:"esri-icon-description",id:"info"}],[{title:"Increase opacity",className:"esri-icon-up",id:"increase-opacity"},{title:"Decrease opacity",className:"esri-icon-down",id:"decrease-opacity"}]]}}}]}});
//# sourceMappingURL=layerlist-actions.js.map