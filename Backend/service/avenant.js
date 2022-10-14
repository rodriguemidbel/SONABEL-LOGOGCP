const AvenantDAO = require('../dao/avenant');

class AvenantService {
    createAvenant(OrdreservDto) {
    const { marche_id,num_avenant,date_avenant,objet_avenant,motif_avenant,montant_avenant,delai_avenant } = OrdreservDto;
    return AvenantDAO.createAvenant(marche_id,num_avenant,date_avenant,objet_avenant,motif_avenant,montant_avenant,delai_avenant);
  };
  getAllAvenant() {
    return AvenantDAO.getAllAvenant();
  };
  getOneAvenant(id) {
    return AvenantDAO.getOneAvenant(id);
  };
  removeAvenant(id) {
    return AvenantDAO.removeAvenant(id);
  };
  updateAvenant(id,changes) {
    return AvenantDAO.updateAvenant(id,changes);
  };

  findAvenant(marche_id){
      return AvenantDAO.findAvenant(marche_id)
  }
  
}

module.exports = new AvenantService();