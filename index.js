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
function loadLineChart(labels, active, death) {
    return new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Active Cases',
                        backgroundColor: '#ee6e73',
                        borderColor: '#ee6e73',
                        data: active,
                        order: 0
                    }, 
                    {
                        label: 'Death',
                        backgroundColor: '#aaa',
                        borderColor: '#aaa',
                        data: death,
                        order: 1
                    }
                ]
            },
            options: {}
        });
}

function defaultLoad() {
    let activeC = [];
    let deathC = [];
    for(let ele of cases) {
        activeC.push(ele.cases.total_cases[column.total]);
        deathC.push(ele.cases.death[column.total]);
    }
    return loadLineChart(dateLabel, activeC, deathC);
}

var ctx = document.getElementById('myChart').getContext('2d');
var chart = defaultLoad();

var ctx2 = document.getElementById('myChart2').getContext('2d');
var options = {
    segmentShowStroke: false
};
var chart = new Chart(ctx2, {
    type: 'pie',
    data: {
        labels: ['Travel', 'Person to Person (known)', 'Community Acquired', 'Under Investigation'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: ["#1f1231", "#c51162", "#aa00ff", "#90caf9"],
            borderColor: "#111111",
            borderWidth: 0,
            data: [28, 7, 26, 4]
        }]
    },
    options: {}
});