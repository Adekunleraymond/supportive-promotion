const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const subject = encodeURIComponent(`Supportive Promotion inquiry from ${form.get('name')}`);
  const body = encodeURIComponent(
`Name: ${form.get('name')}
Phone: ${form.get('phone') || 'Not provided'}
Email: ${form.get('email')}

What I want to promote:
${form.get('message')}`
  );
  window.location.href = `mailto:Supportivepromotioncompany@gmail.com?subject=${subject}&body=${body}`;
});

const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) backTop?.classList.add('show');
  else backTop?.classList.remove('show');
});
backTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));


// Team accordion: service details are hidden until the member is clicked.
document.querySelectorAll('.team-expandable').forEach((card) => {
  const toggle = () => {
    const open = card.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.team-expandable').forEach((item) => {
      item.setAttribute('aria-expanded', 'false');
    });
    card.setAttribute('aria-expanded', String(!open));
  };

  card.addEventListener('click', toggle);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  });
});

// Inquiry delivery: prepare the same inquiry for email and WhatsApp.
document.querySelectorAll('form').forEach((form) => {
  if (!form.querySelector('input[name="name"], #name')) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const get = (selectors) => {
      const el = form.querySelector(selectors);
      return el ? el.value.trim() : '';
    };
    const name = get('input[name="name"], #name');
    const phone = get('input[name="phone"], #phone');
    const senderEmail = get('input[name="email"], #email');
    const message = get('textarea[name="message"], textarea');
    const subject = encodeURIComponent('New Supportive Promotion Inquiry from ' + (name || 'Website Visitor'));
    const body = encodeURIComponent(
      'Hello Supportive Promotion,\\n\\n' +
      'Name: ' + name + '\\n' +
      'Phone: ' + phone + '\\n' +
      'Email: ' + senderEmail + '\\n\\n' +
      'What they want to promote:\\n' + message
    );
    const whatsappText = encodeURIComponent(
      'Hello Supportive Promotion!\\n\\n' +
      'Name: ' + name + '\\n' +
      'Phone: ' + phone + '\\n' +
      'Email: ' + senderEmail + '\\n\\n' +
      'What I want to promote:\\n' + message
    );
    window.location.href = 'mailto:Supportivepromotioncompany@gmail.com?subject=' + subject + '&body=' + body;
    setTimeout(() => {
      window.open('https://wa.me/12088409202?text=' + whatsappText, '_blank');
    }, 700);
  });
});

const waInquiry = document.getElementById('whatsapp-inquiry');
if (waInquiry) {
  waInquiry.addEventListener('click', (event) => {
    const form = waInquiry.closest('section')?.querySelector('form') || document.querySelector('form');
    if (!form) return;
    const get = (selectors) => {
      const el = form.querySelector(selectors);
      return el ? el.value.trim() : '';
    };
    const text = encodeURIComponent(
      'Hello Supportive Promotion!\\n\\n' +
      'Name: ' + get('input[name="name"], #name') + '\\n' +
      'Phone: ' + get('input[name="phone"], #phone') + '\\n' +
      'Email: ' + get('input[name="email"], #email') + '\\n\\n' +
      'What I want to promote:\\n' + get('textarea[name="message"], textarea')
    );
    waInquiry.href = 'https://wa.me/12088409202?text=' + text;
  });
}

// Testimonials slider controls.
const testimonialTrack = document.getElementById('testimonial-track');
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialNext = document.getElementById('testimonial-next');
const testimonialDots = document.getElementById('testimonial-dots');

if (testimonialTrack && testimonialPrev && testimonialNext && testimonialDots) {
  const cards = [...testimonialTrack.querySelectorAll('.testimonial-card')];
  let current = 0;
  const render = () => {
    const mobile = window.innerWidth <= 760;
    if (mobile) {
      cards.forEach((card, i) => card.style.display = i === current ? '' : 'none');
    } else {
      cards.forEach(card => card.style.display = '');
    }
    testimonialDots.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'testimonial-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', 'Show testimonial ' + (i + 1));
      dot.addEventListener('click', () => { current = i; render(); });
      testimonialDots.appendChild(dot);
    });
  };
  testimonialPrev.addEventListener('click', () => { current = (current - 1 + cards.length) % cards.length; render(); });
  testimonialNext.addEventListener('click', () => { current = (current + 1) % cards.length; render(); });
  window.addEventListener('resize', render);
  render();
}
