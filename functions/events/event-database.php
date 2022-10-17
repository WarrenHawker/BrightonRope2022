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

  $participants_JSON = json_encode($participants);
  echo $participants_JSON;
  
  wp_die();
}

function admin_get_waiting_list() {
  global $wpdb;
  $selected_table = "wp_event_" . $_POST['eventID'] . "_waiting";
  $query = $wpdb->prepare("SELECT * FROM $selected_table ORDER BY Inquiry_ID Asc");
  $waiting_list = $wpdb->get_results($query);
  
  $waiting_list_JSON = json_encode($waiting_list);
  echo $waiting_list_JSON;

  wp_die();
}

function admin_get_participant_info() {
  global $wpdb;

  $selected_table = "wp_event_" . $_POST['eventID'] . "_participants";
  $selected_participant = $_POST['participantID'];
  $query = $wpdb->prepare("SELECT * FROM $selected_table WHERE Booking_ID=$selected_participant ORDER BY Booking_ID Asc");
  $participant = $wpdb->get_results($query);

  $participant_JSON = json_encode($participant);
  echo $participant_JSON;

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

function admin_get_waiting_list_info() {
  global $wpdb;

  $selected_table = "wp_event_" . $_POST['eventID'] . "_waiting";
  $selected_Inquiry = $_POST['waitingListID'];
  $query = $wpdb->prepare("SELECT * FROM $selected_table WHERE Inquiry_ID=$selected_Inquiry ORDER BY Inquiry_ID Asc");
  $Inquiry = $wpdb->get_results($query);

  $Inquiry_JSON = json_encode($Inquiry);
  echo $Inquiry_JSON;

  wp_die();
}

function admin_set_waiting_list_info() {
  global $wpdb;
  $selected_table = "wp_event_" . $_POST['eventID'] . "_waiting";
  $selected_Inquiry = $_POST['inquiryID'];
  $where = ['Inquiry_ID' => $selected_Inquiry];
  $data_to_insert = array(
    'Inquiry_Name' => sanitize_text_field($_POST['name']),
    'Email' => sanitize_text_field($_POST['email']),
    'Participants' => $_POST['participants'],
    'Notes' => sanitize_text_field($_POST['notes'])
  );
  $wpdb->update($selected_table, $data_to_insert, $where);

  wp_die();
}

function admin_delete_waiting_list_info() {
  global $wpdb;
  $selected_table = "wp_event_" . $_POST['eventID'] . "_waiting";
  $selected_Inquiry = $_POST['inquiryID'];
  $where = ['Inquiry_ID' => $selected_Inquiry];

  $wpdb->delete($selected_table, $where);
  wp_die();
}

function add_new_participant() {
  global $wpdb;

}

function add_new_inquiry() {
  global $wpdb;
}

function wpdocs_run_on_publish_only( $new_status, $old_status, $post ) {
  if ( ( 'publish' === $new_status && 'publish' !== $old_status )
      && 'event' === $post->post_type
  ) {

    $event_post = get_post($post);
    $event_ID = $event_post->ID; 
    if(get_field('free_event', $event_ID) == false) {
      create_event_participants_table($event_ID);
      create_event_waitingList_table($event_ID);
    }
  }
}
add_action('transition_post_status', 'wpdocs_run_on_publish_only', 10, 3);

add_action('wp_ajax_admin_get_participants', 'admin_get_participants');
add_action('wp_ajax_admin_get_waiting_list', 'admin_get_waiting_list');

add_action('wp_ajax_admin_get_participant_info', 'admin_get_participant_info');
add_action('wp_ajax_admin_set_participant_info', 'admin_set_participant_info');
add_action('wp_ajax_admin_delete_participant', 'admin_delete_participant');

add_action('wp_ajax_admin_get_waiting_list_info', 'admin_get_waiting_list_info');
add_action('wp_ajax_admin_set_waiting_list_info', 'admin_set_waiting_list_info');
add_action('wp_ajax_admin_delete_waiting_list_info', 'admin_delete_waiting_list_info');

add_action('wp_ajax_add_new_participant', 'add_new_participant');
add_action('wp_ajax_add_new_inquiry', 'add_new_inquiry');
