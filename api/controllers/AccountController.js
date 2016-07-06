/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: (req, res) => {
    let params = req.allParams();

    Account.login(params.username, params.password).then((result) => {
      res.json(200, {"message": `${ result.username }`})
    }).catch((err) => {
      console.log('err', err);
      res.json(500, {"message": err})
    })
  }
};

//tui xin phép thăng trước :D
