/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/scripts/focus-helpers.js":
/*!*******************************************!*\
  !*** ./src/core/scripts/focus-helpers.js ***!
  \*******************************************/
/*! exports provided: findFocusableItems, focusOnFirstItem, focusOnLastItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findFocusableItems", function() { return findFocusableItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "focusOnFirstItem", function() { return focusOnFirstItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "focusOnLastItem", function() { return focusOnLastItem; });
function findFocusableItems($jQueryElement) {
  var foundFocusableItems = $jQueryElement.find('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  return foundFocusableItems;
}
function focusOnFirstItem($jQueryElement) {
  setTimeout(function () {
    var focusableItems = findFocusableItems($jQueryElement);
    focusableItems[0].focus();
  });
}
function focusOnLastItem($jQueryElement) {
  setTimeout(function () {
    var focusableItems = findFocusableItems($jQueryElement);
    focusableItems[focusableItems.length - 1].focus();
  });
}


/***/ }),

/***/ "./src/core/scripts/pfgc/carousel.js":
/*!*******************************************!*\
  !*** ./src/core/scripts/pfgc/carousel.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _focus_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../focus-helpers */ "./src/core/scripts/focus-helpers.js");

var $carousel = $(".carousel");
var initialEntry = false;
var keyEvent = null;
var shiftKey = null;
var currentSlideCount = 0;
var totalSlideCount = $(".carousel .slick-slide:not(.slick-cloned)").length;
function carouselControl() {
  $carousel.one("focusin", initialCarouselFocusEnter);
  $carousel.on("keydown", function (e) {
    var focusableElements = Object(_focus_helpers__WEBPACK_IMPORTED_MODULE_0__["findFocusableItems"])($(".carousel .slick-current.slick-active"));
    var shiftTab = e.key === "Tab" && e.shiftKey;
    var $activeSlide = $(".carousel .slick-current.slick-active");
    e.preventDefault();
    e.stopPropagation();
    if (shiftTab && focusableElements[0] === e.target) {
      $carousel.one("afterChange", function () {
        Object(_focus_helpers__WEBPACK_IMPORTED_MODULE_0__["focusOnLastItem"])($(".carousel .slick-current.slick-active"));
        currentSlideCount--;
      });
      if ($activeSlide.hasClass("entry-point-reverse") && Math.abs(currentSlideCount) === totalSlideCount || $activeSlide.hasClass("entry-point-forward") && currentSlideCount === 0) {
        $(".nav li:last-child a").focus();
        carouselReset($carousel);
        return;
      }
      $carousel.slick('slickPrev');
    } else if (e.key === "Tab" && focusableElements[focusableElements.length - 1] === e.target) {
      $carousel.one("afterChange", function () {
        Object(_focus_helpers__WEBPACK_IMPORTED_MODULE_0__["focusOnFirstItem"])($(".carousel .slick-current.slick-active"));
        currentSlideCount++;
      });
      if ($activeSlide.hasClass("entry-point-forward") && currentSlideCount === totalSlideCount || $activeSlide.hasClass("entry-point-reverse") && currentSlideCount === 0) {
        Object(_focus_helpers__WEBPACK_IMPORTED_MODULE_0__["focusOnFirstItem"])($("#EmpSpotlight"));
        carouselReset($carousel);
        return;
      }
      $carousel.slick('slickNext');
    }
  });
}
/**
 * When focus first enters into carousel
 */
function initialCarouselFocusEnter() {
  if (!initialEntry) {
    var entryPointClass = shiftKey && keyEvent ? "entry-point-reverse" : "entry-point-forward";
    initialEntry = true;
    $carousel.slick("slickPause");
    $(".carousel .slick-current.slick-active").addClass("".concat(entryPointClass));
    Object(_focus_helpers__WEBPACK_IMPORTED_MODULE_0__["focusOnFirstItem"])($(".carousel .slick-current.slick-active"));
    $(".carousel .slick-list").attr("aria-live", "polite");
  }
}

/**
 * Reset when leaving carousel
 */
function carouselReset() {
  var $activeSlide = $(".carousel .slick-current.slick-active");
  var activeSlideEntryClass = $activeSlide.hasClass("entry-point-forward") ? "entry-point-forward" : "entry-point-reverse";
  currentSlideCount = 0;
  $(".carousel .slick-list").removeAttr("aria-live");
  initialEntry = false;
  $activeSlide.removeClass("".concat(activeSlideEntryClass));
  $carousel.slick("slickPlay");
  $carousel.off("afterChange");
  $carousel.one("focusin", initialCarouselFocusEnter);
}

/**
 * Listen to keydown events to let us know which way focus has entered into carousel
 */
function focusDirection() {
  $("body").on('keydown', function (e) {
    keyEvent = e.key;
    shiftKey = e.shiftKey;
  });
  $("body").on('keyup', function (e) {
    keyEvent = null;
    shiftKey = null;
  });
}

/**
 * slickjs library added a lot of unnecessary and poorly done accessibility features 
 * added these functions to try to patch the issues.
 */
function removeAriaRequiredFromPaginationButtons() {
  $(".carousel button[aria-required='false']").removeAttr('aria-required');
}
function removeAriaHiddenFromCarousel() {
  $carousel.on('afterChange', function () {
    $('.slick-slide').removeAttr('aria-hidden');
    $('.slick-dots li').removeAttr('aria-hidden');
  });
}
function init() {
  carouselControl();
  focusDirection();
  removeAriaRequiredFromPaginationButtons();
  removeAriaHiddenFromCarousel();
}
/* harmony default export */ __webpack_exports__["default"] = ({
  init: init
});

/***/ }),

/***/ "./src/core/scripts/pfgc/desktop-navigation.js":
/*!*****************************************************!*\
  !*** ./src/core/scripts/pfgc/desktop-navigation.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function keyboardExpandOptionControl() {
  var $dropdownMenus = $(".nav-sub");
  $('.nav-link-expand-option').on('keydown', function (e) {
    if (e.key === "Enter") {
      expandNavMenuOption(e);
    }
  });
  $dropdownMenus.each(function (_, dropdown) {
    $(dropdown).on("keydown", function (e) {
      if (e.keyCode === 9 && e.target === dropdown.lastElementChild.lastElementChild || e.shiftKey && e.keyCode === 9 && e.target === dropdown.lastElementChild.firstElementChild) {
        collapseNavMenuOption(e);
      }
    });
  });
}
function expandNavMenuOption(e) {
  var $firstMenuItem = $(e.target).siblings(".nav-sub").find('a')[0];
  var $dropdown = $(e.target).siblings(".nav-sub");
  $dropdown.addClass("expand");
  e.target.setAttribute('aria-expanded', "true");
  $firstMenuItem.focus();
}
function collapseNavMenuOption(e) {
  var $dropdown = $(e.target).closest(".nav-sub");
  var $expandMenuOptionElements = $(".nav-link-expand-option");
  $dropdown.removeClass("expand");
  $expandMenuOptionElements.each(function (_, expandMenuOption) {
    expandMenuOption.setAttribute('aria-expanded', 'false');
  });
}
function init() {
  keyboardExpandOptionControl();
}
/* harmony default export */ __webpack_exports__["default"] = ({
  init: init
});

/***/ }),

/***/ "./src/core/scripts/pfgc/main.js":
/*!***************************************!*\
  !*** ./src/core/scripts/pfgc/main.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _skip_to_main_content__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../skip-to-main-content */ "./src/core/scripts/skip-to-main-content/index.js");
/* harmony import */ var _desktop_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./desktop-navigation */ "./src/core/scripts/pfgc/desktop-navigation.js");
/* harmony import */ var _mobile_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mobile-navigation */ "./src/core/scripts/pfgc/mobile-navigation.js");
/* harmony import */ var _tab_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tab-item */ "./src/core/scripts/pfgc/tab-item.js");
/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./carousel */ "./src/core/scripts/pfgc/carousel.js");
/* harmony import */ var _pfgcConfig__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pfgcConfig */ "./src/core/scripts/pfgc/pfgcConfig.js");
/* harmony import */ var _tracking_consent_banner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tracking-consent-banner */ "./src/core/scripts/tracking-consent-banner/index.js");







function init() {
  _pfgcConfig__WEBPACK_IMPORTED_MODULE_5__["default"].init();
  _tracking_consent_banner__WEBPACK_IMPORTED_MODULE_6__["default"].init(PFS && PFS.config && PFS.config.trackingConsent);
  _skip_to_main_content__WEBPACK_IMPORTED_MODULE_0__["default"].init(PFS && PFS.config && PFS.config.skipToMainContentConfig);
  _desktop_navigation__WEBPACK_IMPORTED_MODULE_1__["default"].init();
  _tab_item__WEBPACK_IMPORTED_MODULE_3__["default"].init();
  _mobile_navigation__WEBPACK_IMPORTED_MODULE_2__["default"].init();
  _carousel__WEBPACK_IMPORTED_MODULE_4__["default"].init();
  console.log('application init');
}
window.addEventListener('DOMContentLoaded', init);

/***/ }),

/***/ "./src/core/scripts/pfgc/mobile-navigation.js":
/*!****************************************************!*\
  !*** ./src/core/scripts/pfgc/mobile-navigation.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function toggleAriaExpanded() {
  $(".hamburger-icon").on("click", function (e) {
    $(e.currentTarget).hasClass("active") ? $(e.currentTarget).attr("aria-expanded", "true") : $(e.currentTarget).attr("aria-expanded", "false");
  });
}
function init() {
  toggleAriaExpanded();
}
/* harmony default export */ __webpack_exports__["default"] = ({
  init: init
});

/***/ }),

/***/ "./src/core/scripts/pfgc/pfgcConfig.js":
/*!*********************************************!*\
  !*** ./src/core/scripts/pfgc/pfgcConfig.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function setupPFGCConfig() {
  window.PFS = PFS || {};
  PFS.config = PFS.config || {};
  PFS.config.trackingConsent = {
    cookieKey: 'tracking_consent_pfgc',
    cookieSettings: ';path=/;max-age=31536000',
    bannerContainer: document.body,
    text: 'This website uses cookies. We use cookies in order to personalize content and ads and to analyze our web traffic.  We may share this data with our third party analytics and advertising partners. For further information on cookies we use and your options to opt out, please see our <a href="https://performancefoodservice.com/Company/Terms-of-Use-and-Privacy">cookie policy</a>.',
    btnYesText: 'Accept Cookies!',
    btnNoText: 'Do Not Sell or Share My Personal Information',
    btnConfirmOptOut: 'Confirm Opt-Out',
    btnBackText: 'Back',
    caliConsentText: 'As a California consumer you have the right to opt-out of the sale or sharing of  your personal information to third parties. We use third party cookies to collect information for analytics purposes and to place targeted advertisements. You may opt-out of the sale of personal information by un-checking the box below. If you choose not to opt-out and later wish to opt-out, please visit our California Privacy Policy for more information.',
    useCloseBtn: true,
    onConsentGiven: function onConsentGiven() {
      console.log('Consenting Standalone');
    }
  };
  PFS.config.skipToMainContentConfig = {
    text: 'Skip to main content'
  };
}
function init() {
  setupPFGCConfig();
}
/* harmony default export */ __webpack_exports__["default"] = ({
  init: init
});

/***/ }),

/***/ "./src/core/scripts/pfgc/tab-item.js":
/*!*******************************************!*\
  !*** ./src/core/scripts/pfgc/tab-item.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabItemControls() {
  $(".container.responsability .tab-item").on("keydown", function (e) {
    if (e.key === "Enter") {
      $(e.target).children('input').click();
    }
  });
}
function init() {
  tabItemControls();
}
/* harmony default export */ __webpack_exports__["default"] = ({
  init: init
});

/***/ }),

/***/ "./src/core/scripts/skip-to-main-content/index.js":
/*!********************************************************!*\
  !*** ./src/core/scripts/skip-to-main-content/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _skip_to_main_content_template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./skip-to-main-content-template */ "./src/core/scripts/skip-to-main-content/skip-to-main-content-template.js");
// import './polyfill';
// import bannerTemplate from './banner-template';

var defaultConfig = {
  text: 'Skip to main content',
  skipToMainContentContainer: document.body
};
var getConfig = function getConfig(cfg) {
  return cfg ? Object.assign({}, defaultConfig, cfg || {}) : null;
};
function showSkipToMainContentElement(config) {
  var tpl = document.createElement('template');
  tpl.innerHTML = Object(_skip_to_main_content_template__WEBPACK_IMPORTED_MODULE_0__["default"])(config);
  config.skipToMainContentContainer.insertBefore(tpl.content, config.skipToMainContentContainer.firstChild);
}
function init(cfg) {
  var config = getConfig(cfg);
  if (!config) {
    return;
  }
  showSkipToMainContentElement(config);
}
window.PFS = window.PFS || {};
window.PFS.components = window.PFS.components || {};
window.PFS.components.skipToMainContent = {
  init: init
};
/* harmony default export */ __webpack_exports__["default"] = ({
  init: init
});

/***/ }),

/***/ "./src/core/scripts/skip-to-main-content/skip-to-main-content-template.js":
/*!********************************************************************************!*\
  !*** ./src/core/scripts/skip-to-main-content/skip-to-main-content-template.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var skipToMainContentTemplate = function skipToMainContentTemplate(_ref) {
  var text = _ref.text;
  return "\n  <a class=\"skip-to-main-content\" href=\"#main\">\n  ".concat(text, "\n  </a>\n  ");
};
/* harmony default export */ __webpack_exports__["default"] = (skipToMainContentTemplate);

/***/ }),

/***/ "./src/core/scripts/tracking-consent-banner/banner-template.js":
/*!*********************************************************************!*\
  !*** ./src/core/scripts/tracking-consent-banner/banner-template.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var btnPositive = function btnPositive(text) {
  return text ? "<button class=\"btn consent-btn consent-btn-positive\" aria-hidden=\"false\">".concat(text, "</button>") : '';
};
var btnNegative = function btnNegative(text) {
  return text ? "<button class=\"btn consent-btn consent-btn-negative\" aria-hidden=\"false\">".concat(text, "</button>") : '';
};
var btnGoBack = function btnGoBack(text) {
  return text ? "<button class=\"btn consent-btn consent-btn-back hidden\" aria-hidden=\"true\">".concat(text, "</button>") : '';
};
var caliBtnNegative = function caliBtnNegative(text) {
  return text ? "<button class=\"btn consent-btn consent-btn-confirm hidden\" aria-hidden=\"true\">".concat(text, "</button>") : '';
};
var btnClose = function btnClose(use) {
  return use ? "<button aria-label=\"Close\" class=\"btn close-btn\">&times;</button>" : '';
};
var bannerTemplate = function bannerTemplate(_ref) {
  var text = _ref.text,
    btnYesText = _ref.btnYesText,
    btnNoText = _ref.btnNoText,
    useCloseBtn = _ref.useCloseBtn,
    btnBackText = _ref.btnBackText,
    btnConfirmOptOut = _ref.btnConfirmOptOut;
  return "\n    <section class=\"tracking-consent-banner\">\n    <p class=\"consent-message\" id=\"consent-message\">\n    ".concat(text, "\n    </p>\n    <div class=\"tracking-consent-banner__btn-container\">\n    ").concat(btnPositive(btnYesText), "\n    ").concat(btnNegative(btnNoText), "\n    ").concat(btnGoBack(btnBackText), "\n    ").concat(caliBtnNegative(btnConfirmOptOut), "\n    </div>\n    ").concat(btnClose(useCloseBtn), "\n    </section>\n  ");
};
/* harmony default export */ __webpack_exports__["default"] = (bannerTemplate);

/***/ }),

/***/ "./src/core/scripts/tracking-consent-banner/index.js":
/*!***********************************************************!*\
  !*** ./src/core/scripts/tracking-consent-banner/index.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfill */ "./src/core/scripts/tracking-consent-banner/polyfill/index.js");
/* harmony import */ var _banner_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./banner-template */ "./src/core/scripts/tracking-consent-banner/banner-template.js");


var defaultConfig = {
  text: 'using cookies?',
  btnYesText: null,
  btnNoText: null,
  btnConfirmOptOut: null,
  btnBackText: null,
  cookieKey: 'tracking_consent',
  cookieSettings: ';path=/;max-age=31536000',
  bannerContainer: document.body,
  onConsentGiven: null,
  caliConsentText: null
};
var getConfig = function getConfig(cfg) {
  return cfg ? Object.assign({}, defaultConfig, cfg || {}) : null;
};
var getCookieYesState = function getCookieYesState(cfg) {
  return "".concat(cfg.cookieKey, "=yes").concat(cfg.cookieSettings);
};
var getCookieNoState = function getCookieNoState(cfg) {
  return "".concat(cfg.cookieKey, "=no").concat(cfg.cookieSettings);
};
function onUserAccept(config) {
  document.cookie = getCookieYesState(config);
  hideTrackingConsentBanner();
  config.onConsentGiven();
}
function onUserRefuse(config) {
  document.cookie = getCookieNoState(config);
  hideTrackingConsentBanner();
}
function getTrackingCookie(config) {
  var cookie = document.cookie.split(';').filter(function (item) {
    return item.trim().indexOf(config.cookieKey) === 0;
  });
  return cookie.length ? cookie[0].trim() : null;
}
function registerConsentPanelListeners(config) {
  document.querySelector('.tracking-consent-banner').addEventListener('click', function (e) {
    if (e.target.classList.contains('consent-btn-positive')) {
      onUserAccept(config);
      // renderCaliConsent(config);
    } else if (e.target.classList.contains('consent-btn-negative')) {
      // onUserRefuse(config);
      renderCaliConsent(config);
    } else if (e.target.classList.contains('close-btn')) {
      hideTrackingConsentBanner();
    } else if (e.target.classList.contains('consent-btn-back')) {
      // re-render original text
      goBack(config);
    } else if (e.target.classList.contains('consent-btn-confirm')) {
      // set the cookie 
      onUserRefuse(config);
    }
  });
}
function showTrackingConsentBanner(config) {
  var tpl = document.createElement('template');
  tpl.innerHTML = Object(_banner_template__WEBPACK_IMPORTED_MODULE_1__["default"])(config);
  config.bannerContainer.insertBefore(tpl.content, config.bannerContainer.firstChild);
  registerConsentPanelListeners(config);
}
function hideTrackingConsentBanner() {
  var banner = document.querySelector('.tracking-consent-banner');
  banner.parentNode.removeChild(banner);
}
function renderCaliConsent(config) {
  document.querySelector('#consent-message').innerHTML = config.caliConsentText;
  hideGdprButtons();
  showCaliButtons();
}
function goBack(config) {
  document.querySelector('#consent-message').innerHTML = config.text;
  showGdprButtons();
  hideCaliButtons();
}

//Visibility controllers
function hideGdprButtons() {
  document.querySelector('.consent-btn-positive').classList.add('hidden');
  document.querySelector('.consent-btn-positive').setAttribute("aria-hidden", "true");
  document.querySelector('.consent-btn-negative').classList.add('hidden');
  document.querySelector('.consent-btn-negative').setAttribute("aria-hidden", "true");
}
function showGdprButtons() {
  document.querySelector('.consent-btn-positive').classList.remove('hidden');
  document.querySelector('.consent-btn-positive').setAttribute("aria-hidden", "false");
  document.querySelector('.consent-btn-negative').classList.remove('hidden');
  document.querySelector('.consent-btn-negative').setAttribute("aria-hidden", "false");
}
function hideCaliButtons() {
  document.querySelector('.consent-btn-back').classList.add('hidden');
  document.querySelector('.consent-btn-back').setAttribute("aria-hidden", "true");
  document.querySelector('.consent-btn-confirm').classList.add('hidden');
  document.querySelector('.consent-btn-confirm').setAttribute("aria-hidden", "true");
}
function showCaliButtons() {
  document.querySelector('.consent-btn-back').classList.remove('hidden');
  document.querySelector('.consent-btn-back').setAttribute("aria-hidden", "false");
  document.querySelector('.consent-btn-confirm').classList.remove('hidden');
  document.querySelector('.consent-btn-confirm').setAttribute("aria-hidden", "false");
}

// function initAnalytics() {
//   window.dataLayer = window.dataLayer || [];
//   function gtag() {
//     window.dataLayer.push(arguments);
//   }
//   gtag('js', new Date());
//   gtag('config', 'UA-61002187-3');
// }

// function initGTM() {
//   /*eslint-disable */
//   (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//   new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//   })(window,document,'script','dataLayer','GTM-TM54HGV');
//   /*eslint-enable */
// }

function initDoNotSellInformationUI(config) {
  var form = document.getElementById('do-not-sell-info-form');
  if (!form) return;
  var cb = form.querySelector('#do-not-sell-info-cb');
  var submitBtn = form.querySelector('#do-not-sell-info-submit');
  var validation = form.querySelector('#do-not-sell-info-validation');
  var confirmation = document.querySelector('#do-not-sell-info-confirmation');
  var continueBtn = confirmation.querySelector('#do-not-sell-info-continue');
  submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    validation.style.display = cb.checked ? 'none' : 'block';
    if (cb.checked) {
      document.cookie = getCookieNoState(config);
      form.style.display = 'none';
      confirmation.style.display = 'block';
    }
  });
  continueBtn.addEventListener('click', function () {
    return history.back();
  });
}
function init(cfg) {
  var config = getConfig(cfg);
  if (!config) {
    return;
  }
  var cookie = getTrackingCookie(config);
  if (!cookie && typeof config.onConsentGiven === 'function') {
    showTrackingConsentBanner(config);
  }
  if (cookie === "".concat(config.cookieKey, "=yes")) {
    config.onConsentGiven();
  }
  initDoNotSellInformationUI(config);
}
window.PFS = window.PFS || {};
window.PFS.components = window.PFS.components || {};
window.PFS.components.trackingConsentBanner = {
  init: init
};
/* harmony default export */ __webpack_exports__["default"] = ({
  init: init
});

/***/ }),

/***/ "./src/core/scripts/tracking-consent-banner/polyfill/assign.js":
/*!*********************************************************************!*\
  !*** ./src/core/scripts/tracking-consent-banner/polyfill/assign.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict';

      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

/***/ }),

/***/ "./src/core/scripts/tracking-consent-banner/polyfill/index.js":
/*!********************************************************************!*\
  !*** ./src/core/scripts/tracking-consent-banner/polyfill/index.js ***!
  \********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template */ "./src/core/scripts/tracking-consent-banner/polyfill/template.js");
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_template__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assign */ "./src/core/scripts/tracking-consent-banner/polyfill/assign.js");
/* harmony import */ var _assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assign__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ "./src/core/scripts/tracking-consent-banner/polyfill/template.js":
/*!***********************************************************************!*\
  !*** ./src/core/scripts/tracking-consent-banner/polyfill/template.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-disable */
/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

// minimal template polyfill
(function () {
  'use strict';

  var needsTemplate = typeof HTMLTemplateElement === 'undefined';
  var brokenDocFragment = !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment);
  var needsDocFrag = false;

  // NOTE: Replace DocumentFragment to work around IE11 bug that
  // causes children of a document fragment modified while
  // there is a mutation observer to not have a parentNode, or
  // have a broken parentNode (!?!)
  if (/Trident/.test(navigator.userAgent)) {
    (function () {
      needsDocFrag = true;
      var origCloneNode = Node.prototype.cloneNode;
      Node.prototype.cloneNode = function cloneNode(deep) {
        var newDom = origCloneNode.call(this, deep);
        if (this instanceof DocumentFragment) {
          newDom.__proto__ = DocumentFragment.prototype;
        }
        return newDom;
      };

      // IE's DocumentFragment querySelector code doesn't work when
      // called on an element instance
      DocumentFragment.prototype.querySelectorAll = HTMLElement.prototype.querySelectorAll;
      DocumentFragment.prototype.querySelector = HTMLElement.prototype.querySelector;
      Object.defineProperties(DocumentFragment.prototype, {
        'nodeType': {
          get: function get() {
            return Node.DOCUMENT_FRAGMENT_NODE;
          },
          configurable: true
        },
        'localName': {
          get: function get() {
            return undefined;
          },
          configurable: true
        },
        'nodeName': {
          get: function get() {
            return '#document-fragment';
          },
          configurable: true
        }
      });
      var origInsertBefore = Node.prototype.insertBefore;
      function insertBefore(newNode, refNode) {
        if (newNode instanceof DocumentFragment) {
          var child;
          while (child = newNode.firstChild) {
            origInsertBefore.call(this, child, refNode);
          }
        } else {
          origInsertBefore.call(this, newNode, refNode);
        }
        return newNode;
      }
      Node.prototype.insertBefore = insertBefore;
      var origAppendChild = Node.prototype.appendChild;
      Node.prototype.appendChild = function appendChild(child) {
        if (child instanceof DocumentFragment) {
          insertBefore.call(this, child, null);
        } else {
          origAppendChild.call(this, child);
        }
        return child;
      };
      var origRemoveChild = Node.prototype.removeChild;
      var origReplaceChild = Node.prototype.replaceChild;
      Node.prototype.replaceChild = function replaceChild(newChild, oldChild) {
        if (newChild instanceof DocumentFragment) {
          insertBefore.call(this, newChild, oldChild);
          origRemoveChild.call(this, oldChild);
        } else {
          origReplaceChild.call(this, newChild, oldChild);
        }
        return oldChild;
      };
      Document.prototype.createDocumentFragment = function createDocumentFragment() {
        var frag = this.createElement('df');
        frag.__proto__ = DocumentFragment.prototype;
        return frag;
      };
      var origImportNode = Document.prototype.importNode;
      Document.prototype.importNode = function importNode(impNode, deep) {
        deep = deep || false;
        var newNode = origImportNode.call(this, impNode, deep);
        if (impNode instanceof DocumentFragment) {
          newNode.__proto__ = DocumentFragment.prototype;
        }
        return newNode;
      };
    })();
  }

  // NOTE: we rely on this cloneNode not causing element upgrade.
  // This means this polyfill must load before the CE polyfill and
  // this would need to be re-worked if a browser supports native CE
  // but not <template>.
  var capturedCloneNode = Node.prototype.cloneNode;
  var capturedCreateElement = Document.prototype.createElement;
  var capturedImportNode = Document.prototype.importNode;
  var capturedRemoveChild = Node.prototype.removeChild;
  var capturedAppendChild = Node.prototype.appendChild;
  var capturedReplaceChild = Node.prototype.replaceChild;
  var capturedParseFromString = DOMParser.prototype.parseFromString;
  var capturedHTMLElementInnerHTML = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, 'innerHTML') || {
    /**
     * @this {!HTMLElement}
     * @return {string}
     */
    get: function get() {
      return this.innerHTML;
    },
    /**
     * @this {!HTMLElement}
     * @param {string}
     */
    set: function set(text) {
      this.innerHTML = text;
    }
  };
  var capturedChildNodes = Object.getOwnPropertyDescriptor(window.Node.prototype, 'childNodes') || {
    /**
     * @this {!Node}
     * @return {!NodeList}
     */
    get: function get() {
      return this.childNodes;
    }
  };
  var elementQuerySelectorAll = Element.prototype.querySelectorAll;
  var docQuerySelectorAll = Document.prototype.querySelectorAll;
  var fragQuerySelectorAll = DocumentFragment.prototype.querySelectorAll;
  var scriptSelector = 'script:not([type]),script[type="application/javascript"],script[type="text/javascript"]';
  function QSA(node, selector) {
    // IE 11 throws a SyntaxError with `scriptSelector` if the node has no children due to the `:not([type])` syntax
    if (!node.childNodes.length) {
      return [];
    }
    switch (node.nodeType) {
      case Node.DOCUMENT_NODE:
        return docQuerySelectorAll.call(node, selector);
      case Node.DOCUMENT_FRAGMENT_NODE:
        return fragQuerySelectorAll.call(node, selector);
      default:
        return elementQuerySelectorAll.call(node, selector);
    }
  }

  // returns true if nested templates cannot be cloned (they cannot be on
  // some impl's like Safari 8 and Edge)
  // OR if cloning a document fragment does not result in a document fragment
  var needsCloning = function () {
    if (!needsTemplate) {
      var t = document.createElement('template');
      var t2 = document.createElement('template');
      t2.content.appendChild(document.createElement('div'));
      t.content.appendChild(t2);
      var clone = t.cloneNode(true);
      return clone.content.childNodes.length === 0 || clone.content.firstChild.content.childNodes.length === 0 || brokenDocFragment;
    }
  }();
  var TEMPLATE_TAG = 'template';
  var PolyfilledHTMLTemplateElement = function PolyfilledHTMLTemplateElement() {};
  if (needsTemplate) {
    var contentDoc = document.implementation.createHTMLDocument('template');
    var canDecorate = true;
    var templateStyle = document.createElement('style');
    templateStyle.textContent = TEMPLATE_TAG + '{display:none;}';
    var head = document.head;
    head.insertBefore(templateStyle, head.firstElementChild);

    /**
      Provides a minimal shim for the <template> element.
    */
    PolyfilledHTMLTemplateElement.prototype = Object.create(HTMLElement.prototype);

    // if elements do not have `innerHTML` on instances, then
    // templates can be patched by swizzling their prototypes.
    var canProtoPatch = !document.createElement('div').hasOwnProperty('innerHTML');

    /**
      The `decorate` method moves element children to the template's `content`.
      NOTE: there is no support for dynamically adding elements to templates.
    */
    PolyfilledHTMLTemplateElement.decorate = function (template) {
      // if the template is decorated or not in HTML namespace, return fast
      if (template.content || template.namespaceURI !== document.documentElement.namespaceURI) {
        return;
      }
      template.content = contentDoc.createDocumentFragment();
      var child;
      while (child = template.firstChild) {
        capturedAppendChild.call(template.content, child);
      }
      // NOTE: prefer prototype patching for performance and
      // because on some browsers (IE11), re-defining `innerHTML`
      // can result in intermittent errors.
      if (canProtoPatch) {
        template.__proto__ = PolyfilledHTMLTemplateElement.prototype;
      } else {
        template.cloneNode = function (deep) {
          return PolyfilledHTMLTemplateElement._cloneNode(this, deep);
        };
        // add innerHTML to template, if possible
        // Note: this throws on Safari 7
        if (canDecorate) {
          try {
            defineInnerHTML(template);
            defineOuterHTML(template);
          } catch (err) {
            canDecorate = false;
          }
        }
      }
      // bootstrap recursively
      PolyfilledHTMLTemplateElement.bootstrap(template.content);
    };

    // Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/wrapMap.js
    var topLevelWrappingMap = {
      'option': ['select'],
      'thead': ['table'],
      'col': ['colgroup', 'table'],
      'tr': ['tbody', 'table'],
      'th': ['tr', 'tbody', 'table'],
      'td': ['tr', 'tbody', 'table']
    };
    var getTagName = function getTagName(text) {
      // Taken from https://github.com/jquery/jquery/blob/73d7e6259c63ac45f42c6593da8c2796c6ce9281/src/manipulation/var/rtagName.js
      return (/<([a-z][^/\0>\x20\t\r\n\f]+)/i.exec(text) || ['', ''])[1].toLowerCase();
    };
    var defineInnerHTML = function defineInnerHTML(obj) {
      Object.defineProperty(obj, 'innerHTML', {
        get: function get() {
          return getInnerHTML(this);
        },
        set: function set(text) {
          // For IE11, wrap the text in the correct (table) context
          var wrap = topLevelWrappingMap[getTagName(text)];
          if (wrap) {
            for (var i = 0; i < wrap.length; i++) {
              text = '<' + wrap[i] + '>' + text + '</' + wrap[i] + '>';
            }
          }
          contentDoc.body.innerHTML = text;
          PolyfilledHTMLTemplateElement.bootstrap(contentDoc);
          while (this.content.firstChild) {
            capturedRemoveChild.call(this.content, this.content.firstChild);
          }
          var body = contentDoc.body;
          // If we had wrapped, get back to the original node
          if (wrap) {
            for (var j = 0; j < wrap.length; j++) {
              body = body.lastChild;
            }
          }
          while (body.firstChild) {
            capturedAppendChild.call(this.content, body.firstChild);
          }
        },
        configurable: true
      });
    };
    var defineOuterHTML = function defineOuterHTML(obj) {
      Object.defineProperty(obj, 'outerHTML', {
        get: function get() {
          return '<' + TEMPLATE_TAG + '>' + this.innerHTML + '</' + TEMPLATE_TAG + '>';
        },
        set: function set(innerHTML) {
          if (this.parentNode) {
            contentDoc.body.innerHTML = innerHTML;
            var docFrag = this.ownerDocument.createDocumentFragment();
            while (contentDoc.body.firstChild) {
              capturedAppendChild.call(docFrag, contentDoc.body.firstChild);
            }
            capturedReplaceChild.call(this.parentNode, docFrag, this);
          } else {
            throw new Error("Failed to set the 'outerHTML' property on 'Element': This element has no parent node.");
          }
        },
        configurable: true
      });
    };
    defineInnerHTML(PolyfilledHTMLTemplateElement.prototype);
    defineOuterHTML(PolyfilledHTMLTemplateElement.prototype);

    /**
      The `bootstrap` method is called automatically and "fixes" all
      <template> elements in the document referenced by the `doc` argument.
    */
    PolyfilledHTMLTemplateElement.bootstrap = function bootstrap(doc) {
      var templates = QSA(doc, TEMPLATE_TAG);
      for (var i = 0, l = templates.length, t; i < l && (t = templates[i]); i++) {
        PolyfilledHTMLTemplateElement.decorate(t);
      }
    };

    // auto-bootstrapping for main document
    document.addEventListener('DOMContentLoaded', function () {
      PolyfilledHTMLTemplateElement.bootstrap(document);
    });

    // Patch document.createElement to ensure newly created templates have content
    Document.prototype.createElement = function createElement() {
      var el = capturedCreateElement.apply(this, arguments);
      if (el.localName === 'template') {
        PolyfilledHTMLTemplateElement.decorate(el);
      }
      return el;
    };
    DOMParser.prototype.parseFromString = function () {
      var el = capturedParseFromString.apply(this, arguments);
      PolyfilledHTMLTemplateElement.bootstrap(el);
      return el;
    };
    Object.defineProperty(HTMLElement.prototype, 'innerHTML', {
      get: function get() {
        return getInnerHTML(this);
      },
      set: function set(text) {
        capturedHTMLElementInnerHTML.set.call(this, text);
        PolyfilledHTMLTemplateElement.bootstrap(this);
      },
      configurable: true,
      enumerable: true
    });

    // http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#escapingString
    var escapeAttrRegExp = /[&\u00A0"]/g;
    var escapeDataRegExp = /[&\u00A0<>]/g;
    var escapeReplace = function escapeReplace(c) {
      switch (c) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "\xA0":
          return '&nbsp;';
      }
    };
    var escapeAttr = function escapeAttr(s) {
      return s.replace(escapeAttrRegExp, escapeReplace);
    };
    var escapeData = function escapeData(s) {
      return s.replace(escapeDataRegExp, escapeReplace);
    };
    var makeSet = function makeSet(arr) {
      var set = {};
      for (var i = 0; i < arr.length; i++) {
        set[arr[i]] = true;
      }
      return set;
    };

    // http://www.whatwg.org/specs/web-apps/current-work/#void-elements
    var voidElements = makeSet(['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
    var plaintextParents = makeSet(['style', 'script', 'xmp', 'iframe', 'noembed', 'noframes', 'plaintext', 'noscript']);

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @param {Function=} callback
     */
    var getOuterHTML = function getOuterHTML(node, parentNode, callback) {
      switch (node.nodeType) {
        case Node.ELEMENT_NODE:
          {
            var tagName = node.localName;
            var s = '<' + tagName;
            var attrs = node.attributes;
            for (var i = 0, attr; attr = attrs[i]; i++) {
              s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
            }
            s += '>';
            if (voidElements[tagName]) {
              return s;
            }
            return s + getInnerHTML(node, callback) + '</' + tagName + '>';
          }
        case Node.TEXT_NODE:
          {
            var data = /** @type {Text} */node.data;
            if (parentNode && plaintextParents[parentNode.localName]) {
              return data;
            }
            return escapeData(data);
          }
        case Node.COMMENT_NODE:
          {
            return '<!--' + /** @type {Comment} */node.data + '-->';
          }
        default:
          {
            window.console.error(node);
            throw new Error('not implemented');
          }
      }
    };

    /**
     * @param {Node} node
     * @param {Function=} callback
     */
    var getInnerHTML = function getInnerHTML(node, callback) {
      if (node.localName === 'template') {
        node = /** @type {HTMLTemplateElement} */node.content;
      }
      var s = '';
      var c$ = callback ? callback(node) : capturedChildNodes.get.call(node);
      for (var i = 0, l = c$.length, child; i < l && (child = c$[i]); i++) {
        s += getOuterHTML(child, node, callback);
      }
      return s;
    };
  }

  // make cloning/importing work!
  if (needsTemplate || needsCloning) {
    PolyfilledHTMLTemplateElement._cloneNode = function _cloneNode(template, deep) {
      var clone = capturedCloneNode.call(template, false);
      // NOTE: decorate doesn't auto-fix children because they are already
      // decorated so they need special clone fixup.
      if (this.decorate) {
        this.decorate(clone);
      }
      if (deep) {
        // NOTE: use native clone node to make sure CE's wrapped
        // cloneNode does not cause elements to upgrade.
        capturedAppendChild.call(clone.content, capturedCloneNode.call(template.content, true));
        // now ensure nested templates are cloned correctly.
        fixClonedDom(clone.content, template.content);
      }
      return clone;
    };

    // Given a source and cloned subtree, find <template>'s in the cloned
    // subtree and replace them with cloned <template>'s from source.
    // We must do this because only the source templates have proper .content.
    var fixClonedDom = function fixClonedDom(clone, source) {
      // do nothing if cloned node is not an element
      if (!source.querySelectorAll) return;
      // these two lists should be coincident
      var s$ = QSA(source, TEMPLATE_TAG);
      if (s$.length === 0) {
        return;
      }
      var t$ = QSA(clone, TEMPLATE_TAG);
      for (var i = 0, l = t$.length, t, s; i < l; i++) {
        s = s$[i];
        t = t$[i];
        if (PolyfilledHTMLTemplateElement && PolyfilledHTMLTemplateElement.decorate) {
          PolyfilledHTMLTemplateElement.decorate(s);
        }
        capturedReplaceChild.call(t.parentNode, cloneNode.call(s, true), t);
      }
    };

    // make sure scripts inside of a cloned template are executable
    var fixClonedScripts = function fixClonedScripts(fragment) {
      var scripts = QSA(fragment, scriptSelector);
      for (var ns, s, i = 0; i < scripts.length; i++) {
        s = scripts[i];
        ns = capturedCreateElement.call(document, 'script');
        ns.textContent = s.textContent;
        var attrs = s.attributes;
        for (var ai = 0, a; ai < attrs.length; ai++) {
          a = attrs[ai];
          ns.setAttribute(a.name, a.value);
        }
        capturedReplaceChild.call(s.parentNode, ns, s);
      }
    };

    // override all cloning to fix the cloned subtree to contain properly
    // cloned templates.
    var cloneNode = Node.prototype.cloneNode = function cloneNode(deep) {
      var dom;
      // workaround for Edge bug cloning documentFragments
      // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8619646/
      if (!needsDocFrag && brokenDocFragment && this instanceof DocumentFragment) {
        if (!deep) {
          return this.ownerDocument.createDocumentFragment();
        } else {
          dom = importNode.call(this.ownerDocument, this, true);
        }
      } else if (this.nodeType === Node.ELEMENT_NODE && this.localName === TEMPLATE_TAG && this.namespaceURI == document.documentElement.namespaceURI) {
        dom = PolyfilledHTMLTemplateElement._cloneNode(this, deep);
      } else {
        dom = capturedCloneNode.call(this, deep);
      }
      // template.content is cloned iff `deep`.
      if (deep) {
        fixClonedDom(dom, this);
      }
      return dom;
    };

    // NOTE: we are cloning instead of importing <template>'s.
    // However, the ownerDocument of the cloned template will be correct!
    // This is because the native import node creates the right document owned
    // subtree and `fixClonedDom` inserts cloned templates into this subtree,
    // thus updating the owner doc.
    var importNode = Document.prototype.importNode = function importNode(element, deep) {
      deep = deep || false;
      if (element.localName === TEMPLATE_TAG) {
        return PolyfilledHTMLTemplateElement._cloneNode(element, deep);
      } else {
        var dom = capturedImportNode.call(this, element, deep);
        if (deep) {
          fixClonedDom(dom, element);
          fixClonedScripts(dom);
        }
        return dom;
      }
    };
  }
  if (needsTemplate) {
    window.HTMLTemplateElement = PolyfilledHTMLTemplateElement;
  }
})();
/* eslint-enable */

/***/ }),

/***/ 0:
/*!*********************************************!*\
  !*** multi ./src/core/scripts/pfgc/main.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/mkrofcheck/Devel/pfg/PFS%20Microsites/src/core/scripts/pfgc/main.js */"./src/core/scripts/pfgc/main.js");


/***/ })

/******/ });
//# sourceMappingURL=pfgcScripts.bundle.js.map