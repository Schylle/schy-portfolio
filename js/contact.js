/* contact.js */
document.addEventListener('DOMContentLoaded', () => {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  // ── Character counter for message ────────────────────────────────────
  const msgArea   = form.querySelector('#message');
  const charCount = form.querySelector('#char-count');
  if (msgArea && charCount) {
    msgArea.addEventListener('input', () => {
      charCount.textContent = msgArea.value.length + ' / 1000';
    });
  }

  // ── Basic client-side validation ─────────────────────────────────────
  function validate() {
    const name  = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const msg   = form.querySelector('#message').value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name)              return 'Please enter your name.';
    if (!emailRe.test(email)) return 'Please enter a valid email address.';
    if (msg.length < 10)    return 'Message must be at least 10 characters.';
    return null;
  }

  function setStatus(type, msg) {
    status.className = 'form-status ' + type;
    status.textContent = msg;
    status.style.display = 'block';
    if (type === 'success') {
      setTimeout(() => { status.style.display = 'none'; }, 6000);
    }
  }

  function setLoading(loading) {
    const btn = form.querySelector('.form-submit');
    btn.disabled = loading;
    btn.innerHTML = loading
      ? '<span class="spinner"></span> Sending…'
      : 'Send Message <svg style="width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0-5.25-5.25M19.5 12l-5.25 5.25"/></svg>';
  }

  // ── Submit handler ────────────────────────────────────────────────────
  form.addEventListener('submit', async e => {
    e.preventDefault();
    status.style.display = 'none';

    const err = validate();
    if (err) { setStatus('error', '⚠ ' + err); return; }

    setLoading(true);

    const ACTION = form.dataset.action || '';
    const payload = {
      name:    form.querySelector('#name').value.trim(),
      email:   form.querySelector('#email').value.trim(),
      subject: form.querySelector('#subject').value.trim(),
      message: form.querySelector('#message').value.trim(),
    };

    // ── If no action URL is set, show setup instructions ────────────────
    if (!ACTION) {
      await new Promise(r => setTimeout(r, 800)); // simulate delay
      setLoading(false);
      setStatus('info',
        '⚙️ Demo mode: Add data-action="https://formspree.io/f/YOUR_ID" to your <form> tag. ' +
        'Sign up free at formspree.io — no server needed.'
      );
      // Apply info style
      status.style.background = 'oklch(0.55 0.20 250 / 0.12)';
      status.style.borderColor = 'oklch(0.55 0.20 250 / 0.4)';
      status.style.color = 'oklch(0.75 0.15 250)';
      return;
    }

    // ── Send to Formspree (or any JSON-accepting endpoint) ───────────────
    try {
      const res = await fetch(ACTION, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success', '✅ Message sent! I\'ll get back to you within 24 hours.');
        form.reset();
        if (charCount) charCount.textContent = '0 / 1000';
      } else {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Server responded with ${res.status}`);
      }
    } catch (err) {
      console.error('Form error:', err);
      setStatus('error',
        '❌ Something went wrong. Please email me directly at hello@shy.dev or try again.'
      );
    } finally {
      setLoading(false);
    }
  });

  // ── Real-time field validation on blur ────────────────────────────────
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => {
      field.style.borderColor = '';
      if (field.required && !field.value.trim()) {
        field.style.borderColor = 'oklch(0.60 0.20 30)';
      }
    });
    field.addEventListener('focus', () => {
      field.style.borderColor = '';
    });
  });
});
