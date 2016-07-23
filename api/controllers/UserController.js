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

  avatar : (req, res) => {
    req.file('avatar').upload({maxBytes: 10000000},function whenDone(err, uploadedFiles) {
      if (err) {
        return res.negotiate(err);
      }
      return res.json('file uploaded',uploadedFiles);
      // if (uploadedFiles.length ===0){
      //   return res.badRequest('No file was uploaded')
      // }

      // User.update(req.param('id'), {
      //   avatarUrl: require('util').format('%s/user/avatar/%s', sails.getBaseUrl(), req.session.me),
      //   avatarFd: uploadedFiles[0].fd
      // })
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

