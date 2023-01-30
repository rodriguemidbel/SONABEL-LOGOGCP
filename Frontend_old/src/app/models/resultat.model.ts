export class Resultat {
  constructor(
    public id: number,
    public dossier_id: number,
    public date_env_res: string,
    public num_par_res: string,
    public date_par_res: string,
    public attributaire: string,
    public litige: string,
    public fichierpub: string,
    public fichierlitige: string
  ) {
  }
}
