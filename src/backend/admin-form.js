import $ from 'jquery';
import addInquiryForm from './html-templates/add-inquiry-form';
import addParticipantForm from './html-templates/add-participant-form';

const formSubContainer = document.querySelector('.admin-form-sub-container');
const formOverlay = document.querySelector('.admin-form-overlay');

function openAdminForm(eventID, type) {
	formOverlay.classList.add('active');
	console.log(formSubContainer);

	if (type == 'participant') {
		formSubContainer.innerHTML = addParticipantForm();
	} else if (type == 'inquiry') {
		formSubContainer.innerHTML = addInquiryForm();
	}
}

function closeAdminForm() {
	const closeButton = document.getElementById('admin-form-close');
	closeButton.addEventListener('click', () => {
		formOverlay.classList.remove('active');
		formSubContainer.empty();
	});
}

export { openAdminForm, closeAdminForm };
