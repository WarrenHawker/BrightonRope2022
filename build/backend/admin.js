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
// export default function participantsTable(data) {
// const participantDisplay = data
// 	.map((item) => {
// 		// prettier-ignore
// 		return `
//     <div class="table-row body">
//       <div class="table-column id">
//         <li class="table-item">${item.Booking_ID}</li>
//       </div>
//       <div class="table-column single">
//         <li class="table-item">${item.Participant_1}</li>
//         <li class="table-item">${item.Participant_2}</li>
//         <li class="table-item">${item.Participant_3}</li>
//         <li class="table-item">${item.Email}</li>
//       </div>
//       <div class="table-column full">
//         <li class="table-item info">${item.Additional_info}</li>
//       </div>
//       <div class="table-column double">
//         <li class="table-item">${item.Amount_paid}</li>
//         <li class="table-item">${item.Submission_date}</li>
//       </div>
//       <div class="table-column full">
//         <li class="table-item notes">${item.Notes}</li>
//       </div>
//     </div>
//   `
// 	})
// 	.join('');
// 	// prettier-ignore
// 	return `
//     <div class="table participant-table">
//         <div class="table-row head">
//           <div class="table-column id">
//             <li class="table-item">ID</li>
//           </div>
//           <div class="table-column single">
//             <li class="table-item">Participant 1</li>
//             <li class="table-item">Participant 2</li>
//             <li class="table-item">Participant 3</li>
//             <li class="table-item">Email</li>
//           </div>
//           <div class="table-column full">
//             <li class="table-item info">Additional Information</li>
//           </div>
//           <div class="table-column double">
//             <li class="table-item">Amount <br> Paid</li>
//             <li class="table-item">Submission <br> Date</li>
//           </div>
//           <div class="table-column full">
//             <li class="table-item notes">Notes</li>
//           </div>
//         </div>
//         ${participantDisplay}
//     </div>
// //   `
// // }
function participantsTable(data) {
  const participantDisplay = data.map(item => {
    // prettier-ignore
    return `
      <li class="table-row body">
        <div class="table-item" data-name='ID'>${item.Booking_ID}</div>
        <div class="table-column single">
          <div class="table-item" data-name='Participant 1'>${item.Participant_1}</div>
          <div class="table-item" data-name='Participant 2'>${item.Participant_2}</div>
          <div class="table-item" data-name='Participant 3'>${item.Participant_3}</div>
          <div class="table-item" data-name='Email'>${item.Email}</div>
        </div>
        <div class="table-item" data-name='Additional Information'>${item.Additional_info}</div>
        <div class="table-column double">
          <div class="table-item" data-name='Amount Paid'>£${item.Amount_paid}</div>
          <div class="table-item" data-name='Submission Date'>${convertDates(item.Submission_date)}</div>
        </div>
        <div class="table-item" data-name='Notes'>${item.Notes}</div>
        <div class="participant-action-buttons">
        <button>Edit</button>
        <button>Move</button>
        <button>Delete</button>
      </div>
      </li>
      
    `;
  }).join(''); // prettier-ignore

  return `
  <div class="table-heading">
    <h1>Event Participants</h1>
    <button id="add-participant">Add new Participant</button>
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
  console.log(data);
  return `
  
  
  `;
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
  (function ($) {
    $(document).ready(function () {
      $(window).load(function () {
        let data = {
          action: 'admin_get_events',
          month: 'all'
        };
        $.post(ajaxData.ajaxurl, data, function (response) {
          $('#admin-event-table').html(response);
          getEventParticipants();
        });
      });
      $('#event-month').change(function (e) {
        let selectedMonth = e.target.value;
        let data = {
          action: 'admin_get_events',
          month: selectedMonth
        };
        $.post(ajaxData.ajaxurl, data, function (response) {
          $('#admin-event-table').html(response);
          $('#event-participant-table').empty();
          $('#event-waiting-list-table').empty();
          getEventParticipants();
        });
      });
    });
  })(jQuery);
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
      btnBack.style.display = 'block'; // (function ($) {
      // 	$(document).ready(function () {

      let dataParticipants = {
        action: 'admin_get_participants',
        eventID: e.target.parentElement.id
      };
      let dataWaitingList = {
        action: 'admin_get_waiting_list',
        eventID: e.target.parentElement.id
      };
      jquery__WEBPACK_IMPORTED_MODULE_2___default().post(ajaxData.ajaxurl, dataParticipants, function (response) {
        jquery__WEBPACK_IMPORTED_MODULE_2___default()('#participant-table-container').html((0,_html_templates_participants_table__WEBPACK_IMPORTED_MODULE_0__["default"])(JSON.parse(response))); // setInputSizes();
        // setColumnSizes();
      });
      jquery__WEBPACK_IMPORTED_MODULE_2___default().post(ajaxData.ajaxurl, dataWaitingList, function (response) {
        jquery__WEBPACK_IMPORTED_MODULE_2___default()('#waiting-list-table-container').html((0,_html_templates_waiting_list_table__WEBPACK_IMPORTED_MODULE_1__["default"])(response));
      }); // 	});
      // })(jQuery);
    });
  });
}

function showAllEvents() {
  const tableRows = [...document.querySelectorAll('.admin-event-row')];
  const btnBack = document.getElementById('btn-back-events');
  tableRows.forEach(row => {
    row.classList.remove('active');
    row.classList.remove('hidden');
  });
  btnBack.style.display = 'none';

  (function ($) {
    $(document).ready(function () {
      $('#event-participant-table').empty();
      $('#event-waiting-list-table').empty();
    });
  })(jQuery);
}

function setInputSizes() {
  (function ($) {
    $(document).ready(function () {
      function resizeInput() {
        if (!$(this).attr('value')) {
          $(this).attr('size', '10');
        } else {
          $(this).attr('size', $(this).val().length);
        }

        if ($(this).is('textarea')) {
          $(this).height($(this).prop('scrollHeight') + 'px');
        }
      }

      $('td > input').keyup(resizeInput).each(resizeInput);
      $('td > textarea').keyup(resizeInput);
    });
  })(jQuery);
}

function setParticipantRowActive(e, id) {
  const tableRows = [...document.querySelectorAll('table.participants tr.participant-row')];
  tableRows.forEach(row => {
    if (row.classList.contains('edit') && (e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA')) {
      return;
    } else if (row.id == `participant-row-${id}`) {
      row.classList.toggle('active');
    } else {
      row.classList.remove('active');
      row.classList.remove('edit');
    }
  });
  updateParticipantTableDisplay();
}

function setParticipantRowEdit(e, id) {
  e.stopPropagation();
  const tableRows = [...document.querySelectorAll('table.participants tr.participant-row')];
  tableRows.forEach(row => {
    if (row.id == `participant-row-${id}`) {
      row.classList.toggle('edit');
    } else {
      row.classList.remove('edit');
    }
  });
  updateParticipantTableDisplay();
}

function updateParticipantTableDisplay() {
  const tablesContainer = document.getElementsByClassName('event-tables-container')[0];
  const tableRows = [...tablesContainer.querySelectorAll('table.participants tr.participant-row')];
  tableRows.forEach(row => {
    const rowTextAreas = [...row.querySelectorAll('textarea')];
    const rowInputs = [...row.querySelectorAll('input'), ...row.querySelectorAll('textarea')];
    const participantActions = row.querySelector('.participant-actions');
    const editActions = row.querySelector('.participant-edit-actions');

    if (row.classList.contains('active')) {
      rowTextAreas.forEach(area => {
        area.style.height = `${area.scrollHeight}px`;
      });
      participantActions.style.display = 'block';
    } else {
      rowTextAreas.forEach(area => {
        area.style.height = `40px`;
      });
      participantActions.style.display = 'none';
    }

    if (row.classList.contains('edit')) {
      rowInputs.forEach(input => {
        input.disabled = false;
      });
      editActions.style.display = 'flex';
      participantActions.style.display = 'none';
    } else {
      rowInputs.forEach(input => {
        input.disabled = true;
      });
      editActions.style.display = 'none';
    }
  });
}

function updateParticipantInfo(e, id) {
  e.stopPropagation();
  const activeEventID = document.querySelector('.admin-event-row.active').id;
  const participantRow = document.querySelector('.participant-row.active');
  const rowInputs = [...participantRow.querySelectorAll('input'), ...participantRow.querySelectorAll('textarea')];

  (function ($) {
    $(document).ready(function () {
      if (e.target.classList.contains('btn-cancel')) {
        let data = {
          action: 'admin_get_participant_info',
          eventID: activeEventID,
          participantID: id
        };
        $.post(ajaxData.ajaxurl, data, function (response) {
          const participantData = Object.values(JSON.parse(response));
          rowInputs.forEach((input, index) => {
            if (input.tagName == 'INPUT') {
              input.value = participantData[index];
            } else if (input.tagName == 'TEXTAREA') {
              console.log(participantData[index]);
              $(input).val(participantData[index]);
            }
          });
          participantRow.classList.remove('edit');
          updateParticipantTableDisplay();
        });
      } else if (e.target.classList.contains('btn-save')) {
        let data = {
          action: 'admin_set_participant_info',
          eventID: activeEventID,
          participantID: id,
          participant1: rowInputs[0].value,
          participant2: rowInputs[1].value,
          participant3: rowInputs[2].value,
          email: rowInputs[3].value,
          additionalInfo: $(rowInputs[4]).val(),
          notes: $(rowInputs[5]).val()
        };
        $.post(ajaxData.ajaxurl, data, function (response) {
          participantRow.classList.remove('edit');
          updateParticipantTableDisplay();
        });
      } else if (e.target.classList.contains('btn-delete')) {
        const message = 'are you sure you wish to remove this booking from the event? Once deleted, this cannot be undone';

        if (confirm(message) == true) {
          let data = {
            action: 'admin_delete_participant',
            eventID: activeEventID,
            participantID: id
          };
          $.post(ajaxData.ajaxurl, data, function (response) {
            $(participantRow).remove();
            updateParticipantTableDisplay();
          });
        } else return;
      }
    });
  })(jQuery);
}

function setColumnSizes() {
  const singleColumns = [...document.querySelectorAll('.table-column.single li')];

  if (!singleColumns) {
    return;
  } else {
    let minWidth;
    singleColumns.forEach(element => {
      if (!minWidth || element.getBoundingClientRect().width < minWidth) {
        minWidth = element.getBoundingClientRect().width;
      }
    });
    singleColumns.forEach(element => {
      element.style.width = `${minWidth}px`;
      element.style.flexShrink = 0;
      element.style.flexGrow = 1;
    });
    console.log(minWidth);
  }
}

eventMonthSelect();
}();
/******/ })()
;
//# sourceMappingURL=admin.js.map