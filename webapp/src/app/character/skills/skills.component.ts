import {Component, Input} from '@angular/core';
import {Character} from "../../shared/models/character.model";
import {SavingThrow} from "../../shared/models/saving-throw.model";
import {Skill} from "../../shared/models/skill.model";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  @Input() character: Character;
  skills: Skill[];

  ngOnInit(){
    this.skills = this.character.skills;
  }
}
