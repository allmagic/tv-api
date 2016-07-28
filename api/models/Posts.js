/**
 * Posts.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    content: {
      type: 'longtext'
    },
    comments : {
      collection: 'comments',
      via: 'post'
    },
    owner : {
      model: 'account',
      required: true
    },
  }
};

