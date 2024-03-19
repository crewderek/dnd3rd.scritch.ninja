import {Ability, AbilityName} from "./ability.model";
import {SavingThrow, SavingThrowName} from "./saving-throw.model";
import {Damage} from "./damage.model";
import {Weapon} from "./weapon.model";
import {Armor} from "./armor.model";
import {Skill} from "./skill.model";
import {Feat} from "./feat.model";
import {SpecialAbility, SpecialAbilityTypes} from "./specialAbility.model";
import {Spell, SpellInfo, SpellsKnown} from "./spell.model";
import {Gear} from "./gear.model";
// @ts-ignore
import * as defaultSkills from '../../../assets/default-skills.json'
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import * as http from "http";
import {HttpClient} from "@angular/common/http";

export interface CurrencyInfo{
  copper: 0,
  silver: 0,
  gold: 0,
  platinum: 0
}

export class Character {
  // Info
  id: string = '';
  userId: string = '';

  //  Descriptors
  name: string = '';
  class: string = '';
  level: number = 3;
  experiencePoints: number = 3000;
  race: string = '';
  alignment: Alignment = Alignment.TrueNeutral;
  deity: string = '';
  size: Size = Size.Medium;
  age: number = 0;
  height: number = 0;
  weight: number = 0;
  eyes: string = '';
  hair: string = '';
  skin: string = '';
  speed: number = 30;
  gender: string = '';
  languages: string[] = ['Common'];
  currencyInfo: CurrencyInfo = {copper:0, silver:0, gold:0, platinum:0};

  //Combat
  maxHp: number = 12;
  damageTaken: Damage[] = [];
  initiative: number = 0;
  ac: number = 10;
  touchAc: number = 10;
  flatFootedAc: number = 10;
  damageReduction: number = 0;
  baseAttackBonuses: number[] = [1];
  spellResistance: number = 0;
  grapple: number = 0;
  weapons: Weapon[] = [new Weapon(1, [new Damage()], 5, "Piercing", false, new Gear("Short sword"), 19), new Weapon(1, [new Damage()], 5, "Piercing", false, new Gear("Short sword"), 19)];
  armors: Armor[] = [new Armor('Light', 1, 30, 8, .05, new Gear('Padded Armor', 10, 500, true)), new Armor('Light', 1, 30, 8, .05, new Gear('Padded Armor', 10, 500, true))];
  inventory: Gear[] = [new Gear('Lantern of Reavealing', 2, 300000, true), new Gear('Lantern of Reavealing', 2, 300000, true)];

  //Skills
  maxRanks: number = 1;
  skills: Skill[] = [];

  abilities: Ability[] = [new Ability(AbilityName.Strength),
    new Ability(AbilityName.Dexterity),
    new Ability(AbilityName.Constitution),
    new Ability(AbilityName.Intelligence),
    new Ability(AbilityName.Wisdom),
    new Ability(AbilityName.Charisma)];
  savingThrows: SavingThrow[] = [new SavingThrow(SavingThrowName.Fortitude),
    new SavingThrow(SavingThrowName.Reflex),
    new SavingThrow(SavingThrowName.Will)];
  feats: Feat[] = [new Feat('Blind-Fight',
    'In melee, every time you miss because of concealment, you can reroll your miss chance percentile roll one time to see if you actually hit.\n' +
    '\n' +
    'An invisible attacker gets no advantages related to hitting you in melee. That is, you don’t lose your Dexterity bonus to Armor Class, and the attacker doesn’t get the usual +2 bonus for being invisible. The invisible attacker’s bonuses do still apply for ranged attacks, however.\n' +
    '\n' +
    'You take only half the usual penalty to speed for being unable to see. Darkness and poor visibility in general reduces your speed to three-quarters normal, instead of one-half.',
    'Regular attack roll modifiers for invisible attackers trying to hit you apply, and you lose your Dexterity bonus to AC. The speed reduction for darkness and poor visibility also applies.',
    'The Blind-Fight feat is of no use against a character who is the subject of a blink spell.\n' +
    '\n' +
    'A fighter may select Blind-Fight as one of his fighter bonus feats.', 'No prerequisite')];
  specialAbilities: SpecialAbility[] = [new SpecialAbility('Constrict', SpecialAbilityTypes.Extraordinary,
    'A creature with this special attack can crush an opponent, dealing bludgeoning damage, after making a successful grapple check. The amount of damage is given in the creature’s entry. If the creature also has the improved grab ability it deals constriction damage in addition to damage dealt by the weapon used to grab.')];
  spellInfo: SpellInfo = {spells: [], spellsKnown: []};
  public getCurrentHp(): number {
    let currentHP = this.maxHp;
    if(this.damageTaken.length > 0) {
      currentHP = this.damageTaken.reduce((accumulator, currentObject) => accumulator + currentObject.amountTaken, 0);
    }

    return currentHP;
  }

  constructor(private http: HttpClient) {
    this.addDefaultSkills();
  }

  getCharacterData(characterId: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiEnvUrl()}${environment.characterPath}?characterId=${characterId}`);
  }

  private addDefaultSkills() {
    for (let i = 0; i < defaultSkills.skills.length; i++) {
      const skill = defaultSkills.skills[i];

      this.skills.push(
        new Skill(skill.name, skill.isTrained, AbilityName[skill.abilityType as keyof typeof AbilityName]));
    }
  }

  public parseCharacterData(characterData: any){
    //  System information
    this.id = characterData.characterId;
    this.userId = characterData.userId;

    //  Description info
    this.name = characterData.name;
    this.gender = characterData.gender;
    this.age = characterData.age;
    this.race = characterData.race;
    const alignment = characterData.alignment.replace(' ', '');
    this.alignment = Alignment[alignment as keyof typeof Alignment];
    this.size = characterData.size;
    this.height = characterData.height;
    this.weight = characterData.weight;
    this.eyes = characterData.eyes;
    this.hair = characterData.hair;
    this.deity = characterData.deity;

    //  Misc
    this.level = characterData.level;
    this.experiencePoints = characterData.experiencePoints;
    this.maxRanks = characterData.maxSkillRanks;
    this.speed = characterData.speed;
    this.maxHp = characterData.maxHp;
    this.ac = characterData.ac;
    this.touchAc = characterData.touchAc;
    this.flatFootedAc = characterData.flatFootedAc;
    this.initiative = characterData.initiative;
    this.grapple = characterData.grapple;
    this.spellResistance = characterData.spellResistance;
    this.damageReduction = characterData.damageReduction;
    // this.setBaseAttackBonus(characterData.baseAttackBonus)

    // let currency = JSON.parse(characterData.currency);
    // this.currencyInfo.copper = currency.copper;
    // this.currencyInfo.silver = currency.silver;
    // this.currencyInfo.gold = currency.gold;
    // this.currencyInfo.platinum = currency.platinum;
  }

  //  These are binders for variables to be set via functions
  public setName(value: string){
    this.name = value;
  }
  public setSpeed(value: number){
    this.speed = value;
  }
  public setLevel(value: number){
    this.level = value;
  }
  public setXp(value: number){
    this.experiencePoints = value;
  }
  public setMaxHp(value: number){
    this.maxHp = value;
  }
  public setAc(value: number){
    this.ac = value;
  }
  public setTouchAc(value: number){
    this.touchAc = value;
  }
  public setFlatFootedAc(value: number){
    this.flatFootedAc = value;
  }
  public setInitiative(value: number){
    this.initiative = value;
  }

  public setBaseAttackBonus(value: number[]){
    this.baseAttackBonuses = value;
  }

  public setGrapple(value: number){
    this.grapple = value;
  }

  public setSpellResistance(value: number){
    this.spellResistance = value;
  }

  public setDamageReduction(value: number){
    this.damageReduction = value;
  }
}

export enum Alignment {
  ChaoticEvil = "Chaotic Evil",
  ChaoticNeutral = "Chaotic Neutral",
  ChaoticGood = "Chaotic Good",
  NeutralEvil = "Neutral Evil",
  TrueNeutral = "True Neutral",
  NeutralGood = "Neutral Good",
  LawfulEvil = "Lawful Evil",
  LawfulNeutral = "Lawful Neutral",
  LawfulGood = "Lawful Good"
}

export enum Size {
  Fine = "Fine",
  Diminutive = "Diminutive",
  Tiny = "Tiny",
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
  Huge = "Huge",
  Gargantuan = "Gargantuan",
  Colossal = "Colossal"
}
