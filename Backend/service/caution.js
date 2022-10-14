const cautionDAO = require('../dao/caution');

class cautionService {
  createCaution(CautionDto) {
    const { cau_doss_id,lot_id,soumissionaire,date_caution,banque,montant_caution,caution } = CautionDto;
    return cautionDAO.createCaution(cau_doss_id,lot_id,soumissionaire,date_caution,banque,montant_caution,caution);
  };
  getAllCaution() {
    return cautionDAO.getAllCaution();
  };
  getOneCaution(id) {
    return cautionDAO.getOneCaution(id);
  };
  removeCaution(id) {
    return cautionDAO.removeCaution(id);
  };
  updateCaution(id,changes) {
    return cautionDAO.updateCaution(id,changes);
  };

  findCaution(cau_doss_id){
      return cautionDAO.findCaution(cau_doss_id)
  }

  
  
}

module.exports = new cautionService();