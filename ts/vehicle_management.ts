abstract class Vehicle {
    constructor(public brand: string) { }

    abstract move(): void;
}
class Car extends Vehicle {
    move() {
        console.log(`${this.brand} car is moving`);
    }
}
const c = new Car("Audi");
c.move();
