/**
 * AnalyzeController
 *
 * @description :: Server-side logic for managing analyzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	analyze: analyze,
  socketTest: socketTest
};

/**
 * Analyze Report
 * @param req
 * req.query: {
 *  statusMID
 *  target
 * }
 * @param res
 */
function analyze(req, res) {

  /**
   * TODO Create socket connect
   */

  /**
   * TODO Translate MID to ID
   * Use:
   * DataService.translateMIDToID(MID)
   */

  /**
   * TODO Get data from weibo API
   * Use:
   * DataService.downloadStatusInfo(ID)
   * DataService.downloadComments(ID)
   * DataService.downloadRepost(ID)
   */

  /**
   * TODO Analyze and generate report
   * Use:
   * ReportService.generateReport(ID)
   */

  /**
   * TODO Return report
   * Use:
   * Report.find(where).then(result)
   */
}

function socketTest(req, res) {
  if (!req.isSocket) return res.badRequest();

  var socketId = sails.sockets.id(req.socket);
  sails.log.info('socket id : ' + socketId);

  sails.sockets.emit(socketId, 'hi', {msg: 'hi'});
  sails.sockets.emit(socketId, 'hi', {msg: 'hello'});


  return res.ok('My socket ID is: ' + socketId);
}

