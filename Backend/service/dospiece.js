const DospieceDAO = require('../dao/dospiece');

class DospieceService {
  createDospiece(DospieceDto) {
    const { dossier_id,piece_id } = DospieceDto;
    return DospieceDAO.createDospiece(dossier_id,piece_id);
  };

  getAllDospiece() {
    return DospieceDAO.getAllDospiece();
  };
  getOneDospiece(id) {
    return DospieceDAO.getOneDospiece(id);
  };
  removeDospiece(id) {
    return DospieceDAO.removeDospiece(id);
  };
  updateDospiece(id,changes) {
    return DospieceDAO.updateDospiece(id,changes);
  };
  
}

module.exports = new DospieceService();