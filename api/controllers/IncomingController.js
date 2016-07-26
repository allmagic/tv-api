/**
 * IncommingController
 *
 * @description :: API when new calling arrived socket will blast all params
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 *
 * http://sailsjs.org/documentation/concepts/models-and-orm/query-language
 *
 */

module.exports = {
  index: (req, res) => {
    var params = req.allParams(); //allParams la fn buildin

    if (Object.keys(params).length == 0) // Check params > 0
      return res.json(404, {"error": "please provide one or more params"});

    params.sdtkh = params.sdtkh.replace(/\D/g,'');
    let phone = params.sdtkh;

    //Clean phone param, dup with upper
    phone = phone.replace(/\D/g,''); //Remove all keep only number, trim space also

    if(phone.match(/^0[0-9]{9,11}$/g) == null){
      return res.json(400, {"message": "phone is invalid, please check again"});
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
        });

        //overwrite users var after user created
        var [users] = await Promise.all([createUserDone]);
      }
      let createCallDone = new Promise ((resolve,reject) => {
        Calls.create({'owner':params.sdtkh,'callID': params.callid }).exec((err,user) => {
          if (err) {
            sails.log('err',err);
            reject(err);
          }
          resolve(user);
        })
      });
      var [calls] = await Promise.all([createCallDone]);

      var totalClients = await new Promise((resolve, reject) => {
        sails.io.sockets.in('logged').clients((err, clients) => {
          resolve(clients.length);
        })
      });

      let notifyData = params;

      notifyData.users = users; //add users to notifyData

      sails.log('notifyData', notifyData);

      sails.sockets.broadcast('logged', 'incoming', notifyData);// cho het nguoi trong room logged

      res.json(200, {"message": "notify success", users, totalClients});
    }

    concurrent();
  }
}
