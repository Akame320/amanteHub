$(function () {

    setTimeout(function () {
        for (var i = 0; i < $("[data-question]").length; i++) {
            questionsHeight.push($("[data-question]").eq(i).outerHeight());
        }
        removeHeightQuestion();
        updateQuestion();
    }, 500);

    var doubleClick = false;

    $("[data-question]").on("click", function () {
        if(actionQuestion !== +$(this).attr("data-question")) {
            actionQuestion = +$(this).attr("data-question").valueOf();
            updateQuestion();
            doubleClick = false;
        }else{
            if(doubleClick == false){
                removeHeightQuestion();
                doubleClick = true;
            }else{
                updateQuestion();
                doubleClick = false;
            }
        }
    });

    //Slick slider
    $(".capabilities__slider").slick({
        dots: true,
        appendDots: $(".capabilities__dots"),
        prevArrow: $(".prev.capabilities__btn"),
        nextArrow: $(".next.capabilities__btn"),
        focusOnSelect: true
    });

    $(".close-popup").on("click", function () {
        popup.close();
    });

    $(".open-popup").on("click", function () {
        popup.open();
    });

    var clickPopupWhite = false;

    $("#popup").on("click", function () {

        if(!clickPopupWhite) popup.close();
        clickPopupWhite = false;
    });

    $(".popup__wrapper").on("click", function () {
        clickPopupWhite = true;
    });

    var popup = {
        id: "#popup",
        open: function () {
            $(this.id).removeClass("no-active");
            $(this.id).addClass("active")
        },
        close: function () {
            $(this.id).removeClass("active")
            $(this.id).addClass("no-active")
        }
    }


    //Скролл
    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();

        var blockId = $(this).data('scroll'),
            blockOffset = $(blockId).offset().top;

        $("html , body").animate({
            scrollTop: blockOffset - 200
        }, 1000);

    });

});

var actionQuestion = 1;
var questionsHeight = [];

function updateQuestion() {
    removeHeightQuestion();
    $(`[data-question = ${actionQuestion}]`).removeClass("noAction");
    $(`[data-question = ${actionQuestion}]`).addClass("action");
    $(`[data-question = ${actionQuestion}]`).animate({
        height: questionsHeight[actionQuestion]
    }, 150)
}

function removeHeightQuestion() {
    for (var i = 0; i < $("[data-question]").length; i++) {
        var noActionHeight = $("[data-question]").eq(i).find(".questions__row-title").outerHeight();
        $("[data-question]").removeClass("action");
        $("[data-question]").addClass("noAction");
        $("[data-question]").eq(i).animate({
            height: noActionHeight
        }, 150);
        $(`[data-question]`).css("border-bottom-width", "1px");
        $(`[data-question]`).css("border-top-width", "1px");
        var helpOne = actionQuestion - 1;
        var helpTwo = actionQuestion + 1;
        $(`[data-question = ${helpTwo}]`).css("border-top-width", "0");
        $(`[data-question = ${helpOne}]`).css("border-bottom-width", "0");
    }

}