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
    <div class="event-search-container">
      <div>
        <label class="label" for="month">Month Filter:</label>
        <select id="month" name="month">
          <option value="all" selected>Show all</option>
          <?php 
            for ($x = 0; $x < count($event_start_months); $x++) {
              ?>
                <option id="<?php echo $event_start_months[$x] ?>" value="<?php echo $event_start_months[$x] ?>"><?php echo $event_start_months[$x] ?></option>
            <?php }?>
        </select>
      </div>

      <div>
        <label for="search-event">Search:</label>
        <input type="text" id="search-event" name="search-event">
      </div>
    </div>
  <?php    
  admin_show_events();
}

function admin_show_events() {
  ?>
    <table>
      <thead>
        <tr>
          <th>Event ID</th>
          <th>Event Name</th>
          <th>Event Start Date</th>
          <th>Event End Date</th>  
        </tr>
      </thead>
      <tbody>
        <?php $selectedEvents = new WP_Query(array(
          'posts_per_page' => -1,
          'post_type' => 'event',
          'meta_key' => 'start_date',
          'orderby' => 'meta_value_num',
          'order' => 'ASC'
        )); 
        while ($selectedEvents->have_posts()) {
          $selectedEvents->the_post();
          ?>
            <tr>
              <td><?php echo get_the_id() ?></td>
              <td><?php echo get_the_title() ?></td>
              <td><?php echo get_field('start_date') ?></td>
              <td><?php echo get_field('end_date') ?></td>
            </tr>   
          <?php
        }?>
      </tbody>
    </table>
  <?php 
}