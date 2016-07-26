/**
 * SocketController
 *
 * @description :: Test user logged and join room by socket controller
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: (req, res) => {
    // check neu khong fai ws vao` thi return bas request -> khong can res send nua
    if (!req.isSocket) {return res.badRequest();}

    // req la cai object co chua socket trong nay, req la cai user send toi server
    // sails.sockets.join(req, req.signedCookies['sails.sid']); //cau nay de join socket vao room
    // a lon me roi :D fai socket toi' no no moi co event di event ve` :D
    // xong minh send 1 msg ve session do - coi vi du
    // sails.sockets.broadcast(req.signedCookies['sails.sid'], 'home/loaded', {});

    let session_id = req.signedCookies['sails.sid'];
    sails.sockets.join(req, session_id);
    sails.sockets.join(req, 'logged');

    sails.sockets.broadcast(session_id, 'user/authenticated', { message: `User authenticated and subscribed to logged & ${ session_id } room`, all_session_data: req.session});
  }
};


