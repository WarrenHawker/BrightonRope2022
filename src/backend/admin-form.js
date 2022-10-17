import $ from 'jquery';
import addInquiryForm from './html-templates/add-inquiry-form';
import addParticipantForm from './html-templates/add-participant-form';

const formSubContainer = document.querySelector('.admin-form-sub-container');
const formOverlay = document.querySelector('.admin-form-overlay');

function openAdminForm(eventID, type) {
	formOverlay.classList.add('active');

	let data = {
		action: 'admin_is_event_full',
		eventID: eventID,
	};

	$.post(ajaxData.ajaxurl, data, function (response) {
		const responseData = JSON.parse(response);
		if (type == 'participant') {
			formSubContainer.innerHTML = addParticipantForm(eventID, responseData.sold_out, responseData.title);
		} else if (type == 'inquiry') {
			formSubContainer.innerHTML = addInquiryForm(eventID);
		}
	});
}

function closeAdminForm() {
	const closeButton = document.getElementById('admin-form-close');
	closeButton.addEventListener('click', () => {
		formOverlay.classList.remove('active');
		formSubContainer.empty();
	});
}

export { openAdminForm, closeAdminForm };
