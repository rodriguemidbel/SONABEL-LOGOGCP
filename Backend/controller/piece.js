const pieceService = require('../service/piece');

class PieceController {
  async createPiece(req, res) {
    try {
      const id = await pieceService.createPiece(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  };

 
  async getAllPiece(req, res) {
    try {
      const Pieces = await pieceService.getAllPiece();
      res.status(201).json(Pieces);
    } catch (err) {
      console.error(err);
    }
  };
  async getOnePiece(req, res) {
    try {
      const {id} = req.params;
      const Pieces = await pieceService.getOnePiece(id);
      if(Pieces)
      {
        res.status(201).json(Pieces);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };
  async removePiece(req, res) {
    try {
      const {id} = req.params;
      const count = await pieceService.removePiece(id);
      if(count > 0)
      {
        res.status(201).json({message : 'Successfuly deleted'});
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  async updatePiece(req, res) {
    try {
      const {id} = req.params;
      const changes = req.body;

      const Pieces = await pieceService.updatePiece(id,changes);
      if(Pieces)
      {
        res.status(201).json(Pieces);
      }
      else
      {
        res.status(404).json({message: 'Data not exists'});
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  
}

module.exports = new PieceController();