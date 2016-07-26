/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: (req, res) => {
    //Support socket only
    if (!req.isSocket) {return res.badRequest();}

    let params = req.allParams();
    Account.login(params.email, params.password).then((result) => {
      req.session.user_id = result.id; //store id vao sess user_id
      req.session.user = result; //store het user data vao object user trong session

      let session_id = req.signedCookies['sails.sid'];

      sails.sockets.join(req, 'logged');
      sails.sockets.join(req, session_id);
      sails.sockets.broadcast(session_id, 'user/login-success', { message: "admin is login", all_session_data: req.session});

      delete result.password;
      res.json(200, {"result": result});

    }).catch((err) => {
      res.json(500, {"message": err})
    });
  },

  logout: (req, res) => {
    req.session.destroy(function(err) {
      res.redirect('/home');
    });
  }



};



