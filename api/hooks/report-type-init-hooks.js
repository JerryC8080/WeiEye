/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  15/4/12
 * @description
 *
 */

var Promise = require("bluebird");

module.exports = function (sails) {
  return {
    initialize: function(cb) {
      sails.on('hook:orm:loaded', function() {
        var reportTypes = _.values(sails.config.report.report_types);
        Promise.map(reportTypes, function (_reportType) {
          return ReportType.find({name: _reportType.name}).then(function (reportType) {
            if (!reportType || reportType <= 0){
              return ReportType.create(_reportType);
            }
            return ReportType.update({id: reportType.id}, _reportType).then(function (reportTypes) {
              return reportTypes[0] || _reportType;
            });
          });
        }).then(function (reportTypes) {
          sails.log.info('The initialization of report types is completed : ');
          sails.log.info(reportTypes);
          return cb();
        }).catch(function (err) {
          sails.log.error('The initialization of report types is failure : ');
          sails.log.error(err);
        });
      });
    }
  };
};