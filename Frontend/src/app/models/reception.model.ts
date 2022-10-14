export class Reception {
  constructor(
    public id: number,
    public marche_id: number,
    public typreception_id: number,
    public heure_recept: number,
    public date_recept: string,
    public membre: string,
    public autre: string,
    public pv_recept: string
  ) {
  }
}
