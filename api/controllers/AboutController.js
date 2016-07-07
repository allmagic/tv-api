/**
 * AboutController
 *
 * @description :: Server-side logic for managing Abouts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req, res) => {
    let data = {
      myName: 'Khanh Admin',
      testVariable: 'this is test value'
    };
    return res.view('about', data)
  }
};

