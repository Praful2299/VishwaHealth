/* ============================================================
   VISHWA HEALTH CARE — script.js
   ============================================================ */

/* ─── MOBILE NAV TOGGLE ─── */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('open');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger each visible element slightly
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 70);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── ANIMATED STAT COUNTERS ─── */
const statNums = document.querySelectorAll('.stat-num[data-target]');

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => countObserver.observe(el));

function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1800; // ms
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ─── STICKY NAV SHADOW ON SCROLL ─── */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(0, 18, 25, 0.95)';
  } else {
    nav.style.background = 'rgba(0, 18, 25, 0.78)';
  }
}, { passive: true });

/* ─── CONTACT FORM SUBMIT ─── */
const formSubmitBtn = document.getElementById('formSubmit');

formSubmitBtn.addEventListener('click', () => {
  const name    = document.getElementById('name').value.trim();
  const phone   = document.getElementById('phone').value.trim();
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value.trim();

  if (!name || !phone) {
    shakeButton(formSubmitBtn);
    return;
  }

  // Simulate sending
  formSubmitBtn.textContent = 'Sending…';
  formSubmitBtn.disabled = true;

  setTimeout(() => {
    formSubmitBtn.textContent = '✅ Message Sent!';
    formSubmitBtn.classList.add('success');

    // Reset form fields
    document.getElementById('name').value    = '';
    document.getElementById('phone').value   = '';
    document.getElementById('service').value = '';
    document.getElementById('message').value = '';

    setTimeout(() => {
      formSubmitBtn.textContent = 'Send Message ✦';
      formSubmitBtn.classList.remove('success');
      formSubmitBtn.disabled = false;
    }, 3500);
  }, 1200);
});

function shakeButton(btn) {
  btn.style.animation = 'none';
  btn.style.transform = 'translateX(-8px)';
  setTimeout(() => btn.style.transform = 'translateX(8px)', 80);
  setTimeout(() => btn.style.transform = 'translateX(-5px)', 160);
  setTimeout(() => btn.style.transform = 'translateX(5px)', 240);
  setTimeout(() => btn.style.transform = 'none', 320);
}

/* ─── SMOOTH ANCHOR SCROLL (fallback for older browsers) ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
