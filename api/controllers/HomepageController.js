/**
 * HomepageController
 *
 * @description :: Server-side logic for managing homepages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req, res) => {

    User.count().exec(function(err,found) {
      console.log(found);
    });

    User.find({
      name:{'!':'null'}
    }).exec(function(err,customers) {
      if (err) {
        return res.serverError(err);
      }
      return res.view('homepage',{customers:customers});
    });

  },

}

// sao 404 ko load dc :( biết chết lie62 ? hi2nh nhu truoc gio no dau co work co ma 3 -_-
// let sampleDate = (new Date()).toString();
//
// let data = {
//   currentDate: sampleDate,
//   nhanVien: 'Khanh Admin',
//   testVariable: 'this is test value',
// };
// return res.view('homepage', data)
