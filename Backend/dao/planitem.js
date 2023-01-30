const db = require('../db/db');

        

        class PlanitemDAO {
    
          async createPlanitem(num_ordre,plan_id,budget,typcredit,immobilisation,credit,centre_cout,projet,localisation,
                responsable,montant_estime,composante,montant_dispo,designation,type,mode,nbr_lot,agent_id,date_tech,
                date_dgcmef,date_off,temp,date_resultat,resultat,date_visite_site,date_demarrage,delai_exe,date_butoir,
                budget_travaux,observation,statut) {
            const [id] = await db('planitems')
              .insert({
                num_ordre: num_ordre,
                plan_id: plan_id, 
                budget: budget,
                typcredit: typcredit, 
                immobilisation: immobilisation, 
                credit: credit, 
                centre_cout: centre_cout, 
                projet: projet,
                localisation: localisation,
                montant_estime: montant_estime,
                composante: composante,
                montant_dispo: montant_dispo,
                designation: designation, 
                type: type,
                mode: mode,
                nbr_lot: nbr_lot, 
                responsable: responsable,
                agent_id: agent_id,
                date_tech: date_tech,
                date_dgcmef: date_dgcmef,
                date_off: date_off,
                temp: temp,
                date_resultat: date_resultat,
                resultat: resultat,
                date_visite_site: date_visite_site,
                date_demarrage: date_demarrage,
                delai_exe: delai_exe, 
                date_butoir: date_butoir,
                budget_travaux: budget_travaux,
                observation: observation,
                statut: statut
              })
              .returning('id');
            return id;
          };
        
          async getAllPlanitem() {
            return await db('planitems')
              .join('plans', 'plans.id', 'planitems.plan_id')
              .select(
                'plans.id as planID',
                'plans.annee as annee',
                'plans.statut as statut',
                'planitems.id as id',
                'planitems.num_ordre as num_ordre',
                'planitems.budget as budget',
                'planitems.typcredit as typcredit',
                'planitems.immobilisation as immobilisation',
                'planitems.credit as credit',
                'planitems.centre_cout as centre_cout',
                'planitems.projet as projet',
                'planitems.localisation as localisation',
                'planitems.responsable as responsable',
                'planitems.montant_estime as montant_estime',
                'planitems.composante as composante',
                'planitems.montant_dispo as montant_dispo',
                'planitems.designation as designation',
                'planitems.mode as mode',
                'planitems.nbr_lot as nbr_lot',
                'planitems.agent_id as agent_id',
                'planitems.date_tech as date_tech',
                'planitems.date_tech_reel as date_tech_reel',
                'planitems.date_dgcmef as date_dgcmef',
                'planitems.date_dgcmef_reel as date_dgcmef_reel',
                'planitems.date_off as date_off',
                'planitems.date_off_reel as date_off_reel',
                'planitems.temp as temp',
                'planitems.temp_reel as temp_reel',
                'planitems.date_resultat as date_resultat',
                'planitems.resultat as resultat',
                'planitems.date_visite_site as date_visite_site',
                'planitems.date_demarrage as date_demarrage',
                'planitems.date_reel_demarrage as date_reel_demarrage',
                'planitems.delai_exe as delai_exe',
                'planitems.delai_reel_exe as delai_reel_exe',
                'planitems.date_butoir as date_butoir',
                'planitems.date_reel_fin as date_reel_fin',
                'planitems.date_visite_site as date_visite_site',
                'planitems.budget_travaux as budget_travaux',
                'planitems.statut as item_statut'

              )
              .orderBy('planitems.num_ordre', 'asc')
              
          };
        
          async getOnePlanitem(id) {
            return await db('planitems')
            .join('plans', 'plans.id', 'planitems.plan_id')
            .join('budgets', 'budgets.id', 'planitems.budget')
            .join('immobilisations', 'budgets.id', 'planitems.immobilisation')
            .join('credits', 'budgets.id', 'planitems.credit')
            .join('typcredits', 'budgets.id', 'planitems.typcredit')
            .join('agents', 'budgets.id', 'planitems.agent_id')
            .join('modes', 'modes.id', 'planitems.mode')
            .join('types', 'types.id', 'planitems.type_id')
            .join('localisations', 'localisations.id', 'planitems.localisation')
            .select(
              'plans.id as planID',
              'plans.annee as annee',
              'plans.statut as statut',
              'planitems.id as id',
              'budgets.id as budget',
              'budgets.libelle as budget',
              'typcredits.id as typcredit',
              'typcredits.libelle as typcredit',
              'immobilisations.id as immobilisation',
              'immobilisations.libelle as immobilisation',
              'credits.id as credit',
              'credits.libelle as credit',
              'planitems.centre_cout as centre_cout',
              'localisations.id as localisation',
              'localisations.sigle as localisation',
              'planitems.responsable as responsable',
              'planitems.montant_estime as montant_estime',
              'planitems.montant_dispo as montant_dispo',
              'planitems.designation as designation',
              'types.id as type_id',
              'types.libelle as type',
              'modes.id as mode',
              'modes.libelle as mode',
              'planitems.nbr_lot as nbr_lot',
              'agents.id as agent',
              'agents.nom_prenom as agent',
              'planitems.date_tech as date_tech',
              'planitems.date_tech_reel as date_tech_reel',
              'planitems.date_dgcmef as date_dgcmef',
              'planitems.date_dgcmef_reel as date_dgcmef_reel',
              'planitems.date_off as date_off',
              'planitems.date_off_reel as date_off_reel',
              'planitems.temp as temp',
              'planitems.temp_reel as temp_reel',
              'planitems.date_resultat as date_resultat',
              'planitems.resultat as resultat',
              'planitems.date_visite_site as date_visite_site',
              'planitems.date_demarrage as date_demarrage',
              'planitems.date_demarrage_reel as date_demarrage_reel',
              'planitems.delai_exe as delai_exe',
              'planitems.delai_exe_reel as delai_exe_reel',
              'planitems.date_butoir as date_butoir',
              'planitems.budget_travaux as budget_travaux',
              'planitems.observation as observation'
            )
            .where({id}).first();
          };
          /*async getAllPlanitem() {
            return await db('planitems');
          };
        
          async getOnePlanitem(id) {
            return await db('planitems').where({id}).first();
          };*/
        
          async removePlanitem(id) {
            return await db('planitems').where({id}).del();
          };
        
          async updatePlanitem(id,changes) {
            return await db('planitems').where({id}).update(changes)
            .then(() =>{
              return db('planitems').where({id}).first();
            });
          };
        
          async findPlanitem(annee) {
            return await db('planitems')
            .join('plans', 'plans.id', 'planitems.plan_id')
            .select(
                'plans.id as planID',
                'plans.annee as annee',
                'plans.statut as statut',
                'planitems.id as id',
                'planitems.num_ordre as num_ordre',
                'planitems.budget as budget',
                'planitems.typcredit as typcredit',
                'planitems.immobilisation as immobilisation',
                'planitems.credit as credit',
                'planitems.centre_cout as centre_cout',
                'planitems.projet as projet',
                'planitems.localisation as localisation',
                'planitems.responsable as responsable',
                'planitems.montant_estime as montant_estime',
                'planitems.composante as composante',
                'planitems.montant_dispo as montant_dispo',
                'planitems.designation as designation',
                'planitems.mode as mode',
                'planitems.nbr_lot as nbr_lot',
                'planitems.agent_id as agent_id',
                'planitems.date_tech as date_tech',
                'planitems.date_dgcmef as date_dgcmef',
                'planitems.date_dgcmef_reel as date_dgcmef_reel',
                'planitems.date_off as date_off',
                'planitems.date_off_reel as date_off_reel',
                'planitems.temp as temp',
                'planitems.temp_reel as temp_reel',
                'planitems.date_resultat as date_resultat',
                'planitems.resultat as resultat',
                'planitems.date_visite_site as date_visite_site',
                'planitems.date_demarrage as date_demarrage',
                'planitems.date_reel_demarrage as date_reel_demarrage',
                'planitems.delai_exe as delai_exe',
                'planitems.delai_reel_exe as delai_reel_exe',
                'planitems.date_butoir as date_butoir',
                'planitems.date_reel_fin as date_reel_fin',
                'planitems.date_visite_site as date_visite_site',
                'planitems.budget_travaux as budget_travaux',
                'planitems.observation as observation',
                'planitems.statut as item_statut'
            )
            .where({annee})
            .orderBy('planitems.num_ordre', 'asc')
           
            
          };

          async findPlanitemByAgent(agent_id,annee) {
            return await db('planitems')
            .join('plans', 'plans.id', 'planitems.plan_id')
            .select(
                'plans.id as planID',
                'plans.annee as annee',
                'plans.statut as statut',
                'planitems.id as id',
                'planitems.num_ordre as num_ordre',
                'planitems.budget as budget',
                'planitems.typcredit as typcredit',
                'planitems.immobilisation as immobilisation',
                'planitems.credit as credit',
                'planitems.centre_cout as centre_cout',
                'planitems.projet as projet',
                'planitems.localisation as localisation',
                'planitems.responsable as responsable',
                'planitems.montant_estime as montant_estime',
                'planitems.composante as composante',
                'planitems.montant_dispo as montant_dispo',
                'planitems.designation as designation',
                'planitems.mode as mode',
                'planitems.nbr_lot as nbr_lot',
                'planitems.agent_id as agent_id',
                'planitems.date_tech as date_tech',
                'planitems.date_tech_reel as date_tech_reel',
                'planitems.date_dgcmef as date_dgcmef',
                'planitems.date_dgcmef_reel as date_dgcmef_reel',
                'planitems.date_off as date_off',
                'planitems.date_off_reel as date_off_reel',
                'planitems.temp as temp',
                'planitems.temp_reel as temp_reel',
                'planitems.date_resultat as date_resultat',
                'planitems.resultat as resultat',
                'planitems.date_visite_site as date_visite_site',
                'planitems.date_demarrage as date_demarrage',
                'planitems.date_reel_demarrage as date_reel_demarrage',
                'planitems.delai_exe as delai_exe',
                'planitems.delai_reel_exe as delai_reel_exe',
                'planitems.date_butoir as date_butoir',
                'planitems.date_reel_fin as date_reel_fin',
                'planitems.date_visite_site as date_visite_site',
                'planitems.budget_travaux as budget_travaux',
                'planitems.observation as observation',
                'planitems.statut as item_statut'
            )
            .where({agent_id,annee})
            .orderBy('planitems.num_ordre', 'asc')
          };


          /*-------------------------------TAUX GLOBAL-------*/
          async nbrTotalLigne(annee) {
            return await db('planitems')
            .join('plans', 'plans.id', 'planitems.plan_id')
            .select('planitems.budget as budget')
            .count('planitems.id as nbr_total')
            .where({annee})
            .groupBy('planitems.budget')
          };

          async nbrReception(annee) {
            return await db('planitems')
            .join('plans', 'plans.id', 'planitems.plan_id')
            .select('planitems.budget as budget')
            .count('planitems.id as nbr_recep')
            .whereNotNull('date_tech_reel')
            .groupBy('planitems.budget')
          };

          async nbrLancement(annee) {
            return await db('planitems')
            .join('plans', 'plans.id', 'planitems.plan_id')
            .select('planitems.budget as budget')
            .count('planitems.id as nbr_lanc')
            .whereNotNull('date_dgcmef_reel')
            .groupBy('planitems.budget')
          };
          /*-------LOCALISATION----*/
          async nbrLigneLoca(annee) {
            return await db('planitems')
            .join('plans', 'plans.id', 'planitems.plan_id')
            .count('planitems.id as nbr')
            .select(
              'planitems.localisation as localisation'
            )
            .groupBy('localisation')
          };

          async nbrLigneLocaDosstech(annee) {
            return await db('planitems')
            .join('plans', 'plans.id', 'planitems.plan_id')
            .count('planitems.id as nbr')
            .select(
              'planitems.localisation as localisation',
            )
            .whereNotNull('date_tech_reel')
            .groupBy('localisation')
          };

          async nbrLigneLocaLance(annee) {
            return await db('planitems')
            .join('plans', 'plans.id', 'planitems.plan_id')
            .count('planitems.id as nbr')
            .select(
              'planitems.localisation as localisation',
            )
            .whereNotNull('date_dgcmef_reel')
            .groupBy('localisation')
          };


           /*-------MODE----*/
           async nbrLigneMode(annee) {
            return await db('planitems')
            .join('plans', 'plans.id', 'planitems.plan_id')
            .count('planitems.id as nbr')
            .select(
              'planitems.mode as mode'
            )
            .where({annee})
            .groupBy('mode')
          };


           /*----------------AGENT---------------------------*/
           async nbrLigneAgent(annee) {
            return await db('planitems')
            .join('plans', 'plans.id', 'planitems.plan_id')
            .join('agents', 'agents.id', 'planitems.agent_id')
            .count('planitems.id as nbr')
            .select(
              'agents.nom_prenom as agent',
            )
            .where({annee})
            .groupBy('nom_prenom')
          };

          async nbrLigneAgentDosstech(annee) {
            return await db('planitems')
            .join('plans', 'plans.id', 'planitems.plan_id')
            .join('agents', 'agents.id', 'planitems.agent_id')
            .count('planitems.id as nbr')
            .select(
              'agents.nom_prenom as agent',
            )
            .whereNotNull('date_tech_reel')
            .groupBy('nom_prenom')
          };

          async nbrLigneAgentLance(annee) {
            return await db('planitems')
            .join('plans', 'plans.id', 'planitems.plan_id')
            .join('agents', 'agents.id', 'planitems.agent_id')
            .count('planitems.id as nbr')
            .select(
              'agents.nom_prenom as agent',
            )
            .whereNotNull('date_dgcmef_reel')
            .groupBy('nom_prenom')
          };
           /*----------------AGENT---------------------------*/
        }
        
        module.exports = new PlanitemDAO();