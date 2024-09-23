document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Close menu when any link is clicked
    navMenu.addEventListener('click', function(e) {
        if(e.target.tagName === 'A') {
            navMenu.classList.remove('show');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('show');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll anim
    const revealOnScroll = () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Typing effect object for 
    const roleTitle = document.querySelector('.role-title');
    const roles = ['Front-End Developer', 'UI/UX Designer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleTitle.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleTitle.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 200; 
        } else {
            typingSpeed = isDeleting ? 50 : 100; //speed when deleting
        }

        setTimeout(typeRole, typingSpeed);
    }

    typeRole(); // typing effectt start

    (function() {
        emailjs.init("fTAM3NBu5Z3ck6pxA");
    })();

    const form = document.getElementById('contact-form');
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! I will get back to you soon.';
    form.appendChild(successMessage);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Send email using EmailJS
        emailjs.send("service_jollr29", "template_wihd5tc", {
            from_name: name,
            from_email: email,
            message: message,
            to_email: "wazama02@gmail.com"
        }).then(
            function(response) {
                console.log("Email sent successfully", response);
                form.reset();
                successMessage.classList.add('show');
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 10000);
            },
            function(error) {
                console.log("Failed to send email", error);
                alert('Oops! Something went wrong. Please try again later.');
            }
        );
    });

    // Scroll progress indicator
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollToTop = document.getElementById('scroll-to-top');

    function updateScrollProgress() {
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
        
        scrollProgress.style.width = scrolled;

        // Show/hide scroll-to-top button
        if (scrollPx > 300) {
            scrollToTop.classList.add('show');
        } else {
            scrollToTop.classList.remove('show');
        }
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Scroll to top functionality
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
