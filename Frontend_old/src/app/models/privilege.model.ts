export class Privilege {
  constructor(
    public id: number,
    public usergroup_id: number,
    public fonctionalite_id: number,
    public view: boolean,
    public add: boolean,
    public edit: boolean,
    public remove: boolean
  ) {
  }
}
