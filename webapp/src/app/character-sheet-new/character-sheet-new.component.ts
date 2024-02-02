import {Component} from '@angular/core';
import {Character, Alignment} from "../shared/models/character.model";
import {RaceHelperService} from "../helper/race-helper.service";
import {GenderHelperService} from "../helper/gender-helper.service";
import {EyeHelperService} from "../helper/eye-helper.service";
import {HairHelperService} from "../helper/hair-helper.service";
import {SkinHelperService} from "../helper/skin-helper.service";

@Component({
  selector: 'app-character-sheet-new',
  templateUrl: './character-sheet-new.component.html',
  styleUrl: './character-sheet-new.component.css'
})
export class CharacterSheetNewComponent {
  //  Display variables
  showDescription: boolean = false;
  showAttacks: boolean = false;
  showArmor: boolean = false;
  showSpells: boolean = false;
  showSkills: boolean = false;
  showInventory: boolean = false;
  showFeats: boolean = false;
  showSpecialAbilities: boolean = false;

  //Model variables
  character: Character;
  alignmentOptions = Object.values(Alignment);

  constructor(private racesService: RaceHelperService, private genderService: GenderHelperService,
              private eyeService: EyeHelperService, private hairService: HairHelperService, private skinService: SkinHelperService) {
    this.character = new Character();
    this.character.race = racesService.selectRandomRace();
    this.character.gender = genderService.selectRandomGender();
    this.character.eyes = eyeService.selectRandomEyeColor();
    this.character.hair = hairService.selectRandomHair();
    this.character.skin = skinService.selectRandomSkin();
    console.log(this.getCharacterPhysicalDescription());
  }

  getCharacterPhysicalDescription(){
    return ` A dungeons and dragons character: ${this.character.gender} ${this.character.race} with ${this.character.skin} skin, ${this.character.eyes} eyes,
    ${this.character.hair} hair`
  }

  scrollMe(el: HTMLElement) {
    el.scrollIntoView();
  }
}
