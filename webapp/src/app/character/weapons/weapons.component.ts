import {Component, Input} from '@angular/core';
import {Character} from "../../shared/models/character.model";
import {Weapon} from "../../shared/models/weapon.model";

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.css'
})
export class WeaponsComponent {
  @Input() character: Character;
  weapons: Weapon[];

  ngOnInit(){
    this.weapons = this.character.weapons;
  }
}
