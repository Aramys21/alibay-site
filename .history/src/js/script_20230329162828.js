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
			let image = document.getElementById('image');
			let images = ['src/pub/1.jpg','src/pub/2.jpg','src/pub/3.jpg','src/pub/4.jpg','src/pub/5.jpg','src/pub/6.jpg','src/pub/7.jpg','src/pub/8.jpg','src/pub/9.jpg','src/pub/10.jpg','src/pub/11.jpg','src/pub/12.jpg','src/pub/13.jpg','src/pub/14.jpg',];
			
			setInterval(function(){
				let random = Math.floor(Math.random() * 14);
				image.src = images[random];
			}, 1000*5);