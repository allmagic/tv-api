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

  // chuyen qua xai headers
  let INCOMING_TOKEN = process.env.INCOMING_TOKEN || "myVerySec";

  let params = req.allParams(); //sao ko thay nhac' cc gi ca
  if (typeof params.token != 'undefined' && params.token == INCOMING_TOKEN) {
    return next();
  }

  return res.json(500, {"message":"You are not authorized, please add 'token' to param"});
};
