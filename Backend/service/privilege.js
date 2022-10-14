const privilegeDAO = require('../dao/privilege');

class PrivilegeService {
  createPrivilege(PrivilegeDto) {
    const { usergroup_id,fonctionalite_id,view,add,edit,remove } = PrivilegeDto;
    return privilegeDAO.createPrivilege(usergroup_id,fonctionalite_id,view,add,edit,remove);
  };

  getAllPrivilege() {
    return privilegeDAO.getAllPrivilege();
  };
  
  getOnePrivilege(id) {
    return privilegeDAO.getOnePrivilege(id);
  };
  removePrivilege(id) {
    return privilegeDAO.removePrivilege(id);
  };
  updatePrivilege(id,changes) {
    return privilegeDAO.updatePrivilege(id,changes);
  };
  recherche(usergroup_id,fonctionalite_id){
    return privilegeDAO.recherche(usergroup_id,fonctionalite_id);
  };
  
}

module.exports = new PrivilegeService();