class Complex {
  constructor(real, imaginary) {
    this.x = real;
    this.y = imaginary;
  }

  add(number) {
    if (typeof number === "number") {
      return new Complex(this.x + number, this.y);
    }

    return new Complex(this.x + number.x, this.y + number.y);
  }

  substract(number) {
    if (typeof number === "number") {
      return new Complex(this.x - number, this.y);
    }

    return new Complex(this.x - number.x, this.y - number.y);
  }

  multiply(number) {
    if (typeof number === "number") {
      return new Complex(this.x * number, this.y * number);
    }

    const part1 = this.x * number.x - this.y * number.y;
    const part2 = this.x * number.y + this.y * number.x;

    return new Complex(part1, part2);
  }

  divide(number) {
    if (typeof number === "number") {
      return new Complex(this.x / number, this.y / number);
    }

    const part1 =
      (this.x * number.x + this.y * number.y) / (number.x ** 2 + number.y ** 2);
    const part2 =
      (number.x * this.y - this.x * number.y) / (number.x ** 2 + number.y ** 2);

    return new Complex(part1, part2);
  }

  toString() {
    if (this.y < 0) {
      this.y = this.y * -1;
      return `${this.x} - ${this.y}*i`;
    }

    return `${this.x} + ${this.y}*i`;
  }

  re() {
    return this.x;
  }

  im() {
    return this.y;
  }
}

Complex.add = (first, second) => {
  if (typeof first === "number") {
    return new Complex(second.x + first, second.y);
  }
  if (typeof second === "number") {
    return new Complex(first.x + second, first.y);
  }

  return new Complex(first.x + second.x, first.y + second.y);
};

Complex.substract = (first, second) => {
  if (typeof first === "number") {
    return new Complex(second.x - first, second.y);
  }
  if (typeof second === "number") {
    return new Complex(first.x - second, first.y);
  }

  return new Complex(first.x - second.x, first.y - second.y);
};

Complex.multiply = (first, second) => {
  if (typeof first === "number") {
    return new Complex(second.x * first, second.y * first);
  }
  if (typeof second === "number") {
    return new Complex(first.x * second, first.y * second);
  }

  const part1 = first.x * second.x - first.y * second.y;
  const part2 = first.x * second.y + first.y * second.x;

  return new Complex(part1, part2);
};

Complex.divide = (first, second) => {
  if (typeof first === "number") {
    first = new Complex(first, 0);
  }
  if (typeof second === "number") {
    return new Complex(first.x / second, first.y / second);
  }

  const part1 =
    (first.x * second.x + first.y * second.y) / (second.x ** 2 + second.y ** 2);
  const part2 =
    (second.x * first.y - first.x * second.y) / (second.x ** 2 + second.y ** 2);

  return new Complex(part1, part2);
};

Complex.mod = (number) => {
  return Math.sqrt(number.x ** 2 + number.y ** 2);
};

Complex.log = (number) => {
  const exp1 = Math.log(Math.sqrt(number.x ** 2 + number.y ** 2));
  const exp2 = Complex.I.multiply(Math.atan(number.y / number.x));

  return Complex.add(exp1, exp2);
};

Complex.pow = (first, second) => {
  const powToComplex = (first, second) => {
    const exp1 = Math.pow(first, second.x);
    const exp2 = new Complex(
      Math.cos(second.y * Math.log(first)),
      Math.sin(second.y * Math.log(first))
    );

    return Complex.multiply(exp1, exp2);
  };

  if (typeof first === "number") {
    return powToComplex(first, second);
  }

  const exp1 = Complex.multiply(second, Complex.log(first));

  return powToComplex(Math.exp(1), exp1);
};

Complex.re = (number) => number.x;

Complex.im = (number) => number.y;

Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);
