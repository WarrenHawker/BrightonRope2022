import $ from 'jquery';

function closeAdminForm() {
	const closeButton = document.getElementById('admin-form-close');
	const adminFormOverlay = document.getElementsByClassName('admin-form-overlay')[0];

	closeButton.addEventListener('click', () => {
		adminFormOverlay.classList.remove('active');
	});
}

export { closeAdminForm };
