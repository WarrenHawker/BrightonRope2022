/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/booking-form/booking-form.js":
/*!**************************************************!*\
  !*** ./src/modules/booking-form/booking-form.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeBookingForm": function() { return /* binding */ closeBookingForm; },
/* harmony export */   "openBookingForm": function() { return /* binding */ openBookingForm; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _html_templates_individual_participant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./html-templates/individual-participant */ "./src/modules/booking-form/html-templates/individual-participant.js");
/* harmony import */ var _html_templates_pair_participant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./html-templates/pair-participant */ "./src/modules/booking-form/html-templates/pair-participant.js");
/* harmony import */ var _html_templates_group_participant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./html-templates/group-participant */ "./src/modules/booking-form/html-templates/group-participant.js");





function openBookingForm() {
  const bookSessionButtons = document.querySelectorAll('.book-session');
  const bookingFormOverlay = document.getElementsByClassName('booking-form-overlay')[0];
  const spinnerLoader = document.getElementsByClassName('spinner-loader')[0];
  const eventInfo = document.getElementsByClassName('event-info')[0];
  const waitingListForm = document.getElementById('waiting-list-form');
  const bookingForm = document.getElementById('booking-form');
  const groupTicketsOnly = document.getElementById('group-tickets-only-message');
  const individualRadio = document.getElementById('booking-form-individual');
  const individualLabel = document.getElementById('individual-label');
  bookSessionButtons.forEach(button => {
    button.addEventListener('click', e => {
      bookingFormOverlay.classList.add('active');
      spinnerLoader.classList.add('active');
      waitingListForm.style.display = 'none';
      bookingForm.style.display = 'none';
      jquery__WEBPACK_IMPORTED_MODULE_0___default().getJSON(`http://brightonrope.local/wp-json/wp/v2/event/${e.target.id}`, event => {
        const eventData = {
          id: event.id,
          name: event.title.rendered,
          venue: event.acf.venue,
          soldOut: event.acf.sold_out,
          allowSingles: event.acf.allow_single_tickets,
          individualPrices: event.acf.individual_ticket_price.split(','),
          pairPrices: event.acf.group_ticket_price.split(','),
          startDate: convertDates(event.acf.start_date),
          endDate: convertDates(event.acf.end_date),
          startTime: convertTimes(event.acf.start_time),
          endTime: convertTimes(event.acf.end_time)
        };
        spinnerLoader.classList.remove('active');

        if (eventData.soldOut) {
          waitingListForm.style.display = 'block';
          bookingForm.style.display = 'none';
          const submitBtn = document.getElementById('waiting-list-submit');
          submitBtn.addEventListener('click', waitingListFormValidation);
        } else {
          bookingForm.style.display = 'block';
          waitingListForm.style.display = 'none';
          showBookingFormPages();
          showParticipantContainers(eventData); //runs showPricesContainer function
        }

        if (!eventData.allowSingles) {
          groupTicketsOnly.style.display = 'block';
          individualRadio.parentElement.style.display = 'none';
          individualLabel.innerHTML = `Are you booking as a pair or a group?<span class="required"> * </span>`;
        } else {
          groupTicketsOnly.style.display = 'none';
          individualRadio.parentElement.style.display = 'flex';
          individualLabel.innerHTML = `Are you booking as an individual or group?<span class="required"> * </span>`;
        }

        if (eventData.endDate) {
          eventInfo.innerHTML = `
				    <h3 class="no-margin no-padding">${eventData.name}</h3>
				    <h4 class="no-margin no-padding">${eventData.startDate} - ${eventData.endDate}</h4>
						<h4 class="no-margin no-padding">${eventData.startTime} - ${eventData.endTime}</h4> 
				  `;
        } else {
          eventInfo.innerHTML = `
				    <h3 class="no-margin no-padding">${eventData.name}</h3>
				    <h4 class="no-margin no-padding">${eventData.startDate}</h4>
						<h4 class="no-margin no-padding">${eventData.startTime} - ${eventData.endTime}</h4> 
				  `;
        }
      });
    });
  });
}

function showParticipantContainers(data) {
  const individualOrGroupRadio = [...document.querySelectorAll('input[name="individualOrGroup"]')];
  const participantContainerGroup = document.getElementById('participant-container-group');
  individualOrGroupRadio.forEach(radio => {
    radio.addEventListener('click', () => {
      let individualOrGroup = document.querySelector('input[name="individualOrGroup"]:checked').value;

      if (individualOrGroup == 'individual') {
        participantContainerGroup.innerHTML = (0,_html_templates_individual_participant__WEBPACK_IMPORTED_MODULE_1__["default"])();
        showPricesContainer(data.individualPrices);
      } else if (individualOrGroup == 'pair') {
        participantContainerGroup.innerHTML = (0,_html_templates_pair_participant__WEBPACK_IMPORTED_MODULE_2__["default"])();
        showPricesContainer(data.pairPrices);
      } else if (individualOrGroup == 'group') {
        participantContainerGroup.innerHTML = (0,_html_templates_group_participant__WEBPACK_IMPORTED_MODULE_3__["default"])();
        showPricesContainer(data.pairPrices);
      }
    });
  });
}

function closeBookingForm() {
  const closeButton = document.getElementById('booking-form-close');
  const bookingFormOverlay = document.getElementsByClassName('booking-form-overlay')[0];
  const bookingFormPages = [...document.getElementsByClassName('booking-form-page')];
  const steps = [...document.getElementsByClassName('step')];
  const bookingForm = document.querySelector('[data-multi-step]');
  const waitingListForm = document.getElementById('waiting-list-form');
  const submitBtn = document.getElementById('waiting-list-submit');
  closeButton.addEventListener('click', () => {
    bookingFormOverlay.classList.remove('active');

    if (bookingForm.style.display == 'block') {
      bookingForm.removeEventListener('click', bookingFormValidation);
      bookingFormPages.forEach(page => page.classList.remove('active'));
      steps.forEach(page => page.classList.remove('active'));
      steps.forEach(page => page.classList.remove('finish'));
    } else if (waitingListForm.style.display == 'block') {
      submitBtn.removeEventListener('click', waitingListFormValidation);
    }

    const inputs = [...document.querySelectorAll('input'), ...document.querySelectorAll('select')];
    inputs.forEach(input => {
      if (input.type == 'radio') {
        input.parentElement.parentElement.classList.remove('invalid');
      } else {
        input.parentElement.classList.remove('invalid');
      }
    });
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

function convertTimes(time) {
  return time.substring(0, 5);
}

function waitingListFormValidation() {
  const form = document.getElementById('waiting-list-form');
  const inputs = [...form.querySelectorAll('input'), ...form.querySelectorAll('select')];

  for (let i = 0; i < inputs.length; i++) {
    if (!inputs[i].checkValidity()) {
      if (inputs[i].type == 'radio') {
        inputs[i].parentElement.parentElement.classList.add('invalid');
      } else {
        inputs[i].parentElement.classList.add('invalid');
      }
    } else {
      if (inputs[i].type == 'radio') {
        inputs[i].parentElement.parentElement.classList.remove('invalid');
      } else {
        inputs[i].parentElement.classList.remove('invalid');
      }
    }

    inputs[i].oninput = function (e) {
      if (inputs[i].type == 'radio') {
        e.target.parentElement.parentElement.classList.remove('invalid');
      } else {
        e.target.parentElement.classList.remove('invalid');
      }
    };
  }
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
    showCurrentPage(formPages, currentPage);
    setStepIndicator(currentPage);
  }

  bookingForm.addEventListener('click', bookingFormValidation);
}

function showPricesContainer(prices) {
  const pricesContainer = document.getElementById('prices-container');
  pricesContainer.innerHTML = `
		<p>Our sessions run on a Pay-What-You-Can system.</p> 
		<p class="label">Please select the total amount you wish to pay <span class="required"> * </span></p>
		<div class="radio-group-container">
		${prices.map(item => `
					<div class="radio-sub-container">
					<input type="radio" id="price-${item}" name="price" value=${item} required><label class="booking-form-sub-label" for="price-${item}">£${item}</label>
					</div>
					`).join('')}
		</div>
	`;
}

function bookingFormValidation(e) {
  const bookingForm = document.querySelector('[data-multi-step]');
  const formPages = [...bookingForm.querySelectorAll('[data-step]')];
  let currentPage = formPages.findIndex(page => {
    return page.classList.contains('active');
  });
  let incrementor;

  if (e.target.matches('[data-next]')) {
    incrementor = 1;
    const inputs = [...formPages[currentPage].querySelectorAll('input'), ...formPages[currentPage].querySelectorAll('select')];
    const allValid = inputs.every(input => input.reportValidity());

    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].checkValidity()) {
        if (inputs[i].type == 'radio') {
          inputs[i].parentElement.parentElement.classList.add('invalid');
        } else {
          inputs[i].parentElement.classList.add('invalid');
        }
      } else {
        if (inputs[i].type == 'radio') {
          inputs[i].parentElement.parentElement.classList.remove('invalid');
        } else {
          inputs[i].parentElement.classList.remove('invalid');
        }
      }

      inputs[i].oninput = function (e) {
        if (inputs[i].type == 'radio') {
          e.target.parentElement.parentElement.classList.remove('invalid');
        } else {
          e.target.parentElement.classList.remove('invalid');
        }
      };
    }

    if (allValid) {
      currentPage += incrementor;
    }
  } else if (e.target.matches('[data-prev]')) {
    incrementor = -1;
    currentPage += incrementor;
  }

  if (incrementor == null) return;
  showCurrentPage(formPages, currentPage);
  setStepIndicator(currentPage);
}

function showCurrentPage(formPages, currentPage) {
  formPages.forEach((page, index) => {
    page.classList.toggle('active', index === currentPage);
  });
}

function setStepIndicator(currentPage) {
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



/***/ }),

/***/ "./src/modules/booking-form/html-templates/group-participant.js":
/*!**********************************************************************!*\
  !*** ./src/modules/booking-form/html-templates/group-participant.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ groupParticipant; }
/* harmony export */ });
function groupParticipant() {
  return `
    <fieldset class="participant-container">
      <p class="label">Participant 1 Name<span class="required"> * </span></p>
      <div class="input-container">
        <input type="text" name="fname1" required>
        <label class="sub-label" for="fname1">First</label>
      </div>
      <div class="input-container">
        <input type="text" name="lname1" required>
        <label class="sub-label" for="lname1">Last</label>
      </div>
    </fieldset>

    <fieldset class="participant-container">
      <p class="label">Participant 2 Name<span class="required"> * </span></p>
      <div class="input-container">
        <input type="text" name="fname2" required>
        <label class="sub-label" for="fname2">First</label>
      </div>
      <div class="input-container">
        <input type="text" name="lname2" required>
        <label class="sub-label" for="lname2">Last</label>
      </div>
    </fieldset>

    <fieldset class="participant-container">
      <p class="label">Participant 3 Name<span class="required"> * </span></p>
      <div class="input-container">
        <input type="text" name="fname3" required>
        <label class="sub-label" for="fname3">First</label>
      </div>
      <div class="input-container">
        <input type="text" name="lname3" required>
        <label class="sub-label" for="lname3">Last</label>
      </div>
    </fieldset>
  `;
}

/***/ }),

/***/ "./src/modules/booking-form/html-templates/individual-participant.js":
/*!***************************************************************************!*\
  !*** ./src/modules/booking-form/html-templates/individual-participant.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ individualParticipant; }
/* harmony export */ });
function individualParticipant() {
  return `
    <fieldset class="participant-container">
      <p class="label">Participant Name<span class="required"> * </span></p>
      <div class="input-container">
        <input type="text" name="fname1" required>
        <label class="sub-label" for="fname1">First</label>
      </div>
      <div class="input-container">
        <input type="text" name="lname1" required>
        <label class="sub-label" for="lname1">Last</label>
      </div>
    </fieldset>
  `;
}

/***/ }),

/***/ "./src/modules/booking-form/html-templates/pair-participant.js":
/*!*********************************************************************!*\
  !*** ./src/modules/booking-form/html-templates/pair-participant.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ pairParticipant; }
/* harmony export */ });
function pairParticipant() {
  return `
    <fieldset class="participant-container">
      <p class="label">Participant 1 Name<span class="required"> * </span></p>
      <div class="input-container">
        <input type="text" name="fname1" required>
        <label class="sub-label" for="fname1">First</label>
      </div>
      <div class="input-container">
        <input type="text" name="lname1" required>
        <label class="sub-label" for="lname1">Last</label>
      </div>
    </fieldset>

    <fieldset class="participant-container">
      <p class="label">Participant 2 Name<span class="required"> * </span></p>
      <div class="input-container">
        <input type="text" name="fname2" required>
        <label class="sub-label" for="fname2">First</label>
      </div>
      <div class="input-container">
        <input type="text" name="lname2" required>
        <label class="sub-label" for="lname2">Last</label>
      </div>
    </fieldset>
  `;
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
/* harmony import */ var _modules_booking_form_booking_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/booking-form/booking-form */ "./src/modules/booking-form/booking-form.js");
//import module files

 //run functions from module files

(0,_modules_mobile_nav__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_modules_booking_form_booking_form__WEBPACK_IMPORTED_MODULE_1__.closeBookingForm)();
(0,_modules_booking_form_booking_form__WEBPACK_IMPORTED_MODULE_1__.openBookingForm)();
}();
/******/ })()
;
//# sourceMappingURL=index.js.map