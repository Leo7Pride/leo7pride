let navbarDiv = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40){
        navbarDiv.classList.add('navbar-cng');
    } else {
        navbarDiv.classList.remove('navbar-cng');
    }
});


const navbarCollapseDiv = document.getElementById('navbar-collapse');
const navbarShowBtn = document.getElementById('navbar-show-btn');
const navbarCloseBtn = document.getElementById('navbar-close-btn');
// show navbar
navbarShowBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.add('navbar-collapse-rmw');
});

// hide side bar
navbarCloseBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
});

document.addEventListener('click', (e) => {
    if(e.target.id != "navbar-collapse" && e.target.id != "navbar-show-btn" && e.target.parentElement.id != "navbar-show-btn"){
        navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
    }
});

// stop transition and animatino during window resizing
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400);
});


document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll(".testimonial-video");
    const playButtons = document.querySelectorAll(".play-btn");

    playButtons.forEach((button, index) => {
        const video = videos[index];

        // Ensure video has sound enabled
        video.muted = false;

        button.addEventListener("click", function () {
            video.play();
            button.style.display = "none"; // Hide play button on play
        });

        video.addEventListener("click", function () {
            if (!video.paused) {
                video.pause();

                // Briefly show pause icon
                button.innerHTML = `<img src="images/Pause.png" alt="Pause">`;
                button.style.display = "flex";
                
                setTimeout(() => {
                    button.style.display = "none"; // Hide pause icon after a short glimpse
                }, 500);
            } else {
                video.play();
                button.style.display = "none"; // Hide play button again
            }
        });
    });
});





   document.querySelector('form').addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                date: formData.get('date'),
                timestamp: new Date().toLocaleString()
            };
            fetch('save_form.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.text()).then(result => {
                alert('Form submitted successfully!');
            }).catch(error => {
                console.error('Error:', error);
            });
        });
 

        document.addEventListener("DOMContentLoaded", function () {
            const form = document.getElementById("contact-form");
            const statusMessage = document.getElementById("status-message");
        
            form.addEventListener("submit", function (e) {
                e.preventDefault();
        
                const formData = new FormData(form);
                const actionUrl = "AKfycbx9hkFp1FnkMkdL9RdcSeYVOD8XBORvbbvvJkSP069o"; // Replace with your Google Apps Script Web App URL
        
                fetch(actionUrl, {
                    method: "POST",
                    body: formData,
                })
                .then(response => {
                    if (response.ok) {
                        statusMessage.innerText = "Message sent successfully!";
                        statusMessage.style.color = "green";
                        form.reset();
                    } else {
                        statusMessage.innerText = "Error sending message. Try again.";
                        statusMessage.style.color = "red";
                    }
                })
                .catch(error => {
                    statusMessage.innerText = "Network error. Please try again.";
                    statusMessage.style.color = "red";
                    console.error("Error:", error);
                });
            });
        });
        






        // document.addEventListener("DOMContentLoaded", function () {
        //     const galleryItems = document.querySelectorAll(".gallery-item");
        //     const modalBox = document.getElementById("img-modal-box");
        //     const modalImg = document.getElementById("modal-img");
        //     const closeModalBtn = document.getElementById("modal-close-btn");
        //     const nextBtn = document.getElementById("next-btn");
        //     const prevBtn = document.getElementById("prev-btn");
        
        //     let currentIndex = 0;
        //     let currentImageSet = [];
        
        //     // Define images for each gallery item
        //     const imageSets = [
        //         // Images for gallery item 1
        //         ["images/gal10.jpeg", "images/gal1.jpeg", "images/gal2.jpeg", "images/gal3.jpeg", "images/gal4.jpeg"],
        
        //         // Images for gallery item 2
        //         ["images/gal5.jpeg", "images/gal6.jpeg", "images/gal7.jpeg", "images/gal8.jpeg", "images/gal9.jpeg"]
                
        //         // Add more sets here as needed
        //     ];
        
        //     // Open modal and show specific image set
        //     galleryItems.forEach((item, index) => {
        //         item.addEventListener("click", function () {
        //             currentIndex = 0; // Always start from the first image in the set
        //             currentImageSet = imageSets[index]; // Load the correct image set
        //             showImage();
        //         });
        //     });
        
        //     function showImage() {
        //         if (currentImageSet.length > 0) {
        //             modalImg.src = currentImageSet[currentIndex];
        //             modalBox.style.display = "flex";
        //         }
        //     }
        
        //     nextBtn.addEventListener("click", function () {
        //         currentIndex = (currentIndex + 1) % currentImageSet.length;
        //         showImage();
        //     });
        
        //     prevBtn.addEventListener("click", function () {
        //         currentIndex = (currentIndex - 1 + currentImageSet.length) % currentImageSet.length;
        //         showImage();
        //     });
        
        //     closeModalBtn.addEventListener("click", function () {
        //         modalBox.style.display = "none";
        //     });
        
        //     // Close modal on outside click
        //     modalBox.addEventListener("click", function (event) {
        //         if (event.target === modalBox) {
        //             modalBox.style.display = "none";
        //         }
        //     });
        // });
        






        document.addEventListener("DOMContentLoaded", function () {
            const galleryItems = document.querySelectorAll(".gallery-item");
            const modalBox = document.getElementById("img-modal-box");
            const modalImg = document.getElementById("modal-img");
            const closeModalBtn = document.getElementById("modal-close-btn");
            const nextBtn = document.getElementById("next-btn");
            const prevBtn = document.getElementById("prev-btn");
        
            const dotsContainer = document.createElement('div');
            dotsContainer.id = 'dots';  // Container for dots indicators
            modalBox.appendChild(dotsContainer);
        
            let currentIndex = 0;
            let currentImageSet = [];
            let autoPlayInterval;
        
            // Define images for each gallery item
            const imageSets = [
                // Images for gallery item 1
                ["images/gal10.jpeg", "images/gal1.jpeg", "images/gal2.jpeg", "images/gal3.jpeg", "images/gal4.jpeg"],
        
                // Images for gallery item 2
                ["images/gal5.jpeg", "images/gal6.jpeg", "images/gal7.jpeg", "images/gal8.jpeg", "images/gal9.jpeg"],
        
                // Images for gallery item 3
                ["images/gal12.jpeg", "images/gal13.jpeg", "images/gal14.jpeg", "images/gal15.jpeg", "images/gal16.jpeg"],
        
                // Images for gallery item 4
                ["images/gal17.jpeg", "images/gal18.jpeg", "images/gal19.jpeg", "images/gal20.jpeg", "images/gal21.jpeg"]
                
                // Add more sets here as needed
            ];
        
            // Open modal and show specific image set
            galleryItems.forEach((item, index) => {
                item.addEventListener("click", function () {
                    currentIndex = 0; // Always start from the first image in the set
                    currentImageSet = imageSets[index]; // Load the correct image set
                    showImage();
                });
            });
        
            function showImage() {
                if (currentImageSet.length > 0) {
                    modalImg.src = currentImageSet[currentIndex];
                    updateDots();  // Update the dots according to the current image
                    modalBox.style.display = "flex";
                    clearInterval(autoPlayInterval);  // Reset autoplay timer when user interacts
                    startAutoPlay();  // Start auto-play again
                }
            }
        
            function updateDots() {
                // Clear all existing dots
                dotsContainer.innerHTML = '';
                
                // Create dots for the image set
                currentImageSet.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    }
                    dot.addEventListener('click', () => {
                        currentIndex = index;
                        showImage();
                    });
                    dotsContainer.appendChild(dot);
                });
            }
        
            nextBtn.addEventListener("click", function () {
                currentIndex = (currentIndex + 1) % currentImageSet.length;
                showImage();
            });
        
            prevBtn.addEventListener("click", function () {
                currentIndex = (currentIndex - 1 + currentImageSet.length) % currentImageSet.length;
                showImage();
            });
        
            closeModalBtn.addEventListener("click", function () {
                modalBox.style.display = "none";
                clearInterval(autoPlayInterval);  // Clear auto-play when modal closes
            });
        
            // Close modal on outside click
            modalBox.addEventListener("click", function (event) {
                if (event.target === modalBox) {
                    modalBox.style.display = "none";
                    clearInterval(autoPlayInterval);  // Clear auto-play when modal closes
                }
            });
        
            // Auto-play functionality (change image every 3 seconds)
            function startAutoPlay() {
                autoPlayInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % currentImageSet.length;
                    showImage();
                }, 3000);
            }
        
        });
        

// About us sliding


document.addEventListener("DOMContentLoaded", function () {
    function animateOnScroll() {
        let elements = document.querySelectorAll(".hidden");
        let windowHeight = window.innerHeight;

        elements.forEach((element) => {
            let position = element.getBoundingClientRect().top;

            if (position < windowHeight - 100) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll(); // Run immediately to check for elements in view
});

document.addEventListener("DOMContentLoaded", function () {
    function animateOnScroll() {
        let elements = document.querySelectorAll(".hidden");
        let windowHeight = window.innerHeight;

        elements.forEach((element) => {
            let position = element.getBoundingClientRect().top;

            if (position < windowHeight - 100) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll(); // Run once on page load
});