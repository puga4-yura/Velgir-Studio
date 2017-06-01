$(document).ready(function () {
	$(".owl-carousel").owlCarousel({
		rewind: true,
		nav: true,
		loop: true,
		dotsEach: true,
		dotData: true,
		items: 1,
	});
});


$('.cmn-toggle-switch__htx').on('click', function (e) {
	e.preventDefault();
	$('.header__resp-menu').slideToggle();
});
$(window).resize(function () {
	var wid = $(window).width();
	if (wid > 780 && $('.header__resp-menu').is(':hidden')) {
		$('.header__resp-menu').removeAttr('style');
	}
});
(function () {
	var toggles = document.querySelectorAll(".cmn-toggle-switch");
	for (var i = toggles.length - 1; i >= 0; i--) {
		var toggle = toggles[i];
		toggleHandler(toggle);
	};

	function toggleHandler(toggle) {
		toggle.addEventListener("click", function (e) {
			e.preventDefault();
			(this.classList.contains("active") === true) ? this.classList.remove("active"): this.classList.add("active");
		});
	}
})();	