/**
* Administrator.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema      : true,
  tableName   : 'administrators',
  identity    : 'Administrator',

  attributes: {
    username: {type: 'string', minLength: 8},
    password: {type: 'string', minLength: 8}
  }
};

