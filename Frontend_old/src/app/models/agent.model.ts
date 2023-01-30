export class Agent {
  constructor(
    public id: number,
    public nom_prenom: string,
    public telephone: string,
    public email: string,
    public fonction: string,
    public service: string,
    public localisation_id: number
  ) {
  }
}
