import {Alignment} from "./character.model";
import {Stat} from "../../character/stat";

export class Ability implements Stat {
  name: AbilityName;
  score: number;
  type: AbilityType;

  constructor(name: AbilityName, score: number = 8, type: AbilityType = AbilityType.Base) {
    this.name = name;
    this.score = score;
    this.type = type;
  }

  public getShortName(): string {
    return this.getName().substring(0, 3)
  }

  public getReversedShortName() {
    return this.getName().substring(3);
  }

  public getName(): string {
    return this.name;
  }

  getScore(): number {
    return this.score;
  }

  getType(): string {
    return this.type;
  }
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
