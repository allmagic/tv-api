/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    avatar: {
      type: 'url'
    },
    phone: {
      type: 'string',
      unique: true,
      required: true
    },
    customer_group: {
      type: 'string',
      // required: true
    },
    address: {
      type: 'string'
    },
    birthday: {
      type: 'string'
    },
    company: {
      type: 'string'
    },
    email: {
      type: 'string',
      unique: true
    },
    facebook: {
      type: 'string',
      unique: true
    },
    zalo: {
      type: 'string',
      unique: true
    },
    viber: {
      type: 'string',
      unique: true
    },
    note: {
      type: 'array'
    },

    // Add a reference to call
    calls: {
      collection: 'call',
      via: 'owner'
    },
    // e.g., "cm"
    // wingspanUnits: {
    //   type: 'string',
    //   enum: ['cm', 'in', 'm', 'mm'],
    //   defaultsTo: 'cm'
    // },

    // e.g., [{...}, {...}, ...]
    // knownDialects: {
    //   collection: 'Dialect'
    // }
  }
};

