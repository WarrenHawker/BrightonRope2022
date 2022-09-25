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
  const spinnerLoader = document.getElementsByClassName('spinner-loader')[0];
  const eventInfo = document.getElementsByClassName('event-info')[0];
  const waitingListForm = document.getElementById('waiting-list-form');
  const bookingForm = document.getElementById('booking-form');
  bookSessionButtons.forEach(button => {
    button.addEventListener('click', e => {
      bookingFormOverlay.classList.add('active');
      spinnerLoader.classList.add('active');
      waitingListForm.style.display = 'none';
      bookingForm.style.display = 'none';
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
        spinnerLoader.classList.remove('active');

        if (eventData.soldOut) {
          waitingListForm.style.display = 'block';
          bookingForm.style.display = 'none';
        } else {
          bookingForm.style.display = 'block';
          waitingListForm.style.display = 'none';
          showBookingFormPages();
        }

        if (eventData.endDate) {
          eventInfo.innerHTML = `
				    <h3 class="no-margin no-padding">${eventData.name}</h3>
				    <h4 class="no-margin no-padding">${eventData.startDate} - ${eventData.endDate}</h4>
				  `;
        } else {
          eventInfo.innerHTML = `
				    <h3 class="no-margin no-padding">${eventData.name}</h3>
				    <h4 class="no-margin no-padding">${eventData.startDate}<h4>
				  `;
        }
      });
    });
  });
}

function closeBookingForm() {
  const closeButton = document.getElementById('booking-form-close');
  const bookingFormOverlay = document.getElementsByClassName('booking-form-overlay')[0];
  const bookingFormPages = [...document.getElementsByClassName('booking-form-page')];
  const steps = [...document.getElementsByClassName('step')];
  closeButton.addEventListener('click', () => {
    bookingFormOverlay.classList.remove('active');
    bookingFormPages.forEach(page => page.classList.remove('active'));
    steps.forEach(page => page.classList.remove('active'));
    steps.forEach(page => page.classList.remove('finish'));
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

function showBookingFormPages() {
  const bookingForm = document.querySelector('[data-multi-step]');
  const formPages = [...bookingForm.querySelectorAll('[data-step]')];
  bookingForm.reset();
  let currentPage = formPages.findIndex(page => {
    return page.classList.contains('active');
  });

  if (currentPage < 0) {
    currentPage = 0;
    formPages[currentPage].classList.add('active');
    showCurrentPage();
    setStepIndicator();
  }

  bookingForm.addEventListener('click', e => {
    let incrementor;

    if (e.target.matches('[data-next]')) {
      incrementor = 1;
    } else if (e.target.matches('[data-prev]')) {
      incrementor = -1;
    }

    if (incrementor == null) return;
    const inputs = [...formPages[currentPage].querySelectorAll('input')];
    const allValid = inputs.every(input => input.reportValidity());

    if (allValid) {
      currentPage += incrementor;
      showCurrentPage();
      setStepIndicator();
    }
  });

  function showCurrentPage() {
    formPages.forEach((page, index) => {
      page.classList.toggle('active', index === currentPage);
    });
  }

  function setStepIndicator() {
    const steps = [...document.getElementsByClassName('step')];
    steps.forEach((step, index) => {
      if (index == currentPage) {
        step.classList.add('active');
        step.classList.remove('finish');
      } else if (index < currentPage) {
        step.classList.add('finish');
        step.classList.remove('active');
      } else {
        step.classList.remove('finish');
        step.classList.remove('active');
      }
    });
  }
}


{
  /* <div class="booking-form-price-sub-container">
             	${eventData.individualPrices
  							.map(
  								(item) => `<input type="radio" id="price-${item}" name="price" value=${item}>
  						<label class="booking-form-sub-label" for="price-${item}">£${item}</label>`
  							)
  							.join('')}
  					</div> */
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