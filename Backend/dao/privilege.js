const db = require('../db/db');


class PrivilegeDAO {
  async createPrivilege(usergroup_id,fonctionalite_id,view,add,edit,remove) {
    const [id] = await db('privileges')
      .insert({
        usergroup_id,
        fonctionalite_id,
        view,
        add,
        edit,
        remove
      })
      .returning('id');

    return id;
  };

  /*async getAllPrivilege() {
    return await db('privileges');
  };*/

  async getAllPrivilege() {
    return await db('privileges')
    .join('usergroups', 'usergroups.id', 'privileges.usergroup_id')
    .join('fonctionalites', 'fonctionalites.id', 'privileges.fonctionalite_id')
    .select(
      'usergroups.id as group_id',
      'usergroups.name as name',
      'fonctionalites.id as fonctionalite_id',
      'fonctionalites.libelle as libelle',
      'privileges.id as id',
      'privileges.view as view',
      'privileges.add as add',
      'privileges.edit as edit',
      'privileges.remove as remove'
    )
  };

  async getOnePrivilege(id) {
    return await db('privileges').where({id}).first();
  };

  async removePrivilege(id) {
    return await db('privileges').where({id}).del();
  };

  async updatePrivilege(id,changes) {
    return await db('privileges').where({id}).update(changes)
    .then(() =>{
      return db('privileges').where({id}).first();
    });
  };

  async recherche(usergroup_id,fonctionalite_id) {
    return await db('privileges')
    .join('usergroups', 'usergroups.id', 'privileges.usergroup_id')
    .join('fonctionalites', 'fonctionalites.id', 'privileges.fonctionalite_id')
    .select(
      'usergroups.id as group_id',
      'usergroups.name as name',
      'fonctionalites.id as fonctionalite_id',
      'fonctionalites.libelle as libelle',
      'privileges.id as id',
      'privileges.view as view',
      'privileges.add as add',
      'privileges.edit as edit',
      'privileges.remove as remove'
    )
    .where({usergroup_id,fonctionalite_id})
  };

 
}

module.exports = new PrivilegeDAO();