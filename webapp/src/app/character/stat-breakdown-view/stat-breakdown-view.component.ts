import {Component, Input} from '@angular/core';
import {Stat} from "../stat";
import {AbilityViewComponent} from "../abilities/ability-view/ability-view.component";

@Component({
  selector: 'app-stat-breakdown-view',
  templateUrl: './stat-breakdown-view.component.html',
  styleUrl: './stat-breakdown-view.component.css'
})
export class StatBreakdownViewComponent {
  @Input({required : true}) stats: Stat[] = [];
  @Input({required: true}) abilityView: AbilityViewComponent;

  getBaseStat(): Stat {
    return this.stats[0];
  }
}
