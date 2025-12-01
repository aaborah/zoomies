// Gallery Images - All pet photos (updated)
const petImages = [
    'IMG_0052.jpeg', 'IMG_0119.jpeg', 'IMG_0148.jpeg', 'IMG_0151.jpeg', 'IMG_0161.jpeg',
    'IMG_0565.jpeg', 'IMG_0580.jpeg', 'IMG_0674.JPG', 'IMG_0694.jpeg', 'IMG_0696.jpeg',
    'IMG_0708.jpeg', 'IMG_0710.jpeg', 'IMG_0715.jpeg', 'IMG_0719.jpeg', 'IMG_0720.jpeg',
    'IMG_0721.jpeg', 'IMG_0782.jpeg', 'IMG_0788.jpeg', 'IMG_0821.jpeg', 'IMG_0822.jpeg',
    'IMG_0827.jpeg', 'IMG_0857.jpeg', 'IMG_0862.jpeg', 'IMG_0863.jpeg', 'IMG_0871.jpeg',
    'IMG_0874.jpeg', 'IMG_0881.jpeg', 'IMG_0905.jpeg', 'IMG_1088.jpeg', 'IMG_1092.jpeg',
    'IMG_1107.jpeg', 'IMG_1118.jpeg', 'IMG_1290.jpeg', 'IMG_1323.jpeg', 'IMG_1326.jpeg',
    'IMG_1327.jpeg', 'IMG_1387.jpeg', 'IMG_1396.jpeg', 'IMG_1401.jpeg', 'IMG_1481.jpeg',
    'IMG_1570.JPG', 'IMG_1575.jpeg', 'IMG_1608.jpeg', 'IMG_1615.jpeg', 'IMG_1636.jpeg',
    'IMG_1688 (1).jpeg', 'IMG_1688.jpeg', 'IMG_1735.jpeg', 'IMG_1739.jpeg', 'IMG_1766.jpeg',
    'IMG_1918.JPG', 'IMG_2039.jpeg', 'IMG_2121.jpeg', 'IMG_2125.jpeg', 'IMG_2263.jpeg',
    'IMG_2323.JPG', 'IMG_2596.jpeg', 'IMG_3508.jpeg', 'IMG_3515.JPG', 'IMG_3614.jpeg',
    'IMG_3629.JPG', 'IMG_3722.jpeg', 'IMG_3725.jpeg', 'IMG_3748.jpeg', 'IMG_3750.jpeg',
    'IMG_3771.jpeg', 'IMG_3777.jpeg', 'IMG_3784.jpeg', 'IMG_3809.jpeg', 'IMG_3845.jpeg',
    'IMG_3847.jpeg', 'IMG_3852.jpeg', 'IMG_3858.jpeg', 'IMG_3874.JPG', 'IMG_3877.jpeg',
    'IMG_3902.jpeg', 'IMG_3903.jpeg', 'IMG_3904.jpeg', 'IMG_4134.jpeg', 'IMG_4165.jpeg',
    'IMG_4173.jpeg', 'IMG_4185.jpeg', 'IMG_4189.jpeg', 'IMG_6724.jpeg', 'IMG_6881.jpeg',
    'IMG_7135.JPG', 'IMG_7148.JPG', 'IMG_7622.JPG', 'IMG_7632.jpeg', 'IMG_7636.jpeg',
    'IMG_7638.jpeg', 'IMG_7639.jpeg', 'IMG_7642.jpeg', 'IMG_7703.jpeg', 'IMG_7704.jpeg',
    'IMG_7718.jpeg', 'IMG_7755.jpeg', 'IMG_7779.jpeg', 'IMG_8487.jpeg', 'IMG_8492.jpeg',
    'IMG_8643.JPG', 'IMG_8646.JPG', 'IMG_8681.jpeg', 'IMG_8682.jpeg', 'IMG_8697.jpeg',
    'IMG_8790.jpeg', 'IMG_8795.jpeg', 'IMG_8900.JPG', 'IMG_8907.jpeg', 'IMG_8923.jpeg',
    'IMG_9008.jpeg', 'IMG_9106.jpeg', 'IMG_9243.jpeg', 'IMG_9342.jpeg', 'IMG_9343.jpeg',
    'IMG_9355.jpeg', 'IMG_9369.jpeg', 'IMG_9378.jpeg', 'IMG_9413.jpeg', 'IMG_9416.jpeg',
    'IMG_9421.jpeg', 'IMG_9598.jpeg', 'IMG_9660.jpeg', 'IMG_9737.jpeg', 'IMG_9762.jpeg',
    'IMG_9829.jpeg', 'IMG_9840.jpeg', 'IMG_9925.jpeg'
];

// Randomize array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Load gallery images
function loadGalleryImages() {
    const galleryTrack = document.getElementById('galleryTrack');
    if (!galleryTrack) return;
    
    const shuffledImages = shuffleArray(petImages);
    
    // Clear existing content
    galleryTrack.innerHTML = '';
    
    // Create gallery items for shuffled images (once)
    shuffledImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="images/Pets/${image}" alt="Pet photo" loading="lazy">`;
        galleryTrack.appendChild(galleryItem);
    });
    
    // Duplicate for seamless loop
    shuffledImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `<img src="images/Pets/${image}" alt="Pet photo" loading="lazy">`;
        galleryTrack.appendChild(galleryItem);
    });
}

// Load gallery on page load
document.addEventListener('DOMContentLoaded', loadGalleryImages);

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20; // 20px extra padding
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect - always stays white
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Optional: Can add subtle shadow change on scroll if desired
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .gallery-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Gallery Item Click - Optional enhancement
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // You could add a lightbox effect here
        const overlay = item.querySelector('.gallery-overlay p');
        console.log('Gallery item clicked:', overlay.textContent);
    });
});

// Add loading effect to images
const images = document.querySelectorAll('img[loading="lazy"]');
images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.animation = 'fadeIn 0.5s ease';
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add CSS for active nav state dynamically
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Show more testimonials functionality
function showMoreTestimonials() {
    const hiddenTestimonials = document.querySelectorAll('.testimonial-card:nth-child(n+3)');
    const showMoreBtn = document.getElementById('showMoreBtn');
    
    hiddenTestimonials.forEach(card => {
        card.classList.add('show');
    });
    
    showMoreBtn.classList.add('hidden');
}

// Log page load
console.log('Zoomies and Purrs NYC website loaded successfully! 🐾');

