const logDAO = require('../dao/log');

class LogService {
  createLog(LogDto) {
    const { user_id,action } = LogDto;
    return logDAO.createLog(user_id,action);
  };
  getAllLog() {
    return logDAO.getAllLog();
  };
  getOneLog(id) {
    return logDAO.getOneLog(id);
  };
  removeLog(id) {
    return logDAO.removeLog(id);
  };
  updateLog(id,changes) {
    return logDAO.updateLog(id,changes);
  };
  findLog() {
    return logDAO.findLog();
  };
  
}

module.exports = new LogService();