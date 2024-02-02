import {Component, Input} from '@angular/core';
import {Character} from "../../shared/models/character.model";
import {Weapon} from "../../shared/models/weapon.model";
import {Armor} from "../../shared/models/armor.model";

@Component({
  selector: 'app-armor',
  templateUrl: './armor.component.html',
  styleUrl: './armor.component.css'
})
export class ArmorComponent {
  @Input() character: Character;
  armors: Armor[];

  ngOnInit(){
    this.armors = this.character.armors;
  }
}
