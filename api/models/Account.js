/**
 * Account.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

// import bcrypt from "bcrypt";
import md5 from "md5";
// const SALT_WORK_FACTOR = 10;

module.exports = {

  attributes: {
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      password: true,
      minLength: 6,
      required: true
    },
    name: {
      type: 'string'
    },
    avatar: {
      type: 'string'
    },
    posts: {
      collection: 'posts',
      via: 'owner'
    }
  },

  // Check Login
  login: (email, password) => {
    // viet tat cua es6 neu key va value variable trong object giong ten nhau {username, password}
    return new Promise((resolve, reject) => {
      password = md5(password);
      sails.log('login Account find {email, password}', {email, password});
      Account.findOne({email, password}).exec(function (err, res) {
        sails.log('login res', res);
        if (err)
          reject(err);

        if (typeof res == 'undefined'){
          reject("Login failed");
        }

        resolve(res);
      })


    })

  },

  types: {
    password: function (value) {
      // For all creates/updates of `User` records that specify a value for an attribute
      // which declares itself `type: 'password'`, that value must:
      // • be a string
      // • be at least 6 characters long
      // • contain at least one number
      // • contain at least one letter
      return _.isString(value) && value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
    }
  },
  beforeCreate: function (attrs, cb) {
    attrs.password = md5(attrs.password);
    return cb();
  }
};
