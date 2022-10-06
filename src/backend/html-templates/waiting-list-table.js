export default function waitingListTable(data) {
	const waitingListDisplay = data
		.map((item) => {
			// prettier-ignore
			return `
				<li class="table-row body" id="waiting-list-row-${item.Inquiry_ID}">
					<div class="table-item non-input" data-name='ID'>${item.Inquiry_ID}</div>
					<div class="table-item" data-name='Name'>
						<input type="text" value="${item.Inquiry_Name}" disabled></input>
					</div>
					<div class="table-item"data-name='Email'>
						<input type="text" value="${item.Email}" disabled></input>
					</div>
					<div class="table-item" data-name='Participants'>
						<select disabled>
							<option value="Individual">Individual</option>
							<option value="Pair">Pair</option>
							<option value="Group">Group</option>
						</select>
					</div>
					<div class="table-item non-input" data-name='Submission Date'>${convertDates(item.Submission_date)}</div>
					<div class="table-item" data-name='Notes'>
						<textarea disabled>${item.Notes}</textarea>
					</div>
					<div class="waiting-list-action-buttons">
            <button class="btn-admin btn-waiting-list-edit" id="btn-participant-edit-${item.Inquiry_ID}">Edit</button>
            <button class="btn-admin">Move</button>
            <button class="btn-admin delete btn-waiting-list-delete" id="btn-waiting-list-delete-${item.Inquiry_ID}">Delete</button>
          </div>
          <div class="waiting-list-edit-buttons">
            <button class="btn-admin btn-waiting-list-cancel" id="btn-waiting-list-cancel-${item.Inquiry_ID}">Cancel</button>
            <button class="btn-admin primary btn-waiting-list-save" id="btn-waiting-list-save-${item.Inquiry_ID}">Save</button>
          </div>
			</li>
    `
		})
		.join('');
	// prettier-ignore
	return `
  <div class="table-heading">
    <h1 id="waiting-list-table-header">Waiting List</h1>
    <button class="btn-admin primary large" id="add-inquiry">Add new Inquiry</button>
  </div>
  <div class="waiting-list-table">
    <ol>
      <li class="table-row head">
        <div class="table-item">ID</div>
        <div class="table-item">Name</div>
        <div class="table-item">Email</div>
				<div class="table-item">Participants</div>
        <div class="table-item">Submission <br> Date</div>
        <div class="table-item">Notes</div>
      </li>
			${waitingListDisplay}
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
