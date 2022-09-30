function eventMonthSelect() {

	(function ($) {
		$(document).ready(function () {
			$('#event-month').change(function (e) {
				let selectedMonth = e.target.value;

				let data = {
					'action': 'admin_get_events',
					'month': selectedMonth,
				};
				console.log(data.month);

				$.post(ajaxData.ajaxurl, data, function (response) {
					$('#admin-event-table').html(response);
				});
			});
		});
	})(jQuery);
}

eventMonthSelect();
