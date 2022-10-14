export class Ordre {
  constructor(
    public id: number,
    public marche_id: number,
    public ref: string,
    public  date_notif: string,
    public  date_debut: string,
    public  ordre: string

  ) {
  }
}
