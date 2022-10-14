const db = require('../db/db');

class UserDAO {
  async createUser(usergroup_id, name, username,password,telephone,email,adresse,statut,isconnected) {
    const [id] = await db('users')
      .insert({
        usergroup_id,
        name,
        username,
        password,
        telephone,
        email,
        adresse,
        statut,
        isconnected
      })
      .returning('id');
    return id;
  };

  
  async getAllUser() {
    return await db('users');
  };

  async getOneUser(id) {
    return await db('users').where({id}).first();
  };

  async removeUser(id) {
    return await db('users').where({id}).del();
  };

  async updateUser(id,changes) {
    return await db('users').where({id}).update(changes)
    .then(() =>{
      return db('users').where({id}).first();
    });
  };

  async findGroupUser(usergroup_id) {
    return await db('usergroups')
      .join('users', 'usergroups.id', 'users.usergroup_id')
      .select(
        'usergroups.id as groupID',
        'usergroups.name as groupName',
        'users.name as userName',
        'users.username as login',
        'users.password as password',
        'users.isconnected as isconnected'
      )
      .where({usergroup_id})
  };

  async login(username,password) {
    return await db('usergroups')
      .join('users', 'usergroups.id', 'users.usergroup_id')
      .select(
        'usergroups.id as groupID',
        'usergroups.name as groupName',
        'users.id as userID',
        'users.name as name',
        'users.username as username',
        'users.password as password',
        'users.isconnected as isconnected'
      )
      .where({username,password})
  };

  /*async login(username,password) {
    return await db('usergroups')
      .join('users', 'usergroups.id', 'users.usergroup_id')
      .select(
        'usergroups.id as groupID',
        'usergroups.name as groupName',
        'users.id as userID',
        'users.name as name',
        'users.username as username',
        'users.password as password'
      )
      .where({username,password})
  };*/

}

module.exports = new UserDAO();
