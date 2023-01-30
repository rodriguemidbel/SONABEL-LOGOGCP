const db = require('../db/db');
var commonUtils = require('../common/common.utils');

class LogDAO {
  async createLog(user_id,action,created_by) {
    const [id] = await db('logs')
      .insert({
        user_id : user_id,
        action : action,
        created_by: user_id
      })
      .returning('id');

    return id;
  };

  async getAllLog() {
    return await db('logs');
  };

  async findLog() {
    return await db('logs')
    .join('users', 'users.id', 'logs.user_id')
    .join('usergroups', 'usergroups.id', 'users.usergroup_id')
    .select(
      'usergroups.id as usergroup_id',
      'usergroups.name as name',
      'users.name as user_name',
      'users.agent_id as agent_id',
      'users.username as username',
      'logs.user_id as user_id',
      'logs.action as action'
    )
    .orderBy([
      { column: 'logs.id', order: 'desc'}
    ])
  };

  async getOneLog(id) {
    return await db('logs').where({id}).first();
  };

  async removeLog(id) {
    return await db('logs').where({id}).del();
  };

  async updateLog(id,changes) {
    return await db('logs').where({id}).update(changes)
    .then(() =>{
      return db('logs').where({id}).first();
    });
  };

 
}

module.exports = new LogDAO();