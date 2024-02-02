import {AbilityName} from "./ability.model";

export class Skill{
  name: string;
  subSkillName: string;
  ranks: number = 0;
  abilityBasedOffOf: AbilityName;
  type: string = 'base';
  isTrained: boolean;
  isClassSkill: boolean = false;

  constructor(name: string, isTrained: boolean, abilityBasedOffof: AbilityName) {
    this.name = name;
    this.isTrained = isTrained;
    this.abilityBasedOffOf = abilityBasedOffof;
  }
}
