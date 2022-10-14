const db = require('../db/db');

class VentefrsDAO {
  async createVentefrs(vente_id,fournisseur_id,chef_file) {
    const [id] = await db('ventefrs')
      .insert({
        vente_id,
        fournisseur_id,
        chef_file
      })
      .returning('id');
    return id;
  };

  
  async getAllVentefrs(vente_id) {
    return await db('ventefrs')
    .join('fournisseurs','fournisseurs.id','ventefrs.fournisseur_id')
    .select(
        'fournisseurs.nom_four as nom_four',
        'ventefrs.id as fourID',
        'ventefrs.vente_id as vente_id',

        'ventefrs.fournisseur_id as fournisseur_id',
        'ventefrs.asf as asf',
        'ventefrs.asc as asc',
        'ventefrs.ajt as ajt',
        'ventefrs.drtss as drtss',
        'ventefrs.rccm as rccm',
        'ventefrs.cnf as cnf',
        'ventefrs.caut as caut'
    )
    .where({vente_id})
  };

  async getOneVentefrs(id) {
    return await db('ventefrs').where({id}).first();
  };

  async removeVentefrs(id) {
    return await db('ventefrs').where({id}).del();
  };

  async updateVentefrs(id,changes) {
    return await db('ventefrs').where({id}).update(changes)
    .then(() =>{
      return db('ventefrs').where({id}).first();
    });
  };

  async getAllVenteFrsOffre(offre_id) {
    return await db('ventefrs')
    .select(
        'ventefrs.id as fourID',
        'ventefrs.vente_id as vente_id',
        'ventefrs.lot_id as lot_id',
        'ventefrs.fournisseur_id as fournisseur_id',
        'ventefrs.groupement_id as groupement_id',
        'ventefrs.offre_id as offre_id',
        'ventefrs.asf as asf',
        'ventefrs.asc as asc',
        'ventefrs.ajt as ajt',
        'ventefrs.drtss as drtss',
        'ventefrs.rccm as rccm',
        'ventefrs.cnf as cnf',
        'ventefrs.caut as caut'
    )
    .where({offre_id})
  };

}

module.exports = new VentefrsDAO();