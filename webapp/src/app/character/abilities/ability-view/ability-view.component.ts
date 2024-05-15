import {Component, Input} from '@angular/core';
import {Ability, AbilityName, AbilityType} from "../../../shared/models/ability.model";

@Component({
  selector: 'app-ability-view',
  templateUrl: './ability-view.component.html',
  styleUrl: './ability-view.component.css'
})
export class AbilityViewComponent {
  @Input() abilityStats: Ability[] = [];
  statsViewable: boolean = false;
  constructor() {}

  ngOnInit(){}

  getBaseAbility(): Ability{
    return this.abilityStats[0];
  }

  getAbilityName(): string{
    return this.getBaseAbility().name;
  }

  getTotalAbilityScore(){
    return this.abilityStats.reduce((a, b) => a + b.score, 0);
  }

  getModifier(){
    return Math.floor((this.getTotalAbilityScore() - 10) / 2);
  }

  //  Get the first 3 characters of the ability name
  getShortName(){
    return this.getBaseAbility().getShortName();
  }

  //   Get all characters after the first 3 of the abilityName
  getReversedShortName(){
    return this.getBaseAbility().getReversedShortName();
  }
}
