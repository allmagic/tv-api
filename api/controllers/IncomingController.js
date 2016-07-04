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

    console.log('params', params);

    if (Object.keys(params).length == 0) // Check params > 0
      return res.json(404, {"error": "please provide one or more params"});

    let findUserDone = new Promise((resolve, reject) => {
      User.find({name: params.name}).exec((err, users) => {
          if (err) {
            reject(err)
          }

          resolve(users);
        }
      )
    })

    

    findUserDone.then((users) => {
      console.log('fuck user', users)
      let notifyData = params;
      notifyData.users = users; //add users to notifyData

      // Notify all browser when user found
      sails.sockets.blast('incoming', notifyData);
    }).catch((error)=> {
      console.log('we got error msg', error);
    })

    // lay response cb xong write ra json no co rat nhieu function
    //res.json(200, {"message": "new message blast"});
    //res.send(params);

    return res.view('homepage', params);

  }
}

// module.exports = { //my object }
// trong js khac' voi trong php, php khong can export cung~ require va include dc
// trong js muon nta include dc phai export bang syntax module.exports =
// O day minh co object {}
// key la index
// tui dang xai es6 nen cach viet xoa bot di may cai ruom ra cua function nay no
// thuc ra no la vay gio chay van dc
// nhin sach hon :D uh
// req la param dau tien khi no callback minh dat ten la req
// res la param thu 2 dung de~ response noi dung ve cho user khi callback dat ten la res thuc ra la ten gi cung dc
// nhung req res nhin sach dep
// muon debug chi can console.log('xxxx', 'xxxx')

// sails.sockets la` thang fw viet san~ roi co nhieu lam o day:
// o day tui dung blast la` nhanh nhat' vi no phat' het user luon, vi minh khong co phan biet user nao, room nao
// nay no dung roi
// ben nay de~ hieu hon vi no wrap lai het roi

// nhung code o day chay o server
// no tim het socket xong no push event 'incoming', params tu` server di den cac browser dang co WS connection


