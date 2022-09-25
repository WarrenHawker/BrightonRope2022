import $ from 'jquery';

function openBookingForm() {
	const bookSessionButtons = document.querySelectorAll('.book-session');
	const bookingFormOverlay = document.getElementsByClassName('booking-form-overlay')[0];
	const spinnerLoader = document.getElementsByClassName('spinner-loader')[0];
	const eventInfo = document.getElementsByClassName('event-info')[0];
	const waitingListForm = document.getElementById('waiting-list-form');
	const bookingForm = document.getElementById('booking-form');

	bookSessionButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			bookingFormOverlay.classList.add('active');
			spinnerLoader.classList.add('active');

			waitingListForm.style.display = 'none';
			bookingForm.style.display = 'none';

			$.getJSON(`http://brightonrope.local/wp-json/wp/v2/event/${e.target.id}`, (event) => {
				// console.log(event);
				const eventData = {
					id: event.id,
					name: event.title.rendered,
					venue: event.acf.venue,
					soldOut: event.acf.sold_out,
					allowSingles: event.acf.allow_single_tickets,
					individualPrices: event.acf.individual_ticket_price.split(','),
					pairPrices: event.acf.pair_ticket_price.split(','),
					startDate: convertDates(event.acf.start_date),
					endDate: convertDates(event.acf.end_date),
				};

				spinnerLoader.classList.remove('active');

				if (eventData.soldOut) {
					waitingListForm.style.display = 'block';
					bookingForm.style.display = 'none';
				} else {
					bookingForm.style.display = 'block';
					waitingListForm.style.display = 'none';
					showBookingFormPages();
				}

				if (eventData.endDate) {
					eventInfo.innerHTML = `
				    <h3 class="no-margin no-padding">${eventData.name}</h3>
				    <h4 class="no-margin no-padding">${eventData.startDate} - ${eventData.endDate}</h4>
				  `;
				} else {
					eventInfo.innerHTML = `
				    <h3 class="no-margin no-padding">${eventData.name}</h3>
				    <h4 class="no-margin no-padding">${eventData.startDate}<h4>
				  `;
				}
			});
		});
	});
}

function closeBookingForm() {
	const closeButton = document.getElementById('booking-form-close');
	const bookingFormOverlay = document.getElementsByClassName('booking-form-overlay')[0];
	const bookingFormPages = [...document.getElementsByClassName('booking-form-page')];
	const steps = [...document.getElementsByClassName('step')];

	closeButton.addEventListener('click', () => {
		bookingFormOverlay.classList.remove('active');
		bookingFormPages.forEach((page) => page.classList.remove('active'));
		steps.forEach((page) => page.classList.remove('active'));
		steps.forEach((page) => page.classList.remove('finish'));
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

function showBookingFormPages() {
	const bookingForm = document.querySelector('[data-multi-step]');
	const formPages = [...bookingForm.querySelectorAll('[data-step]')];
	bookingForm.reset();
	let currentPage = formPages.findIndex((page) => {
		return page.classList.contains('active');
	});

	if (currentPage < 0) {
		currentPage = 0;
		formPages[currentPage].classList.add('active');
		showCurrentPage();
		setStepIndicator();
	}

	bookingForm.addEventListener('click', (e) => {
		let incrementor;

		if (e.target.matches('[data-next]')) {
			incrementor = 1;
		} else if (e.target.matches('[data-prev]')) {
			incrementor = -1;
		}

		if (incrementor == null) return;

		const inputs = [...formPages[currentPage].querySelectorAll('input')];
		const allValid = inputs.every((input) => input.reportValidity());
		if (allValid) {
			currentPage += incrementor;
			showCurrentPage();
			setStepIndicator();
		}
	});

	function showCurrentPage() {
		formPages.forEach((page, index) => {
			page.classList.toggle('active', index === currentPage);
		});
	}

	function setStepIndicator() {
		const steps = [...document.getElementsByClassName('step')];
		steps.forEach((step, index) => {
			if (index == currentPage) {
				step.classList.add('active');
				step.classList.remove('finish');
			} else if (index < currentPage) {
				step.classList.add('finish');
				step.classList.remove('active');
			} else {
				step.classList.remove('finish');
				step.classList.remove('active');
			}
		});
	}
}

export { closeBookingForm, openBookingForm };

{
	/* <div class="booking-form-price-sub-container">
            	${eventData.individualPrices
								.map(
									(item) => `<input type="radio" id="price-${item}" name="price" value=${item}>
							<label class="booking-form-sub-label" for="price-${item}">£${item}</label>`
								)
								.join('')}
						</div> */
}
