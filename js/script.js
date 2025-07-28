// Enhanced JavaScript with better performance and animations
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavbar();
  initMobileMenu();
  initSmoothScrolling();
  initScrollAnimations();
  initParallax();
  initTiltEffect();
  initImageAnimations();
  initLoadingAnimations();
  initPerformanceOptimizations();
  initNumberCounters();
});

// Enhanced navbar with seamless hero integration
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const heroSection = document.querySelector(".hero");
  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    // Add scrolled class when past hero section
    if (currentScrollY > heroHeight * 0.3) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Hide/show navbar on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
}

// Enhanced mobile menu with smooth animations
function initMobileMenu() {
  const mobileToggle = document.getElementById("mobile-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!mobileToggle || !navMenu) return;

  let isOpen = false;

  mobileToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    isOpen = !isOpen;

    this.classList.toggle("active", isOpen);
    navMenu.classList.toggle("active", isOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    // Animate menu items
    if (isOpen) {
      const menuItems = navMenu.querySelectorAll(".nav-link");
      menuItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        setTimeout(() => {
          item.style.transition = "all 0.3s ease";
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 100 + 200);
      });
    }
  });

  // Close menu when clicking nav links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      isOpen = false;
      mobileToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      isOpen &&
      !navMenu.contains(e.target) &&
      !mobileToggle.contains(e.target)
    ) {
      isOpen = false;
      mobileToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Close menu with escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) {
      isOpen = false;
      mobileToggle.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// Smooth scrolling with custom easing
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll(
    ".nav-link, .cta-primary, .cta-secondary"
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();

        const targetSection = document.querySelector(href);
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 100;
          smoothScrollTo(offsetTop, 1000);
        }
      }
    });
  });
}

// Custom smooth scroll with enhanced easing
function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Enhanced easing function
  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  }

  requestAnimationFrame(animation);
}

// Advanced scroll animations with Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Special animations for different sections
        const sectionId = entry.target.id;

        switch (sectionId) {
          case "style":
            animateStyleCards(entry.target);
            break;
          case "about":
            animateAboutSection(entry.target);
            break;
          case "contact":
            animateContactSection(entry.target);
            break;
        }
      }
    });
  }, observerOptions);

  // Observe all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Animate style cards with stagger effect
function animateStyleCards(section) {
  const cards = section.querySelectorAll(".style-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";

    setTimeout(() => {
      card.style.transition = "all 0.8s cubic-bezier(0.23, 1, 0.320, 1)";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// Animate about section elements
function animateAboutSection(section) {
  const textCard = section.querySelector(".about-text .glass-card");
  const visualCard = section.querySelector(".visual-card");
  const features = section.querySelectorAll(".feature");

  if (textCard) {
    setTimeout(() => {
      textCard.style.opacity = "1";
      textCard.style.transform = "translateX(0)";
    }, 200);
  }

  if (visualCard) {
    setTimeout(() => {
      visualCard.style.opacity = "1";
      visualCard.style.transform = "translateX(0)";
    }, 400);
  }

  features.forEach((feature, index) => {
    setTimeout(() => {
      feature.style.opacity = "1";
      feature.style.transform = "translateX(0)";
    }, 600 + index * 100);
  });
}

// Animate contact section
function animateContactSection(section) {
  const contactCard = section.querySelector(".contact-main");
  const stats = section.querySelectorAll(".contact-stat");

  if (contactCard) {
    setTimeout(() => {
      contactCard.style.opacity = "1";
      contactCard.style.transform = "translateY(0)";
    }, 200);
  }

  stats.forEach((stat, index) => {
    setTimeout(() => {
      animateNumber(stat.querySelector(".stat-number"));
    }, 500 + index * 100);
  });
}

// Enhanced parallax with multiple layers
function initParallax() {
  const shapes = document.querySelectorAll(".shape");
  const imageCards = document.querySelectorAll(".image-card");
  const floatingCards = document.querySelectorAll(".floating-card");

  let ticking = false;

  function handleParallax() {
    const scrolled = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Animate background shapes
    shapes.forEach((shape, index) => {
      const speed = 0.1 + index * 0.05;
      const yPos = scrolled * speed;
      const rotation = scrolled * 0.01 * (index + 1);
      shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
    });

    // Animate hero images
    imageCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const speed = 0.05 + index * 0.02;

      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const yPos = scrolled * speed;
        const currentTransform = card.style.transform || "";
        const rotateMatch = currentTransform.match(/rotate\([^)]+\)/);
        const rotate = rotateMatch ? rotateMatch[0] : "rotate(0deg)";

        card.style.transform = `translateY(${yPos}px) ${rotate}`;
      }
    });

    // Animate floating cards
    floatingCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const speed = 0.08 + index * 0.03;

      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const yPos = scrolled * speed;
        card.style.transform = `translateY(${yPos}px)`;
      }
    });

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        requestAnimationFrame(handleParallax);
        ticking = true;
      }
    },
    { passive: true }
  );
}

// Enhanced 3D tilt effect with gyroscope support
function initTiltEffect() {
  const cards = document.querySelectorAll("[data-tilt]");

  cards.forEach((card) => {
    let isHovering = false;

    card.addEventListener("mouseenter", function () {
      isHovering = true;
      this.style.transformStyle = "preserve-3d";
    });

    card.addEventListener("mousemove", function (e) {
      if (!isHovering) return;

      const rect = this.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      const rotateX = deltaY * -15; // Increased for more dramatic effect
      const rotateY = deltaX * 15;
      const scale = 1.05;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale}) translateZ(20px)`;
    });

    card.addEventListener("mouseleave", function () {
      isHovering = false;
      this.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)";
    });
  });

  // Add touch support for mobile devices
  if ("ontouchstart" in window) {
    cards.forEach((card) => {
      card.addEventListener("touchstart", function () {
        this.style.transform =
          "perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.02) translateZ(10px)";
      });

      card.addEventListener("touchend", function () {
        this.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)";
      });
    });
  }
}

// Enhanced image animations
function initImageAnimations() {
  const imageCards = document.querySelectorAll(".image-card");

  imageCards.forEach((card, index) => {
    // Add entrance animation
    card.style.opacity = "0";
    card.style.transform = `translateY(50px) rotate(${
      index % 2 === 0 ? "-" : ""
    }5deg)`;

    setTimeout(() => {
      card.style.transition = "all 1s cubic-bezier(0.23, 1, 0.320, 1)";
      card.style.opacity = "1";
      card.style.transform = `translateY(0) rotate(${
        index % 2 === 0 ? "-" : ""
      }2deg)`;
    }, 1000 + index * 200);

    // Add hover interactions
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
      this.style.transform = `translateY(-10px) rotate(0deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = index + 1;
      this.style.transform = `translateY(0) rotate(${
        index % 2 === 0 ? "-" : ""
      }2deg) scale(1)`;
    });
  });
}

// Number counter animation
function animateNumber(element) {
  if (!element) return;

  const text = element.textContent;
  const number = parseInt(text.replace(/\D/g, ""));
  const suffix = text.replace(/\d/g, "");

  if (isNaN(number)) return;

  const duration = 2000;
  const steps = 60;
  const stepValue = number / steps;
  const stepDuration = duration / steps;

  let current = 0;
  element.textContent = "0" + suffix;

  const timer = setInterval(() => {
    current += stepValue;
    if (current >= number) {
      current = number;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
  }, stepDuration);
}

// Initialize number counters for hero stats
function initNumberCounters() {
  const heroStats = document.querySelectorAll(".hero-stats .stat-number");

  // Animate hero stats on page load
  setTimeout(() => {
    heroStats.forEach((stat, index) => {
      setTimeout(() => {
        animateNumber(stat);
      }, index * 200);
    });
  }, 1500);
}

// Loading animations with stagger
function initLoadingAnimations() {
  const animatedElements = [
    ".hero-badge",
    ".hero-title",
    ".hero-description",
    ".hero-stats",
    ".hero-actions",
  ];

  animatedElements.forEach((selector, index) => {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.add("loading");
      setTimeout(() => {
        element.classList.add("loaded");
      }, 500 + index * 200);
    }
  });
}

// Performance optimizations
function initPerformanceOptimizations() {
  // Lazy load images with fade effect
  const images = document.querySelectorAll('img[src*="unsplash"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // Add loading effect
          img.style.transition = "opacity 0.5s ease, transform 0.5s ease";
          img.style.opacity = "0";
          img.style.transform = "scale(1.1)";

          // Create a new image to preload
          const newImg = new Image();
          newImg.onload = function () {
            img.style.opacity = "1";
            img.style.transform = "scale(1)";
          };
          newImg.src = img.src;

          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  // Preload critical resources
  const criticalImages = [
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=400&fit=crop&crop=face",
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });

  // Performance monitoring
  if ("performance" in window && "measure" in performance) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0];
        if (
          perfData &&
          perfData.loadEventEnd - perfData.loadEventStart > 3000
        ) {
          console.warn("Page load time exceeded 3 seconds");
        }
      }, 0);
    });
  }
}

// Advanced interactions and easter eggs
function initEasterEggs() {
  let clickCount = 0;
  const logo = document.querySelector(".hero .logo, .nav-logo");

  if (logo) {
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      clickCount++;

      if (clickCount === 5) {
        // Create confetti effect
        createConfetti();

        // Reset counter
        setTimeout(() => {
          clickCount = 0;
        }, 3000);
      }
    });
  }

  // Konami code easter egg
  let konamiCode = [];
  const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

  document.addEventListener("keydown", function (e) {
    konamiCode.push(e.keyCode);

    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }

    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
      document.body.style.filter = "hue-rotate(180deg)";
      setTimeout(() => {
        document.body.style.filter = "";
      }, 5000);
    }
  });
}

// Create confetti effect
function createConfetti() {
  const colors = ["#FF7A3D", "#F4B942", "#2D5A3D", "#FFFFFF"];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.style.cssText = `
          position: fixed;
          top: -10px;
          left: ${Math.random() * 100}vw;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          z-index: 10000;
          border-radius: 50%;
          pointer-events: none;
          animation: confettiFall 3s ease-out forwards;
      `;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

// Add confetti animation
const style = document.createElement("style");
style.textContent = `
  @keyframes confettiFall {
      to {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
      }
  }
`;
document.head.appendChild(style);

// Utility functions
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Handle window resize
window.addEventListener(
  "resize",
  debounce(function () {
    // Reinitialize effects on resize
    initTiltEffect();
  }, 250)
);

// Handle page visibility changes
document.addEventListener("visibilitychange", function () {
  const shapes = document.querySelectorAll(".shape");
  if (document.hidden) {
    shapes.forEach((shape) => {
      shape.style.animationPlayState = "paused";
    });
  } else {
    shapes.forEach((shape) => {
      shape.style.animationPlayState = "running";
    });
  }
});

// Initialize easter eggs
initEasterEggs();

// Add loading class to body
document.body.classList.add("loading");

// Remove loading class when everything is loaded
window.addEventListener("load", function () {
  setTimeout(() => {
    document.body.classList.remove("loading");
    document.body.classList.add("loaded");
  }, 500);
});

// Accessibility improvements
function initAccessibility() {
  // Add skip link
  const skipLink = document.createElement("a");
  skipLink.href = "#about";
  skipLink.textContent = "Skip to main content";
  skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--deep-green);
      color: white;
      padding: 8px 16px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10001;
      transition: top 0.3s;
      font-weight: 500;
  `;

  skipLink.addEventListener("focus", function () {
    this.style.top = "6px";
  });

  skipLink.addEventListener("blur", function () {
    this.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Enhance keyboard navigation
  const focusableElements = document.querySelectorAll(
    'a[href], button, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach((el) => {
    el.addEventListener("focus", function () {
      this.style.boxShadow = "0 0 0 3px rgba(255, 122, 61, 0.5)";
    });

    el.addEventListener("blur", function () {
      this.style.boxShadow = "";
    });
  });
}

// Initialize accessibility features
initAccessibility();
