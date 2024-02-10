const hourHand = document.querySelector("#hour");
const minuteHand = document.querySelector("#minute");
const timeTag = document.querySelector(".displayTime");
const addButton = document.querySelector(".addButton");
const selectMenu = document.querySelectorAll("select");
const timeList = document.querySelector(".timeList");

let alarmTime, isAlarmSet;
let xValsStart = ["2/5", "2/6", "2/7", "2/8", "2/9"]; //Date
let yValsStart = [2230, 2330, 2430, 2230, 2200]; //Time
let xValsStop = ["2/6", "2/7", "2/8", "2/9", "2/10"] //Date
let yValsStop = [830, 630, 1200, 300, 1300] //Time
let xValsLength = xValsStart // Date
let yValsLength = [10, 7, 11.5, 4.5, 15] // Time

// assign the values for the option menu
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// function that modifies the position of the clock
function setClock() {
    let currentDate = new Date();
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes();
    let second = currentDate.getSeconds();
    let secondsRatio = second / 60;
    let minutesRatio = (secondsRatio + minute) / 60;
    let hoursRatio = (minutesRatio + hour) / 12;

    //rotation
    hourHand.style.setProperty("--rotation", hoursRatio * 360);
    minuteHand.style.setProperty("--rotation", minutesRatio * 360);

    // display time
    var ampm = hour >= 12 ? 'PM' : 'AM';
    let date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
    let time = (hour % 12) + ":" + minute + ":" + second + " " + ampm;
    
    timeTag.textContent = date + " " + time;
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";
    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? h = 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    if (alarmTime === `${h}:${m} ${ampm}`) {
        alert("Alarm!");
        alarmTime = "";
        timeList.removeChild(timeList.firstElementChild);
        addButton.textContent = "Add Alarm";
        isAlarmSet = false;
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let currentDate = `${day}/${month}`;
        let currentTime = hour * 100 + minute;

        configTimeStop.data.labels.push(currentDate);
        configTimeStop.data.datasets[0].data.push(currentTime);
        myChartStop.update();

    }
});

let count = 0;
function setAlarm() {
    if (isAlarmSet == true) {
        console.log("clear");
        addButton.textContent = "Add Alarm";
        timeList.removeChild(timeList.firstElementChild);
        isAlarmSet = false;
        configTimeStart.data.labels.pop();
        configTimeStart.data.datasets[0].data.pop();
        myChart.update();
        return;
    }
    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    console.log(time);
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    alarmTime = time;
    const newTime = document.createElement("div");
    newTime.setAttribute("class", "timeItem");
    newTime.textContent = alarmTime;
    timeList.appendChild(newTime);
    addButton.textContent = "Clear Alarm";
    isAlarmSet = true;
    count = count + 1;
    console.log(count);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let currentDate = `${day}/${month}`;
    let currentTime = hour * 100 + minute;

    configTimeStart.data.labels.push(currentDate);
    configTimeStart.data.datasets[0].data.push(currentTime);
    myChart.update();

}
addButton.addEventListener("click", setAlarm);

setInterval(setClock, 1000);

setClock();

let configTimeStart = {
    type: "line",
    data: {
        labels: xValsStart,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValsStart
        }]
    },
    options: {
        legend: { display: false },
        title: {
            text: "Daily Time Go to bed ",
            display: true
        }
    }
}
let myChart = new Chart("myChart", configTimeStart);

let configTimeStop = {
    type: "line",
    data: {
        labels: xValsStop,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValsStop
        }]
    },
    options: {
        legend: { display: false },
        title: {
            text: "Daily Time Wake Up",
            display: true
        }
    }
}

let myChartStop = new Chart("myChartStop", configTimeStop);

let configTimeLength = {
    type: "bar",
    data: {
        labels: xValsLength,
        datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValsLength
        }]
    },
    options: {
        legend: { display: false },
        title: {
            text: "Time sleeping",
            display: true
        }
    }
}
let myChartLength = new Chart("myChartLength", configTimeLength);