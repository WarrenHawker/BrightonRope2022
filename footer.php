    <footer>
        <nav class="footer-nav">
            <?php if ( is_active_sidebar( 'footer-section-one' ) ) : ?>
                        <div class="footer-section footer-section-one">
                            <?php dynamic_sidebar( 'footer-section-one' ); ?>
                        </div>
                    <?php endif; ?>
                    <?php if ( is_active_sidebar( 'footer-section-two' ) ) : ?>
                        <div class="footer-section footer-section-two">
                            <?php dynamic_sidebar( 'footer-section-two' ); ?>
                        </div>
                    <?php endif; ?>
                    <?php if ( is_active_sidebar( 'footer-section-three' ) ) : ?>
                        <div class="footer-section footer-section-three">
                            <?php dynamic_sidebar( 'footer-section-three' ); ?>
                        </div>
                    <?php endif; ?>
                    <p class="copywrite-notice"> <span>©</span> 2022 Brighton Rope. All rights reserved</p>
        </nav>
    </footer>
    
    <div class="booking-form-overlay">
        <div class="booking-form-container">
            <i class="fa fa-window-close" id="booking-form-close"></i>
            <div class="event-info"></div>
            <div class="spinner-loader"></div>
            <form id="waiting-list-form">
                <p>I'm sorry, we have sold out for this event. Please fill in your details below to be added to our waiting list. We will contact you directly if a space becomes available.</p>
                <div class="booking-form-participant-container">
                    <label class="booking-form-label name-label" for="name">Name
                        <span class="required"> * </span>
                    </label>
                    <div class="booking-form-sub-container">
                        <div class="name-input-sub-container">
                        <input type="text" id="name" name="fname" required>
                        <label class="booking-form-sub-label">First</label>
                    </div>

                    <div class="name-input-sub-container">
                        <input type="text" id="name" name="lname" required>
                        <label class="booking-form-sub-label">Last</label>
                    </div>
                </div>

                <div class="booking-form-sub-container">
                            <label class="booking-form-label" for="email">Email
                                <span class="required"> * </span>
                            </label>
                            <input type="email" id="email" name="email" required>
                        </div>
                            <label class="booking-form-label" for="individualOrGroup">Are you wanting to book as an individual or a group?
                            <span class="required"> * </span>
                        </label>
                        <div class="booking-form-sub-container">
                            <div class="booking-form-input-container">
                                <input type="radio" id="individual" name="individualOrGroup" value="individual" required>
                                <label class="booking-form-sub-label" for="individual">Individual</label>
                            </div>

                            <div class="booking-form-input-container">
                                <input type="radio" id="pair" name="individualOrGroup" value="pair" required>
                                <label class="booking-form-sub-label" for="pair">Pair</label> 
                            </div>

                            <div class="booking-form-input-container">
                                <input type="radio" id="group" name="individualOrGroup" value="group" required>
                                <label class="booking-form-sub-label" for="group">Group of 3</label> 
                            </div>
                        </div>
                        </div>
                        <button class="button button-primary">Submit</button>
                    
                        </form>

            <form id="booking-form" data-multi-step>
                <div class="booking-form-page" data-step='1'>
                    <label class="booking-form-label" for="individualOrGroup">Are you booking as an individual or a group?
                        <span class="required"> * </span>
                    </label>
                    <div class="booking-form-sub-container">
                        <div class="booking-form-input-container">
                            <input type="radio" id="individual" name="individualOrGroup" value="individual" required>
                            <label class="booking-form-sub-label" for="individual">Individual</label>
                        </div>

                        <div class="booking-form-input-container">
                            <input type="radio" id="pair" name="individualOrGroup" value="pair">
                            <label class="booking-form-sub-label" for="pair">Pair</label> 
                        </div>

                        <div class="booking-form-input-container">
                            <input type="radio" id="group" name="individualOrGroup" value="group">
                            <label class="booking-form-sub-label" for="group">Group of 3</label> 
                        </div>
                    </div>
                    <p>By clicking NEXT you agree to our <a href="#" target="_blank">Consent Waiver</a></br>(opens in a new window)</p>
                        <button type="button" class="button button-primary" data-next>Next</button>
                </div>

                <div class="booking-form-page" data-step='2'>
                    <h3>page 2</h3>
                    <button type="button" class="button button-secondary" data-prev>Previous</button>
                    <button type="button" class="button button-primary" data-next>Next</button>
                </div>

                <div class="booking-form-page" data-step='3'>
                    <h3>page 3</h3>
                    <button type="button" class="button button-secondary" data-prev>Previous</button>
                    <button type="submit" class="button button-primary">Submit</button>
                </div>

                <div class="step-container">
                    <span class="step"></span>
                    <span class="step"></span>
                    <span class="step"></span>
                </div>
            </form> 
        </div>
    </div> 
    <?php wp_footer(); ?>
  </body>
</html>

