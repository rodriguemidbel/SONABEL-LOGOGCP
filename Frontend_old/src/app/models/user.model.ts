export class User {
  constructor(
    public id: number,
    public usergroup_id: number,
    public name: string,
    public username: string,
    public password: string,
    public telephone: string,
    public email: string,
    public adresse: string,
    public statut: string
  ) {
  }
}
