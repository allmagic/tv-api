/**
 * HomepageController
 *
 * @description :: Server-side logic for managing homepages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req, res) => {
    // let sampleDate = (new Date()).toString();
    //
    // let data = {
    //   currentDate: sampleDate,
    //   testVariable: 'this is test value'
    // ;

    //res.json() la echo json :D
    //res.view la load cai view o duoi folder view
    // hieu chua pa hieu roi
    // data la object ong se truyen vao view de~ render ra
    let data = {
      khanhName : "Khanh Sida",
      khanhAge : "33"
    }

    return res.view('homepage', data)
  }
}

