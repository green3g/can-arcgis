import observation from 'can-observation-recorder';
import queues from 'can-queues';
import canReflect from 'can-reflect';
import canSymbol from 'can-symbol';
window.canSymbol = canSymbol;

// key to store canjs handles on the accessor object
export const CANJS_KEY = Symbol('can.ArcGISHandlers');

/**
 * Decorate esri's observable type with canjs methods
 * Usage: decorate(Accessor.prototype)
 * @param {esri/core/Accessor} obj The Accessor prototype.
 * @returns {esri/core/Accessor} the decorated object or the value if `obj` is not an object
 *
 */
export default function decorate (obj) {
  // make sure object exists and isn't already decorated through circular references
  if (obj[CANJS_KEY]) {
    return obj;
  }

  // when a value gets unbound, remove its watch handle and the handler
  function offKeyValue (key, handle) {
    const handlers = this[CANJS_KEY] = this[CANJS_KEY] || {
    };
    if (!handlers[key]) {
      handlers[key] = {
        key: key,
        watch: null,
        handlers: []
      };
    }

    const handler = handlers[key];
    if (handler && handler.handlers.length) {
      // remove the handler
      const index = handler.handlers.indexOf(handle);
      handler.handlers.splice(index, 1);
    }

    // clean up the watch handle if no handlers
    if (!handler.handlers.length && handler.watch) {
      handler.watch.remove();
      handler.watch = null;
    }
  }

  // when a value gets bound, register its handler using `watch`
  function onkeyValue (key, handler) {
    const handlers = this[CANJS_KEY] = this[CANJS_KEY] || {
    };

    if (!handlers[key]) {
      handlers[key] = {
        key: key,
        watch: null,
        handlers: []
      };
    }

    // register one single watcher
    if (!handlers[key].watch) {
      if (key === 'items') {
        handlers[key].oldLength = this.length;
        handlers[key].watch = this.on('change', (event) => {
          // console.log('--onchange------', event);
          queues.batch.start();
          handlers[key].handlers.forEach((handle) => {
            handle(this.length, handlers[key].oldLength);
          });
          handlers[key].oldLength = this.length;
          queues.batch.stop();
        });
      } else {
        handlers[key].watch = this.watch(key, (newValue, oldValue, propertyName, target) => {
          queues.batch.start();
          handlers[key].handlers.forEach((handle) => {
            handle(newValue, oldValue);
          });
          queues.batch.stop();
        });
      }
    }

    // push the handler into the stack
    handlers[key].handlers.push(handler);
  }

  // when a value is gotten, call observation.add
  function getKeyValue (key) {
    observation.add(this, key);
    return this.get ? this.get(key) : this[key];
  }

  const symbols = {
    'can.isMapLike': true,
    'can.offKeyValue': offKeyValue,
    'can.onKeyValue': onkeyValue,
    'can.getKeyValue': getKeyValue,
    'can.getOwnEnumerableKeys': obj.keys
  };

  canReflect.assignSymbols(obj, symbols);
  return obj;
}
