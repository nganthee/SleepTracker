const xVals = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]; //Date
const yVals = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15]; //Time

new Chart("myChart", {
    type: "line",
    data: {
        labels: xVals,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yVals
        }]
    },
    options: {
        legend: { display: false },
        scales: {
            y: {
                title: {
                  display: true,
                  text: 'Your Title'
                }
              }
        }
    }
});