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
				console.log(e.target.parentElement.id);

				let dataParticipants = {
					'action': 'admin_get_participants',
					'eventID': e.target.parentElement.id,
				};

				let dataWaitingList = {
					'action': 'admin_get_waiting_list',
					'eventID': e.target.parentElement.id,
				};

				$.post(ajaxData.ajaxurl, dataParticipants, function (response) {
					console.log(response);
					$('#event-participant-table').html(response);
				});

				$.post(ajaxData.ajaxurl, dataWaitingList, function (response) {
					console.log(response);
					$('#event-waiting-list-table').html(response);
				});
			});
		})(jQuery);	
}

eventMonthSelect();
