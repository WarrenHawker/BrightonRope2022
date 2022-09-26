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
                <p class="fully-booked-message">I'm sorry, we have sold out for this event. Please fill in your details below to be added to our waiting list. We will contact you directly if a space becomes available.</p>
                <fieldset class="participant-container">
                    <p class="label">Name<span class="required"> * </span></p>
                    <div class="input-container">
                        <input type="text" name="fname1" required>
                        <label class="sub-label" for="fname1">First</label>
                    </div>
                    <div class="input-container">
                        <input type="text" name="lname1" required>
                        <label class="sub-label" for="lname1">Last</label>
                    </div>
                    <div class="input-container pronoun-select">
                        <select name="pronouns" required>
                        <option value="" disabled selected>--select--</option>
                        <option value="he/him">He/Him</option>
                        <option value="she/her">She/Her</option>
                        <option value="they/them">They/Them</option>
                        <option value="notUsed">I don't use them</option>
                        <option value="other">Other</option>
                        </select>
                        <label class="sub-label" for="pronouns">Pronouns</label>
                    </div>
                </fieldset>

                <fieldset>
                    <p class="label waiting-list-label">Do you wish to book as an individual or group<span class="required"> * </span></p>
                    <div class="radio-group-container">
                        <div class="radio-sub-container">
                            <input type="radio" id="waiting-list-individual" name="individualOrGroup" value="individual" required>
                            <label for="waiting-list-individual">Individual</label>
                            </div>

                        <div class="radio-sub-container">
                            <input type="radio" id="waiting-list-pair" name="individualOrGroup" value="pair">
                            <label for="waiting-list-pair">Pair</label> 
                        </div> 

                        <div class="radio-sub-container">
                            <input type="radio" id="waiting-list-group" name="individualOrGroup" value="group">
                            <label for="waiting-list-group">Group of 3</label> 
                        </div>
                    </div>
                </fieldset>

                <div class="input-container waiting-list email ">
                    <label class="label" for="email">Email<span class="required"> * </span></label>
                    <input type="email" name="email" required>
                </div>

                <button class="button button-primary booking-form-button" id="waiting-list-submit">Submit</button>    
            </form>

            <form id="booking-form" data-multi-step>
                <div class="booking-form-page" data-step='1'>
                    <p id="group-tickets-only-message" style="display:none;"> We are only accepting group ticket requests for this event. We are sorry for the inconvenience.</p>

                    <fieldset>
                        <p id="individual-label"></p>
                        <div class="radio-group-container">
                            <div class="radio-sub-container">
                                <input type="radio" id="booking-form-individual" name="individualOrGroup" value="individual">
                                <label for="booking-form-individual">Individual</label>
                            </div>

                            <div class="radio-sub-container">
                                <input type="radio" id="booking-form-pair" name="individualOrGroup" value="pair" required>
                                <label for="booking-form-pair">Pair</label> 
                            </div> 

                            <div class="radio-sub-container">
                                <input type="radio" id="booking-form-group" name="individualOrGroup" value="group">
                                <label for="booking-form-group">Group of 3</label> 
                            </div>
                        </div>
                    </fieldset>
                    <p class="agree-to-waiver">By clicking NEXT you agree to our <a href="#" target="_blank">Consent Waiver</a></br>(opens in a new window)</p>
                        <button type="button" class="button button-primary booking-form-button" data-next>Next</button>
                </div>

                <div class="booking-form-page" data-step='2'>
                    <h3>Participant information</h3>

                    <div id="participant-container-group"></div>

                    <div class="input-container email">
                        <label class="label" for="email">Email<span class="required"> * </span></label>
                        <input type="email" name="email" required>
                    </div>
                    <div id="prices-container" class="input-container prices"></div>
                    <div class="input-container info">
                        <label class="label" for="additional-info">Additional Information</label>
                        <textarea name="additional-info"></textarea>
                    </div>

                    <div class="booking-form-button-container">
                        <button type="button" class="button button-secondary booking-form-button" data-prev>Previous</button>
                        <button type="button" class="button button-primary booking-form-button" data-next>Next</button>
                    </div>
                </div>

                <div class="booking-form-page" id="paypal-page" data-step='3'>
                    <div id="smart-button-container">
                        <div style="text-align: center;">
                            <div id="paypal-button-container"></div>
                        </div>
                    </div>
                    <script src="https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=GBP" data-sdk-integration-source="button-factory"></script>
                    <script>
                       
                        function initPayPalButton() {
                        paypal.Buttons({
                            style: {
                            shape: 'pill',
                            color: 'gold',
                            layout: 'vertical',
                            label: 'paypal',
                            
                            },

                            createOrder: function(data, actions) {
                                let selectedPrice = document.querySelector('input[name="price"]:checked').value;
                            return actions.order.create({
                                purchase_units: [{"amount":{"currency_code":"GBP","value":selectedPrice}}]
                            });
                            },

                            onApprove: function(data, actions) {
                            return actions.order.capture().then(function(orderData) {
                                
                                // Full available details
                                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                                // Show a success message within this page, e.g.
                                const element = document.getElementById('paypal-button-container');
                                element.innerHTML = '';
                                element.innerHTML = `
                                    <h3>Thank you for your payment!</h3>
                                    <h4>Please Press the Submit button below to finish booking.</h4>
                                    <button type="submit" class="button button-primary booking-form-button">Submit</button>
                                `;
                                const prevBtn = document.getElementById('final-prev-btn')
                                prevBtn.style.display = "none";

                                // Or go to another URL:  actions.redirect('thank_you.html');
                                
                            });
                            },

                            onError: function(err) {
                            console.log(err);
                            }
                        }).render('#paypal-button-container');
                        }
                        initPayPalButton();
                    </script>

                    <button type="button" class="button button-secondary booking-form-button" id="final-prev-btn" data-prev>Previous</button>
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
