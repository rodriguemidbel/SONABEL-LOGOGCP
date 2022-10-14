export class Marche {
  constructor(
    public id: number,
    public mar_doss_id: number,
    public lot_id:number,
    public num_ref: string,
    public objet: string,
    public date_appro: string,
    public date_notif: string,
    public attributaire: string,
    public montant: number,
    public devise: string,
    public montant2: number,
    public devise2: string,
    public montant3: number,
    public devise3: string,
    public montant4: number,
    public devise4: string,
    public montant_total: number,
    public devise_total: string,
    public delai: string,
    public date_rem_sign: string,
    public date_retour_sign: string,
    public date_rem_enr: string,
    public date_retour_enr: string,
    public marche: string
  ) {
  }
}
