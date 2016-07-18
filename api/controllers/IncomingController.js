/**
 * IncommingController
 *
 * @description :: API when new calling arrived socket will blast all params
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 *
 * http://sailsjs.org/documentation/concepts/models-and-orm/query-language
 *
 */

// vi du await cua es7
// async function concurrent () {
//   sails.log('run conn');
//   let p1 = new Promise((resolve, reject) => {
//     resolve("ahihi");
//   })
//   let p2 = new Promise((resolve, reject) => {
//     resolve("ahihi2");
//   })
//
//   let [r1] = await Promise.all([p1]);
//   let [r2] = await Promise.all([p2]);
//
//   // wait de cho` va lay dc return cua 1 promise
//   sails.log('r1', r1);
//   sails.log('r2', r2);
// }

// concurrent();

module.exports = {
  index: (req, res) => {
    var params = req.allParams(); //allParams la fn buildin

    if (Object.keys(params).length == 0) // Check params > 0
      return res.json(404, {"error": "please provide one or more params"});

    let phone = params.sdtkh;

    //Clean phone param
    phone = phone.replace(/\D/g,''); //Remove all keep only number, trim space also

    if(phone.match(/0[0-9]{9,11}/) == null){
      return res.json(400, {"message": "phone is invalid"});
    }

    let findUserDone = new Promise((resolve, reject) => {
      User.findOne({phone}).exec((err, users) => {
          if (err) {
            reject(err)
          }
          resolve(users);
        }
      )
    })

    async function concurrent() {
      var [users] = await Promise.all([findUserDone]);

      if (!users) {
        // Create user if not and return user data to check by frontend JS
        let createUserDone = new Promise((resolve, reject) => {
          User.create({phone}).exec((err, user) => {
            if (err) {
              sails.log('err', err);
              reject(err);
            }

            resolve(user);
          })
        })

        //overwrite users var after user created
        var [users] = await Promise.all([createUserDone]);
      }

      var totalClients = await new Promise((resolve, reject) => {
        sails.io.sockets.in('logged').clients((err, clients) => {
          resolve(clients.length);
        })
      });

      let notifyData = params;

      notifyData.users = users; //add users to notifyData

      sails.sockets.broadcast('logged', 'incoming', notifyData);// cho het nguoi trong room logged

      res.json(200, {"message": "notify success", users, totalClients});
    }

    concurrent();
  }
}
