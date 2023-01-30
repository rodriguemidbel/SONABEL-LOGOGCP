export class Ordrereprise {
  constructor(
    public id: number,
    public marche_id: number,
    public ref: string,
    public  date_notif: string,
    public  date_reprise: string,
    public  ordre: string

  ) {
  }
}
