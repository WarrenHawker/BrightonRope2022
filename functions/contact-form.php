<?php

function process_contact_form() {
  if(!isset($_POST['contact-form-nonce'])) {
    return;
  };
  if(!wp_verify_nonce($_POST['contact-form-nonce'], 'contact-us')) {
    return;
  };
  if($_POST['teacher'] == 'general') {
    $to = 'brightonrope@gmail.com';
  } else {
    $teacherID = $_POST['teacher'];
    $teamMember = get_field('user', $teacherID);
    $to = $teamMember->user_email;
  }
  $headers = array('Content-Type: text/html; charset=UTF-8', 'From: Brighton Rope Website <admin@brightonrope.co.uk>');
  $subject = 'new contact form submission';
  $body = "The following person has submitted a new contact form. Please respond at your earliest convenience: <br>
          Name: " .sanitize_text_field($_POST['fname']) . " " .sanitize_text_field($_POST['lname']) ."<br>
          Email: " .sanitize_text_field($_POST['email']) ."<br>
          Message: " .sanitize_text_field($_POST['message']);
  wp_mail($to, $subject, $body, $headers);
  wp_redirect(site_url('/confirmation'));

}
add_action('admin_post_nopriv_submit_contact_form', 'process_contact_form');