/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/booking-form.js":
/*!*************************************!*\
  !*** ./src/modules/booking-form.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeBookingForm": function() { return /* binding */ closeBookingForm; },
/* harmony export */   "openBookingForm": function() { return /* binding */ openBookingForm; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);


function openBookingForm() {
  const bookSessionButtons = document.querySelectorAll('.book-session');
  const bookingFormOverlay = document.getElementsByClassName('booking-form-overlay')[0];
  const bookingFormContainer = document.getElementsByClassName('booking-form-container')[0];
  const spinnerLoader = document.getElementsByClassName('spinner-loader')[0];
  const eventInfo = document.getElementsByClassName('event-info')[0];
  bookSessionButtons.forEach(button => {
    button.addEventListener('click', e => {
      bookingFormOverlay.classList.add('active');
      spinnerLoader.classList.add('active');
      jquery__WEBPACK_IMPORTED_MODULE_0___default().getJSON(`http://brightonrope.local/wp-json/wp/v2/event/${e.target.id}`, event => {
        // console.log(event);
        const eventData = {
          id: event.id,
          name: event.title.rendered,
          venue: event.acf.venue,
          soldOut: event.acf.sold_out,
          allowSingles: event.acf.allow_single_tickets,
          individualPrices: event.acf.individual_ticket_price.split(','),
          pairPrices: event.acf.pair_ticket_price.split(','),
          startDate: convertDates(event.acf.start_date),
          endDate: convertDates(event.acf.end_date)
        };
        console.log(eventData.individualPrices);
        spinnerLoader.classList.remove('active');

        if (eventData.endDate) {
          eventInfo.innerHTML = `
            <h3>${eventData.name}</h3>
            <h4>${eventData.startDate}</h4>
            <h4>${eventData.endDate}</h4>
						<div class="booking-form-price-sub-container">
            	${eventData.individualPrices.map((item, i) => `<input type="radio" id="price-${item}" name="price" value=${item}>
							<label class="booking-form-sub-label" for="price-${item}">£${item}</label>`).join('')}
						</div>
          `;
        } else {
          eventInfo.innerHTML = `
            <h3>${eventData.name}</h3>
            <h4>${eventData.startDate}<h4>
          `;
        }
      });
    });
  });
}

function closeBookingForm() {
  const closeButton = document.getElementById('booking-form-close');
  const bookingForm = document.getElementsByClassName('booking-form-overlay')[0];
  closeButton.addEventListener('click', () => {
    bookingForm.classList.remove('active');
  });
}

function convertDates(date) {
  if (!date) {
    return;
  }

  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'long'
  };
  const year = date.substring(0, 4);
  const month = parseInt(date.substring(4, 6)) - 1;
  const day = date.substring(6, 8);
  const newDate = new Date(year, month, day);
  return new Intl.DateTimeFormat('en-GB', options).format(newDate);
}



/***/ }),

/***/ "./src/modules/mobile-nav.js":
/*!***********************************!*\
  !*** ./src/modules/mobile-nav.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ mobileNav; }
/* harmony export */ });
function mobileNav() {
  const hamburger = document.getElementById('hamburger');
  const topNavMenu = document.getElementsByClassName('menu-top-nav-container')[0];
  hamburger.addEventListener('click', () => {
    if (!topNavMenu.classList.contains('active')) {
      hamburger.innerHTML = '&#9747;';
      topNavMenu.classList.add('active');
    } else {
      hamburger.innerHTML = '&#9776;';
      topNavMenu.classList.remove('active');
    }
  });
  window.addEventListener('load', () => {
    topNavMenu.classList.remove('active');
  });
}

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

module.exports = window["jQuery"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_mobile_nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/mobile-nav */ "./src/modules/mobile-nav.js");
/* harmony import */ var _modules_booking_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/booking-form */ "./src/modules/booking-form.js");
//import module files

 //run functions from module files

(0,_modules_mobile_nav__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_modules_booking_form__WEBPACK_IMPORTED_MODULE_1__.closeBookingForm)();
(0,_modules_booking_form__WEBPACK_IMPORTED_MODULE_1__.openBookingForm)();
}();
/******/ })()
;
//# sourceMappingURL=index.js.map