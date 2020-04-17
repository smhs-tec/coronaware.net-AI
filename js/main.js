$(document).ready(function () {
    $('select').formSelect();
    $('.sidenav').sidenav();
    chartsize();
    window.onresize = function (event) {
        $('.sidenav').sidenav();
        chartsize();
        adjustGraph();
    }
    $('.tabs').tabs();
    $('.modal').modal();
});

//menu setup
function chartsize() {
    width = document.documentElement.clientWidth;
    if (width < 1300) {
        $('.resize').removeClass('s6');
        $('.resize').addClass('s12');
    }
    else {
        $('.resize').removeClass('s12');
        $('.resize').addClass('s6');
    }
}