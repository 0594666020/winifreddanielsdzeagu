
// Reveal sections as they enter view; content remains visible if IntersectionObserver is unavailable.
(function(){
  const nav = document.querySelector('.nav');
  const curtain = document.querySelector('.page-curtain');
  window.addEventListener('scroll', () => nav && nav.classList.toggle('is-compact', window.scrollY > 35), {passive:true});
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.preventDefault(); curtain.classList.remove('is-moving'); void curtain.offsetWidth; curtain.classList.add('is-moving');
    window.setTimeout(() => { target.scrollIntoView({behavior:'smooth',block:'start'}); history.replaceState(null, '', link.getAttribute('href')); }, 260);
  }));
  const items = document.querySelectorAll('.section-title, .about-portrait, .about-copy, .project-card, .gallery-tile, .credential, .stack-group, .contact > *');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  items.forEach(el => { el.classList.add('js-reveal','is-hidden'); });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('is-hidden');
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  items.forEach(el => observer.observe(el));
})();

// Contact form: prepares a message in the visitor's email app (no backend required).
(function(){
 const form=document.getElementById('contactForm');
 if(!form) return;
 form.addEventListener('submit',function(event){
   event.preventDefault();
   if(!form.reportValidity()) return;
   const data=new FormData(form);
   const name=String(data.get('name')||'').trim();
   const email=String(data.get('email')||'').trim();
   const subject=String(data.get('subject')||'Portfolio enquiry').trim();
   const message=String(data.get('message')||'').trim();
   const body=`Name: ${name}\\nEmail: ${email}\\n\\nMessage:\\n${message}`;
   const mailto=`mailto:winifreddzeagu214@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
   const feedback=document.getElementById('formFeedback');
   feedback.textContent='Your email app should open with the message prepared. Please review and send it there.';
   window.location.href=mailto;
 });
})();
