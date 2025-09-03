// JJ Forex Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navbar scroll effect
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // World Clock functionality
    function updateWorldClock() {
        const now = new Date();
        
        // New York (UTC-5)
        const nyTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (-5 * 3600000));
        document.getElementById('ny-time').textContent = nyTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        // London (UTC+0)
        const londonTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
        document.getElementById('london-time').textContent = londonTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        // Tokyo (UTC+9)
        const tokyoTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (9 * 3600000));
        document.getElementById('tokyo-time').textContent = tokyoTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        // Sydney (UTC+10)
        const sydneyTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (10 * 3600000));
        document.getElementById('sydney-time').textContent = sydneyTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    // Update world clock every second
    updateWorldClock();
    setInterval(updateWorldClock, 1000);

    // Live Currency Rates Simulation
    function updateLiveRates() {
        const rates = {
            'usd-inr': { base: 83.12, element: document.getElementById('usd-inr') },
            'eur-inr': { base: 89.45, element: document.getElementById('eur-inr') },
            'gbp-inr': { base: 105.67, element: document.getElementById('gbp-inr') },
            'aud-inr': { base: 54.23, element: document.getElementById('aud-inr') },
            'cad-inr': { base: 61.89, element: document.getElementById('cad-inr') },
            'jpy-inr': { base: 0.56, element: document.getElementById('jpy-inr') }
        };

        Object.keys(rates).forEach(rateId => {
            const rateData = rates[rateId];
            if (rateData.element) {
                // Simulate small fluctuations
                const fluctuation = (Math.random() - 0.5) * 0.5; // ±0.25 variation
                const newRate = rateData.base + fluctuation;
                const formattedRate = rateId === 'jpy-inr' ? newRate.toFixed(3) : newRate.toFixed(2);

                rateData.element.textContent = formattedRate;

                // Update the change indicator
                const changeElement = rateData.element.parentElement.querySelector('.change');
                if (changeElement) {
                    const change = fluctuation > 0 ? `+${Math.abs(fluctuation).toFixed(2)}` : `-${Math.abs(fluctuation).toFixed(2)}`;
                    changeElement.textContent = change;
                    changeElement.className = fluctuation > 0 ? 'change positive' : 'change negative';
                }
            }
        });
    }

    // Update rates every 30 seconds
    updateLiveRates();
    setInterval(updateLiveRates, 30000);

    // Enhanced Hero Slider Auto-play with pause on hover
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            wrap: true,
            pause: 'hover'
        });

        // Pause on hover
        heroCarousel.addEventListener('mouseenter', () => {
            carousel.pause();
        });

        // Resume on mouse leave
        heroCarousel.addEventListener('mouseleave', () => {
            carousel.cycle();
        });
    }

    // Currency Converter functionality
    const fromAmountInput = document.getElementById('fromAmount');
    const toAmountInput = document.getElementById('toAmount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertBtn = document.getElementById('convertBtn');
    const swapBtn = document.getElementById('swapCurrencies');
    const rateDisplay = document.getElementById('rateDisplay');

    // Sample exchange rates (in a real application, you would fetch these from an API)
    const exchangeRates = {
        'USD': { 'EUR': 0.85, 'GBP': 0.73, 'INR': 83.12, 'JPY': 149.50, 'AUD': 1.52, 'CAD': 1.36, 'CHF': 0.88 },
        'EUR': { 'USD': 1.18, 'GBP': 0.86, 'INR': 97.85, 'JPY': 176.24, 'AUD': 1.79, 'CAD': 1.60, 'CHF': 1.04 },
        'GBP': { 'USD': 1.37, 'EUR': 1.16, 'INR': 113.89, 'JPY': 205.07, 'AUD': 2.08, 'CAD': 1.86, 'CHF': 1.21 },
        'INR': { 'USD': 0.012, 'EUR': 0.010, 'GBP': 0.0088, 'JPY': 1.80, 'AUD': 0.018, 'CAD': 0.016, 'CHF': 0.011 },
        'JPY': { 'USD': 0.0067, 'EUR': 0.0057, 'GBP': 0.0049, 'INR': 0.56, 'AUD': 0.010, 'CAD': 0.0091, 'CHF': 0.0059 },
        'AUD': { 'USD': 0.66, 'EUR': 0.56, 'GBP': 0.48, 'INR': 54.68, 'JPY': 98.36, 'CAD': 0.89, 'CHF': 0.58 },
        'CAD': { 'USD': 0.74, 'EUR': 0.63, 'GBP': 0.54, 'INR': 61.12, 'JPY': 109.93, 'AUD': 1.12, 'CHF': 0.65 },
        'CHF': { 'USD': 1.14, 'EUR': 0.96, 'GBP': 0.83, 'INR': 94.45, 'JPY': 169.89, 'AUD': 1.72, 'CAD': 1.55 }
    };

    function convertCurrency() {
        const fromAmount = parseFloat(fromAmountInput.value) || 0;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (fromCurrency === toCurrency) {
            toAmountInput.value = fromAmount.toFixed(2);
            rateDisplay.innerHTML = `<p class="mb-0">1 ${fromCurrency} = 1 ${toCurrency}</p>`;
            rateDisplay.classList.add('active');
            return;
        }

        let rate = 1;
        if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
            rate = exchangeRates[fromCurrency][toCurrency];
        }

        const convertedAmount = fromAmount * rate;
        toAmountInput.value = convertedAmount.toFixed(2);

        rateDisplay.innerHTML = `
            <p class="mb-0"><strong>1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}</strong></p>
            <small class="text-muted">Exchange rate is indicative and may vary</small>
        `;
        rateDisplay.classList.add('active');
    }

    function swapCurrencies() {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        
        fromCurrencySelect.value = toCurrency;
        toCurrencySelect.value = fromCurrency;
        
        convertCurrency();
    }

    // Event listeners for currency converter
    convertBtn.addEventListener('click', convertCurrency);
    swapBtn.addEventListener('click', swapCurrencies);
    fromAmountInput.addEventListener('input', convertCurrency);
    fromCurrencySelect.addEventListener('change', convertCurrency);
    toCurrencySelect.addEventListener('change', convertCurrency);

    // Initial conversion
    convertCurrency();

    // Quick convert cards functionality
    document.querySelectorAll('.quick-convert-card').forEach(card => {
        card.addEventListener('click', function() {
            const fromCurrency = this.dataset.from;
            const toCurrency = this.dataset.to;

            if (fromCurrency && toCurrency) {
                fromCurrencySelect.value = fromCurrency;
                toCurrencySelect.value = toCurrency;
                convertCurrency();

                // Scroll to converter
                document.getElementById('currency-converter').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });

    // Enhanced market status for world clock
    function updateMarketStatus() {
        const now = new Date();
        const utcHour = now.getUTCHours();

        // Market hours in UTC
        const markets = {
            'ny-status': { open: 13, close: 22 }, // New York: 8 AM - 5 PM EST
            'london-status': { open: 8, close: 17 }, // London: 8 AM - 5 PM GMT
            'tokyo-status': { open: 0, close: 9 }, // Tokyo: 9 AM - 6 PM JST
            'sydney-status': { open: 22, close: 7 } // Sydney: 9 AM - 6 PM AEDT
        };

        Object.keys(markets).forEach(statusId => {
            const statusElement = document.getElementById(statusId);
            if (statusElement) {
                const market = markets[statusId];
                let isOpen = false;

                if (market.open < market.close) {
                    isOpen = utcHour >= market.open && utcHour < market.close;
                } else {
                    isOpen = utcHour >= market.open || utcHour < market.close;
                }

                statusElement.textContent = isOpen ? 'Open' : 'Closed';
                statusElement.className = `market-status ${isOpen ? 'open' : 'closed'}`;
            }
        });
    }

    // Update market status
    updateMarketStatus();
    setInterval(updateMarketStatus, 60000); // Update every minute

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;

            // Simulate API call (replace with actual API endpoint)
            setTimeout(() => {
                // Show success message
                alert('Thank you for your message! We will get back to you within 24 hours.');
                contactForm.reset();

                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Quick inquiry form handling
    const quickInquiryForm = document.getElementById('quickInquiryForm');
    if (quickInquiryForm) {
        quickInquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(quickInquiryForm);
            const data = Object.fromEntries(formData);

            // Show loading state
            const submitBtn = quickInquiryForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Close modal and show success
                const modal = bootstrap.Modal.getInstance(document.getElementById('quickInquiryModal'));
                modal.hide();

                // Show success notification
                showNotification('Inquiry sent successfully! We will call you back soon.', 'success');
                quickInquiryForm.reset();

                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} notification-toast`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" onclick="this.parentElement.remove()"></button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Back to top button functionality
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Add hover effects to service cards
    document.querySelectorAll('.service-card, .service-detail-card, .contact-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Rate alert form handling
    const rateAlertForm = document.querySelector('.rate-alert-form');
    if (rateAlertForm) {
        rateAlertForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;
            const currencyPair = this.querySelector('select').value;

            // Show success notification
            showNotification(`Rate alert set for ${currencyPair}! We'll notify you at ${email} when rates change.`, 'success');
            this.reset();
        });
    }

    // Enhanced live rates with more realistic fluctuations
    function enhancedUpdateLiveRates() {
        const rates = {
            'usd-inr': { base: 83.12, volatility: 0.5 },
            'eur-inr': { base: 89.45, volatility: 0.6 },
            'gbp-inr': { base: 105.67, volatility: 0.8 },
            'aud-inr': { base: 54.23, volatility: 0.4 },
            'cad-inr': { base: 61.89, volatility: 0.3 },
            'jpy-inr': { base: 0.56, volatility: 0.02 }
        };

        Object.keys(rates).forEach(rateId => {
            const rateData = rates[rateId];
            const element = document.getElementById(rateId);

            if (element) {
                // More realistic market-based fluctuation
                const timeOfDay = new Date().getHours();
                const marketActivity = timeOfDay >= 9 && timeOfDay <= 17 ? 1.5 : 0.8; // Higher volatility during market hours

                const fluctuation = (Math.random() - 0.5) * rateData.volatility * marketActivity;
                const newRate = rateData.base + fluctuation;
                const formattedRate = rateId === 'jpy-inr' ? newRate.toFixed(3) : newRate.toFixed(2);

                element.textContent = formattedRate;

                // Update change indicator with animation
                const changeElement = element.parentElement.querySelector('.change');
                if (changeElement) {
                    const change = fluctuation > 0 ? `+${Math.abs(fluctuation).toFixed(2)}` : `-${Math.abs(fluctuation).toFixed(2)}`;
                    changeElement.textContent = change;
                    changeElement.className = fluctuation > 0 ? 'change positive' : 'change negative';

                    // Add flash animation
                    element.style.animation = 'flash 0.5s ease';
                    setTimeout(() => {
                        element.style.animation = '';
                    }, 500);
                }
            }
        });
    }

    // Replace the simple rate update with enhanced version
    setInterval(enhancedUpdateLiveRates, 15000); // Update every 15 seconds for more dynamic feel

    console.log('JJ Forex enhanced website loaded successfully!');
});

// Global functions
function openMap() {
    const address = "1st Floor, Fahd Complex, Saddani Chowk, Sadar Bazar, Raipur, Chhattisgarh";
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
}

// Add flash animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes flash {
        0% { background-color: transparent; }
        50% { background-color: rgba(0, 212, 255, 0.2); }
        100% { background-color: transparent; }
    }
`;
document.head.appendChild(style);
