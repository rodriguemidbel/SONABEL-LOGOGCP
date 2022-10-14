const lotDAO = require('../dao/lot');

class lotService {
  createLot(LotDto) {
    const { dossier_id,num_lot,intitule_lot,montant_lot,montant_vente,statut } = LotDto;
    return lotDAO.createLot(dossier_id,num_lot,intitule_lot,montant_lot,montant_vente,statut);
  };
  getAllLot() {
    return lotDAO.getAllLot();
  };
  getOneLot(id) {
    return lotDAO.getOneLot(id);
  };
  removeLot(id) {
    return lotDAO.removeLot(id);
  };
  updateLot(id,changes) {
    return lotDAO.updateLot(id,changes);
  };

  findLot(dossier_id){
      return lotDAO.findLot(dossier_id)
  }

  findLotInfruct(annee){
    return lotDAO.findLotInfruct(annee)
  }
  //  findLotInfruct
  
}

module.exports = new lotService();