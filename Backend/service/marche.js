const marcheDAO = require('../dao/marche');

class marcheService {
  createMarche(marcheDto) {
    const { mar_doss_id,lot_id,num_ref,objet,date_appro,date_notif,montant,devise,
      montant2,devise2,montant3,devise3,montant4,devise4,montant_total,devise_total,delai,
      attributaire,date_rem_sign,date_retour_sign,date_rem_enr,date_retour_enr,marche } = marcheDto;
      
    return marcheDAO.createMarche(mar_doss_id,lot_id,num_ref,objet,date_appro,date_notif,montant,devise,
      montant2,devise2,montant3,devise3,montant4,devise4,montant_total,devise_total,delai,
      attributaire,date_rem_sign,date_retour_sign,date_rem_enr,date_retour_enr,marche);
  };
  getAllMarche() {
    return marcheDAO.getAllMarche();
  };
  getOneMarche(id) {
    return marcheDAO.getOneMarche(id);
  };
  removeMarche(id) {
    return marcheDAO.removeMarche(id);
  };
  updateMarche(id,changes) {
    return marcheDAO.updateMarche(id,changes);
  };

  findMarche(mar_doss_id){
      return marcheDAO.findMarche(mar_doss_id)
  }

  getMarche(){
    return marcheDAO.getMarche()
}

nbrPassMarche(annee){
  return marcheDAO.nbrPassMarche(annee)
}
  
}

module.exports = new marcheService();