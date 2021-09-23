import {User} from "./user.model";

export class Publish {
  public descripcion: string;
  public Name: string;
  public IsAtention: string;
  public Race: string;
  public Ubication: string;
  public Commnet: string;
  public Age: string;
  public UserId: number;
  public fecha: string;
  public id: number;
}

export class PublishContainer {
  public ok: string;
  public message: string;
  public body: User[];
}
