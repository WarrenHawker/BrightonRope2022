export default function participantsTable(data) {
	const participantDisplay = data
		.map((item) => {
			// prettier-ignore
			return `
      <li class="table-row body" id="participant-row-${item.Booking_ID}">
        <div class="table-item" data-name='ID'>${item.Booking_ID}</div>
        <div class="table-column single">
          <div class="table-item" data-name='Participant 1'>
            <input type="text" value="${item.Participant_1}" disabled></input>
          </div>
          <div class="table-item" data-name='Participant 2'>
            <input type="text" value="${item.Participant_2}" disabled></input>
          </div>
          <div class="table-item" data-name='Participant 3'>
            <input type="text" value="${item.Participant_3}" disabled></input>
          </div>
          <div class="table-item" data-name='Email'>
            <input type="text" value="${item.Email}" disabled></input>
          </div>
        </div>
        <div class="table-item" data-name='Additional Information'>
          <textarea disabled>${item.Additional_info}</textarea>
        </div>
        <div class="table-column double">
          <div class="table-item" data-name='Amount Paid'>£${item.Amount_paid}</div>
          <div class="table-item" data-name='Submission Date'>${convertDates(item.Submission_date)}</div>
        </div>
        <div class="table-item" data-name='Notes'>
          <textarea disabled>${item.Notes}</textarea>
        </div>
        <div class="participant-action-buttons">
          <button class="btn-admin btn-participant-edit" id="btn-participant-edit-${item.Booking_ID}">Edit</button>
          <button class="btn-admin">Move</button>
          <button class="btn-admin delete btn-participant-delete" id="btn-participant-delete-${item.Booking_ID}">Delete</button>
        </div>
        <div class="participant-edit-buttons">
          <button class="btn-admin btn-participant-cancel" id="btn-participant-cancel-${item.Booking_ID}">Cancel</button>
          <button class="btn-admin primary btn-participant-save" id="btn-participant-save-${item.Booking_ID}">Save</button>
        </div>
      </li>
    `
		})
		.join('');
	// prettier-ignore
	return `
  <div class="table-heading">
    <h1>Event Participants</h1>
    <button class="btn-admin primary" id="add-participant">Add new Participant</button>
  </div>
  <div class="participant-table">
    <ol>
      <li class="table-row head">
        <div class="table-item">ID</div>
        <div class="table-column single">
            <div class="table-item">Participant 1</div>
            <div class="table-item">Participant 2</div>
            <div class="table-item">Participant 3</div>
            <div class="table-item">Email</div>
        </div>
        <div class="table-item">Additional Information</div>
        <div class="table-column double">
          <div class="table-item">Amount <br> Paid</div>
          <div class="table-item">Submission <br> Date</div>
        </div>
        <div class="table-item">Notes</div>
      </li>
      ${participantDisplay}
    </ol>
  </div>
  `;
}

function convertDates(date) {
	if (!date) {
		return;
	}
	const newDate = new Date(date);

	return newDate.toLocaleDateString('en-US');
}
