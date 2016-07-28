/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

import QueryBuilder from 'datatable';

module.exports = {

  profile: (req, res) => {
    let params = req.allParams();
    sails.log('params', params);

    async function concurrent() {
      let [user] = await Promise.all([User.getUserById(params.phone)]);
      sails.log('user', user);

      if (!user)
        return res.notFound("user not found");

      res.view('user/profile', {user});
    }
    concurrent();
  },

  upload: (req, res) => {
    let uploaded = {
      msg:'ok',
  };
    if(req.method === 'GET')
      return res.json({'status':'GET not allowed'});

    sails.log.debug('We have entered the uploading process ');
    let params = req.allParams();
    let phone = params.phone;
    req.file('avatar').upload({dirname:'../../assets/images/avatar/'},function(err,files) {
      if (err) return res.serverError(err);
      let [file] = files;
      uploaded.avatar = file;
    });
    console.log('msg :'+phone+','+uploaded.avatar+','+uploaded.msg);
    User.update({phone},{avatar:uploaded.avatar}).exec(function(err,updated){
      console.log('result',updated);
      return res.redirect('homepage');
    });
  },

  datatable: function(req, res) {

    var tableDefinition = {
      // sTableName: 'Calls',
      sTableName: 'user',
      sSelectSql: '*',
      aSearchColumns: ['avatar','name','customer_group','company','phone', 'email', 'address','birthday','facebook','zalo','viber','notes','createdAt',]
    };

    var queryBuilder = new QueryBuilder(tableDefinition);
    var queryParams = req.allParams();
    var queries = queryBuilder.buildQuery(queryParams); //mai cuối tuần ông rãnh ah :D , h

    async function concurrent() {
      if (queries.recordsFiltered) {
        var recordsFiltered = new Promise((resolve, reject) => {
          User.query(queries.recordsFiltered, (err, data) => {
            if (err)
              reject(err);
            resolve(data);
          });
        })
      }

      let recordsTotal = new Promise((resolve, reject) => {
        User.query(queries.recordsTotal, (err, data) => {
          if (err)
            reject(err);
          resolve(data);
        });
      })

      let select = new Promise((resolve, reject) => {
        User.query(queries.select, (err, data) => {
          if (err)
            reject(err);
          resolve(data);
        });
      })

      let [recordsTotalRes, selectRes] = await Promise.all([recordsTotal, select]);

      let results = {recordsTotal: recordsTotalRes, select: selectRes};
      if (recordsFiltered) {
        let [recordsFilteredRes] = await Promise.all([recordsFiltered]);
        results.recordsFiltered = recordsFilteredRes;
      }
      res.json(queryBuilder.parseResponse(results));
    }
    concurrent();
  },
};

