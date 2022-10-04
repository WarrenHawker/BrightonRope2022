// export default function participantsTable(data) {
// const participantDisplay = data
// 	.map((item) => {
// 		// prettier-ignore
// 		return `
//     <div class="table-row body">
//       <div class="table-column id">
//         <li class="table-item">${item.Booking_ID}</li>
//       </div>
//       <div class="table-column single">
//         <li class="table-item">${item.Participant_1}</li>
//         <li class="table-item">${item.Participant_2}</li>
//         <li class="table-item">${item.Participant_3}</li>
//         <li class="table-item">${item.Email}</li>
//       </div>
//       <div class="table-column full">
//         <li class="table-item info">${item.Additional_info}</li>
//       </div>
//       <div class="table-column double">
//         <li class="table-item">${item.Amount_paid}</li>
//         <li class="table-item">${item.Submission_date}</li>
//       </div>
//       <div class="table-column full">
//         <li class="table-item notes">${item.Notes}</li>
//       </div>
//     </div>
//   `
// 	})
// 	.join('');
// 	// prettier-ignore
// 	return `

//     <div class="table participant-table">
//         <div class="table-row head">
//           <div class="table-column id">
//             <li class="table-item">ID</li>
//           </div>
//           <div class="table-column single">
//             <li class="table-item">Participant 1</li>
//             <li class="table-item">Participant 2</li>
//             <li class="table-item">Participant 3</li>
//             <li class="table-item">Email</li>
//           </div>
//           <div class="table-column full">
//             <li class="table-item info">Additional Information</li>
//           </div>
//           <div class="table-column double">
//             <li class="table-item">Amount <br> Paid</li>
//             <li class="table-item">Submission <br> Date</li>
//           </div>
//           <div class="table-column full">
//             <li class="table-item notes">Notes</li>
//           </div>
//         </div>
//         ${participantDisplay}
//     </div>

// //   `
// // }

export default function participantsTable(data) {
	const participantDisplay = data
		.map((item) => {
			// prettier-ignore
			return `
      <li class="table-row body">
        <div class="table-item" data-name='ID'>${item.Booking_ID}</div>
        <div class="table-column single">
          <div class="table-item" data-name='Participant 1'>${item.Participant_1}</div>
          <div class="table-item" data-name='Participant 2'>${item.Participant_2}</div>
          <div class="table-item" data-name='Participant 3'>${item.Participant_3}</div>
          <div class="table-item" data-name='Email'>${item.Email}</div>
        </div>
        <div class="table-item" data-name='Additional Information'>${item.Additional_info}</div>
        <div class="table-column double">
          <div class="table-item" data-name='Amount Paid'>£${item.Amount_paid}</div>
          <div class="table-item" data-name='Submission Date'>${convertDates(item.Submission_date)}</div>
        </div>
        <div class="table-item" data-name='Notes'>${item.Notes}</div>
        <div class="participant-action-buttons">
        <button>Edit</button>
        <button>Move</button>
        <button>Delete</button>
      </div>
      </li>
      
    `
		})
		.join('');
	// prettier-ignore
	return `
  <div class="table-heading">
    <h1>Event Participants</h1>
    <button id="add-participant">Add new Participant</button>
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
  `
}

function convertDates(date) {
	if (!date) {
		return;
	}
	const newDate = new Date(date);

	return newDate.toLocaleDateString('en-US');
}
