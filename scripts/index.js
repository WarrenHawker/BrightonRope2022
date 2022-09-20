const hamburger = document.getElementById('hamburger');
const topNavMenu = document.getElementsByClassName('menu-top-nav-container')[0];

hamburger.addEventListener('click', () => {
	if (!topNavMenu.classList.contains('active')) {
		hamburger.innerHTML = '&#9747;';
		topNavMenu.classList.add('active');
	} else {
		hamburger.innerHTML = '&#9776;';
		topNavMenu.classList.remove('active');
	}
});

window.addEventListener('load', () => {
	topNavMenu.classList.remove('active');
});
