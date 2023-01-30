const express = require('express');
const usergroupController = require('../controller/usergroup');
const userController = require('../controller/user');
const modeController = require('../controller/mode');
const modepaiementController = require('../controller/modepaiement');
const fournisseurController = require('../controller/fournisseur');
const budgetController = require('../controller/budget');
const typcreditController = require('../controller/typcredit');
const immobilisationController = require('../controller/immobilisation');
const creditController = require('../controller/credit');
const typeController = require('../controller/type');
const agentController = require('../controller/agent');
const localisationController = require('../controller/localisation');
const planController = require('../controller/plan');
const planitemController = require('../controller/planitem');
const dossierController = require('../controller/dossier');
const lotController = require('../controller/lot');
const venteController = require('../controller/vente');
const caisseController = require('../controller/caisse');
const aviController = require('../controller/avi');
const caminvController = require('../controller/caminv');
const scaminvController = require('../controller/scaminv');
const offreController = require('../controller/offre');
const dossiertechController = require('../controller/dossiertech');
const proceverbController = require('../controller/proceverb');
const deliberationController = require('../controller/deliberation');
const analyseController = require('../controller/analyse');
const pubavisController = require('../controller/pubavis');
const pubresultatController = require('../controller/pubresultat');

const cautionController = require('../controller/caution');
const siteController = require('../controller/site');
const resultatController = require('../controller/resultat');
const marcheController = require('../controller/marche');
const ordreservController = require('../controller/ordreserv');

const pieceController = require('../controller/piece');
const dospieceController = require('../controller/dospiece');
const offpieceController = require('../controller/offpiece');

const courrierController = require('../controller/courrier');

const typreceptionController = require('../controller/typreception');
const receptionController = require('../controller/reception');

const ordresuspensionController = require('../controller/ordresuspension');
const ordrerepriseController = require('../controller/ordrereprise');
const avenantController = require('../controller/avenant');
const paiementController = require('../controller/paiement');

const fonctionaliteController = require('../controller/fonctionalite');
const privilegeController = require('../controller/privilege');
const logController = require('../controller/log');

const deviseController = require('../controller/devise');
const ventefrsController  = require('../controller/ventefrs');

const router = express.Router();

/*-------------------------USERGROUP---------------------------------*/
router.post('/createGroup', usergroupController.createUsergroup);
router.get('/getAllGroup', usergroupController.getAllUsergroup);
router.get('/getOneGroup/:id', usergroupController.getOneUsergroup);
router.delete('/removeGroup/:id', usergroupController.removeUsergroup);
router.patch('/updateGroup/:id', usergroupController.updateUsergroup);
/*-------------------------USER---------------------------------*/
router.post('/createUser', userController.createUser);
router.get('/getAllUser', userController.getAllUser);
router.get('/getOneUser/:id', userController.getOneUser);
router.delete('/removeUser/:id', userController.removeUser);
router.patch('/updateUser/:id', userController.updateUser);
router.get('/findGroupUser/:usergroup_id', userController.findGroupUser);
router.post('/login', userController.login);

/*-------------------------MODE---------------------------------*/
router.post('/createMode', modeController.createMode);
router.get('/getAllMode', modeController.getAllMode);
router.get('/getOneMode/:id', modeController.getOneMode);
router.delete('/removeMode/:id', modeController.removeMode);
router.patch('/updateMode/:id', modeController.updateMode);

/*-------------------------MODE PAIEMENT-------------------------*/
router.post('/createModepaie', modepaiementController.createModepaie);
router.get('/getAllModepaie', modepaiementController.getAllModepaie);
router.get('/getOneModepaie/:id', modepaiementController.getOneModepaie);
router.delete('/removeModepaie/:id', modepaiementController.removeModepaie);
router.patch('/updateModepaie/:id', modepaiementController.updateModepaie);

/*-------------------------FOURNISSEUR-------------------------*/
router.post('/createFournisseur', fournisseurController.createFournisseur);
router.get('/getAllFournisseur', fournisseurController.getAllFournisseur);
router.get('/getOneFournisseur/:id', fournisseurController.getOneFournisseur);
router.delete('/removeFournisseur/:id', fournisseurController.removeFournisseur);
router.patch('/updateFournisseur/:id', fournisseurController.updateFournisseur);

/*-------------------------BUDGET---------------------------------*/
router.post('/createBudget', budgetController.createBudget);
router.post('/createMultipleBudget', budgetController.createMultipleBudget);
router.get('/getAllBudget', budgetController.getAllBudget);
router.get('/getOneBudget/:id', budgetController.getOneBudget);
router.delete('/removeBudget/:id', budgetController.removeBudget);
router.patch('/updateBudget/:id', budgetController.updateBudget);

/*-------------------------TYPCREDIT---------------------------------*/
router.post('/createTypcredit', typcreditController.createTypcredit);
router.get('/getAllTypcredit', typcreditController.getAllTypcredit);
router.get('/getOneTypcredit/:id', typcreditController.getOneTypcredit);
router.delete('/removeTypcredit/:id', typcreditController.removeTypcredit);
router.patch('/updateTypcredit/:id', typcreditController.updateTypcredit);

/*-------------------------IMMOBILISATION---------------------------------*/
router.post('/createImmobilisation', immobilisationController.createImmobilisation);
router.get('/getAllImmobilisation', immobilisationController.getAllImmobilisation);
router.get('/getOneImmobilisation/:id', immobilisationController.getOneImmobilisation);
router.delete('/removeImmobilisation/:id', immobilisationController.removeImmobilisation);
router.patch('/updateImmobilisation/:id', immobilisationController.updateImmobilisation);

/*-------------------------CREDIT---------------------------------*/
router.post('/createCredit', creditController.createCredit);
router.get('/getAllCredit', creditController.getAllCredit);
router.get('/getOneCredit/:id', creditController.getOneCredit);
router.delete('/removeCredit/:id', creditController.removeCredit);
router.patch('/updateCredit/:id', creditController.updateCredit);


/*-------------------------TYPE---------------------------------*/
router.post('/createType', typeController.createType);
router.get('/getAllType', typeController.getAllType);
router.get('/getOneType/:id', typeController.getOneType);
router.delete('/removeType/:id', typeController.removeType);
router.patch('/updateType/:id', typeController.updateType);

/*-------------------------LOCALISATION---------------------------------*/
router.post('/createLocalisation', localisationController.createLocalisation);
router.get('/getAllLocalisation', localisationController.getAllLocalisation);
router.get('/getOneLocalisation/:id', localisationController.getOneLocalisation);
router.delete('/removeLocalisation/:id', localisationController.removeLocalisation);
router.patch('/updateLocalisation/:id', localisationController.updateLocalisation);
/*-------------------------AGENT---------------------------------*/
router.post('/createAgent', agentController.createAgent);
router.get('/getAllAgent', agentController.getAllAgent);
router.get('/getOneAgent/:id', agentController.getOneAgent);
router.delete('/removeAgent/:id', agentController.removeAgent);
router.patch('/updateAgent/:id', agentController.updateAgent);
/*-------------------------PLAN---------------------------------*/
router.post('/createPlan', planController.createPlan);
router.get('/getAllPlan', planController.getAllPlan);
router.get('/getOnePlan/:id', planController.getOnePlan);
router.delete('/removePlan/:id', planController.removePlan);
router.patch('/updatePlan/:id', planController.updatePlan);
router.get('/findPlan/:annee', planController.findPlan);
/*-------------------------PLANITEM---------------------------------*/
router.post('/createPlanitem', planitemController.createPlanitem);
router.get('/getAllPlanitem', planitemController.getAllPlanitem);
router.get('/getOnePlanitem/:id', planitemController.getOnePlanitem);
router.delete('/removePlanitem/:id', planitemController.removePlanitem);
router.patch('/updatePlanitem/:id', planitemController.updatePlanitem);
router.get('/findPlanitem/:annee', planitemController.findPlanitem);
router.get('/findPlanitemByAgent/:agent_id/:annee', planitemController.findPlanitemByAgent);


router.get('/nbrTotalLigne/:annee', planitemController.nbrTotalLigne);
router.get('/nbrReception/:annee', planitemController.nbrReception);
router.get('/nbrLancement/:annee', planitemController.nbrLancement);
//nbrToatlLigneGroup
router.get('/nbrLigneLoca/:annee', planitemController.nbrLigneLoca);
router.get('/nbrLigneMode/:annee', planitemController.nbrLigneMode);
router.get('/nbrLigneAgent/:annee', planitemController.nbrLigneAgent);



router.get('/nbrLigneLocaDosstech/:annee', planitemController.nbrLigneLocaDosstech);
router.get('/nbrLigneLocaLance/:annee', planitemController.nbrLigneLocaLance);


router.get('/nbrLigneAgentDosstech/:annee', planitemController.nbrLigneAgentDosstech);
router.get('/nbrLigneAgentLance/:annee', planitemController.nbrLigneAgentLance);
/*-------------------------DOSSIER TECH----------------------*/
router.post('/createDossiertech', dossiertechController.createDossiertech);
router.get('/getAllDossiertech', dossiertechController.getAllDossiertech);
router.get('/getOneDossiertech/:id', dossiertechController.getOneDossiertech);
router.delete('/removeDossiertech/:id', dossiertechController.removeDossiertech);
router.patch('/updateDossiertech/:id', dossiertechController.updateDossiertech);
router.get('/findDossiertech/:annee', dossiertechController.findDossiertech);

/*-------------------------ANALYSE----------------------*/
router.post('/createAnalyse', analyseController.createAnalyse);
router.get('/getAllAnalyse/:dossier_id', analyseController.getAllAnalyse);
router.get('/getOneAnalyse/:id', analyseController.getOneAnalyse);
router.delete('/removeAnalyse/:id', analyseController.removeAnalyse);
router.patch('/updateAnalyse/:id', analyseController.updateAnalyse);
router.get('/findAnalyse/:annee', analyseController.findAnalyse);

/*-------------------------DOSSIER---------------------------------*/
router.post('/createDossier', dossierController.createDossier);
router.get('/getAllDossier', dossierController.getAllDossier);
router.get('/getOneDossier/:id', dossierController.getOneDossier);
router.delete('/removeDossier/:id', dossierController.removeDossier);
router.patch('/updateDossier/:id', dossierController.updateDossier);
router.get('/findDossier/:annee', dossierController.findDossier);
router.get('/findDossierByAgent/:agent_id/:annee', dossierController.findDossierByAgent);
// dossierByMode
router.get('/dossierByMode/:annee', dossierController.dossierByMode);

router.get('/getDossier', dossierController.getDossier);

/*-------------------------LOT---------------------------------*/
router.post('/createLot', lotController.createLot);
router.get('/getAllLot', lotController.getAllLot);
router.get('/getOneLot/:id', lotController.getOneLot);
router.delete('/removeLot/:id', lotController.removeLot);
router.patch('/updateLot/:id', lotController.updateLot);
router.get('/findLot/:dossier_id', lotController.findLot);

router.get('/findLotInfruct/:annee', lotController.findLotInfruct);
/*-------------------------VENTE---------------------------------*/
router.post('/createVente', venteController.createVente);
router.get('/getAllVente', venteController.getAllVente);
router.get('/getOneVente/:id', venteController.getOneVente);
router.delete('/removeVente/:id', venteController.removeVente);
router.patch('/updateVente/:id', venteController.updateVente);
router.get('/findVente/:dossier_id', venteController.findVente);
router.get('/findFrsVente/:lot_id', venteController.findFrsVente);

router.get('/findVenteID/:lot_id/:fournisseur_id', venteController.findVenteID);

router.get('/countVentes/:annee', venteController.countVentes);
/*-------------------------CAISSE---------------------------------*/
router.post('/createCaisse', caisseController.createCaisse);
router.get('/getAllCaisse', caisseController.getAllCaisse);
router.get('/getOneCaisse/:id', caisseController.getOneCaisse);
router.delete('/removeCaisse/:id', caisseController.removeCaisse);
router.patch('/updateCaisse/:id', caisseController.updateCaisse);
router.get('/findCaisse/:vente_id', caisseController.findCaisse);

router.get('/countCaisses/:annee', caisseController.countCaisses);

/*-------------------------PAIEMENT---------------------------------*/
router.post('/createPaiement', paiementController.createPaiement);
router.get('/getAllPaiement/:dossier_id', paiementController.getAllPaiement);
router.get('/getOnePaiement/:id', paiementController.getOnePaiement);
router.delete('/removePaiement/:id', paiementController.removePaiement);
router.patch('/updatePaiement/:id', paiementController.updatePaiement);
router.get('/findPaiement/:dossier_id', paiementController.findPaiement);

/*-------------------------AVIS---------------------------------*/
router.post('/createAvi',aviController.createAvi);
router.get('/getAllAvi/:dossier_id', aviController.getAllAvi);
router.get('/getOneAvi/:id', aviController.getOneAvi);
router.delete('/removeAvi/:id', aviController.removeAvi);
router.patch('/updateAvi/:id', aviController.updateAvi);
router.get('/findAvi/:dossier_id', aviController.findAvi);
/*-------------------------CAMINV---------------------------------*/
router.post('/createCaminv', caminvController.createCaminv);
router.get('/getAllCaminv/:dossier_id', caminvController.getAllCaminv);
router.get('/getOneCaminv/:id', caminvController.getOneCaminv);
router.delete('/removeCaminv/:id', caminvController.removeCaminv);
router.patch('/updateCaminv/:id', caminvController.updateCaminv);
router.get('/findCaminv/:dossier_id', caminvController.findCaminv);
/*-------------------------SCAMINV---------------------------------*/
router.post('/createScaminv', scaminvController.createScaminv);
router.get('/getAllScaminv/:dossier_id', scaminvController.getAllScaminv);
router.get('/getOneScaminv/:id', scaminvController.getOneScaminv);
router.delete('/removeScaminv/:id', scaminvController.removeScaminv);
router.patch('/updateScaminv/:id', scaminvController.updateScaminv);
router.get('/findScaminv/:dossier_id', scaminvController.findScaminv);
/*-------------------------OFFRE---------------------------------*/
router.post('/createOffre',offreController.createOffre);
router.get('/getAllOffre/:off_doss_id', offreController.getAllOffre);
router.get('/getOneOffre/:id', offreController.getOneOffre);
router.delete('/removeOffre/:id', offreController.removeOffre);
router.patch('/updateOffre/:id', offreController.updateOffre);
router.get('/findOffre/:off_doss_id', offreController.findOffre);
/*-------------------------PROCEVERB---------------------------------*/
router.post('/createProceverb',proceverbController.createProceverb);
router.get('/getAllProceverb/:dossier_id', proceverbController.getAllProceverb);
router.get('/getOneProceverb/:id', proceverbController.getOneProceverb);
router.delete('/removeProceverb/:id', proceverbController.removeProceverb);
router.patch('/updateProceverb/:id', proceverbController.updateProceverb);
router.get('/findProceverb/:dossier_id', proceverbController.findProceverb);
/*-------------------------DELIBERATION---------------------------------*/
router.post('/createDeliberation',deliberationController.createDeliberation);
router.get('/getAllDeliberation/:dossier_id', deliberationController.getAllDeliberation);
router.get('/getOneDeliberation/:id', deliberationController.getOneDeliberation);
router.delete('/removeDeliberation/:id', deliberationController.removeDeliberation);
router.patch('/updateDeliberation/:id', deliberationController.updateDeliberation);
router.get('/findDeliberation/:dossier_id', deliberationController.findDeliberation);

/*-------------------------PUB AVIS BORDEREAU----------------------------*/
router.post('/createPubavis',pubavisController.createPubavis);
router.get('/getAllPubavis/:dossier_id', pubavisController.getAllPubavis);
router.get('/getOnePubavis/:id', pubavisController.getOnePubavis);
router.delete('/removePubavis/:id', pubavisController.removePubavis);
router.patch('/updatePubavis/:id', pubavisController.updatePubavis);
router.get('/findPubavis/:dossier_id', pubavisController.findPubavis);

/*-------------------------PUB RESULTAT BORDEREAU----------------------------*/
router.post('/createPubresultat',pubresultatController.createPubresultat);
router.get('/getAllPubresultat/:dossier_id', pubresultatController.getAllPubresultat);
router.get('/getOnePubresultat/:id', pubresultatController.getOnePubresultat);
router.delete('/removePubresultat/:id', pubresultatController.removePubresultat);
router.patch('/updatePubresultat/:id', pubresultatController.updatePubresultat);
router.get('/findPubresultat/:dossier_id', pubresultatController.findPubresultat);

/*-------------------------RESULTATS--------------------------------*/
router.post('/createResultat',resultatController.createResultat);
router.get('/getAllResultat/:dossier_id', resultatController.getAllResultat);
router.get('/getOneResultat/:id', resultatController.getOneResultat);
router.delete('/removeResultat/:id', resultatController.removeResultat);
router.patch('/updateResultat/:id', resultatController.updateResultat);
router.get('/findResultat/:dossier_id', resultatController.findResultat);
/*-------------------------MARCHES----------------------------------*/
router.post('/createMarche',marcheController.createMarche);
router.get('/getAllMarche', marcheController.getAllMarche);
router.get('/getOneMarche/:id', marcheController.getOneMarche);
router.delete('/removeMarche/:id', marcheController.removeMarche);
router.patch('/updateMarche/:id', marcheController.updateMarche);
router.get('/findMarche/:mar_doss_id', marcheController.findMarche);

router.get('/getMarche', marcheController.getMarche);
//marcheGroupByDoss
router.get('/marcheGroupByDoss', marcheController.marcheGroupByDoss);

router.get('/nbrPassMarche/:annee', marcheController.nbrPassMarche);
/*-------------------------CAUTIONS---------------------------------*/
router.post('/createCaution',cautionController.createCaution);
router.get('/getAllCaution', cautionController.getAllCaution);
router.get('/getOneCaution/:id', cautionController.getOneCaution);
router.delete('/removeCaution/:id', cautionController.removeCaution);
router.patch('/updateCaution/:id', cautionController.updateCaution);
router.get('/findCaution/:cau_doss_id', cautionController.findCaution);
/*-------------------------REMISE DE SITE---------------------------------*/
router.post('/createSite',siteController.createSite);
router.get('/getAllSite', siteController.getAllSite);
router.get('/getOneSite/:id', siteController.getOneSite);
router.delete('/removeSite/:id', siteController.removeSite);
router.patch('/updateSite/:id', siteController.updateSite);
router.get('/findSite/:marche_id', siteController.findSite);
/*-------------------------ORDRE SERVICE----------------------------*/
//ordreservController
router.post('/createOrdreserv',ordreservController.createOrdreserv);
router.get('/getAllOrdreserv', ordreservController.getAllOrdreserv);
router.get('/getOneOrdreserv/:id', ordreservController.getOneOrdreserv);
router.delete('/removeOrdreserv/:id', ordreservController.removeOrdreserv);
router.patch('/updateOrdreserv/:id', ordreservController.updateOrdreserv);
router.get('/findOrdreserv/:marche_id', ordreservController.findOrdreserv);
/*-------------------------COURRIERS---------------------------------*/
router.post('/createCourrier',courrierController.createCourrier);
router.get('/getAllCourrier', courrierController.getAllCourrier);
router.get('/getOneCourrier/:id', courrierController.getOneCourrier);
router.delete('/removeCourrier/:id', courrierController.removeCourrier);
router.patch('/updateCourrier/:id', courrierController.updateCourrier);
router.get('/findCourrier/:dossier_id', courrierController.findCourrier);
/*-------------------------TYPE RECEPTION---------------------*/
router.post('/createTypreception',typreceptionController.createTypreception);
router.get('/getAllTypreception', typreceptionController.getAllTypreception);
router.get('/getOneTypreception/:id', typreceptionController.getOneTypreception);
router.delete('/removeTypreception/:id', typreceptionController.removeTypreception);
router.patch('/updateTypreception/:id', typreceptionController.updateTypreception);
/*-------------------------RECEPTION---------------------*/
router.post('/createReception',receptionController.createReception);
router.get('/getAllReception', receptionController.getAllReception);
router.get('/getOneReception/:id', receptionController.getOneReception);
router.delete('/removeReception/:id', receptionController.removeReception);
router.patch('/updateReception/:id', receptionController.updateReception);

/*-------------------------ORDRE SUSPENSION---------------------*/
router.post('/createOrdresus',ordresuspensionController.createOrdresus);
router.get('/getAllOrdresus', ordresuspensionController.getAllOrdresus);
router.get('/getOneOrdresus/:id', ordresuspensionController.getOneOrdresus);
router.delete('/removeOrdresus/:id', ordresuspensionController.removeOrdresus);
router.patch('/updateOrdresus/:id', ordresuspensionController.updateOrdresus);
router.get('/findOrdresus/:marche_id', ordreservController.findOrdreserv);
/*-------------------------ORDRE REPRISE---------------------*/
router.post('/createOrdrerep',ordrerepriseController.createOrdrerep);
router.get('/getAllOrdrerep', ordrerepriseController.getAllOrdrerep);
router.get('/getOneOrdrerep/:id', ordrerepriseController.getOneOrdrerep);
router.delete('/removeOrdrerep/:id', ordrerepriseController.removeOrdrerep);
router.patch('/updateOrdrerep/:id', ordrerepriseController.updateOrdrerep);
router.get('/findOrdrerep/:marche_id', ordreservController.findOrdreserv);
/*-------------------------AVENANT---------------------*/
router.post('/createAvenant',avenantController.createAvenant);
router.get('/getAllAvenant', avenantController.getAllAvenant);
router.get('/getOneAvenant/:id', avenantController.getOneAvenant);
router.delete('/removeAvenant/:id', avenantController.removeAvenant);
router.patch('/updateAvenant/:id', avenantController.updateAvenant);
/*-------------------------PAIEMENT---------------------*/
router.post('/createPaiement',paiementController.createPaiement);
router.get('/getAllPaiement', paiementController.getAllPaiement);
router.get('/getOnePaiement/:id', paiementController.getOnePaiement);
router.delete('/removePaiement/:id', paiementController.removePaiement);
router.patch('/updatePaiement/:id', paiementController.updatePaiement);
/*-------------------------FONCTIONALITE---------------------------------*/
router.post('/createFonctionalite', fonctionaliteController.createFonctionalite);
router.get('/getAllFonctionalite', fonctionaliteController.getAllFonctionalite);
router.get('/getOneFonctionalite/:id', fonctionaliteController.getOneFonctionalite);
router.delete('/removeFonctionalite/:id', fonctionaliteController.removeFonctionalite);
router.patch('/updateFonctionalite/:id', fonctionaliteController.updateFonctionalite);
/*-------------------------PRIVILEGE---------------------------------*/
router.post('/createPrivilege', privilegeController.createPrivilege);
router.get('/getAllPrivilege', privilegeController.getAllPrivilege);

router.get('/recherche/:usergroup_id/:fonctionalite_id', privilegeController.recherche);

router.get('/getOnePrivilege/:id', privilegeController.getOnePrivilege);
router.delete('/removePrivilege/:id', privilegeController.removePrivilege);
router.patch('/updatePrivilege/:id', privilegeController.updatePrivilege);
/*-------------------------LOG---------------------------------*/
router.post('/createLog', logController.createLog);
router.get('/getAllLog', logController.getAllLog);

router.get('/findLog', logController.findLog);


router.get('/getOneLog/:id', logController.getOneLog);
router.delete('/removeLog/:id', logController.removeLog);
router.patch('/updateLog/:id', logController.updateLog);
/*-------------------------Devise---------------------------------*/
router.post('/createDevise', deviseController.createDevise);
router.get('/getAllDevise', deviseController.getAllDevise);


router.get('/getOneDevise/:id', deviseController.getOneDevise);
router.delete('/removeDevise/:id', deviseController.removeDevise);
router.patch('/updateDevise/:id', deviseController.updateDevise);
/*-------------------------VENTE FRS----------------------------*/
router.post('/createVentefrs',ventefrsController.createVentefrs);
router.get('/getAllVentefrs/:vente_id', ventefrsController.getAllVentefrs);
router.get('/getOneVentefrs/:id', ventefrsController.getOneVentefrs);
router.delete('/removeVentefrs/:id', ventefrsController.removeVentefrs);
router.patch('/updateVentefrs/:id', ventefrsController.updateVentefrs);
router.get('/getAllVenteFrsOffre/:offre_id', ventefrsController.getAllVenteFrsOffre);

module.exports = router;
