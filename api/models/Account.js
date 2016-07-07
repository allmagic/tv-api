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
    }
  },
  login: (email, password) => {
    // viet tat cua es6 neu key va value variable trong object giong ten nhau {username, password}
    return new Promise((resolve, reject) => {
      // khong biet no co lam before Query ko
      // ong xai email ha ???? moi cham con:D
      // Lon roi :D thang nay 2ways, khong giong md5
      // password = hash;

      password = md5(password);
      console.log('{email, password}', {email, password});

      Account.find({email, password}).exec(function (err, res) {
        console.log('res', res);
        if (err)
          reject(err);

        if (res.length == 0)
          reject("Login failed");

        resolve(res[0]);
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
  },
};
