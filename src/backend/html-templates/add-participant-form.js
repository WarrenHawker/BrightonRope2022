export default function addParticipantForm(eventID, isEventFull, title) {
	return `
			<form class="admin-form add-participants">
				<h1>Add new participants to event: ${title}</h1>
				<h2 class='event-full-message'>
					${isEventFull ? `WARNING: this event is full, are you sure you wish to add a new participant??` : ''}
				</h2>
				<fieldset class="participant-container">
					<p class="label">Participant 1 Name<span class="required"> * </span></p>
					<div class="input-container">
						<input type="text" name="fname1" required>
						<label class="sub-label" for="fname1">First</label>
					</div>
					<div class="input-container">
						<input type="text" name="lname1" required>
						<label class="sub-label" for="lname1">Last</label>
					</div>
				</fieldset>

				<fieldset class="participant-container">
					<p class="label">Participant 2 Name</p>
					<div class="input-container">
						<input type="text" name="fname2">
						<label class="sub-label" for="fname2">First</label>
					</div>
					<div class="input-container">
						<input type="text" name="lname2">
						<label class="sub-label" for="lname2">Last</label>
					</div>
				</fieldset>

				<fieldset class="participant-container">
					<p class="label">Participant 3 Name</p>
					<div class="input-container">
						<input type="text" name="fname3">
						<label class="sub-label" for="fname3">First</label>
					</div>
					<div class="input-container">
						<input type="text" name="lname3">
						<label class="sub-label" for="lname3">Last</label>
					</div>
				</fieldset>

				<fieldset class="input-container email ">
          <label class="label" for="email">Email<span class="required"> * </span></label>
          <input type="email" name="email" required>
        </fieldset>

				<fieldset class="input-container info">
          <label class="label" for="additional-info">Additional Information</label>
          <textarea name="additional-info"></textarea>
        </fieldset>

				<button class="btn-admin primary large">Submit</button>
			</form>
		`;
}
