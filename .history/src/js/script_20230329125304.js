const backToTopButton = document.querySelector('.back-to-top');

			window.addEventListener('scroll', () => {
				if (window.scrollY > 200) {
					backToTopButton.classList.add('show');
				} else {
					backToTopButton.classList.remove('show');
				}
			});

			backToTopButton.addEventListener('click', () => {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			});