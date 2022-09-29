<?php get_header(); ?>
<main>
<h1 class="page-title"><?php the_title() ?></h1>
  <section class="col-100">
    <?php the_content();?>
  </section>

  <section>
    <p class="contact-us-para">If you'd like to contact a specific member of our team, please select from the "Teacher" dropdown menu below and they will contact you directly.</p>
    <p class="contact-us-para">General Inquiries messages can be seen by all team members.</p>

    <form id="contact-us-form" method="POST" action="<?php echo esc_url(admin_url('admin-post.php')) ?>">
    <input type="hidden" name="action" value="submit_contact_form">
      <?php wp_nonce_field('contact-us', 'contact-form-nonce')?>
      <div class="input-container teacher-select" id="teacher-select">
        <label class="label" for="teacher">Teacher</label>
        <select name="teacher">
          <option id="general" value="general" selected>General Inquiry</option>
          <?php 
            $teachers = new WP_Query(array(
              'posts_per_page' => -1,
              'post_type' => 'teachers'));

              while($teachers->have_posts()) {
                $teachers->the_post();?>
                <option id="<?php the_ID()?>" value="<?php the_ID()?>"><?php the_title()?></option>
              <?php }
          ?>
        </select>  
      </div>
      <div class="participant-container">
        <label class="label">Name<span class="required"> * </span></label>
        <div class="input-container">
          <input type="text" name="fname" required>
          <label class="sub-label" for="fname">First</label>
        </div>

        <div class="input-container">
          <input type="text" name="lname" required>
          <label class="sub-label" for="lname">Last</label>
        </div>
         
        <div class="input-container email contact-us">
          <label class="label" for="email">Email<span class="required"> * </span></label>
          <input type="email" name="email" required>
        </div>

        <div class="input-container info contact-us">
          <label class="label" for="message">Message<span class="required"> * </span></label>
          <textarea name="message" required></textarea>
        </div>
      </div>
      <button class="button button-primary booking-form-button" type="submit">Submit</button>
    </form>
  </section>
</main>
<div class="spacer"></div>
<?php get_footer(); ?>