import {Component, Input} from '@angular/core';
import {Character} from "../../shared/models/character.model";
import {Gear} from "../../shared/models/gear.model";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  @Input() character: Character;
  inventory: Gear[];

  ngOnInit(){
    this.inventory = this.character.inventory;
  }
}
