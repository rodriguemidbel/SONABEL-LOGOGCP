export class Caisse {
  constructor(
    public id: number,
    public num_recu: string,
    public date_recu: string,
    public vente_id: number,
    public modepaiement_id: number

  ) {
  }
}
