const fournisseurDAO = require('../dao/fournisseur');

class FournisseurService {
  createFournisseur(FournisseurDto) {
    const { nom_four,rccm,ifu,telephone1,telephone2,adresse,email,domaine,type } = FournisseurDto;
    return fournisseurDAO.createFournisseur(nom_four,rccm,ifu,telephone1,telephone2,adresse,email,domaine,type);
  };
  getAllFournisseur() {
    return fournisseurDAO.getAllFournisseur();
  };
  getOneFournisseur(id) {
    return fournisseurDAO.getOneFournisseur(id);
  };
  removeFournisseur(id) {
    return fournisseurDAO.removeFournisseur(id);
  };
  updateFournisseur(id,changes) {
    return fournisseurDAO.updateFournisseur(id,changes);
  };
  
}

module.exports = new FournisseurService();