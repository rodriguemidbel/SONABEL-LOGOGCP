export class Paiement {
  constructor(
    public id: number,
    public marche_id: number,
    public num_facture: string,
    public date_facture: string,
    public montant_cfa: number,
    public montant_devise: number,
    public devise: string,
    public taux_exe_phy: number,
    public taux_exe_fin: number,
    public observation: string,
    public fichier: string
  ) {
  }
}
