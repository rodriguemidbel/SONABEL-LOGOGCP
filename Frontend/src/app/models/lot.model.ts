export class Lot {
  constructor(
    public id: number,
    public dossier_id: number,
    public num_lot: string,
    public intitule_lot: string,
    public montant_lot: number,
    public montant_vente: number,
    public statut: string
  ) {
  }
}
