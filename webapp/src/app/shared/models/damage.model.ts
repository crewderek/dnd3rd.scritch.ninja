export class Damage{
  type: string = "slashing";
  amountTaken: number = 0;
  dieAmount: number = 1;
  dieSides: number = 6;
  bonusDamage: number = 0;
  isNonLethal: boolean = false;
  isFlatBonus: boolean = false;
  isDamageTaken: boolean = false;

  public toString(): string{
    return `
        <label>${this.type}</label>
        <label>${this.dieAmount}d${this.dieSides}+${this.bonusDamage}</label>
    `
  }
}
