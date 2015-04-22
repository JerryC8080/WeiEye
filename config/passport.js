/**
 * Passport configuration
 *
 * This if the configuration for your Passport.js setup and it where you'd
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

var domain = 'http://www.weieye.com:1337';

module.exports.passport = {
  local: {
    strategy: require('passport-local').Strategy
  },

  sina: {
    name: 'sina',
    protocol: 'oauth2',
    strategy: require('passport-sina').Strategy,
    options: {
      clientID: '4014020605',
      clientSecret: 'baa21a20ba578c3636e49577a3156133',
      callbackURL: domain + '/auth/sina/callback'
    }
  }
};
