/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  models: {
    connection: 'localDiskDb',
    migrate: 'alter'//drop no xoa het:s cho no sach
  }

  // models: {
  //   connection: 'mysqldb',
  //   migrate: 'alter'//drop no xoa het:s cho no sach
  // },
  // connections: {
  //   mysqldb: {
  //     adapter: 'sails-mysql',
  //     host: 'localhost',
  //     port: 3306,
  //     user: 'root', //optional
  //     password: '', //optional
  //     database: 'taovang_crm_mysql' //optional
  //   }
  // },
};
// =]]
