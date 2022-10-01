<?php
require_once ABSPATH . 'wp-settings.php';

function event_admin_page() {
  add_submenu_page('edit.php?post_type=event', 'Admin', 'Admin', 'edit_events', 'edit-tags.php?post_type=event_participants', 'admin_HTML');
}

add_action('admin_menu', 'event_admin_page'); 

function admin_HTML() { ?>
    <h1>Events Admin</h1>
    <?php  
      $event_start_months = [];
      $postedEvents = new WP_Query(array(
        'posts_per_page' => -1,
        'post_type' => 'event',
        'meta_key' => 'start_date',
        'orderby' => 'meta_value_num',
        'order' => 'ASC'
      )); 

      while ($postedEvents->have_posts()) {
        $postedEvents->the_post(); 
        $start_date = new DateTime(get_field('start_date'));
        $formatted_start_date = $start_date->format('M Y');
        array_push($event_start_months, $formatted_start_date);
      }
     $event_start_months = array_values(array_unique($event_start_months));
    ?>  
    <div class="events-admin-container">
      <div>
        <label class="label" for="month">Month Filter:</label>
        <select id="event-month" name="event-month">
          
          <option value="all" selected>Show all</option>
          <?php 
            for ($x = 0; $x < count($event_start_months); $x++) {
              ?>
                <option id="<?php echo $event_start_months[$x] ?>" value="<?php echo $event_start_months[$x] ?>"><?php echo $event_start_months[$x] ?></option>
            <?php }?>
        </select>
      </div>

      <!-- <div>
        <label for="search-event">Search:</label>
        <input type="text" id="search-event" name="search-event">
      </div> -->
    </div>

    <div class="event-tables-container">
      <div id="admin-event-table"></div>
      <div class="event-tables-sub-container">
        <div id="event-participant-table"></div>
        <div id="event-waiting-list-table"></div>
      </div>
    </div>
  <?php    
}

function admin_show_events() {
  global $wpdb;
  if($_POST['month'] == 'all') {
    $selected_events = new WP_Query(array(
      'posts_per_page' => -1,
      'post_type' => 'event',
      'meta_key' => 'start_date',
      'orderby' => 'meta_value_num',
      'order' => 'ASC'
    ));
  } else {
    $selected_month = new DateTime($_POST['month']);
  
    $month_start = $selected_month->format('Ymd');
    $days_in_month = $selected_month->format('t');
    $year = $selected_month->format('Y');
    $month = $selected_month->format('m');
    $month_end = $year . $month . $days_in_month;
    
    $selected_events = new WP_Query(array(
      'posts_per_page' => -1,
      'post_type' => 'event',
      'meta_key' => 'start_date',
      'orderby' => 'meta_value_num',
      'order' => 'ASC',
      'meta_query' => array(
        array(
          'key' => 'start_date',
          'compare' => 'BETWEEN',
          'value' => array($month_start, $month_end),
          'type' => 'numeric'
        )
      )
    ));
  }
  ?>
    <table class="admin-event-table">
      <thead>
        <tr>
          <th>Event ID</th>
          <th>Event Name</th>
          <th>Event Start Date</th>
          <th>Event End Date</th>  
        </tr>
      </thead>
      <tbody>
  <?php
    while($selected_events->have_posts()) {
      $selected_events->the_post();?>
        <tr class="admin-event-row" onclick="getEventParticipants(event)" id="<?php echo get_the_id()?>">
          <td><?php echo get_the_id() ?></td>
          <td><?php echo get_the_title() ?></td>
          <td><?php echo get_field('start_date') ?></td>
          <td><?php echo get_field('end_date') ?></td>
        </tr>   
      <?php 
    };
  ?> 
      </tbody>
    </table>
  <?php 
  wp_die();   
}

function admin_get_participants() {
  global $wpdb;
  $selected_event = "wp_event_" . $_POST['eventID'] . "_participants";
  $query = $wpdb->prepare("SELECT * FROM $selected_event ORDER BY Booking_ID Asc");
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
                  <button id=<?php echo "edit-participant-" . $rows->Booking_ID ?> onclick="setParticipantRowEdit(event, <?php echo $rows->Booking_ID?>)">EDIT</button>
                  <button id=<?php echo "move-participant-" . $rows->Booking_ID ?>>MOVE</button>
                  <button id=<?php echo "delete-participant-" . $rows->Booking_ID ?>>DELETE</button>
                  <div class="save-cancel-buttons">
                    <button>Cancel</button>
                    <button>Save</button>
                  </div>
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
              <td> 
                <input type="text" name="amountPaid" value="<?php echo $rows->Amount_paid ?>" disabled/> 
              </td>
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
  $selected_event = "wp_event_" . $_POST['eventID'] . "_waiting";
  $query = $wpdb->prepare("SELECT * FROM $selected_event ORDER BY Inquiry_ID Asc");
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

add_action('wp_ajax_admin_get_events', 'admin_show_events');
add_action('wp_ajax_admin_get_participants', 'admin_get_participants');
add_action('wp_ajax_admin_get_waiting_list', 'admin_get_waiting_list');