export class Deliberation {
  constructor(
    public id: number,
    public dossier_id: number,
    public date_convocation: string,
    public date_transpv_sign: string,
    public date_retourpv_sign: string,
    public date_transpv_dgcmef: string,
    public pvdeliberation: string
  ) {
  }
}
