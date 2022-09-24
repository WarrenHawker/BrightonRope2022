import $ from 'jquery';

function openBookingForm() {
	const bookSessionButtons = document.querySelectorAll('.book-session');
	const bookingFormOverlay = document.getElementsByClassName('booking-form-overlay')[0];
	const bookingFormContainer = document.getElementsByClassName('booking-form-container')[0];
	const spinnerLoader = document.getElementsByClassName('spinner-loader')[0];
	const eventInfo = document.getElementsByClassName('event-info')[0];

	bookSessionButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			bookingFormOverlay.classList.add('active');
			spinnerLoader.classList.add('active');

			$.getJSON(`http://brightonrope.local/wp-json/wp/v2/event/${e.target.id}`, (event) => {
				// console.log(event);
				const eventData = {
					id: event.id,
					name: event.title.rendered,
					venue: event.acf.venue,
					soldOut: event.acf.sold_out,
					allowSingles: event.acf.allow_single_tickets,
					individualPrices: event.acf.individual_ticket_price,
					pairPrices: event.acf.pair_ticket_price.split(','),
					startDate: convertDates(event.acf.start_date),
					endDate: convertDates(event.acf.end_date),
				};

				console.log(eventData.individualPrices);
				spinnerLoader.classList.remove('active');

				if (eventData.endDate) {
					eventInfo.innerHTML = `
          <h3>${eventData.name}</h3>
          <h4>${eventData.startDate}</h4>
          <h4>${eventData.endDate}</h4>

        `;
				} else {
					eventInfo.innerHTML = `
          <h3>${eventData.name}</h3>
          <h4>${eventData.startDate}<h4>
        `;
				}
			});
		});
	});
}

function closeBookingForm() {
	const closeButton = document.getElementById('booking-form-close');
	const bookingForm = document.getElementsByClassName('booking-form-overlay')[0];
	closeButton.addEventListener('click', () => {
		bookingForm.classList.remove('active');
	});
}

function convertDates(date) {
	if (!date) {
		return;
	}
	const options = {
		weekday: 'short',
		day: 'numeric',
		month: 'long',
	};

	const year = date.substring(0, 4);
	const month = parseInt(date.substring(4, 6)) - 1;
	const day = date.substring(6, 8);
	const newDate = new Date(year, month, day);

	return new Intl.DateTimeFormat('en-GB', options).format(newDate);
}

export { closeBookingForm, openBookingForm };
