/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/backend/admin-form.js":
/*!***********************************!*\
  !*** ./src/backend/admin-form.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeAdminForm": function() { return /* binding */ closeAdminForm; },
/* harmony export */   "openAdminForm": function() { return /* binding */ openAdminForm; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _html_templates_add_inquiry_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./html-templates/add-inquiry-form */ "./src/backend/html-templates/add-inquiry-form.js");
/* harmony import */ var _html_templates_add_participant_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./html-templates/add-participant-form */ "./src/backend/html-templates/add-participant-form.js");



const formSubContainer = document.querySelector('.admin-form-sub-container');
const formOverlay = document.querySelector('.admin-form-overlay');

function openAdminForm(eventID, type) {
  formOverlay.classList.add('active');
  let data = {
    action: 'admin_is_event_full',
    eventID: eventID
  };
  jquery__WEBPACK_IMPORTED_MODULE_0___default().post(ajaxData.ajaxurl, data, function (response) {
    const responseData = JSON.parse(response);

    if (type == 'participant') {
      formSubContainer.innerHTML = (0,_html_templates_add_participant_form__WEBPACK_IMPORTED_MODULE_2__["default"])(eventID, responseData.sold_out, responseData.title);
    } else if (type == 'inquiry') {
      formSubContainer.innerHTML = (0,_html_templates_add_inquiry_form__WEBPACK_IMPORTED_MODULE_1__["default"])(eventID);
    }
  });
}

function closeAdminForm() {
  const closeButton = document.getElementById('admin-form-close');
  closeButton.addEventListener('click', () => {
    formOverlay.classList.remove('active');
    formSubContainer.empty();
  });
}



/***/ }),

/***/ "./src/backend/html-templates/add-inquiry-form.js":
/*!********************************************************!*\
  !*** ./src/backend/html-templates/add-inquiry-form.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ addInquiryForm; }
/* harmony export */ });
function addInquiryForm() {
  return `
			
		`;
}

/***/ }),

/***/ "./src/backend/html-templates/add-participant-form.js":
/*!************************************************************!*\
  !*** ./src/backend/html-templates/add-participant-form.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ addParticipantForm; }
/* harmony export */ });
function addParticipantForm(eventID, isEventFull, title) {
  return `
			<form class="admin-form add-participants">
				<h1>Add new participants to event: ${title}</h1>
				<h2 class='event-full-message'>
					${isEventFull ? `WARNING: this event is full, are you sure you wish to add a new participant??` : ''}
				</h2>
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
					<p class="label">Participant 2 Name</p>
					<div class="input-container">
						<input type="text" name="fname2">
						<label class="sub-label" for="fname2">First</label>
					</div>
					<div class="input-container">
						<input type="text" name="lname2">
						<label class="sub-label" for="lname2">Last</label>
					</div>
				</fieldset>

				<fieldset class="participant-container">
					<p class="label">Participant 3 Name</p>
					<div class="input-container">
						<input type="text" name="fname3">
						<label class="sub-label" for="fname3">First</label>
					</div>
					<div class="input-container">
						<input type="text" name="lname3">
						<label class="sub-label" for="lname3">Last</label>
					</div>
				</fieldset>

				<fieldset class="input-container email ">
          <label class="label" for="email">Email<span class="required"> * </span></label>
          <input type="email" name="email" required>
        </fieldset>

				<fieldset class="input-container info">
          <label class="label" for="additional-info">Additional Information</label>
          <textarea name="additional-info"></textarea>
        </fieldset>

				<button class="btn-admin primary large">Submit</button>
			</form>
		`;
}

/***/ }),

/***/ "./src/backend/html-templates/participants-table.js":
/*!**********************************************************!*\
  !*** ./src/backend/html-templates/participants-table.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ participantsTable; }
/* harmony export */ });
function participantsTable(data) {
  const participantDisplay = data.map(item => {
    // prettier-ignore
    return `
        <li class="table-row body" id="participant-row-${item.Booking_ID}">
          <div class="table-item non-input" data-name='ID'>${item.Booking_ID}</div>
          <div class="table-column single">
            <div class="table-item" data-name='Participant 1'>
              <input type="text" value="${item.Participant_1}" disabled></input>
            </div>
            <div class="table-item" data-name='Participant 2'>
              <input type="text" value="${item.Participant_2}" disabled></input>
            </div>
            <div class="table-item" data-name='Participant 3'>
              <input type="text" value="${item.Participant_3}" disabled></input>
            </div>
            <div class="table-item" data-name='Email'>
              <input type="text" value="${item.Email}" disabled></input>
            </div>
          </div>
          <div class="table-item" data-name='Additional Info'>
            <textarea disabled>${item.Additional_info}</textarea>
          </div>
          <div class="table-column double">
            <div class="table-item non-input" data-name='Amount Paid'>??${item.Amount_paid}</div>
            <div class="table-item non-input" data-name='Submission Date'>${convertDates(item.Submission_date)}</div>
          </div>
          <div class="table-item" data-name='Admin Notes'>
            <textarea disabled>${item.Notes}</textarea>
          </div>
          <div class="participant-action-buttons">
            <button class="btn-admin btn-participant-edit" id="btn-participant-edit-${item.Booking_ID}">Edit</button>
            <button class="btn-admin">Move</button>
            <button class="btn-admin delete btn-participant-delete" id="btn-participant-delete-${item.Booking_ID}">Delete</button>
          </div>
          <div class="participant-edit-buttons">
            <button class="btn-admin btn-participant-cancel" id="btn-participant-cancel-${item.Booking_ID}">Cancel</button>
            <button class="btn-admin primary btn-participant-save" id="btn-participant-save-${item.Booking_ID}">Save</button>
          </div>
        </li>
      `;
  }).join(''); // prettier-ignore

  return `
  <div class="table-heading">
    <h1 id="participants-table-header">Event Participants</h1>
    <button class="btn-admin primary large" id="add-participant">Add new Participant</button>
  </div>
  <div class="participant-table">
    <ol>
      <li class="table-row head">
        <div class="table-item">ID</div>
        <div class="table-column single">
            <div class="table-item">Participant 1</div>
            <div class="table-item">Participant 2</div>
            <div class="table-item">Participant 3</div>
            <div class="table-item">Email</div>
        </div>
        <div class="table-item">Additional Information</div>
        <div class="table-column double">
          <div class="table-item">Amount <br> Paid</div>
          <div class="table-item">Submission <br> Date</div>
        </div>
        <div class="table-item">Admin Notes</div>
      </li>
      ${participantDisplay}
    </ol>
  </div>
  `;
}

function convertDates(date) {
  if (!date) {
    return;
  }

  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US');
}

/***/ }),

/***/ "./src/backend/html-templates/waiting-list-table.js":
/*!**********************************************************!*\
  !*** ./src/backend/html-templates/waiting-list-table.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ waitingListTable; }
/* harmony export */ });
function waitingListTable(data) {
  const waitingListDisplay = data.map(item => {
    // prettier-ignore
    return `
				<li class="table-row body" id="waiting-list-row-${item.Inquiry_ID}">
					<div class="table-item non-input" data-name='ID'>${item.Inquiry_ID}</div>
					<div class="table-item" data-name='Name'>
						<input type="text" value="${item.Inquiry_Name}" disabled></input>
					</div>
					<div class="table-item"data-name='Email'>
						<input type="text" value="${item.Email}" disabled></input>
					</div>
					<div class="table-item" data-name='Participants'>
						<select disabled>
							<option value="Individual">Individual</option>
							<option value="Pair">Pair</option>
							<option value="Group">Group</option>
						</select>
					</div>
					<div class="table-item non-input" data-name='Submission Date'>${convertDates(item.Submission_date)}</div>
					<div class="table-item" data-name='Notes'>
						<textarea disabled>${item.Notes}</textarea>
					</div>
					<div class="waiting-list-action-buttons">
            <button class="btn-admin btn-waiting-list-edit" id="btn-participant-edit-${item.Inquiry_ID}">Edit</button>
            <button class="btn-admin">Move</button>
            <button class="btn-admin delete btn-waiting-list-delete" id="btn-waiting-list-delete-${item.Inquiry_ID}">Delete</button>
          </div>
          <div class="waiting-list-edit-buttons">
            <button class="btn-admin btn-waiting-list-cancel" id="btn-waiting-list-cancel-${item.Inquiry_ID}">Cancel</button>
            <button class="btn-admin primary btn-waiting-list-save" id="btn-waiting-list-save-${item.Inquiry_ID}">Save</button>
          </div>
			</li>
    `;
  }).join(''); // prettier-ignore

  return `
  <div class="table-heading">
    <h1 id="waiting-list-table-header">Waiting List</h1>
    <button class="btn-admin primary large" id="add-inquiry">Add new Inquiry</button>
  </div>
  <div class="waiting-list-table">
    <ol>
      <li class="table-row head">
        <div class="table-item">ID</div>
        <div class="table-item">Name</div>
        <div class="table-item">Email</div>
				<div class="table-item">Participants</div>
        <div class="table-item">Submission <br> Date</div>
        <div class="table-item">Notes</div>
      </li>
			${waitingListDisplay}
    </ol>
  </div>
  `;
}

function convertDates(date) {
  if (!date) {
    return;
  }

  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US');
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
/*!******************************!*\
  !*** ./src/backend/admin.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _html_templates_participants_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./html-templates/participants-table */ "./src/backend/html-templates/participants-table.js");
/* harmony import */ var _html_templates_waiting_list_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./html-templates/waiting-list-table */ "./src/backend/html-templates/waiting-list-table.js");
/* harmony import */ var _html_templates_add_participant_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./html-templates/add-participant-form */ "./src/backend/html-templates/add-participant-form.js");
/* harmony import */ var _html_templates_add_inquiry_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./html-templates/add-inquiry-form */ "./src/backend/html-templates/add-inquiry-form.js");
/* harmony import */ var _admin_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./admin-form */ "./src/backend/admin-form.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_5__);





 //calls getEventParticipants function

function eventMonthSelect() {
  jquery__WEBPACK_IMPORTED_MODULE_5___default()(window).load(function () {
    let data = {
      action: 'admin_get_events',
      month: 'all'
    };
    jquery__WEBPACK_IMPORTED_MODULE_5___default().post(ajaxData.ajaxurl, data, function (response) {
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#admin-event-table').html(response);
      getEventParticipants();
    });
  });
  jquery__WEBPACK_IMPORTED_MODULE_5___default()('#event-month').change(function (e) {
    let selectedMonth = e.target.value;
    let data = {
      action: 'admin_get_events',
      month: selectedMonth
    };
    jquery__WEBPACK_IMPORTED_MODULE_5___default().post(ajaxData.ajaxurl, data, function (response) {
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#admin-event-table').html(response);
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#event-participant-table').empty();
      jquery__WEBPACK_IMPORTED_MODULE_5___default()('#event-waiting-list-table').empty();
      getEventParticipants();
    });
  });
} //calls setParticipantRowEdit and setWaitingListRowEdit functions
//contains add participant and inquiry event listeners


function getEventParticipants(e) {
  const adminEventRows = [...document.getElementsByClassName('admin-event-row')];
  adminEventRows.forEach(row => {
    row.addEventListener('click', e => {
      const tableRows = [...document.querySelectorAll('.admin-event-row')];
      const btnBack = document.getElementById('btn-back-events');
      tableRows.forEach(row => {
        if (row == e.target.parentElement) {
          row.classList.add('active');
        } else {
          row.classList.remove('active');
          row.classList.add('hidden');
        }
      });
      btnBack.style.display = 'block';
      let dataParticipants = {
        action: 'admin_get_participants',
        eventID: e.target.parentElement.id
      };
      let dataWaitingList = {
        action: 'admin_get_waiting_list',
        eventID: e.target.parentElement.id
      };
      jquery__WEBPACK_IMPORTED_MODULE_5___default().post(ajaxData.ajaxurl, dataParticipants, function (response) {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()('#participant-table-container').html((0,_html_templates_participants_table__WEBPACK_IMPORTED_MODULE_0__["default"])(JSON.parse(response)));
        setParticipantRowEdit();
        const addParticipantButton = document.getElementById('add-participant');
        addParticipantButton.addEventListener('click', () => (0,_admin_form__WEBPACK_IMPORTED_MODULE_4__.openAdminForm)(dataParticipants.eventID, 'participant'));
      });
      jquery__WEBPACK_IMPORTED_MODULE_5___default().post(ajaxData.ajaxurl, dataWaitingList, function (response) {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()('#waiting-list-table-container').html((0,_html_templates_waiting_list_table__WEBPACK_IMPORTED_MODULE_1__["default"])(JSON.parse(response)));
        setWaitingListRowEdit();
        const addInquiryButton = document.getElementById('add-inquiry');
        addInquiryButton.addEventListener('click', () => (0,_admin_form__WEBPACK_IMPORTED_MODULE_4__.openAdminForm)(dataParticipants.eventID, 'inquiry'));
      });
    });
  });
} //back button - shows all events from filter


function showAllEvents() {
  const btnBack = document.getElementById('btn-back-events');
  btnBack.addEventListener('click', () => {
    const tableRows = [...document.querySelectorAll('.admin-event-row')];
    const btnBack = document.getElementById('btn-back-events');
    tableRows.forEach(row => {
      row.classList.remove('active');
      row.classList.remove('hidden');
    });
    btnBack.style.display = 'none';
    jquery__WEBPACK_IMPORTED_MODULE_5___default()('#participant-table-container').empty();
    jquery__WEBPACK_IMPORTED_MODULE_5___default()('#waiting-list-table-container').empty();
  });
} //contains table header mobile and participant action button event listeners


function setParticipantRowEdit() {
  const editButtons = [...document.getElementsByClassName('btn-participant-edit')];
  const cancelButtons = [...document.getElementsByClassName('btn-participant-cancel')];
  const saveButtons = [...document.getElementsByClassName('btn-participant-save')];
  const deleteButtons = [...document.getElementsByClassName('btn-participant-delete')];
  const tableRows = [...document.querySelectorAll('.participant-table .table-row.body')];
  const participantsHeader = document.getElementById('participants-table-header');
  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      const ID = button.id.slice(21);
      tableRows.forEach(row => {
        if (row.id == `participant-row-${ID}`) {
          row.classList.add('edit');
        } else {
          row.classList.remove('edit');
        }
      });
      updateParticipantTableDisplay();
    });
  });
  cancelButtons.forEach(button => {
    button.addEventListener('click', e => {
      const ID = button.id.slice(23);
      tableRows.forEach(row => {
        if (row.id == `participant-row-${ID}`) {
          row.classList.remove('edit');
        }
      });
      updateParticipantTableDisplay();
      updateParticipantInfo(e, ID);
    });
  });
  saveButtons.forEach(button => {
    button.addEventListener('click', e => {
      const ID = button.id.slice(21);
      tableRows.forEach(row => {
        if (row.id == `participant-row-${ID}`) {
          row.classList.remove('edit');
        }
      });
      updateParticipantTableDisplay();
      updateParticipantInfo(e, ID);
    });
  });
  deleteButtons.forEach(button => {
    button.addEventListener('click', e => {
      const ID = button.id.slice(23);
      tableRows.forEach(row => {
        if (row.id == `participant-row-${ID}`) {
          row.classList.remove('edit');
        }
      });
      updateParticipantTableDisplay();
      updateParticipantInfo(e, ID);
    });
  });
  participantsHeader.addEventListener('click', () => {
    document.querySelector('.participant-table').classList.toggle('show');
    participantsHeader.classList.toggle('show');
  });
}

function updateParticipantTableDisplay() {
  const tablesContainer = document.getElementsByClassName('event-tables-container')[0];
  const tableRows = [...tablesContainer.querySelectorAll('.participant-table .table-row.body')];
  tableRows.forEach(row => {
    const rowTextAreas = [...row.querySelectorAll('textarea')];
    const rowInputs = [...row.querySelectorAll('input'), ...row.querySelectorAll('textarea')];
    const participantActions = row.querySelector('.participant-action-buttons');
    const editActions = row.querySelector('.participant-edit-buttons');

    if (row.classList.contains('edit')) {
      rowInputs.forEach(input => {
        input.disabled = false;
      });
      rowTextAreas.forEach(area => {
        area.style.height = `${area.scrollHeight + 2}px`;
      });
      participantActions.style.display = 'none';
      editActions.style.display = 'flex';
    } else {
      rowInputs.forEach(input => {
        input.disabled = true;
      });
      rowTextAreas.forEach(area => {
        area.style.height = `40px`;
      });
      participantActions.style.display = 'flex';
      editActions.style.display = 'none';
    }
  });
}

function updateParticipantInfo(e, id) {
  const activeEventID = document.querySelector('.admin-event-row.active').id;
  const participantRow = document.getElementById(`participant-row-${id}`);
  const rowInputs = [...participantRow.querySelectorAll('input'), ...participantRow.querySelectorAll('textarea')];

  if (e.target.classList.contains('btn-participant-cancel')) {
    let data = {
      action: 'admin_get_participant_info',
      eventID: activeEventID,
      participantID: id
    };
    jquery__WEBPACK_IMPORTED_MODULE_5___default().post(ajaxData.ajaxurl, data, function (response) {
      const participantData = JSON.parse(response);
      rowInputs[0].value = participantData[0].Participant_1;
      rowInputs[1].value = participantData[0].Participant_2;
      rowInputs[2].value = participantData[0].Participant_3;
      rowInputs[3].value = participantData[0].Email;
      jquery__WEBPACK_IMPORTED_MODULE_5___default()(rowInputs[4]).val(participantData[0].Additional_info);
      jquery__WEBPACK_IMPORTED_MODULE_5___default()(rowInputs[5]).val(participantData[0].Notes);
    });
  } else if (e.target.classList.contains('btn-participant-save')) {
    let data = {
      action: 'admin_set_participant_info',
      eventID: activeEventID,
      participantID: id,
      participant1: rowInputs[0].value,
      participant2: rowInputs[1].value,
      participant3: rowInputs[2].value,
      email: rowInputs[3].value,
      additionalInfo: jquery__WEBPACK_IMPORTED_MODULE_5___default()(rowInputs[4]).val(),
      notes: jquery__WEBPACK_IMPORTED_MODULE_5___default()(rowInputs[5]).val()
    };
    jquery__WEBPACK_IMPORTED_MODULE_5___default().post(ajaxData.ajaxurl, data, function (response) {
      participantRow.classList.remove('edit');
      updateParticipantTableDisplay();
    });
  } else if (e.target.classList.contains('btn-participant-delete')) {
    const message = 'are you sure you wish to remove this booking from the event? Once deleted, this cannot be undone';

    if (confirm(message) == true) {
      let data = {
        action: 'admin_delete_participant',
        eventID: activeEventID,
        participantID: id
      };
      jquery__WEBPACK_IMPORTED_MODULE_5___default().post(ajaxData.ajaxurl, data, function (response) {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()(participantRow).remove();
        updateParticipantTableDisplay();
      });
    } else return;
  }
} //contains table header mobile and waiting list action button event listeners


function setWaitingListRowEdit() {
  const editButtons = [...document.getElementsByClassName('btn-waiting-list-edit')];
  const cancelButtons = [...document.getElementsByClassName('btn-waiting-list-cancel')];
  const saveButtons = [...document.getElementsByClassName('btn-waiting-list-save')];
  const deleteButtons = [...document.getElementsByClassName('btn-waiting-list-delete')];
  const tableRows = [...document.querySelectorAll('.waiting-list-table .table-row.body')];
  const waitingListHeader = document.getElementById('waiting-list-table-header');
  const addInquiryButton = document.getElementById('add-inquiry');
  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      const ID = button.id.slice(21);
      tableRows.forEach(row => {
        if (row.id == `waiting-list-row-${ID}`) {
          row.classList.add('edit');
        } else {
          row.classList.remove('edit');
        }
      });
      updateWaitingListTableDisplay();
    });
  });
  cancelButtons.forEach(button => {
    button.addEventListener('click', e => {
      const ID = button.id.slice(24);
      tableRows.forEach(row => {
        if (row.id == `waiting-list-row-${ID}`) {
          row.classList.remove('edit');
        }
      });
      updateWaitingListTableDisplay();
      updateWaitingListInfo(e, ID);
    });
  });
  saveButtons.forEach(button => {
    button.addEventListener('click', e => {
      const ID = button.id.slice(22);
      tableRows.forEach(row => {
        if (row.id == `waiting-list-row-${ID}`) {
          row.classList.remove('edit');
        }
      });
      updateParticipantTableDisplay();
      updateWaitingListInfo(e, ID);
    });
  });
  deleteButtons.forEach(button => {
    button.addEventListener('click', e => {
      const ID = button.id.slice(24);
      console.log(ID);
      tableRows.forEach(row => {
        if (row.id == `waiting-list-row-${ID}`) {
          row.classList.remove('edit');
        }
      });
      updateParticipantTableDisplay();
      updateWaitingListInfo(e, ID);
    });
  });
  waitingListHeader.addEventListener('click', () => {
    document.querySelector('.waiting-list-table').classList.toggle('show');
    waitingListHeader.classList.toggle('show');
  });
}

function updateWaitingListTableDisplay() {
  const tablesContainer = document.getElementsByClassName('event-tables-container')[0];
  const tableRows = [...tablesContainer.querySelectorAll('.waiting-list-table .table-row.body')];
  tableRows.forEach(row => {
    const rowTextAreas = [...row.querySelectorAll('textarea')];
    const rowInputs = [...row.querySelectorAll('input'), ...row.querySelectorAll('textarea'), ...row.querySelectorAll('select')];
    const participantActions = row.querySelector('.waiting-list-action-buttons');
    const editActions = row.querySelector('.waiting-list-edit-buttons');

    if (row.classList.contains('edit')) {
      rowInputs.forEach(input => {
        input.disabled = false;
      });
      rowTextAreas.forEach(area => {
        area.style.height = `${area.scrollHeight + 2}px`;
      });
      participantActions.style.display = 'none';
      editActions.style.display = 'flex';
    } else {
      rowInputs.forEach(input => {
        input.disabled = true;
      });
      rowTextAreas.forEach(area => {
        area.style.height = `40px`;
      });
      participantActions.style.display = 'flex';
      editActions.style.display = 'none';
    }
  });
}

function updateWaitingListInfo(e, id) {
  const activeEventID = document.querySelector('.admin-event-row.active').id;
  const waitingListRow = document.getElementById(`waiting-list-row-${id}`);
  const rowInputs = [...waitingListRow.querySelectorAll('input'), ...waitingListRow.querySelectorAll('textarea'), ...waitingListRow.querySelectorAll('select')];

  if (e.target.classList.contains('btn-waiting-list-cancel')) {
    let data = {
      action: 'admin_get_waiting_list_info',
      eventID: activeEventID,
      waitingListID: id
    };
    jquery__WEBPACK_IMPORTED_MODULE_5___default().post(ajaxData.ajaxurl, data, function (response) {
      const waitingListData = JSON.parse(response);
      rowInputs[0].value = waitingListData[0].Inquiry_Name;
      rowInputs[1].value = waitingListData[0].Email;
      jquery__WEBPACK_IMPORTED_MODULE_5___default()(rowInputs[2]).val(waitingListData[0].Notes);
      rowInputs[3].value = waitingListData[0].Participants;
    });
  } else if (e.target.classList.contains('btn-waiting-list-save')) {
    let data = {
      action: 'admin_set_waiting_list_info',
      eventID: activeEventID,
      inquiryID: id,
      name: rowInputs[0].value,
      email: rowInputs[1].value,
      notes: jquery__WEBPACK_IMPORTED_MODULE_5___default()(rowInputs[2]).val(),
      participants: rowInputs[3].value
    };
    jquery__WEBPACK_IMPORTED_MODULE_5___default().post(ajaxData.ajaxurl, data, function (response) {
      waitingListRow.classList.remove('edit');
      updateWaitingListTableDisplay();
    });
  } else if (e.target.classList.contains('btn-waiting-list-delete')) {
    const message = 'are you sure you wish to remove this booking from the event? Once deleted, this cannot be undone';

    if (confirm(message) == true) {
      let data = {
        action: 'admin_delete_waiting_list_info',
        eventID: activeEventID,
        inquiryID: id
      };
      jquery__WEBPACK_IMPORTED_MODULE_5___default().post(ajaxData.ajaxurl, data, function (response) {
        jquery__WEBPACK_IMPORTED_MODULE_5___default()(waitingListRow).remove();
        updateWaitingListTableDisplay();
      });
    } else return;
  }
}

function addNewParticipant() {}

function addNewInquiry() {}

eventMonthSelect();
showAllEvents();
(0,_admin_form__WEBPACK_IMPORTED_MODULE_4__.closeAdminForm)();
}();
/******/ })()
;
//# sourceMappingURL=admin.js.map