/**
 * HomepageController
 *
 * @description :: Server-side logic for managing homepages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req, res) => {
    let data = {
      name:'Táo Vàng CRM',
      version:'version: 1.0.1',
    };

    // find total users
      User.count().exec(function(err,userfound) {
        data.usercount = userfound;
      });

    // find total calls
      Calls.count().exec(function(err,callsfound) {
        data.callscount = callsfound;
      });

    // find 4 recent users with name is not null
      User.find({name:{'!':'null'},limit :4
      }).exec(function(err,customers) {
        if (err) { return res.serverError(err) }
        data.foundcustomer = customers;

    // show all result
        return res.view('homepage',{
          name:data.name,
          version:data.version,
          usercount:data.usercount,
          callscount:data.callscount,
          customers:customers,
        });
      });

  },
}

// let sampleDate = (new Date()).toString();
//
// let data = {
//   currentDate: sampleDate,
//   nhanVien: 'Khanh Admin',
//   testVariable: 'this is test value',
// };
// return res.view('homepage', data)
