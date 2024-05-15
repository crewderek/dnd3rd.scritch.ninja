import { Component, Input } from '@angular/core';
import {Character} from "../../shared/models/character.model";
import {Ability, AbilityName} from "../../shared/models/ability.model";
import {AbilityViewComponent} from "./ability/ability-view.component";

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrl: './abilities.component.css'
})
export class AbilitiesComponent {
  @Input({required: true}) character: Character;
  abilities: Ability[] = [];

  constructor() {}

  ngOnInit(){
    this.abilities = this.character.abilities;
  }

  getAbilitiesByName(name: AbilityName){
    return this.abilities.filter(ability => ability.name === name);
  }

  protected readonly AbilityName = AbilityName;
}
