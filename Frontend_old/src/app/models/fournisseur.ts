export class Fournisseur {
  constructor(
    public id: number,
    public nom_four: string,
    public rccm: string,
    public ifu: string,
    public telephone1: string,
    public telephone2: string,
    public adresse: string,
    public email: string,
    public domaine: string,
    public type: string
  ) {
  }
}
