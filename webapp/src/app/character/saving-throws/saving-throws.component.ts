import {Component, Input} from '@angular/core';
import {Character} from "../../shared/models/character.model";
import {Ability} from "../../shared/models/ability.model";
import {SavingThrow} from "../../shared/models/saving-throw.model";

@Component({
  selector: 'app-saving-throws',
  templateUrl: './saving-throws.component.html',
  styleUrl: './saving-throws.component.css'
})
export class SavingThrowsComponent {
  @Input() character: Character;
  savingThrows: SavingThrow[];

  ngOnInit(){
    this.savingThrows = this.character.savingThrows;
  }
}
