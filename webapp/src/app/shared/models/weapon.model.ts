import {Damage} from "./damage.model";
import {Gear} from "./gear.model";

export class Weapon {
  attackBonus: number;
  damages: Damage[];
  criticalLowerRange: number;
  criticalMultiplier: number = 2;
  range: number;  //0 is touch
  type: string;
  notes: string;
  isRanged: boolean = false;
  isNonLethal: boolean = false;
  gearInfo: Gear = {} as Gear;

  constructor(attackBonus: number, damage: Damage[], range: number, type: string,
              isRanged: boolean, gear: Gear, criticalLowerRange: number = 20, criticalMultiplier: number = 2,
              notes: string = '', isNonLethal: boolean = false) {
    this.attackBonus = attackBonus;
    this.damages = damage;
    this.criticalLowerRange = criticalLowerRange;
    this.criticalMultiplier = criticalMultiplier;
    this.range = range;
    this.type = type;
    this.notes = notes;
    this.gearInfo = gear;
  }
}
