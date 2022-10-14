export class Ordresuspension {
  constructor(
    public id: number,
    public marche_id: number,
    public ref: string,
    public  date_notif: string,
    public  date_suspension: string,
    public  ordre: string

  ) {
  }
}
