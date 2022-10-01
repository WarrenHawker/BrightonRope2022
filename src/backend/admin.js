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
		if(row.classList.contains('edit') && e.target.tagName == 'INPUT') {
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
		const rowActions = row.firstElementChild.firstElementChild;

		if(row.classList.contains('active')) {
			rowTextAreas.forEach((area) => {
				area.style.height = `${area.scrollHeight}px`;
			})
			rowActions.style.display = "block";
		} else {
			rowTextAreas.forEach((area) => {
				area.style.height = `40px`;
			})
			rowActions.style.display = "none";
		}

		const rowInputs = [...row.querySelectorAll('input'), ...row.querySelectorAll('textarea')];
		if(row.classList.contains('edit')) {
			rowInputs.forEach((input)=> {
				input.disabled = false;
			});
		} else {
			rowInputs.forEach((input)=> {
				input.disabled = true;
			});
		}
	})
}
eventMonthSelect();

