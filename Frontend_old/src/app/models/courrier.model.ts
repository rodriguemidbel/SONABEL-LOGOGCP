export class Courrier {
  constructor(
    public id: number,
    public dossier_id: number,
    public objet: string,
    public date_courrier: string,
    public fichier: string
  ) {
  }
}
