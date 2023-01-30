const planitemDAO = require('../dao/planitem');

class planitemService {

  
  createPlanitem(PlanitemDto) {
    const { num_ordre,plan_id,budget,typcredit,immobilisation,credit,centre_cout,projet,localisation,
      responsable,montant_estime,composante,montant_dispo,designation,type,mode,nbr_lot,agent_id,date_tech,
      date_dgcmef,date_off,temp,date_resultat,resultat,date_visite_site,date_demarrage,delai_exe,date_butoir,
      budget_travaux,observation,statut } = PlanitemDto;
    return planitemDAO.createPlanitem(num_ordre,plan_id,budget,typcredit,immobilisation,credit,centre_cout,projet,localisation,
      responsable,montant_estime,composante,montant_dispo,designation,type,mode,nbr_lot,agent_id,date_tech,
      date_dgcmef,date_off,temp,date_resultat,resultat,date_visite_site,date_demarrage,delai_exe,date_butoir,
      budget_travaux,observation,statut);
  };
  getAllPlanitem() {
    return planitemDAO.getAllPlanitem();
  };
  getOnePlanitem(id) {
    return planitemDAO.getOnePlanitem(id);
  };
  removePlanitem(id) {
    return planitemDAO.removePlanitem(id);
  };
  updatePlanitem(id,changes) {
    return planitemDAO.updatePlanitem(id,changes);
  };

  findPlanitem(annee) {
    return planitemDAO.findPlanitem(annee);
  };

  findPlanitemByAgent(agent_id,annee) {
    return planitemDAO.findPlanitemByAgent(agent_id,annee);
  };
  // nbrToatlLigne
  nbrTotalLigne(annee) {
    return planitemDAO.nbrTotalLigne(annee);
  };

  nbrReception(annee) {
    return planitemDAO.nbrReception(annee);
  };

  nbrLancement(annee) {
    return planitemDAO.nbrLancement(annee);
  };
  /*-----*/
  nbrLigneLoca(annee) {
    return planitemDAO.nbrLigneLoca(annee);
  };

  nbrLigneLocaDosstech(annee) {
    return planitemDAO.nbrLigneLocaDosstech(annee);
  };

  nbrLigneLocaLance(annee) {
    return planitemDAO.nbrLigneLocaLance(annee);
  };
  /*-------*/
  nbrLigneMode(annee){
        return planitemDAO.nbrLigneMode(annee);
  };
  /*--------------------*/
  nbrLigneAgent(annee){
    return planitemDAO.nbrLigneAgent(annee);

  };

  nbrLigneAgentDosstech(annee){
    return planitemDAO.nbrLigneAgentDosstech(annee);

  };

  nbrLigneAgentLance(annee){
  return planitemDAO.nbrLigneAgentLance(annee);

 };

}

module.exports = new planitemService();