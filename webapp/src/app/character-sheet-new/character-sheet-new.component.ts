import {Component} from '@angular/core';
import {Character, Alignment, Size} from "../shared/models/character.model";
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
  sizeOptions = Object.values(Size);

  constructor(private racesService: RaceHelperService,
              private genderService: GenderHelperService,
              private eyeService: EyeHelperService,
              private hairService: HairHelperService,
              private skinService: SkinHelperService,
              private http: HttpClient, private router: ActivatedRoute) {
    this.character = new Character(this.http);
    this.character.race = racesService.selectRandomRace();
    this.character.gender = genderService.selectRandomGender();
    this.character.eyes = eyeService.selectRandomEyeColor();
    this.character.hair = hairService.selectRandomHair();
    this.character.skin = skinService.selectRandomSkin();
    // console.log(this.getCharacterPhysicalDescription());
  }

  ngOnInit() {
    //Check if we have the query parameter for the router
    const characterIdParam = this.router.snapshot.queryParamMap.get(
      'characterId');

    if (characterIdParam != null) {
      this.character.getCharacter(characterIdParam).subscribe(
        (response) => {
          this.character.parseCharacterData(response.character);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  }


  patchCharacterData(columnName: string,
                     columnValue: string | number): void {
    this.character.patchCharacter(columnName, columnValue).subscribe((response) => {
        console.log("I worked");
      }, // Handle the error
      (error) => {
        console.error('Error fetching data:', error);
      });
  }

  getCharacterPhysicalDescription() {
    return ` A dungeons and dragons character: ${this.character.gender} ${this.character.race} with ${this.character.skin} skin, ${this.character.eyes} eyes,
    ${this.character.hair} hair`
  }

  //  This function was a PAIN IN MY FUCKING ASS.
  //  Only god knows what this function does and it is wild.
  //  But is required to prevent many duplications :)
  //  Hi from the past :P
  onFocusInput(displayVariableToToggle: string, characterValueToAdjust: keyof Character,
               value: any, toggled: boolean, setValue: (value: number[]) => void,
               setToggle: (toggle: boolean) => void): void;
  onFocusInput(displayVariableToToggle: string, characterValueToAdjust: keyof Character,
               value: number, toggled: boolean, setValue: (value: number) => void,
               setToggle: (toggle: boolean) => void): void;
  onFocusInput(displayVariableToToggle: string, characterValueToAdjust: keyof Character,
               value: string, toggled: boolean, setValue: (value: string) => void,
               setToggle: (toggle: boolean) => void): void
  onFocusInput(displayVariableToToggle: string, characterValueToAdjust: keyof Character,
               value: any, toggled: boolean, setValue: (value: any) => void,
               setToggle: (toggle: boolean) => void) {
    if (this.displayVariables[displayVariableToToggle as keyof typeof this.displayVariables] && this.character[characterValueToAdjust as keyof typeof this.character] != value) {
      if(Array.isArray(value)) {
        this.patchCharacterData(characterValueToAdjust, JSON.stringify(value));
      }else {
        this.patchCharacterData(characterValueToAdjust, value);
      }
      setValue(value);
    }

    // This is to give the submit button a chance to be clicked before focusing out
    setTimeout(() => {
      setToggle(toggled);
    }, 250);
  }

  onFocusName(toggled: boolean, value: string = this.character.name): void {
    this.onFocusInput('nameIsToggled', 'name', value, toggled, this.character.setName.bind(this.character),
      this.displayVariables.setNameToggle.bind(this.displayVariables));
  }

  onFocusSpeed(toggled: boolean,
               value: string = String(this.character.speed)): void {
    this.onFocusInput('speedIsToggled', 'speed', Number(value), toggled, this.character.setSpeed.bind(this.character),
      this.displayVariables.setSpeedToggle.bind(this.displayVariables));
  }

  onFocusLevel(toggled: boolean,
               value: string = String(this.character.level)): void {
    this.onFocusInput('levelIsToggled', 'level', Number(value), toggled, this.character.setLevel.bind(this.character),
      this.displayVariables.setLevelToggle.bind(this.displayVariables));
  }

  onFocusHp(toggled: boolean,
            value: string = String(this.character.level)): void {
    this.onFocusInput('hpIsToggled', 'maxHp', Number(value), toggled, this.character.setMaxHp.bind(this.character),
      this.displayVariables.setHpToggle.bind(this.displayVariables));
  }

  onFocusXp(toggled: boolean,
            value: string = String(this.character.level)): void {
    this.onFocusInput('xpIsToggled', 'experiencePoints', Number(value), toggled,
      this.character.setXp.bind(this.character),
      this.displayVariables.setXpToggle.bind(this.displayVariables));
  }

  onFocusAc(toggled: boolean,
            value: string = String(this.character.level)): void {
    this.onFocusInput('acIsToggled', 'ac', Number(value), toggled,
      this.character.setAc.bind(this.character),
      this.displayVariables.setAcToggle.bind(this.displayVariables));
  }

  onFocusTouch(toggled: boolean,
            value: string = String(this.character.touchAc)): void {
    if(toggled == this.displayVariables.touchAcIsToggled)
      return;

    this.onFocusInput('touchAcIsToggled', 'touchAc', Number(value), toggled,
      this.character.setTouchAc.bind(this.character),
      this.displayVariables.setTouchAcToggle.bind(this.displayVariables));
  }

  onFocusFlatFooted(toggled: boolean,
            value: string = String(this.character.flatFootedAc)): void {
    if(toggled == this.displayVariables.flatFootedAcIsToggled)
      return;

    this.onFocusInput('flatFootedAcIsToggled', 'flatFootedAc', Number(value), toggled,
      this.character.setFlatFootedAc.bind(this.character),
      this.displayVariables.setFlatFootedAcToggle.bind(this.displayVariables));
  }

  onFocusBaseAttackBonus(toggled: boolean,
                    value: string = this.character.baseAttackBonuses.toString()): void {
    if(toggled == this.displayVariables.baseAttackBonusIsToggled)
      return;

    value = '[' + value + ']';
    // console.log(value);
    const numberArray = JSON.parse(value);

    this.onFocusInput('baseAttackBonusIsToggled', 'baseAttackBonuses', numberArray, toggled,
      this.character.setBaseAttackBonus.bind(this.character),
      this.displayVariables.setBaseAttackBonusToggle.bind(this.displayVariables));
  }

  onFocusInitiative(toggled: boolean,
                    value: string = String(this.character.initiative)): void {
    if(toggled == this.displayVariables.initiativeToggled)
      return;

    this.onFocusInput('initiativeToggled', 'initiative', Number(value), toggled,
      this.character.setInitiative.bind(this.character),
      this.displayVariables.setInitiativeToggle.bind(this.displayVariables));
  }

  onFocusGrapple(toggled: boolean,
                    value: string = String(this.character.grapple)): void {
    if(toggled == this.displayVariables.grappleIsToggled)
      return;

    this.onFocusInput('grappleIsToggled', 'grapple', Number(value), toggled,
      this.character.setGrapple.bind(this.character),
      this.displayVariables.setGrappleToggle.bind(this.displayVariables));
  }
  onFocusSpellResistance(toggled: boolean,
                    value: string = String(this.character.spellResistance)): void {
    if(toggled == this.displayVariables.spellResistanceIsToggled)
      return;

    this.onFocusInput('spellResistanceIsToggled', 'spellResistance', Number(value), toggled,
      this.character.setSpellResistance.bind(this.character),
      this.displayVariables.setSpellResistanceToggle.bind(this.displayVariables));
  }
  onFocusDamageReduction(toggled: boolean,
                    value: string = String(this.character.damageReduction)): void {
    if(toggled == this.displayVariables.damageReductionIsToggled)
      return;

    this.onFocusInput('damageReductionIsToggled', 'damageReduction', Number(value), toggled,
      this.character.setDamageReduction.bind(this.character),
      this.displayVariables.setDamageReductionToggle.bind(this.displayVariables));
  }

  inputOnChange(value: number, characterValueToAdjust: string, columnName: string) : void;
  inputOnChange(value: string, characterValueToAdjust: string, columnName: string) : void;
  inputOnChange(value: any, characterValueToAdjust: string, columnName: string): void{
    if(this.character[characterValueToAdjust as keyof typeof this.character] != value){
      this.patchCharacterData(columnName, value);
    }
  }
  onChangeRace(value: string){
    this.inputOnChange(value, 'race', 'race');
    this.character.race = value;
  }
  onChangeAlignment(value: string){
    this.inputOnChange(value, 'alignment', 'alignment');
    this.character.alignment = Alignment[value as keyof typeof Alignment];
  }

  onChangeDeity(value: string){
    this.inputOnChange(value, 'deity', 'deity');
    this.character.deity = value;
  }

  onChangeSize(value: string){
    const size: Size = Size[value as keyof typeof Size];
    if(size == undefined){
      console.log('The entered size is incorrect.');
      return;
    }

    this.inputOnChange(value, 'size', 'size');
    this.character.size = Size[value as keyof typeof Size];
  }
  onChangeAge(value: string){
    const numberValue: number = Number(value);

    this.inputOnChange(value, 'age', 'age');
    this.character.age = numberValue;
  }

  onChangeGender(value: string){
    this.inputOnChange(value, 'gender', 'gender');
    this.character.gender = value;
  }

  onChangeHeight(value: string){
    const numberValue: number = Number(value);

    this.inputOnChange(value, 'height', 'height');
    this.character.height = numberValue;
  }

  onChangeWeight(value: string){
    const numberValue: number = Number(value);

    this.inputOnChange(value, 'weight', 'weight');
    this.character.weight = numberValue;
  }

  onChangeEyes(value: string){
    this.inputOnChange(value, 'eyes', 'eyes');
    this.character.eyes = value;
  }

  onChangeHair(value: string){
    this.inputOnChange(value, 'hair', 'hair');
    this.character.hair = value;
  }

  onChangeSkin(value: string){
    this.inputOnChange(value, 'skin', 'skin');
    this.character.skin = value;
  }
}

export class CharacterSheetDisplayVariables {
  nameIsToggled: boolean = false;
  speedIsToggled: boolean = false;
  levelIsToggled: boolean = false;
  hpIsToggled: boolean = false;
  xpIsToggled: boolean = false;
  acIsToggled: boolean = false;
  touchAcIsToggled: boolean = false;
  flatFootedAcIsToggled: boolean = false;
  initiativeToggled: boolean = false;
  grappleIsToggled: boolean = false;
  baseAttackBonusIsToggled: boolean = false;
  spellResistanceIsToggled: boolean = false;
  damageReductionIsToggled: boolean = false;

  setNameToggle(toggle: boolean) {
    this.nameIsToggled = toggle;
  }

  setSpeedToggle(toggle: boolean) {
    this.speedIsToggled = toggle;
  }

  setLevelToggle(toggle: boolean) {
    this.levelIsToggled = toggle;
  }

  setHpToggle(toggle: boolean) {
    this.hpIsToggled = toggle;
  }

  setXpToggle(toggle: boolean) {
    this.xpIsToggled = toggle;
  }

  setAcToggle(toggle: boolean) {
    this.acIsToggled = toggle;
  }
  setTouchAcToggle(toggle: boolean) {
    this.touchAcIsToggled = toggle;
  }
  setFlatFootedAcToggle(toggle: boolean) {
    this.flatFootedAcIsToggled = toggle;
  }
  setInitiativeToggle(toggle: boolean) {
    this.initiativeToggled = toggle;
  }
  setGrappleToggle(toggle: boolean) {
    this.grappleIsToggled = toggle;
  }
  setBaseAttackBonusToggle(toggle: boolean) {
    this.baseAttackBonusIsToggled = toggle;
  }
  setSpellResistanceToggle(toggle: boolean) {
    this.spellResistanceIsToggled = toggle;
  }
  setDamageReductionToggle(toggle: boolean) {
    this.damageReductionIsToggled = toggle;
  }
}
