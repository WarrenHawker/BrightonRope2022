import participantsTable from './html-templates/participants-table';
import waitingListTable from './html-templates/waiting-list-table';
import $ from 'jquery';

//calls getEventParticipants function
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

//calls setParticipantRowEdit and setWaitingListRowEdit functions
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
				setWaitingListRowEdit();
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

//contains table header mobile and participant action button event listeners
function setParticipantRowEdit() {
	const editButtons = [...document.getElementsByClassName('btn-participant-edit')];
	const cancelButtons = [...document.getElementsByClassName('btn-participant-cancel')];
	const saveButtons = [...document.getElementsByClassName('btn-participant-save')];
	const deleteButtons = [...document.getElementsByClassName('btn-participant-delete')];
	const tableRows = [...document.querySelectorAll('.participant-table .table-row.body')];
	const participantsHeader = document.getElementById('participants-table-header');

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
	participantsHeader.addEventListener('click', () => {
		document.querySelector('.participant-table').classList.toggle('show');
		participantsHeader.classList.toggle('show');
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

//contains table header mobile and waiting list action button event listeners
function setWaitingListRowEdit() {
	const editButtons = [...document.getElementsByClassName('btn-waiting-list-edit')];
	const cancelButtons = [...document.getElementsByClassName('btn-waiting-list-cancel')];
	const saveButtons = [...document.getElementsByClassName('btn-waiting-list-save')];
	const deleteButtons = [...document.getElementsByClassName('btn-waiting-list-delete')];
	const tableRows = [...document.querySelectorAll('.waiting-list-table .table-row.body')];
	const waitingListHeader = document.getElementById('waiting-list-table-header');

	editButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const ID = button.id.slice(21);

			tableRows.forEach((row) => {
				if (row.id == `waiting-list-row-${ID}`) {
					row.classList.add('edit');
				} else {
					row.classList.remove('edit');
				}
			});
			updateWaitingListTableDisplay();
		});
	});

	cancelButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const ID = button.id.slice(24);

			tableRows.forEach((row) => {
				if (row.id == `waiting-list-row-${ID}`) {
					row.classList.remove('edit');
				}
			});
			updateWaitingListTableDisplay();
			updateWaitingListInfo(e, ID);
		});
	});

	saveButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const ID = button.id.slice(22);
			tableRows.forEach((row) => {
				if (row.id == `waiting-list-row-${ID}`) {
					row.classList.remove('edit');
				}
			});
			updateParticipantTableDisplay();
			updateWaitingListInfo(e, ID);
		});
	});

	deleteButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const ID = button.id.slice(24);
			console.log(ID);
			tableRows.forEach((row) => {
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

	tableRows.forEach((row) => {
		const rowTextAreas = [...row.querySelectorAll('textarea')];
		const rowInputs = [
			...row.querySelectorAll('input'),
			...row.querySelectorAll('textarea'),
			...row.querySelectorAll('select'),
		];
		const participantActions = row.querySelector('.waiting-list-action-buttons');
		const editActions = row.querySelector('.waiting-list-edit-buttons');

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
	});
}

function updateWaitingListInfo(e, id) {
	const activeEventID = document.querySelector('.admin-event-row.active').id;
	const waitingListRow = document.getElementById(`waiting-list-row-${id}`);
	const rowInputs = [
		...waitingListRow.querySelectorAll('input'),
		...waitingListRow.querySelectorAll('textarea'),
		...waitingListRow.querySelectorAll('select'),
	];

	if (e.target.classList.contains('btn-waiting-list-cancel')) {
		let data = {
			action: 'admin_get_waiting_list_info',
			eventID: activeEventID,
			waitingListID: id,
		};
		$.post(ajaxData.ajaxurl, data, function (response) {
			const waitingListData = JSON.parse(response);
			rowInputs[0].value = waitingListData[0].Inquiry_Name;
			rowInputs[1].value = waitingListData[0].Email;
			$(rowInputs[2]).val(waitingListData[0].Notes);
			rowInputs[3].value = waitingListData[0].Participants;
		});
	} else if (e.target.classList.contains('btn-waiting-list-save')) {
		let data = {
			action: 'admin_set_waiting_list_info',
			eventID: activeEventID,
			inquiryID: id,
			name: rowInputs[0].value,
			email: rowInputs[1].value,
			notes: $(rowInputs[2]).val(),
			participants: rowInputs[3].value,
		};
		$.post(ajaxData.ajaxurl, data, function (response) {
			waitingListRow.classList.remove('edit');
			updateWaitingListTableDisplay();
		});
	} else if (e.target.classList.contains('btn-waiting-list-delete')) {
		const message = 'are you sure you wish to remove this booking from the event? Once deleted, this cannot be undone';
		if (confirm(message) == true) {
			let data = {
				action: 'admin_delete_waiting_list_info',
				eventID: activeEventID,
				inquiryID: id,
			};
			$.post(ajaxData.ajaxurl, data, function (response) {
				$(waitingListRow).remove();
				updateWaitingListTableDisplay();
			});
		} else return;
	}
}

eventMonthSelect();
showAllEvents();
