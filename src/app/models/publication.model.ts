export class PublicationModel {
  public idPublication: number;
  public idPet: number;
  public name: string;
  public comment: string;
  public datetime: string;
  public race: string;
  public attention: string;
  public age: string;
  public gender: string;
  public district: string;
  constructor(idPublication, idPet, name, comment, datetime,
              race, attention, age, gender, district) {
    this.idPublication = idPublication;
    this.idPet = idPet;
    this.name = name;
    this.comment = comment;
    this.datetime = datetime;
    this.race = race;
    this.attention = attention;
    this.age = age;
    this.gender = gender;
    this.district = district;
  }
}
