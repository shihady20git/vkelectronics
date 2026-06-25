// VK Electronics - Website Interactions

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('.header-wrapper');
    const handleScroll = () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle ARIA attributes
            const expanded = menuToggle.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', expanded);
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', false);
            });
        });
    }

    // 3. Highlight Active Navigation Section (Homepage Only)
    const isHomepage = !!document.querySelector('.hero-grid');
    if (isHomepage) {
        const sections = document.querySelectorAll('section, header');
        const navItems = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= (sectionTop - 150)) {
                    current = section.getAttribute('id') || '';
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').includes(current) && current !== '') {
                    item.classList.add('active');
                }
            });
        });
    }

    // 4. Booking Form Submission
    const bookingForm = document.getElementById('bookingForm');
    const alertSuccess = document.getElementById('alertSuccess');

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            const name = document.getElementById('formName').value.trim();
            const phone = document.getElementById('formPhone').value.trim();
            const service = document.getElementById('formService').value;
            const message = document.getElementById('formMessage').value.trim();

            if (!name || !phone || !service) {
                alert('Please fill out Name, Phone, and Service selection.');
                return;
            }

            // Simulate form submission to backend (or local storage/logging)
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            // Send structured WhatsApp message as fallback or main conversion channel
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Show Success Alert
                if (alertSuccess) {
                    alertSuccess.classList.add('active');
                    setTimeout(() => {
                        alertSuccess.classList.remove('active');
                    }, 5000);
                }

                // Reset Form
                bookingForm.reset();

                // Format WhatsApp query
                const text = `Hello VK Electronics, I would like to book a service request.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service:* ${encodeURIComponent(service)}%0A*Details:* ${encodeURIComponent(message || 'None')}`;
                const waUrl = `https://wa.me/919900409125?text=${text}`;
                
                // Open WhatsApp in a new tab
                window.open(waUrl, '_blank');
            }, 1000);
        });
    }
});
