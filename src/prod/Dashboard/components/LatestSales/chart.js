import palette from '../palette.js';

export const data = {
  labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', 'Heute'],
  datasets: [
    {
      label: 'Anstehend',
      type: 'bar',
      backgroundColor: palette.primary.main,
      data: [390, 450, 400, 380, 430, 410, 375]
    },
    {
      label: 'Produziert',
      type: 'bar',
      backgroundColor: "green",
      data: [370, 400, 390, 360, 360, 370, 360]
    },
    {
			label: 'Maximale Kapazität',
			type: 'line',
			data: [400, 400, 400, 400, 400, 400, 400],
			fill: false,
			borderColor: '#EC932F',
			backgroundColor: '#EC932F',
			pointBorderColor: '#EC932F',
			pointBackgroundColor: '#EC932F',
			pointHoverBackgroundColor: '#EC932F',
			pointHoverBorderColor: '#EC932F',
		},
  ]
};


export const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  legend: { display: true },
  cornerRadius: 20,
  lineAt: 400,
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  },
  layout: { padding: 0 },
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        ticks: {
          fontColor: palette.text.secondary
        },
        gridLines: {
          display: true,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          fontColor: palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: palette.divider
        }
      }
    ]
  }
};
