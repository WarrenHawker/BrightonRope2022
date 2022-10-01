export default function groupParticipant() {
	return `
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
      <p class="label">Participant 2 Name<span class="required"> * </span></p>
      <div class="input-container">
        <input type="text" name="fname2" required>
        <label class="sub-label" for="fname2">First</label>
      </div>
      <div class="input-container">
        <input type="text" name="lname2" required>
        <label class="sub-label" for="lname2">Last</label>
      </div>
    </fieldset>

    <fieldset class="participant-container">
      <p class="label">Participant 3 Name<span class="required"> * </span></p>
      <div class="input-container">
        <input type="text" name="fname3" required>
        <label class="sub-label" for="fname3">First</label>
      </div>
      <div class="input-container">
        <input type="text" name="lname3" required>
        <label class="sub-label" for="lname3">Last</label>
      </div>
    </fieldset>
  `;
}
