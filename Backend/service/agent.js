const agentDAO = require('../dao/agent');

class AgentService {
  createAgent(AgentDto) {
    const { nom_prenom,telephone,email,adresse,fonction,service,localisation_id,distinction,signat } = AgentDto;
    return agentDAO.createAgent(nom_prenom,telephone,email,adresse,fonction,service,localisation_id,distinction,signat);
  };

  createMultipleAgent(data) {
    return agentDAO.createAgent(data);
  };


  getAllAgent() {
    return agentDAO.getAllAgent();
  };
  getOneAgent(id) {
    return agentDAO.getOneAgent(id);
  };
  removeAgent(id) {
    return agentDAO.removeAgent(id);
  };
  updateAgent(id,changes) {
    return agentDAO.updateAgent(id,changes);
  };
  
}

module.exports = new AgentService();