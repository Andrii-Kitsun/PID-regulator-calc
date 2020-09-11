function randomColorFactor() {
  return Math.round(Math.random() * 255);
}

function randomColor(opacity) {
  return (
    "rgba(" +
    randomColorFactor() +
    "," +
    randomColorFactor() +
    "," +
    randomColorFactor() +
    "," +
    (opacity || ".3") +
    ")"
  );
}

class ChartWrapper {
  config = {
    type: "line",
    data: {
      datasets: [
        {
          label: "Дотична",
          fill: false,
          backgroundColor: "blue",
          borderColor: "blue",
        },
        {
          label: "Перехідна характеристика розімкненої системи",
          fill: false,
          backgroundColor: "red",
          borderColor: "red",
        },
        {
          label: "М-коло",
          fill: false,
          backgroundColor: "green",
          borderColor: "green",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        fontSize: 24,
        fontFamily: `'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif`,
      },
      legend: {
        position: "bottom",
        labels: {
          fontSize: 16,
          fontFamily: `'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif`,
        },
      },
      scales: {
        xAxes: [
          {
            type: "linear",
            ticks: {
              min: -150,
              max: 100,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: -50,
              max: 50,
            },
          },
        ],
      },
      pan: {
        enabled: true,
        mode: "xy",
        speed: 10,
        threshold: 10,
      },
      plugins: {
        zoom: {
          zoom: {
            enabled: true,
            drag: false,
            mode: "xy",
            speed: 0.2,
          },
        },
      },
    },
  };

  resetZoom() {
    this.chart.resetZoom();
  }

  settingColor() {
    this.config.data.datasets.forEach(function (dataset) {
      dataset.borderColor = randomColor(0.4);
      dataset.backgroundColor = randomColor(0.5);
      dataset.pointBorderColor = randomColor(0.7);
      dataset.pointBackgroundColor = randomColor(0.5);
      dataset.pointBorderWidth = 1;
    });
  }

  constructor(id, title, ray, system, circle) {
    this.config.data.datasets[0].data = ray;
    this.config.data.datasets[1].data = system;
    this.config.data.datasets[2].data = circle;
    this.config.options.title.text = title;
    // this.settingColor();

    const canvas = document.getElementById(id);
    this.chart = new window.Chart(canvas, this.config);

    const button = canvas.previousElementSibling;
    button.addEventListener("click", () => {
      this.resetZoom();
    });
  }
}

const showCharts = () => {
  new ChartWrapper(
    "chart1",
    "Перша пара налаштувань",
    pid.rayCoords,
    pid.Wsys1,
    pid.circleCoordinates1
  );

  new ChartWrapper(
    "chart2",
    "Друга пара налаштувань",
    pid.rayCoords,
    pid.Wsys2,
    pid.circleCoordinates2
  );

  new ChartWrapper(
    "chart3",
    "Третя пара налаштувань",
    pid.rayCoords,
    pid.Wsys3,
    pid.circleCoordinates3
  );

  new ChartWrapper(
    "chart4",
    "Четверта пара налаштувань",
    pid.rayCoords,
    pid.Wsys4,
    pid.circleCoordinates4
  );
};
