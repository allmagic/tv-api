/**
 * CallLog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    content: {
      type: 'string',

    },
    staffNo: {
      type: 'string',

    },
    SIPNo: {
      type: 'string'
    },
    callID: {
      type: 'string',
      
    },
    timestamp: {
      type: 'datetime'
    },

    // Add a reference to User
    // owner la user id
    owner: {
      model: 'user',
      required: true
    },
    // beforeCreate: function (attrs, cb) {
    //   attrs.date = md5(attrs.password);
    //   return cb();
    // },
  }
};

