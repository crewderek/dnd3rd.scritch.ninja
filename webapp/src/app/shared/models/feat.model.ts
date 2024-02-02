export class Feat{
  name: string;
  benefit: string;
  normalRules: string; //This is what normally happens
  specialNotes: string;
  prereqs: string;
  isFlaw: boolean = false;

  constructor(name: string, benefit: string, normalRules: string = '', specialNotes: string = '', prereqs: string = '', isFlaw: boolean = false) {
    this.name = name;
    this.benefit = benefit;
    this.normalRules = normalRules;
    this.specialNotes = specialNotes;
    this.prereqs = prereqs;
    this.isFlaw = isFlaw;
  }
}
