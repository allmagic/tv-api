/**
 * HomepageController
 *
 * @description :: Server-side logic for managing homepages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req, res) => {
    let sampleDate = (new Date()).toString();

    return res.view('homepage', {
      currentDate: sampleDate,
      testVariable: 'this is test value'
    })
  }
}

