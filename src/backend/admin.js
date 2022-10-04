import participantsTable from './html-templates/participants-table';
import waitingListTable from './html-templates/waiting-list-table';
import $ from 'jquery';

function eventMonthSelect() {
	(function ($) {
		$(document).ready(function () {
			$(window).load(function () {
				let data = {
					action: 'admin_get_events',
					month: 'all',
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
					month: selectedMonth,
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
	adminEventRows.forEach((row) => {
		row.addEventListener('click', (e) => {
			const tableRows = [...document.querySelectorAll('.admin-event-row')];
			const btnBack = document.getElementById('btn-back-events');
			tableRows.forEach((row) => {
				if (row == e.target.parentElement) {
					row.classList.add('active');
				} else {
					row.classList.remove('active');
					row.classList.add('hidden');
				}
			});
			btnBack.style.display = 'block';

			// (function ($) {
			// 	$(document).ready(function () {
			let dataParticipants = {
				action: 'admin_get_participants',
				eventID: e.target.parentElement.id,
			};

			let dataWaitingList = {
				action: 'admin_get_waiting_list',
				eventID: e.target.parentElement.id,
			};

			$.post(ajaxData.ajaxurl, dataParticipants, function (response) {
				$('#participant-table-container').html(participantsTable(JSON.parse(response)));
				// setInputSizes();
				// setColumnSizes();
			});

			$.post(ajaxData.ajaxurl, dataWaitingList, function (response) {
				$('#waiting-list-table-container').html(waitingListTable(response));
			});
			// 	});
			// })(jQuery);
		});
	});
}

function showAllEvents() {
	const tableRows = [...document.querySelectorAll('.admin-event-row')];
	const btnBack = document.getElementById('btn-back-events');
	tableRows.forEach((row) => {
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

	tableRows.forEach((row) => {
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

	tableRows.forEach((row) => {
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

	tableRows.forEach((row) => {
		const rowTextAreas = [...row.querySelectorAll('textarea')];
		const rowInputs = [...row.querySelectorAll('input'), ...row.querySelectorAll('textarea')];
		const participantActions = row.querySelector('.participant-actions');
		const editActions = row.querySelector('.participant-edit-actions');

		if (row.classList.contains('active')) {
			rowTextAreas.forEach((area) => {
				area.style.height = `${area.scrollHeight}px`;
			});

			participantActions.style.display = 'block';
		} else {
			rowTextAreas.forEach((area) => {
				area.style.height = `40px`;
			});
			participantActions.style.display = 'none';
		}

		if (row.classList.contains('edit')) {
			rowInputs.forEach((input) => {
				input.disabled = false;
			});
			editActions.style.display = 'flex';
			participantActions.style.display = 'none';
		} else {
			rowInputs.forEach((input) => {
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
					participantID: id,
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
					notes: $(rowInputs[5]).val(),
				};
				$.post(ajaxData.ajaxurl, data, function (response) {
					participantRow.classList.remove('edit');
					updateParticipantTableDisplay();
				});
			} else if (e.target.classList.contains('btn-delete')) {
				const message =
					'are you sure you wish to remove this booking from the event? Once deleted, this cannot be undone';
				if (confirm(message) == true) {
					let data = {
						action: 'admin_delete_participant',
						eventID: activeEventID,
						participantID: id,
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
		singleColumns.forEach((element) => {
			if (!minWidth || element.getBoundingClientRect().width < minWidth) {
				minWidth = element.getBoundingClientRect().width;
			}
		});

		singleColumns.forEach((element) => {
			element.style.width = `${minWidth}px`;
			element.style.flexShrink = 0;
			element.style.flexGrow = 1;
		});
		console.log(minWidth);
	}
}

eventMonthSelect();
