// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
		event.preventDefault();

        var $anchor = $(this);
        $("html, body").stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - $("nav.navbar").outerHeight() - 10
        }, 250, 'linear');
    });
});

$(document).ready(function() {
	$(".carousel").carousel({
		interval: 5000 //changes the speed
	});

	$("a.photo").click(function(e) {
		$($(this).attr("href") + " img").attr("src", $(this).attr("data-img-url"));
	});
});

// $(document).bind("mouseleave", function(e) {
// 	if($.cookie("displayed_subscribeModal") != "yes" && !disableAutoOpen) {
// 		autoOpen = true;
// 		showModal("#subscribeModal", 1);
// 	}
// });

$(document).ready(function() {
	$("li.subscribe").hover(function() {
		if($.cookie("displayed_subscribeModal") != "yes" && !disableAutoOpen) {
			autoOpen = true;
			showModal("#subscribeModal", 1);
		}
	});
});

var subscribeModalDisplayed = false;
var animationInProgress = false;

function showModal(selector, step, force) {
	force = typeof force != "undefined" ? force : false;

	if(animationInProgress || (subscribeModalDisplayed && !force)) {
		return;
	}

	animationInProgress = true;

	$(selector + " .steps").hide();
	$(selector + " .step" + step).show();

	if(!$(selector).data("oldMargin")) {
		$(selector).data("oldMargin", $(selector).css("margin-top"))
	}

	$(selector).css("z-index", parseInt($(selector).css("z-index")) + 1);

	$(selector).animate({"margin-top": 0}, {duration: 750, complete: function() { subscribeModalDisplayed = true; animationInProgress = false; }});
}

function hideModal(selector) {
	if(animationInProgress || !subscribeModalDisplayed) {
		return;
	}

	$(selector).animate({"margin-top": $(selector).data("oldMargin")}, {duration: 750, complete: function() { subscribeModalDisplayed = false; animationInProgress = false; }});
}

function setSubscribeModalCookie(days) {
	$.cookie("displayed_subscribeModal", "yes", { expires: days, path: "/" });
}

var autoOpen = false;
var disableAutoOpen = false;

function toggleSubscribeForm() {
	if(subscribeModalDisplayed) {
		if(autoOpen == true) {
			showModal("#subscribeModal", 2, true);
			disableAutoOpen = true;
			autoOpen = false;
		} else {
			hideModal("#subscribeModal");
		}
	} else {
		showModal("#subscribeModal", 2);
	}
}

/* Loader : start */
var Loader = {
	class: 'preloader',
	instance: null,

	get: function () {
		if (this.instance === null) {
			this.instance = $('.' + this.class);
		}

		return this.instance;
	},

	show: function () {
		this.get().show();
	},

	hide: function () {
		this.get().hide();
	}
};
/* Loader : end */
