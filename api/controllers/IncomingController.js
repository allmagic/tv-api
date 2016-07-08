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

    //
    // console.log('req', req);
    // nen xai allParams() la co the lay dc only param, cai nay la helper no viet san
    // gan' vao object req hoi xua truoc khi xai javascript ong nghe ve may kiey interface nay goi la
    // Prototype, nhung gio es6 viet suong tay lam


    var params = req.allParams(); //allParams la fn buildin

    // console.log('params', params);

    if (Object.keys(params).length == 0) // Check params > 0
      return res.json(404, {"error": "please provide one or more params"});

    let findUserDone = new Promise((resolve, reject) => {
      User.findOne({phone: params.sdtkh}).exec((err, users) => {
          if (err) {
            reject(err)
          }

          resolve(users);
        }
      )
    })



    findUserDone.then((users) => {

      if(typeof users == 'undefined'){ //store new user to db
        User.create({phone: params.sdtkh}).exec((err, user) => {
          console.log('new user created', user);
        })
      }

      console.log('fuck user', users)
      let notifyData = params;
      // remove token
      delete notifyData.token;

      notifyData.users = users; //add users to notifyData

      console.log('notifyData', notifyData)
      sails.sockets.broadcast('logged','incoming', notifyData);// cho het nguoi trong room logged

    }).catch((error)=> {
      console.log('we got error msg', error);
    })

    // console.log('sails.sockets', sails.sockets);
    // lay response cb xong write ra json no co rat nhieu function
    res.json(200, {"message":"notify success", params});
    //res.send(params);

    // return res.view('homepage', params);

  }
}
