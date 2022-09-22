<?php get_header(); ?>
<main>
  <section class="single-event-details">
    <h1 class="page-title"><?php the_title() ?></h1>
    <?php 
      $eventStartDate = new DateTime(get_field('start_date'));
      $eventStartTime = new DateTime(get_field('start_time'));
      $eventEndTime = new DateTime(get_field('end_time'));

      if(get_field('single_day')) {
        $formattedStartDate = $eventStartDate->format('l jS F');
        ?><h3><?php echo esc_html($formattedStartDate);?></h3>
      <?php } else {
        $eventEndDate = new DateTime(get_field('end_date'));
        $eventStartMonth = $eventStartDate->format('m');
        $eventEndMonth = $eventEndDate->format('m');

        if($eventStartMonth == $eventEndMonth) {
          $formattedStartDate = $eventStartDate->format('l jS');
          $formattedEndDate = $eventEndDate->format('l jS F');
        } else {
          $formattedStartDate = $eventStartDate->format('l jS F');
          $formattedEndDate = $eventEndDate->format('l jS F');
        }        
        ?><h3> <?php echo esc_html($formattedStartDate);?> - <?php echo esc_html($formattedEndDate);?></h3>
      <?php }?>

      <h3><?php echo esc_html($eventStartTime->format('g:ia'));?> - <?php echo esc_html($eventEndTime->format('g:ia'));?>

      <?php if(!get_field('venue')) {
        ?><h3>Venue: TBC</h3>
      <?php } else {
        $event_venue = get_field('venue');
        $event_venue_link = get_permalink($event_venue->ID);
        ?><h3>Venue: <a href="<?php echo esc_url($event_venue_link);?>"><?php echo esc_html($event_venue->post_title);?></a></h3> 
      <?php }
    ?>
  </section>

  <section class="col-50 single-event-picture"> 
    <img src="<?php 
      $eventPicture = get_field('picture');
      echo esc_url($eventPicture ['url']);?>">
    <p><?php echo esc_html(get_field('picture_caption'))?></p>
  </section>

  <section class="col-50">
    <?php the_content();?>
  </section>

  <div class="event-buttons single-event-buttons">
    <a href="<?php echo esc_url(site_url('/whats-on')); ?>" class="button button-secondary">See all Events</a>
    <a href="<?php echo esc_url(site_url("/book"))?>" class="button button-primary">Book This Session</a>
  </div>
</main>
<div class="spacer"></div>

<?php get_footer(); ?>