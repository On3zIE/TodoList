const { BrowserWindow } = require("electron");

var dateNow = new Date();
var firstDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1).getDay();
var lastDay = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).getDay();
var daysInMonth = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0).getDate();
var daysInPreviousMonth = new Date(dateNow.getFullYear(), dateNow.getMonth(), 0).getDate();

var extraStartDays = 7 - firstDay - 1;
var extraEndDays = 7 - lastDay - 1;

var days = [];

//console.log(daysInPreviousMonth);

for(let i = daysInPreviousMonth - extraStartDays + 1; i < daysInPreviousMonth + 1; i++) {
    const daysObj = {i: i, class: "outOfMonth"};
    console.log(daysObj);
    days.push(daysObj);
}

for(let i = 0; i < daysInMonth; i++) {
    const daysObj = {i: i + 1, class: "daysStyle"};
    console.log(daysObj);
    days.push(daysObj);
}

for(let i = 0; i < extraEndDays; i++) {
    const daysObj = {i: i + 1, class: "outOfMonth"};
    console.log(daysObj);
    days.push(daysObj);
}
if (days.length == 35) for (let i = 2; i < 9; i++) {
    const daysObj = {i: i, class: "outOfMonth"};
    console.log(daysObj);
    days.push(daysObj);
}

console.log(days);

const displayDates = days => {
    var categoryContainer = document.getElementById("main-Container");
    var dateRows = document.createElement("div");
    var row1 = document.createElement("div");
    var row2 = document.createElement("div");
    var row3 = document.createElement("div");
    var row4 = document.createElement("div");
    var row5 = document.createElement("div");
    var row6 = document.createElement("div");
    dateRows.classList.add("calendarEntries");
    dateRows.id = "dateRows";
    for (let i = 0; i < days.length; i++) {
        var boxText = document.createTextNode(days[i].i);
        var dateBox = document.createElement("div");
        var textArea = document.createElement("textarea");
        textArea.classList.add("textArea");
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

window.onload = () => displayDates(days);

