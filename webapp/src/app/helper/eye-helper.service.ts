import { Injectable } from '@angular/core';
import * as eyeColorsJSON from '../../assets/eye-colors.json'

@Injectable({
  providedIn: 'root'
})
export class EyeHelperService {
  private eyeColors = eyeColorsJSON.eyeColors;

  constructor() {}

  getEyeColors() {
    return this.eyeColors;
  }

  selectRandomEyeColor(): string {
    const randomIndex = Math.floor(Math.random() * this.eyeColors.length);
    return this.eyeColors[randomIndex].name;
  }
}
