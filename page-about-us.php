<?php get_header(); ?>
<main>
<h1 class="page-title"><?php the_title() ?></h1>
  <section class="col-100">
    <?php the_content();?>
  </section>

  <section class="meet-the-team">
    <?php $teachers = new WP_Query(array(
      'posts_per_page' => -1,
      'post_type' => 'teachers'));

      while($teachers->have_posts()) {
        $teachers->the_post(); ?>
          <div class="team-member">
            <div class="profile-picture"> <img src="<?php $teacherImage = get_field('profile_picture'); echo esc_url($teacherImage ['url']);?>"></div>
                
            <div class="team-member-info">
              <h3> <?php the_title()?> (<?php esc_html(the_field('pronouns'))?>)<h3>
              <h4><?php esc_html(the_field('role'))?></h4>
              <p><?php the_content()?></p>
            </div>
          </div>
    <?php } wp_reset_postdata()?>
  </section>
</main>
<div class="spacer"></div>
<?php get_footer(); ?>