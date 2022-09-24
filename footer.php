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
            <div class="booking-form-page page-one active">
                <h3>page 1</h3>
            </div>

            <div class="booking-form-page page-two">
                <h3>page 2</h3>
            </div>

            <div class="booking-form-page page-three ">
                <h3>page 3</h3>
            </div>
        </div>
    </div> 
    <?php wp_footer(); ?>
  </body>
</html>