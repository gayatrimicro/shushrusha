! function($) {
	function mk_text_typer() {
		"use strict";
		$("[data-typer-targets]").each(function() {
			var that = this;
			MK.core.loadDependencies([MK.core.path.plugins + "jquery.typed.js"], function() {
				var $this = $(that),
					$first_string = [$this.text()],
					$rest_strings = $this.attr("data-typer-targets").split(","),
					$strings = $first_string.concat($rest_strings);
				$this.text(""), $this.typed({
					strings: $strings,
					typeSpeed: 30,
					backDelay: 1200,
					loop: !0,
					loopCount: !1
				})
			})
		})
	}

	function mk_tab_slider_func() {
		"use strict";
		$(".mk-tab-slider").each(function() {
			var that = this;
			MK.core.loadDependencies([MK.core.path.plugins + "jquery.swiper.js"], function() {
				function repaintFirefox() {
					$content.css("display", "block"), setTimeout(function() {
						mk_tab_slider.reInit(), $content.css("display", "table")
					}, 100)
				}
				var $this = $(that),
					id = $this.data("id"),
					$autoplayTime = $this.data("autoplay"),
					$content = $(".mk-slider-content"),
					mk_tab_slider = $this.swiper({
						wrapperClass: "mk-tab-slider-wrapper",
						slideClass: "mk-tab-slider-item",
						calculateHeight: !0,
						speed: 500,
						autoplay: isTest ? !1 : $autoplayTime,
						onSlideChangeStart: function() {
							$('.mk-tab-slider-nav[data-id="' + id + '"]').find(".active").removeClass("active"), $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").eq(mk_tab_slider.activeIndex).addClass("active")
						}
					});
				$('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").first().addClass("active"), $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").on("touchstart mousedown", function(e) {
					e.preventDefault(), $('.mk-tab-slider-nav[data-id="' + id + '"]').find(".active").removeClass("active"), $(this).addClass("active"), mk_tab_slider.swipeTo($(this).index())
				}), $('.mk-tab-slider-nav[data-id="' + id + '"]').find("a").click(function(e) {
					e.preventDefault()
				}), repaintFirefox(), $(window).on("resize", repaintFirefox)
			})
		})
	}

	function mk_one_page_scroller() {
		"use strict";
		$(".mk-edge-one-pager").each(function() {
			var self = this;
			MK.core.loadDependencies([MK.core.path.plugins + "jquery.fullpage.js"], function() {
				function swipeTo(href, e) {
					if (href = "_" + href, ~href.indexOf("#")) {
						"undefined" != typeof e && e.preventDefault();
						var section = href.split("#")[1];
						anchorArr.indexOf(section) && (scrollable ? $.fn.fullpage.moveTo(section) : MK.utils.scrollToAnchor('[data-title="' + section + '"]'))
					}
				}
				var $this = $(self),
					anchorArr = [];
				$this.find(".section").each(function() {
					anchorArr.push($(this).attr("data-title"))
				});
				var scrollable = !0;
				$this.find(".section").each(function() {
					var $section = $(this),
						$content = $section.find(".edge-slide-content"),
						contentHeight = ($section.height(), $content.innerHeight());
					contentHeight + 30 > $(window).height() && (scrollable = !1)
				}), scrollable || $this.find(".section").each(function() {
					var $section = $(this);
					$section.addClass("active").css({
						"padding-bottom": "50px"
					})
				}), scrollable && $this.fullpage({
					verticalCentered: !1,
					resize: !0,
					slidesColor: ["#ccc", "#fff"],
					anchors: anchorArr,
					scrollingSpeed: 600,
					easing: "easeInQuart",
					menu: !1,
					navigation: !0,
					navigationPosition: "right",
					navigationTooltips: !1,
					slidesNavigation: !0,
					slidesNavPosition: "bottom",
					loopBottom: !1,
					loopTop: !1,
					loopHorizontal: !0,
					autoScrolling: !0,
					scrollOverflow: !1,
					css3: !0,
					paddingTop: 0,
					paddingBottom: 0,
					normalScrollElements: ".mk-header, .mk-responsive-wrap",
					normalScrollElementTouchThreshold: 5,
					keyboardScrolling: !0,
					touchSensitivity: 15,
					continuousVertical: !1,
					animateAnchor: !0,
					onLeave: function(index, nextIndex, direction) {
						var currentSkin = $this.find(".one-pager-slide").eq(nextIndex - 1).attr("data-header-skin");
						MK.utils.eventManager.publish("firstElSkinChange", currentSkin), $("#fullPage-nav").removeClass("light-skin dark-skin").addClass(currentSkin + "-skin")
					},
					afterRender: function() {
						var $nav = $("#fullPage-nav");
						setTimeout(function() {
							var currentSkin = $this.find(".one-pager-slide").eq(0).attr("data-header-skin");
							MK.utils.eventManager.publish("firstElSkinChange", currentSkin), $nav.length && $nav.removeClass("light-skin dark-skin").addClass(currentSkin + "-skin")
						}, 300);
						var $slide = $this.find(".section"),
							headerHeight = MK.val.offsetHeaderHeight(0),
							windowHeight = $(window).height();
						if ($slide.height(windowHeight - headerHeight), $nav.length) {
							$nav.css({
								top: "calc(50% + " + headerHeight / 2 + "px)",
								marginTop: 0
							});
							var style = $this.attr("data-pagination");
							$nav.addClass("pagination-" + style)
						}
						setTimeout(mk_one_pager_resposnive, 1e3)
					},
					afterResize: function() {
						var $slide = $this.find(".section"),
							headerHeight = MK.val.offsetHeaderHeight(0),
							windowHeight = $(window).height();
						$slide.height(windowHeight - headerHeight), $("#fullPage-nav").css({
							top: "calc(50% + " + headerHeight / 2 + "px)",
							marginTop: 0
						}), setTimeout(mk_one_pager_resposnive, 1e3), console.log("Reposition pager content.")
					}
				});
				var loc = window.location;
				loc.hash && swipeTo(loc.hash), $(document).on("click", "a", function(e) {
					var $link = $(e.currentTarget);
					swipeTo($link.attr("href"), e)
				})
			})
		})
	}

	function mk_one_pager_resposnive() {
		"use strict";
		$(".mk-edge-one-pager").each(function() {
			var $pager = $(this),
				headerHeight = MK.val.offsetHeaderHeight(0),
				windowHeight = $(window).height() - headerHeight;
			$pager.find(".one-pager-slide").each(function() {
				var $slide = $(this),
					$content = $slide.find(".edge-slide-content");
				if ($slide.hasClass("left_center") || $slide.hasClass("center_center") || $slide.hasClass("right_center")) {
					var contentHeight = $content.height(),
						distanceFromTop = (windowHeight - contentHeight) / 2;
					distanceFromTop = 50 > distanceFromTop ? 50 + headerHeight : distanceFromTop, $content.css("marginTop", distanceFromTop)
				}
				if ($slide.hasClass("left_bottom") || $slide.hasClass("center_bottom") || $slide.hasClass("right_bottom")) {
					var distanceFromTop = windowHeight - $content.height() - 90;
					$content.css("marginTop", distanceFromTop)
				}
			})
		})
	}

	function mk_gallery() {
		"use strict";
		$(".mk-gallery .mk-gallery-item.hover-overlay_layer .item-holder").each(function() {
			function updatePosition() {
				var parentHeight = itemHolder.outerHeight(),
					contentHeight = galleryDesc.innerHeight(),
					paddingVal = (parentHeight - contentHeight) / 2;
				galleryDesc.css({
					top: paddingVal
				})
			}
			var itemHolder = $(this),
				galleryDesc = itemHolder.find(".gallery-desc");
			updatePosition(), $(window).on("resize", function() {
				setTimeout(function() {
					updatePosition()
				}, 1e3)
			})
		})
	}

	function mk_theatre_responsive_calculator() {
		var $laptopContainer = $(".laptop-theatre-slider"),
			$computerContainer = $(".desktop-theatre-slider");
		$laptopContainer.each(function() {
			var $this = $(this),
				$window = $(window),
				$windowWidth = $window.outerWidth(),
				$width = ($window.outerHeight(), $this.outerWidth()),
				$height = $this.outerHeight(),
				$paddingTop = 38,
				$paddingRight = 143,
				$paddingBottom = 78,
				$paddingLeft = 143,
				$player = $this.find(".player-container");
			$windowWidth > $width && $player.css({
				"padding-left": parseInt($width * $paddingLeft / 1200),
				"padding-right": parseInt($width * $paddingRight / 1200),
				"padding-top": parseInt($height * $paddingTop / 690),
				"padding-bottom": parseInt($height * $paddingBottom / 690)
			})
		}), $computerContainer.each(function() {
			var $this = $(this),
				$window = $(window),
				$windowWidth = $window.outerWidth(),
				$width = ($window.outerHeight(), $this.outerWidth()),
				$height = $this.outerHeight(),
				$paddingTop = 60,
				$paddingRight = 52,
				$paddingBottom = 290,
				$paddingLeft = 49,
				$player = $this.find(".player-container");
			$windowWidth > $width && $player.css({
				"padding-left": parseInt($width * $paddingLeft / 1200),
				"padding-right": parseInt($width * $paddingRight / 1200),
				"padding-top": parseInt($height * $paddingTop / 969),
				"padding-bottom": parseInt($height * $paddingBottom / 969)
			})
		})
	}

	function mk_mobile_tablet_responsive_calculator() {
		var $laptopSlideshow = $(".mk-laptop-slideshow-shortcode"),
			$lcdSlideshow = $(".mk-lcd-slideshow");
		$.exists(".mk-laptop-slideshow-shortcode") && $laptopSlideshow.each(function() {
			var $this = $(this),
				$window = $(window),
				$width = ($window.outerWidth(), $window.outerHeight(), $this.outerWidth()),
				$height = $this.outerHeight(),
				$paddingTop = 28,
				$paddingRight = 102,
				$paddingBottom = 52,
				$paddingLeft = 102,
				$player = $this.find(".slideshow-container");
			$player.css({
				"padding-left": parseInt($width * $paddingLeft / 836),
				"padding-right": parseInt($width * $paddingRight / 836),
				"padding-top": parseInt($height * $paddingTop / 481),
				"padding-bottom": parseInt($height * $paddingBottom / 481)
			})
		}), $.exists(".mk-lcd-slideshow") && $lcdSlideshow.each(function() {
			var $this = $(this),
				$window = $(window),
				$width = ($window.outerWidth(), $window.outerHeight(), $this.outerWidth()),
				$height = $this.outerHeight(),
				$paddingTop = 35,
				$paddingRight = 39,
				$paddingBottom = 213,
				$paddingLeft = 36,
				$player = $this.find(".slideshow-container");
			$player.css({
				"padding-left": parseInt($width * $paddingLeft / 886),
				"padding-right": parseInt($width * $paddingRight / 886),
				"padding-top": parseInt($height * $paddingTop / 713),
				"padding-bottom": parseInt($height * $paddingBottom / 713)
			})
		})
	}

	function mk_start_tour_resize() {
		$(".mk-header-start-tour").each(function() {
			function updateStartTour() {
				$windowWidth < mk_responsive_nav_width ? ($this.removeClass("hidden"), $this.addClass("show")) : $linkWidth > $padding ? ($this.removeClass("show"), $this.addClass("hidden")) : ($this.removeClass("hidden"), $this.addClass("show"))
			}
			var $windowWidth = $(document).width(),
				$this = $(this),
				$linkWidth = $this.width() + 15,
				$padding = ($windowWidth - mk_responsive_nav_width) / 2;
			setTimeout(function() {
				updateStartTour()
			}, 300)
		})
	}

	function mk_header_social_resize() {
		$(".mk-header-social.header-section").each(function() {
			function updateStartTour() {
				$windowWidth < mk_responsive_nav_width ? ($this.removeClass("hidden"), $this.addClass("show")) : $linkWidth > $padding ? ($this.removeClass("show"), $this.addClass("hidden")) : ($this.removeClass("hidden"), $this.addClass("show"))
			}
			var $windowWidth = $(document).width(),
				$this = $(this),
				$linkWidth = $this.width() + 15,
				$padding = ($windowWidth - mk_responsive_nav_width) / 2;
			setTimeout(function() {
				updateStartTour()
			}, 300)
		})
	}

	function mk_page_section_social_video_bg() {
		$(".mk-page-section.social-hosted").each(function() {
			var player, $container = $(this),
				$sound = $container.data("sound"),
				$source = $container.data("source");
			if ("youtube" == $source) {
				var youtube = $container.find("iframe")[0];
				player = new YT.Player(youtube), setTimeout(function() {
					player.playVideo(), 0 == $sound && player.mute()
				}, 1e3)
			}
			if ("vimeo" == $source) {
				var vimeo = $container.find("iframe")[0];
				player = $f(vimeo), setTimeout(function() {
					player.api("play"), $sound === !1 && player.api("setVolume", 0)
				}, 1e3)
			}
		})
	}

	function videoLoadState() {
		$(".mk-section-video video").each(function() {
			function fire() {
				setTimeout(function() {
					$(mkVideo).animate({
						opacity: 1
					}, 300)
				}, 1e3)
			}
			var mkVideo = this;
			this.onload = fire()
		})
	}

	function mk_accordion_toggles_tooltip() {
		"use strict";
		$(".box-close-btn").on("click", function() {
			return $(this).parent().fadeOut(300), !1
		})
	}

	function mk_portfolio_ajax() {
		"use strict";

		function init() {
			var $portfolio = $(".portfolio-grid.portfolio-ajax-enabled");
			$portfolio.length && MK.core.loadDependencies([MK.core.path.plugins + "jquery.ajax.portfolio.js"], function() {
				setTimeout(function() {
					$portfolio.each(function() {
						$(this).ajaxPortfolio({
							extraOffset: headerHeight
						})
					})
				}, 100)
			})
		}
		var headerHeight = 0;
		$.exists("#wpadminbar") && (headerHeight += $("#wpadminbar").height()), $.exists(".mk-vm-menuwrapper") || (headerHeight += parseInt($(".mk-header").attr("data-sticky-height"))), init(), MK.utils.eventManager.subscribe("ajaxLoaded", init)
	}

	function mk_ajax_search() {
		"use strict";

		function onSearchBoxInput(e) {
			var target = e.target || e.srcElement,
				newValue = target.value;
			searchTerm !== newValue && (searchTerm = newValue, ul.innerHTML = "", searchTerm.length >= minimumLengthToSearch && ($mkAjaxSearchInput.addClass("ajax-searching"), requestCounter++, $.getJSON(ajaxurl + querySpliter + "callback=?&action=mk_ajax_search&security=" + security + "&_wp_http_referer=" + wpHttpReferer + "&term=" + searchTerm).done(showSearchResult).fail(showErrorMessage)))
		}

		function showSearchResult(data) {
			if (responseCounter++, isCorrectResponse()) {
				if (data.length > 0)
					for (var i = 0; i < data.length; i++) {
						var item = data[i];
						$("<li>").append('<a href="' + item.link + '">' + item.image + '<span class="search-title">' + item.label + '</span><span class="search-date">' + item.date + "</span></a>").appendTo(ul)
					} else ul.innerHTML = '<li class="mk-nav-search-result-zero">No Result.</li>';
				$mkAjaxSearchInput.parent("form").removeClass("ajax-searching").addClass("ajax-search-complete")
			}
		}

		function showErrorMessage() {
			responseCounter++, isCorrectResponse() && (ul.innerHTML = '<li class="mk-nav-search-error-message">Can not search! Please try again.</li>')
		}

		function isCorrectResponse() {
			return requestCounter === responseCounter
		}
		if ("beside_nav" === mk_ajax_search_option) {
			var searchTerm, minimumLengthToSearch = 2,
				$mkAjaxSearchInput = $("#mk-ajax-search-input"),
				security = $mkAjaxSearchInput.siblings('input[name="security"]').val(),
				wpHttpReferer = $mkAjaxSearchInput.siblings('input[name="_wp_http_referer"]').val(),
				querySpliter = ajaxurl.indexOf("?") > -1 ? "&" : "?",
				ul = document.getElementById("mk-nav-search-result"),
				requestCounter = 0,
				responseCounter = 0;
			$mkAjaxSearchInput.attr("placeholder", "Enter " + minimumLengthToSearch + " letters to get result..."), $mkAjaxSearchInput.on("paste input propertychange", onSearchBoxInput)
		}
	}

	function mk_backgrounds_parallax() {
		"use strict";
		1 == mk_header_parallax && $(".mk-header-bg").addClass("mk-parallax-enabled"), 1 == mk_body_parallax && $("body").addClass("mk-parallax-enabled"), 1 == mk_banner_parallax && $(".mk-header").addClass("mk-parallax-enabled"), 1 == mk_page_parallax && $("#theme-page").addClass("mk-parallax-enabled"), 1 == mk_footer_parallax && $("#mk-footer").addClass("mk-parallax-enabled"), $(".mk-parallax-enabled").each(function() {
			var $this = $(this);
			MK.utils.isMobile() || MK.core.loadDependencies([MK.core.path.plugins + "jquery.parallax.js"], function() {
				$this.parallax("49%", .3)
			})
		}), $(".mk-fullwidth-slideshow.parallax-slideshow").each(function() {
			var $this = $(this);
			MK.utils.isMobile() || MK.core.loadDependencies([MK.core.path.plugins + "jquery.parallax.js"], function() {
				var speed_factor = $this.attr("data-speedFactor");
				$this.parallax("49%", speed_factor)
			})
		})
	}

	function loop_audio_init() {
		$.exists(".jp-jplayer") && $(".jp-jplayer.mk-blog-audio").each(function() {
			var $this = $(this);
			MK.core.loadDependencies([MK.core.path.plugins + "jquery.jplayer.js"], function() {
				var ogg_file, mp3_file, mk_theme_js_path, css_selector_ancestor = "#" + $this.siblings(".jp-audio").attr("id");
				ogg_file = $this.attr("data-ogg"), mp3_file = $this.attr("data-mp3"), $this.jPlayer({
					ready: function() {
						$this.jPlayer("setMedia", {
							mp3: mp3_file,
							ogg: ogg_file
						})
					},
					play: function() {
						$this.jPlayer("pauseOthers")
					},
					swfPath: mk_theme_js_path,
					supplied: "mp3, ogg",
					cssSelectorAncestor: css_selector_ancestor,
					wmode: "window"
				})
			})
		})
	}

	function mk_blog_carousel() {
		"use strict";
		$.exists(".mk-blog-showcase") && $(".mk-blog-showcase ul li").each(function() {
			$(this).on("hover", function() {
				$(this).siblings("li").removeClass("mk-blog-first-el").end().addClass("mk-blog-first-el")
			})
		})
	}

	function mk_contact_form() {
		"use strict";
		$(".mk-contact-form").length && ($(".mk-contact-form").each(function() {
			var $this = $(this),
				$input = $this.find("input, textarea"),
				activeClass = "is-active";
			$input.filter("[type=email]").attr("type", "emailModern");
			var setActive = function() {
					$(this).parent().addClass(activeClass)
				},
				unsetActive = function() {
					isEmpty(this) && $(this).parent().removeClass(activeClass)
				},
				isEmpty = function(el) {
					return "" === $(el).val()
				},
				markActive = function() {
					var $this = $(this);
					$this.on({
						focus: setActive,
						blur: unsetActive
					})
				};
			$input.each(markActive)
		}), MK.core.loadDependencies([MK.core.path.plugins + "jquery.tools.validator.js"], function() {
			$.post(ajaxurl, {
				action: "mk_create_captcha_image"
			}, function(response) {
				$(".captcha-image-holder").append('<img src="' + response + '" class="captcha-image" alt="captcha txt">')
			}), $.tools.validator.addEffect("contact_form", function(errors) {
				$.each(errors, function(index, error) {
					var input = error.input;
					input.addClass("mk-invalid")
				})
			}, function(inputs) {
				inputs.removeClass("mk-invalid")
			}), $(".captcha-change-image").on("click", function(e) {
				e.preventDefault(), changeCaptcha()
			}), $(".mk-contact-form").find("[type=email]").attr("type", "emailModern"), $.tools.validator.fn("[type=emailModern]", "Please supply a valid email address for me", function(input, value) {
				return /^([a-z0-9_\.\-\+]+)@([\da-z\.\-]+)\.([a-z\.]{2,63})$/i.test(value)
			});
			var sendForm, changeCaptcha = function() {
					$.post(ajaxurl, {
						action: "mk_create_captcha_image"
					}, function(response) {
						$(".captcha-image").attr("src", response + "?" + (new Date).getTime())
					})
				},
				checkCaptcha = function(form, enteredCaptcha) {
					window.get.captcha(enteredCaptcha).done(function(data) {
						"ok" != data ? (changeCaptcha(), form.find(".captcha-form").val("").addClass("contact-captcha-invalid").attr("placeholder", mk_captcha_invalid_txt)) : (sendForm(), changeCaptcha(), form.find(".captcha-form").val("").addClass("contact-captcha-valid").attr("placeholder", mk_captcha_correct_txt))
					})
				};
			$(".mk-contact-form").validator({
				effect: "contact_form"
			}).submit(function(e) {
				var form = $(this),
					captcha_text = form.find(".captcha-form").attr("data-placeholder");
				if (!e.isDefaultPrevented()) {
					var data = {
						action: "mk_contact_form",
						security: form.find('input[name="security"]').val(),
						_wp_http_referer: form.find('input[name="_wp_http_referer"]').val(),
						p_id: form.find('input[name="p_id"]').val(),
						sh_id: form.find('input[name="sh_id"]').val(),
						name: form.find('input[name="contact_name"]').val(),
						last_name: form.find('input[name="contact_last_name"]').val(),
						phone: form.find('input[name="contact_phone"]').val(),
						email: form.find('input[name="contact_email"]').val(),
						website: form.find('input[name="contact_website"]').val(),
						content: form.find('textarea[name="contact_content"]').val()
					};
					sendForm = function() {
						progressButton.loader(form), $.post(ajaxurl, data, function(response) {
							var res = JSON.parse(response);
							form.find(".captcha-form").removeClass("contact-captcha-valid contact-captcha-invalid").attr("placeholder", captcha_text), res.action_Status ? (progressButton.success(form), form.find(".text-input").val(""), form.find("textarea").val(""), form.find(".contact-form-message").html("")) : (progressButton.error(form), form.find(".contact-form-message").html(res.message))
						})
					};
					var enteredCaptcha = form.find('input[name="captcha"]').val();
					form.find(".captcha-form").length ? checkCaptcha(form, enteredCaptcha) : sendForm(), e.preventDefault()
				}
			})
		}))
	}

	function mk_login_form() {
		$("form.mk-login-form").each(function() {
			var $this = $(this);
			$this.on("submit", function(e) {
				$("p.mk-login-status", $this).show().text(ajax_login_object.loadingmessage), $.ajax({
					type: "POST",
					dataType: "json",
					url: ajax_login_object.ajaxurl,
					data: {
						action: "ajaxlogin",
						username: $("#username", $this).val(),
						password: $("#password", $this).val(),
						security: $("#security", $this).val()
					},
					success: function(data) {
						$("p.mk-login-status", $this).text(data.message), data.loggedin === !0 && (document.location.href = ajax_login_object.redirecturl)
					}
				}), e.preventDefault()
			})
		})
	}

	function mk_click_events() {
		"use strict";
		var eventtype = "click";
		$(".mk-header-login, .mk-header-signup, .mk-side-dashboard, .mk-quick-contact-wrapper, .mk-dashboard-trigger, .blog-share-container, .news-share-buttons, .main-nav-side-search, #mk-fullscreen-search-wrapper, #fullscreen-navigation").on(eventtype, function(event) {
			event.stopPropagation ? event.stopPropagation() : window.event && (window.event.cancelBubble = !0)
		}), $("html").on(eventtype, function() {
			$(".mk-login-register, .mk-header-subscribe, #mk-quick-contact, .single-share-buttons, .single-share-box, .blog-social-share, .news-share-buttons, #mk-nav-search-wrapper").fadeOut(300), $(".mk-quick-contact-link").removeClass("quick-contact-active")
		}), $(".mk-fullscreen-search-overlay").on(eventtype, function() {
			$(this).removeClass("mk-fullscreen-search-overlay-show")
		}), $(".mk-forget-password").on(eventtype, function() {
			$(".mk-forget-panel").siblings().hide().end().show()
		}), $(".mk-create-account").on(eventtype, function() {
			$("#mk-register-panel").siblings().hide().end().show()
		}), $(".mk-return-login").on(eventtype, function() {
			$("#mk-login-panel").siblings().hide().end().show()
		}), $(".mk-quick-contact-link").on(eventtype, function() {
			var $this = $(this),
				$quickContact = $("#mk-quick-contact");
			return $this.hasClass("quick-contact-active") ? ($quickContact.removeClass("quick-contact-anim").fadeOut(100), $this.removeClass("quick-contact-active")) : ($quickContact.addClass("quick-contact-anim").fadeIn(250), $this.addClass("quick-contact-active")), !1
		})
	}

	function mk_social_share_global() {
		"use strict";
		var eventtype = "click";
		$(".twitter-share").on(eventtype, function() {
			var $this = $(this),
				$url = $this.attr("data-url"),
				$title = $this.attr("data-title");
			return window.open("http://twitter.com/intent/tweet?text=" + $title + " " + $url, "twitterWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
		}), $(".pinterest-share").on(eventtype, function() {
			var $this = $(this),
				$url = $this.attr("data-url"),
				$title = $this.attr("data-title"),
				$image = $this.attr("data-image");
			return window.open("http://pinterest.com/pin/create/button/?url=" + $url + "&media=" + $image + "&description=" + $title, "twitterWindow", "height=320,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
		}), $(".facebook-share").on(eventtype, function() {
			var $url = $(this).attr("data-url");
			return window.open("https://www.facebook.com/sharer/sharer.php?u=" + $url, "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
		}), $(".googleplus-share").on(eventtype, function() {
			var $url = $(this).attr("data-url");
			return window.open("https://plus.google.com/share?url=" + $url, "googlePlusWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
		}), $(".linkedin-share").on(eventtype, function() {
			var $this = $(this),
				$url = $this.attr("data-url"),
				$title = $this.attr("data-title"),
				$desc = $this.attr("data-desc");
			return window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + $url + "&title=" + $title + "&summary=" + $desc, "linkedInWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0"), !1
		})
	}

	function mk_event_countdown() {
		$.exists(".mk-event-countdown") && MK.core.loadDependencies([MK.core.path.plugins + "jquery.countdown.js"], function() {
			$(".mk-event-countdown").each(function() {
				if (!isTest) {
					var $this = $(this),
						$date = $this.attr("data-date"),
						$offset = $this.attr("data-offset");
					$this.downCount({
						date: $date,
						offset: $offset
					})
				}
			})
		})
	}

	function mk_flexslider_init() {
		var $lcd = $(".mk-lcd-slideshow"),
			$laptop = $(".mk-laptop-slideshow-shortcode");
		$lcd.length && $lcd.find(".mk-lcd-image").fadeIn(), $laptop.length && $laptop.find(".mk-laptop-image").fadeIn(), $(".js-flexslider").each(function() {
			($(this).parents(".mk-tabs").length || $(this).parents(".mk-accordion").length) && $(this).removeData("flexslider");
			var $this = $(this),
				$selector = $this.attr("data-selector"),
				$animation = $this.attr("data-animation"),
				$easing = $this.attr("data-easing"),
				$direction = $this.attr("data-direction"),
				$smoothHeight = "true" == $this.attr("data-smoothHeight"),
				$slideshowSpeed = $this.attr("data-slideshowSpeed"),
				$animationSpeed = $this.attr("data-animationSpeed"),
				$controlNav = "true" == $this.attr("data-controlNav"),
				$directionNav = "true" == $this.attr("data-directionNav"),
				$pauseOnHover = "true" == $this.attr("data-pauseOnHover"),
				$isCarousel = "true" == $this.attr("data-isCarousel");
			if (void 0 !== $selector) var $selector_class = $selector;
			else var $selector_class = ".mk-flex-slides > li";
			if ($isCarousel === !0) var $itemWidth = parseInt($this.attr("data-itemWidth")),
				$itemMargin = parseInt($this.attr("data-itemMargin")),
				$minItems = parseInt($this.attr("data-minItems")),
				$maxItems = parseInt($this.attr("data-maxItems")),
				$move = parseInt($this.attr("data-move"));
			else var $itemWidth = $itemMargin = $minItems = $maxItems = $move = 0;
			MK.core.loadDependencies([MK.core.path.plugins + "jquery.flexslider.js"], function() {
				$this.flexslider({
					selector: $selector_class,
					animation: $animation,
					easing: $easing,
					direction: $direction,
					smoothHeight: $smoothHeight,
					slideshow: !isTest,
					slideshowSpeed: $slideshowSpeed,
					animationSpeed: $animationSpeed,
					controlNav: $controlNav,
					directionNav: $directionNav,
					pauseOnHover: $pauseOnHover,
					prevText: "",
					nextText: "",
					itemWidth: $itemWidth,
					itemMargin: $itemMargin,
					minItems: $minItems,
					maxItems: $maxItems,
					move: $move
				})
			})
		})
	}

	function mk_header_searchform() {
		$(".mk-search-trigger").click(function() {
			setTimeout(function() {
				$("#mk-ajax-search-input").focus()
			}, 500)
		}), $(".mk-header-toolbar .mk-header-searchform .text-input").on("focus", function() {
			return $(".mk-header-toolbar .mk-header-searchform .text-input").hasClass("on-close-state") ? ($(".mk-header-toolbar .mk-header-searchform .text-input").removeClass("on-close-state").animate({
				width: "200px"
			}, 200), !1) : void 0
		}), $(".mk-header-toolbar .mk-header-searchform").click(function(event) {
			event.stopPropagation ? event.stopPropagation() : window.event && (window.event.cancelBubble = !0)
		}), $("html").click(function() {
			$(this).find(".mk-header-toolbar .mk-header-searchform .text-input").addClass("on-close-state").animate({
				width: 90
			}, 300)
		})
	}

	function mk_hover_events() {
		"use strict";
		$(".shopping-cart-header").hover(function() {
			$(this).find(".mk-shopping-cart-box").stop(!0, !0).fadeIn(250)
		}, function() {
			$(this).find(".mk-shopping-cart-box").stop(!0, !0).fadeOut(250)
		}), $(".widget-sub-navigation > ul > li, .widget_nav_menu ul.menu > li, .widget_product_categories ul > .cat-item").each(function() {
			var $this = $(this),
				$subLevel = $this.find("ul").first();
			($this.hasClass("page_item_has_children") || $this.hasClass("menu-item-has-children") || $this.hasClass("cat-parent")) && $this.hover(function() {
				setTimeout(function() {
					$subLevel.stop(!0, !0).slideDown(700)
				}, 500)
			}, function() {
				setTimeout(function() {
					$subLevel.stop(!0, !0).slideUp(700)
				}, 500)
			})
		});
		var eventtype = "click";
		$(".mk-fullscreen-trigger").on(eventtype, function(e) {
			$(".mk-fullscreen-search-overlay").addClass("mk-fullscreen-search-overlay-show"), setTimeout(function() {
				$("#mk-fullscreen-search-input").focus()
			}, 300), e.preventDefault()
		}), $(".mk-fullscreen-close").on(eventtype, function(e) {
			$(".mk-fullscreen-search-overlay").removeClass("mk-fullscreen-search-overlay-show"), e.preventDefault()
		})
	}

	function mk_unfold_footer() {
		var $this = $("#mk-footer"),
			$spacer = $("#mk-footer-unfold-spacer"),
			$footerHeight = $this.outerHeight();
		window.matchMedia("(max-width: 767px)").matches ? $spacer.css("height", 0) : $this.hasClass("mk-footer-unfold") && $spacer.css("height", $footerHeight)
	}

	function mk_lightbox_init() {
		var $lightbox = $(".mk-lightbox");
		$lightbox.fancybox({
			padding: 15,
			margin: 15,
			width: 800,
			height: 600,
			minWidth: 100,
			minHeight: 100,
			maxWidth: 9999,
			maxHeight: 9999,
			pixelRatio: 1,
			autoSize: !0,
			autoHeight: !1,
			autoWidth: !1,
			autoResize: !0,
			fitToView: !0,
			aspectRatio: !1,
			topRatio: .5,
			leftRatio: .5,
			scrolling: "auto",
			wrapCSS: "",
			arrows: !0,
			closeBtn: !0,
			closeClick: !1,
			nextClick: !1,
			mouseWheel: !0,
			autoPlay: !1,
			playSpeed: 3e3,
			preload: 3,
			modal: !1,
			loop: !0,
			openEffect: "fade",
			openSpeed: 200,
			openEasing: "swing",
			openOpacity: !0,
			openMethod: "zoomIn",
			closeEffect: "fade",
			closeSpeed: 200,
			closeEasing: "swing",
			closeOpacity: !0,
			closeMethod: "zoomOut",
			nextEffect: "none",
			nextSpeed: 350,
			nextEasing: "swing",
			nextMethod: "changeIn",
			prevEffect: "none",
			prevSpeed: 350,
			prevEasing: "swing",
			prevMethod: "changeOut",
			helpers: {
				media: {},
				overlay: {
					locked: !0
				}
			},
			tpl: {
				wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image: '<img class="fancybox-image" src="{href}" alt="" />',
				error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><i><svg class="mk-svg-icon" svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M390.628 345.372l-45.256 45.256-89.372-89.373-89.373 89.372-45.255-45.255 89.373-89.372-89.372-89.373 45.254-45.254 89.373 89.372 89.372-89.373 45.256 45.255-89.373 89.373 89.373 89.372z"/></svg></i></a>',
				next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span><i><svg class="mk-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M144 505.6c8 0 16-3.2 22.4-8l240-225.6c6.4-6.4 9.6-14.4 9.6-22.4s-3.2-16-9.6-22.4l-240-224c-12.8-12.8-32-12.8-44.8 0s-11.2 32 1.6 44.8l214.4 201.6-216 203.2c-12.8 11.2-12.8 32 0 44.8 6.4 4.8 14.4 8 22.4 8z"/></svg></i></span></a>',
				prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span><i><svg class="mk-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M368 505.6c-8 0-16-3.2-22.4-8l-240-225.6c-6.4-6.4-9.6-14.4-9.6-24 0-8 3.2-16 9.6-22.4l240-224c12.8-11.2 33.6-11.2 44.8 1.6 12.8 12.8 11.2 32-1.6 44.8l-214.4 201.6 216 203.2c12.8 11.2 12.8 32 0 44.8-4.8 4.8-14.4 8-22.4 8z"/></svg></i></span></a>',
				loading: '<div id="fancybox-loading"><div></div></div>'
			},
			afterLoad: function() {
				$("html").addClass("fancybox-lock"), $(".fancybox-wrap").appendTo(".fancybox-overlay")
			}
		})
	}

	function mk_love_post() {
		"use strict";
		$("body").on("click", ".mk-love-this", function() {
			var $this = $(this),
				$id = $this.attr("id");
			if ($this.hasClass("item-loved")) return !1;
			if ($this.hasClass("item-inactive")) return !1;
			var $sentdata = {
				action: "mk_love_post",
				post_id: $id
			};
			return $.post(ajaxurl, $sentdata, function(data) {
				$this.find(".mk-love-count").html(data), $this.addClass("item-loved")
			}), $this.addClass("item-inactive"), !1
		})
	}

	function mk_milestone() {
		"use strict";
		!isTest && $.exists(".mk-milestone") && $(".mk-milestone").each(function() {
			var $this = $(this),
				stop_number = $this.find(".milestone-number").attr("data-stop"),
				animation_speed = parseInt($this.find(".milestone-number").attr("data-speed")),
				build = function() {
					$this.hasClass("scroll-animated") || ($this.addClass("scroll-animated"), $({
						countNum: $this.find(".milestone-number").text()
					}).animate({
						countNum: stop_number
					}, {
						duration: animation_speed,
						easing: "linear",
						step: function() {
							$this.find(".milestone-number").text(Math.floor(this.countNum))
						},
						complete: function() {
							$this.find(".milestone-number").text(this.countNum)
						}
					}))
				};
			MK.utils.isMobile() ? build() : MK.utils.scrollSpy(this, {
				position: "bottom",
				after: build
			})
		})
	}

	function mk_portfolio_widget() {
		"use strict";
		$(".widget_recent_portfolio li").each(function() {
			$(this).find(".portfolio-widget-thumb").hover(function() {
				$(this).siblings(".portfolio-widget-info").animate({
					opacity: 1
				}, 200)
			}, function() {
				$(this).siblings(".portfolio-widget-info").animate({
					opacity: 0
				}, 200)
			})
		})
	}

	function mk_skill_meter() {
		"use strict";
		$.exists(".mk-skill-meter") && (MK.utils.isMobile() ? $(".mk-skill-meter .progress-outer").each(function() {
			var $this = $(this);
			$this.hasClass("scroll-animated") || ($this.addClass("scroll-animated"), $this.css({
				width: $(this).attr("data-width") + "%"
			}))
		}) : $(".mk-skill-meter .progress-outer").each(function() {
			var $this = $(this),
				build = function() {
					$this.hasClass("scroll-animated") || ($this.addClass("scroll-animated"), $this.animate({
						width: $this.attr("data-width") + "%"
					}, 2e3))
				};
			MK.utils.scrollSpy(this, {
				position: "bottom",
				after: build
			})
		}))
	}

	function mk_tabs() {}

	function mk_tabs_responsive() {}

	function product_loop_add_cart() {
		var $body = $("body");
		$body.on("click", ".add_to_cart_button", function() {
			var icon = '<svg class="mk-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M437.011 74.99c-46.326-46.328-110.318-74.99-181.011-74.99-109.744 0-203.345 69.064-239.749 166.094l59.938 22.477c27.302-72.773 97.503-124.571 179.811-124.571 53.02 0 101.01 21.5 135.753 56.247l-71.753 71.753h192v-192l-74.989 74.99zm-181.011 373.01c-53.02 0-101.013-21.496-135.756-56.244l71.756-71.756h-192v192l74.997-74.997c46.323 46.331 110.309 74.997 181.003 74.997 109.745 0 203.346-69.064 239.75-166.094l-59.938-22.477c-27.302 72.773-97.503 124.571-179.812 124.571z"/></svg>',
				$holder = $(this).parents(".product:eq(0)"),
				$i = $holder.find(".product-loading-icon");
			$holder.addClass("adding-to-cart").removeClass("added-to-cart"), $i.html(icon)
		}), $body.bind("added_to_cart", function() {
			var icon = '<svg class="mk-svg-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M432 64l-240 240-112-112-80 80 192 192 320-320z"/></svg>',
				$holder = $(".adding-to-cart"),
				$i = $holder.find(".product-loading-icon");
			$holder.removeClass("adding-to-cart").addClass("added-to-cart"), $i.html(icon)
		})
	}
	var MK = {
		api: {},
		ui: {},
		component: {}
	};

	var header = `<div class="mk-header-holder">
                    <div class="mk-header-inner add-header-height">
                        <div class="mk-header-bg mk-background-stretch"></div>
                        <div class="mk-grid header-grid">
                            <div class="mk-header-nav-container one-row-style menu-hover-style-1" itemscope="itemscope" itemtype="https://schema.org/SiteNavigationElement" role="navigation">
                                <nav class="mk-main-navigation js-main-nav">
                                    <ul class="main-navigation-ul" id="menu-main-menu">
                                        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children has-mega-menu" id="menu-item-10145">
                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/">HOME</a>
                                        </li>

                                        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children has-mega-menu" id="menu-item-10145">
                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/opd/">OPD SCHEDULE</a>
                                        </li>

                                        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children has-mega-menu" id="menu-item-11793">
                                            <a class="menu-item-link js-smooth-scroll">OUR SERVICES</a>
                                            <ul class="sub-menu mega_col_12" style="">
                                                <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children mega_col_4" id="menu-item-11797">
                                                    <div class="megamenu-title">
                                                        Shushrusha Services
                                                    </div>
                                                    <ul class="sub-menu mega_col_4" style="">
                                                        <li class="menu-item menu-item-type-custom menu-item-object-custom" id="menu-item-12765">
                                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/medical_services/">Medical & Emergency Services</a>
                                                        </li>
                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-12024">
                                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/medical_facilities/">Medical Facilities</a>
                                                        </li>
                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-12024">
                                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/community_services/">Community Services</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children mega_col_4" id="menu-item-11796">
                                                    <div class="megamenu-title">
                                                        Health Plans & Packages
                                                    </div>
                                                    <ul class="sub-menu mega_col_4" style="">
                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-12901">
                                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/health_plans/">Health Checkup Plans</a>
                                                        </li>
                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-12901">
                                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/wellness_packages/">Wellness Packages</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children no-mega-menu" id="menu-item-10140">
                                            <a class="menu-item-link js-smooth-scroll">ABOUT</a>

                                            <ul class="sub-menu mega_col_12" style="">
                                               <li class="menu-item menu-item-type-custom menu-item-object-custom" id="menu-item-12765">
                                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/overview/">Overview</a>
                                                        </li>
                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-12024">
                                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/board/">Board Composition</a>
                                                        </li>

                                                        <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-12024">
                                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/accreditation/">Accreditation of the hospital</a>
                                                        </li>
                                                         <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-12024">
                                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/news/">News</a>
                                                        </li>
                                                       
                                                    </ul>
                                                </li>
                                                
                                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children has-mega-menu" id="menu-item-13159">
                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/swaasthya/">SWASTHYA</a>
                                        </li>
                                        <li class="menu-item menu-item-type-custom menu-item-object-custom no-mega-menu" id="menu-item-10143">
                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/member/">MEMBERSHIP</a>
                                        </li>
                                        <li class="menu-item menu-item-type-post_type menu-item-object-page no-mega-menu" id="menu-item-10137">
                                            <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/contact/">CONTACT</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="mk-nav-responsive-link">
                                <div class="mk-css-icon-menu">
                                    <div class="mk-css-icon-menu-line-1"></div>
                                    <div class="mk-css-icon-menu-line-2"></div>
                                    <div class="mk-css-icon-menu-line-3"></div>
                                </div>
                            </div>
                            <div class=" header-logo fit-logo-img add-header-height logo-is-responsive logo-has-sticky">
							
<a href="http://www.shushrushahospital.org/" title=""><img alt="" class="mk-desktop-logo dark-logo" src="http://www.shushrushahospital.org/assets/images/logo.jpg" title=""> <img alt="" class="mk-desktop-logo light-logo" src="http://www.shushrushahospital.org/assets/images/mobile-white-logo.png" title=""> <img alt="" class="mk-resposnive-logo" src="http://www.shushrushahospital.org/assets/images/mobile-white-logo.png" title=""> <img alt="" class="mk-sticky-logo" src="http://www.shushrushahospital.org/assets/images/logo.jpg" title=""></a>
                        		

</div>
                        </div>
                        <div class="mk-header-right"></div>
                    </div>
                    <div class="mk-responsive-wrap">
                        <nav class="menu-main-menu-container">
                            <ul class="mk-responsive-nav" id="menu-main-menu-1">
                                <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children" id="menu-item-10145">
                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/">HOME</a>
                                </li>
                                  <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children" id="menu-item-10145">
                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/opd/">OPD SCHEDULE</a>
                                </li>

                                 <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children" id="menu-item-10145">
                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/health_plans/">Health Checkup Plans</a>
                                </li>

                                <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children" id="menu-item-11793">
                                    <a class="menu-item-link js-smooth-scroll">OUR SERVICES</a><span class="mk-nav-arrow mk-nav-sub-closed"><svg class="mk-svg-icon" data-cacheid="icon-5997384270d8d" data-name="mk-moon-arrow-down" style=" height:16px; width: 16px;" viewbox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
									<path d="M512 192l-96-96-160 160-160-160-96 96 256 255.999z"></path></svg></span>
                                    <ul class="sub-menu">
                                        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children" id="menu-item-11795">
                                            <a class="menu-item-link js-smooth-scroll">SHUSHRUSHA SERVICES</a>
                                            <ul class="sub-menu">
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-10377">
                                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/medical_services/">Medical & Emergency Services</a>
                                                </li>
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-12113">
                                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/medical_facilities/">Medical Facilities</a>
                                                </li>
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-12116">
                                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/community_services/">Community Services</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children" id="menu-item-11797">
                                            <a class="menu-item-link js-smooth-scroll">Health Plans & Packages</a>
                                            <ul class="sub-menu">
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-11953">
                                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/health_plans/">Health Checkup Plans</a>
                                                </li>
                                                <li class="menu-item menu-item-type-custom menu-item-object-custom" id="menu-item-12765">
                                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/wellness_packages/">Wellness Packages</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                               <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children" id="menu-item-11793">
                                    <a class="menu-item-link js-smooth-scroll">About</a><span class="mk-nav-arrow mk-nav-sub-closed"><svg class="mk-svg-icon" data-cacheid="icon-5997384270d8d" data-name="mk-moon-arrow-down" style=" height:16px; width: 16px;" viewbox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M512 192l-96-96-160 160-160-160-96 96 256 255.999z"></path></svg></span>

                                             <ul class="sub-menu">
                                        <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children" id="menu-item-11795">
                                           
                                            <ul class="sub-menu">
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-10377">
                                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/overview/">Overview</a>
                                                </li>
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-12113">
                                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/board/">Board Composition</a>
                                                </li>

                                                 <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-12113">
                                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/accreditation/">Accreditation of the hospital</a>
                                                </li>

                                                 <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-12113">
                                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/news/">News</a>
                                                </li>
                                              
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                        
                                       
                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children" id="menu-item-13159">
                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/swaasthya/">SWASTHYA</a>
                                </li>
                                <li class="menu-item menu-item-type-custom menu-item-object-custom" id="menu-item-10143">
                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/member/">MEMBERSHIP</a>
                                </li>
                                <li class="menu-item menu-item-type-post_type menu-item-object-page" id="menu-item-10137">
                                    <a class="menu-item-link js-smooth-scroll" href="http://www.shushrushahospital.org/contact/">CONTACT</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="mk-header-padding-wrapper"></div>`;
    $("#mk-header-1").html(header);
    var footer = `<div class="footer-wrapper mk-grid">
                        <div class="mk-padding-wrapper">
                            <div class="mk-col-1-3">
                                <section class="widget widget_text" id="text-1">
                                    <div class="textwidget">
                                        <div class="mk-padding-divider clearfix" id="padding-44"></div>SHUSHRUSHA HOSPITAL
                                        <br> 698-B, Ranade Road, Dadar (W), Mumbai – 400028. INDIA.
                                        <br>
                                    </div>
                                </section>
                            </div>
                            <div class="mk-col-2-3 last">
                                <div class="mk-col-1-4"></div>
                                <div class="mk-col-1-4">
                                    <section class="widget widget_nav_menu" id="nav_menu-9">
                                        <div class="menu-footer-menu-1-container">
                                            <ul class="menu" id="menu-footer-menu-1">
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11865" id="menu-item-11865">
                                                    <a href="http://www.shushrushahospital.org/">
                                                        <svg class="mk-svg-icon" data-cacheid="icon-59973842d5adf" data-name="mk-icon-angle-right" style=" height:14px; width: 5px;" viewbox="0 0 640 1792" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"></path>
                                                        </svg>HOME</a>
                                                </li>
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11855" id="menu-item-11855">
                                                    <a href="http://www.shushrushahospital.org/board/">
                                                        <svg class="mk-svg-icon" data-cacheid="icon-59973842d5adf" data-name="mk-icon-angle-right" style=" height:14px; width: 5px;" viewbox="0 0 640 1792" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"></path>
                                                        </svg>ABOUT</a>
                                                </li>
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-11870" id="menu-item-11870">
                                                    <a href="http://www.shushrushahospital.org/swaasthya/">
                                                        <svg class="mk-svg-icon" data-cacheid="icon-59973842d5adf" data-name="mk-icon-angle-right" style=" height:14px; width: 5px;" viewbox="0 0 640 1792" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"></path>
                                                        </svg>SWASTHYA</a>
                                                </li>
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-12838" id="menu-item-12838">
                                                    <a href="http://www.shushrushahospital.org/member/">
                                                        <svg class="mk-svg-icon" data-cacheid="icon-59973842d5adf" data-name="mk-icon-angle-right" style=" height:14px; width: 5px;" viewbox="0 0 640 1792" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"></path>
                                                        </svg>MEMBERSHIP</a>
                                                </li>
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-12840" id="menu-item-12840">
                                                    <a href="http://www.shushrushahospital.org/contact/">
                                                        <svg class="mk-svg-icon" data-cacheid="icon-59973842d5adf" data-name="mk-icon-angle-right" style=" height:14px; width: 5px;" viewbox="0 0 640 1792" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"></path>
                                                        </svg>CONTACT</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>
                                </div>
                                <div class="mk-col-1-4">
                                    <section class="widget widget_nav_menu" id="nav_menu-10">
                                        <div class="menu-footer-menu-2-container">
                                            <ul class="menu" id="menu-footer-menu-2">
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-12844" id="menu-item-12844">
                                                    <a href="http://www.shushrushahospital.org/community_services/">
                                                        <svg class="mk-svg-icon" data-cacheid="icon-59973842da480" data-name="mk-icon-angle-right" style=" height:14px; width: 5px;" viewbox="0 0 640 1792" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"></path>
                                                        </svg>OUR SERVICES</a>
                                                </li>
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-12845" id="menu-item-12845">
                                                    <a href="http://www.shushrushahospital.org/medical_services/">
                                                        <svg class="mk-svg-icon" data-cacheid="icon-59973842da480" data-name="mk-icon-angle-right" style=" height:14px; width: 5px;" viewbox="0 0 640 1792" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"></path>
                                                        </svg> Shushrusha Services</a>
                                                </li>
                                                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-12846" id="menu-item-12846">
                                                    <a href="http://www.shushrushahospital.org/health_plans/">
                                                        <svg class="mk-svg-icon" data-cacheid="icon-59973842da480" data-name="mk-icon-angle-right" style=" height:14px; width: 5px;" viewbox="0 0 640 1792" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z"></path>
                                                        </svg> Health Plans & Packages</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </section>
                                </div>
                                <div class="mk-col-1-4">
                                    <section class="widget widget_social_networks" id="social-1">
                                        <div class="widgettitle">
                                            FOLLOW US
                                        </div>
                                        <div class="align-left" id="social-59973842dac09">
                                            <a class="builtin-icons custom small facebook-hover" href="" rel="nofollow" target="_blank" title=" ">
                                                <svg class="mk-svg-icon" data-cacheid="icon-59973842e0e72" data-name="mk-jupiter-icon-simple-facebook" style=" height:16px; width: 16px;" viewbox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M192.191 92.743v60.485h-63.638v96.181h63.637v256.135h97.069v-256.135h84.168s6.674-51.322 9.885-96.508h-93.666v-42.921c0-8.807 11.565-20.661 23.01-20.661h71.791v-95.719h-83.57c-111.317 0-108.686 86.262-108.686 99.142z"></path>
                                                </svg>
                                            </a>
                                            <a class="builtin-icons custom small googleplus-hover" href="" rel="nofollow" target="_blank" title=" ">
                                                <svg class="mk-svg-icon" data-cacheid="icon-59973842e2b84" data-name="mk-jupiter-icon-simple-googleplus" style=" height:16px; width: 16px;" viewbox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M416.146 153.104v-95.504h-32.146v95.504h-95.504v32.146h95.504v95.504h32.145v-95.504h95.504v-32.146h-95.504zm-128.75-95.504h-137.717c-61.745 0-119.869 48.332-119.869 102.524 0 55.364 42.105 100.843 104.909 100.843 4.385 0 8.613.296 12.772 0-4.074 7.794-6.982 16.803-6.982 25.925 0 12.17 5.192 22.583 12.545 31.46-5.303-.046-10.783.067-16.386.402-37.307 2.236-68.08 13.344-91.121 32.581-18.765 12.586-32.751 28.749-39.977 46.265-3.605 8.154-5.538 16.62-5.538 25.14l.018.82-.018.983c0 49.744 64.534 80.863 141.013 80.863 87.197 0 135.337-49.447 135.337-99.192l-.003-.363.003-.213-.019-1.478c-.007-.672-.012-1.346-.026-2.009-.012-.532-.029-1.058-.047-1.583-1.108-36.537-13.435-59.361-48.048-83.887-12.469-8.782-36.267-30.231-36.267-42.81 0-14.769 4.221-22.041 26.439-39.409 22.782-17.79 38.893-39.309 38.893-68.424 0-34.65-15.439-76.049-44.392-76.049h43.671l30.81-32.391zm-85.642 298.246c19.347 13.333 32.891 24.081 37.486 41.754v.001l.056.203c1.069 4.522 1.645 9.18 1.666 13.935-.325 37.181-26.35 66.116-100.199 66.116-52.713 0-90.82-31.053-91.028-68.414.005-.43.008-.863.025-1.292l.002-.051c.114-3.006.505-5.969 1.15-8.881.127-.54.241-1.082.388-1.617 1.008-3.942 2.502-7.774 4.399-11.478 18.146-21.163 45.655-33.045 82.107-35.377 28.12-1.799 53.515 2.818 63.95 5.101zm-47.105-107.993c-35.475-1.059-69.194-39.691-75.335-86.271-6.121-46.61 17.663-82.276 53.154-81.203 35.483 1.06 69.215 38.435 75.336 85.043 6.121 46.583-17.685 83.517-53.154 82.43z"></path>
                                                </svg>
                                            </a>
                                            <a class="builtin-icons custom small instagram-hover" href="" rel="nofollow" target="_blank" title=" ">
                                                <svg class="mk-svg-icon" data-cacheid="icon-59973842e49c5" data-name="mk-jupiter-icon-simple-instagram" style=" height:16px; width: 16px;" viewbox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M452.8-6.4h-393.6c-33.6 0-59.2 25.6-59.2 59.2v393.6c0 32 40 59.2 59.2 59.2h393.6c32 0 59.2-27.2 59.2-59.2v-393.6c-1.6-33.6-27.2-59.2-59.2-59.2zm-100.8 83.2c0-11.2 8-19.2 19.2-19.2h57.6c11.2 0 19.2 8 19.2 19.2v57.6c0 11.2-8 19.2-19.2 19.2h-57.6c-11.2 0-19.2-8-19.2-19.2v-57.6zm-192 172.8c0-52.8 43.2-96 96-96s96 43.2 96 96-43.2 96-96 96-96-43.2-96-96zm289.6 172.8c0 11.2-9.6 19.2-19.2 19.2h-347.2c-11.2 0-19.2-8-19.2-19.2v-212.8h36.8c-3.2 12.8-4.8 25.6-4.8 40 0 88 72 160 160 160s160-72 160-160c0-14.4-1.6-27.2-4.8-40h38.4v212.8z"></path>
                                                </svg>
                                            </a>
                                            <style>
                                                #social-59973842dac09 a {
                                                    opacity: 1 !important;
                                                    color: #a6a6a6 !important
                                                }
                                                
                                                #social-59973842dac09 a:hover {
                                                    color: #ff6f43 !important
                                                }
                                                
                                                #social-59973842dac09 a:hover .mk-svg-icon {
                                                    fill: #ff6f43 !important
                                                }
                                            </style>
                                        </div>
                                    </section>
                                    <section class="widget widget_text" id="text-11">
                                        <div class="textwidget">
                                            <br>
                                            <br>
                                            <a href="#top-of-page">
                                                <br>
                                                <span style="display:block; font-size:13px; text-align:left;">BACK TO TOP</span></a>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div class="clearboth"></div>
                        </div>
                    </div>
                    <div id="sub-footer">
                        <div class=" mk-grid">
                            <span class="mk-footer-copyright">Website Design Company: <a href="http://ibridgedigital.com/" style="color: #fff;" target="_blank">iBridge Digital</a></span>
                        </div>
                        <div class="clearboth"></div>
                    </div>`;
    $("#mk-footer").html(footer);
	window.MK = MK, window.elementQuery = function() {
			var queryMatchers = {
					"min-width": function(element, value, units) {
						var el = element,
							px = convertToPx(el, value, units);
						return value && el && el.offsetWidth >= px
					},
					"max-width": function(element, value, units) {
						var el = element,
							px = convertToPx(el, value, units);
						return value && el && el.offsetWidth < px
					}
				},
				classNameForRules = function(rules) {
					for (var name = "query", i = 0, len = rules.length; len > i; i++) name += "_" + rules[i].property + "_" + rules[i].value + rules[i].units;
					return name
				},
				convertToPx = function(element, value, units) {
					switch (units) {
						case "px":
							return value;
						case "em":
							return value * getEmSize(element);
						case "rem":
							return value * getEmSize();
						case "vw":
							return value * document.documentElement.clientWidth / 100;
						case "vh":
							return value * document.documentElement.clientHeight / 100;
						case "vmin":
						case "vmax":
							var vw = document.documentElement.clientWidth / 100,
								vh = document.documentElement.clientHeight / 100,
								chooser = Math["vmin" === units ? "min" : "max"];
							return value * chooser(vw, vh);
						default:
							return value
					}
				},
				getEmSize = function(element) {
					return element || (element = document.documentElement), window.getComputedStyle ? parseFloat(getComputedStyle(element).fontSize) || 16 : 16
				},
				elementMatchesRules = function(element, rules) {
					for (var i = rules.length - 1; i > -1; i--) {
						var rule = rules[i],
							matcher = queryMatchers[rule.property];
						if (matcher && !matcher(element, rule.value, rule.units)) return !1
					}
					return !0
				},
				loader = {
					loadStyleSheets: function(sheets, callback) {
						for (var completed = 0, i = 0, len = sheets.length; len > i; i++) this.loadStyleSheet(sheets[i], function() {
							completed += 1, completed === len && callback && callback()
						})
					},
					loadStyleSheet: function(sheet, callback) {
						if ("STYLE" === sheet.ownerNode.nodeName && "js-media-query-css" === sheet.ownerNode.id) {
							var result = elementQuery.parser.parseStyleText(sheet.ownerNode.innerHTML);
							sheet.ownerNode.innerHTML += result.newCss, elementQuery.queries = elementQuery.queries.concat(result.queries), callback && callback()
						}
					}
				},
				elementQuery = {
					autoInit: !0,
					init: function() {
						var evaluated = !1;
						this.loader.loadStyleSheets(document.styleSheets, function() {
							evaluated = !0, elementQuery.evaluateQueries()
						}), evaluated || elementQuery.evaluateQueries()
					},
					evaluateQueries: function(context) {
						context = context || document;
						for (var queries = this.queries, i = 0, len = queries.length; len > i; i++)
							for (var elements = context.querySelectorAll(queries[i].selector), j = 0; j < elements.length; j++) {
								var element = elements[j];
								elementMatchesRules(element, queries[i].rules) ? element.classList.add(queries[i].className) : element.classList.remove(queries[i].className)
							}
					},
					queryMatchers: queryMatchers,
					queries: [],
					classNameForRules: classNameForRules,
					loader: loader
				};
			return window.addEventListener("resize", function() {
				elementQuery.evaluateQueries()
			}, !1), window.addEventListener("load", function() {
				elementQuery.autoInit && (elementQuery.init(), setTimeout(function() {
					elementQuery.evaluateQueries()
				}, 1e3))
			}), elementQuery
		}(),
		function(elementQuery) {
			var COMMENT_PATTERN = /(\/\*)[\s\S]*?(\*\/)/g,
				STATEMENT_END_OR_START_PATTERN = /\s*(?:(\})|(@\S+\s+[^;{]+;)|(?:([^{}]+)\{))/g,
				QUERY_PATTERN = /:media\s*\(([^)]*)\)/g,
				QUERY_RULES_PATTERN = /\(?([^\s:]+):\s*(\d+(?:\.\d+)?)(px|em|rem|vw|vh|vmin|vmax)\)?/g,
				WHITESPACE_PATTERN = /^\s*$/;
			elementQuery.parser = {
				parseStyleText: function(styleText) {
					var newText = "",
						queries = [];
					return this.parseText(styleText, {
						mediaQuery: function(selector) {
							newText += "\n" + selector + "{"
						},
						endMediaQuery: function() {
							newText += "\n}"
						},
						rule: function(selector, properties) {
							for (var i = 0, len = selector.length; len > i; i++) {
								for (var single = selector[i], selectorSoFar = "", j = 0, lenj = single.length; lenj > j; j += 2) {
									selectorSoFar += single[j];
									var rules = single[j + 1];
									if (rules) {
										var queryClass = elementQuery.classNameForRules(rules);
										queries.push({
											selector: selectorSoFar,
											rules: rules,
											className: queryClass
										}), selectorSoFar += "." + queryClass
									}
								}
								newText += selectorSoFar + (len - 1 > i ? "," : "")
							}
							newText += " {" + properties + "}"
						}
					}), {
						queries: queries,
						newCss: newText
					}
				},
				parseText: function(styleText, callbacks) {
					callbacks = callbacks || {};
					for (var text = styleText.replace(COMMENT_PATTERN, ""); match = STATEMENT_END_OR_START_PATTERN.exec(text);)
						if (match[1]) callbacks.endMediaQuery && callbacks.endMediaQuery();
						else {
							var selector = match[3];
							if (selector)
								if ("@media" === selector.slice(0, 6)) callbacks.mediaQuery && callbacks.mediaQuery(selector);
								else {
									var closingIndex = text.indexOf("}", match.index);
									if ("@" !== selector[0]) {
										var content = text.slice(match.index + match[0].length, closingIndex);
										this.parseRule(selector, content, callbacks.rule)
									}
									STATEMENT_END_OR_START_PATTERN.lastIndex = closingIndex + 1
								}
						}
				},
				parseRule: function(selector, content, callback) {
					var parsedSelector = this.parseSelector(selector);
					parsedSelector && callback && callback(parsedSelector, content)
				},
				parseSelector: function(selector) {
					for (var parsed = [], parts = selector.split(","), i = 0, len = parts.length; len > i; i++) {
						var result = this.parseSingleSelector(parts[i]);
						result.length > 1 && parsed.push(result)
					}
					return parsed.length ? parsed : null
				},
				parseSingleSelector: function(selector) {
					for (var parsed = [], lastIndex = 0; queryMatch = QUERY_PATTERN.exec(selector);) {
						var selectorChunk = selector.slice(lastIndex, queryMatch.index);
						lastIndex = QUERY_PATTERN.lastIndex;
						var queryData = this.parseQuery(queryMatch[1]);
						parsed.push(selectorChunk), parsed.push(queryData)
					}
					var remaining = selector.slice(lastIndex);
					return WHITESPACE_PATTERN.test(remaining) || parsed.push(remaining), QUERY_PATTERN.lastIndex = 0, parsed
				},
				parseQuery: function(queryString) {
					for (var ruleMatch, rules = []; ruleMatch = QUERY_RULES_PATTERN.exec(queryString);) rules.push({
						property: ruleMatch[1],
						value: parseFloat(ruleMatch[2]),
						units: ruleMatch[3]
					});
					return rules
				}
			}
		}(elementQuery),
		function($) {
			"use strict";
			$.exists = function(selector) {
				return $(selector).length > 0
			}, $.getCachedScript = function(url) {
				var options = {
					dataType: "script",
					cache: !0,
					url: url
				};
				return $.ajax(options)
			}, $.fn.mk_imagesLoaded = function() {
				var $imgs = this.find('img[src!=""]');
				if (!$imgs.length) return $.Deferred().resolve().promise();
				var dfds = [];
				return $imgs.each(function() {
					var dfd = $.Deferred();
					dfds.push(dfd);
					var img = new Image;
					img.onload = function() {
						dfd.resolve()
					}, img.onerror = function() {
						dfd.resolve()
					}, img.src = this.src
				}), $.when.apply($, dfds)
			}
		}(jQuery),
		function() {
			function resetTriggers(element) {
				var triggers = element.__resizeTriggers__,
					expand = triggers.firstElementChild,
					contract = triggers.lastElementChild,
					expandChild = expand.firstElementChild;
				contract.scrollLeft = contract.scrollWidth, contract.scrollTop = contract.scrollHeight, expandChild.style.width = expand.offsetWidth + 1 + "px", expandChild.style.height = expand.offsetHeight + 1 + "px", expand.scrollLeft = expand.scrollWidth, expand.scrollTop = expand.scrollHeight
			}

			function checkTriggers(element) {
				return element.offsetWidth != element.__resizeLast__.width || element.offsetHeight != element.__resizeLast__.height
			}

			function scrollListener(e) {
				var element = this;
				resetTriggers(this), this.__resizeRAF__ && cancelFrame(this.__resizeRAF__), this.__resizeRAF__ = requestFrame(function() {
					checkTriggers(element) && (element.__resizeLast__.width = element.offsetWidth, element.__resizeLast__.height = element.offsetHeight, element.__resizeListeners__.forEach(function(fn) {
						fn.call(element, e)
					}))
				})
			}

			function createStyles() {
				if (!stylesCreated) {
					var css = (animationKeyframes ? animationKeyframes : "") + ".resize-triggers { " + (animationStyle ? animationStyle : "") + 'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
						head = document.head || document.getElementsByTagName("head")[0],
						style = document.createElement("style");
					style.type = "text/css", style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css)), head.appendChild(style), stylesCreated = !0
				}
			}
			var attachEvent = document.attachEvent,
				stylesCreated = !1;
			if (!attachEvent) {
				var requestFrame = function() {
						var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) {
							return window.setTimeout(fn, 20)
						};
						return function(fn) {
							return raf(fn)
						}
					}(),
					cancelFrame = function() {
						var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
						return function(id) {
							return cancel(id)
						}
					}(),
					animation = !1,
					animationstring = "animation",
					keyframeprefix = "",
					animationstartevent = "animationstart",
					domPrefixes = "Webkit Moz O ms".split(" "),
					startEvents = "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),
					pfx = "",
					elm = document.createElement("fakeelement");
				if (void 0 !== elm.style.animationName && (animation = !0), animation === !1)
					for (var i = 0; i < domPrefixes.length; i++)
						if (void 0 !== elm.style[domPrefixes[i] + "AnimationName"]) {
							pfx = domPrefixes[i], animationstring = pfx + "Animation", keyframeprefix = "-" + pfx.toLowerCase() + "-", animationstartevent = startEvents[i], animation = !0;
							break
						}
				var animationName = "resizeanim",
					animationKeyframes = "@" + keyframeprefix + "keyframes " + animationName + " { from { opacity: 0; } to { opacity: 0; } } ",
					animationStyle = keyframeprefix + "animation: 1ms " + animationName + "; "
			}
			window.addResizeListener = function(element, fn) {
				attachEvent ? element.attachEvent("onresize", fn) : (element.__resizeTriggers__ || ("static" == getComputedStyle(element).position && (element.style.position = "relative"), createStyles(), element.__resizeLast__ = {}, element.__resizeListeners__ = [], (element.__resizeTriggers__ = document.createElement("div")).className = "resize-triggers", element.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>', element.appendChild(element.__resizeTriggers__), resetTriggers(element), element.addEventListener("scroll", scrollListener, !0), animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function(e) {
					e.animationName == animationName && resetTriggers(element)
				})), element.__resizeListeners__.push(fn))
			}, window.removeResizeListener = function(element, fn) {
				attachEvent ? element.detachEvent("onresize", fn) : (element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1), element.__resizeListeners__.length || (element.removeEventListener("scroll", scrollListener), element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__)))
			}
		}(),
		function(window, document) {
			function addStyleSheet(ownerDocument, cssText) {
				var p = ownerDocument.createElement("p"),
					parent = ownerDocument.getElementsByTagName("head")[0] || ownerDocument.documentElement;
				return p.innerHTML = "x<style>" + cssText + "</style>", parent.insertBefore(p.lastChild, parent.firstChild)
			}

			function getElements() {
				var elements = html5.elements;
				return "string" == typeof elements ? elements.split(" ") : elements
			}

			function addElements(newElements, ownerDocument) {
				var elements = html5.elements;
				"string" != typeof elements && (elements = elements.join(" ")), "string" != typeof newElements && (newElements = newElements.join(" ")), html5.elements = elements + " " + newElements, shivDocument(ownerDocument)
			}

			function getExpandoData(ownerDocument) {
				var data = expandoData[ownerDocument[expando]];
				return data || (data = {}, expanID++, ownerDocument[expando] = expanID, expandoData[expanID] = data), data
			}

			function createElement(nodeName, ownerDocument, data) {
				if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createElement(nodeName);
				data || (data = getExpandoData(ownerDocument));
				var node;
				return node = data.cache[nodeName] ? data.cache[nodeName].cloneNode() : saveClones.test(nodeName) ? (data.cache[nodeName] = data.createElem(nodeName)).cloneNode() : data.createElem(nodeName), !node.canHaveChildren || reSkip.test(nodeName) || node.tagUrn ? node : data.frag.appendChild(node)
			}

			function createDocumentFragment(ownerDocument, data) {
				if (ownerDocument || (ownerDocument = document), supportsUnknownElements) return ownerDocument.createDocumentFragment();
				data = data || getExpandoData(ownerDocument);
				for (var clone = data.frag.cloneNode(), i = 0, elems = getElements(), l = elems.length; l > i; i++) clone.createElement(elems[i]);
				return clone
			}

			function shivMethods(ownerDocument, data) {
				data.cache || (data.cache = {}, data.createElem = ownerDocument.createElement, data.createFrag = ownerDocument.createDocumentFragment, data.frag = data.createFrag()), ownerDocument.createElement = function(nodeName) {
					return html5.shivMethods ? createElement(nodeName, ownerDocument, data) : data.createElem(nodeName)
				}, ownerDocument.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
					return data.createElem(nodeName), data.frag.createElement(nodeName), 'c("' + nodeName + '")'
				}) + ");return n}")(html5, data.frag)
			}

			function shivDocument(ownerDocument) {
				ownerDocument || (ownerDocument = document);
				var data = getExpandoData(ownerDocument);
				return !html5.shivCSS || supportsHtml5Styles || data.hasCSS || (data.hasCSS = !!addStyleSheet(ownerDocument, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), supportsUnknownElements || shivMethods(ownerDocument, data), ownerDocument
			}
			var supportsHtml5Styles, supportsUnknownElements, version = "3.7.3",
				options = window.html5 || {},
				reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
				saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
				expando = "_html5shiv",
				expanID = 0,
				expandoData = {};
			! function() {
				try {
					var a = document.createElement("a");
					a.innerHTML = "<xyz></xyz>", supportsHtml5Styles = "hidden" in a, supportsUnknownElements = 1 == a.childNodes.length || function() {
						document.createElement("a");
						var frag = document.createDocumentFragment();
						return "undefined" == typeof frag.cloneNode || "undefined" == typeof frag.createDocumentFragment || "undefined" == typeof frag.createElement
					}()
				} catch (e) {
					supportsHtml5Styles = !0, supportsUnknownElements = !0
				}
			}();
			var html5 = {
				elements: options.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
				version: version,
				shivCSS: options.shivCSS !== !1,
				supportsUnknownElements: supportsUnknownElements,
				shivMethods: options.shivMethods !== !1,
				type: "default",
				shivDocument: shivDocument,
				createElement: createElement,
				createDocumentFragment: createDocumentFragment,
				addElements: addElements
			};
			window.html5 = html5, shivDocument(document), "object" == typeof module && module.exports && (module.exports = html5)
		}("undefined" != typeof window ? window : this, document), window.matchMedia || (window.matchMedia = function() {
			"use strict";
			var styleMedia = window.styleMedia || window.media;
			if (!styleMedia) {
				var style = document.createElement("style"),
					script = document.getElementsByTagName("script")[0],
					info = null;
				style.type = "text/css", style.id = "matchmediajs-test", script.parentNode.insertBefore(style, script), info = "getComputedStyle" in window && window.getComputedStyle(style, null) || style.currentStyle, styleMedia = {
					matchMedium: function(media) {
						var text = "@media " + media + "{ #matchmediajs-test { width: 1px; } }";
						return style.styleSheet ? style.styleSheet.cssText = text : style.textContent = text, "1px" === info.width
					}
				}
			}
			return function(media) {
				return {
					matches: styleMedia.matchMedium(media || "all"),
					media: media || "all"
				}
			}
		}()),
		function(global) {
			"use strict";

			function noop() {}

			function safeActiveElement() {
				try {
					return document.activeElement
				} catch (err) {}
			}

			function inArray(arr, item) {
				for (var i = 0, len = arr.length; len > i; i++)
					if (arr[i] === item) return !0;
				return !1
			}

			function addEventListener(elem, event, fn) {
				return elem.addEventListener ? elem.addEventListener(event, fn, !1) : elem.attachEvent ? elem.attachEvent("on" + event, fn) : void 0
			}

			function moveCaret(elem, index) {
				var range;
				elem.createTextRange ? (range = elem.createTextRange(), range.move("character", index), range.select()) : elem.selectionStart && (elem.focus(), elem.setSelectionRange(index, index))
			}

			function changeType(elem, type) {
				try {
					return elem.type = type, !0
				} catch (e) {
					return !1
				}
			}

			function handleElem(node, callback) {
				if (node && node.getAttribute(ATTR_CURRENT_VAL)) callback(node);
				else
					for (var elem, handleInputs = node ? node.getElementsByTagName("input") : inputs, handleTextareas = node ? node.getElementsByTagName("textarea") : textareas, handleInputsLength = handleInputs ? handleInputs.length : 0, handleTextareasLength = handleTextareas ? handleTextareas.length : 0, len = handleInputsLength + handleTextareasLength, i = 0; len > i; i++) elem = handleInputsLength > i ? handleInputs[i] : handleTextareas[i - handleInputsLength], callback(elem)
			}

			function disablePlaceholders(node) {
				handleElem(node, hidePlaceholder)
			}

			function enablePlaceholders(node) {
				handleElem(node, showPlaceholder)
			}

			function hidePlaceholder(elem, keydownValue) {
				var valueChanged = !!keydownValue && elem.value !== keydownValue,
					isPlaceholderValue = elem.value === elem.getAttribute(ATTR_CURRENT_VAL);
				if ((valueChanged || isPlaceholderValue) && "true" === elem.getAttribute(ATTR_ACTIVE)) {
					elem.removeAttribute(ATTR_ACTIVE), elem.value = elem.value.replace(elem.getAttribute(ATTR_CURRENT_VAL), ""), elem.className = elem.className.replace(classNameRegExp, "");
					var maxLength = elem.getAttribute(ATTR_MAXLENGTH);
					parseInt(maxLength, 10) >= 0 && (elem.setAttribute("maxLength", maxLength), elem.removeAttribute(ATTR_MAXLENGTH));
					var type = elem.getAttribute(ATTR_INPUT_TYPE);
					return type && (elem.type = type), !0
				}
				return !1
			}

			function showPlaceholder(elem) {
				var val = elem.getAttribute(ATTR_CURRENT_VAL);
				if ("" === elem.value && val) {
					elem.setAttribute(ATTR_ACTIVE, "true"), elem.value = val, elem.className += " " + placeholderClassName;
					var maxLength = elem.getAttribute(ATTR_MAXLENGTH);
					maxLength || (elem.setAttribute(ATTR_MAXLENGTH, elem.maxLength), elem.removeAttribute("maxLength"));
					var type = elem.getAttribute(ATTR_INPUT_TYPE);
					return type ? elem.type = "text" : "password" === elem.type && changeType(elem, "text") && elem.setAttribute(ATTR_INPUT_TYPE, "password"), !0
				}
				return !1
			}

			function makeFocusHandler(elem) {
				return function() {
					hideOnInput && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && "true" === elem.getAttribute(ATTR_ACTIVE) ? moveCaret(elem, 0) : hidePlaceholder(elem)
				}
			}

			function makeBlurHandler(elem) {
				return function() {
					showPlaceholder(elem)
				}
			}

			function makeSubmitHandler(form) {
				return function() {
					disablePlaceholders(form)
				}
			}

			function makeKeydownHandler(elem) {
				return function(e) {
					return keydownVal = elem.value, "true" === elem.getAttribute(ATTR_ACTIVE) && keydownVal === elem.getAttribute(ATTR_CURRENT_VAL) && inArray(badKeys, e.keyCode) ? (e.preventDefault && e.preventDefault(), !1) : void 0
				}
			}

			function makeKeyupHandler(elem) {
				return function() {
					hidePlaceholder(elem, keydownVal), "" === elem.value && (elem.blur(), moveCaret(elem, 0))
				}
			}

			function makeClickHandler(elem) {
				return function() {
					elem === safeActiveElement() && elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && "true" === elem.getAttribute(ATTR_ACTIVE) && moveCaret(elem, 0)
				}
			}

			function newElement(elem) {
				var form = elem.form;
				form && "string" == typeof form && (form = document.getElementById(form), form.getAttribute(ATTR_FORM_HANDLED) || (addEventListener(form, "submit", makeSubmitHandler(form)), form.setAttribute(ATTR_FORM_HANDLED, "true"))), addEventListener(elem, "focus", makeFocusHandler(elem)), addEventListener(elem, "blur", makeBlurHandler(elem)), hideOnInput && (addEventListener(elem, "keydown", makeKeydownHandler(elem)), addEventListener(elem, "keyup", makeKeyupHandler(elem)), addEventListener(elem, "click", makeClickHandler(elem))), elem.setAttribute(ATTR_EVENTS_BOUND, "true"), elem.setAttribute(ATTR_CURRENT_VAL, placeholder), (hideOnInput || elem !== safeActiveElement()) && showPlaceholder(elem)
			}
			var test = document.createElement("input"),
				nativeSupport = void 0 !== test.placeholder;
			if (global.Placeholders = {
					nativeSupport: nativeSupport,
					disable: nativeSupport ? noop : disablePlaceholders,
					enable: nativeSupport ? noop : enablePlaceholders
				}, !nativeSupport) {
				var keydownVal, validTypes = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
					badKeys = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46],
					placeholderStyleColor = "#ccc",
					placeholderClassName = "placeholdersjs",
					classNameRegExp = new RegExp("(?:^|\\s)" + placeholderClassName + "(?!\\S)"),
					ATTR_CURRENT_VAL = "data-placeholder-value",
					ATTR_ACTIVE = "data-placeholder-active",
					ATTR_INPUT_TYPE = "data-placeholder-type",
					ATTR_FORM_HANDLED = "data-placeholder-submit",
					ATTR_EVENTS_BOUND = "data-placeholder-bound",
					ATTR_OPTION_FOCUS = "data-placeholder-focus",
					ATTR_OPTION_LIVE = "data-placeholder-live",
					ATTR_MAXLENGTH = "data-placeholder-maxlength",
					UPDATE_INTERVAL = 100,
					head = document.getElementsByTagName("head")[0],
					root = document.documentElement,
					Placeholders = global.Placeholders,
					inputs = document.getElementsByTagName("input"),
					textareas = document.getElementsByTagName("textarea"),
					hideOnInput = "false" === root.getAttribute(ATTR_OPTION_FOCUS),
					liveUpdates = "false" !== root.getAttribute(ATTR_OPTION_LIVE),
					styleElem = document.createElement("style");
				styleElem.type = "text/css";
				var styleRules = document.createTextNode("." + placeholderClassName + " {color:" + placeholderStyleColor + ";}");
				styleElem.styleSheet ? styleElem.styleSheet.cssText = styleRules.nodeValue : styleElem.appendChild(styleRules), head.insertBefore(styleElem, head.firstChild);
				for (var placeholder, elem, i = 0, len = inputs.length + textareas.length; len > i; i++) elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length], placeholder = elem.attributes.placeholder, placeholder && (placeholder = placeholder.nodeValue, placeholder && inArray(validTypes, elem.type) && newElement(elem));
				var timer = setInterval(function() {
					for (var i = 0, len = inputs.length + textareas.length; len > i; i++) elem = i < inputs.length ? inputs[i] : textareas[i - inputs.length], placeholder = elem.attributes.placeholder, placeholder ? (placeholder = placeholder.nodeValue, placeholder && inArray(validTypes, elem.type) && (elem.getAttribute(ATTR_EVENTS_BOUND) || newElement(elem), (placeholder !== elem.getAttribute(ATTR_CURRENT_VAL) || "password" === elem.type && !elem.getAttribute(ATTR_INPUT_TYPE)) && ("password" === elem.type && !elem.getAttribute(ATTR_INPUT_TYPE) && changeType(elem, "text") && elem.setAttribute(ATTR_INPUT_TYPE, "password"), elem.value === elem.getAttribute(ATTR_CURRENT_VAL) && (elem.value = placeholder), elem.setAttribute(ATTR_CURRENT_VAL, placeholder)))) : elem.getAttribute(ATTR_ACTIVE) && (hidePlaceholder(elem), elem.removeAttribute(ATTR_CURRENT_VAL));
					liveUpdates || clearInterval(timer)
				}, UPDATE_INTERVAL);
				addEventListener(global, "beforeunload", function() {
					Placeholders.disable()
				})
			}
		}(this),
		function() {
			var lastTime, vendors, x;
			for (lastTime = 0, vendors = ["webkit", "moz"], x = 0; x < vendors.length && !window.requestAnimationFrame;) window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"], ++x;
			window.requestAnimationFrame || (window.requestAnimationFrame = function(callback, element) {
				var currTime, id, timeToCall;
				return currTime = (new Date).getTime(), timeToCall = Math.max(0, 16 - (currTime - lastTime)), id = window.setTimeout(function() {
					callback(currTime + timeToCall)
				}, timeToCall), lastTime = currTime + timeToCall, id
			}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(id) {
				clearTimeout(id)
			})
		}(),
		function($) {
			"use strict";
			var MK = window.MK || {};
			MK.core = {};
			var _loadedDependencies = [],
				_inQueue = {};
			MK.core.initAll = function(scope) {
				var $el = $(scope).find(".js-el"),
					$components = $el.filter("[data-mk-component]"),
					component = null,
					init = function(name, el) {
						var $el = $(el);
						$el.data("init-" + name) || ("function" != typeof MK.component[name] ? console.log("Component init error: ", name) : (component = new MK.component[name](el), component.init(), $el.data("init-" + name, !0), MK.utils.eventManager.publish("component-inited")))
					};
				$components.each(function() {
					var self = this,
						$this = $(this),
						names = $this.data("mk-component");
					if ("string" == typeof names) {
						var name = names;
						init(name, self)
					} else names.forEach(function(name) {
						init(name, self)
					})
				})
			}, MK.core.loadDependencies = function(dependencies, callback) {
				var _callback = callback || function() {};
				if (!dependencies) return void _callback();
				var newDeps = dependencies.map(function(dep) {
					return -1 === _loadedDependencies.indexOf(dep) ? "undefined" == typeof _inQueue[dep] ? dep : (_inQueue[dep].push(_callback), !0) : !1
				});
				if (newDeps[0] !== !0) {
					if (newDeps[0] === !1) return void _callback();
					var queue = newDeps.map(function(script) {
							return _inQueue[script] = [_callback], $.getCachedScript(script)
						}),
						onLoad = function() {
							newDeps.map(function(loaded) {
								_inQueue[loaded].forEach(function(callback) {
									callback()
								}), delete _inQueue[loaded], _loadedDependencies.push(loaded)
							})
						};
					$.when.apply(null, queue).done(onLoad)
				}
			}, MK.core.path = {
				theme: mk_theme_dir,
				plugins: mk_theme_js_path + "/plugins/async/min/",
				ajaxUrl: window.PHP.ajax
			}
		}(jQuery),
		function($) {
			"use strict";
			var MK = window.MK || {};
			MK.utils = window.MK.utils || {}, MK.utils.actions = {}, MK.utils.actions.activate = function(el) {
				$(el).addClass("is-active")
			}, MK.utils.actions.deactivate = function(el) {
				$(el).removeClass("is-active")
			}
		}(jQuery),
		function($) {
			"use strict";
			var MK = window.MK || {};
			MK.utils = window.MK.utils || {}, MK.utils.browser = function() {
				var dataBrowser = [{
						string: navigator.userAgent,
						subString: "Edge",
						identity: "Edge"
					}, {
						string: navigator.userAgent,
						subString: "Chrome",
						identity: "Chrome"
					}, {
						string: navigator.userAgent,
						subString: "MSIE",
						identity: "IE"
					}, {
						string: navigator.userAgent,
						subString: "Trident",
						identity: "IE"
					}, {
						string: navigator.userAgent,
						subString: "Firefox",
						identity: "Firefox"
					}, {
						string: navigator.userAgent,
						subString: "Safari",
						identity: "Safari"
					}, {
						string: navigator.userAgent,
						subString: "Opera",
						identity: "Opera"
					}],
					versionSearchString = null,
					searchString = function(data) {
						for (var i = 0; i < data.length; i++) {
							var dataString = data[i].string;
							if (versionSearchString = data[i].subString, -1 !== dataString.indexOf(data[i].subString)) return data[i].identity
						}
					},
					searchVersion = function(dataString) {
						var index = dataString.indexOf(versionSearchString);
						if (-1 !== index) {
							var rv = dataString.indexOf("rv:");
							return "Trident" === versionSearchString && -1 !== rv ? parseFloat(dataString.substring(rv + 3)) : parseFloat(dataString.substring(index + versionSearchString.length + 1))
						}
					},
					name = searchString(dataBrowser) || "Other",
					version = searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || "Unknown";
				return $("html").addClass(name).addClass(name + version), {
					name: name,
					version: version
				}
			}(), MK.utils.OS = function() {
				return -1 != navigator.appVersion.indexOf("Win") ? "Windows" : -1 != navigator.appVersion.indexOf("Mac") ? "OSX" : -1 != navigator.appVersion.indexOf("X11") ? "UNIX" : -1 != navigator.appVersion.indexOf("Linux") ? "Linux" : void 0
			}(), MK.utils.isMobile = function() {
				function android() {
					return navigator.userAgent.match(/Android/i)
				}

				function blackBerry() {
					return navigator.userAgent.match(/BlackBerry/i)
				}

				function iOS() {
					return navigator.userAgent.match(/iPhone|iPad|iPod/i)
				}

				function opera() {
					return navigator.userAgent.match(/Opera Mini/i)
				}

				function windows() {
					return navigator.userAgent.match(/IEMobile/i)
				}
				return android() || blackBerry() || iOS() || opera() || windows() || matchMedia("(max-width: 1024px)").matches
			}, MK.utils.isResponsiveMenuState = function() {
				return window.matchMedia("(max-width: " + mk_responsive_nav_width + "px)").matches
			}, MK.utils.getUrlParameter = function(sParam) {
				var sParameterName, i, sPageURL = decodeURIComponent(window.location.search.substring(1)),
					sURLVariables = sPageURL.split("&");
				for (i = 0; i < sURLVariables.length; i++)
					if (sParameterName = sURLVariables[i].split("="), sParameterName[0] === sParam) return void 0 === sParameterName[1] ? !0 : sParameterName[1]
			}, MK.utils.isSmoothScroll = function() {
				var isSafari = "Safari" === MK.utils.browser.name,
					isUserChoice = "true" === mk_smooth_scroll;
				return isUserChoice && !isSafari
			}()
		}(jQuery),
		function($) {
			"use strict";
			var MK = window.MK || {};
			MK.utils = window.MK.utils || {}, MK.utils.eventManager = {}, MK.utils.eventManager.subscribe = function(evt, func) {
				$(this).on(evt, func)
			}, MK.utils.eventManager.unsubscribe = function(evt, func) {
				$(this).off(evt, func)
			}, MK.utils.eventManager.publish = function(evt, params) {
				$(this).trigger(evt, [params])
			}
		}(jQuery),
		function($) {
			"use strict";
			var MK = window.MK || {};
			MK.utils = window.MK.utils || {}, MK.utils.fullscreen = {}, MK.utils.launchIntoFullscreen = function(element) {
				element.requestFullscreen ? element.requestFullscreen() : element.mozRequestFullScreen ? element.mozRequestFullScreen() : element.webkitRequestFullscreen ? element.webkitRequestFullscreen() : element.msRequestFullscreen && element.msRequestFullscreen()
			}, MK.utils.exitFullscreen = function() {
				document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
			}
		}(jQuery),
		function($) {
			"use strict";
			var MK = window.MK || {};
			MK.utils = window.MK.utils || {}, MK.utils.misc = {}, MK.utils.offsets = function($els) {
				return $.map($els, function(el) {
					return $(el).offset().top
				})
			}, MK.utils.nextHigherVal = function(val, arr) {
				var i = 0,
					higher = null,
					check = function() {
						val > arr[i] ? (i += 1, check()) : higher = arr[i]
					};
				return check(), higher
			}, MK.utils.throttle = function(delay, fn) {
				var last, deferTimer;
				return function() {
					var context = this,
						args = arguments,
						now = +new Date;
					last && last + delay > now ? (clearTimeout(deferTimer), deferTimer = setTimeout(function() {
						last = now, fn.apply(context, args)
					}, delay)) : (last = now, fn.apply(context, args))
				}
			}
		}(jQuery),
		function($) {
			"use strict";
			var MK = window.MK || {};
			MK.utils = window.MK.utils || {}, MK.utils.scrollTo = function(offset) {
				$("html, body").stop().animate({
					scrollTop: offset
				}, {
					duration: 1200,
					easing: "easeInOutExpo"
				})
			}, MK.utils.scrollToAnchor = function(hash) {
				var $target = $(hash);
				if ($target.length) {
					var offset = $target.offset().top;
					offset -= MK.val.offsetHeaderHeight(offset), "#top-of-page" === hash ? window.history.replaceState(void 0, void 0, " ") : window.history.replaceState(void 0, void 0, hash), MK.utils.scrollTo(offset)
				}
			}, MK.utils.scroll = function() {
				function preventDefault(e) {
					e = e || window.event, e.preventDefault(), e.returnValue = !1
				}

				function wheel(e) {
					preventDefault(e)
				}

				function keydown(e) {
					for (var i = keys.length; i--;)
						if (e.keyCode === keys[i]) return void preventDefault(e)
				}

				function disableScroll() {
					window.addEventListener && window.addEventListener("DOMMouseScroll", wheel, !1), window.onmousewheel = document.onmousewheel = wheel, document.onkeydown = keydown
				}

				function enableScroll() {
					window.removeEventListener && window.removeEventListener("DOMMouseScroll", wheel, !1), window.onmousewheel = document.onmousewheel = document.onkeydown = null
				}
				var keys = [38, 40];
				return {
					disable: disableScroll,
					enable: enableScroll
				}
			}(), MK.utils.detectAnchor = function(el) {
				var $this = $(el),
					loc = window.location,
					currentPage = loc.origin + loc.pathname,
					href = $this.attr("href"),
					linkSplit = href ? href.split("#") : "",
					hrefPage = linkSplit[0] ? linkSplit[0] : "",
					hrefHash = linkSplit[1] ? linkSplit[1] : "";
				return hrefPage !== currentPage && "" !== hrefPage || "undefined" == typeof hrefHash || "" === hrefHash ? !1 : "#" + hrefHash
			}, MK.utils.scrollToURLHash = function() {
				var loc = window.location,
					hash = loc.hash;
				hash.length && hash.substring(1).length && (hash = hash.replace("!loading", ""), setTimeout(function() {
					MK.utils.scrollToAnchor(hash)
				}, 1e3), setTimeout(function() {
					window.history.replaceState(void 0, void 0, hash)
				}, 1001))
			}, MK.utils.scrollSpy = function(toSpy, config) {
				var $window = $(window),
					container = document.getElementById("mk-theme-container"),
					isObj = "object" == typeof toSpy,
					offset = isObj ? MK.val.dynamicOffset(toSpy, config.position, config.threshold) : function() {
						return toSpy
					},
					height = isObj ? MK.val.dynamicHeight(toSpy) : function() {
						return 0
					},
					cacheVals = {},
					_p = "before",
					checkPosition = function() {
						var s = MK.val.scroll(),
							o = offset(),
							h = height();
						o > s && "before" !== _p ? (config.before && config.before(), _p = "before") : s >= o && o + h >= s && "active" !== _p ? (config.active && config.active(o), _p = "active") : s > o + h && "after" !== _p && (config.after && config.after(o + h), _p = "after")
					},
					rAF = function() {
						window.requestAnimationFrame(checkPosition)
					},
					exportVals = function() {
						return cacheVals
					},
					updateCache = function() {
						var o = offset(),
							h = height();
						cacheVals = {
							before: o - $window.height(),
							active: o,
							after: o + h
						}
					};
				config.cache && config.cache(exportVals), checkPosition(), $window.on("load", checkPosition), $window.on("resize", checkPosition), $window.on("mouseup", checkPosition), window.addResizeListener(container, checkPosition), $window.on("scroll", rAF), updateCache(), $window.on("load", updateCache), $window.on("resize", updateCache), window.addResizeListener(container, updateCache)
			}
		}(jQuery),
		function($) {
			"use strict";
			$("body").on("touchstart", ".js-taphover", function(e) {
				var $link = $(e.currentTarget);
				return $link.hasClass("hover") ? !0 : ($link.addClass("hover"), $(".js-taphover").not(e.currentTarget).removeClass("hover"), e.stopPropagation(), void 0)
			}), $(document).on("touchstart", function(e) {
				$(".js-taphover").removeClass("hover")
			})
		}(jQuery),
		function($) {
			"use strict";

			function calc() {
				wrapperHeight = $wrapper.height(), wrapperWidth = $wrapper.width(), wrapperAspectRatio = wrapperHeight / wrapperWidth * 100
			}

			function apply() {
				var width = wrapperAspectRatio / baseAspectRatio * 100,
					widthOverflow = width - 100;
				$videoHolder.css({
					"padding-top": wrapperAspectRatio + "%",
					width: width + "%",
					left: -(widthOverflow / 2) + "%"
				})
			}

			function reset() {
				$videoHolder.css({
					"padding-top": baseAspectRatio + "%",
					width: "100%",
					left: 0
				})
			}

			function setCover() {
				reset(), calc(), wrapperAspectRatio > baseAspectRatio && apply()
			}
			var wrapperHeight, wrapperWidth, wrapperAspectRatio, $videoHolder = $(".mk-center-video"),
				$wrapper = $videoHolder.parent(),
				baseAspectRatio = 56.25;
			$(window).on("load", setCover), $(window).on("resize", setCover)
		}(jQuery),
		function($) {
			"use strict";
			var MK = window.MK || {};
			MK.val = {}, MK.val.scroll = function() {
				var offset = 0,
					$window = $(window),
					hasPageYOffset = void 0 !== window.pageYOffset,
					body = document.documentElement || document.body.parentNode || document.body,
					update = function() {
						offset = hasPageYOffset ? window.pageYOffset : body.scrollTop
					},
					rAF = function() {
						window.requestAnimationFrame(update);
					};
				return update(), $window.on("load", update), $window.on("resize", update), $window.on("scroll", rAF),
					function() {
						return offset
					}
			}(), MK.val.viewportPercentHeight = function(percent) {
				return $(window).height() * (percent / 100)
			}, MK.val.adminbarHeight = function() {
				return php.hasAdminbar ? window.matchMedia("( max-width: 782px )").matches ? 46 : 32 : 0
			}, MK.val.stickyOffset = function() {
				var $header = $(".mk-header").not(".js-header-shortcode").first();
				if (!$header.length) return function() {
					return 0
				};
				var $toolbar = $header.find(".mk-header-toolbar"),
					config = $header.data(),
					hasToolbar = $toolbar.length,
					toolbarHeight = hasToolbar ? $toolbar.height() : 0,
					isVertical = 4 === config.headerStyle,
					headerHeight = isVertical ? 0 : config.height,
					type = ("number" == typeof config.stickyOffset ? "number" : !1) || ("header" === config.stickyOffset ? "header" : !1) || "percent",
					stickyOffset = 0,
					setOffset = function() {
						toolbarHeight = hasToolbar ? $toolbar.height() : 0, MK.utils.isResponsiveMenuState() && (headerHeight = config.responsiveHeight, hasToolbar && $toolbar.is(":hidden") && (toolbarHeight = 0)), "number" === type ? stickyOffset = config.stickyOffset : "header" === type ? stickyOffset = headerHeight + toolbarHeight + MK.val.adminbarHeight() : "percent" === type && (stickyOffset = MK.val.viewportPercentHeight(parseInt(config.stickyOffset)))
					};
				return setOffset(), $(window).on("resize", setOffset),
					function() {
						return stickyOffset
					}
			}(), MK.val.offsetHeaderHeight = function() {
				var $header = $(".mk-header").not(".js-header-shortcode").first();
				if (!$header.length) return function() {
					return 0
				};
				var $toolbar = $header.find(".mk-header-toolbar"),
					config = $header.data(),
					stickyHeight = config.stickyHeight,
					desktopHeight = config.height,
					mobileHeight = config.responsiveHeight,
					isTransparent = $header.hasClass("transparent-header"),
					isSticky = config.stickyStyle.length,
					isStickyLazy = "lazy" === config.stickyStyle,
					isVertical = 4 === config.headerStyle,
					hasToolbar = $toolbar.length,
					toolbarHeight = hasToolbar ? $toolbar.height() : 0,
					$innerHeader = $header.find(".mk-header-inner"),
					headerHeight = ($innerHeader.length, function(offset) {
						toolbarHeight = hasToolbar ? $toolbar.height() : 0;
						var stickyOffset = MK.val.stickyOffset();
						if (MK.utils.isResponsiveMenuState()) {
							hasToolbar && $toolbar.is(":hidden") && (toolbarHeight = 0);
							var headerBorder = 0;
							headerBorder = parseInt($innerHeader.css("border-bottom-width"));
							var totalHeight = mobileHeight + MK.val.adminbarHeight() + toolbarHeight + headerBorder;
							return totalHeight >= offset ? totalHeight : MK.val.adminbarHeight()
						}
						if (stickyOffset >= offset) return isVertical ? hasToolbar ? toolbarHeight + MK.val.adminbarHeight() : MK.val.adminbarHeight() : isTransparent ? MK.val.adminbarHeight() : desktopHeight + toolbarHeight + MK.val.adminbarHeight();
						if (offset > stickyOffset) {
							if (isVertical) return MK.val.adminbarHeight();
							if (!isSticky) return MK.val.adminbarHeight();
							if (isStickyLazy) return MK.val.adminbarHeight();
							if (isSticky) return stickyHeight + MK.val.adminbarHeight()
						}
						return 0
					});
				return function(offset) {
					return headerHeight(offset - MK.val.adminbarHeight())
				}
			}(), MK.val.dynamicOffset = function(el, position, threshold) {
				var $window = $(window),
					$el = $(el),
					pos = position || "top",
					thr = threshold || 0,
					container = document.getElementById("mk-theme-container"),
					currentPos = 0,
					offset = 0,
					winH = 0,
					rect = 0,
					x = 0,
					update = function() {
						winH = $window.height(), rect = $el[0].getBoundingClientRect(), offset = rect.top + MK.val.scroll(), x = "top" === pos ? MK.val.offsetHeaderHeight(offset) : winH + (rect.height - thr), currentPos = offset - x - 1
					};
				return update(), $window.on("load", update), $window.on("resize", update), window.addResizeListener(container, update),
					function() {
						return currentPos
					}
			}, MK.val.dynamicHeight = function(el) {
				var $window = $(window),
					$el = $(el),
					container = document.getElementById("mk-theme-container"),
					currentHeight = 0,
					update = function() {
						currentHeight = $el.outerHeight()
					};
				return update(), $window.on("load", update), $window.on("resize", update), window.addResizeListener(container, update),
					function() {
						return currentHeight
					}
			}
		}(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
			def: "easeOutQuad",
			swing: function(a, b, c, d, e) {
				return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
			},
			easeInQuad: function(a, b, c, d, e) {
				return d * (b /= e) * b + c
			},
			easeOutQuad: function(a, b, c, d, e) {
				return -d * (b /= e) * (b - 2) + c
			},
			easeInOutQuad: function(a, b, c, d, e) {
				return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
			},
			easeInCubic: function(a, b, c, d, e) {
				return d * (b /= e) * b * b + c
			},
			easeOutCubic: function(a, b, c, d, e) {
				return d * ((b = b / e - 1) * b * b + 1) + c
			},
			easeInOutCubic: function(a, b, c, d, e) {
				return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
			},
			easeInQuart: function(a, b, c, d, e) {
				return d * (b /= e) * b * b * b + c
			},
			easeOutQuart: function(a, b, c, d, e) {
				return -d * ((b = b / e - 1) * b * b * b - 1) + c
			},
			easeInOutQuart: function(a, b, c, d, e) {
				return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
			},
			easeInQuint: function(a, b, c, d, e) {
				return d * (b /= e) * b * b * b * b + c
			},
			easeOutQuint: function(a, b, c, d, e) {
				return d * ((b = b / e - 1) * b * b * b * b + 1) + c
			},
			easeInOutQuint: function(a, b, c, d, e) {
				return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
			},
			easeInSine: function(a, b, c, d, e) {
				return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
			},
			easeOutSine: function(a, b, c, d, e) {
				return d * Math.sin(b / e * (Math.PI / 2)) + c
			},
			easeInOutSine: function(a, b, c, d, e) {
				return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
			},
			easeInExpo: function(a, b, c, d, e) {
				return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
			},
			easeOutExpo: function(a, b, c, d, e) {
				return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
			},
			easeInOutExpo: function(a, b, c, d, e) {
				return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
			},
			easeInCirc: function(a, b, c, d, e) {
				return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
			},
			easeOutCirc: function(a, b, c, d, e) {
				return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
			},
			easeInOutCirc: function(a, b, c, d, e) {
				return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
			},
			easeInElastic: function(a, b, c, d, e) {
				var f = 1.70158,
					g = 0,
					h = d;
				if (0 == b) return c;
				if (1 == (b /= e)) return c + d;
				if (g || (g = .3 * e), h < Math.abs(d)) {
					h = d;
					var f = g / 4
				} else var f = g / (2 * Math.PI) * Math.asin(d / h);
				return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g)) + c
			},
			easeOutElastic: function(a, b, c, d, e) {
				var f = 1.70158,
					g = 0,
					h = d;
				if (0 == b) return c;
				if (1 == (b /= e)) return c + d;
				if (g || (g = .3 * e), h < Math.abs(d)) {
					h = d;
					var f = g / 4
				} else var f = g / (2 * Math.PI) * Math.asin(d / h);
				return h * Math.pow(2, -10 * b) * Math.sin(2 * (b * e - f) * Math.PI / g) + d + c
			},
			easeInOutElastic: function(a, b, c, d, e) {
				var f = 1.70158,
					g = 0,
					h = d;
				if (0 == b) return c;
				if (2 == (b /= e / 2)) return c + d;
				if (g || (g = .3 * e * 1.5), h < Math.abs(d)) {
					h = d;
					var f = g / 4
				} else var f = g / (2 * Math.PI) * Math.asin(d / h);
				return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) * .5 + d + c
			},
			easeInBack: function(a, b, c, d, e, f) {
				return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
			},
			easeOutBack: function(a, b, c, d, e, f) {
				return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
			},
			easeInOutBack: function(a, b, c, d, e, f) {
				return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
			},
			easeInBounce: function(a, b, c, d, e) {
				return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
			},
			easeOutBounce: function(a, b, c, d, e) {
				return (b /= e) < 1 / 2.75 ? 7.5625 * d * b * b + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
			},
			easeInOutBounce: function(a, b, c, d, e) {
				return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
			}
		}),
		function(s, H, f, w) {
			var K = f("html"),
				q = f(s),
				p = f(H),
				b = f.fancybox = function() {
					b.open.apply(this, arguments)
				},
				J = navigator.userAgent.match(/msie/i),
				C = null,
				t = H.createTouch !== w,
				u = function(a) {
					return a && a.hasOwnProperty && a instanceof f
				},
				r = function(a) {
					return a && "string" === f.type(a)
				},
				F = function(a) {
					return r(a) && 0 < a.indexOf("%")
				},
				m = function(a, d) {
					var e = parseInt(a, 10) || 0;
					return d && F(a) && (e *= b.getViewport()[d] / 100), Math.ceil(e)
				},
				x = function(a, b) {
					return m(a, b) + "px"
				};
			f.extend(b, {
				version: "2.1.5",
				defaults: {
					padding: 15,
					margin: 20,
					width: 800,
					height: 600,
					minWidth: 100,
					minHeight: 100,
					maxWidth: 9999,
					maxHeight: 9999,
					pixelRatio: 1,
					autoSize: !0,
					autoHeight: !1,
					autoWidth: !1,
					autoResize: !0,
					autoCenter: !t,
					fitToView: !0,
					aspectRatio: !1,
					topRatio: .5,
					leftRatio: .5,
					scrolling: "auto",
					wrapCSS: "",
					arrows: !0,
					closeBtn: !0,
					closeClick: !1,
					nextClick: !1,
					mouseWheel: !0,
					autoPlay: !1,
					playSpeed: 3e3,
					preload: 3,
					modal: !1,
					loop: !0,
					ajax: {
						dataType: "html",
						headers: {
							"X-fancyBox": !0
						}
					},
					iframe: {
						scrolling: "auto",
						preload: !0
					},
					swf: {
						wmode: "transparent",
						allowfullscreen: "true",
						allowscriptaccess: "always"
					},
					keys: {
						next: {
							13: "left",
							34: "up",
							39: "left",
							40: "up"
						},
						prev: {
							8: "right",
							33: "down",
							37: "right",
							38: "down"
						},
						close: [27],
						play: [32],
						toggle: [70]
					},
					direction: {
						next: "left",
						prev: "right"
					},
					scrollOutside: !0,
					index: 0,
					type: null,
					href: null,
					content: null,
					title: null,
					tpl: {
						wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
						image: '<img class="fancybox-image" src="{href}" alt="" />',
						iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (J ? ' allowtransparency="true"' : "") + "></iframe>",
						error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
						closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
						next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
						prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
					},
					openEffect: "fade",
					openSpeed: 250,
					openEasing: "swing",
					openOpacity: !0,
					openMethod: "zoomIn",
					closeEffect: "fade",
					closeSpeed: 250,
					closeEasing: "swing",
					closeOpacity: !0,
					closeMethod: "zoomOut",
					nextEffect: "elastic",
					nextSpeed: 250,
					nextEasing: "swing",
					nextMethod: "changeIn",
					prevEffect: "elastic",
					prevSpeed: 250,
					prevEasing: "swing",
					prevMethod: "changeOut",
					helpers: {
						overlay: !0,
						title: !0
					},
					onCancel: f.noop,
					beforeLoad: f.noop,
					afterLoad: f.noop,
					beforeShow: f.noop,
					afterShow: f.noop,
					beforeChange: f.noop,
					beforeClose: f.noop,
					afterClose: f.noop
				},
				group: {},
				opts: {},
				previous: null,
				coming: null,
				current: null,
				isActive: !1,
				isOpen: !1,
				isOpened: !1,
				wrap: null,
				skin: null,
				outer: null,
				inner: null,
				player: {
					timer: null,
					isActive: !1
				},
				ajaxLoad: null,
				imgPreload: null,
				transitions: {},
				helpers: {},
				open: function(a, d) {
					return a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0)) ? (f.isArray(a) || (a = u(a) ? f(a).get() : [a]), f.each(a, function(e, c) {
						var g, h, k, n, m, l = {};
						"object" === f.type(c) && (c.nodeType && (c = f(c)), u(c) ? (l = {
							href: c.data("fancybox-href") || c.attr("href"),
							title: f("<div/>").text(c.data("fancybox-title") || c.attr("title")).html(),
							isDom: !0,
							element: c
						}, f.metadata && f.extend(!0, l, c.metadata())) : l = c), g = d.href || l.href || (r(c) ? c : null), h = d.title !== w ? d.title : l.title || "", n = (k = d.content || l.content) ? "html" : d.type || l.type, !n && l.isDom && (n = c.data("fancybox-type"), n || (n = (n = c.prop("class").match(/fancybox\.(\w+)/)) ? n[1] : null)), r(g) && (n || (b.isImage(g) ? n = "image" : b.isSWF(g) ? n = "swf" : "#" === g.charAt(0) ? n = "inline" : r(c) && (n = "html", k = c)), "ajax" === n && (m = g.split(/\s+/, 2), g = m.shift(), m = m.shift())), k || ("inline" === n ? g ? k = f(r(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : l.isDom && (k = c) : "html" === n ? k = g : n || g || !l.isDom || (n = "inline", k = c)), f.extend(l, {
							href: g,
							type: n,
							content: k,
							title: h,
							selector: m
						}), a[e] = l
					}), b.opts = f.extend(!0, {}, b.defaults, d), d.keys !== w && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index)) : void 0
				},
				cancel: function() {
					var a = b.coming;
					a && !1 === b.trigger("onCancel") || (b.hideLoading(), a && (b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), b.coming = null, b.current || b._afterZoomOut(a)))
				},
				close: function(a) {
					b.cancel(), !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (b.isOpen && !0 !== a ? (b.isOpen = b.isOpened = !1, b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]()) : (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut())))
				},
				play: function(a) {
					var d = function() {
							clearTimeout(b.player.timer)
						},
						e = function() {
							d(), b.current && b.player.isActive && (b.player.timer = setTimeout(b.next, b.current.playSpeed))
						},
						c = function() {
							d(), p.unbind(".player"), b.player.isActive = !1, b.trigger("onPlayEnd")
						};
					!0 === a || !b.player.isActive && !1 !== a ? b.current && (b.current.loop || b.current.index < b.group.length - 1) && (b.player.isActive = !0, p.bind({
						"onCancel.player beforeClose.player": c,
						"onUpdate.player": e,
						"beforeLoad.player": d
					}), e(), b.trigger("onPlayStart")) : c()
				},
				next: function(a) {
					var d = b.current;
					d && (r(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next"))
				},
				prev: function(a) {
					var d = b.current;
					d && (r(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev"))
				},
				jumpto: function(a, d, e) {
					var c = b.current;
					c && (a = m(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop && (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), c.group[a] !== w && (b.cancel(), b._start(a)))
				},
				reposition: function(a, d) {
					var l, e = b.current,
						c = e ? e.wrap : null;
					c && (l = b._getPosition(d), a && "scroll" === a.type ? (delete l.position, c.stop(!0, !0).animate(l, 200)) : (c.css(l), e.pos = f.extend({}, e.dim, l)))
				},
				update: function(a) {
					var d = a && a.originalEvent && a.originalEvent.type,
						e = !d || "orientationchange" === d;
					e && (clearTimeout(C), C = null), b.isOpen && !C && (C = setTimeout(function() {
						var c = b.current;
						c && !b.isClosing && (b.wrap.removeClass("fancybox-tmp"), (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(), "scroll" === d && c.canShrink || b.reposition(a), b.trigger("onUpdate"), C = null)
					}, e && !t ? 0 : 300))
				},
				toggle: function(a) {
					b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, t && (b.wrap.removeAttr("style").addClass("fancybox-tmp"), b.trigger("onUpdate")), b.update())
				},
				hideLoading: function() {
					p.unbind(".loading"), f("#fancybox-loading").remove()
				},
				showLoading: function() {
					var a, d;
					b.hideLoading(), a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body"), p.bind("keydown.loading", function(a) {
						27 === (a.which || a.keyCode) && (a.preventDefault(), b.cancel())
					}), b.defaults.fixed || (d = b.getViewport(), a.css({
						position: "absolute",
						top: .5 * d.h + d.y,
						left: .5 * d.w + d.x
					})), b.trigger("onLoading")
				},
				getViewport: function() {
					var a = b.current && b.current.locked || !1,
						d = {
							x: q.scrollLeft(),
							y: q.scrollTop()
						};
					return a && a.length ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = t && s.innerWidth ? s.innerWidth : q.width(), d.h = t && s.innerHeight ? s.innerHeight : q.height()), d
				},
				unbindEvents: function() {
					b.wrap && u(b.wrap) && b.wrap.unbind(".fb"), p.unbind(".fb"), q.unbind(".fb")
				},
				bindEvents: function() {
					var d, a = b.current;
					a && (q.bind("orientationchange.fb" + (t ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && p.bind("keydown.fb", function(e) {
						var c = e.which || e.keyCode,
							l = e.target || e.srcElement;
						return 27 === c && b.coming ? !1 : void(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || l && (l.type || f(l).is("[contenteditable]")) || f.each(d, function(d, l) {
							return 1 < a.group.length && l[c] !== w ? (b[d](l[c]), e.preventDefault(), !1) : -1 < f.inArray(c, l) ? (b[d](), e.preventDefault(), !1) : void 0
						}))
					}), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function(d, c, l, g) {
						for (var h = f(d.target || null), k = !1; h.length && !(k || h.is(".fancybox-skin") || h.is(".fancybox-wrap"));) k = h[0] && !(h[0].style.overflow && "hidden" === h[0].style.overflow) && (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
						0 !== c && !k && 1 < b.group.length && !a.canShrink && (g > 0 || l > 0 ? b.prev(g > 0 ? "down" : "left") : (0 > g || 0 > l) && b.next(0 > g ? "up" : "right"), d.preventDefault())
					}))
				},
				trigger: function(a, d) {
					var e, c = d || b.coming || b.current;
					if (c) {
						if (f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1))), !1 === e) return !1;
						c.helpers && f.each(c.helpers, function(d, e) {
							e && b.helpers[d] && f.isFunction(b.helpers[d][a]) && b.helpers[d][a](f.extend(!0, {}, b.helpers[d].defaults, e), c)
						})
					}
					p.trigger(a)
				},
				isImage: function(a) {
					return r(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
				},
				isSWF: function(a) {
					return r(a) && a.match(/\.(swf)((\?|#).*)?$/i)
				},
				_start: function(a) {
					var e, c, d = {};
					if (a = m(a), e = b.group[a] || null, !e) return !1;
					if (d = f.extend(!0, {}, b.opts, e), e = d.margin, c = d.padding, "number" === f.type(e) && (d.margin = [e, e, e, e]), "number" === f.type(c) && (d.padding = [c, c, c, c]), d.modal && f.extend(!0, d, {
							closeBtn: !1,
							closeClick: !1,
							nextClick: !1,
							arrows: !1,
							mouseWheel: !1,
							keys: null,
							helpers: {
								overlay: {
									closeClick: !1
								}
							}
						}), d.autoSize && (d.autoWidth = d.autoHeight = !0), "auto" === d.width && (d.autoWidth = !0), "auto" === d.height && (d.autoHeight = !0), d.group = b.group, d.index = a, b.coming = d, !1 === b.trigger("beforeLoad")) b.coming = null;
					else {
						if (c = d.type, e = d.href, !c) return b.coming = null, b.current && b.router && "jumpto" !== b.router ? (b.current.index = a, b[b.router](b.direction)) : !1;
						if (b.isActive = !0, "image" !== c && "swf" !== c || (d.autoHeight = d.autoWidth = !1, d.scrolling = "visible"), "image" === c && (d.aspectRatio = !0), "iframe" === c && t && (d.scrolling = "scroll"), d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (t ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + d.wrapCSS).appendTo(d.parent || "body"), f.extend(d, {
								skin: f(".fancybox-skin", d.wrap),
								outer: f(".fancybox-outer", d.wrap),
								inner: f(".fancybox-inner", d.wrap)
							}), f.each(["Top", "Right", "Bottom", "Left"], function(a, b) {
								d.skin.css("padding" + b, x(d.padding[a]))
							}), b.trigger("onReady"), "inline" === c || "html" === c) {
							if (!d.content || !d.content.length) return b._error("content")
						} else if (!e) return b._error("href");
						"image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
					}
				},
				_error: function(a) {
					f.extend(b.coming, {
						type: "html",
						autoWidth: !0,
						autoHeight: !0,
						minWidth: 0,
						minHeight: 0,
						scrolling: "no",
						hasError: a,
						content: b.coming.tpl.error
					}), b._afterLoad()
				},
				_loadImage: function() {
					var a = b.imgPreload = new Image;
					a.onload = function() {
						this.onload = this.onerror = null, b.coming.width = this.width / b.opts.pixelRatio, b.coming.height = this.height / b.opts.pixelRatio, b._afterLoad()
					}, a.onerror = function() {
						this.onload = this.onerror = null, b._error("image")
					}, a.src = b.coming.href, !0 !== a.complete && b.showLoading()
				},
				_loadAjax: function() {
					var a = b.coming;
					b.showLoading(), b.ajaxLoad = f.ajax(f.extend({}, a.ajax, {
						url: a.href,
						error: function(a, e) {
							b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
						},
						success: function(d, e) {
							"success" === e && (a.content = d, b._afterLoad())
						}
					}))
				},
				_loadIframe: function() {
					var a = b.coming,
						d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", t ? "auto" : a.iframe.scrolling).attr("src", a.href);
					f(a.wrap).bind("onReset", function() {
						try {
							f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
						} catch (a) {}
					}), a.iframe.preload && (b.showLoading(), d.one("load", function() {
						f(this).data("ready", 1), t || f(this).bind("load.fb", b.update), f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), b._afterLoad()
					})), a.content = d.appendTo(a.inner), a.iframe.preload || b._afterLoad()
				},
				_preloadImages: function() {
					var f, g, a = b.group,
						d = b.current,
						e = a.length,
						c = d.preload ? Math.min(d.preload, e - 1) : 0;
					for (g = 1; c >= g; g += 1) f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
				},
				_afterLoad: function() {
					var e, c, l, g, h, a = b.coming,
						d = b.current;
					if (b.hideLoading(), a && !1 !== b.isActive)
						if (!1 === b.trigger("afterLoad", a, d)) a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null;
						else {
							switch (d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), b.unbindEvents(), e = a.content, c = a.type, l = a.scrolling, f.extend(b, {
								wrap: a.wrap,
								skin: a.skin,
								outer: a.outer,
								inner: a.inner,
								current: a,
								previous: d
							}), g = a.href, c) {
								case "inline":
								case "ajax":
								case "html":
									a.selector ? e = f("<div>").html(e).find(a.selector) : u(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function() {
										f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
									}));
									break;
								case "image":
									e = a.tpl.image.replace(/\{href\}/g, g);
									break;
								case "swf":
									e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>', h = "", f.each(a.swf, function(a, b) {
										e += '<param name="' + a + '" value="' + b + '"></param>', h += " " + a + '="' + b + '"'
									}), e += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
							}
							u(e) && e.parent().is(a.inner) || a.inner.append(e), b.trigger("beforeShow"), a.inner.css("overflow", "yes" === l ? "scroll" : "no" === l ? "hidden" : l), b._setDimension(), b.reposition(), b.isOpen = !1, b.coming = null, b.bindEvents(), b.isOpened ? d.prevMethod && b.transitions[d.prevMethod]() : f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove(), b.transitions[b.isOpened ? a.nextMethod : a.openMethod](), b._preloadImages()
						}
				},
				_setDimension: function() {
					var w, A, u, D, B, G, C, E, I, a = b.getViewport(),
						d = 0,
						e = !1,
						c = !1,
						e = b.wrap,
						l = b.skin,
						g = b.inner,
						h = b.current,
						c = h.width,
						k = h.height,
						n = h.minWidth,
						v = h.minHeight,
						p = h.maxWidth,
						q = h.maxHeight,
						t = h.scrolling,
						r = h.scrollOutside ? h.scrollbarWidth : 0,
						y = h.margin,
						z = m(y[1] + y[3]),
						s = m(y[0] + y[2]);
					if (e.add(l).add(g).width("auto").height("auto").removeClass("fancybox-tmp"), y = m(l.outerWidth(!0) - l.width()), w = m(l.outerHeight(!0) - l.height()), A = z + y, u = s + w, D = F(c) ? (a.w - A) * m(c) / 100 : c, B = F(k) ? (a.h - u) * m(k) / 100 : k, "iframe" === h.type) {
						if (I = h.content, h.autoHeight && 1 === I.data("ready")) try {
							I[0].contentWindow.document.location && (g.width(D).height(9999), G = I.contents().find("body"), r && G.css("overflow-x", "hidden"), B = G.outerHeight(!0))
						} catch (H) {}
					} else(h.autoWidth || h.autoHeight) && (g.addClass("fancybox-tmp"), h.autoWidth || g.width(D), h.autoHeight || g.height(B), h.autoWidth && (D = g.width()), h.autoHeight && (B = g.height()), g.removeClass("fancybox-tmp"));
					if (c = m(D), k = m(B), E = D / B, n = m(F(n) ? m(n, "w") - A : n), p = m(F(p) ? m(p, "w") - A : p), v = m(F(v) ? m(v, "h") - u : v), q = m(F(q) ? m(q, "h") - u : q), G = p, C = q, h.fitToView && (p = Math.min(a.w - A, p), q = Math.min(a.h - u, q)), A = a.w - z, s = a.h - s, h.aspectRatio ? (c > p && (c = p, k = m(c / E)), k > q && (k = q, c = m(k * E)), n > c && (c = n, k = m(c / E)), v > k && (k = v, c = m(k * E))) : (c = Math.max(n, Math.min(c, p)), h.autoHeight && "iframe" !== h.type && (g.width(c), k = g.height()), k = Math.max(v, Math.min(k, q))), h.fitToView)
						if (g.width(c).height(k), e.width(c + y), a = e.width(), z = e.height(), h.aspectRatio)
							for (;
								(a > A || z > s) && c > n && k > v && !(19 < d++);) k = Math.max(v, Math.min(q, k - 10)), c = m(k * E), n > c && (c = n, k = m(c / E)), c > p && (c = p, k = m(c / E)), g.width(c).height(k), e.width(c + y), a = e.width(), z = e.height();
						else c = Math.max(n, Math.min(c, c - (a - A))), k = Math.max(v, Math.min(k, k - (z - s)));
					r && "auto" === t && B > k && A > c + y + r && (c += r), g.width(c).height(k), e.width(c + y), a = e.width(), z = e.height(), e = (a > A || z > s) && c > n && k > v, c = h.aspectRatio ? G > c && C > k && D > c && B > k : (G > c || C > k) && (D > c || B > k), f.extend(h, {
						dim: {
							width: x(a),
							height: x(z)
						},
						origWidth: D,
						origHeight: B,
						canShrink: e,
						canExpand: c,
						wPadding: y,
						hPadding: w,
						wrapSpace: z - l.outerHeight(!0),
						skinSpace: l.height() - k
					}), !I && h.autoHeight && k > v && q > k && !c && g.height("auto")
				},
				_getPosition: function(a) {
					var d = b.current,
						e = b.getViewport(),
						c = d.margin,
						f = b.wrap.width() + c[1] + c[3],
						g = b.wrap.height() + c[0] + c[2],
						c = {
							position: "absolute",
							top: c[0],
							left: c[3]
						};
					return d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x), c.top = x(Math.max(c.top, c.top + (e.h - g) * d.topRatio)), c.left = x(Math.max(c.left, c.left + (e.w - f) * d.leftRatio)), c
				},
				_afterZoomIn: function() {
					var a = b.current;
					a && (b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function(d) {
						f(d.target).is("a") || f(d.target).parent().is("a") || (d.preventDefault(), b[a.closeClick ? "close" : "next"]())
					}), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function(a) {
						a.preventDefault(), b.close()
					}), a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), a.loop || a.index !== a.group.length - 1 ? b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play(!0)) : b.play(!1))
				},
				_afterZoomOut: function(a) {
					a = a || b.current, f(".fancybox-wrap").trigger("onReset").remove(), f.extend(b, {
						group: {},
						opts: {},
						router: !1,
						current: null,
						isActive: !1,
						isOpened: !1,
						isOpen: !1,
						isClosing: !1,
						wrap: null,
						skin: null,
						outer: null,
						inner: null
					}), b.trigger("afterClose", a)
				}
			}), b.transitions = {
				getOrigPosition: function() {
					var a = b.current,
						d = a.element,
						e = a.orig,
						c = {},
						f = 50,
						g = 50,
						h = a.hPadding,
						k = a.wPadding,
						n = b.getViewport();
					return !e && a.isDom && d.is(":visible") && (e = d.find("img:first"), e.length || (e = d)), u(e) ? (c = e.offset(), e.is("img") && (f = e.outerWidth(), g = e.outerHeight())) : (c.top = n.y + (n.h - g) * a.topRatio, c.left = n.x + (n.w - f) * a.leftRatio), ("fixed" === b.wrap.css("position") || a.locked) && (c.top -= n.y, c.left -= n.x), c = {
						top: x(c.top - h * a.topRatio),
						left: x(c.left - k * a.leftRatio),
						width: x(f + k),
						height: x(g + h)
					}
				},
				step: function(a, d) {
					var e, c, f = d.prop;
					c = b.current;
					var g = c.wrapSpace,
						h = c.skinSpace;
					"width" !== f && "height" !== f || (e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" === f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](m("width" === f ? c : c - g * e)), b.inner[f](m("width" === f ? c : c - g * e - h * e)))
				},
				zoomIn: function() {
					var a = b.current,
						d = a.pos,
						e = a.openEffect,
						c = "elastic" === e,
						l = f.extend({
							opacity: 1
						}, d);
					delete l.position, c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = .1)) : "fade" === e && (d.opacity = .1), b.wrap.css(d).animate(l, {
						duration: "none" === e ? 0 : a.openSpeed,
						easing: a.openEasing,
						step: c ? this.step : null,
						complete: b._afterZoomIn
					})
				},
				zoomOut: function() {
					var a = b.current,
						d = a.closeEffect,
						e = "elastic" === d,
						c = {
							opacity: .1
						};
					e && (c = this.getOrigPosition(), a.closeOpacity && (c.opacity = .1)), b.wrap.animate(c, {
						duration: "none" === d ? 0 : a.closeSpeed,
						easing: a.closeEasing,
						step: e ? this.step : null,
						complete: b._afterZoomOut
					})
				},
				changeIn: function() {
					var g, a = b.current,
						d = a.nextEffect,
						e = a.pos,
						c = {
							opacity: 1
						},
						f = b.direction;
					e.opacity = .1, "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = x(m(e[g]) - 200), c[g] = "+=200px") : (e[g] = x(m(e[g]) + 200), c[g] = "-=200px")), "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, {
						duration: a.nextSpeed,
						easing: a.nextEasing,
						complete: b._afterZoomIn
					})
				},
				changeOut: function() {
					var a = b.previous,
						d = a.prevEffect,
						e = {
							opacity: .1
						},
						c = b.direction;
					"elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "=200px"), a.wrap.animate(e, {
						duration: "none" === d ? 0 : a.prevSpeed,
						easing: a.prevEasing,
						complete: function() {
							f(this).trigger("onReset").remove()
						}
					})
				}
			}, b.helpers.overlay = {
				defaults: {
					closeClick: !0,
					speedOut: 200,
					showEarly: !0,
					css: {},
					locked: !t,
					fixed: !0
				},
				overlay: null,
				fixed: !1,
				el: f("html"),
				create: function(a) {
					var d;
					a = f.extend({}, this.defaults, a), this.overlay && this.close(), d = b.coming ? b.coming.parent : a.parent, this.overlay = f('<div class="fancybox-overlay"></div>').appendTo(d && d.lenth ? d : "body"), this.fixed = !1, a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
				},
				open: function(a) {
					var d = this;
					a = f.extend({}, this.defaults, a), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a), this.fixed || (q.bind("resize.overlay", f.proxy(this.update, this)), this.update()), a.closeClick && this.overlay.bind("click.overlay", function(a) {
						return f(a.target).hasClass("fancybox-overlay") ? (b.isActive ? b.close() : d.close(), !1) : void 0
					}), this.overlay.css(a.css).show()
				},
				close: function() {
					q.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (f(".fancybox-margin").removeClass("fancybox-margin"), this.el.removeClass("fancybox-lock"), q.scrollTop(this.scrollV).scrollLeft(this.scrollH)), f(".fancybox-overlay").remove().hide(), f.extend(this, {
						overlay: null,
						fixed: !1
					})
				},
				update: function() {
					var b, a = "100%";
					this.overlay.width(a).height("100%"), J ? (b = Math.max(H.documentElement.offsetWidth, H.body.offsetWidth), p.width() > b && (a = p.width())) : p.width() > q.width() && (a = p.width()), this.overlay.width(a).height(p.height())
				},
				onReady: function(a, b) {
					var e = this.overlay;
					f(".fancybox-overlay").stop(!0, !0), e || this.create(a), a.locked && this.fixed && b.fixed && (b.locked = this.overlay.append(b.wrap), b.fixed = !1), !0 === a.showEarly && this.beforeShow.apply(this, arguments)
				},
				beforeShow: function(a, b) {
					b.locked && !this.el.hasClass("fancybox-lock") && (!1 !== this.fixPosition && f("*").filter(function() {
						return "fixed" === f(this).css("position") && !f(this).hasClass("fancybox-overlay") && !f(this).hasClass("fancybox-wrap")
					}).addClass("fancybox-margin"), this.el.addClass("fancybox-margin"), this.scrollV = q.scrollTop(), this.scrollH = q.scrollLeft(), this.el.addClass("fancybox-lock"), q.scrollTop(this.scrollV).scrollLeft(this.scrollH)), this.open(a)
				},
				onUpdate: function() {
					this.fixed || this.update()
				},
				afterClose: function(a) {
					this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this))
				}
			}, b.helpers.title = {
				defaults: {
					type: "float",
					position: "bottom"
				},
				beforeShow: function(a) {
					var d = b.current,
						e = d.title,
						c = a.type;
					if (f.isFunction(e) && (e = e.call(d.element, d)), r(e) && "" !== f.trim(e)) {
						switch (d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + "</div>"), c) {
							case "inside":
								c = b.skin;
								break;
							case "outside":
								c = b.wrap;
								break;
							case "over":
								c = b.inner;
								break;
							default:
								c = b.skin, d.appendTo("body"), J && d.width(d.width()), d.wrapInner('<span class="child"></span>'), b.current.margin[2] += Math.abs(m(d.css("margin-bottom")))
						}
						d["top" === a.position ? "prependTo" : "appendTo"](c)
					}
				}
			}, f.fn.fancybox = function(a) {
				var d, e = f(this),
					c = this.selector || "",
					l = function(g) {
						var l, m, h = f(this).blur(),
							k = d;
						g.ctrlKey || g.altKey || g.shiftKey || g.metaKey || h.is(".fancybox-wrap") || (l = a.groupAttr || "data-fancybox-group", m = h.attr(l), m || (l = "rel", m = h.get(0)[l]), m && "" !== m && "nofollow" !== m && (h = c.length ? f(c) : e, h = h.filter("[" + l + '="' + m + '"]'), k = h.index(this)), a.index = k, !1 !== b.open(h, a) && g.preventDefault())
					};
				return a = a || {}, d = a.index || 0, c && !1 !== a.live ? p.undelegate(c, "click.fb-start").delegate(c + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", l) : e.unbind("click.fb-start").bind("click.fb-start", l), this.filter("[data-fancybox-start=1]").trigger("click"), this
			}, p.ready(function() {
				var a, d;
				f.scrollbarWidth === w && (f.scrollbarWidth = function() {
					var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
						b = a.children(),
						b = b.innerWidth() - b.height(99).innerWidth();
					return a.remove(), b
				}), f.support.fixedPosition === w && (f.support.fixedPosition = function() {
					var a = f('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
						b = 20 === a[0].offsetTop || 15 === a[0].offsetTop;
					return a.remove(), b
				}()), f.extend(b.defaults, {
					scrollbarWidth: f.scrollbarWidth(),
					fixed: f.support.fixedPosition,
					parent: f("body")
				}), a = f(s).width(), K.addClass("fancybox-lock-test"), d = f(s).width(), K.removeClass("fancybox-lock-test"), f("<style type='text/css'>.fancybox-margin{margin-right:" + (d - a) + "px;}</style>").appendTo("head")
			})
		}(window, document, jQuery),
		function($) {
			"use strict";
			var F = $.fancybox,
				format = function(url, rez, params) {
					return params = params || "", "object" === $.type(params) && (params = $.param(params, !0)), $.each(rez, function(key, value) {
						url = url.replace("$" + key, value || "")
					}), params.length && (url += (url.indexOf("?") > 0 ? "&" : "?") + params), url
				};
			F.helpers.media = {
				defaults: {
					youtube: {
						matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
						params: {
							autoplay: 1,
							autohide: 1,
							fs: 1,
							rel: 0,
							hd: 1,
							wmode: "opaque",
							enablejsapi: 1
						},
						type: "iframe",
						url: "//www.youtube.com/embed/$3"
					},
					vimeo: {
						matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
						params: {
							autoplay: 1,
							hd: 1,
							show_title: 1,
							show_byline: 1,
							show_portrait: 0,
							fullscreen: 1
						},
						type: "iframe",
						url: "//player.vimeo.com/video/$1"
					},
					metacafe: {
						matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
						params: {
							autoPlay: "yes"
						},
						type: "swf",
						url: function(rez, params, obj) {
							return obj.swf.flashVars = "playerVars=" + $.param(params, !0), "//www.metacafe.com/fplayer/" + rez[1] + "/.swf"
						}
					},
					dailymotion: {
						matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
						params: {
							additionalInfos: 0,
							autoStart: 1
						},
						type: "swf",
						url: "//www.dailymotion.com/swf/video/$1"
					},
					twitvid: {
						matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
						params: {
							autoplay: 0
						},
						type: "iframe",
						url: "//www.twitvid.com/embed.php?guid=$1"
					},
					twitpic: {
						matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
						type: "image",
						url: "//twitpic.com/show/full/$1/"
					},
					instagram: {
						matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
						type: "image",
						url: "//$1/p/$2/media/?size=l"
					},
					google_maps: {
						matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
						type: "iframe",
						url: function(rez) {
							return "//maps.google." + rez[1] + "/" + rez[3] + rez[4] + "&output=" + (rez[4].indexOf("layer=c") > 0 ? "svembed" : "embed")
						}
					}
				},
				beforeLoad: function(opts, obj) {
					var what, item, rez, params, url = obj.href || "",
						type = !1;
					for (what in opts)
						if (opts.hasOwnProperty(what) && (item = opts[what], rez = url.match(item.matcher))) {
							type = item.type, params = $.extend(!0, {}, item.params, obj[what] || ($.isPlainObject(opts[what]) ? opts[what].params : null)), url = "function" === $.type(item.url) ? item.url.call(this, rez, params, obj) : format(item.url, rez, params);
							break
						}
					type && (obj.href = url, obj.type = type, obj.autoHeight = !1)
				}
			}
		}(jQuery),
		function($, window, document, undefined) {
			function CustomMenu(element, options) {
				this.element = element, this.options = $.extend({}, defaults, options), this._defaults = defaults, this._name = pluginName, this.init()
			}
			var pluginName = "MegaMenu",
				defaults = {
					propertyName: "value"
				},
				menus = [];
			CustomMenu.prototype = {
				isOpen: !1,
				timeout: null,
				init: function() {
					var that = this;
					$(this).each(function(index, menu) {
						that.node = menu.element, that.addListeners(menu.element);
						var $menu = $(menu.element);
						$menu.addClass("dropdownJavascript"), menus.push(menu.element), $menu.find("ul > li").each(function(index, submenu) {
							$(submenu).find("ul").length > 0 && $(submenu).addClass("with-menu")
						})
					})
				},
				addListeners: function(menu) {
					var that = this;
					$(menu).mouseover(function(e) {
						that.handleMouseOver.call(that, e)
					}).mouseout(function(e) {
						that.handleMouseOut.call(that, e)
					})
				},
				handleMouseOver: function(e) {
					var that = this;
					this.clearTimeout();
					for (var item = e.target || e.srcElement;
						"LI" != item.nodeName && item != this.node;) item = item.parentNode;
					"LI" == item.nodeName && (this.toOpen = item, this.timeout = setTimeout(function() {
						that.open.call(that)
					}, this.options.delay))
				},
				handleMouseOut: function() {
					var that = this;
					this.clearTimeout(), this.timeout = setTimeout(function() {
						that.close.call(that)
					}, this.options.delay)
				},
				clearTimeout: function() {
					this.timeout && (clearTimeout(this.timeout), this.timeout = null)
				},
				open: function() {
					var that = this;
					this.isOpen = !0;
					var items = $(this.toOpen).parent().children("li");
					$(items).each(function(index, item) {
						$(item).find("ul").each(function(index, submenu) {
							if (item != that.toOpen) $(item).removeClass("dropdownOpen"), that.close(item);
							else if (!$(item).hasClass("dropdownOpen")) {
								$(item).addClass("dropdownOpen");
								for (var left = 0, node = submenu; node;) left += Math.abs(node.offsetLeft), node = node.offsetParent;
								var right = left + submenu.offsetWidth;
								$(submenu).outerHeight(), $(submenu).offset().top - $(window).scrollTop(), window.innerHeight;
								$(item).removeClass("dropdownRightToLeft"), 0 > left && $(item).addClass("dropdownLeftToRight"), right > document.body.clientWidth && $(item).addClass("dropdownRightToLeft")
							}
						})
					})
				},
				close: function(node) {
					node || (this.isOpen = !1, node = this.node), $(node).find("li").each(function(index, item) {
						$(item).removeClass("dropdownOpen")
					})
				}
			}, $.fn[pluginName] = function(options) {
				return this.each(function() {
					$.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new CustomMenu(this, options))
				})
			}
		}(jQuery, window, document), window.Modernizr = function(a, b, c) {
			function z(a) {
				j.cssText = a
			}

			function B(a, b) {
				return typeof a === b
			}

			function C(a, b) {
				return !!~("" + a).indexOf(b)
			}

			function D(a, b) {
				for (var d in a) {
					var e = a[d];
					if (!C(e, "-") && j[e] !== c) return "pfx" == b ? e : !0
				}
				return !1
			}

			function E(a, b, d) {
				for (var e in a) {
					var f = b[a[e]];
					if (f !== c) return d === !1 ? a[e] : B(f, "function") ? f.bind(d || b) : f
				}
				return !1
			}

			function F(a, b, c) {
				var d = a.charAt(0).toUpperCase() + a.slice(1),
					e = (a + " " + o.join(d + " ") + d).split(" ");
				return B(b, "string") || B(b, "undefined") ? D(e, b) : (e = (a + " " + p.join(d + " ") + d).split(" "), E(e, b, c))
			}
			var k, v, y, d = "2.6.2",
				e = {},
				f = !0,
				g = b.documentElement,
				h = "modernizr",
				i = b.createElement(h),
				j = i.style,
				m = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
				n = "Webkit Moz O ms",
				o = n.split(" "),
				p = n.toLowerCase().split(" "),
				q = {},
				t = [],
				u = t.slice,
				w = function(a, c, d, e) {
					var f, i, j, k, l = b.createElement("div"),
						m = b.body,
						n = m || b.createElement("body");
					if (parseInt(d, 10))
						for (; d--;) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
					return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
				},
				x = {}.hasOwnProperty;
			y = B(x, "undefined") || B(x.call, "undefined") ? function(a, b) {
				return b in a && B(a.constructor.prototype[b], "undefined")
			} : function(a, b) {
				return x.call(a, b)
			}, Function.prototype.bind || (Function.prototype.bind = function(b) {
				var c = this;
				if ("function" != typeof c) throw new TypeError;
				var d = u.call(arguments, 1),
					e = function() {
						if (this instanceof e) {
							var a = function() {};
							a.prototype = c.prototype;
							var f = new a,
								g = c.apply(f, d.concat(u.call(arguments)));
							return Object(g) === g ? g : f
						}
						return c.apply(b, d.concat(u.call(arguments)))
					};
				return e
			}), q.touch = function() {
				var c;
				return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : w(["@media (", m.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
					c = 9 === a.offsetTop
				}), c
			}, q.cssanimations = function() {
				return F("animationName")
			}, q.csstransitions = function() {
				return F("transition")
			};
			for (var G in q) y(q, G) && (v = G.toLowerCase(), e[v] = q[G](), t.push((e[v] ? "" : "no-") + v));
			return e.addTest = function(a, b) {
					if ("object" == typeof a)
						for (var d in a) y(a, d) && e.addTest(d, a[d]);
					else {
						if (a = a.toLowerCase(), e[a] !== c) return e;
						b = "function" == typeof b ? b() : b, "undefined" != typeof f && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
					}
					return e
				}, z(""), i = k = null,
				function(a, b) {
					function k(a, b) {
						var c = a.createElement("p"),
							d = a.getElementsByTagName("head")[0] || a.documentElement;
						return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
					}

					function l() {
						var a = r.elements;
						return "string" == typeof a ? a.split(" ") : a
					}

					function m(a) {
						var b = i[a[g]];
						return b || (b = {}, h++, a[g] = h, i[h] = b), b
					}

					function n(a, c, f) {
						if (c || (c = b), j) return c.createElement(a);
						f || (f = m(c));
						var g;
						return g = f.cache[a] ? f.cache[a].cloneNode() : e.test(a) ? (f.cache[a] = f.createElem(a)).cloneNode() : f.createElem(a), g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g
					}

					function o(a, c) {
						if (a || (a = b), j) return a.createDocumentFragment();
						c = c || m(a);
						for (var d = c.frag.cloneNode(), e = 0, f = l(), g = f.length; g > e; e++) d.createElement(f[e]);
						return d
					}

					function p(a, b) {
						b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
							return r.shivMethods ? n(c, a, b) : b.createElem(c)
						}, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function(a) {
							return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
						}) + ");return n}")(r, b.frag)
					}

					function q(a) {
						a || (a = b);
						var c = m(a);
						return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a
					}
					var f, j, c = a.html5 || {},
						d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
						e = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
						g = "_html5shiv",
						h = 0,
						i = {};
					! function() {
						try {
							var a = b.createElement("a");
							a.innerHTML = "<xyz></xyz>", f = "hidden" in a, j = 1 == a.childNodes.length || function() {
								b.createElement("a");
								var a = b.createDocumentFragment();
								return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
							}()
						} catch (c) {
							f = !0, j = !0
						}
					}();
					var r = {
						elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
						shivCSS: c.shivCSS !== !1,
						supportsUnknownElements: j,
						shivMethods: c.shivMethods !== !1,
						type: "default",
						shivDocument: q,
						createElement: n,
						createDocumentFragment: o
					};
					a.html5 = r, q(b)
				}(this, b), e._version = d, e._prefixes = m, e._domPrefixes = p, e._cssomPrefixes = o, e.testProp = function(a) {
					return D([a])
				}, e.testAllProps = F, e.testStyles = w, e.prefixed = function(a, b, c) {
					return b ? F(a, b, c) : F(a, "pfx")
				}, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + t.join(" ") : ""), e
		}(this, this.document),
		function(a, b, c) {
			function d(a) {
				return "[object Function]" == o.call(a)
			}

			function e(a) {
				return "string" == typeof a
			}

			function f() {}

			function g(a) {
				return !a || "loaded" == a || "complete" == a || "uninitialized" == a
			}

			function h() {
				var a = p.shift();
				q = 1, a ? a.t ? m(function() {
					("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
				}, 0) : (a(), h()) : q = 0
			}

			function i(a, c, d, e, f, i, j) {
				function k(b) {
					if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
						"img" != a && m(function() {
							t.removeChild(l)
						}, 50);
						for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload()
					}
				}
				var j = j || B.errorTimeout,
					l = b.createElement(a),
					o = 0,
					r = 0,
					u = {
						t: d,
						s: c,
						e: f,
						a: i,
						x: j
					};
				1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
					k.call(this, r)
				}, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
			}

			function j(a, b, c, d, f) {
				return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
			}

			function k() {
				var a = B;
				return a.loader = {
					load: j,
					i: 0
				}, a
			}
			var A, B, l = b.documentElement,
				m = a.setTimeout,
				n = b.getElementsByTagName("script")[0],
				o = {}.toString,
				p = [],
				q = 0,
				r = "MozAppearance" in l.style,
				s = r && !!b.createRange().compareNode,
				t = s ? l : n.parentNode,
				l = a.opera && "[object Opera]" == o.call(a.opera),
				l = !!b.attachEvent && !l,
				u = r ? "object" : l ? "script" : "img",
				v = l ? "script" : u,
				w = Array.isArray || function(a) {
					return "[object Array]" == o.call(a)
				},
				x = [],
				y = {},
				z = {
					timeout: function(a, b) {
						return b.length && (a.timeout = b[0]), a
					}
				};
			B = function(a) {
				function b(a) {
					var e, f, g, a = a.split("!"),
						b = x.length,
						c = a.pop(),
						d = a.length,
						c = {
							url: c,
							origUrl: c,
							prefixes: a
						};
					for (f = 0; d > f; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
					for (f = 0; b > f; f++) c = x[f](c);
					return c
				}

				function g(a, e, f, g, h) {
					var i = b(a),
						j = i.autoCallback;
					i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("index.html").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
						k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
					})))
				}

				function h(a, b) {
					function c(a, c) {
						if (a) {
							if (e(a)) c || (j = function() {
								var a = [].slice.call(arguments);
								k.apply(this, a), l()
							}), g(a, j, b, 0, h);
							else if (Object(a) === a)
								for (n in m = function() {
										var c, b = 0;
										for (c in a) a.hasOwnProperty(c) && b++;
										return b
									}(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
									var a = [].slice.call(arguments);
									k.apply(this, a), l()
								} : j[n] = function(a) {
									return function() {
										var b = [].slice.call(arguments);
										a && a.apply(this, b), l()
									}
								}(k[n])), g(a[n], j, b, n, h))
						} else !c && l()
					}
					var m, n, h = !!a.test,
						i = a.load || a.both,
						j = a.callback || f,
						k = j,
						l = a.complete || f;
					c(h ? a.yep : a.nope, !!i), i && c(i)
				}
				var i, j, l = this.yepnope.loader;
				if (e(a)) g(a, 0, l, 0);
				else if (w(a))
					for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
				else Object(a) === a && h(a, l)
			}, B.addPrefix = function(a, b) {
				z[a] = b
			}, B.addFilter = function(a) {
				x.push(a)
			}, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() {
				b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
			}, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
				var l, o, k = b.createElement("script"),
					e = e || B.errorTimeout;
				k.src = a;
				for (o in d) k.setAttribute(o, d[o]);
				c = j ? h : c || f, k.onreadystatechange = k.onload = function() {
					!l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
				}, m(function() {
					l || (l = 1, c(1))
				}, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
			}, a.yepnope.injectCss = function(a, c, d, e, g, i) {
				var j, e = b.createElement("link"),
					c = i ? h : c || f;
				e.href = a, e.rel = "stylesheet", e.type = "text/css";
				for (j in d) e.setAttribute(j, d[j]);
				g || (n.parentNode.insertBefore(e, n), m(c, 0))
			}
		}(this, document), Modernizr.load = function() {
			yepnope.apply(window, [].slice.call(arguments, 0))
		},
		function($, window, undefined) {
			"use strict";
			var Modernizr = window.Modernizr,
				$body = $("body");
			$.DLMenu = function(options, element) {
				this.$el = $(element), this._init(options)
			}, $.DLMenu.defaults = {
				animationClasses: {
					classin: "mk-vm-animate-in-" + mk_vertical_header_anim,
					classout: "mk-vm-animate-out-" + mk_vertical_header_anim
				},
				onLevelClick: function(el, name) {
					return !1
				},
				onLinkClick: function(el, ev) {
					return !1
				}
			}, $.DLMenu.prototype = {
				_init: function(options) {
					this.options = $.extend(!0, {}, $.DLMenu.defaults, options), this._config();
					var animEndEventNames = {
							WebkitAnimation: "webkitAnimationEnd",
							OAnimation: "oAnimationEnd",
							msAnimation: "MSAnimationEnd",
							animation: "animationend"
						},
						transEndEventNames = {
							WebkitTransition: "webkitTransitionEnd",
							MozTransition: "transitionend",
							OTransition: "oTransitionEnd",
							msTransition: "MSTransitionEnd",
							transition: "transitionend"
						};
					this.animEndEventName = animEndEventNames[Modernizr.prefixed("animation")] + ".dlmenu", this.transEndEventName = transEndEventNames[Modernizr.prefixed("transition")] + ".dlmenu", this.animEndEventNameUnsufixed = animEndEventNames[Modernizr.prefixed("animation")], this.transEndEventNameUnsufixed = transEndEventNames[Modernizr.prefixed("transition")], this.supportAnimations = Modernizr.cssanimations, this.supportTransitions = Modernizr.csstransitions, this._initEvents()
				},
				_config: function() {
					this.open = !1, this.$trigger = this.$el.children(".mk-vm-trigger"), this.$menu = this.$el.children("ul.mk-vm-menu"), this.$menuitems = this.$menu.find("li:not(.mk-vm-back)"), this.$back = this.$menu.find("li.mk-vm-back")
				},
				_initEvents: function() {
					var self = this;
					$(".mk-vm-menuwrapper a").on("transitionend", function(event) {
						event.stopPropagation()
					}), this.$menuitems.on("click.dlmenu", "a", function(event) {
						var $item = $(event.delegateTarget),
							$submenu = $(event.currentTarget).siblings("ul.sub-menu");
						if ($submenu.length > 0) {
							var $flyin = $submenu.clone().css("opacity", 0).insertAfter(self.$menu),
								onAnimationEndFn = function() {
									var $parent = $item.parents(".mk-vm-subviewopen:first");
									self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classout).addClass("mk-vm-subview"), $item.addClass("mk-vm-subviewopen"), $parent.removeClass("mk-vm-subviewopen").addClass("mk-vm-subview"), $flyin.remove();
									var $txt = $item.find(".meni-item-text");
									$txt.css("opacity", .99), setTimeout(function() {
										$txt.css("opacity", 1)
									}, 0)
								};
							return setTimeout(function() {
								$flyin.addClass(self.options.animationClasses.classin), self.$menu.addClass(self.options.animationClasses.classout), self.supportAnimations ? self.$menu.on(self.animEndEventName, onAnimationEndFn) : onAnimationEndFn.call(), self.options.onLevelClick($item, $item.children("a:first").text())
							}), !1
						}
						self.options.onLinkClick($item, event)
					}), this.$back.on("click.dlmenu", function(event) {
						var $this = $(this),
							$submenu = $this.parents("ul.sub-menu:first"),
							$item = $submenu.parent(),
							$flyin = $submenu.clone().insertAfter(self.$menu),
							onAnimationEndFn = function() {
								self.$menu.off(self.animEndEventName).removeClass(self.options.animationClasses.classin), $flyin.remove()
							};
						return setTimeout(function() {
							$flyin.addClass(self.options.animationClasses.classout), self.$menu.addClass(self.options.animationClasses.classin), self.supportAnimations ? self.$menu.on(self.animEndEventName, onAnimationEndFn) : onAnimationEndFn.call(), $item.removeClass("mk-vm-subviewopen");
							var $subview = $this.parents(".mk-vm-subview:first");
							$subview.is("li") && $subview.addClass("mk-vm-subviewopen"), $subview.removeClass("mk-vm-subview")
						}), !1
					})
				},
				closeMenu: function() {
					this.open && this._closeMenu()
				},
				_closeMenu: function() {
					var self = this,
						onTransitionEndFn = function() {
							self.$menu.off(self.transEndEventName), self._resetMenu()
						};
					this.$menu.removeClass("mk-vm-menuopen"), this.$menu.addClass("mk-vm-menu-toggle"), this.$trigger.removeClass("mk-vm-active"), this.supportTransitions ? this.$menu.on(this.transEndEventName, onTransitionEndFn) : onTransitionEndFn.call(), this.open = !1
				},
				openMenu: function() {
					this.open || this._openMenu()
				},
				_openMenu: function() {
					var self = this;
					$body.off("click").on("click.dlmenu", function() {
						self._closeMenu()
					}), this.$menu.addClass("mk-vm-menuopen mk-vm-menu-toggle").on(this.transEndEventName, function() {
						$(this).removeClass("mk-vm-menu-toggle")
					}), this.$trigger.addClass("mk-vm-active"), this.open = !0
				},
				_resetMenu: function() {
					this.$menu.removeClass("mk-vm-subview"), this.$menuitems.removeClass("mk-vm-subview mk-vm-subviewopen")
				}
			};
			var logError = function(message) {
				window.console && window.console.error(message)
			};
			$.fn.dlmenu = function(options) {
				if ("string" == typeof options) {
					var args = Array.prototype.slice.call(arguments, 1);
					this.each(function() {
						var instance = $.data(this, "dlmenu");
						return instance ? $.isFunction(instance[options]) && "_" !== options.charAt(0) ? void instance[options].apply(instance, args) : void logError("no such method '" + options + "' for dlmenu instance") : void logError("cannot call methods on dlmenu prior to initialization; attempted to call method '" + options + "'")
					})
				} else this.each(function() {
					var instance = $.data(this, "dlmenu");
					instance ? instance._init() : instance = $.data(this, "dlmenu", new $.DLMenu(options, this))
				});
				return this
			}
		}(jQuery, window),
		function($) {
			"use strict";
			$(".mk-main-navigation .menu-item-has-children").children("a").attr("aria-haspopup", "true"), $(".animated-column-item").attr("aria-haspopup", "true")
		}(jQuery),
		function($) {
			"use strict";
			var Accordion = function(el) {
				var timeout, that = this,
					$el = $(el),
					initial = $el.data("initialindex");
				this.$el = $el, this.$single = $("." + this.dom.single, $el), this.isExpendable = "toggle-action" === $el.data("style"), this.bindClicks(), $(window).on("load", function() {
					-1 !== initial && that.show(that.$single.eq(initial))
				}), $(window).on("resize", function() {
					clearTimeout(timeout), timeout = setTimeout(that.bindClicks.bind(that), 500)
				})
			};
			Accordion.prototype.dom = {
				single: "mk-accordion-single",
				tab: "mk-accordion-tab",
				pane: "mk-accordion-pane",
				current: "current",
				mobileToggle: "mobile-false",
				mobileBreakPoint: 767
			}, Accordion.prototype.bindClicks = function() {
				if (this.$single.off("click", "." + this.dom.tab), !window.matchMedia("(max-width: " + this.dom.mobileBreakPoint + "px)").matches || !this.$el.hasClass(this.dom.mobileToggle)) {
					this.$single.on("click", "." + this.dom.tab, this.handleEvent.bind(this));
					var $current = $("." + this.dom.current, this.$el);
					"none" === $("." + this.dom.pane, $current).css("display") && this.show($current)
				}
			}, Accordion.prototype.handleEvent = function(e) {
				e.preventDefault(), e.stopPropagation();
				var $single = $(e.delegateTarget);
				$single.hasClass(this.dom.current) ? this.isExpendable && this.hide($single) : this.show($single)
			}, Accordion.prototype.hide = function($single) {
				$single.removeClass(this.dom.current), $("." + this.dom.pane, $single).slideUp()
			}, Accordion.prototype.show = function($single) {
				if (!this.isExpendable) {
					var that = this;
					this.hide($("." + this.dom.current, that.$el))
				}
				$single.addClass(this.dom.current), $("." + this.dom.pane, $single).slideDown()
			}, $(".mk-accordion").each(function() {
				new Accordion(this)
			})
		}(jQuery),
		function($) {
			"use strict";
			if ("undefined" != typeof Raphael) {
				var SkillDiagram = function(el) {
					this.el = el
				};
				SkillDiagram.prototype = {
					init: function() {
						this.cacheElements(), this.createDiagram(), this.$skills.each(this.createSkill.bind(this))
					},
					cacheElements: function() {
						this.$el = $(this.el), this.$skills = this.$el.find(".mk-meter-arch"), this.config = this.$el.data(), this.config.radius = this.config.dimension / 2
					},
					random: function(l, u) {
						return Math.floor(Math.random() * (u - l + 1) + l)
					},
					createDiagram: function() {
						var self = this;
						this.diagram = Raphael(this.el, this.config.dimension, this.config.dimension), this.diagram.setViewBox(0, 0, this.config.dimension, this.config.dimension, !0), this.diagram.setSize("90%", "90%"), this.diagram.circle(this.config.radius, this.config.radius, 80).attr({
							stroke: "none",
							fill: this.config.circleColor
						}), this.title = this.diagram.text(this.config.radius, this.config.radius, this.config.defaultText).attr({
							font: "22px helvetica",
							fill: this.config.defaultTextColor
						}).toFront(), this.diagram.customAttributes.arc = function(value, color, rad) {
							var v = 3.6 * value,
								alpha = 360 == v ? 359.99 : v,
								r = self.random(91, 240),
								a = (r - alpha) * Math.PI / 180,
								b = r * Math.PI / 180,
								sx = self.config.radius + rad * Math.cos(b),
								sy = self.config.radius - rad * Math.sin(b),
								x = self.config.radius + rad * Math.cos(a),
								y = self.config.radius - rad * Math.sin(a),
								path = [
									["M", sx, sy],
									["A", rad, rad, 0, +(alpha > 180), 1, x, y]
								];
							return {
								path: path,
								stroke: color
							}
						}
					},
					createSkill: function(id, el) {
						var self = this,
							$this = $(el),
							config = $this.data(),
							radMin = 72,
							radVal = 27,
							newRad = radMin + radVal * (id + 1),
							$path = this.diagram.path().attr({
								"stroke-width": 28,
								arc: [config.percent, config.color, newRad]
							});
						$path.mouseover(function() {
							self.showSkill(this, config.name, config.percent)
						}).mouseout(function() {
							self.hideSkill(this)
						})
					},
					showSkill: function(self, name, percent) {
						var $this = self,
							time = 250;
						"VML" != Raphael.type && $this.toFront(), $this.animate({
							"stroke-width": 50,
							opacity: .9
						}, 800, "elastic"), this.title.stop().animate({
							opacity: 0
						}, time, ">", function() {
							this.attr({
								text: name + "\n" + percent + "%"
							}).animate({
								opacity: 1
							}, time, "<")
						}).toFront()
					},
					hideSkill: function(self) {
						var $this = self,
							self = this,
							time = 250;
						$this.stop().animate({
							"stroke-width": 28,
							opacity: 1
						}, 4 * time, "elastic"), self.title.stop().animate({
							opacity: 0
						}, time, ">", function() {
							self.title.attr({
								text: self.config.defaultText
							}).animate({
								opacity: 1
							}, time, "<")
						})
					}
				}, $(".mk-skill-diagram").each(function() {
					var diagram = new SkillDiagram(this);
					diagram.init()
				})
			}
		}(jQuery),
		function($) {
			"use strict";

			function tabDelegation() {
				var $this = $(this),
					data = $this.data();
				data.tab && $this.on("click", "a", openInTab)
			}

			function openInTab(e) {
				e.preventDefault();
				var $this = $(this),
					url = $this.attr("href");
				window.open(url, "_blank")
			}
			$('[data-js="tab-delegation"]').each(tabDelegation)
		}(jQuery),
		function($) {
			"use strict";
			var Toggle = function(el) {
				var that = this,
					$el = $(el);
				this.$el = $el, $(window).on("load", function() {
					$el.toggle(that.open.bind(that), that.close.bind(that))
				})
			};
			Toggle.prototype.dom = {
				pane: "mk-toggle-pane",
				active: "active-toggle"
			}, Toggle.prototype.open = function() {
				var $this = this.$el;
				$this.addClass(this.dom.active), $this.siblings("." + this.dom.pane).slideDown(200)
			}, Toggle.prototype.close = function() {
				var $this = this.$el;
				$this.removeClass(this.dom.active), $this.siblings("." + this.dom.pane).slideUp(200)
			};
			var $toggle = $(".mk-toggle-title");
			$toggle.length && $toggle.each(function() {
				new Toggle(this)
			})
		}(jQuery), window.ajaxInit = function() {
			mk_lightbox_init(), mk_click_events(), mk_social_share_global(), mk_gallery(), loop_audio_init()
		}, window.ajaxDelayedInit = function() {
			mk_flexslider_init()
		}, $(document).ready(function() {
			mk_lightbox_init(), mk_login_form(), mk_backgrounds_parallax(), mk_flexslider_init(), mk_event_countdown(), mk_skill_meter(), mk_milestone(), mk_ajax_search(), mk_hover_events(), mk_portfolio_ajax(), mk_love_post(), product_loop_add_cart(), mk_portfolio_widget(), mk_contact_form(), mk_blog_carousel(), mk_header_searchform(), mk_click_events(), mk_text_typer(), mk_tab_slider_func(), $(window).load(function() {
				mk_unfold_footer(), mk_tabs(), mk_accordion_toggles_tooltip(), mk_gallery(), mk_theatre_responsive_calculator(), mk_tabs_responsive(), mk_start_tour_resize(), mk_header_social_resize(), mk_page_section_social_video_bg(), loop_audio_init(), mk_one_page_scroller(), setTimeout(function() {
					mk_mobile_tablet_responsive_calculator()
				}, 300), console.log("ready for rock")
			});
			var onDebouncedResize = function() {
					mk_theatre_responsive_calculator(), mk_mobile_tablet_responsive_calculator(), mk_tabs_responsive(), mk_accordion_toggles_tooltip(), mk_start_tour_resize(), mk_header_social_resize(), setTimeout(function() {
						mk_unfold_footer()
					}, 300)
				},
				debounceResize = null;
			$(window).on("resize", function() {
				null !== debounceResize && clearTimeout(debounceResize), debounceResize = setTimeout(onDebouncedResize, 300)
			});
			var onDebouncedScroll = function() {
					mk_skill_meter(), mk_milestone()
				},
				debounceScroll = null;
			$(window).on("scroll", function() {
				null !== debounceScroll && clearTimeout(debounceScroll), debounceScroll = setTimeout(onDebouncedScroll, 100)
			}), MK.utils.isMobile() && $("body").addClass("no-transform")
		}), videoLoadState(),
		function($) {
			function initialize() {
				var $gmap = $(".gmap_widget");
				$gmap.length && "undefined" != typeof google && $gmap.each(run)
			}

			function run() {
				var $mapHolder = $(this),
					myLatlng = new google.maps.LatLng($mapHolder.data("latitude"), $mapHolder.data("longitude")),
					mapOptions = $mapHolder.data("options");
				mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP, mapOptions.center = myLatlng;
				var map = new google.maps.Map(this, mapOptions);
				new google.maps.Marker({
					position: myLatlng,
					map: map
				})
			}
			$(window).on("load", initialize)
		}(jQuery),
		function($) {
			function run() {
				var options = $(this).data("options");
				options.template = '<a class="featured-image ' + options.tmp_col + '-columns" href="{{link}}" target="_' + options.tmp_target + '"><div class="item-holder"><img src="{{image}}" /><div class="image-hover-overlay"></div></div></a>';
				var feed = new Instafeed(options);
				feed.run()
			}
			$(window).on("load", function() {
				var $feeds = $(".mk-instagram-feeds");
				$feeds.length && $feeds.each(run)
			})
		}(jQuery),
		function($) {
			$(window).on("load", function() {
				setTimeout(function() {
					$(".chrome-flipbox-backface-fix").removeClass("chrome-flipbox-backface-fix")
				}, 300)
			})
		}(jQuery);
	var progressButton = {
		loader: function(form) {
			MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function() {
				var $form = form,
					progressBar = $form.find(".mk-progress-button .mk-progress-inner"),
					buttonText = $form.find(".mk-progress-button .mk-progress-button-content"),
					progressButton = new TimelineLite;
				progressButton.to(progressBar, 0, {
					width: "100%",
					scaleX: 0,
					scaleY: 1
				}).to(buttonText, .3, {
					y: -5
				}).to(progressBar, 1.5, {
					scaleX: 1,
					ease: Power2.easeInOut
				}, "-=.1").to(buttonText, .3, {
					y: 0
				}).to(progressBar, .3, {
					scaleY: 0
				})
			})
		},
		success: function(form) {
			MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function() {
				function hideSuccessMessage() {
					progressButtonSuccess.reverse()
				}
				var $form = form,
					buttonText = $form.find(".mk-button .mk-progress-button-content, .mk-contact-button .mk-progress-button-content"),
					successIcon = $form.find(".mk-progress-button .state-success"),
					progressButtonSuccess = new TimelineLite({
						onComplete: hideSuccessMessage
					});
				progressButtonSuccess.to(buttonText, .3, {
					paddingRight: 20,
					ease: Power2.easeInOut
				}, "+=1").to(successIcon, .3, {
					opacity: 1
				}).to(successIcon, 2, {
					opacity: 1
				})
			})
		},
		error: function(form) {
			MK.core.loadDependencies([MK.core.path.plugins + "tweenmax.js"], function() {
				function hideErrorMessage() {
					progressButtonError.reverse()
				}
				var $form = form,
					buttonText = $form.find(".mk-button .mk-progress-button-content, .mk-contact-button .mk-progress-button-content"),
					errorIcon = $form.find(".mk-progress-button .state-error"),
					progressButtonError = new TimelineLite({
						onComplete: hideErrorMessage
					});
				progressButtonError.to(buttonText, .3, {
					paddingRight: 20
				}, "+=1").to(errorIcon, .3, {
					opacity: 1
				}).to(errorIcon, 2, {
					opacity: 1
				})
			})
		}
	};
	! function($) {
		"use strict";

		function deactivate() {
			$contactBtn.removeClass("is-active"), $backBtn.removeClass("is-active")
		}

		function activate() {
			$contactBtn.addClass("is-active"), $backBtn.addClass("is-active")
		}
		var $wrapper = $(".js-bottom-corner-btns"),
			$contactBtn = $wrapper.find(".js-bottom-corner-btn--contact"),
			$backBtn = $wrapper.find(".js-bottom-corner-btn--back"),
			hasBackBtn = ($contactBtn.length, $backBtn.length);
		hasBackBtn && MK.utils.scrollSpy(400, {
			before: deactivate,
			after: activate
		})
	}(jQuery),
	function($) {
		"use strict";
		$(".mk-fullscreen-nav-close, .mk-fullscreen-nav-wrapper, #fullscreen-navigation a").on("click", function(e) {
			$(".mk-fullscreen-nav").removeClass("opened"), $(".mk-dashboard-trigger").removeClass("fullscreen-active"), $("body").removeClass("fullscreen-nav-opened");
			var anchor = MK.utils.detectAnchor(this),
				$this = $(this);
			anchor.length ? (e.preventDefault(), MK.utils.scrollToAnchor(anchor)) : "#" === $this.attr("href") && e.preventDefault()
		})
	}(jQuery),
	function($) {
		"use strict";
		var $navList = $(".main-navigation-ul"),
			megaMenu = function() {
				$navList.MegaMenu({
					type: "vertical",
					delay: 200
				})
			};
		$(window).on("load", megaMenu)
	}(jQuery),
	function($) {
		"use strict";
		var onePageNavItem = function() {
				var $this = $(this),
					link = $this.find("a"),
					anchor = MK.utils.detectAnchor(link);
				if (anchor.length) {
					$this.removeClass("current-menu-item current-menu-ancestor current-menu-parent");
					var activeNav = function(state) {
						return function() {
							$this[state ? "addClass" : "removeClass"]("current-menu-item"), window.history.replaceState(void 0, void 0, [state ? anchor : " "])
						}
					};
					MK.utils.scrollSpy($(anchor)[0], {
						before: activeNav(!1),
						active: activeNav(!0),
						after: activeNav(!1)
					})
				}
			},
			$navItems = $(".js-main-nav").find("li");
		$(window).on("load", function() {
			setTimeout(function() {
				$navItems.each(onePageNavItem)
			}, 1e3)
		})
	}(jQuery),
	function($) {
		"use strict";

		function toggleResMenu(e) {
			e.preventDefault();
			var $this = $(this),
				$headerInner = $this.parents("header"),
				$resMenu = $headerInner.find(".mk-responsive-wrap"),
				searchBox = $(".responsive-searchform .text-input");
			if ($body.hasClass("mk-opened-nav")) $this.removeClass("is-active"), $body.removeClass("mk-opened-nav").addClass("mk-closed-nav").trigger("mk-closed-nav"), $resMenu.hide(), $post_nav.removeClass("post-nav-backward");
			else {
				$this.addClass("is-active"), $body.removeClass("mk-closed-nav").addClass("mk-opened-nav").trigger("mk-opened-nav"), $resMenu.show(), $post_nav.addClass("post-nav-backward");
				var offset = $headerInner.offset().top,
					headerHeight = MK.val.offsetHeaderHeight(offset);
				MK.utils.scrollTo(offset - headerHeight + 5)
			}
			searchBox.hasClass("input-focused") && searchBox.removeClass("input-focused")
		}
		var $window = $(window),
			$body = $("body"),
			$resMenuWrap = $(".mk-responsive-wrap"),
			$post_nav = $(".mk-post-nav"),
			$toolbar = $(".mk-header-toolbar"),
			$resMenuLink = $(".mk-nav-responsive-link"),
			hasResMenu = $resMenuWrap.length > 0,
			windowHeight = $window.height(),
			screenHeight = screen.height;
		if ($(".mk-toolbar-resposnive-icon").on("click", function(e) {
				e.preventDefault(), console.log("clicked"), $body.hasClass("toolbar-opened") ? ($body.removeClass("toolbar-opened").addClass("toolbar-closed"), $toolbar.hide()) : ($body.removeClass("toolbar-closed").addClass("toolbar-opened"), $toolbar.show())
			}), hasResMenu) {
			$resMenuLink.each(function() {
				$(this).on("click", toggleResMenu)
			});
			var setResMenuHeight = function() {
				var height = $window.height() - MK.val.offsetHeaderHeight(0);
				$resMenuWrap.css("max-height", height)
			};
			setResMenuHeight(), $window.on("resize", setResMenuHeight);
			var isVirtualKeyboard = function() {
					var currentWindowHeight = $window.height(),
						currentScreenHeight = screen.height,
						searchBox = $(".responsive-searchform .text-input"),
						searchBoxIsFocused = !1;
					return searchBox.on("touchstart touchend", function(e) {
						searchBox.addClass("input-focused")
					}), searchBoxIsFocused = searchBox.is(":focus") || searchBox.hasClass("input-focused"), !(!$body.hasClass("mk-opened-nav") || !searchBoxIsFocused || currentScreenHeight != screenHeight || currentWindowHeight == windowHeight)
				},
				hideResMenu = function() {
					MK.utils.isResponsiveMenuState() && (isVirtualKeyboard() || ($body.hasClass("mk-opened-nav") && $resMenuLink.filter(".is-active").trigger("click"), $resMenuWrap.hide()))
				};
			$window.on("resize", hideResMenu), $resMenuWrap.on("click", "a", hideResMenu)
		}
	}(jQuery),
	function($) {
		"use strict";
		var $header = $(".mk-header"),
			hasHeader = $header.length > 0;
		if (hasHeader) {
			$header.attr("data-header-style");
			$(".sidedash-navigation-ul > li").each(function() {
				var $this = $(this);
				$this.children("ul").siblings("a").after('<span class="mk-nav-arrow mk-nav-sub-closed"><svg class="mk-svg-icon" data-name="mk-moon-arrow-down" data-cacheid="2" style=" height:14px; width: 14px; " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 192l-96-96-160 160-160-160-96 96 256 255.999z"></path></svg></span>')
			}), $(".mk-nav-arrow").stop(!0).on("click", function(e) {
				e.preventDefault();
				var $this = $(this);
				$this.hasClass("mk-nav-sub-closed") ? $this.siblings("ul").slideDown(450).end().removeClass("mk-nav-sub-closed").addClass("mk-nav-sub-opened") : $this.siblings("ul").slideUp(450).end().removeClass("mk-nav-sub-opened").addClass("mk-nav-sub-closed")
			}), $(".mk-dashboard-trigger").on("click", function(e) {
				var $this = $(this),
					$body = $("body"),
					$fullscreen_box = $(".mk-fullscreen-nav");
				$this.hasClass("dashboard-style") ? $this.hasClass("dashboard-active") ? ($this.removeClass("dashboard-active"), $body.removeClass("dashboard-opened")) : ($this.addClass("dashboard-active"), $body.addClass("dashboard-opened")) : $this.hasClass("fullscreen-style") && ($this.hasClass("fullscreen-active") ? ($this.removeClass("fullscreen-active"), $body.removeClass("fullscreen-nav-opened"), $fullscreen_box.removeClass("opened")) : ($this.addClass("fullscreen-active"), $body.addClass("fullscreen-nav-opened"), $fullscreen_box.addClass("opened"))), e.preventDefault()
			}), $("html").on("click", function() {
				$("body").removeClass("dashboard-opened"), $(".mk-dashboard-trigger").removeClass("dashboard-active")
			})
		}
	}(jQuery),
	function($) {
		"use strict";
		var $verticalMenu = $("#mk-vm-menu"),
			verticalMenu = function() {
				$verticalMenu.data("vertical-menu") || MK.utils.isResponsiveMenuState() || ($verticalMenu.dlmenu(), $verticalMenu.data("vertical-menu", !0))
			};
		verticalMenu(), $(window).on("resize", verticalMenu)
	}(jQuery),
	function($) {
		"use strict";
		var $lang_item = $(".mk-main-navigation > .main-navigation-ul > .menu-item-language");
		$lang_item.addClass("no-mega-menu").css("visibility", "visible"), $(".mk-main-navigation .menu-item-language > a").addClass("menu-item-link")
	}(jQuery),
	function($) {
		"use strict";

		function isSticky() {
			return !0
		}

		function isColorable() {
			return 4 !== config.headerStyle
		}

		function changeSkin(e, skin) {
			$header.attr("data-transparent-skin", skin);
			var contrast = "light" === skin ? "dark" : "light";
			$header.addClass(skin + "-skin"), $header.removeClass(contrast + "-skin")
		}

		function lazySticky() {
			var elClassHidden = "header--hidden",
				elClassSticky = "a-sticky",
				wScrollCurrent = 0,
				wScrollBefore = 0,
				wScrollDiff = 0,
				wHeight = 0,
				dHeight = 0,
				setSizes = function() {
					dHeight = $document.height(), wHeight = $window.height()
				},
				onScroll = function() {
					wScrollCurrent = MK.val.scroll(), wScrollDiff = wScrollBefore - wScrollCurrent, 0 >= wScrollCurrent ? ($headerHolder.removeClass(elClassHidden), $header.removeClass(elClassSticky)) : wScrollDiff > 0 && $headerHolder.hasClass(elClassHidden) ? ($headerHolder.removeClass(elClassHidden), $header.addClass(elClassSticky)) : 0 > wScrollDiff && (wScrollCurrent + wHeight >= dHeight && $headerHolder.hasClass(elClassHidden) ? ($headerHolder.removeClass(elClassHidden), $header.addClass(elClassSticky)) : ($headerHolder.addClass(elClassHidden), $header.removeClass(elClassSticky))), wScrollBefore = wScrollCurrent
				};
			setSizes(), onScroll(), $window.on("resize", MK.utils.throttle(100, setSizes)), $window.on("scroll", MK.utils.throttle(500, onScroll))
		}

		function fixedSticky() {
			var scrollPos, sticked = !1,
				toggleState = function() {
					if (scrollPos = MK.val.scroll() + MK.val.adminbarHeight(), scrollPos > MK.val.stickyOffset() && !MK.utils.isResponsiveMenuState()) {
						if (sticked) return;
						$header.addClass("a-sticky"), sticked = !0
					} else {
						if (!sticked) return;
						$header.removeClass("a-sticky"), sticked = !1
					}
				};
			toggleState(), $window.on("scroll", MK.utils.throttle(100, toggleState)), $window.on("resize", MK.utils.throttle(100, toggleState))
		}

		function slideSticky() {
			var sticked = !1,
				onScroll = function() {
					if (MK.val.scroll() > MK.val.stickyOffset()) {
						if (sticked) return;
						$header.addClass("pre-sticky"), $paddingWrapper.addClass("enable-padding"), setTimeout(function() {
							$header.addClass("a-sticky")
						}, 1), sticked = !0
					} else {
						if (!sticked) return;
						$header.removeClass("a-sticky"), $header.removeClass("pre-sticky"), $paddingWrapper.removeClass("enable-padding"), sticked = !1
					}
				};
			onScroll(), $window.on("scroll", MK.utils.throttle(100, onScroll))
		}
		var $header = $(".mk-header").first(),
			hasHeader = $header.length > 0;
		if (hasHeader) {
			var $window = $(window),
				$document = $(document),
				$headerHolder = $header.find(".mk-header-holder"),
				$paddingWrapper = $header.find(".mk-header-padding-wrapper"),
				config = $header.data(),
				isStickyLazy = "lazy" === config.stickyStyle,
				isStickyFixed = "fixed" === config.stickyStyle,
				isStickySlide = "slide" === config.stickyStyle;
			isColorable() && MK.utils.eventManager.subscribe("firstElSkinChange", changeSkin), isSticky() && isStickyLazy ? 2 !== config.headerStyle && lazySticky() : isSticky() && isStickyFixed ? fixedSticky() : isSticky() && isStickySlide && slideSticky()
		}
	}(jQuery),
	function($) {
		"use strict";

		function normalizeClick() {
			$(this).on("click", handleClick)
		}

		function handleClick(e) {
			var $this = $(e.currentTarget),
				$child = $this.find("> ul"),
				isVisible = "none" !== $child.css("display");
			isVisible || (e.preventDefault(), e.stopPropagation())
		}
		var hasTouchscreen = "ontouchstart" in document.documentElement;
		hasTouchscreen && $(".mk-main-navigation .menu-item-has-children").each(normalizeClick)
	}(jQuery),
	function($) {
		"use strict";
		MK.ui.preloader = {
			dom: {
				overlay: ".mk-body-loader-overlay"
			},
			hide: function() {
				$(this.dom.overlay).fadeOut(600, "easeInOutExpo", function() {
					$("body").removeClass("loading")
				})
			}
		}
	}(jQuery),
	function($) {
		"use strict";
		var _ajaxUrl = MK.core.path.ajaxUrl,
			_instances = {};
		MK.utils.ajaxLoader = function(el) {
			var id = "#" + $(el).attr("id");
			return "undefined" != typeof _instances[id] ? _instances[id] : (this.id = id, this.el = el, this.isLoading = !1, void(this.xhrCounter = 0))
		}, MK.utils.ajaxLoader.prototype = {
			init: function() {
				this.initialized || (this.createInstance(), this.cacheElements(), this.initialized = !0)
			},
			cacheElements: function() {
				this.$container = $(this.el), this.id = "#" + this.$container.attr("id"), this.categories = this.$container.data("loop-categories"), this.data = {}, this.data.action = "mk_load_more", this.data.query = this.$container.data("query"), this.data.atts = this.$container.data("loop-atts"), this.data.loop_iterator = this.$container.data("loop-iterator"), this.data.author = this.$container.data("loop-author"), this.data.posts = this.$container.data("loop-posts"), this.data.safe_load_more = this.$container.siblings("#safe_load_more").val(), this.data._wp_http_referer = this.$container.siblings('input[name="_wp_http_referer"]').val(), this.data.paged = 1, this.data.maxPages = this.$container.data("max-pages"), this.data.term = this.categories
			},
			createInstance: function() {
				_instances[this.id] = this
			},
			load: function(unique) {
				var self = this,
					seq = ++this.xhrCounter;
				return this.isLoading = !0, $.when($.ajax({
					url: _ajaxUrl,
					type: "POST",
					data: self.data
				})).done(function(response) {
					self.onDone(response, unique, seq)
				})
			},
			onDone: function(response, unique, seq) {
				if (seq === this.xhrCounter) {
					var self = this;
					response = $.parseJSON(response), response.unique = unique, response.id = this.id, this.setData({
						maxPages: response.maxPages,
						loop_iterator: response.i
					}), $(response.content).mk_imagesLoaded().then(function() {
						MK.utils.eventManager.publish("ajaxLoaded", response), self.isLoading = !1, self.initNewComponents()
					})
				} else console.log("XHR request nr " + seq + " aborted")
			},
			setData: function(atts) {
				for (var att in atts) "term" === att && "*" === atts[att] ? this.data.term = "" : this.data[att] = atts[att]
			},
			getData: function(att) {
				return this.data[att]
			},
			initNewComponents: function() {
				window.ajaxInit(), setTimeout(window.ajaxDelayedInit, 1e3), MK.core.initAll(this.el)
			}
		}
	}(jQuery),
	function($) {
		"use strict";

		function run() {
			$layers.each(applyBg)
		}

		function applyBg() {
			var $this = $(this),
				imgs = $this.data("mk-img-set");
			$this.css("background-image", "url(" + getImage(imgs) + ")")
		}

		function handleResize() {
			updateScreenSize(), hasSwitched() && (updateDevice(), run())
		}

		function getScreenSize() {
			return {
				w: $win.width(),
				h: $win.height()
			}
		}

		function getDevice() {
			return screen.w > 1024 ? {
				"class": "desktop",
				id: 2
			} : screen.w > 736 ? {
				"class": "tablet",
				id: 1
			} : {
				"class": "mobile",
				id: 0
			}
		}

		function getOrientation() {
			return screen.w > screen.h ? "landscape" : "portrait"
		}

		function getImage(imgs) {
			var hasOrientation = !!imgs[orientation],
				imgOriented = imgs[hasOrientation ? orientation : Object.keys(imgs)[0]],
				imgExact = imgOriented[device["class"]] ? imgOriented[device["class"]] : imgOriented.external ? imgOriented.external : "";
			return imgExact
		}

		function updateScreenSize() {
			screen = getScreenSize()
		}

		function updateDevice() {
			lastOrientation !== orientation && (orientation = lastOrientation), lastDevice.id > device.id && (device = lastDevice)
		}

		function hasSwitched() {
			return lastOrientation = getOrientation(), lastDevice = getDevice(), lastOrientation !== orientation || lastDevice["class"] !== device["class"]
		}
		var $win = $(window),
			$layers = $("[data-mk-img-set]"),
			screen = getScreenSize(),
			orientation = getOrientation(),
			device = getDevice(),
			lastOrientation = orientation,
			lastDevice = device;
		run(), $win.on("resize", MK.utils.throttle(500, handleResize))
	}(jQuery),
	function($) {
		"use strict";
		var val = MK.val;
		MK.component.FullHeight = function(el) {
			var $window = $(window),
				$this = $(el),
				config = $this.data("fullheight-config"),
				container = document.getElementById("mk-theme-container"),
				minH = config && config.min ? config.min : 0,
				winH = null,
				height = null,
				update_count = 0,
				testing = MK.utils.getUrlParameter("testing"),
				offset = null;
			"IE" === MK.utils.browser.name && $this.css("height", "1px");
			var update = function() {
					0 === update_count && (winH = $window.height(), offset = $this.offset().top - 1, height = Math.max(minH, winH - val.offsetHeaderHeight(offset)), $this.css("min-height", height), void 0 !== testing && update_count++)
				},
				init = function() {
					update(), $window.on("resize", update), $window.on("scroll", update), window.addResizeListener(container, update)
				};
			return {
				init: init
			}
		}
	}(jQuery),
	function($) {
		"use strict";
		var utils = (MK.core, MK.utils);
		MK.core.path;
		MK.ui.FullScreenGallery = function(element, settings) {
			this.element = element, this.config = settings, this.isFullScreen = !1
		}, MK.ui.FullScreenGallery.prototype = {
			dom: {
				fullScrBtn: ".slick-full-screen",
				exitFullScrBtn: ".slick-minimize",
				playBtn: ".slick-play",
				pauseBtn: ".slick-pause",
				shareBtn: ".slick-share",
				socialShare: ".slick-social-share",
				wrapper: ".slick-slider-wrapper",
				slider: ".slick-slides",
				slides: ".slick-slide",
				dots: ".slick-dot",
				active: ".slick-active",
				hiddenClass: "is-hidden",
				dataId: "slick-index"
			},
			tpl: {
				dot: '<div class="slick-dot"></div>',
				next: '<a href="javascript:;" class="slick-next"> <svg width="33px" height="65px"> <polyline fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points=" 0.5,0.5 32.5,32.5 0.5,64.5"/> </svg> </a>',
				prev: '<a href="javascript:;" class="slick-prev"> <svg  width="33px" height="65px"> <polyline fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points=" 32.5,64.5 0.5,32.5 32.5,0.5"/> </svg> </a>'
			},
			init: function() {
				var self = this;
				self.cacheElements(), self.getViewportSizes(), self.updateSizes("window"), self.create(), self.updateCacheElements(), self.createPagination(), self.bindEvents()
			},
			create: function() {
				var self = this;
				this.slick = this.$gallery.slick({
					dots: !0,
					arrows: !0,
					infinite: !0,
					speed: 300,
					slidesToShow: 1,
					centerMode: !0,
					centerPadding: "0px",
					variableWidth: !0,
					autoplay: !1,
					autoplaySpeed: 3e3,
					useTransform: !0,
					prevArrow: self.tpl.prev,
					nextArrow: self.tpl.next,
					customPaging: function(slider, i) {
						return self.tpl.dot
					}
				})
			},
			cacheElements: function() {
				this.$window = $(window), this.$gallery = $(this.element), this.$fullScrBtn = $(this.dom.fullScrBtn), this.$exitFullScrBtn = $(this.dom.exitFullScrBtn), this.$playBtn = $(this.dom.playBtn), this.$pauseBtn = $(this.dom.pauseBtn), this.$shareBtn = $(this.dom.shareBtn), this.$socialShare = $(this.dom.socialShare), this.$wrapper = $(this.dom.wrapper), this.$slider = $(this.dom.slider), this.$slides = $(this.dom.slides), this.$imgs = this.$slides.find("img"), this.$originalImgs = this.$imgs
			},
			updateCacheElements: function() {
				this.$slides = $(this.dom.slides), this.$imgs = this.$slides.find("img"), this.$dots = $(this.dom.dots)
			},
			bindEvents: function() {
				var self = this;
				this.$fullScrBtn.on("click", this.toFullScreen.bind(this)), this.$exitFullScrBtn.on("click", this.exitFullScreen.bind(this)), this.$playBtn.on("click", this.play.bind(this)), this.$pauseBtn.on("click", this.pause.bind(this)), this.$shareBtn.on("click", this.toggleShare.bind(this)), this.$socialShare.on("click", "a", this.socialShare.bind(this)), this.$window.on("resize", this.onResize.bind(this)), this.$window.on("keydown", function(e) {
					39 === e.keyCode && self.$gallery.slick("slickNext"), 37 === e.keyCode && self.$gallery.slick("slickPrev")
				}), $(document).on("fullscreenchange mozfullscreenchange webkitfullscreenchange msfullcreenchange", this.exitFullScreen.bind(this))
			},
			getViewportSizes: function() {
				this.screen = {
					w: screen.width,
					h: screen.height
				}, this.window = {
					w: this.$window.width(),
					h: this.$window.height()
				}
			},
			updateSizes: function(viewport) {
				this.$wrapper.width(this[viewport].w), this.$wrapper.height("100%"), this.$imgs.height("100%")
			},
			createPagination: function() {
				var self = this;
				this.$dots.each(function(i) {
					var img = self.$originalImgs.eq(i).attr("src");
					$(this).css({
						"background-image": "url(" + img + ")"
					})
				})
			},
			play: function(e) {
				e.preventDefault(), this.$playBtn.addClass(this.dom.hiddenClass), this.$pauseBtn.removeClass(this.dom.hiddenClass), $(this.element).slick("slickPlay")
			},
			pause: function(e) {
				e.preventDefault(), this.$pauseBtn.addClass(this.dom.hiddenClass), this.$playBtn.removeClass(this.dom.hiddenClass), $(this.element).slick("slickPause")
			},
			toggleShare: function(e) {
				e.preventDefault(), this.$socialShare.toggleClass(this.dom.hiddenClass)
			},
			getCurentId: function() {
				return this.$slides.filter(this.dom.active).data(this.dom.dataId)
			},
			toFullScreen: function() {
				var self = this;
				this.$fullScrBtn.addClass(this.dom.hiddenClass), this.$exitFullScrBtn.removeClass(this.dom.hiddenClass), this.$slider.hide().fadeIn(500), utils.launchIntoFullscreen(document.documentElement), this.updateSizes("screen"), $(this.element).slick("slickGoTo", this.getCurentId(), !0), setTimeout(function() {
					self.isFullScreen = !0
				}, 1e3)
			},
			exitFullScreen: function() {
				this.isFullScreen && (this.$exitFullScrBtn.addClass(this.dom.hiddenClass), this.$fullScrBtn.removeClass(this.dom.hiddenClass), utils.exitFullscreen(), this.updateSizes("window"), $(this.element).slick("slickGoTo", this.getCurentId(), !0), this.isFullScreen = !1)
			},
			onResize: function() {
				this.getViewportSizes(), this.updateSizes(this.isFullScreen ? "screen" : "window"), $(this.element).slick("slickGoTo", this.getCurentId(), !0)
			},
			socialShare: function(e) {
				e.preventDefault();
				var name, $this = $(e.currentTarget),
					network = $this.data("network"),
					id = this.config.id,
					url = this.config.url;
				switch (network) {
					case "facebook":
						url = "https://www.facebook.com/sharer/sharer.php?u=" + url + "#id=" + id, name = "Facebook Share";
						break;
					case "twitter":
						url = "http://twitter.com/intent/tweet?text=" + url + "#id=" + id, name = "Twitter Share";
						break;
					case "pinterest":
						url = "http://pinterest.com/pin/create/button/?url=" + url + "#id=" + id, name = "Pinterest Share"
				}
				window.open(url, name, "height=380 ,width=660, resizable=0, toolbar=0, menubar=0, status=0, location=0, scrollbars=0")
			}
		}
	}(jQuery),
	function($) {
		"use strict";
		MK.component.Grid = function(el) {
			var $container = $(el),
				config = $container.data("grid-config"),
				isSlideshow = $container.closest('[data-mk-component="SwipeSlideshow"]').length,
				miniGridConfig = {
					container: el,
					item: config.item + ":not(.is-hidden)",
					gutter: 0
				},
				init = function() {
					isSlideshow || MK.core.loadDependencies([MK.core.path.plugins + "minigrid.js"], create)
				},
				prepareForGrid = function() {
					var $item = $(this),
						isHidden = "none" === $item.css("display");
					isHidden ? $item.addClass("is-hidden") : $item.removeClass("is-hidden")
				},
				create = function() {
					function draw() {
						$container.find(config.item).each(prepareForGrid), minigrid(miniGridConfig)
					}

					function redraw() {
						timer && clearTimeout(timer), timer = setTimeout(draw, 100)
					}
					var timer = null;
					draw(), $(window).off("resize", redraw), $(window).on("resize", redraw), MK.utils.eventManager.subscribe("item-expanded", redraw), MK.utils.eventManager.subscribe("ajaxLoaded", redraw), MK.utils.eventManager.subscribe("staticFilter", redraw)
				};
			return {
				init: init
			}
		}
	}(jQuery),
	function($) {
		"use strict";

		function createAll(scope) {
			for (var i = 0, l = families.length; l > i; i++) {
				var family = families[i][0],
					prefix = families[i][1],
					$icons = getIcons(family, prefix, scope);
				$icons.length && (_roundCount++, setTimeout(createIcons, 0, $icons, family, prefix))
			}
		}

		function getIcons(family, prefix, scope) {
			var $scope = $(scope),
				$icons = $scope.find("[class*=" + prefix + "]"),
				extraClassNames = extend[family];
			return extraClassNames ? (extraClassNames.forEach(function(className) {
				var $icon = $scope.find(className);
				$icons = $icons.add($icon)
			}), $icons) : $icons
		}

		function createIcons($icons, family, prefix, i, unicode) {
			var id = i || 0,
				icon = $icons[id];
			if (!icon) return _roundCount--, void getIconsSprite(insertIcons, $icons, _roundCount, _config);
			var css = getComputedStyle(icon, ":before"),
				classAttr = icon.getAttribute("class"),
				name = classAttr ? matchClass(classAttr.split(" "), prefix) : !1,
				h = getComputedStyle(icon).fontSize,
				config = createConfig(css, name, family, unicode, h),
				cache = JSON.stringify(config);
			config && (_cache[cache] ? "undefined" == typeof _iconMap[cache] ? _iconMap[cache] = [$icons.eq(id)] : _iconMap[cache].push($icons.eq(id)) : ("undefined" == typeof _iconMap[cache] ? _iconMap[cache] = [$icons.eq(id)] : _iconMap[cache].push($icons.eq(id)), _cache[cache] = _cacheId.toString(), config.id = _cacheId, _config.push(config), _cacheId++)), createIcons($icons, family, prefix, ++id)
		}

		function insertIcons(sprite, $icons) {
			var $sprite = $(sprite),
				idMap = ($sprite.find("svg"), invert(_cache));
			$sprite.each(function() {
				var $svg = $(this),
					id = $svg.attr("data-cacheid"),
					configKey = idMap[id];
				_cache[configKey] = this
			}), Object.keys(_iconMap).forEach(function(cacheKey) {
				_iconMap[cacheKey].forEach(function($icons) {
					$icons.each(function() {
						function remove() {
							$icon.parents(".pricing-features") || $icon.not(".mk-jupiter-icon-xing").not(".mk-jupiter-icon-square-xing").not(".mk-jupiter-icon-simple-xing").find(".mk-svg-icon").not('[data-name="mk-moon-zoom-in"]').remove()
						}
						var $svg = $(_cache[cacheKey]).clone(),
							$icon = $(this);
						$svg.length && remove(), $icon.find("svg").length || ($icon.parents(".widget ul").length ? $icon.prepend($svg) : $icon.append($svg))
					})
				})
			}), MK.utils.eventManager.publish("iconsInsert")
		}

		function createConfig(css, name, family, unicode, height) {
			var hasGradient = checkGradient(css),
				hasDirection = extractGradient("direction", css.background),
				config = {
					family: family,
					unicode: unicode ? unicode : decodeUnicode(css.content),
					name: name,
					gradient_type: hasGradient ? extractGradient("type", css.background) : !1,
					gradient_start: hasGradient ? extractGradient("start", css.background) : !1,
					gradient_stop: hasGradient ? extractGradient("stop", css.background) : !1,
					gradient_direction: hasDirection ? extractGradient("direction", css.background).replace(" ", "-") : !1,
					height: height
				};
			return config.name || config.unicode ? config : !1
		}

		function matchClass(classes, prefix) {
			for (var i = 0, l = classes.length; l > i; i++)
				if (-1 !== classes[i].indexOf(prefix)) return classes[i]
		}

		function checkGradient(css) {
			var bg = css.background;
			return -1 !== bg.indexOf("radial") || -1 !== bg.indexOf("linear") ? bg : !1
		}

		function extractGradient(attr, grad) {
			if (!grad) return !1;
			var f, t, isRadial = -1 !== grad.indexOf("radial"),
				isLinear = -1 !== grad.indexOf("linear"),
				hasDirection = -1 !== grad.indexOf("(to");
			if ("type" === attr) {
				if (isRadial) return "radial";
				if (isLinear) return "linear"
			} else if ("start" === attr) f = getStrPosition(grad, "rgb(", 1), t = getStrPosition(grad, "0%", 1);
			else if ("stop" === attr) f = getStrPosition(grad, "rgb(", 2), t = getStrPosition(grad, "100%", 1);
			else {
				if ("direction" !== attr) return !1;
				if (!hasDirection) return !1;
				f = getStrPosition(grad, "(to", 1) + 4, t = getStrPosition(grad, ", rgb(", 1)
			}
			return grad.slice(f, t)
		}

		function getStrPosition(str, m, i) {
			return str.split(m, i).join(m).length
		}

		function decodeUnicode(content) {
			return content && "none" !== content ? escape(content).replace(/%22/g, "").replace("%u", "").toLowerCase() : !1
		}

		function invert(obj) {
			var new_obj = {};
			for (var prop in obj) obj.hasOwnProperty(prop) && (new_obj[obj[prop]] = prop);
			return new_obj
		}
		var families = [
				["awesome-icons", "mk-icon"],
				["icomoon", "mk-moon"],
				["pe-line-icons", "mk-li"],
				["theme-icons", "mk-jupiter-icon"]
			],
			extend = {
				"awesome-icons": [".mk-accordion-tab", ".mk-toggle-title", ".mk-blockquote.quote-style", "blockquote", ".mk-main-navigation ul", ".sf-sub-indicator", ".widget_archive li a", ".widget_categories li a", ".widget_nav_menu li a", ".widget_links li a", ".widget_pages li a", ".widget_meta li a", ".widget_authors li a", ".widget_popular_tags li a", ".widget_recent_comments li", ".widget_rss li a", ".widget_recent_entries li a", ".tw_list .tweet_list li a", "#wp-calendar #prev", "#wp-calendar #next", ".mk-jupiter-icon-simple-xing", ".widget_product_categories li a", ".widget-sub-navigation li a", ".main-navigation-ul li.with-menu > a", ".blog-blockquote-content", ".ls-nav-prev", ".ls-nav-next"],
				icomoon: [".mk-woocommerce-pagination .next", ".mk-woocommerce-pagination .prev", ".product-loading-icon", ".mk-jupiter-icon-xing", ".mk-jupiter-icon-square-xing"],
				"pe-line-icons": [],
				"theme-icons": []
			},
			_cache = {},
			_cacheId = 0,
			_config = [],
			_roundCount = 0,
			_iconMap = {},
			getIconsSprite = function() {
				function run(callback) {
					var config = encodeURIComponent(JSON.stringify(_config));
					$.ajax({
						url: MK.core.path.ajaxUrl,
						method: "POST",
						data: {
							action: "mk_get_icon",
							iterator: iterator++,
							config: config
						},
						success: function(sprite) {
							callback(sprite, $icons), _config = [], _iconMap = {}, $icons = null
						},
						error: function(err) {
							console.log("Icon load problem")
						}
					})
				}
				var $icons = null,
					iterator = 0;
				return function(callback, $els, count) {
					$icons ? $icons.add($els) : $icons = $els, count || run(callback)
				}
			}();
		$(window).on("load", function() {
			setTimeout(function() {
				createAll(document), $(".mk-header").length && createAll(".mk-header"), $(".js-flexslider, .mk-flexslider").length && createAll(".js-flexslider, .mk-flexslider"), $(".mk-accordion").length && createAll(".mk-accordion")
			}, 1e3)
		}), MK.utils.eventManager.subscribe("ajaxLoaded", function() {
			setTimeout(createAll, 100, ".js-loop")
		}), MK.utils.eventManager.subscribe("ajax-preview", function() {
			setTimeout(createAll, 100, ".ajax-container")
		}), MK.utils.eventManager.subscribe("photoAlbum-open", function() {
			setTimeout(createAll, 100, ".gallery-share")
		}), MK.utils.eventManager.subscribe("quickViewOpen", function() {
			setTimeout(createAll, 300, ".mk-modal-content")
		})
	}(jQuery),
	function($, window) {
		"use strict";

		function pagination() {
			function init() {
				MK.utils.eventManager.subscribe("ajaxLoaded", onLoad), bindHandlers(), isInfiniteScroll && (scrollCheckPoint = spyScrollCheckPoint())
			}

			function bindHandlers() {
				isLoadBtn && $loadBtn.on("click", handleClick), isInfiniteScroll && $window.on("scroll", handleScroll), isHandlerBinded = !0
			}

			function unbindHandlers() {
				isLoadBtn && $loadBtn.off("click", handleClick), isInfiniteScroll && $window.off("scroll", handleScroll), isHandlerBinded = !1
			}

			function handleClick(e) {
				e.preventDefault(), ajaxLoader.isLoading || loadMore()
			}

			function handleScroll() {
				scrollY() > scrollCheckPoint() && !ajaxLoader.isLoading && loadMore()
			}

			function loadMore() {
				loadingIndicatorStart();
				var page = ajaxLoader.getData("paged");
				ajaxLoader.setData({
					paged: ++page
				}), ajaxLoader.load(unique)
			}

			function onLoad(e, response) {
				response.id === id && (ajaxLoader.getData("paged") >= ajaxLoader.getData("maxPages") ? loadingIndicatorHide() : loadingIndicatorShow(), response.unique === unique && $container.append(response.content), loadingIndicatorStop())
			}

			function loadingIndicatorStart() {
				isLoadBtn ? $loadBtn.addClass("is-active") : isInfiniteScroll && MK.ui.loader.add(".js-load-more-scroll")
			}

			function loadingIndicatorStop() {
				isLoadBtn ? $loadBtn.removeClass("is-active") : isInfiniteScroll && MK.ui.loader.remove(".js-load-more-scroll")
			}

			function loadingIndicatorShow() {
				isHandlerBinded || (isLoadBtn ? $loadBtn.show() : isInfiniteScroll && $loadScroll.show(), bindHandlers())
			}

			function loadingIndicatorHide() {
				isHandlerBinded && (isLoadBtn ? $loadBtn.hide() : isInfiniteScroll && $loadScroll.hide(), unbindHandlers())
			}

			function spyScrollCheckPoint() {
				var containerO = 0,
					containerH = dynamicHeight($superContainer),
					winH = dynamicHeight(window),
					setVals = function() {
						containerO = $superContainer.offset().top
					};
				return setVals(), $window.on("resize", function() {
						requestAnimationFrame(setVals)
					}),
					function() {
						return containerH() + containerO - 2 * winH()
					}
			}
			var unique = Date.now(),
				$container = $(this),
				$superContainer = $container.parent(),
				$loadBtn = $container.siblings(".js-loadmore-holder").find(".js-loadmore-button"),
				$loadScroll = $(".js-load-more-scroll"),
				style = $container.data("pagination-style"),
				id = ($container.data("max-pages"), "#" + $container.attr("id")),
				ajaxLoader = new MK.utils.ajaxLoader(id),
				isLoadBtn = 2 === style,
				isInfiniteScroll = 3 === style,
				scrollCheckPoint = null,
				isHandlerBinded = !1;
			ajaxLoader.init(), init()
		}
		var scrollY = MK.val.scroll,
			dynamicHeight = MK.val.dynamicHeight,
			$window = $(window),
			$containers = $(".js-loop");
		$containers.each(pagination)
	}(jQuery, window),
	function($) {
		"use strict";

		function isHidden(el) {
			return null === el.offsetParent
		}
		MK.component.Masonry = function(el) {
			var $window = $(window),
				$container = $(el),
				config = $container.data("masonry-config"),
				$masonryItems = $container.find(config.item),
				cols = config.cols || 8,
				wall = null,
				init = function() {
					MK.core.loadDependencies([MK.core.path.plugins + "freewall.js"], onDepLoad)
				},
				onDepLoad = function() {
					masonry(), $window.on("resize", onResize), MK.utils.eventManager.subscribe("ajaxLoaded", onPostAddition), MK.utils.eventManager.subscribe("staticFilter", resize)
				},
				masonry = function() {
					if (!isHidden(el)) {
						var newCols;
						newCols = window.matchMedia("(max-width:600px)").matches ? 2 : window.matchMedia("(max-width:850px)").matches ? 4 : cols;
						var colW = $container.width() / newCols;
						wall = new Freewall(config.container), wall.reset({
							selector: config.item + ":not(.is-hidden)",
							gutterX: 0,
							gutterY: 0,
							cellW: colW,
							cellH: colW
						}), wall.fillHoles(), wall.fitWidth(), $masonryItems.each(function() {
							$(this).data("loaded", !0)
						})
					}
				},
				destroyContainer = function() {
					$container.removeAttr("style").removeData("wall-height").removeData("wall-width").removeData("min-width").removeData("total-col").removeData("total-row").removeAttr("data-wall-height").removeAttr("data-wall-width").removeAttr("data-min-width").removeAttr("data-total-col").removeAttr("data-total-row")
				},
				destroyItem = function() {
					var $item = $(this);
					$item.removeAttr("style").removeData("delay").removeData("height").removeData("width").removeData("state").removeAttr("data-delay").removeAttr("data-height").removeAttr("data-width").removeAttr("data-state")
				},
				destroyAll = function() {
					wall && (wall.destroy(), destroyContainer(), $masonryItems.each(destroyItem))
				},
				onResize = function() {
					requestAnimationFrame(resize)
				},
				resize = function() {
					destroyAll(), masonry()
				},
				onPostAddition = function() {
					$masonryItems = $container.find(config.item), $masonryItems.each(function() {
						var $item = $(this),
							isLoaded = $item.data("loaded");
						isLoaded || $item.css("visibility", "hidden")
					}), $container.mk_imagesLoaded().then(function() {
						destroyAll(), masonry()
					})
				};
			return {
				init: init
			}
		}
	}(jQuery),
	function($) {
		"use strict";
		MK.component.Pagination = function(el) {
			this.el = el
		}, MK.component.Pagination.prototype = {
			init: function() {
				this.cacheElements(), this.bindEvents()
			},
			cacheElements: function() {
				this.lastId = 1, this.unique = Date.now(), this.$pagination = $(this.el), this.$container = this.$pagination.prev(".js-loop"), this.$pageLinks = this.$pagination.find(".js-pagination-page"), this.$nextLink = this.$pagination.find(".js-pagination-next"), this.$prevLink = this.$pagination.find(".js-pagination-prev"), this.$current = this.$pagination.find(".js-current-page"), this.$maxPages = this.$pagination.find(".pagination-max-pages"), this.containerId = "#" + this.$container.attr("id"), this.ajaxLoader = new MK.utils.ajaxLoader("#" + this.$container.attr("id")), this.ajaxLoader.init()
			},
			bindEvents: function() {
				this.$pageLinks.on("click", this.pageClick.bind(this)), this.$nextLink.on("click", this.nextClick.bind(this)), this.$prevLink.on("click", this.prevClick.bind(this)), MK.utils.eventManager.subscribe("ajaxLoaded", this.onLoad.bind(this))
			},
			pageClick: function(e) {
				e.preventDefault();
				var $this = $(e.currentTarget),
					id = parseFloat($this.attr("data-page-id"));
				id > this.ajaxLoader.getData("maxPages") || 1 > id || this.load(id, $this)
			},
			nextClick: function(e) {
				e.preventDefault(), this.ajaxLoader.getData("paged") !== this.ajaxLoader.getData("maxPages") && this.load(++this.lastId, $(e.currentTarget))
			},
			prevClick: function(e) {
				e.preventDefault(), 1 !== this.ajaxLoader.getData("paged") && this.load(--this.lastId, $(e.currentTarget))
			},
			load: function(id, $el) {
				this.lastId = id, this.ajaxLoader.setData({
					paged: id
				}), this.ajaxLoader.load(this.unique), this.removeIndicator(), MK.ui.loader.add($el)
			},
			onLoad: function(e, response) {
				response.id === this.containerId && (this.updatePagination(), this.lastId = this.ajaxLoader.getData("paged"), response.unique === this.unique && (this.removeIndicator(), this.scrollPage(), this.$container.html(response.content)))
			},
			updatePagination: function() {
				var self = this,
					isFirst = 1 === this.ajaxLoader.getData("paged"),
					isLast = this.ajaxLoader.getData("paged") === this.ajaxLoader.getData("maxPages");
				isFirst ? this.$prevLink.addClass("is-vis-hidden") : this.$prevLink.removeClass("is-vis-hidden"), isLast ? this.$nextLink.addClass("is-vis-hidden") : this.$nextLink.removeClass("is-vis-hidden"), this.$current.html(this.ajaxLoader.getData("paged")), this.$maxPages.html(this.ajaxLoader.getData("maxPages"));
				var displayItems = 10,
					centerAt = displayItems / 2;
				this.ajaxLoader.getData("maxPages") > displayItems ? this.$pageLinks.each(function(i) {
					var id = self.lastId - centerAt;
					id = Math.max(id, 1), id = Math.min(id, self.ajaxLoader.getData("maxPages") - displayItems + 1), id += i, $(this).html(id).attr("data-page-id", id).show(), 0 === i && id > 1 && $(this).html("..."), i === displayItems - 1 && id < self.ajaxLoader.getData("maxPages") && $(this).html("...")
				}) : this.$pageLinks.each(function(i) {
					var $link = $(this),
						id = i + 1;
					$link.html(id).attr("data-page-id", id), 1 === self.ajaxLoader.getData("maxPages") ? self.$pageLinks.hide() : i > self.ajaxLoader.getData("maxPages") - 1 ? $link.hide() : $link.show()
				}), this.$pageLinks.filter('[data-page-id="' + this.ajaxLoader.getData("paged") + '"]').addClass("current-page").siblings().removeClass("current-page")
			},
			scrollPage: function() {
				var containerOffset = this.$container.offset().top,
					offset = containerOffset - MK.val.offsetHeaderHeight(containerOffset) - 20;
				MK.utils.scrollTo(offset)
			},
			removeIndicator: function() {
				MK.ui.loader.remove(".js-pagination-page, .js-pagination-next, .js-pagination-prev")
			}
		}
	}(jQuery),
	function($) {
		"use strict";
		var val = MK.val;
		MK.utils;
		MK.component.Parallax = function(el) {
			var $this = $(el),
				obj = $this[0],
				$window = $(window),
				container = document.getElementById("mk-theme-container"),
				config = $this.data("parallax-config"),
				headerHeight = ($(config.holder), null),
				offset = null,
				elHeight = null,
				ticking = !1,
				isMobile = null,
				clientRect = null,
				update = function() {
					return obj.style.transform = null, obj.style.top = null, obj.style.bottom = null, (isMobile = MK.utils.isMobile()) ? void $this.css("height", "") : (clientRect = $this[0].getBoundingClientRect(), offset = clientRect.top, elHeight = clientRect.height, headerHeight = val.offsetHeaderHeight(offset), offset = offset - headerHeight + val.scroll(), setPosition(), void setSize())
				},
				h = 0,
				winH = 0,
				proportion = 0,
				height = 0,
				setSize = function() {
					if ($this.css("height", ""), winH = $window.height() - headerHeight, h = obj.getBoundingClientRect().height, config.speed <= 1 && config.speed > 0) 0 === offset ? $this.css({
						backgroundAttachment: "scroll",
						"will-change": "transform"
					}) : $this.css({
						height: h + (winH - h) * config.speed,
						backgroundAttachment: "scroll",
						"will-change": "transform"
					});
					else if (config.speed > 1 && winH >= h) $this.css({
						height: winH + 2 * (winH * config.speed - winH),
						top: -(winH * config.speed - winH),
						backgroundAttachment: "scroll",
						"will-change": "transform"
					});
					else if (config.speed > 1 && h > winH) proportion = h / winH, height = winH + (winH * config.speed - winH) * (1 + proportion), $this.css({
						height: height,
						top: -(height - winH * config.speed),
						backgroundAttachment: "scroll",
						"will-change": "transform"
					});
					else if (config.speed < 0 && h >= winH) height = h * (1 - config.speed), $this.css({
						height: height + (height - h),
						top: h - height,
						backgroundAttachment: "scroll",
						"will-change": "transform"
					});
					else if (config.speed < 0 && winH > h) {
						var display = (winH + h) / winH;
						height = h * -config.speed * display, $this.css({
							height: h + 2 * height,
							top: -height,
							backgroundAttachment: "scroll",
							"will-change": "transform"
						})
					}
				},
				currentPoint = null,
				startPoint = null,
				endPoint = null,
				scrollY = (config.opacity ? $this.find(config.opacity) : null, null),
				setPosition = function() {
					return startPoint = offset - winH, endPoint = offset + elHeight + winH - headerHeight, scrollY = val.scroll(), startPoint > scrollY || scrollY > endPoint ? void(ticking = !1) : (currentPoint = (-offset + scrollY) * config.speed, $this.css({
						"-webkit-transform": "translateY(" + currentPoint + "px) translateZ(0)",
						"-moz-transform": "translateY(" + currentPoint + "px) translateZ(0)",
						"-ms-transform": "translateY(" + currentPoint + "px) translateZ(0)",
						"-o-transform": "translateY(" + currentPoint + "px) translateZ(0)",
						transform: "translateY(" + currentPoint + "px) translateZ(0)"
					}), void(ticking = !1))
				},
				requestTick = function() {
					ticking || isMobile || (window.requestAnimationFrame(setPosition), ticking = !0)
				},
				init = function() {
					MK.utils.isSmoothScroll && (update(), setTimeout(update, 100), $window.on("load", update), $window.on("resize", update), window.addResizeListener(container, update), $window.on("scroll", requestTick))
				};
			return {
				init: init
			}
		}
	}(jQuery),
	function($) {
		"use strict";
		MK.component.Preloader = function(el) {
			this.el = el
		}, MK.component.Preloader.prototype = {
			init: function() {
				this.cacheElements(), this.bindEvents()
			},
			cacheElements: function() {
				this.$preloader = $(this.el)
			},
			bindEvents: function() {
				this.onLoad()
			},
			onLoad: function() {
				setTimeout(this.hidePreloader.bind(this), 300)
			},
			hidePreloader: function() {
				this.$preloader.hide()
			}
		}
	}(jQuery),
	function($) {
		"use strict";
		MK.ui.loader = {
			tpl: function() {
				return '<div class="mk-loading-indicator"><div class="mk-loading-indicator__inner"><div class="mk-loading-indicator__icon"></div><img style="height:100%; width:auto;" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"></div></div>'
			},
			add: function(item) {
				$(item).append(this.tpl)
			},
			remove: function(item) {
				item ? $(item).find(".mk-loading-indicator").remove() : $(".mk-loading-indicator").remove()
			}
		}
	}(jQuery),
	function($) {
		if ("Edge" === MK.utils.browser.name || "IE" === MK.utils.browser.name) {
			var val = 1,
				$edgeClipper = $(".mk-slider-slide"),
				$sectionClipper = $(".clipper-true"),
				$bgLayer = $(".background-layer"),
				onScroll = function() {
					val *= -1, $edgeClipper.length && $edgeClipper.each(redraw), $sectionClipper.length && $sectionClipper.each(redraw),
						$bgLayer.length && $bgLayer.each(redraw)
				},
				redraw = function() {
					$(this).css("margin-top", val / 100)
				};
			$(window).on("scroll", function() {
				window.requestAnimationFrame(onScroll)
			})
		}
	}(jQuery),
	function($) {
		"use strict";

		function run($imgs) {
			$imgs.length && $imgs.each(setSrcAttr)
		}

		function setSrcAttr() {
			var $img = $(this),
				set = $img.data("mk-image-src-set");
			1 === viewportClass && isRetina && set["2x"] ? $img.attr("src", set["2x"]) : 0 === viewportClass && set.mobile ? $img.attr("src", set.mobile) : $img.attr("src", set["default"])
		}

		function getViewportClass() {
			return window.matchMedia("(max-width: 736px)").matches ? 0 : 1
		}

		function handleResize() {
			if ($imgs.length) {
				var currentViewportClass = getViewportClass();
				currentViewportClass > viewportClass && (viewportClass = currentViewportClass, run($imgs))
			}
		}

		function handleAjax() {
			setTimeout(function() {
				var $newImgs = $("img[data-mk-image-src-set]").not($imgs);
				$imgs.add($newImgs), run($newImgs)
			}, 100)
		}
		var $imgs = $("img[data-mk-image-src-set]"),
			viewportClass = getViewportClass(),
			isRetina = window.devicePixelRatio >= 2;
		run($imgs), $(window).on("resize", handleResize), MK.utils.eventManager.subscribe("ajaxLoaded", handleAjax), MK.utils.eventManager.subscribe("ajax-preview", handleAjax), MK.utils.eventManager.subscribe("quickViewOpen", handleAjax)
	}(jQuery),
	function($) {
		"use strict";
		var utils = MK.utils,
			val = MK.val,
			$topLevelSections = $("#theme-page > .vc_row, #theme-page > .mk-main-wrapper-holder, #theme-page > .mk-page-section");
		$(document).on("click", ".mk-skip-to-next", function() {
			var $this = $(this),
				offset = $this.offset().top,
				nextOffset = utils.nextHigherVal(offset, utils.offsets($topLevelSections));
			utils.scrollTo(nextOffset - val.offsetHeaderHeight(nextOffset))
		})
	}(jQuery),
	function($) {
		"use strict";
		MK.ui.Slider = function(container, config) {
			var defaults = {
				slide: ".mk-slider-slide",
				nav: ".mk-slider-nav",
				effect: "roulete",
				ease: "easeOutQuart",
				slidesPerView: 1,
				slidesToView: 1,
				transitionTime: 700,
				displayTime: 3e3,
				autoplay: !0,
				hasNav: !0,
				hasPagination: !0,
				paginationTpl: "<span></span>",
				paginationEl: "#pagination",
				draggable: !0,
				fluidHeight: !1,
				pauseOnHover: !1,
				activeClass: "is-active",
				onInitialize: function() {},
				onAfterSlide: function(id) {},
				onBeforeSlide: function(id) {}
			};
			this.state = {
				id: 0,
				moveForward: !0,
				running: !1,
				zIFlow: null,
				stop: !1
			}, this.config = $.extend(defaults, config), this.container = container, this.initPerView = this.config.slidesPerView, this.activeTimer = null, this.autoplay = null, this.timer = null, this.timerRemaining = parseInt(this.config.displayTime)
		}, MK.ui.Slider.prototype = {
			init: function() {
				this.setPerViewItems(), this.cacheElements(), this.getSlideSize(), this.bindEvents(), this.setSize(), this.setPos(), this.updateId(-1), this.updateId(1), this.val = this.dynamicVal(), this.timeline = this.prepareTimeline(this.config.transitionTime), this.timeline.build(), this.config.hasPagination && this.buildPagination(), this.config.autoplay && document.hasFocus() && this.setTimer(), "function" == typeof this.config.onInitialize && this.config.onInitialize(this.slides), this.config.fluidHeight === !0 && ($(this.slides).height("auto"), $(this.container).css("transition", "height 200ms ease-out"), this.setHeight(0)), "toHighest" === this.config.fluidHeight && this.setHeightToHighest(), $(this.slides).each(this.createTimer)
			},
			cacheElements: function() {
				this.container = this.isNode(this.container) ? this.container : document.querySelectorAll(this.container)[0], this.slides = this.container.querySelectorAll(this.config.slide), this.$slides = $(this.slides), this.config.hasNav && (this.$nav = $(this.config.nav)), this.config.hasPagination && (this.$pagination = $(this.config.paginationEl))
			},
			bindEvents: function() {
				var $window = $(window);
				this.config.slidesPerView > 1 && $window.on("resize", this.setPerViewItems.bind(this)), this.config.hasNav && this.eventsNav(), this.config.hasPagination && this.eventsPag(), this.config.draggable && this.dragHandler(), this.config.autoplay && ($window.on("focus", this.windowActive.bind(this)), $window.on("blur", this.windowInactive.bind(this))), this.config.pauseOnHover && ($(this.container).on("mouseleave", this.setTimer.bind(this)), $(this.container).on("mouseenter", this.unsetTimer.bind(this))), "toHighest" === this.config.fluidHeight && $window.on("resize", this.setHeightToHighest.bind(this))
			},
			setPerViewItems: function() {
				window.matchMedia("(max-width: 500px)").matches ? this.config.slidesPerView = 1 : window.matchMedia("(max-width: 767px)").matches && this.initPerView >= 2 ? this.config.slidesPerView = 2 : window.matchMedia("(max-width: 1024px)").matches && this.initPerView >= 3 ? this.config.slidesPerView = 3 : this.config.slidesPerView = this.initPerView, "undefined" != typeof this.slides && (this.getSlideSize(), this.setSize(), this.setPos(), this.timeline = this.prepareTimeline(this.config.transitionTime), this.timeline.build())
			},
			eventsNav: function() {
				this.$nav.on("click", "a", this.handleNav.bind(this))
			},
			eventsPag: function() {
				this.$pagination.on("click", "a", this.handlePagination.bind(this))
			},
			handleNav: function(e) {
				if (e.preventDefault(), !this.state.running) {
					this.state.running = !0;
					var $this = $(e.currentTarget),
						moveForward = "next" === $this.data("direction");
					this.config.autoplay && (this.unsetTimer(), setTimeout(this.setTimer.bind(this), this.config.transitionTime)), this.state.moveForward = moveForward, this.timeline.build(), this.timeline.play(), this.setActive(this.nextId(moveForward ? 1 : -1)), this.config.fluidHeight && this.setHeight(this.nextId(moveForward ? 1 : -1))
				}
			},
			handlePagination: function(e) {
				e.preventDefault();
				var $this = $(e.currentTarget),
					id = $this.index();
				this.goTo(id)
			},
			reset: function() {
				this.state.stop = !0, this.state.id = 0, this.setPos(), this.unsetTimer(), this.setTimer()
			},
			goTo: function(id) {
				if (!this.state.running) {
					this.state.running = !0;
					var lastId = this.state.id;
					lastId !== id && (id > lastId ? this.state.moveForward = !0 : this.state.moveForward = !1, this.config.autoplay && (this.unsetTimer(), setTimeout(this.setTimer.bind(this), this.config.transitionTime)), this.timeline.build(Math.abs(lastId - id)), this.timeline.play(), this.setActive(id), this.config.fluidHeight && this.setHeight(id))
				}
			},
			windowActive: function() {
				this.setTimer(!1, !0), $(this.container).removeClass("is-paused")
			},
			windowInactive: function() {
				this.unsetTimer(), $(this.container).addClass("is-paused")
			},
			updateId: function(val) {
				this.state.id = this.nextId(val)
			},
			nextId: function(val) {
				var len = this.slides.length,
					insertVal = this.state.id + val;
				return insertVal = insertVal >= 0 ? insertVal : len + val, insertVal = insertVal >= len ? 0 : insertVal
			},
			setStyle: function(obj, style) {
				var hasT = style.transform,
					t = {
						x: hasT ? style.transform.translateX : null,
						y: hasT ? style.transform.translateY : null,
						scale: hasT ? style.transform.scale : null,
						rotate: hasT ? style.transform.rotate : null,
						rotateX: hasT ? style.transform.rotateX : null,
						rotateY: hasT ? style.transform.rotateY : null
					},
					z = "translateZ(0)",
					x = t.x ? "translateX(" + t.x + "%)" : "translateX(0)",
					y = t.y ? "translateY(" + t.y + "%)" : "translateY(0)",
					s = t.scale ? "scale(" + t.scale + ")" : "scale(1)",
					r = t.rotate ? "rotate(" + t.rotate + "deg)" : "rotate(0)",
					rX = t.rotateX ? "rotateX(" + t.rotateX + "deg)" : "",
					rY = t.rotateY ? "rotateY(" + t.rotateY + "deg)" : "",
					o = style.opacity,
					h = style.height,
					w = style.width,
					c = z + x + y + s + r + rX + rY;
				c.length && (obj.style.webkitTransform = c, obj.style.msTransform = c, obj.style.transform = c), "number" == typeof o && (obj.style.opacity = o), h && (obj.style.height = h + "%"), w && (obj.style.width = w + "%")
			},
			setPos: function() {
				if ("undefined" != typeof this.slides) {
					var id = this.state.id,
						i = 0,
						len = this.slides.length,
						animation = this.animation[this.config.effect],
						axis = animation.axis,
						animNext = animation.next,
						animActi = animation.active,
						animPrev = animation.prev,
						perView = this.config.slidesPerView,
						slideId = null,
						style = {};
					for (style.transform = {}; len > i; i += 1) perView > i ? (style = animActi, style.transform["translate" + axis] = 100 * i) : (style = this.state.moveForward ? animNext : animPrev, style.transform["translate" + axis] = this.state.moveForward ? 100 * perView : -100), this.slides[i].style.zIndex = 0, slideId = (i + id) % len, this.setStyle(this.slides[slideId], style)
				}
			},
			setSize: function() {
				if ("undefined" != typeof this.slides) {
					var i = 0,
						len = this.slides.length,
						axis = this.animation[this.config.effect].axis,
						slideSize = this.slideSize,
						style = {};
					for ("Y" === axis ? style.height = slideSize[axis] : style.width = slideSize[axis]; len > i; i += 1) this.setStyle(this.slides[i], style)
				}
			},
			setHeight: function(id) {
				var $slides = $(this.slides),
					$activeSlide = $slides.eq(id),
					currentHeight = $activeSlide.height();
				$(this.container).height(currentHeight)
			},
			setHeightToHighest: function() {
				var $slides = $(this.slides),
					height = 0;
				$slides.each(function() {
					height = Math.max(height, $(this).find("> div").outerHeight())
				}), $(this.container).height(height)
			},
			prepareTimeline: function(time) {
				var timeProg, build, move, add, play, reverse, progress, kill, self = this,
					iteration = 0,
					totalIter = time / (1e3 / 60),
					animLoop = [],
					aL = 0,
					loops = 1,
					ease = this.config.ease,
					len = this.slides.length,
					perView = this.config.slidesPerView,
					animation = this.animation[this.config.effect],
					animAxis = animation.axis,
					animNext = animation.next,
					animActi = animation.active,
					animPrev = animation.prev,
					style = {},
					slideId = null,
					zIFlow = null;
				return style.transform = {}, build = function(repeats) {
					var currentEase = ease;
					if (loops = repeats || loops) {
						loops > 1 && (currentEase = "linearEase"), kill(), self.setPos();
						for (var id = self.state.id, moveForward = self.state.moveForward, i = 0, axisMove = moveForward ? -100 : 100; perView >= i; i += 1) slideId = (moveForward ? i + id : i + id - 1) % len, slideId = 0 > slideId ? len + slideId : slideId, style = 0 === i ? moveForward ? animPrev : animActi : i === perView ? moveForward ? animActi : animNext : animActi, zIFlow = self.state.moveForward ? animNext.zIndex : animPrev.zIndex, zIFlow && (self.slides[slideId].style.zIndex = "+" === zIFlow ? i + 1 : len - i), style.transform["translate" + animAxis] = axisMove, add(self.slides[slideId], style, currentEase)
					}
				}, add = function(slide, toStyles, ease) {
					if ("undefined" == typeof slide) throw "Add at least one slide";
					var fromStyles = slide.style,
						style = self.refStyle(toStyles, fromStyles);
					animLoop.push([slide, style, ease]), aL += 1
				}, move = function(startProg, mode) {
					if (!isTest) {
						var currentTotalIter = totalIter;
						if (loops > 1 && (currentTotalIter = totalIter / 5), self.state.running || (self.state.running = !0), startProg && (iteration = Math.ceil(startProg * currentTotalIter)), timeProg = iteration / currentTotalIter, progress(timeProg), iteration >= currentTotalIter && "play" === mode || 0 >= iteration && "reverse" === mode) return self.state.running = !1, iteration = 0, kill(), self.updateId(self.state.moveForward ? 1 : -1), loops -= 1, loops > 0 && (build(), play()), void(loops || (loops = 1, self.timerRemaining = parseInt(self.config.displayTime), self.config.onAfterSlide(self.state.id)));
						"play" === mode ? iteration += 1 : iteration -= 1, requestAnimationFrame(function() {
							self.state.stop || move(0, mode)
						})
					}
				}, play = function(startProg) {
					self.config.onBeforeSlide(self.nextId(self.state.moveForward ? 1 : -1));
					var start = startProg || 0;
					iteration = 0, self.state.stop = !1, move(start, "play")
				}, reverse = function(startProg) {
					var start = startProg || 1;
					move(start, "reverse")
				}, progress = function(progVal) {
					var currentStyle, aI = 0;
					for (aI; aL > aI; aI++) 1 !== progVal && 0 !== progVal ? currentStyle = self.currentStyle(progVal, animLoop[aI][1], animLoop[aI][2]) : 1 === progVal ? currentStyle = self.currentStyle(progVal, animLoop[aI][1], "linearEase") : 0 === progVal && (currentStyle = self.currentStyle(progVal, animLoop[aI][1], "linearEase")), self.setStyle(animLoop[aI][0], currentStyle)
				}, kill = function() {
					animLoop = [], aL = 0
				}, {
					build: build,
					add: add,
					play: play,
					reverse: reverse,
					progress: progress
				}
			},
			refStyle: function(toStyles, fromStyles) {
				var initVal, changeVal, endVal, dynamicEnd, styleProp, transProp, transform, axis = this.animation[this.config.effect].axis,
					style = {};
				for (styleProp in toStyles)
					if ("transform" === styleProp) {
						transform = this.getTransforms(fromStyles), style.transform = {};
						for (transProp in toStyles.transform) "translateZ" !== transProp && (initVal = transform[transProp] || 0, dynamicEnd = transProp === "translate" + axis ? initVal : 0, endVal = toStyles.transform[transProp] + dynamicEnd, changeVal = endVal - initVal, style.transform[transProp] = [initVal, changeVal])
					} else {
						if ("zIndex" === styleProp) continue;
						initVal = parseFloat(fromStyles[styleProp]) || 0, endVal = toStyles[styleProp], changeVal = endVal - initVal, style[styleProp] = [initVal, changeVal]
					}
				return style
			},
			currentStyle: function(progress, style, ease) {
				var currentVals, styleProp, transProp, self = this,
					currentStyle = {};
				for (styleProp in style)
					if ("transform" === styleProp) {
						currentStyle.transform = {};
						for (transProp in style.transform) "translateZ" !== transProp && (currentVals = style.transform[transProp], currentStyle.transform[transProp] = self.ease[ease](progress, currentVals[0], currentVals[1], 1))
					} else currentVals = style[styleProp], currentStyle[styleProp] = self.ease[ease](progress, currentVals[0], currentVals[1], 1);
				return currentStyle
			},
			setActive: function(id) {
				var $slides = $(this.slides),
					className = this.config.activeClass;
				if ($slides.removeClass(className), this.config.hasPagination) {
					var $pagination = this.$pagination.find("a");
					$pagination.removeClass(className), $pagination.eq(id).addClass(className)
				}
				this.activeTimer && clearTimeout(this.activeTimer), this.activeTimer = setTimeout(function() {
					$slides.eq(id).addClass(className)
				}, this.config.transitionTime)
			},
			createTimer: function() {
				var $slide = $(this),
					video = $slide.find("video").get(0);
				video && ($slide.data("timer", 1e3 * video.duration), $slide.attr("data-timer", 1e3 * video.duration))
			},
			setTimer: function(isFirst, isPaused) {
				var create, run, customTimer = this.$slides.eq(this.nextId(this.state.moveForward ? 1 : -1)).data("timer"),
					trans = parseInt(this.config.transitionTime),
					interval = customTimer ? customTimer : parseInt(this.config.displayTime),
					timer = interval + trans,
					self = this,
					first = isFirst || !0;
				this.timer = !0, this.lastSetTimer = Date.now(), create = function() {
					self.autoplay && clearTimeout(self.autoplay), self.timer && (self.state.moveForward = !0, self.timeline.build(), self.timeline.play(), self.setActive(self.nextId(1)), self.config.fluidHeight && self.setHeight(self.nextId(1)), first = !1, self.lastSetTimer = Date.now(), run())
				}, run = function(newInterval) {
					customTimer = self.$slides.eq(self.nextId(self.state.moveForward ? 1 : -1)).data("timer"), interval = customTimer ? customTimer : parseInt(self.config.displayTime), timer = interval + trans;
					var time = newInterval || timer;
					self.autoplay = setTimeout(create, time)
				}, isPaused ? run(this.timerRemaining) : run()
			},
			unsetTimer: function() {
				this.timer = !1, this.lastUnsetTimer = Date.now(), this.timerRemaining -= this.lastUnsetTimer - this.lastSetTimer, this.autoplay && clearTimeout(this.autoplay)
			},
			buildPagination: function() {
				for (var i = 0, len = this.slides.length, tpl = ""; len > i; i += 1) tpl += '<a href="javascript:;">' + this.config.paginationTpl + "</a>";
				this.$pagination.html(tpl), this.setActive(0)
			},
			getSlideSize: function() {
				this.slideSize = {
					X: 100 / this.config.slidesPerView,
					Y: 100 / this.config.slidesPerView
				}
			},
			getTransforms: function(style) {
				var match, transform = style.transform || style.webkitTransform || style.mozTransform,
					regex = /(\w+)\(([^)]*)\)/g,
					T = {};
				if ("string" != typeof transform) throw "Transform prop is not a string.";
				if (transform) {
					for (; match = regex.exec(transform);) T[match[1]] = parseFloat(match[2]);
					return T
				}
			},
			isNode: function(o) {
				return "object" == typeof Node ? o instanceof Node : o && "object" == typeof o && "number" == typeof o.nodeType && "string" == typeof o.nodeName
			},
			dragHandler: function() {
				var dragStart, dragMove, dragEnd, progress, self = this,
					$container = $(this.container),
					prevBuild = !1,
					nextBuild = !1,
					dragging = !1,
					buffor = 5;
				progress = function(moveX) {
					return moveX / self.val.viewportW()
				}, dragStart = function(moveX, startX) {}, dragMove = function(moveX) {
					self.state.running || (-buffor > moveX ? (nextBuild ? self.timeline.progress(-progress(moveX)) : (self.state.moveForward = !0, self.timeline.build(), nextBuild = !0, prevBuild = !1, self.unsetTimer()), dragging = !0) : moveX > buffor && (prevBuild ? self.timeline.progress(progress(moveX)) : (self.state.moveForward = !1, self.timeline.build(), prevBuild = !0, nextBuild = !1, self.unsetTimer()), dragging = !0))
				}, dragEnd = function(moveX) {
					if (dragging) {
						var prog = progress(moveX),
							absProg = 0 > prog ? -prog : prog;
						absProg > .1 ? (self.timeline.play(absProg), self.setActive(self.nextId(0 > prog ? 1 : -1)), self.config.fluidHeight && self.setHeight(self.nextId(0 > prog ? 1 : -1))) : (self.timeline.reverse(absProg), 0 > prog ? self.updateId(-1) : self.updateId(1)), prevBuild = !1, nextBuild = !1, dragging = !1, self.config.autoplay && self.setTimer(!1)
					}
				}, this.drag($container, dragStart, dragMove, dragEnd)
			},
			drag: function($el, startFn, moveFn, stopFn) {
				var touchX, movX, evt, prevent, start, move, stop;
				prevent = function(e) {
					e.preventDefault()
				}, start = function(e) {
					$el.on("mousemove", prevent), $el.on("touchmove", move), $el.on("mousemove", move), evt = "touchstart" === e.type ? e.originalEvent.touches[0] : e, touchX = evt.pageX, "function" == typeof startFn && startFn(movX, touchX)
				}, move = function(e) {
					evt = "touchmove" === e.type ? e.originalEvent.touches[0] : e, movX = evt.pageX - touchX, "function" == typeof moveFn && moveFn(movX)
				}, stop = function(e) {
					$el.off("mousemove", prevent), $el.off("touchmove", move), $el.off("mousemove", move), "function" == typeof stopFn && stopFn(movX)
				}, $el.on("touchstart", start), $el.on("mousedown", start), $el.on("touchend", stop), $el.on("touchleave", stop), $el.on("touchcancel", stop), $el.on("mouseup", stop), $el.on("mouseleave", stop)
			},
			dynamicVal: function() {
				var update, getViewportW, viewportW, $window = $(window);
				return update = function() {
					viewportW = $window.width()
				}, getViewportW = function() {
					return viewportW
				}, update(), $window.on("load", update), $window.on("resize", update), {
					viewportW: getViewportW
				}
			}
		}, MK.ui.Slider.prototype.animation = {
			slide: {
				axis: "X",
				next: {
					transform: {}
				},
				active: {
					transform: {}
				},
				prev: {
					transform: {}
				}
			},
			vertical_slide: {
				axis: "Y",
				next: {
					transform: {}
				},
				active: {
					transform: {}
				},
				prev: {
					transform: {}
				}
			},
			perspective_flip: {
				axis: "Y",
				next: {
					transform: {
						rotateX: 80
					}
				},
				active: {
					transform: {
						rotateX: 0
					}
				},
				prev: {
					transform: {
						rotateX: 0
					}
				}
			},
			zoom: {
				axis: "Z",
				next: {
					opacity: 0,
					transform: {
						scale: .9
					}
				},
				active: {
					opacity: 1,
					transform: {
						scale: 1
					}
				},
				prev: {
					opacity: 0,
					transform: {
						scale: 1.1
					}
				}
			},
			fade: {
				axis: "Z",
				next: {
					opacity: 0,
					transform: {}
				},
				active: {
					opacity: 1,
					transform: {}
				},
				prev: {
					opacity: 0,
					transform: {}
				}
			},
			kenburned: {
				axis: "Z",
				next: {
					opacity: 0,
					transform: {}
				},
				active: {
					opacity: 1,
					transform: {}
				},
				prev: {
					opacity: 0,
					transform: {}
				}
			},
			zoom_out: {
				axis: "Z",
				next: {
					zIndex: "+",
					opacity: 1,
					transform: {
						translateY: 100,
						scale: 1
					}
				},
				active: {
					opacity: 1,
					transform: {
						translateY: 0,
						scale: 1
					}
				},
				prev: {
					zIndex: "+",
					opacity: 0,
					transform: {
						translateY: 0,
						scale: .5
					}
				}
			},
			horizontal_curtain: {
				axis: "Z",
				next: {
					zIndex: "+",
					transform: {
						translateX: 100
					}
				},
				active: {
					transform: {
						translateX: 0
					}
				},
				prev: {
					zIndex: "+",
					transform: {
						translateX: -70
					}
				}
			},
			roulete: {
				axis: "X",
				next: {
					opacity: .5,
					transform: {
						scale: .5,
						rotate: 10,
						translateY: 20
					}
				},
				active: {
					opacity: 1,
					transform: {
						scale: 1,
						rotate: 0,
						translateY: 0
					}
				},
				prev: {
					opacity: .3,
					transform: {
						scale: .5,
						rotate: -10,
						translateY: 20
					}
				}
			}
		}, MK.ui.Slider.prototype.ease = {
			linearEase: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * currentIteration / totalIterations + startValue
			},
			easeInQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue
			},
			easeOutQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
				return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue
			},
			easeInOutQuad: function(currentIteration, startValue, changeInValue, totalIterations) {
				return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * currentIteration * currentIteration + startValue : -changeInValue / 2 * (--currentIteration * (currentIteration - 2) - 1) + startValue
			},
			easeInCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue
			},
			easeOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue
			},
			easeInOutCubic: function(currentIteration, startValue, changeInValue, totalIterations) {
				return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(currentIteration, 3) + startValue : changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue
			},
			easeInQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * Math.pow(currentIteration / totalIterations, 4) + startValue
			},
			easeOutQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
				return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue
			},
			easeInOutQuart: function(currentIteration, startValue, changeInValue, totalIterations) {
				return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(currentIteration, 4) + startValue : -changeInValue / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue
			},
			easeInQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * Math.pow(currentIteration / totalIterations, 5) + startValue
			},
			easeOutQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue
			},
			easeInOutQuint: function(currentIteration, startValue, changeInValue, totalIterations) {
				return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(currentIteration, 5) + startValue : changeInValue / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue
			},
			easeInSine: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue
			},
			easeOutSine: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue
			},
			easeInOutSine: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue
			},
			easeInExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) + startValue
			},
			easeOutExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue
			},
			easeInOutExpo: function(currentIteration, startValue, changeInValue, totalIterations) {
				return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue : changeInValue / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue
			},
			easeInCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue
			},
			easeOutCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
				return changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) + startValue
			},
			easeInOutCirc: function(currentIteration, startValue, changeInValue, totalIterations) {
				return (currentIteration /= totalIterations / 2) < 1 ? changeInValue / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue : changeInValue / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue
			}
		}
	}(jQuery),
	function($) {
		"use strict";
		MK.component.SocialShare = function(el) {
			var networks = {
				twitter: "http://twitter.com/intent/tweet?text={title} {url}",
				pinterest: "http://pinterest.com/pin/create/button/?url={url}&media={image}&description={title}",
				facebook: "https://www.facebook.com/sharer/sharer.php?u={url}",
				googleplus: "https://plus.google.com/share?url={url}",
				linkedin: "http://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={desc}"
			};
			this.networks = networks, this.el = el
		}, MK.component.SocialShare.prototype = {
			init: function() {
				this.cacheElements(), this.bindEvents()
			},
			cacheElements: function() {
				this.$this = $(this.el)
			},
			bindEvents: function() {
				var thisObject = this;
				$.each(this.networks, function(key, value) {
					thisObject.$tempClass = $("." + key + "-share"), thisObject.$tempClass.click(thisObject.openSharingDialog.bind(self, this, key))
				})
			},
			openSharingDialog: function(url, site, args) {
				var urlWrapper = url,
					rx = new RegExp("{[a-z]*}", "g");
				for (match = rx.exec(url); null != match;) {
					var pureAttr = match[0].replace("{", "").replace("}", ""),
						attValue = $(args.currentTarget).attr("data-" + pureAttr);
					attValue = attValue.replace("#", "%23"), void 0 !== attValue && null !== attValue || (attValue = ""), urlWrapper = urlWrapper.replace(match, attValue), match = rx.exec(url)
				}
				window.open(urlWrapper, site + "Window", "height=320,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0")
			}
		};
		var $body = $("body");
		$body.length && $body.each(function() {
			var socialShare = new MK.component.SocialShare(this);
			socialShare.init()
		})
	}(jQuery),
	function($) {
		"use strict";
		MK.component.Sortable = function(el) {
			this.el = el
		}, MK.component.Sortable.prototype = {
			init: function() {
				this.cacheElements(), this.bindEvents()
			},
			cacheElements: function() {
				this.unique = Date.now(), this.$filter = $(this.el), this.config = this.$filter.data("sortable-config"), this.ajaxLoader = new MK.utils.ajaxLoader(this.config.container), this.ajaxLoader.init(), this.$container = $(this.config.container), this.$navItems = this.$filter.find("a"), this.$filterItems = this.$container.find(this.config.item)
			},
			bindEvents: function() {
				this.$navItems.on("click", this.handleClick.bind(this)), MK.utils.eventManager.subscribe("ajaxLoaded", this.onLoad.bind(this))
			},
			handleClick: function(e) {
				e.preventDefault();
				var $item = $(e.currentTarget),
					term = $item.data("filter");
				this.$navItems.removeClass("current"), $item.addClass("current"), "ajax" === this.config.mode ? this.inDB(term, $item) : this.inPage(term)
			},
			inDB: function(term, $item) {
				MK.ui.loader.remove(this.$filter), MK.ui.loader.add($item), this.ajaxLoader.setData({
					paged: 1,
					term: term
				}), this.ajaxLoader.load(this.unique)
			},
			inPage: function(term) {
				var $filterItems = this.$container.find(this.config.item);
				$filterItems.removeClass("is-hidden"), "*" !== term && $filterItems.not("." + term).addClass("is-hidden"), MK.utils.eventManager.publish("staticFilter")
			},
			onLoad: function(e, response) {
				"static" === this.config.mode && this.$navItems.removeClass("current").first().addClass("current"), response.id === this.config.container && (MK.ui.loader.remove(this.$filter), response.unique === this.unique && (this.$container.html(response.content), this.ajaxLoader.setData({
					paged: 1
				})))
			}
		}
	}(jQuery),
	function($) {
		"use strict";
		MK.component.Tabs = function(el) {
			var defaults = {
				activeClass: "is-active"
			};
			this.config = defaults, this.el = el
		}, MK.component.Tabs.prototype = {
			init: function() {
				this.cacheElements(), this.bindEvents()
			},
			cacheElements: function() {
				this.$this = $(this.el), this.$tabs = this.$this.find(".mk-tabs-tab"), this.$panes = this.$this.find(".mk-tabs-pane"), this.currentId = 0
			},
			bindEvents: function() {
				this.$tabs.on("click", this.switchPane.bind(this))
			},
			switchPane: function(evt) {
				evt.preventDefault();
				var clickedId = $(evt.currentTarget).index();
				this.hide(this.currentId), this.show(clickedId), this.currentId = clickedId
			},
			show: function(id) {
				this.$tabs.eq(id).addClass(this.config.activeClass), this.$panes.eq(id).addClass(this.config.activeClass)
			},
			hide: function(id) {
				this.$tabs.eq(id).removeClass(this.config.activeClass), this.$panes.eq(id).removeClass(this.config.activeClass)
			}
		}
	}(jQuery),
	function($) {
		"use strict";

		function toggle(e) {
			e.preventDefault(), e.stopPropagation();
			var $this = $(e.currentTarget);
			$this.hasClass("mk-toggle-active") ? ($(".mk-box-to-trigger").fadeOut(200), $this.removeClass("mk-toggle-active")) : ($(".mk-box-to-trigger").fadeOut(200), $this.parent().find(".mk-box-to-trigger").fadeIn(250), $(".mk-toggle-trigger").removeClass("mk-toggle-active"), $this.addClass("mk-toggle-active"))
		}

		function assignToggle() {
			setTimeout(function() {
				$(".mk-toggle-trigger").off("click", toggle), $(".mk-toggle-trigger").on("click", toggle)
			}, 100)
		}
		$(document).on("click", function(e) {
			$(".mk-toggle-trigger").removeClass("mk-toggle-active")
		}), assignToggle(), MK.utils.eventManager.subscribe("ajaxLoaded", assignToggle), MK.utils.eventManager.subscribe("ajax-preview", assignToggle)
	}(jQuery),
	function($) {
		"use strict";
		var $iframes = $("iframe");
		$iframes.each(function() {
			var $iframe = $(this),
				parent = $iframe.parent().get(0),
				tagName = parent.tagName;
			"P" === tagName && $iframe.wrap('<div class="mk-video-container"></div>')
		})
	}(jQuery),
	function($) {
		"use strict";
		if (MK.utils.isMobile()) return void $(".mk-animate-element").removeClass("mk-animate-element");
		var $rootLevelEls = $(".js-master-row, .widget"),
			init = function() {
				$rootLevelEls.each(spyViewport), $rootLevelEls.each(function() {
					var $animateEl = $(this).find(".mk-animate-element");
					$animateEl.each(spyViewport)
				})
			},
			spyViewport = function(i) {
				var self = this;
				MK.utils.scrollSpy(this, {
					position: "bottom",
					threshold: 200,
					after: function() {
						animate.call(self, i)
					}
				})
			},
			animate = function(i) {
				var $this = $(this);
				setTimeout(function() {
					$this.addClass("mk-in-viewport")
				}, 100 * i)
			};
		$(window).on("load", init)
	}(jQuery),
	function($) {
		"use strict";

		function moveToFirstSlide() {
			var $switcher = $(".variations_form select"),
				$wrapper = $switcher.parents(".mk-product"),
				id = $wrapper.find(".mk-slider-holder").parent().attr("id");
			MK.utils.eventManager.publish("gallery-update", {
				id: id
			})
		}
		$(document).on("change", ".variations_form select", moveToFirstSlide)
	}(jQuery),
	function($) {
		"use strict";

		function smoothScrollToAnchor(evt) {
			var MK = window.MK || {},
				anchor = MK.utils.detectAnchor(this),
				$this = $(evt.currentTarget);
			anchor.length ? (evt.preventDefault(), MK.utils.scrollToAnchor(anchor)) : "#" === $this.attr("href") && evt.preventDefault()
		}
		$(window).on("load", function() {
			var MK = window.MK || {};
			MK.core.initAll(document), MK.utils.scrollToURLHash(), setTimeout(function() {
				MK.ui.preloader.hide(), $(".mk-preloader").hide(), $("body").removeClass("loading")
			}, 150)
		}), $(document).on("click", ".js-smooth-scroll, .js-main-nav a", smoothScrollToAnchor), $(".side_dashboard_menu a").on("click", smoothScrollToAnchor)
	}(jQuery)
}(jQuery);