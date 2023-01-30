export class Avis {
  constructor(
    public id: number,
    public dossier_id: number,
    public date_envoi: string,
    public num_publi: string,
    public date_publi: string,
    public fichier : string
  ) {
  }
}
