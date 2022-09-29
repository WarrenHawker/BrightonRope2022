<?php

function create_event_participants_table() {
  global $wpdb;
  $charset_collate = $wpdb->get_charset_collate();
  $eventID = get_the_ID();
  $table_name = "wp_event_" . $eventID . "_participants";
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

function create_event_waitingList_table() {
  global $wpdb;
  $charset_collate = $wpdb->get_charset_collate();
  $eventID = get_the_ID();
  $table_name = "wp_event_" . $eventID . "_waiting";
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


function wpdocs_run_on_publish_only( $new_status, $old_status, $post ) {
  if ( ( 'publish' === $new_status && 'publish' !== $old_status )
      && 'event' === $post->post_type
  ) {
    create_event_participants_table();
    create_event_waitingList_table();
  }
}

add_action('transition_post_status', 'wpdocs_run_on_publish_only', 10, 3);