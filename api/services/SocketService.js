/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  15/4/26
 * @description
 *
 */

module.exports = {
  emitEvent: emitEvent
};

/**
 * Emit analyze_msg event for given client by socket id
 * @param eventName
 * @param socketID
 * @param response
 */
function emitEvent(eventName, response, socketID) {
  if (socketID){
    sails.sockets.emit(socketID, eventName, response);
  }
}

