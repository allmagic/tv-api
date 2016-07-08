/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions (`true` allows public     *
   * access)                                                                  *
   *                                                                          *
   ********************************************************************* ******/



  '*': 'sessionAuth', //tat ca cac controller pog deu phai qua sessilonAuth - ong lam xong tui moi biet duong ma hieu
  //overwrite logincontroller pass policy rule
  'LoginController': {
    '*': true,
    'index': 'notSessionAuth',
  }, //rieng Login thi khong can qua sessionauth vi neu qua sessionauth thi no lai redir qua login

  //overwrite account de nta login
  // ma` gio cai nay cung chan luon chi rieng cai action login la dc pass
  'AccountController': {
    '*': true,//de test tao account cho de~
    'login': true,//tui danh dau ',' o duoi object de de~ duplicate, o node thi ok, con o json bth no se bao failed
  },

  'IncomingController' : 'tokenAuth',
  'UserController' : 'tokenAuth',

  // Enable all when dev
  '*': true,
  /***************************************************************************
   *                                                                          *
   * Here's an example of mapping some policies to run before a controller    *
   * and its actions                                                          *
   *                                                                          *
   ***************************************************************************/
  // RabbitController: {

  // Apply the `false` policy as the default for all of RabbitController's actions
  // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
  // '*': false,

  // For the action `nurture`, apply the 'isRabbitMother' policy
  // (this overrides `false` above)
  // nurture	: 'isRabbitMother',

  // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
  // before letting any users feed our rabbits
  // feed : ['isNiceToAnimals', 'hasRabbitFood']
  // }
};
