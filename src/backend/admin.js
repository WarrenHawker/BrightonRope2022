function eventMonthSelect() {

	(function ($) {
		$(document).ready(function () {
			$(window).load(function () {
				let data = {
					'action': 'admin_get_events',
					'month': 'all',
				};
				$.post(ajaxData.ajaxurl, data, function (response) {
					$('#admin-event-table').html(response);
				});
			});

			$('#event-month').change(function (e) {
				let selectedMonth = e.target.value;

				let data = {
					'action': 'admin_get_events',
					'month': selectedMonth,
				};
				$.post(ajaxData.ajaxurl, data, function (response) {
					$('#admin-event-table').html(response);
					$('#event-participant-table').empty();
					$('#event-waiting-list-table').empty();
				});
			});
		});
	})(jQuery);
}

function getEventParticipants(e) {
	(function ($) {
		$(document).ready(function () {

				let dataParticipants = {
					'action': 'admin_get_participants',
					'eventID': e.target.parentElement.id,
				};

				let dataWaitingList = {
					'action': 'admin_get_waiting_list',
					'eventID': e.target.parentElement.id,
				};

				$.post(ajaxData.ajaxurl, dataParticipants, function (response) {
					$('#event-participant-table').html(response);
					setInputSizes();
				});

				$.post(ajaxData.ajaxurl, dataWaitingList, function (response) {
					$('#event-waiting-list-table').html(response);
				});
			});
		})(jQuery);	
}

function setInputSizes() {	
	(function ($) {
		$(document).ready(function () {

			function resizeInput() {
				if(!$(this).attr('value')) {
					$(this).attr('size', '10');
				} else {
					$(this).attr('size', $(this).val().length);
				}

				if($(this).is('textarea')) {
					$(this).height($(this).prop('scrollHeight') + "px");
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
		if(row.classList.contains('edit') && (e.target.tagName == 'INPUT' || e.target.tagName == 'TEXTAREA')) {
			return;
		} else if(row.id == `participant-row-${id}`) {
			row.classList.toggle('active');
		} else {
			row.classList.remove('active');
			row.classList.remove('edit')
		}
	})
	updateParticipantTableDisplay()
}

function setParticipantRowEdit(e, id) {
	e.stopPropagation();
	const tableRows = [...document.querySelectorAll('table.participants tr.participant-row')];
			
	tableRows.forEach((row) => {
		if(row.id == `participant-row-${id}`) {
			row.classList.toggle('edit');
		} else {
			row.classList.remove('edit');
		}
	})
	updateParticipantTableDisplay()	
}

function updateParticipantTableDisplay() {
	const tablesContainer = document.getElementsByClassName('event-tables-container')[0];
	const tableRows = [...tablesContainer.querySelectorAll('table.participants tr.participant-row')];
	
	tableRows.forEach((row) => {
		const rowTextAreas = [...row.querySelectorAll('textarea')];
		const rowInputs = [...row.querySelectorAll('input'), ...row.querySelectorAll('textarea')];
		const participantActions = row.querySelector('.participant-actions');
		const editActions = row.querySelector('.participant-edit-actions');

		if(row.classList.contains('active')) {
			rowTextAreas.forEach((area) => {
				area.style.height = `${area.scrollHeight}px`;
			})
			
			participantActions.style.display = 'block';
		} else {
			rowTextAreas.forEach((area) => {
				area.style.height = `40px`;
			})
			participantActions.style.display = 'none';
		}

		if(row.classList.contains('edit')) {
			rowInputs.forEach((input)=> {
				input.disabled = false;
			});
			editActions.style.display = 'flex';
			participantActions.style.display = 'none';
		} else {
			rowInputs.forEach((input)=> {
				input.disabled = true;
			});
			editActions.style.display = 'none';
		}
	})
}

function updateParticipantInfo(e, id) {
	e.stopPropagation();
	const activeEventID = document.querySelector('.admin-event-row.active').id;
	const participantRow = document.querySelector('.participant-row.active');
	const rowInputs = [...participantRow.querySelectorAll('input'), ...participantRow.querySelectorAll('textarea')];
	(function ($) {
		$(document).ready(function () {
			if(e.target.classList.contains('btn-cancel')) {
				let data = {
					'action': 'admin_get_participant_info',
					'eventID': activeEventID,
					'participantID': id,
				}
				$.post(ajaxData.ajaxurl, data, function (response) {
					const participantData = Object.values(JSON.parse(response));
					rowInputs.forEach((input, index) => {
						if(input.tagName == 'INPUT') {
							input.value = participantData[index];
						} else if(input.tagName == 'TEXTAREA') {
							console.log(participantData[index]);
							$(input).val(participantData[index]);
						};
						
					})
					participantRow.classList.remove('edit');
					updateParticipantTableDisplay();
				});
				

			} else if(e.target.classList.contains('btn-save')) {
				let data = {
					'action': 'admin_set_participant_info',
					'eventID': activeEventID,
					'participantID': id,
					'participant1': rowInputs[0].value,
					'participant2': rowInputs[1].value,
					'participant3': rowInputs[2].value,
					'email': rowInputs[3].value,
					'additionalInfo': $(rowInputs[4]).val(),
					'notes': $(rowInputs[5]).val(),

				}
				$.post(ajaxData.ajaxurl, data, function (response) {
					participantRow.classList.remove('edit');
					updateParticipantTableDisplay();
				});
			} else if(e.target.classList.contains('btn-delete')) {
				const message = 'are you sure you wish to remove this booking from the event? Once deleted, this cannot be undone'
				if(confirm(message)==true) {
					let data = {
						'action': 'admin_delete_participant',
						'eventID': activeEventID,
						'participantID': id
					}
					$.post(ajaxData.ajaxurl, data, function (response) {
						$(participantRow).remove();
						updateParticipantTableDisplay();
					});
				} else return;
			}
		});
	})(jQuery);	
}

eventMonthSelect();

