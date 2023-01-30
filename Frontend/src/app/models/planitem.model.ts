export class Planitem {
  constructor(
    public id: number,
    public num_ordre: number,
    public plan_id: number,
    public annee:  number,
    public budget: string,
    public typcredit: string,
    public immobilisation: string,
    public credit: string,
    public centre_cout: number,
    public projet: string,
    public localisation: string,
    public responsable: string,
    public montant_estime: number,
    public composante: string,
    public montant_dispo: number,
    public designation: string,
    public type: number,
    public mode: string,
    public nbr_lot: number,
    public agent_id: number,
    public date_tech: string,
    public date_tech_reel: string,
    public date_dgcmef: string,
    public date_dgcmef_reel: string,
    public date_off: string,
    public date_off_reel: string,
    public temp: number,
    public temp_reel: number,
    public date_resultat: string,
    public resultat: string,
    public date_visite_site: string,
    public date_demarrage: string,
    public date_reel_demarrage: string,
    public delai_exe: number,
    public delai_reel_exe: number,
    public date_butoir: string,
    public date_reel_fin: string,
    public budget_travaux: number,
    public statut: string,
    public observation: string



  ) {
  }


}
