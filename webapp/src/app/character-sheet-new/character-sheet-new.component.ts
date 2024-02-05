import {Component} from '@angular/core';
import {Character, Alignment} from "../shared/models/character.model";
import {RaceHelperService} from "../helper/race-helper.service";
import {GenderHelperService} from "../helper/gender-helper.service";
import {EyeHelperService} from "../helper/eye-helper.service";
import {HairHelperService} from "../helper/hair-helper.service";
import {SkinHelperService} from "../helper/skin-helper.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

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
  displayVariables = new CharacterSheetDisplayVariables();
  myName: string = 'string';

  //Model variables
  character: Character;
  alignmentOptions = Object.values(Alignment);

  constructor(private racesService: RaceHelperService, private genderService: GenderHelperService,
              private eyeService: EyeHelperService, private hairService: HairHelperService, private skinService: SkinHelperService,
              private http: HttpClient, private router: ActivatedRoute) {
    this.character = new Character();
    this.character.race = racesService.selectRandomRace();
    this.character.gender = genderService.selectRandomGender();
    this.character.eyes = eyeService.selectRandomEyeColor();
    this.character.hair = hairService.selectRandomHair();
    this.character.skin = skinService.selectRandomSkin();
    // console.log(this.getCharacterPhysicalDescription());
  }

  ngOnInit(){
    //Check if we have the query parameter for the router
    const characterIdParam = this.router.snapshot.queryParamMap.get('characterId');
    if(characterIdParam != null) {
      this.getCharacterData(characterIdParam).subscribe(
        (response) => {
          this.character.parseCharacterData(response[0]);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  }

  getCharacterData(characterId: string): Observable<any> {
    return this.http.get<any>(`${environment.apiEnvUrl()}${environment.characterPath}?characterId=${characterId}`);
  }

  patchCharacterData(characterId: string, columnName: string, columnValue: string | number) : void{
    const url = `${environment.apiEnvUrl()}${environment.characterPath}`;
    const body = {
      "characterId": characterId,
      "columnName": columnName,
      "columnValue": columnValue
    };

    this.http.patch<any>(url, body).subscribe((data) => {
      console.log("hi this is patch request", data);
    });
  }

  getCharacterPhysicalDescription(){
    return ` A dungeons and dragons character: ${this.character.gender} ${this.character.race} with ${this.character.skin} skin, ${this.character.eyes} eyes,
    ${this.character.hair} hair`
  }

  onClickName(toggled:boolean, value: string = this.character.name): void{
    if(this.displayVariables.nameIsToggled  && this.character.name != value){
      this.patchCharacterData(this.character.id, 'name', value);

      this.character.name = value;
    }

    this.displayVariables.nameIsToggled = toggled;
  }

  onClickSpeed(toggled:boolean, value: string = String(this.character.speed)): void{
    const numberValue: number = Number(value);

    if(this.displayVariables.speedIsToggled  && this.character.speed != numberValue){
      this.patchCharacterData(this.character.id, 'speed', numberValue);

      this.character.speed = numberValue;
    }

    this.displayVariables.speedIsToggled = toggled;
  }

  onClickLevel(toggled:boolean, value: string = String(this.character.level)): void{
    const numberValue: number = Number(value);

    if(this.displayVariables.levelIsToggled  && this.character.level != numberValue){
      this.patchCharacterData(this.character.id, 'level', numberValue);

      this.character.level = numberValue;
    }

    this.displayVariables.levelIsToggled = toggled;
  }
}

export class CharacterSheetDisplayVariables{
  nameIsToggled: boolean = false;
  speedIsToggled: boolean = false;
  levelIsToggled: boolean = false;
}
