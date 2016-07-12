/**
 * CallController
 *
 * @description :: Server-side logic for managing calls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
import QueryBuilder from 'datatable';

module.exports = {
  action: function(req, res) {

    var tableDefinition = {
      sTableName: 'Calls',
      aSearchColumns: ['content','owner','staffNo', 'callID']
    };

    var queryBuilder = new QueryBuilder(tableDefinition);

    var queryParams = req.allParams();

    var queries = queryBuilder.buildQuery(queryParams);

    async function concurrent() {
      if (queries.recordsFiltered) {
        var recordsFiltered = new Promise((resolve, reject) => {
          Calls.query(queries.recordsFiltered, (err, data) => {
            if (err)
              reject(err);
            resolve(data);
          });
        })
      }

      let recordsTotal = new Promise((resolve, reject) => {
        Calls.query(queries.recordsTotal, (err, data) => {
          if (err)
            reject(err);
          resolve(data);
        });
      })

      let select = new Promise((resolve, reject) => {
        Calls.query(queries.select, (err, data) => {
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
  }
};

