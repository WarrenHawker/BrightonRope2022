<!-- home page template -->
<?php get_header(); ?>
<main>
  <?php the_content();?>
</main>

<section class="homepage-events">
  <h1>Our Upcoming Events</h1>
  <?php 
      $today = date('Ymd');
      $homepageEvents = new WP_Query(array(
        'posts_per_page' => 3,
        'post_type' => 'event',
        'meta_key' => 'start_date',
        'orderby' => 'meta_value_num',
        'order' => 'ASC',
        'meta_query' => array(
          array(
            'key' => 'start_date',
            'compare' => '>=',
            'value' => $today,
            'type' => 'numeric'
          )
        )
      ));

        while($homepageEvents->have_posts()) {
          $homepageEvents->the_post();?>
          <div class="event-container">
            <div class="event-inner-container">
              <div class="event-date">
                <?php
                $eventDate = new DateTime(get_field('start_date'));
                $eventStartTime = new DateTime(get_field('start_time'));
                $eventEndTime = new DateTime(get_field('end_time'));
                if(get_field('single_day')) {
                  ?>
                    <p><?php echo $eventDate->format('d M');?></p>
                    <h3><?php echo $eventStartTime->format('g:ia');?></h3>
                <?php } else {
                  $eventEndDate = new DateTime(get_field('end_date'));
                  ?>
                    <p><?php echo $eventDate->format('d M');?> - <?php echo $eventEndDate->format('d M');?></p>
                    <h3><?php echo $eventStartTime->format('g:ia');?></h3>
                <?php }?>
              </div>
              
              <div class="event-summary">
                <h3 class="event-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3> 
                <p class="event-description"><?php 
                  if(has_excerpt()) {
                    echo the_excerpt();
                  } else {
                    echo wp_trim_words(get_the_content(), 15);
                  }?>
                </p>
              </div>
            </div>
            <div class="event-buttons">
              <a href="<?php echo site_url("/book")?>" class="button button-primary">Book This Session</a>
              <a href="<?php the_permalink(); ?>" class="button button-secondary">Learn more</a>
            </div>
          </div>
              

  <?php }?>
  <a class=" button button-primary view-all-events-button" href="<?php echo site_url("/whats-on")?>">View All Events</a>
</section>
<?php get_footer();?>