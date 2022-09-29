export default function pairParticipant() {
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
  `;
}
