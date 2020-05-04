$(document).ready(function() {
    //append button to bottom of body
    var back_to_top_button = ['<button id="myBtn" title="Go to top">\n' +
    '    <i class="fas fa-long-arrow-alt-up"></i>\n' +
    '</button>'].join("");
    $("body").append(back_to_top_button);

    // Button will be hidden
    $("#myBtn").hide();


    $("#myBtn").on("click", function () { //klick on button
        $('html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    //if window is scrolled use srollFunction
    window.onscroll = function () {
        scrollFunction();
    };

    //shows and hides button if scrolled down
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            $("#myBtn").show();
        } else {
            $("#myBtn").hide();
        }
    }
})