const db = require('../db/db');

class OffreDAO {
  async createOffre(off_doss_id,lot_id,entreprise_cons,date_depot,heure_depot,nom_prenom_dep,
    telephone_dep,montant_offre,montant_corrige) {
    const [id] = await db('offres')
      .insert({
        off_doss_id,
        lot_id,
        entreprise_cons,
        date_depot,
        heure_depot,
        nom_prenom_dep,
        telephone_dep,
        montant_offre,
        montant_corrige
      })
      .returning('id');

    return id;
  };

 /* async getAllDossier() {
    return await db('offres');
  };*/
  async getAllOffre(off_doss_id) {
    return await db('offres')
      .join('dossiers', 'dossiers.id', 'offres.off_doss_id')
      .join('lots', 'lots.id', 'offres.lot_id')
      .join('fournisseurs','fournisseurs.id','offres.entreprise_cons')
      .select(
        'dossiers.numero_doss as numero',
        'dossiers.intitule_doss as intitule',
        'lots.intitule_lot as intitule_lot',
        'fournisseurs.id as fourID',
        'fournisseurs.nom_four as nom_four',
        'offres.id as id',
        'offres.lot_id as lot_id',
        'offres.entreprise_cons as entreprise_cons',
        'offres.date_depot as date_depot',
        'offres.heure_depot as heure_depot',
        'offres.nom_prenom_dep as nom_prenom_dep',
        'offres.telephone_dep as telephone_dep',
        'offres.montant_offre as montant_offre',
        'offres.montant_corrige as montant_corrige',
        'offres.asf as asf',
        'offres.asc as asc',
        'offres.ajt as ajt',
        'offres.drtss as drtss',
        'offres.rccm as rccm',
        'offres.cnf as cnf',
        'offres.caut as caut',
        'offres.fichier_caution as fichier_caution'
      )
      .where({off_doss_id})
      .orderBy('offres.id', 'asc')
  };

  async getOneOffre(id) {
    return await db('offres').where({id}).first();
  };

  async getOneOffre__OLD(id) {
    return await db('offres')
    .join('fournisseurs','fournisseurs.id','offres.entreprise_cons')
    .select(
      'fournisseurs.id as fourID',
      'fournisseurs.nom_four as nom_four',
      'offres.id as id',
      'offres.entreprise_cons as entreprise_cons',
      'offres.date_depot as date_depot',
      'offres.heure_depot as heure_depot',
      'offres.nom_prenom_dep as nom_prenom_dep',
      'offres.telephone_dep as telephone_dep',
      'offres.montant_offre as montant_offre',
      'offres.montant_corrige as montant_corrige',
      'offres.asf as asf',
      'offres.asc as asc',
      'offres.ajt as ajt',
      'offres.drtss as drtss',
      'offres.rccm as rccm',
      'offres.cnf as cnf',
      'offres.caut as caut'
    )
    .where({id});
  };

  async removeOffre(id) {
    return await db('offres').where({id}).del();
  };

  async updateOffre(id,changes) {
    return await db('offres').where({id}).update(changes)
    .then(() =>{
      return db('offres').where({id}).first();
    });
  };

  async findOffre(off_doss_id) {
    return await db('offres')
    .join('dossiers', 'dossiers.id', 'offres.off_doss_id')
    .join('fournisseurs','fournisseurs.id','offres.entreprise_cons')
    .select(
      'dossiers.numero_doss as numero',
      'dossiers.intitule_doss as intitule',
      'fournisseurs.id as fourID',
      'fournisseurs.nom_four as nom_four',
      'offres.id as id',
      'offres.entreprise_cons as entreprise_cons',
      'offres.date_depot as date_depot',
      'offres.heure_depot as heure_depot',
      'offres.nom_prenom_dep as nom_prenom_dep',
      'offres.telephone_dep as telephone_dep',
      'offres.montant_offre as montant_offre',
      'offres.montant_corrige as montant_corrige',
      'offres.asf as asf',
      'offres.asc as asc',
      'offres.ajt as ajt',
      'offres.drtss as drtss',
      'offres.rccm as rccm',
      'offres.cnf as cnf',
      'offres.caut as caut',
      'offres.fichier_caution as fichier_caution'
    )
    .where({off_doss_id})
    .orderBy('offres.id', 'asc')
  };

 
}

module.exports = new OffreDAO();