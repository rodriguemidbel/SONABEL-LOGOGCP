export class Offre {
  constructor(
    public id: number,
    public off_doss_id: number,
    public lot_id: number,
    public entreprise_cons: string,
    public date_depot: string,
    public heure_depot: string,
    public nom_prenom_dep: string,
    public telephone_dep: string,
    public montant_offre: number,
    public montant_corrige: number,
    public fichier_caution:string

  ) {
  }
}
