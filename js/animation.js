$(function () {

    var windowh = $(window).height();

    var animItems = [];
    for(var i = 0 ; i < $("[data-anim]").length; i++){
        animItems.push($("[data-anim]").eq(i));
    }

    //get position anim items
    var animItemsPosition = [];
    for(var i = 0 ; i < animItems.length; i++){
        animItemsPosition.push($(animItems[i]).offset().top - 100);
    }

    animItemsPosition[animItemsPosition.length - 1] = animItemsPosition[animItemsPosition.length - 1] - 100;


    //position bot window
    var posBot = $(window).scrollTop() + windowh;

    //start animation start app
    animationAdd();

    $(window).scroll(function () {
        animationAdd();
        posBot = $(window).scrollTop() + windowh;
    });

    function animationAdd() {
        for(var i = 0 ; i < animItems.length; i++){
            if(posBot < animItemsPosition[i]){
                $("[data-anim]").eq(i).removeClass("animation-active");
            }
            if(posBot > animItemsPosition[i]){
                $("[data-anim]").eq(i).addClass("animation-active");
            }
        }
    }
});