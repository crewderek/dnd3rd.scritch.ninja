import {AbilityName, AbilityType} from "./ability.model";

export class SavingThrow{
  name: SavingThrowName;
  score: number = 0;
  abilityType: AbilityType = AbilityType.Base;

  public getAbility(): string { return  this.name.substring(0, 3) }
  public abilityBasedOffOf(): AbilityName{
    switch(this.name) {
      case SavingThrowName.Fortitude: {
        return AbilityName.Constitution;
      }
      case SavingThrowName.Reflex: {
        return AbilityName.Dexterity
      }
      case SavingThrowName.Will: {
        return AbilityName.Wisdom
      }
    }
  }

  constructor(name: SavingThrowName, score: number = 0, abilityType: AbilityType = AbilityType.Base) {
    this.name = name;
    this.score = score;
    this.abilityType = abilityType;
  }
}

export enum SavingThrowName{
  Fortitude = "Fortitude",
  Reflex = "Reflex",
  Will = "Will"
}
