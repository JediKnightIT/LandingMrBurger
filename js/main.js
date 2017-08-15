$(document).ready(function() {

    // Открытие полноэкранного меню
    $('.header-hamburger__link').on('click', function(e){
        e.preventDefault();

        $('.fullscreen-menu').show();
    });

    // Закрытие полноэкранного меню
    $('.fullscreen-menu__link-close').on('click', function(e){
        e.preventDefault();

        $('.fullscreen-menu').hide();
    });
});