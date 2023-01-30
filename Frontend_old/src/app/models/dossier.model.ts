export class Dossier {
  constructor(
    public id: number,
    public planitem_id: number,
    public designation: string,
    public numero_doss: string,
    public intitule_doss: string,
    public date_trans_sign: string,
    public date_retour_sign: string,
    public date_trans_dgcmef: string,
    public taux_reception: string,
    public niveau_traitement: string,
    public taux_avencement: string,
    public dossier: string,
    public statut: string

  ) {
  }
}
