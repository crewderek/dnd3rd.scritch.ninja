export class SpecialAbility{
  name: string;
  description: string = '';
  type: SpecialAbilityTypes = SpecialAbilityTypes.Extraordinary;

  constructor(name:string, type: SpecialAbilityTypes = SpecialAbilityTypes.SpellLike, description: string = '') {
    this.name = name;
    this.type = type;
    this.description = description;
  }
}

export enum SpecialAbilityTypes{
  Extraordinary = "Extraordinary",
  SpellLike = "Spell-Like",
  SuperNatural = "Supernatural",
}
