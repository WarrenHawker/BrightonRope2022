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
    
    <?php wp_footer(); ?>
  </body>
</html>