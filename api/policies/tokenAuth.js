/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  let INCOMING_TOKEN = process.env.INCOMING_TOKEN || "myVerySec";

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  let params = req.allParams(); //sao ko thay nhac' cc gi ca
  if (typeof params.token != 'undefined' && params.token == INCOMING_TOKEN) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.json(500, {"message":"You are not King"});
  // return res.forbidden('You are not permitted to perform this action.');
};
