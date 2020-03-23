const millSecondInADay = 86400000;

const startDate = new Date("March 9, 2020");
const startTime = startDate.getTime();
const currentTime = new Date().getTime();

var currentParse = startTime;
var dateLabel = [];

while(currentParse < currentTime) {
    let current = new Date(currentParse);

    dateLabel.push((current.getMonth() + 1) + '/' + current.getDate());
    currentParse += millSecondInADay;
}

if(cases[cases.length-1].date != dateLabel[dateLabel.length-1]) {
    dateLabel.splice(-1,1);
}

const currentTable = cases[cases.length-1];