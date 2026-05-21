// Mobile nav
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Formspree AJAX — handles all forms on page
document.querySelectorAll('form[data-formspree]').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const successMsg = form.querySelector('.form-success');
    const originalText = btn ? btn.textContent : '';
    if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.reset();
        if (successMsg) { successMsg.style.display = 'block'; }
        if (btn) { btn.textContent = '✓ Sent!'; btn.style.background = '#34c777'; }
      } else {
        if (btn) { btn.textContent = 'Error — Try Again'; btn.disabled = false; }
      }
    } catch {
      if (btn) { btn.textContent = 'Error — Try Again'; btn.disabled = false; }
    }
    setTimeout(() => {
      if (btn) { btn.textContent = originalText; btn.disabled = false; btn.style.background = ''; }
    }, 5000);
  });
});

// Sticky header shadow on scroll
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10 ? '0 4px 32px rgba(15,32,68,0.22)' : '';
  }, { passive: true });
}
