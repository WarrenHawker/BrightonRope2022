/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
          <div class="table-item" data-name='Additional Information'>
            <textarea disabled>${item.Additional_info}</textarea>
          </div>
          <div class="table-column double">
            <div class="table-item non-input" data-name='Amount Paid'>£${item.Amount_paid}</div>
            <div class="table-item non-input" data-name='Submission Date'>${convertDates(item.Submission_date)}</div>
          </div>
          <div class="table-item" data-name='Notes'>
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
    <h1>Event Participants</h1>
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
        <div class="table-item">Notes</div>
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
					<div class="table-item non-input" data-name='Participants'>${item.Participants}</div>
					<div class="table-item non-input" data-name='Submission Date'>${convertDates(item.Submission_date)}</div>
					<div class="table-item" data-name='Notes'>
						<textarea disabled>${item.Notes}</textarea>
					</div>
					<div class="waiting-list-action-buttons">
            <button class="btn-admin btn-waiting-list-edit" id="btn-participant-edit-${item.Booking_ID}">Edit</button>
            <button class="btn-admin">Move</button>
            <button class="btn-admin delete btn-waiting-list-delete" id="btn-waiting-list-delete-${item.Booking_ID}">Delete</button>
          </div>
          <div class="waiting-list-edit-buttons">
            <button class="btn-admin btn-waiting-list-cancel" id="btn-waiting-list-cancel-${item.Booking_ID}">Cancel</button>
            <button class="btn-admin primary btn-waiting-list-save" id="btn-waiting-list-save-${item.Booking_ID}">Save</button>
          </div>
			</li>
    `;
  }).join(''); // prettier-ignore

  return `
  <div class="table-heading">
    <h1>Waiting List</h1>
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
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);




function eventMonthSelect() {
  jquery__WEBPACK_IMPORTED_MODULE_2___default()(window).load(function () {
    let data = {
      action: 'admin_get_events',
      month: 'all'
    };
    jquery__WEBPACK_IMPORTED_MODULE_2___default().post(ajaxData.ajaxurl, data, function (response) {
      jquery__WEBPACK_IMPORTED_MODULE_2___default()('#admin-event-table').html(response);
      getEventParticipants();
    });
  });
  jquery__WEBPACK_IMPORTED_MODULE_2___default()('#event-month').change(function (e) {
    let selectedMonth = e.target.value;
    let data = {
      action: 'admin_get_events',
      month: selectedMonth
    };
    jquery__WEBPACK_IMPORTED_MODULE_2___default().post(ajaxData.ajaxurl, data, function (response) {
      jquery__WEBPACK_IMPORTED_MODULE_2___default()('#admin-event-table').html(response);
      jquery__WEBPACK_IMPORTED_MODULE_2___default()('#event-participant-table').empty();
      jquery__WEBPACK_IMPORTED_MODULE_2___default()('#event-waiting-list-table').empty();
      getEventParticipants();
    });
  });
}

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
      jquery__WEBPACK_IMPORTED_MODULE_2___default().post(ajaxData.ajaxurl, dataParticipants, function (response) {
        jquery__WEBPACK_IMPORTED_MODULE_2___default()('#participant-table-container').html((0,_html_templates_participants_table__WEBPACK_IMPORTED_MODULE_0__["default"])(JSON.parse(response)));
        setParticipantRowEdit();
      });
      jquery__WEBPACK_IMPORTED_MODULE_2___default().post(ajaxData.ajaxurl, dataWaitingList, function (response) {
        jquery__WEBPACK_IMPORTED_MODULE_2___default()('#waiting-list-table-container').html((0,_html_templates_waiting_list_table__WEBPACK_IMPORTED_MODULE_1__["default"])(JSON.parse(response)));
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
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#participant-table-container').empty();
    jquery__WEBPACK_IMPORTED_MODULE_2___default()('#waiting-list-table-container').empty();
  });
} //contains participant action button event listeners


function setParticipantRowEdit() {
  const editButtons = [...document.getElementsByClassName('btn-participant-edit')];
  const cancelButtons = [...document.getElementsByClassName('btn-participant-cancel')];
  const saveButtons = [...document.getElementsByClassName('btn-participant-save')];
  const deleteButtons = [...document.getElementsByClassName('btn-participant-delete')];
  const tableRows = [...document.querySelectorAll('.participant-table .table-row.body')];
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
    } // if (row.classList.contains('active')) {
    // 	rowTextAreas.forEach((area) => {
    // 		area.style.height = `${area.scrollHeight}px`;
    // 	});
    // 	participantActions.style.display = 'block';
    // } else {
    // 	rowTextAreas.forEach((area) => {
    // 		area.style.height = `40px`;
    // 	});
    // 	participantActions.style.display = 'none';
    // }
    // if (row.classList.contains('edit')) {
    // 	rowInputs.forEach((input) => {
    // 		input.disabled = false;
    // 	});
    // 	editActions.style.display = 'flex';
    // 	participantActions.style.display = 'none';
    // } else {
    // 	rowInputs.forEach((input) => {
    // 		input.disabled = true;
    // 	});
    // 	editActions.style.display = 'none';
    // }

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
    jquery__WEBPACK_IMPORTED_MODULE_2___default().post(ajaxData.ajaxurl, data, function (response) {
      const participantData = JSON.parse(response);
      rowInputs[0].value = participantData[0].Participant_1;
      rowInputs[1].value = participantData[0].Participant_2;
      rowInputs[2].value = participantData[0].Participant_3;
      rowInputs[3].value = participantData[0].Email;
      jquery__WEBPACK_IMPORTED_MODULE_2___default()(rowInputs[4]).val(participantData[0].Additional_info);
      jquery__WEBPACK_IMPORTED_MODULE_2___default()(rowInputs[5]).val(participantData[0].Notes);
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
      additionalInfo: jquery__WEBPACK_IMPORTED_MODULE_2___default()(rowInputs[4]).val(),
      notes: jquery__WEBPACK_IMPORTED_MODULE_2___default()(rowInputs[5]).val()
    };
    jquery__WEBPACK_IMPORTED_MODULE_2___default().post(ajaxData.ajaxurl, data, function (response) {
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
      jquery__WEBPACK_IMPORTED_MODULE_2___default().post(ajaxData.ajaxurl, data, function (response) {
        jquery__WEBPACK_IMPORTED_MODULE_2___default()(participantRow).remove();
        updateParticipantTableDisplay();
      });
    } else return;
  }
}

eventMonthSelect();
showAllEvents();
}();
/******/ })()
;
//# sourceMappingURL=admin.js.map