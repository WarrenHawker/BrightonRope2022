<?php get_header(); ?>
<main>
<h1 class="page-title"><?php the_title() ?></h1>
  <section class="col-100">
    <?php the_content();?>
  </section>

  <section>
    <form id="contact-us-form">
      <div id="teacher-select"></div>
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