const drawFormulas = function () {
  const objectDiv = document.getElementById("object_func");
  const regulatorDiv = document.getElementById("regulator_func");
  const pFactor = document.getElementById("pFactor");
  const iFactor = document.getElementById("iFactor");
  const dFactor = document.getElementById("dFactor");

  pFactor.textContent = `Пропорційний коефіцієнт підсилення (P): ${pid.optimal.Kp}`;
  iFactor.textContent = `Інтегральний коефіцієнт підсилення (I): ${pid.optimal.Ti}`;
  dFactor.textContent = `Диференціальний коефіцієнт підсилення (D): ${pid.optimal.Td}`;

  katex.render(
    `W_{об}(\\omega) = \\frac{${pid.k}}{${pid.T}\\cdot j\\cdot\\omega+1}\\cdot e^{-j\\cdot\\omega\\cdot\ ${pid.tau}}`,
    objectDiv,
    {
      displayMode: true,
      leqno: false,
      fleqn: false,
      throwOnError: true,
      errorColor: "#cc0000",
      strict: "ignore",
      trust: true,
    }
  );

  katex.render(
    `W_{рег}(\\omega) = ${pid.optimal.Kp}\\cdot\\Big( 1 + \\frac{1}{${pid.optimal.Ti}\\cdot j\\cdot\\omega} + ${pid.optimal.Td}\\cdot j\\cdot\\omega\\Big)`,
    regulatorDiv,
    {
      displayMode: true,
      leqno: false,
      fleqn: false,
      throwOnError: true,
      errorColor: "#cc0000",
      strict: "ignore",
      trust: true,
    }
  );
};
