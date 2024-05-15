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
  Strength = "STRENGTH",
  Dexterity = "DEXTERITY",
  Constitution = "CONSTITUTION",
  Intelligence = "INTELLIGENCE",
  Wisdom = "WISDOM",
  Charisma = "CHARISMA"
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
