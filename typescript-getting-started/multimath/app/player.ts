/// <reference path ="person.ts"/>

class Player implements Person {
  name: string;
  age?: number;

  formatName(): string {
    return this.name.toUpperCase();
  }
}
