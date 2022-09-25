//import module files
import mobileNav from './modules/mobile-nav';
import { closeBookingForm, openBookingForm } from './modules/booking-form/booking-form';

//run functions from module files
mobileNav();
closeBookingForm();
openBookingForm();

// document.addEventListener('DOMContentLoaded', function () {
// 	var elements = document.getElementsByTagName('INPUT');
// 	for (var i = 0; i < elements.length; i++) {
// 		elements[i].oninvalid = function (e) {
// 			e.target.setCustomValidity('');
// 			if (!e.target.validity.valid) {
// 				e.target.setCustomValidity('This field cannot be left blank');
// 			}
// 		};
// 		elements[i].oninput = function (e) {
// 			e.target.setCustomValidity('');
// 		};
// 	}
// });
