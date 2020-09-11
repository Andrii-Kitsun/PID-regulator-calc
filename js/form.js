const form = document.forms.initForm;
const elements = document.forms.initForm.elements;

const getFormData = () => {
  let data = [];

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].nodeName === "INPUT" && elements[i].type === "number") {
      const value = Number.parseFloat(elements[i].value);
      data.push(value);
    }
  }

  return data;
};

elements.example.addEventListener("click", () => {
  elements.k.value = 1.96;
  elements.T.value = 23;
  elements.tau.value = 5;
  elements.M.value = 1.5;
  elements.Ti1.value = 1;
  elements.Ti2.value = 1.5;
  elements.Ti3.value = 2;
  elements.Ti4.value = 3;
});

let pid;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  pid = new Regulator(getFormData());

  showCharts();
  drawFormulas();

  const chartsClass = document.querySelector(".charts").classList;
  const optimalClass = document.querySelector(".optimal").classList;
  if (chartsClass.contains("hidden")) {
    chartsClass.toggle("hidden");
    optimalClass.toggle("hidden");
  }

  setTimeout(function () {
    alert(`
    Розраховані значення параметрів ПІД-регулятора:
  
    Пропорційна складова (P): ${pid.optimal.Kp},
    Інтегральна складова (I): ${pid.optimal.Ti},
    Диференціальна складова (D): ${pid.optimal.Td},
    `);
  }, 500);
});
