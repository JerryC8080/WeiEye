var Sails = require('sails');
var app;
before(function (done) {
  Sails.lift({
    // configuration for testing purposes
    log     : {
        level: 'info'
    },
    adapter: 'sails-disk',
    port: 8007
    // send test database connections down if needed
//    adapters: {
//        mysql: {
//            module  : 'sails-mysql',
//            host    : '127.0.0.1',
//            user    : 'root',
//            password: '',
//            database: 'wan_dev'
//        }
//    }
  }, function (err, sails) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    // save reference for teardown function
    app = sails;
    done(err, sails);
  });
});

after(function (done) {
    // here you can clear fixtures, etc.
    app.lower(done);
});
