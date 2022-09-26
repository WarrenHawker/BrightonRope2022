import $ from 'jquery';
import individualParticipant from './html-templates/individual-participant';
import pairParticipant from './html-templates/pair-participant';
import groupParticipant from './html-templates/group-participant';

function openBookingForm() {
	const bookSessionButtons = document.querySelectorAll('.book-session');
	const bookingFormOverlay = document.getElementsByClassName('booking-form-overlay')[0];
	const spinnerLoader = document.getElementsByClassName('spinner-loader')[0];
	const eventInfo = document.getElementsByClassName('event-info')[0];
	const waitingListForm = document.getElementById('waiting-list-form');
	const bookingForm = document.getElementById('booking-form');
	const groupTicketsOnly = document.getElementById('group-tickets-only-message');
	const individualRadio = document.getElementById('booking-form-individual');
	const individualLabel = document.getElementById('individual-label');

	bookSessionButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			bookingFormOverlay.classList.add('active');
			spinnerLoader.classList.add('active');

			waitingListForm.style.display = 'none';
			bookingForm.style.display = 'none';

			$.getJSON(`http://brightonrope.local/wp-json/wp/v2/event/${e.target.id}`, (event) => {
				const eventData = {
					id: event.id,
					name: event.title.rendered,
					venue: event.acf.venue,
					soldOut: event.acf.sold_out,
					allowSingles: event.acf.allow_single_tickets,
					individualPrices: event.acf.individual_ticket_price.split(','),
					pairPrices: event.acf.group_ticket_price.split(','),
					startDate: convertDates(event.acf.start_date),
					endDate: convertDates(event.acf.end_date),
					startTime: convertTimes(event.acf.start_time),
					endTime: convertTimes(event.acf.end_time),
				};

				spinnerLoader.classList.remove('active');

				if (eventData.soldOut) {
					waitingListForm.style.display = 'block';
					bookingForm.style.display = 'none';
					waitingListFormValidation();
				} else {
					bookingForm.style.display = 'block';
					waitingListForm.style.display = 'none';
					showBookingFormPages();
					showParticipantContainers(eventData); //runs showPricesContainer function
				}

				if (!eventData.allowSingles) {
					groupTicketsOnly.style.display = 'block';
					individualRadio.parentElement.style.display = 'none';
					individualLabel.innerHTML = `Are you booking as a pair or a group?<span class="required"> * </span>`;
				} else {
					groupTicketsOnly.style.display = 'none';
					individualRadio.parentElement.style.display = 'flex';
					individualLabel.innerHTML = `Are you booking as an individual or group?<span class="required"> * </span>`;
				}

				if (eventData.endDate) {
					eventInfo.innerHTML = `
				    <h3 class="no-margin no-padding">${eventData.name}</h3>
				    <h4 class="no-margin no-padding">${eventData.startDate} - ${eventData.endDate}</h4>
						<h4 class="no-margin no-padding">${eventData.startTime} - ${eventData.endTime}</h4> 
				  `;
				} else {
					eventInfo.innerHTML = `
				    <h3 class="no-margin no-padding">${eventData.name}</h3>
				    <h4 class="no-margin no-padding">${eventData.startDate}</h4>
						<h4 class="no-margin no-padding">${eventData.startTime} - ${eventData.endTime}</h4> 
				  `;
				}
			});
		});
	});
}

function showParticipantContainers(data) {
	const individualOrGroupRadio = [...document.querySelectorAll('input[name="individualOrGroup"]')];
	const participantContainerGroup = document.getElementById('participant-container-group');
	individualOrGroupRadio.forEach((radio) => {
		radio.addEventListener('click', () => {
			let individualOrGroup = document.querySelector('input[name="individualOrGroup"]:checked').value;

			if (individualOrGroup == 'individual') {
				participantContainerGroup.innerHTML = individualParticipant();
				showPricesContainer(data.individualPrices);
			} else if (individualOrGroup == 'pair') {
				participantContainerGroup.innerHTML = pairParticipant();
				showPricesContainer(data.pairPrices);
			} else if (individualOrGroup == 'group') {
				participantContainerGroup.innerHTML = groupParticipant();
				showPricesContainer(data.pairPrices);
			}
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

function convertTimes(time) {
	return time.substring(0, 5);
}

function waitingListFormValidation() {
	const form = document.getElementById('waiting-list-form');
	const inputs = [...form.querySelectorAll('input'), ...form.querySelectorAll('select')];
	const submitBtn = document.getElementById('waiting-list-submit');

	submitBtn.addEventListener('click', () => {
		for (let i = 0; i < inputs.length; i++) {
			if (!inputs[i].checkValidity()) {
				if (inputs[i].type == 'radio') {
					inputs[i].parentElement.parentElement.classList.add('invalid');
				} else {
					inputs[i].parentElement.classList.add('invalid');
				}
			} else {
				if (inputs[i].type == 'radio') {
					inputs[i].parentElement.parentElement.classList.remove('invalid');
				} else {
					inputs[i].parentElement.classList.remove('invalid');
				}
			}
			inputs[i].oninput = function (e) {
				if (inputs[i].type == 'radio') {
					e.target.parentElement.parentElement.classList.remove('invalid');
				} else {
					e.target.parentElement.classList.remove('invalid');
				}
			};
		}
	});
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
			const inputs = [
				...formPages[currentPage].querySelectorAll('input'),
				...formPages[currentPage].querySelectorAll('select'),
			];
			const allValid = inputs.every((input) => input.reportValidity());

			for (let i = 0; i < inputs.length; i++) {
				if (!inputs[i].checkValidity()) {
					if (inputs[i].type == 'radio') {
						inputs[i].parentElement.parentElement.classList.add('invalid');
					} else {
						inputs[i].parentElement.classList.add('invalid');
					}
				} else {
					if (inputs[i].type == 'radio') {
						inputs[i].parentElement.parentElement.classList.remove('invalid');
					} else {
						inputs[i].parentElement.classList.remove('invalid');
					}
				}
				inputs[i].oninput = function (e) {
					if (inputs[i].type == 'radio') {
						e.target.parentElement.parentElement.classList.remove('invalid');
					} else {
						e.target.parentElement.classList.remove('invalid');
					}
				};
			}

			if (allValid) {
				currentPage += incrementor;
			}
		} else if (e.target.matches('[data-prev]')) {
			incrementor = -1;
			currentPage += incrementor;
		}

		if (incrementor == null) return;
		showCurrentPage();
		setStepIndicator();
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

function showPricesContainer(prices) {
	const pricesContainer = document.getElementById('prices-container');
	pricesContainer.innerHTML = `
		<p>Our sessions run on a Pay-What-You-Can system.</p> 
		<p class="label">Please select the total amount you wish to pay <span class="required"> * </span></p>
		<div class="radio-group-container">
		${prices
			.map(
				(item) =>
					`
					<div class="radio-sub-container">
					<input type="radio" id="price-${item}" name="price" value=${item} required><label class="booking-form-sub-label" for="price-${item}">£${item}</label>
					</div>
					`
			)
			.join('')}
		</div>
	`;
}

export { closeBookingForm, openBookingForm };
