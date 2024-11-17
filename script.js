// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuBtn.classList.toggle("active");

  // Toggle icon between bars and times
  const icon = mobileMenuBtn.querySelector("i");
  if (icon.classList.contains("fa-bars")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

// Close menu when clicking on a nav link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Toast Notification Function
function showToast(message, type = 'success') {
    const toastContainer = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? '✓' : '✕';
    
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Trigger reflow to start animation
    toast.offsetHeight;
    toast.classList.add('show');
    
    // Close button functionality
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
        toast.style.animation = 'slideOut 0.3s ease-in-out forwards';
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideOut 0.3s ease-in-out forwards';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }
    }, 5000);
}

// Form Submission with EmailJS
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Đang gửi...';
    submitButton.disabled = true;

    // Prepare template parameters
    const templateParams = {
        from_name: this.querySelector('#name').value,
        from_email: this.querySelector('#email').value,
        phone: this.querySelector('#phone').value,
        message: this.querySelector('#message').value
    };

    // Send email using EmailJS
    emailjs.send('khoancatbetongduongbao', 'template_8ajoqih', templateParams)
        .then(function() {
            // Show success toast
            showToast('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.', 'success');
            contactForm.reset();
        }, function(error) {
            // Show error toast
            console.error('Lỗi:', error);
            showToast('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.', 'error');
        })
        .finally(function() {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
});

// Navbar Scroll Effect
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up
    navbar.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});

// Add animation to service cards when they come into view
const observeElements = (elements, className) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
      }
    });
  });

  elements.forEach((element) => observer.observe(element));
};

// Observe service cards
const serviceCards = document.querySelectorAll(".service-card");
observeElements(serviceCards, "animate-in");

// Handle floating buttons click events
const floatingCall = document.querySelector(".floating-call");
const floatingZalo = document.querySelector(".floating-zalo");

floatingCall.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "tel:0965849811";
});

floatingZalo.addEventListener("click", (e) => {
  e.preventDefault();
  window.open("https://zalo.me/0965849811", "_blank");
});

// Add animation class to elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add("animate");
    }
  });
};

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);
