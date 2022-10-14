const pieceDAO = require('../dao/piece');

class PieceService {
  createPiece(PieceDto) {
    const { libelle } = PieceDto;
    return pieceDAO.createPiece(libelle);
  };

  getAllPiece() {
    return pieceDAO.getAllPiece();
  };
  getOnePiece(id) {
    return pieceDAO.getOnePiece(id);
  };
  removePiece(id) {
    return pieceDAO.removePiece(id);
  };
  updatePiece(id,changes) {
    return pieceDAO.updatePiece(id,changes);
  };
  
}

module.exports = new PieceService();