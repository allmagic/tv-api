/**
 * CallLog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //con tui nó ngủ mớ :D , mới dậy khóc um sùm
    content: {
      type: 'string',
      required: true
    },
    // Add a reference to User
    // owner la user id
    owner: {
      model: 'user'
    }
  }
};

