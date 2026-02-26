abstract class Shape {
  abstract area(): number;
}
class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
class Rectangle extends Shape {
  constructor(public width: number, public height: number) {
    super();
  }
  area(): number {
    return this.width * this.height;
  }
}

console.log(new Circle(5).area());
console.log(new Rectangle(4, 6).area());