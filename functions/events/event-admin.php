<?php
require_once ABSPATH . 'wp-settings.php';

function event_admin_page() {
  add_submenu_page('edit.php?post_type=event', 'Admin', 'Admin', 'edit_events', 'edit-tags.php?post_type=event_participants', 'admin_HTML');
}
add_action('admin_menu', 'event_admin_page'); 

function admin_HTML() { ?>
  <div class="events-admin-page">
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
    <div class="events-filter-container">
      <div class="events-admin-sub-container">
        <label for="month">Month Filter:</label>
        <select id="event-month" name="event-month">
          
          <option value="all" selected>Show all</option>
          <?php 
            for ($x = 0; $x < count($event_start_months); $x++) {
              ?>
                <option id="<?php echo $event_start_months[$x] ?>" value="<?php echo $event_start_months[$x] ?>"><?php echo $event_start_months[$x] ?></option>
            <?php }?>
        </select>
      </div>
      <button class="btn-admin large" id="btn-back-events">Back</button>
    </div>

    <div class="event-tables-container">
      <div id="admin-event-table"></div>
      <div class="event-tables-sub-container">
        <div id="participant-table-container"></div>
        <div id="waiting-list-table-container"></div>
      </div>
    </div>

    <div class="admin-form-overlay">
      <div class="admin-form-container">
        <i class="fa fa-window-close" id="admin-form-close" aria-hidden="true"></i>
      </div>
    </div> 
  </div>
  <?php    
}

function admin_get_events() {
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
        <tr class="admin-event-row" id="<?php echo get_the_id()?>">
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
add_action('wp_ajax_admin_get_events', 'admin_get_events');

