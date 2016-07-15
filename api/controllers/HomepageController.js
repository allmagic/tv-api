/**
 * HomepageController
 *
 * @description :: Server-side logic for managing homepages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req, res) => {
    let sampleDate = (new Date()).toString();

    //
    let data = {
      currentDate: sampleDate,
      nhanVien: 'Khanh Admin',
      testVariable: 'this is test value',
    };
    return res.view('homepage', data)
  }
}

// sao 404 ko load dc :( biết chết lie62 ? hi2nh nhu truoc gio no dau co work co ma 3 -_-
