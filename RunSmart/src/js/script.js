$(document).ready(function () {
	// Carousel

	$('.carousel__inner').slick({
		speed: 500,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/carousel_arrow_left.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/carousel_arrow_right.png"></button>',
		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
				}
			}
		]
	});

	// Catalog

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content')
			.removeClass('catalog__content_active').eq($(this).index())
			.addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__about').eq(i).toggleClass('catalog-item__about_active');
			});
		});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	// Modal

	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn('fast');
	});
	$('.modal__close').on('click', function () {
		$('.overlay, #consultation, #order, #thanks').fadeOut('fast');
	});

	$('.button_mini').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text(
				$('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('fast');
		});
	});

	// Validation

	function validateForms(item) {
		$(item).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Введите ваше имя",
				phone: "Введите ваш номер телефона",
				email: {
					required: "Введите свою почту",
					email: "Почтовый адрес введен неверно"
				}
			}
		});
	}
	
	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');

	function validatePhone(value, item) {
		return value = new Cleave(item, {
			phone: true,
			phoneRegionCode: 'RU'
		});
	}

	var cleave;
	validatePhone(cleave, '#consultation-form [name=phone]');
	validatePhone(cleave, '#consultation [name=phone]');
	validatePhone(cleave, '#order [name=phone]');

	// PHP Mailer

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');
			$('form').trigger('reset');
		});
		return false;
	});

	// Smooth scroll and pageup

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1200 && window.screen.width >= 768) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href=#up],[href=#catalog]").on('click', function() {
		const elementClick = $(this).attr("href");
		const destination = $(elementClick).offset().top;
		jQuery("html:not(:animated),body:not(:animated)").animate({
		  scrollTop: destination
		}, 800);
		return false;
	});

	new WOW().init();
});