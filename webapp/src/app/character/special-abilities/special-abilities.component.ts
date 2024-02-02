import {Component, Input} from '@angular/core';
import {Character} from "../../shared/models/character.model";
import {SpecialAbility} from "../../shared/models/specialAbility.model";

@Component({
  selector: 'app-special-abilities',
  templateUrl: './special-abilities.component.html',
  styleUrl: './special-abilities.component.css'
})
export class SpecialAbilitiesComponent {
  @Input() character: Character;
  specialAbilities: SpecialAbility[];

  ngOnInit(){
    this.specialAbilities = this.character.specialAbilities;
  }
}
