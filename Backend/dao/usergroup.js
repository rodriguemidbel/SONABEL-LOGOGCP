const db = require('../db/db');

class UsergroupDAO {
  async createUsergroup(name) {
    const [id] = await db('usergroups')
      .insert({
        name,
      })
      .returning('id');

    return id;
  };

  async getAllUsergroup() {
    return await db('usergroups');
  };

  async getOneUsergroup(id) {
    return await db('usergroups').where({id}).first();
  };

  async removeUsergroup(id) {
    return await db('usergroups').where({id}).del();
  };

  async updateUsergroup(id,changes) {
    return await db('usergroups').where({id}).update(changes)
    .then(() =>{
      return db('usergroups').where({id}).first();
    });
  };

 
}

module.exports = new UsergroupDAO();