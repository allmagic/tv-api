/**
 * CommentsController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: (req, res) => {
    //Support socket only
    if (!req.isSocket) {return res.badRequest();}

    let params = req.allParams();
    console.log(params);
    sails.sockets.blast('comment_ok', { message: "comment success", comment_data: params});
    Comments.create({
      content:params.content,
      post:params.post,
      accid:params.accid,
      accname:params.accname,
      accavatar:params.accavatar
    }).exec(function(err) {
      if (err) { return res.serverError(err); }
      return res.ok()
    })
  }
};

