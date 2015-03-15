/**
 * AnalyzeController
 *
 * @description :: Server-side logic for managing analyzes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	analyze: analyze
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

