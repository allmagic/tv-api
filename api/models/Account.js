/**
 * Account.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    "username": {
      type: 'string',
      required: true
    },
    "password": {
      type: 'string',
      required: true
    }
  },
  login: (username, password) => {
    // viet tat cua es6 neu key va value variable trong object giong ten nhau {username, password}
    return new Promise((resolve, reject) => {
      Account.find({username, password}).exec(function (err, res) {
        console.log('res', res);
        if(err)
          reject(err);
        if(res.length == 0)
          reject("Login failed");


        resolve(res[0]);
      })
    })

  }
};
