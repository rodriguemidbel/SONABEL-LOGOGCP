export class Vente {
  constructor(
    public id: number,
    public num_vente: string,
    public lot_id: number,
    public fournisseur_id: number,
    public date_vente : string,
    public montant: number,
    public acheteur: number,
    public contact_acheteur: number,
    public statut: string

  ) {
  }
}
