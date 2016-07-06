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
      testVariable: 'this is test value'
    };

    // sails ho tro generate session roi gio minh xai`

    // Lan thu 2 load len tu session
    if(req.session.user_id){
      data.user_id = req.session.user_id;
    }

    //create user_id sess - có thiếu dấu ko ko 1 dong ko can  { } cung dc
    if(typeof req.session.user_id == "undefined")
      req.session.user_id = "123";

    req.session.key_a_session = "value a on session";// nhung cai nay store tren server nhe
    //gio lay thu user_id tu tren view ne

    console.log('req.session.user_id', req.session.user_id);
    console.log('data', data);

    return res.view('homepage', data)
  }
}

// sao 404 ko load dc :( biết chết lie62 ? hi2nh nhu truoc gio no dau co work co ma 3 -_-
