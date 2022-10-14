const VentefrsDAO = require('../dao/ventefrs');

class VentefrsService {
  createVentefrs(VentefrsDto) {
    const {vente_id,fournisseur_id,chef_file } = VentefrsDto;
    return VentefrsDAO.createVentefrs(vente_id,fournisseur_id,chef_file);
  };
  getAllVentefrs(vente_id) {
    return VentefrsDAO.getAllVentefrs(vente_id);
  };
  getOneVentefrs(id) {
    return VentefrsDAO.getOneVentefrs(id);
  };
  removeVentefrs(id) {
    return VentefrsDAO.removeVentefrs(id);
  };
  updateVentefrs(id,changes) {
    return VentefrsDAO.updateVentefrs(id,changes);
  };
  
  getAllVenteFrsOffre(offre_id) {
    return VentefrsDAO.getAllVenteFrsOffre(offre_id);
  };

}

module.exports = new VentefrsService();