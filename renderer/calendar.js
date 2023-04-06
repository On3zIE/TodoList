const { BrowserWindow } = require("electron");
const { connection } = require("mongoose");

const calendarEntries = require('../mongo/calendar-entries.model');
require('../mongo/mongoose.config');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let currentDay = new Date().getDate();
const forwardMonth = () => {
    currentMonth++;
    currentYear = new Date(2023, currentMonth + 1, 0).getFullYear();
    displayDates();
}
const backwardMonth = () => {
    currentMonth--;
    console.log(currentMonth);
    currentYear = new Date(2023, currentMonth + 1, 0).getFullYear();
    displayDates();
}

const findCalendarProperties = async () => {
    let conciseCalEntries = {};
    let STUPID = await calendarEntries.find({});
    STUPID.forEach(ce => {
        conciseCalEntries[ce.date] = ce.content;
    })
    console.log(conciseCalEntries);
    return conciseCalEntries;
}

const getDaysArr = async () => {
    var dateNow = new Date();
    var firstDay = new Date(dateNow.getFullYear(), currentMonth, 1).getDay();
    var lastDay = new Date(dateNow.getFullYear(), currentMonth + 1, 0).getDay();
    var daysInMonth = new Date(dateNow.getFullYear(), currentMonth + 1, 0).getDate();
    var daysInPreviousMonth = new Date(dateNow.getFullYear(), currentMonth, 0).getDate();
    realCurrMonth = currentMonth + 1;

    var extraEndDays = 7 - lastDay - 1;

    let conciseCalEntries = await findCalendarProperties();

    var days = [];

    for (let i = daysInPreviousMonth - firstDay + 1; i < daysInPreviousMonth + 1; i++) {   
        realDay = i + 1; 
        let daysObj = { i: i, class: "outOfMonth", date: currentYear + "-" + realCurrMonth - 1 + "-" + realDay, content: "" };
        daysObj.content = conciseCalEntries[daysObj.date];
        days.push(daysObj);
    }

    for (let i = 0; i < daysInMonth; i++) {
        realDay = i + 1;
        let daysObj = { i: i + 1, class: "daysStyle", date: currentYear + "-" + realCurrMonth + "-" + realDay, content: "" };
        daysObj.content = conciseCalEntries[daysObj.date];
        days.push(daysObj);
    }

    for (let i = 0; i < extraEndDays; i++) {
        realDay = i + 1;
        let daysObj = { i: i + 1, class: "outOfMonth", date: currentYear + "-" + realCurrMonth + 1 + "-" + realDay, content: "" };
        daysObj.content = conciseCalEntries[daysObj.date];
        days.push(daysObj);
    }
    if (days.length == 35) for (let i = 2; i < 9; i++) {
        realDay = i + 1;
        let daysObj = { i: i, class: "outOfMonth", date: currentYear + "-" + realCurrMonth + 1 + "-" + realDay, content: "" };
        daysObj.content = conciseCalEntries[daysObj.date];
        days.push(daysObj);
    }

    return days;
}

const displayDates = async () => {
    var monthName = new Date(2000, currentMonth + 1, 0).toLocaleString('default', { month: 'long' });
    document.getElementById("dateName").innerHTML = monthName + ', ';
    document.getElementById("dateName").innerHTML += currentYear;

    var days = await getDaysArr();
    var categoryContainer = document.getElementById("main-Container");
    const calendarBoxes = document.getElementsByClassName("calendarEntries");
    while (calendarBoxes.length > 0) {
        calendarBoxes[0].parentNode.removeChild(calendarBoxes[0]);
    }
    var dateRows = document.createElement("div");
    var row1 = document.createElement("div");
    var row2 = document.createElement("div");
    var row3 = document.createElement("div");
    var row4 = document.createElement("div");
    var row5 = document.createElement("div");
    var row6 = document.createElement("div");
    dateRows.classList.add("calendarEntries");
    dateRows.id = "dateRows";
    console.log(days);
    for (let i = 0; i < days.length; i++) {
        var boxText = document.createTextNode(days[i].i);
        var dateBox = document.createElement("div");
        var textArea = document.createElement("textarea");
        var content = document.createTextNode(days[i].content);
        console.log(content);
        if(days[i].content == undefined) content = document.createTextNode("");
        textArea.classList.add("textArea");
        textArea.appendChild(content);
        dateBox.appendChild(boxText);
        dateBox.appendChild(textArea);
        dateBox.classList.add("dateBox"); 
        dateBox.classList.add(days[i].class);
        
        
        switch(Math.floor(i / 7) + 1) {
            case 1:
                row1.appendChild(dateBox);
                break;
            case 2:
                row2.appendChild(dateBox);
                break;
            case 3:
                row3.appendChild(dateBox);
                break;
            case 4:
                row4.appendChild(dateBox);
                break;
            case 5:
                row5.appendChild(dateBox);
                break;
            case 6:
                row6.appendChild(dateBox);
                break;
            default:
                row1.appendChild(dateBox);
                break;
        }
        
    }
    dateRows.appendChild(row1);
    dateRows.appendChild(row2);
    dateRows.appendChild(row3);
    dateRows.appendChild(row4);
    dateRows.appendChild(row5);
    dateRows.appendChild(row6);
    row1.classList.add("row1");
    categoryContainer.appendChild(dateRows);
    
}

window.onload = () => displayDates();