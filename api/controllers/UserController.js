/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  profile: (req, res) => {
    let params = req.allParams();
    sails.log('params', params);

    async function concurrent() {
      let [user] = await Promise.all([User.getUserById(params.user_id)]);
      sails.log('user', user);

      if (!user)
        return res.notFound("user not found");

      res.view('user/profile', {user});
    }

    concurrent();
  }, phone: (req, res) => {
    let params = req.allParams();
    sails.log('params', params);

    async function concurrent() {
      let [user] = await Promise.all([User.getUserByPhone(params.phone)]);
      sails.log('user', user);

      if (!user)
        return res.notFound("user not found");

      res.view('user/profile', {user});
    }

    concurrent();
  },


};

