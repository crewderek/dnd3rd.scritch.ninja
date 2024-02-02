import {Gear} from "./gear.model";

export class Armor {
  type: string;
  acBonus: number;
  maxDexModifier: number;
  checkPenalty: number;
  spellFailure: number;
  maxSpeed: number;
  notes: string;
  gearInfo: Gear = {} as Gear;
  isShield: boolean = false;
  isEquipped: boolean = false;

  constructor(type: string, acBonus: number, maxSpeed: number, maxDexModifier: number, spellFailure: number, gear: Gear, checkPenalty: number = 0,
               notes: string = '', isShield:boolean = false) {
    this.type = type;
    this.acBonus = acBonus;
    this.maxDexModifier = maxDexModifier;
    this.checkPenalty = checkPenalty;
    this.spellFailure = spellFailure;
    this.maxSpeed = maxSpeed;
    this.notes = notes;
    this.gearInfo = gear;
    this.isShield = false;
  }
}
