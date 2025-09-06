// ===============================
// THEME TOGGLE
// ===============================
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const themeIcon = themeToggle.querySelector("i");

const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
}

// ===============================
// MOBILE NAVIGATION
// ===============================
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ===============================
// SMOOTH SCROLLING
// ===============================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;
    const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
  });
});

// ===============================
// ACTIVE NAVIGATION LINKS
// ===============================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`)
          link.classList.add("active");
      });
    }
  });
}
window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

// ===============================
// SCROLL & FADE ANIMATIONS
// ===============================
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(`
    .hero-content,
    .about-content,
    .skill-category,
    .project-card,
    .timeline-item,
    .certification-item,
    .activity-item,
    .highlight-item
  `);
  animateElements.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });
});

// ===============================
// NAVBAR BACKGROUND ON SCROLL
// ===============================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  navbar.style.backgroundColor =
    window.scrollY > 50
      ? body.getAttribute("data-theme") === "dark"
        ? "rgba(15, 23, 42, 0.98)"
        : "rgba(255, 255, 255, 0.98)"
      : body.getAttribute("data-theme") === "dark"
      ? "rgba(15, 23, 42, 0.95)"
      : "rgba(255, 255, 255, 0.95)";
});

// ===============================
// TYPING ANIMATION
// ===============================
function typeWriter(el, text, speed = 50) {
  let i = 0;
  el.textContent = "";
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      setTimeout(type, speed);
    }
  }
  type();
}
window.addEventListener("load", () => {
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) typeWriter(heroSubtitle, heroSubtitle.textContent, 75);
});

// ===============================
// SKILLS ANIMATION
// ===============================
function animateSkills() {
  const skillItems = document.querySelectorAll(".skill-item");
  skillItems.forEach((item, index) => {
    setTimeout(
      () => (item.style.animation = "fadeInUp 0.6s ease forwards"),
      index * 100
    );
  });
}

// ===============================
// PERFORMANCE MONITORING
// ===============================
function measurePerformance() {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      const loadTime =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Page loaded in ${loadTime}ms`);
    });
  }
}
measurePerformance();

// ===============================
// ERROR HANDLING
// ===============================
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error);
});

// ===============================
// LAZY LOADING IMAGES
// ===============================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });
  document
    .querySelectorAll("img[data-src]")
    .forEach((img) => imageObserver.observe(img));
}

// ===============================
// KEYBOARD NAVIGATION ACCESSIBILITY
// ===============================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
  if (e.key === "Tab") {
    const focusable = document.querySelectorAll(
      `a[href], button, textarea, input, select, details,[tabindex]:not([tabindex="-1"])`
    );
    const first = focusable[0],
      last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

// ===============================
// DYNAMIC CSS INJECTION
// ===============================
const style = document.createElement("style");
style.textContent = `
  .form-group input.error, .form-group textarea.error { border-color: var(--error-color); box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1); }
  .notification-content { display: flex; align-items: center; gap: 0.75rem; }
  .notification-close { background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 0.25rem; border-radius: 50%; transition: var(--transition); margin-left: auto; }
  .notification-close:hover { background-color: var(--bg-secondary); color: var(--text-primary); }
`;
document.head.appendChild(style);

// ===============================
// CONTACT FORM VALIDATION + FORM SUBMISSION
// ===============================
const contactForm = document.getElementById("contactForm");
const formFields = contactForm.querySelectorAll("input, textarea");

formFields.forEach((input) => {
  input.addEventListener("blur", validateField);
  input.addEventListener("input", clearFieldError);
});

function clearFieldError(field) {
  field.classList.remove("error");
  const err = field.parentNode.querySelector(".error-message");
  if (err) err.remove();
}

function validateField(e) {
  const field = e.target;
  const val = field.value.trim();
  clearFieldError(field);
  if (!val) {
    showFieldError(field, "This field is required");
    return false;
  }
  if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    showFieldError(field, "Enter valid email");
    return false;
  }
  if (field.name === "name" && val.length < 2) {
    showFieldError(field, "Name at least 2 chars");
    return false;
  }
  if (field.name === "message" && val.length < 10) {
    showFieldError(field, "Message at least 10 chars");
    return false;
  }
  return true;
}

function showFieldError(field, msg) {
  field.classList.add("error");
  const existing = field.parentNode.querySelector(".error-message");
  if (existing) existing.remove();
  const div = document.createElement("div");
  div.className = "error-message";
  div.textContent = msg;
  div.style.color = "var(--error-color)";
  div.style.fontSize = "0.8rem";
  div.style.marginTop = "0.25rem";
  field.parentNode.appendChild(div);
}

// Form submission with Formspree async + offline demo mode
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let valid = true;
  formFields.forEach((f) => {
    if (!validateField({ target: f })) valid = false;
  });
  if (!valid) return;

  const btn = contactForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  const fd = new FormData(contactForm);
  const n = fd.get("name"),
    em = fd.get("email"),
    sub = fd.get("subject"),
    m = fd.get("message");

  try {
    const res = await fetch(contactForm.action, {
      method: "POST",
      body: fd,
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      showNotification("✅ Message sent successfully!", "success");
      showMessageReview(n, em, sub, m);
      contactForm.reset();
    } else simulateOffline(n, em, sub, m);
  } catch (err) {
    simulateOffline(n, em, sub, m);
    console.error(err);
  }

  btn.innerHTML = originalText;
  btn.disabled = false;
});

function simulateOffline(name, email, subject, message) {
  showNotification(
    "⚠️ Could not send online. Showing demo submission...",
    "warning"
  );
  setTimeout(() => {
    showNotification("✅ Message sent successfully! (Demo)", "success");
    showMessageReview(name, email, subject, message);
    contactForm.reset();
  }, 2000);
}

// Review Box
function showMessageReview(name, email, subject, message) {
  const existing = document.querySelector(".message-review");
  if (existing) existing.remove();
  const box = document.createElement("div");
  box.className = "message-review";
  box.innerHTML = `<h3>📩 Message Received</h3>
  <p><strong>Name:</strong> ${escapeHtml(name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
  <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
  <p><strong>Message:</strong> ${escapeHtml(message)}</p>`;
  box.style.cssText =
    "margin-top:2rem;padding:1.5rem;background:var(--bg-primary);border:1px solid var(--border-color);border-left:4px solid var(--primary-color);border-radius:var(--border-radius);box-shadow:var(--shadow-medium);";
  contactForm.parentNode.appendChild(box);
}

// Escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Notifications
function showNotification(msg, type = "info") {
  document.querySelectorAll(".notification").forEach((n) => n.remove());
  const n = document.createElement("div");
  n.className = `notification notification-${type}`;
  n.innerHTML = `<div class="notification-content"><i class="fas ${getNotificationIcon(
    type
  )}"></i><span>${msg}</span><button class="notification-close"><i class="fas fa-times"></i></button></div>`;
  n.style.cssText = `position:fixed;top:90px;right:20px;z-index:10000;background:var(--bg-primary);border:1px solid var(--border-color);border-left:4px solid ${getNotificationColor(
    type
  )};border-radius:var(--border-radius);box-shadow:var(--shadow-large);padding:1rem;max-width:400px;transform:translateX(100%);transition:transform 0.3s ease;`;
  document.body.appendChild(n);
  setTimeout(() => (n.style.transform = "translateX(0)"), 100);
  n.querySelector(".notification-close").addEventListener("click", () => {
    n.style.transform = "translateX(100%)";
    setTimeout(() => n.remove(), 300);
  });
  setTimeout(() => {
    if (document.body.contains(n)) {
      n.style.transform = "translateX(100%)";
      setTimeout(() => n.remove(), 300);
    }
  }, 5000);
}

function getNotificationIcon(type) {
  return {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  }[type];
}
function getNotificationColor(type) {
  return {
    success: "var(--success-color)",
    error: "var(--error-color)",
    warning: "var(--warning-color)",
    info: "var(--primary-color)",
  }[type];
}

// ===============================
// SERVICE WORKER
// ===============================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("SW registered:", reg))
      .catch((err) => console.log("SW failed:", err));
  });
}

// ===============================
// DOM READY INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio JS initialized");
  updateActiveNav();
});
