export default function individualParticipant() {
	return `
    <fieldset class="participant-container">
      <p class="label">Participant Name<span class="required"> * </span></p>
      <div class="input-container">
        <input type="text" name="fname1" required>
        <label class="sub-label" for="fname1">First</label>
      </div>
      <div class="input-container">
        <input type="text" name="lname1" required>
        <label class="sub-label" for="lname1">Last</label>
      </div>
    </fieldset>
  `;
}
