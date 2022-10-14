const creditDAO = require('../dao/credit');

class CreditService {
  createCredit(CreditDto) {
    const { libelle } = CreditDto;
    return creditDAO.createCredit(libelle);
  };

  createMultipleCredit(data) {
    return creditDAO.createCredit(data);
  };


  getAllCredit() {
    return creditDAO.getAllCredit();
  };
  getOneCredit(id) {
    return creditDAO.getOneCredit(id);
  };
  removeCredit(id) {
    return creditDAO.removeCredit(id);
  };
  updateCredit(id,changes) {
    return creditDAO.updateCredit(id,changes);
  };
  
}

module.exports = new CreditService();