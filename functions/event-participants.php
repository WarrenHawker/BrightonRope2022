<?php
require_once ABSPATH . 'wp-settings.php';

function eventParticipantsPage() {
  add_submenu_page('edit.php?post_type=event', 'Participants', 'Participants', 'edit_events', 'edit-tags.php?post_type=event_participants', 'participants_HTML');
}

add_action('admin_menu', 'eventParticipantsPage'); 

function participants_HTML() { ?>
  <div class="wrap">
    <h1>Event Participants</h1>

    <?php  $postedEvents = new WP_Query(array(
            'posts_per_page' => -1,
            'post_type' => 'event',
            'meta_key' => 'start_date',
            'orderby' => 'meta_value_num',
            'order' => 'ASC'
      )) ?>  
    
    <form class="form-table" method="POST">
      <label for="event">Choose an event:</label>
      <select id="event" name="event">
        <option value="" disabled selected>--select--</option>
        <?php while($postedEvents->have_posts()) {
              $postedEvents->the_post();?>
        <option id="<?php the_ID()?>" value="<?php the_ID() ?>"><?php the_title()?></option>
        <?php } ?>
      </select>
    </form>
  </div>
<?php }