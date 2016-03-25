(function() {

	// Variables
	var nav       = document.querySelector('.nav');
	var navToggle = document.querySelector('.nav__item--toggle');
	var navOpen   = 'nav--open';

	// Toggle Menu
	function toggleMenu() {
		if (nav.classList.contains(navOpen)) {
			nav.classList.remove(navOpen);
		} else {
			nav.classList.add(navOpen);
		}
	}

	// Run toggleMenu() after click event
	navToggle.addEventListener('click', function(e) {
		e.preventDefault();
		toggleMenu();
	});

})();