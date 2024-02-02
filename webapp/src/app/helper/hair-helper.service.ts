import { Injectable } from '@angular/core';
import * as hairColorsJSON from "../../assets/hair-colors.json";

@Injectable({
  providedIn: 'root'
})
export class HairHelperService {
  private hairColors = hairColorsJSON.hairColors;

  constructor() {}

  getHairColors() {
    return this.hairColors;
  }

  selectRandomHair(): string {
    const randomIndex = Math.floor(Math.random() * this.hairColors.length);
    return this.hairColors[randomIndex].name;
  }
}
