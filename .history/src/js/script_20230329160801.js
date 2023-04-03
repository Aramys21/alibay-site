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
            function menu_click() {
				if (document.getElementById("mySidebar").style.display === "none") {
					document.getElementById("mySidebar").style.left = "0";
					document.getElementById("mySidebar").style.width = "15%";
					document.getElementById("mySidebar").style.display = "block";
				}
				else {
					document.getElementById("mySidebar").style.display = "none";
				}
			}
			function w3_close() {
				document.getElementById("mySidebar").style.display = "none";
			}
	let image = document.getElementById('pub');		