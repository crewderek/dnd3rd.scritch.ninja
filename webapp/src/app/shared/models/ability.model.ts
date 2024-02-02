import {Alignment} from "./character.model";

export class Ability{
  name: AbilityName;
  score: number;
  type: AbilityType;

  constructor(name: AbilityName, score: number = 8, type: AbilityType = AbilityType.Base) {
    this.name = name;
    this.score = score;
    this.type = type;
  }
  public getShortName(): string { return  this.name.substring(0, 3) }
}

export enum AbilityName{
  Strength = "Strength",
  Dexterity = "Dexterity",
  Constitution = "Constitution",
  Intelligence = "Intelligence",
  Wisdom = "Wisdom",
  Charisma = "Charisma"
}

export enum AbilityType{
  Base = "Base",
  Racial = "Racial",
  Damage = "Damage",
  Drain = "Drain",
  Temp = "Temp",
  Enhancement = "Enhancement",
  Misc = "Misc"
}
