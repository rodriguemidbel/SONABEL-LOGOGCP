
exports.up = function(knex) {
    return knex.schema.createTable('usergroups', (table) => {
        table.increments('id');
        table.string('name').notNullable();
        table.timestamps(true, true);
      })
      .createTable('fonctionalites', (table) => {
        table.increments('id');
        table.string('libelle').notNullable();
        table.string('description');
        table.integer('created_by');
        table.integer('modified_by');
        table.timestamps(true, false);
      })
      .createTable('privileges', (table) => {
        table.increments('id');
        table.integer('usergroup_id').references('id').inTable('usergroups').notNullable();
        table.integer('fonctionalite_id').references('id').inTable('fonctionalites').notNullable();
        table.boolean('view').defaultTo(false);
        table.boolean('add').defaultTo(false);
        table.boolean('edit').defaultTo(false);
        table.boolean('remove').defaultTo(false);
        table.integer('created_by');
        table.integer('modified_by');
        table.timestamps(true, false);
      })
      
      .createTable('modes', (table) => {
        table.increments('id');
        table.string('libelle').notNullable();
        table.string('description');
        table.timestamps(true, true);
      })
      .createTable('modepaiements', (table) => {
        table.increments('id');
        table.string('libelle').notNullable();
        table.timestamps(true, true);
      })
      .createTable('fournisseurs', (table) => {
        table.increments('id');
        table.string('nom_four');
        table.string('rccm');
        table.string('ifu');
        table.string('telephone1');
        table.string('telephone2');
        table.string('adresse');
        table.string('email');
        table.string('domaine');
        table.string('type');
        table.boolean('select').defaultTo(false);
        table.boolean('chef').defaultTo(false);
        table.timestamps(true, true);
      })
      .createTable('budgets', (table) => {
        table.increments('id');
        table.string('libelle').notNullable();
        table.timestamps(true, true);
      })
      .createTable('pieces', (table) => {
        table.increments('id');
        table.string('libelle').notNullable();
        table.timestamps(true, true);
      })
      .createTable('types', (table) => {
        table.increments('id');
        table.string('libelle').notNullable();
        table.timestamps(true, true);
      })
      .createTable('typcredits', (table) => {
        table.increments('id');
        table.string('libelle').notNullable();
        table.timestamps(true, true);
      })
      .createTable('credits', (table) => {
        table.increments('id');
        table.string('libelle').notNullable();
        table.timestamps(true, true);
      })
      .createTable('immobilisations', (table) => {
        table.increments('id');
        table.string('libelle').notNullable();
        table.timestamps(true, true);
      })
      .createTable('localisations', (table) => {
        table.increments('id');
        table.string('sigle');
        table.string('libelle')
        table.timestamps(true, true);
      })
      .createTable('agents', (table) => {
        table.increments('id');
        table.string('nom_prenom').notNullable();
        table.string('telephone');
        table.string('email');
        table.string('fonction');
        table.string('service');
        table.integer('localisation_id').references('id').inTable('localisations');
        table.string('distinction');
        table.boolean('signat').defaultTo(false);
        table.timestamps(true, true);
      })
      .createTable('users', (table) => {
        table.increments('id');
        table.integer('usergroup_id').references('id').inTable('usergroups');
        table.integer('agent_id').references('id').inTable('agents');
        table.string('name').notNullable();
        table.string('username');
        table.string('password');
        table.string('telephone');
        table.string('email');
        table.string('adresse');
        table.boolean('statut').defaultTo(true);
        table.boolean('isconnected');
        table.timestamps(true, true);
      })
      .createTable('logs', (table) => {
        table.increments('id');
        table.integer('user_id').references('id').inTable('users').notNullable();
        table.string('action').notNullable();
        table.integer('created_by');
        table.integer('modified_by');
        table.timestamps(true, false);
      })
      .createTable('devises', (table) => {
        table.increments('id');
        table.string('libelle').notNullable();
        table.string('symbole').notNullable();
        table.timestamps(true, true);
      })
      .createTable('plans', (table) => {
        table.increments('id');
        table.integer('annee').notNullable();
        table.date('date_plan');
        table.string('statut');
        table.timestamps(true, true);
      })
      .createTable('planitems', (table) => {
        table.increments('id');
        table.integer('num_ordre');
        table.integer('plan_id').references('id').inTable('plans');
        table.string('budget');
        table.string('typcredit');
        table.string('immobilisation');
        table.string('credit');
        table.string('centre_cout');
        table.string('projet');
        table.string('localisation');
        table.string('responsable');
        table.integer('montant_estime');
        table.string('composante');
        table.integer('montant_dispo');
        table.string('designation');
        table.string('type');
        table.string('mode');
        table.string('nbr_lot');
        table.integer('agent_id').references('id').inTable('agents');
        table.string('date_tech');
        table.string('date_tech_reel');
        table.string('date_dgcmef');
        table.string('date_dgcmef_reel');
        table.string('date_off');
        table.string('date_off_reel');
        table.integer('temp');
        table.integer('temp_reel');
        table.string('date_resultat');
        table.string('resultat');
        table.string('date_visite_site');
        table.string('date_demarrage');
        table.string('date_reel_demarrage');
        table.integer('delai_exe');
        table.integer('delai_reel_exe');
        table.string('date_butoir');
        table.string('date_reel_fin');
        table.string('budget_travaux');
        table.string('observation');
        table.string('statut');
        table.string('num_doss');
        table.string('intitule_doss');
        table.timestamps(true, true);
      })
      .createTable('dossiertechs', (table) => {
        table.increments('id');
        table.integer('planitem_id').references('id').inTable('planitems');
        table.string('date_tech_reel');
        table.string('service');
        table.string('dossiertech');
        table.timestamps(true, true);
      })
      .createTable('dossiers', (table) => {
        table.increments('id');
        table.integer('planitem_id').references('id').inTable('planitems');
        table.string('numero_doss');
        table.string('intitule_doss').notNullable();
        table.string('date_trans_sign');
        table.string('date_retour_sign');
        table.string('date_trans_dgcmef');
        table.string('taux_reception');
        table.string('niveau_traitement');
        table.string('taux_avencement');
        table.string('dossier');
        table.string('statut');
        table.timestamps(true, true);
      })
      .createTable('dospieces', (table) => {
        table.increments('id');
        table.integer('dossier_id').references('id').inTable('dossiers');
        table.integer('piece_id').references('id').inTable('pieces');
        table.timestamps(true, true);
      })
      .createTable('lots', (table) => {
        table.increments('id');
        table.integer('dossier_id').references('id').inTable('dossiers');
        table.string('num_lot').notNullable();
        table.string('intitule_lot').notNullable();
        table.integer('montant_lot');
        table.integer('montant_vente');
        table.string('statut');
        table.timestamps(true, true);
      })
      .createTable('ventes', (table) => {
        table.increments('id');
        table.string('num_vente');
        table.integer('lot_id').references('id').inTable('lots').notNullable();
        table.integer('fournisseur_id').references('id').inTable('fournisseurs').notNullable();
        table.string('date_vente');
        table.string('heure_vente');
        table.string('montant');
        table.string('acheteur');
        table.string('contact_acheteur');
        table.string('statut');
        table.integer('grpent');
        table.timestamps(true, true);
      })
      .createTable('caisses', (table) => {
        table.increments('id');
        table.string('num_recu');
        table.string('date_recu');
        table.integer('vente_id').references('id').inTable('ventes');
        table.integer('modepaiement_id').references('id').inTable('modepaiements');
        table.string('ref_virement');
        table.timestamps(true, true);
      })
      .createTable('avis', (table) => {
        table.increments('id');
        table.string('num_publi');
        table.string('date_envoi');
        table.string('date_publi');
        table.string('fichier');
        table.integer('dossier_id').references('id').inTable('dossiers');
        table.timestamps(true, true);
      })
      .createTable('pubavis', (table) => {
        table.increments('id');
        table.string('date_bordereau');
        table.string('fichier');
        table.string('observation');
        table.integer('dossier_id').references('id').inTable('dossiers');
        table.timestamps(true, true);
      })
      .createTable('caminvs', (table) => {
        table.increments('id');
        table.integer('dossier_id').references('id').inTable('dossiers');
        table.string('date_cam');
        table.string('heure_cam');
        table.string('lieu_cam');
        table.string('membre_cam');
        table.string('ampliation');
        table.string('president_cam');
        table.string('distinc_presi_cam');
        table.timestamps(true, true);
      })
      .createTable('scaminvs', (table) => {
        table.increments('id');
        table.integer('dossier_id').references('id').inTable('dossiers');
        table.string('date_scam');
        table.string('heure_scam');
        table.string('lieu_scam');
        table.string('membre_scam');
        table.string('ampliation');
        table.string('president_sct');
        table.string('distinc_presi_sct');
        table.timestamps(true, true);
      })
      .createTable('offres', (table) => {
        table.increments('id');
        table.integer('off_doss_id').references('id').inTable('dossiers');
        table.integer('lot_id').references('id').inTable('lots').notNullable();
        table.integer('entreprise_cons').references('id').inTable('fournisseurs').notNullable();
        table.string('date_depot');
        table.string('heure_depot');
        table.string('nom_prenom_dep');
        table.string('telephone_dep');
        table.integer('montant_offre');
        table.integer('montant_corrige');
        table.boolean('asf').defaultTo(false);
        table.boolean('asc').defaultTo(false);
        table.boolean('ajt').defaultTo(false);
        table.boolean('drtss').defaultTo(false);
        table.boolean('rccm').defaultTo(false);
        table.boolean('cnf').defaultTo(false);
        table.boolean('caut').defaultTo(false);
        table.string('fichier_caution');
        table.timestamps(true, true);
      })
      .createTable('proceverbs', (table) => {
        table.increments('id');
        table.integer('dossier_id').references('id').inTable('dossiers');
        table.string('date_convocation');
        table.string('date_transpv_sign');
        table.string('date_retourpv_sign');
        table.string('date_transpv_dgcmef');
        table.string('pv');
        table.timestamps(true, true);
      })
      .createTable('deliberations', (table) => {
        table.increments('id');
        table.integer('dossier_id').references('id').inTable('dossiers');
        table.string('date_convocation');
        table.string('date_transpv_sign');
        table.string('date_retourpv_sign');
        table.string('date_transpv_dgcmef');
        table.string('pvdeliberation');
        table.timestamps(true, true);
      })
      .createTable('analyses', (table) => {
        table.increments('id');
        table.integer('dossier_id').references('id').inTable('dossiers');
        table.string('date_convocation');
        table.string('date_effec_ana');
        table.string('date_trans_dgcmef');
        table.string('observation');
        table.string('rapport');
        table.timestamps(true, true);
      })
      .createTable('resultats', (table) => {
        table.increments('id');
        table.integer('dossier_id').references('id').inTable('dossiers');
        table.string('date_par_res');
        table.string('num_par_res');
        table.string('attributaire');
        table.string('litige');
        table.string('fichierpub');
        table.string('fichierlitige');
        table.timestamps(true, true);
      })
      .createTable('pubresultats', (table) => {
        table.increments('id');
        table.string('num_bordereau');
        table.string('date_bordereau');
        table.integer('dossier_id').references('id').inTable('dossiers');
        table.timestamps(true, true);
      })
      .createTable('marches', (table) => {
        table.increments('id');
        table.integer('mar_doss_id').references('id').inTable('dossiers');
        table.integer('lot_id').references('id').inTable('lots');
        table.string('num_ref');
        table.string('objet');
        table.string('date_appro');
        table.string('date_notif');
        table.integer('montant');
        table.string('devise');
        table.integer('montant2');
        table.string('devise2');
        table.integer('montant3');
        table.string('devise3');
        table.integer('montant4');
        table.string('devise4');
        table.integer('montant_total');
        table.string('devise_total');
        table.string('delai');
        table.integer('attributaire').references('id').inTable('fournisseurs').notNullable();
        table.string('date_rem_sign');
        table.string('date_retour_sign');
        table.string('date_rem_enr');
        table.string('date_retour_enr');
        table.string('marche');
        table.timestamps(true, true);
      })
      .createTable('cautions', (table) => {
        table.increments('id');
        table.integer('cau_doss_id').references('id').inTable('dossiers');
        table.integer('lot_id').references('id').inTable('lots');
        table.integer('soumissionaire').references('id').inTable('fournisseurs').notNullable();
        table.string('date_caution');
        table.string('banque');
        table.string('montant_caution');
        table.string('caution');
        table.timestamps(true, true);
      })
      .createTable('sites', (table) => {
        table.increments('id');
        table.integer('marche_id').references('id').inTable('marches');
        table.string('date_rem_site');
        table.timestamps(true, true);
      })
      .createTable('ordreservs', (table) => {
        table.increments('id');
        table.integer('marche_id').references('id').inTable('marches');
        table.string('ref');
        table.string('date_notif');
        table.string('date_debut');
        table.string('ordre');
        table.timestamps(true, true);
      })
      .createTable('courriers', (table) => {
        table.increments('id');
        table.integer('dossier_id').references('id').inTable('dossiers');
        table.string('objet');
        table.string('date_courrier');
        table.string('fichier');
        table.timestamps(true, true);
      })
      .createTable('typreceptions', (table) => {
        table.increments('id');
        table.string('libelle').notNullable();
        table.timestamps(true, true);
      })
      .createTable('receptions', (table) => {
        table.increments('id');
        table.integer('marche_id').references('id').inTable('marches');
        table.integer('typreception_id').references('id').inTable('typreceptions');
        table.string('date_recept');
        table.string('heure_recept');
        table.string('membre');
        table.string('autre');
        table.string('pv_recept');
        table.timestamps(true, true);
      })
      .createTable('avenants', (table) => {
        table.increments('id');
        table.integer('marche_id').references('id').inTable('marches');
        table.string('nature_avenant');
        table.integer('montant');
        table.string('date_avenant');
        table.timestamps(true, true);
      })
      .createTable('ordresuspensions', (table) => {
        table.increments('id');
        table.integer('marche_id').references('id').inTable('marches');
        table.string('ref');
        table.string('date_notif');
        table.string('date_suspension');
        table.string('ordre');
        table.timestamps(true, true);
      })
      .createTable('ordrereprises', (table) => {
        table.increments('id');
        table.integer('marche_id').references('id').inTable('marches');
        table.string('ref');
        table.string('date_notif');
        table.string('date_reprise');
        table.string('ordre');
        table.timestamps(true, true);
      })
      .createTable('paiements', (table) => {
        table.increments('id');
        table.integer('marche_id').references('id').inTable('marches');
        table.string('num_facture');
        table.string('date_facture');
        table.integer('montant_cfa');
        table.integer('montant_devise');
        table.string('devise');
        table.integer('taux_exe_phy');
        table.integer('taux_exe_fin');
        table.string('observation');
        table.string('fichier');
        table.timestamps(true, true);
      })
      .createTable('ventefrs', (table) => {
        table.increments('id');
        table.integer('vente_id').references('id').inTable('ventes').notNullable();
        table.integer('fournisseur_id').references('id').inTable('fournisseurs').notNullable();
        table.boolean('chef_file').defaultTo(false);
        table.integer('offre_id').references('id').inTable('offres');
        table.boolean('asf').defaultTo(false);
        table.boolean('asc').defaultTo(false);
        table.boolean('ajt').defaultTo(false);
        table.boolean('drtss').defaultTo(false);
        table.boolean('rccm').defaultTo(false);
        table.boolean('cnf').defaultTo(false);
        table.boolean('caut').defaultTo(false);
      })

  
};

exports.down = function(knex) {
    return knex.schema.dropTable('users').dropTable('usergroups').dropTable('localisations').dropTable('types').dropTable('agents')
    .dropTable('modes').dropTable('modepaiements').dropTable('typcredits').dropTable('credits').dropTable('immobilisations')
    .dropTable('agents').dropTable('fournisseurs').dropTable('budgets').dropTable('plans').dropTable('planitems')
    .dropTable('dossiertechs').dropTable('dossiers').dropTable('lots')
    .dropTable('avis')
    .dropTable('ventes')
    .dropTable('caisses')
    .dropTable('caminvs')
    .dropTable('scaminvs')
    .dropTable('offres')
    .dropTable('proceverbs')
    .dropTable('deliberations')
    .dropTable('analyses')
    .dropTable('resultats')
    .dropTable('cautions')
    .dropTable('marches')
    .dropTable('courriers')
    .dropTable('ordreservs')
    .dropTable('avenants')
    .dropTable('ordresuspensions')
    .dropTable('ordrereprises');
};