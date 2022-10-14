const db = require('../db/db');


class AgentDAO {
  async createAgent(nom_prenom,telephone,email,adresse,fonction,service,localisation_id,distinction,signat) {
    const [id] = await db('agents')
      .insert({
        nom_prenom,
        telephone,
        email,
        adresse,
        fonction,
        service,
        localisation_id,
        distinction,
        signat
      })
      .returning('id');

    return id;
  };

 

  async getAllAgent() {
    return await db('agents');
  };

  async getOneAgent(id) {
    return await db('agents').where({id}).first();
  };

  async removeAgent(id) {
    return await db('agents').where({id}).del();
  };

  async updateAgent(id,changes) {
    return await db('agents').where({id}).update(changes)
    .then(() =>{
      return db('agents').where({id}).first();
    });
  };

 
}

module.exports = new AgentDAO();