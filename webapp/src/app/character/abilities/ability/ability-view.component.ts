import {Component, Input} from '@angular/core';
import {Ability, AbilityName, AbilityType} from "../../../shared/models/ability.model";

@Component({
  selector: 'app-ability-view',
  templateUrl: './ability-view.component.html',
  styleUrl: './ability-view.component.css'
})
export class AbilityViewComponent {
  @Input() abilityStats: Ability[] = [];
  @Input() abilityName: AbilityName;

  constructor() {}

  ngOnInit(){
    console.log(this.abilityStats);
  }

  getAbilityScore(){
    return this.abilityStats.reduce((a, b) => a + b.score, 0);
  }

  getModifier(){
    return Math.floor((this.getAbilityScore() - 10) / 2);
  }

  //  Get the first 3 characters of the ability name
  getShortName(){
    return this.abilityName.substring(0, 3);
  }

  //   Get all characters after the first 3 of the abilityName
  getReversedShortName(){
    return this.abilityName.substring(3);
  }
}
