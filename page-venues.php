<?php get_header(); ?>
<main>
<h1 class="page-title"><?php the_title() ?></h1>
  <section class="col-100">
    <?php the_content();?>
  </section>

  <section class="venues-group">
    <?php $venues = new WP_Query(array(
        'posts_per_page' => -1,
        'post_type' => 'venue'));

        while($venues->have_posts()) {
          $venues->the_post();?>
          <div class="venue-container">
            <h1><?php the_title();?></h1>
            <?php the_content();?>
          </div>
      <?php } wp_reset_postdata()?>
  </section>
</main>
<div class="spacer"></div>
<?php get_footer(); ?>