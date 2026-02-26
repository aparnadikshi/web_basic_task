export class User {
    constructor(public name: string) { }
    greet() {
        console.log(`Hello, ${this.name}`);
    }
}