<?php
require_once ABSPATH . 'wp-settings.php';

function create_event_participants_table($event_ID) {
  global $wpdb;
  $charset_collate = $wpdb->get_charset_collate();
  $table_name = "wp_event_" . $event_ID . "_participants";
  $sql = "CREATE TABLE `$table_name` (
    Booking_ID int NOT NULL AUTO_INCREMENT,
    Participant_1 text NOT NULL,
    Participant_2 text,
    Participant_3 text, 
    Email text NOT NULL,
    Amount_paid text NOT NULL,
    Additional_info text,
    Submission_date date NOT NULL,
    Notes text, 
    PRIMARY KEY  (Booking_ID)
  ) $charset_collate;";

  require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
  dbDelta($sql);
}

function create_event_waitingList_table($event_ID) {
  global $wpdb;
  $charset_collate = $wpdb->get_charset_collate();
  $table_name = "wp_event_" . $event_ID . "_waiting";
  $sql = "CREATE TABLE `$table_name` (
    Inquiry_ID int NOT NULL AUTO_INCREMENT,
    Inquiry_Name text NOT NULL, 
    Email text NOT NULL,
    Participants text NOT NULL,
    Submission_date date NOT NULL,
    Notes text, 
    PRIMARY KEY  (Inquiry_ID)
  ) $charset_collate;";
  

  require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
  dbDelta($sql);
}

function admin_get_participants() {
  global $wpdb;
  $selected_table = "wp_event_" . $_POST['eventID'] . "_participants";
  $query = $wpdb->prepare("SELECT * FROM $selected_table ORDER BY Booking_ID Asc");
  $participants = $wpdb->get_results($query);
  ?>
    <h1>Event Participants <button>Add new Participant</button></h1>
    
    <table class="admin-event-table participants">
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Participant 1</th>
          <th>Participant 2</th>
          <th>Participant 3</th>
          <th>Email</th>
          <th>Amount paid</th>
          <th>Additional Information</th>
          <th>Submission Date</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach($participants as $rows) { 
          $formatted_date = new DateTime($rows->Submission_date);
          $formatted_date = $formatted_date->format('jS M Y');
          ?>
            <tr onclick="setParticipantRowActive(event, <?php echo $rows->Booking_ID?>)" class="participant-row" id=<?php echo "participant-row-" . $rows->Booking_ID?>>
              <td><?php echo $rows->Booking_ID ?>
                <div class="participant-actions" id=<?php echo "participant-actions-" . $rows->Booking_ID ?>>
                  <button onclick="setParticipantRowEdit(event, <?php echo $rows->Booking_ID?>)">EDIT</button>
                  <button>MOVE</button>
                  <button class="btn-delete" onclick="updateParticipantInfo(event, <?php echo $rows->Booking_ID?>)">DELETE</button>
                </div>
                <div class="participant-edit-actions">
                  <button class="btn-cancel" onclick="updateParticipantInfo(event, <?php echo $rows->Booking_ID?>)">Cancel</button>
                  <button class="btn-save" onclick="updateParticipantInfo(event, <?php echo $rows->Booking_ID?>)">Save</button>
                </div>
              </td>
              <td> 
                <input type="text" name="participant1" value="<?php echo $rows->Participant_1 ?>" disabled/> 
              </td>
              <td> 
                <input type="text" name="participant2" value="<?php echo $rows->Participant_2 ?>" disabled/> 
              </td>
              <td> 
                <input type="text" name="participant3" value="<?php echo $rows->Participant_3 ?>" disabled/> 
              </td>
              <td> 
                <input type="text" name="email" value="<?php echo $rows->Email ?>" disabled/> 
              </td>
              <td>£<?php echo $rows->Amount_paid ?></td>
              <td> 
                <textarea name="additionalInfo" disabled> <?php echo $rows->Additional_info ?></textarea> 
              </td>
              <td><?php echo $formatted_date ?></td>
              <td> 
                <textarea name="notes" disabled> <?php echo $rows->Notes ?></textarea> 
              </td>   
          </tr>
        <?php }?>
      </tbody>
    </table>
    <button id=<?php echo "purge-participants-" . $_POST['eventID']?>>Purge Event Participants</button>
  <?php
  wp_die();
}

function admin_get_waiting_list() {
  global $wpdb;
  $selected_table = "wp_event_" . $_POST['eventID'] . "_waiting";
  $query = $wpdb->prepare("SELECT * FROM $selected_table ORDER BY Inquiry_ID Asc");
  $waiting_list = $wpdb->get_results($query);
  ?>
    <h1>Event Waiting List <button>Add new Inquiry</button></h1>
    
    <table class="admin-event-table waiting-list">
      <thead>
        <tr>
          <th>Inquiry ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Participants</th>
          <th>Submission Date</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach($waiting_list as $rows) { 
          $formatted_date = new DateTime($rows->Submission_date);
          $formatted_date = $formatted_date->format('jS M Y');
          ?>
            <tr>
              <td><?php echo $rows->Inquiry_ID ?></td>
              <td><?php echo $rows->Inquiry_Name ?></td>
              <td><?php echo $rows->Email ?></td>
              <td><?php echo $rows->Participants ?></td>
              <td><?php echo $rows->$formatted_date ?></td>
              <td><?php echo $rows->Notes ?></td>
          </tr>
        <?php }?>
      </tbody>
    </table>
  <?php
  wp_die();
}

function admin_get_participant_info() {
  global $wpdb;

  $selected_table = "wp_event_" . $_POST['eventID'] . "_participants";
  $selected_participant = $_POST['participantID'];
  $query = $wpdb->prepare("SELECT * FROM $selected_table WHERE Booking_ID=$selected_participant ORDER BY Booking_ID Asc");
  $participant = $wpdb->get_results($query);

  $participant_info = (object) [
    'Participant_1' => $participant[0]->Participant_1,
    'Participant_2' => $participant[0]->Participant_2,
    'Participant_3' => $participant[0]->Participant_3,
    'Email' => $participant[0]->Email,
    'Additional_info' => $participant[0]->Additional_info,
    'Notes' => $participant[0]->Notes,
  ];

  $participant_info_JSON = json_encode($participant_info);
  echo $participant_info_JSON;

  wp_die();
}

function admin_set_participant_info() {
  global $wpdb;
  $selected_table = "wp_event_" . $_POST['eventID'] . "_participants";
  $selected_participant = $_POST['participantID'];
  $where = ['Booking_ID' => $selected_participant];
  $data_to_insert = array(
    'Participant_1' => sanitize_text_field($_POST['participant1']),
    'Participant_2' => sanitize_text_field($_POST['participant2']),
    'Participant_3' => sanitize_text_field($_POST['participant3']),
    'Email' => sanitize_text_field($_POST['email']),
    'Additional_info' => sanitize_text_field($_POST['additionalInfo']),
    'Notes' => sanitize_text_field($_POST['notes'])
  );
  $wpdb->update($selected_table, $data_to_insert, $where);

  wp_die();
}

function admin_delete_participant() {
  global $wpdb;
  $selected_table = "wp_event_" . $_POST['eventID'] . "_participants";
  $selected_participant = $_POST['participantID'];
  $where = ['Booking_ID' => $selected_participant];

  $wpdb->delete($selected_table, $where);
  wp_die();
}

function wpdocs_run_on_publish_only( $new_status, $old_status, $post ) {
  if ( ( 'publish' === $new_status && 'publish' !== $old_status )
      && 'event' === $post->post_type
  ) {

    $event_post = get_post($post);
    $event_ID = $event_post->ID; 
    create_event_participants_table($event_ID);
    create_event_waitingList_table($event_ID);
  }
}
add_action('transition_post_status', 'wpdocs_run_on_publish_only', 10, 3);

add_action('wp_ajax_admin_get_participants', 'admin_get_participants');
add_action('wp_ajax_admin_get_waiting_list', 'admin_get_waiting_list');
add_action('wp_ajax_admin_get_participant_info', 'admin_get_participant_info');
add_action('wp_ajax_admin_set_participant_info', 'admin_set_participant_info');
add_action('wp_ajax_admin_delete_participant', 'admin_delete_participant');
