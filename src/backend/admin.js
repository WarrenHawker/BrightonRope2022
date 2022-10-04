import participantsTable from './html-templates/participants-table';
import waitingListTable from './html-templates/waiting-list-table';
import $ from 'jquery';

function eventMonthSelect() {
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
				setParticipantRowEdit();
			});

			$.post(ajaxData.ajaxurl, dataWaitingList, function (response) {
				$('#waiting-list-table-container').html(waitingListTable(JSON.parse(response)));
			});
		});
	});
}

//back button - shows all events from filter
function showAllEvents() {
	const btnBack = document.getElementById('btn-back-events');
	btnBack.addEventListener('click', () => {
		const tableRows = [...document.querySelectorAll('.admin-event-row')];
		const btnBack = document.getElementById('btn-back-events');
		tableRows.forEach((row) => {
			row.classList.remove('active');
			row.classList.remove('hidden');
		});
		btnBack.style.display = 'none';
		$('#participant-table-container').empty();
		$('#waiting-list-table-container').empty();
	});
}

//contains participant action button event listeners
function setParticipantRowEdit() {
	const editButtons = [...document.getElementsByClassName('btn-participant-edit')];
	const cancelButtons = [...document.getElementsByClassName('btn-participant-cancel')];
	const saveButtons = [...document.getElementsByClassName('btn-participant-save')];
	const deleteButtons = [...document.getElementsByClassName('btn-participant-delete')];
	const tableRows = [...document.querySelectorAll('.participant-table .table-row.body')];

	editButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const ID = button.id.slice(21);

			tableRows.forEach((row) => {
				if (row.id == `participant-row-${ID}`) {
					row.classList.add('edit');
				} else {
					row.classList.remove('edit');
				}
			});
			updateParticipantTableDisplay();
		});
	});

	cancelButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const ID = button.id.slice(23);

			tableRows.forEach((row) => {
				if (row.id == `participant-row-${ID}`) {
					row.classList.remove('edit');
				}
			});
			updateParticipantTableDisplay();
			updateParticipantInfo(e, ID);
		});
	});

	saveButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const ID = button.id.slice(21);
			tableRows.forEach((row) => {
				if (row.id == `participant-row-${ID}`) {
					row.classList.remove('edit');
				}
			});
			updateParticipantTableDisplay();
			updateParticipantInfo(e, ID);
		});
	});

	deleteButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const ID = button.id.slice(23);
			tableRows.forEach((row) => {
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

	tableRows.forEach((row) => {
		const rowTextAreas = [...row.querySelectorAll('textarea')];
		const rowInputs = [...row.querySelectorAll('input'), ...row.querySelectorAll('textarea')];
		const participantActions = row.querySelector('.participant-action-buttons');
		const editActions = row.querySelector('.participant-edit-buttons');

		if (row.classList.contains('edit')) {
			rowInputs.forEach((input) => {
				input.disabled = false;
			});

			rowTextAreas.forEach((area) => {
				area.style.height = `${area.scrollHeight + 2}px`;
			});

			participantActions.style.display = 'none';
			editActions.style.display = 'flex';
		} else {
			rowInputs.forEach((input) => {
				input.disabled = true;
			});

			rowTextAreas.forEach((area) => {
				area.style.height = `40px`;
			});

			participantActions.style.display = 'flex';
			editActions.style.display = 'none';
		}

		// if (row.classList.contains('active')) {
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
			participantID: id,
		};
		$.post(ajaxData.ajaxurl, data, function (response) {
			const participantData = JSON.parse(response);
			rowInputs[0].value = participantData[0].Participant_1;
			rowInputs[1].value = participantData[0].Participant_2;
			rowInputs[2].value = participantData[0].Participant_3;
			rowInputs[3].value = participantData[0].Email;
			$(rowInputs[4]).val(participantData[0].Additional_info);
			$(rowInputs[5]).val(participantData[0].Notes);
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
			additionalInfo: $(rowInputs[4]).val(),
			notes: $(rowInputs[5]).val(),
		};
		$.post(ajaxData.ajaxurl, data, function (response) {
			participantRow.classList.remove('edit');
			updateParticipantTableDisplay();
		});
	} else if (e.target.classList.contains('btn-participant-delete')) {
		const message = 'are you sure you wish to remove this booking from the event? Once deleted, this cannot be undone';
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
}

eventMonthSelect();
showAllEvents();
