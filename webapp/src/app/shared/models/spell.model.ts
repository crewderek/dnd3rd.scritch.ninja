import {SavingThrow, SavingThrowName} from "./saving-throw.model";

export class Spell {
  name: string;
  level: SpellLevel[];
  components: Components[];
  description: string;
  castingTime: string;
  range: string;
  target: string;
  duration: string;
  savingThrow: SavingThrowName;
  hasSpellResistance: boolean = true;
  school: string;
  area: string;

  constructor(name: string, level: SpellLevel[], components: Components[], description: string, castingTime: string,
              range: string, target: string, duration: string, savingThrow: SavingThrowName, school: string, area: string,
              hasSpellResistance: boolean = true) {
    this.name = name;
    this.level = level;
    this.components = components;
    this.description = description;
    this.castingTime = castingTime;
    this.range = range;
    this.target = target;
    this.duration = duration;
    this.savingThrow = savingThrow;
    this.hasSpellResistance = hasSpellResistance;
    this.school = school;
    this.area = area;
  }
}

export interface SpellInfo{
  spells: Spell[];
  spellsKnown: SpellsKnown[]
}
export interface SpellsKnown{
    level: 0,
    saveDC: 0,
    spellsPerDay: 1,
    bonusSpells: 0
}

export interface SpellLevel {
  class: string;
  level: number;
}

export enum Components {
  Verbal = "Verbal",
  Somatic = "Somatic",
  Material = "Material",
  Focus = "Focus",
  DivineFocus = "Divine Focus",
  XPCost = "XP Cost"
}
