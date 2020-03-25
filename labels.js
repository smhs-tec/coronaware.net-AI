const millSecondInADay = 86400000;

const startDate = new Date("March 9, 2020");
const startTime = startDate.getTime();
const currentTime = new Date().getTime();

var currentParse = startTime;
var dateLabel = [];
var dateLabelPrediction = [];
var dateLabelActual = [];

while(currentParse < currentTime) {
    let current = new Date(currentParse);

    dateLabel.push((current.getMonth() + 1) + '/' + current.getDate());
    currentParse += millSecondInADay;
}

let copyCurrentParse = currentParse - millSecondInADay;
for (let i = 0; i < 7; i++) {
    let current = new Date(copyCurrentParse);

    dateLabelPrediction.push((current.getMonth() + 1) + '/' + current.getDate());
    if (current.getDay() == 1) {
        break;
    }
    copyCurrentParse -= millSecondInADay;
}

for(let i = 0; i < 7; i++) {
    let current = new Date(currentParse);

    dateLabelPrediction.push((current.getMonth() + 1) + '/' + current.getDate());
    if(current.getDay() == 0) {
        break;
    }
    currentParse += millSecondInADay;
}

dateLabelPrediction = dateLabelPrediction.sort();
dateLabelPrediction.shift();

for (let ele of dateLabelPrediction) {
    var found = cases.find(function (element) {
        return element.date == ele;
    }); 

    if (found != undefined) {
        dateLabelActual.push(found.cases.total_cases[0]);
    }
}

if(cases[cases.length-1].date != dateLabel[dateLabel.length-1]) {
    dateLabel.splice(-1,1);
}

const currentTable = cases[cases.length - 1];
const currentTablePrev = cases[cases.length - 2];