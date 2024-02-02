import { Injectable } from '@angular/core';
import * as skinTonesJSON from "../../assets/skin-tones.json";

@Injectable({
  providedIn: 'root'
})
export class SkinHelperService {
  private skinTones = skinTonesJSON.skinTones;

  constructor() {}

  getSkinTones() {
    return this.skinTones;
  }

  selectRandomSkin(): string {
    const randomIndex = Math.floor(Math.random() * this.skinTones.length);
    return this.skinTones[randomIndex].name;
  }
}
