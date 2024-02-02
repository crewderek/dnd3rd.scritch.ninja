import { Component, Input } from '@angular/core';
import {Character} from "../../shared/models/character.model";
import {Ability} from "../../shared/models/ability.model";

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrl: './abilities.component.css'
})
export class AbilitiesComponent {
  @Input() character: Character;
  abilities: Ability[];

  constructor() {}

  ngOnInit(){
    this.abilities = this.character.abilities;
  }
}
