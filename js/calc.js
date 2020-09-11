class Regulator {
  OMEGA_START = 0.01;
  OMEGA = 2;
  OMEGA_STEP = 0.01;

  constructor([k, T, tau, M, Ti1, Ti2, Ti3, Ti4]) {
    this.k = k;
    this.T = T;
    this.tau = tau;
    this.M = M;
    this.Ti1 = Ti1;
    this.Ti2 = Ti2;
    this.Ti3 = Ti3;
    this.Ti4 = Ti4;
    this.L1 = 67;
    this.L2 = 42;
    this.L3 = 30;
    this.L4 = 18;

    this.calculate();
  }

  // Calculating coordinates to build ray
  calcRay() {
    const k = Math.tan(Math.asin(1 / this.M));
    let rayCoords = [];

    for (let i = 1; i <= 100; i++) {
      rayCoords.push({
        x: -i + 1,
        y: k * (-i + 1),
      });
    }

    return rayCoords;
  }

  get rayCoords() {
    return this.rayCoordinates;
  }

  calcWobj() {
    let Wobj = [];

    for (let i = this.OMEGA_START; i <= this.OMEGA; i += this.OMEGA_STEP) {
      const p = Complex.I.multiply(i);
      const expression = Complex.divide(
        this.k,
        p.multiply(this.T).add(1)
      ).multiply(Complex.pow(Math.exp(1), p.multiply(-this.tau)));

      Wobj.push(expression);
    }

    return Wobj;
  }

  //Calculating transfer function of system, and returns coordinates to build it
  calcWSystem(Ti) {
    let Wreg = [];
    let Wsys = [];
    const Kp = 1;

    for (let i = this.OMEGA_START; i <= this.OMEGA; i += this.OMEGA_STEP) {
      const p = Complex.I.multiply(i);
      const exp1 = Complex.divide(1, p.multiply(Ti));
      const exp2 = p.multiply(0.5 * Ti);
      const exp3 = Complex.add(1, exp1).add(exp2);

      Wreg.push(Complex.multiply(Kp, exp3));
    }

    for (let i = 0; i < Wreg.length; i++) {
      Wsys.push(Complex.multiply(this.Wobj[i], Wreg[i]));
    }

    return Wsys;
  }

  get WsysCoords() {
    let coordinates = [];

    this.Wsys.forEach((number) => {
      coordinates.push({
        x: number.re(),
        y: number.im(),
      });
    });

    return coordinates;
  }

  calcCircle(L) {
    let circleCoords = [];

    for (let i = 1; i < (Math.PI * 2) / 0.01; i++) {
      const beta = 0.01 * i;
      const exp = new Complex(Math.cos(beta), Math.sin(beta))
        .multiply(L / this.M)
        .substract(L);

      circleCoords.push(exp);
    }

    return circleCoords;
  }

  get circleCoords() {
    return this.circleCoordinates;
  }

  calcKp(L) {
    return this.M ** 2 / (L * (this.M ** 2 - 1));
  }

  calculateOptimalSetting() {
    const KpArr = [this.Kp1, this.Kp2, this.Kp3, this.Kp4];
    const TiArr = [this.Ti1, this.Ti2, this.Ti3, this.Ti4];
    let max = 0,
      indx = 0;

    for (let i = 0; i < KpArr.length; i++) {
      const expr = KpArr[i] / TiArr[i];
      if (expr >= max) {
        max = expr;
        indx = i;
      }
    }

    return {
      Kp: KpArr[indx],
      Ti: TiArr[indx],
      Td: TiArr[indx] * 0.5,
    };
  }

  calculate() {
    this.rayCoordinates = this.calcRay();
    this.Wobj = this.calcWobj();

    this.Wsys1 = this.calcWSystem(this.Ti1);
    this.Wsys2 = this.calcWSystem(this.Ti2);
    this.Wsys3 = this.calcWSystem(this.Ti3);
    this.Wsys4 = this.calcWSystem(this.Ti4);

    this.circleCoordinates1 = this.calcCircle(this.L1);
    this.circleCoordinates2 = this.calcCircle(this.L2);
    this.circleCoordinates3 = this.calcCircle(this.L3);
    this.circleCoordinates4 = this.calcCircle(this.L4);

    this.Kp1 = this.calcKp(this.L1);
    this.Kp2 = this.calcKp(this.L2);
    this.Kp3 = this.calcKp(this.L3);
    this.Kp4 = this.calcKp(this.L4);

    this.optimal = this.calculateOptimalSetting();
  }
}
