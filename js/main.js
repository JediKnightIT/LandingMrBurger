// OnePageScroll
$(function () {

    var sections = $('.section'),
        display = $('.maincontent'),
        inScroll = false;

     var md = new MobileDetect(window.navigator.userAgent),
        isMobile = md.mobile();

// Передаём номер секции 
    var performTransition = function(sectionEq) {

        if (inScroll) return
            inScroll = true;
// Позиционируем секции        
        var position = (sectionEq * -100) + '%';

        display.css({
            'transform' : 'translateY(' + position + ')',
            '-webkit-transform' : 'translateY(' + position + ')'
        })

// Добавляем/удаляем активный класс для секций
        sections.eq(sectionEq).addClass('active')
           .siblings().removeClass('active');

        setTimeout(function() {
            inScroll = false;
            $('.nav__item').eq(sectionEq).addClass('active')
               .siblings().removeClass('active');
        }, 1300);
    }

// Находим нужную секцию

    var defineSections = function (sections) {
        var activeSection = sections.filter('.active');
        return {
            activeSection: activeSection,
            nextSection: activeSection.next(),
            prevSection: activeSection.prev()
    }
  }


    var scrollToSection = function (direction) {
        var section = defineSections(sections);

        if (direction === 'up' && section.nextSection.length) { //скроллим вверх
         // console.log('Вверх')   

            performTransition(section.nextSection.index());         
        }

        if (direction === 'down' && section.prevSection.length) { //скроллим вниз
         // console.log('Вниз')

            performTransition(section.prevSection.index());                
        }

    }

    $('.wrapper').on ({
        wheel : function(e) {

            var deltaY = e.originalEvent.deltaY;
            var direction = "";

            if (deltaY > 0) {
                direction = 'up';
            }
            else {
                direction = 'down';                
            }
            scrollToSection(direction)
        },

        touchmove: function(e) {
            e.preventDefault();
        }
    });


// Отслеживание перемещения секций по кнопкам  
    $(document).on('keydown', function(e) {
        var section = defineSections(sections);

        switch (e.keyCode) {
            case 40: //Нажатие кнопки вверх
            
            if (section.nextSection.length) {
                performTransition(section.nextSection.index());         
            }
            break;

            case 38: //Нажатие кнопки вниз
            
            if (section.prevSection.length) {
                performTransition(section.prevSection.index());         
            }
            break;
        }
    });

    $('[data-scroll]').on('click', function(e) {
        e.preventDefault();

        var block = $(e.target);    

        performTransition(block.attr('data-scroll'))
    });

    if (isMobile) {
        $(window).swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                scrollToSection(direction);
            }
        });
    }
});




$(document).ready(function () {

    // Открытие полноэкранного меню
    $('.header-hamburger__link').on('click', function (e) {
        e.preventDefault();

        $('.fullscreen-menu').show();
    });

    // Закрытие полноэкранного меню
    $('.fullscreen-menu__link-close').on('click', function (e) {
        e.preventDefault();

        $('.fullscreen-menu').hide();
    });

    $('.fullscreen-menu__link').on('click', function (e) {
        e.preventDefault();

        $('.fullscreen-menu').hide();
    });

    // Открытие ссылки состав
    $('.burgers__link').mouseover(function (e) {
        e.preventDefault();

        $('.burgers__list').fadeIn();
    });

    // Закрытие ссылки состав
    $('.burgers__link-close').on('click', function (e) {
        e.preventDefault();

        $('.burgers__list').fadeOut();
    });
    
});

// Слайдер в секции бургеры
$(function () {

    var moveSlide = function (container, slideNumber) {
        var 
            items = container.find('.burgers__slider-item'),
            activeSlide = items.filter('.active'),
            reqItem = items.eq(slideNumber),
            reqIndex = reqItem.index(),            
            list = container.find('.burgers__slider-list'),
            duration = 500;

        if (reqItem.length) {
            
            list.animate ({
                'right' : reqIndex * 100 + '%'
            }, duration, function () {
                activeSlide.removeClass('active');
                reqItem.addClass('active');
            });
        }
    }

// вешаем обработчик на кнопки переключения слайдера
    $('.burgers__slider-btn').on('click', function(e) {
        e.preventDefault();

        var $this = $(this),
            container = $this.closest('.container'),
            items = $('.burgers__slider-item', container),
            activeItem = items.filter('.active'),
            nextItem = activeItem.next();
            prevItem = activeItem.prev();


        if ($this.hasClass('burgers__slider-right')) {    //листаем вправо

            if (nextItem.length) {
                moveSlide(container, nextItem.index());

            } 
            
            else {
                moveSlide(container, items.first().index());

            }
            
        } 
        
        else {    //листаем влево

            if (prevItem.length) {
                moveSlide(container, prevItem.index());

            } 
            
            else {
                moveSlide(container, items.last().index());

            }
        }
    });
});

// Вертикальный аккордеон в секции команда
$(function () {
    $('.team__name').on('click', function (e) {
        e.preventDefault();
        
    var elem = $(e.target),
        active = elem.closest('.team__item');

        active.toggleClass('active');
        active.siblings().removeClass('active');
    })
})

// Горизонтальный аккордеон в секции меню
$(function () {
    $('.menu__item').on('click', function (e) {
    e.preventDefault();

    var elem = $(e.target),
        active = elem.closest('.menu__item');

        active.toggleClass('active');
        active.siblings().removeClass('active');
    })
})


// Модальное окно в секции отзывы
$(function() {
    $('[data-fancybox]').fancybox({
    });
});


// Форма для заказа в секции заказать

var submitForm = function (ev) {
    ev.preventDefault();
    // console.log(ev);

    var form = $(ev.target);
        
    var request = ajaxForm(form);

    request.done(function(msg) {
        var mes = msg.mes,
            status = msg.status;
        if (status === 'OK') {
            form.append('<p class="success">' + mes + '</p>');
        } else{
            form.append('<p class="error">' + mes + '</p>');
        }
    });

    request.fail(function(jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
}

var ajaxForm = function (form) {

    var url = form.attr('action'),
        data = form.serialize();

    return $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: 'JSON'
    });

}

$('#order-form').on('submit', submitForm);


