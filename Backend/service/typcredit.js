const TypcreditDAO = require('../dao/typcredit');

class TypcreditService {
  createTypcredit(TypcreditDto) {
    const { libelle } = TypcreditDto;
    return TypcreditDAO.createTypcredit(libelle);
  };

  getAllTypcredit() {
    return TypcreditDAO.getAllTypcredit();
  };
  getOneTypcredit(id) {
    return TypcreditDAO.getOneTypcredit(id);
  };
  removeTypcredit(id) {
    return TypcreditDAO.removeTypcredit(id);
  };
  updateTypcredit(id,changes) {
    return TypcreditDAO.updateTypcredit(id,changes);
  };
  
}

module.exports = new TypcreditService();