const venteDAO = require('../dao/vente');

class VenteService {
  createVente(VenteDto) {
    const { num_vente,lot_id,fournisseur_id,date_vente,heure_vente,montant,acheteur,contact_acheteur,statut,grpent } = VenteDto;
    return venteDAO.createVente(num_vente,lot_id,fournisseur_id,date_vente,heure_vente,montant,acheteur,contact_acheteur,statut,grpent);
  };
  getAllVente() {
    return venteDAO.getAllVente();
  };
  getOneVente(id) {
    return venteDAO.getOneVente(id);
  };
  removeVente(id) {
    return venteDAO.removeVente(id);
  };
  updateVente(id,changes) {
    return venteDAO.updateVente(id,changes);
  };

  findVente(dossier_id){
    return venteDAO.findVente(dossier_id);
  }

  findFrsVente(lot_id){
    return venteDAO.findFrsVente(lot_id);
  }

  findVenteID(lot_id,fournisseur_id){
    return venteDAO.findVenteID(lot_id,fournisseur_id);
  }
  
}

module.exports = new VenteService();