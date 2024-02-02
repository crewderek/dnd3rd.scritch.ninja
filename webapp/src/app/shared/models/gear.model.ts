export class Gear{
  name: string = "Placeholder";
  weight: number = 0;
  cost: number = -1;
  isCurrentlyCarried: boolean = true;

  constructor(name: string, weight: number = 0, cost: number = -1, isCurrentlyCarried: boolean = true) {
    this.name = name;
    this.weight = weight;
    this.cost = cost;
    this.isCurrentlyCarried = isCurrentlyCarried;
  }
}
