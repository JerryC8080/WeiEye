var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,
  tableName   : 'users',
  identity    : 'User',

  attributes: {
    id        : { type: 'string', unique: true, primaryKey: true},
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' }
  }
};

module.exports = User;
