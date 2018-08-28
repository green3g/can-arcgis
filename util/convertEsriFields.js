import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

export const TEXT_TYPES = {
  'small-integer': 'number',
  integer: 'number',
  single: 'numer',
  date: 'date',
  double: 'number',
  string: 'text'
};

const EXCLUDE = {
  xml: 1,
  'global-id': 1,
  guid: 1,
  raster: 1,
  blob: 1,
  geometry: 1,
  oid: 1
};

/**
 * Gets a mixin for a esri field type if available, else null
 * @param {esriField} f the esri field
 * @returns {Object|Null} the mixin or null
 */
export function getMixin (f) {
  let mixin = {};
  if (f.domain && f.domain.codedValues && f.domain.codedValues.length) {
    mixin = {
      editTag: 'sp-select-field',
      options: f.domain.codedValues.map((item) => {
        return {
          label: item.name,
          value: item.code
        };
      })
    };
  }

  if (f.type === 'date') {
    mixin = {
      onInsert (el) {
        flatpickr(el);
      }
    };
  }

  return mixin;
}

/**
 * Gets a field type from an esri field
 * @param {esriField} f the esri field to get a field type for
 * @returns {String}
 */
export function getTextType (f) {
  return TEXT_TYPES[f.type] || 'text';
}

/**
 * Converts an array of esri fields to can-admin type field parameters
 * @param {Array<esriField>} esriFields The array of esri fields
 * @returns {Array<fieldObject>} converted field objects
 */
export default function convertEsriFields (esriFields) {
  return esriFields.filter((f) => {
    return f.editable && !EXCLUDE[f.type];
  }).map((f) => {
    const mixin = getMixin(f);
    return Object.assign({
      classes: 'field-' + f.name,
      name: f.name,
      alias: f.alias,
      editTag: 'sp-text-field',
      textType: getTextType(f.type)
    }, mixin);
  });
}
