/**
 * PostsController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  timelines: (req,res) => {
    Posts.find()
      .populate('owner')
      .populate('comments')
      .exec(function(err,foundPosts) {
      console.log(foundPosts);
      return res.view('timelines',{foundPosts:foundPosts});
    });

  },
  comment: (req, res) => {
    //Support socket only
    if (req.isSocket) {return res.redirect("/home");}

    let params = req.allParams();
    console.log(params);
    return res.json('comment ok');

  }
};

