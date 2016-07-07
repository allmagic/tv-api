/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: (req, res) => {
    let params = req.allParams();

    Account.login(params.email, params.password).then((result) => {
      req.session.user_id = result.id; //store id vao sess user_id
      req.session.user = result; //store het user data vao object user trong session


      let session_id = req.signedCookies['sails.sid'];

      sails.sockets.join(req, 'logged'); //choi them cai nay cho secure
      sails.sockets.join(req, session_id);
      sails.sockets.broadcast(session_id, 'user/logged', { message: "admin is login", all_session_data: req.session});


      delete result.password;
      res.json(200, {"result": result});


    }).catch((err) => {
      res.json(500, {"message": err})
    })
  }



};

//tui xin phép thăng trước :D
// module.exports = {
//   index: (req, res) => {
//     // check neu khong fai ws vao` thi return bas request -> khong can res send nua
//     if (!req.isSocket) {return res.badRequest();}
//
//     let session_id = req.session.user_id;
//
//     sails.sockets.join(req, session_id);
//     sails.sockets.broadcast(session_id, 'user/created', { message: "a  new user created", all_session_data: req.session});
//   }
// };


