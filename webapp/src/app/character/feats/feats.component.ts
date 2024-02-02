import {Component, Input} from '@angular/core';
import {Character} from "../../shared/models/character.model";
import {Feat} from "../../shared/models/feat.model";

@Component({
  selector: 'app-feats',
  templateUrl: './feats.component.html',
  styleUrl: './feats.component.css'
})
export class FeatsComponent {
  @Input() character: Character;
  feats: Feat[];

  ngOnInit(){
    this.feats = this.character.feats;
  }
}
