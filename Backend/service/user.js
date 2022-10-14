const userDAO = require('../dao/user');

class UserService {
  createUser(userDto) {
    const { usergroup_id, name, username,password,telephone,email,adresse,statut,isconnected } = userDto;
    return userDAO.createUser(usergroup_id, name, username,password,telephone,email,adresse,statut,isconnected);
  };
  getAllUser() {
    return userDAO.getAllUser();
  };
  getOneUser(id) {
    return userDAO.getOneUser(id);
  };
  removeUser(id) {
    return userDAO.removeUser(id);
  };
  updateUser(id,changes) {
    return userDAO.updateUser(id,changes);
  };

  findGroupUser(usergroup_id) {
    return userDAO.findGroupUser(usergroup_id);
  };
  login(username,password) {
    return userDAO.login(username,password);
  };
}

module.exports = new UserService();