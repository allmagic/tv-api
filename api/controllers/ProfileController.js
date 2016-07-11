/**
 * ProfileController
 *
 * @description :: Server-side logic for managing Profiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  getUserById: (phone) => {

    return new Promise((resolve, reject) => {
      User.find({phone: req.param('phone')}).populate('calls').exec(function (err, user) {
        console.log('user-calls', user.calls[0].content);
        if(err)
          reject(err)
        resolve(user)
      });

    })
  },
};
