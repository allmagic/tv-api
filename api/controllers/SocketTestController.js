/**
 * SocketTestController
 *
 * @description :: Server-side logic for managing Sockettests
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: (req, res) => {
    // check neu khong fai ws vao` thi return bas request -> khong can res send nua
    if (!req.isSocket) {return res.badRequest();}

    let session_id = req.session.user_id;

    sails.sockets.join(req, session_id);
    sails.sockets.broadcast(session_id, 'user/created', { message: "a  new user created", all_session_data: req.session});
  }
};

// OK chua :D // ok rồi mà ông làm tui lan man quá :D
// Cu tu tu / sợ tau hoa nhập ma :))
// hoc cham vl // cơm áo gạo tiền nữa pa -_- =D

// thoi gio` design di :D

