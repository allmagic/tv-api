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
    like: {
      type:'bolean',
    },
    timestamp: {
      type: 'datetime'
    },

    owner: {
      model: 'user',
      required: true
    },
    
  }
};

