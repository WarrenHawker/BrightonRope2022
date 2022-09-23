export default class MobileNav {
	constructor() {
		this.menu = document.getElementsByClassName('menu-top-nav-container')[0];
		this.hamburger = document.getElementById('hamburger');
		this.events();
	}

	events() {
		this.hamburger.addEventListener('click', () => this.openMenu());
		window.addEventListener('load', () => {
			this.menu.classList.remove('active');
		});
	}

	openMenu() {
		if (!this.menu.classList.contains('active')) {
			this.hamburger.innerHTML = '&#9747;';
			this.menu.classList.add('active');
		} else {
			this.hamburger.innerHTML = '&#9776;';
			this.menu.classList.remove('active');
		}
	}
}
