<?php

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

function insert_event_participants() {

}

function insert_event_waitingList() {

}

function delete_event_participants() {

}

function delete_event_waitingList() {

}

function update_event_participants() {

}

function update_event_waitingList() {

}

function purge_event_participants() {

}

function purge_event_waitingList() {
  
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