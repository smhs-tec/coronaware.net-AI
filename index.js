/**
 * check if the user is on mobile or ipad
 */
function isMobile() {
    if (/iPhone|iPad|iPodMobi|Android/i.test(navigator.userAgent)) {
        return true;
    }
    return false;
}

//menu setup
function chartsize() {
    width = document.documentElement.clientWidth;
        if (width < 1300){
            $('.resize').removeClass('s6');
            $('.resize').addClass('s12');
        }
        else {
            $('.resize').removeClass('s12');
            $('.resize').addClass('s6');
        }
}
$(document).ready(function(){
    $('select').formSelect();
    $('.sidenav').sidenav(); 
    chartsize();
    window.onresize = function(event) { 
        $('.sidenav').sidenav(); 
        chartsize();
    }
});

//chart.js setup
function generateSpan(numIn) {
    if(numIn > 0) {
        return '<span style="color:red">+' + numIn+'</span>';
    } else if (numIn == 0) {
        return '<span style="color:green">+' + numIn + '</span>';
    }

    return '<span style="color:green">' + numIn + '</span>';
}

function updateCaptain() {
    let totalActive = currentTable.cases.total_cases[0];
    let totalDeath = currentTable.cases.death[0];
    let totalActivePrev = currentTablePrev.cases.total_cases[0];
    let totalDeathPrev = currentTablePrev.cases.death[0];
    let date = currentTable.date + '/20';

    document.getElementById('captainL').innerHTML = totalActive + '(' + generateSpan(totalActive - totalActivePrev) 
        + ') total cases and ' + totalDeath + '(' + generateSpan(totalDeath - totalDeathPrev) +') deaths as of '+
        date+' (Orange County).  &nbsp; ';
}

function loadLineChart(labels, active, death) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = active;
    chart.data.datasets[1].data = death;
    chart.update();
}

function resetSelecrBars() {
    document.getElementById('sortLine').value = 'total_cases';
    document.getElementById('filterLine').value = 'total';
    document.getElementById('pieL').value = 'spread_vectors';
}

function loadFromString(rowName, columnName) {
    let activeC = [];
    let deathC = [];
    let columnNum = column[columnName];

    for(let ele of cases) {
        activeC.push(ele.cases[rowName][columnNum]);
        deathC.push(ele.cases.death[columnNum]);
    }
    return loadLineChart(dateLabel, activeC, deathC);
}

function loadPieChart(labelsIn, dataIn) {
    chart2.data.labels = labelsIn;
    chart2.data.datasets[0].data = dataIn;
    chart2.update();
}

function updateTable() {
    let result = '';

    for (let [key, value] of Object.entries(currentTable.cases)) {
        let row = '<tr><td>'+ tableFullColName[key] +'</td>';

        for(let ele in value) {
            let todayNum = value[ele];
            let prevNum = currentTablePrev.cases[key][ele];
            row += '<td>' + todayNum + '<span style="margin-left: 10px;"><span>' 
            + generateSpan(todayNum - prevNum) +'</td>';
        }
        
        row += '</tr>';
        result += row;
    }

    document.getElementById('currentT').innerHTML = result;
}

function changeSelectBar() {
    if (!isMobile()) {
        document.getElementById('sortLine').className = 'browser-default';
        document.getElementById('filterLine').className = 'browser-default';
        document.getElementById('pieL').className = 'browser-default';
    }
}

function updateLineChart() {
    let sort_query = document.getElementById('sortLine').value;
    let filter_query = document.getElementById('filterLine').value;
    
    loadFromString(sort_query, filter_query);
}

function updatePieChart() {
    let pie_query = document.getElementById('pieL').value;
    let casess = currentTable.cases;

    switch(pie_query) {
        case 'spread_vectors':
            loadPieChart(['Travel', 'Person to Person (known)', 'Community Acquired', 'Under Investigation'], 
            [casess.travel_related[0], casess.person_to_person_spread[0], casess.community_acquired[0], casess.under_investigation[0]]);
            break;

        case 'gender':
            loadPieChart(['Male', 'Female'], 
            [casess.total_cases[1], casess.total_cases[2]]);
            break;

        case 'age':
            loadPieChart(['< 18', '18 - 49', '50 - 64', '≥ 65'], 
            [casess.total_cases[3], casess.total_cases[4], casess.total_cases[5], casess.total_cases[6]]);  
            break;

    }
}

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Active Cases',
                backgroundColor: 'transparent',
                borderColor: '#ee6e73',
                pointBackgroundColor: '#ee6e73',
                pointRadius: 4,
                pointHoverRadius: 5,
                data: [],
                order: 0
            },
            {
                label: 'Death',
                backgroundColor: 'transparent',
                borderColor: '#aaa',
                pointBackgroundColor: '#aaa',
                data: [],
                order: 1
            },
            {
                label: 'AI Prediction',
                backgroundColor: 'transparent',
                borderColor: '#00BFFF',
                pointBackgroundColor: '#00BFFF',
                pointRadius: 3,
                pointHoverRadius: 4,
                data: predictions,
                order: 2
            }
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 600
                }
            }]
        },
        aspectRatio: 1.5
    }
});

var ctx2 = document.getElementById('myChart2').getContext('2d');
var options = {
    segmentShowStroke: false
};
var chart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            label: 'Pie Chart',
            backgroundColor: ["#1f1231", "#c51162", "#aa00ff", "#90caf9"],
            borderColor: "#111111",
            borderWidth: 0,
            data: []
        
        }]
    },
    options: {}
});

//changeSelectBar();
loadFromString('total_cases', 'total');
updatePieChart();
updateTable();
resetSelecrBars();
updateCaptain();

/* use once every Sunday to print JSON prediction result */
function printAIResult() {
    const net = new brain.recurrent.GRUTimeStep()
    let training = [];
    let nanArray = [];

    for(let ele of cases) {
        training.push(ele.cases.total_cases[0]);
        nanArray.push(NaN);
    }
    net.train([training]);

    console.log(nanArray, net.forecast(training, 7));
}

//printAIResult();