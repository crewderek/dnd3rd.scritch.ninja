import {Component, Input} from '@angular/core';
import {Character} from "../../shared/models/character.model";
import {Spell, SpellsKnown} from "../../shared/models/spell.model";

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.css'
})
export class SpellsComponent {
  @Input() character: Character;
  spells: Spell[];
  spellsKnown: SpellsKnown[]

  ngOnInit(){
    this.spells = this.character.spellInfo.spells;
    this.spellsKnown = this.character.spellInfo.spellsKnown;
  }
}
