// Typewriter-style rotating text in hero
const phrases = [
  "LLMs & agentic AI",
  "retrieval-augmented generation",
  "production ML systems"
];

const rotatingEl = document.getElementById("hero-rotating");
if (rotatingEl) {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIndex];
    if (!deleting) {
      charIndex++;
      if (charIndex === current.length + 2) {
        deleting = true;
        setTimeout(tick, 900);
        return;
      }
    } else {
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    rotatingEl.textContent = current.slice(0, Math.max(charIndex, 0));
    const delay = deleting ? 40 : 70;
    setTimeout(tick, delay);
  }

  tick();
}

// Scroll reveal animations
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach(el => observer.observe(el));
} else {
  // Fallback: just show everything
  revealEls.forEach(el => el.classList.add("reveal-visible"));
}

// Simple smooth scroll for in-page links (if you add #anchors later)
document.addEventListener("click", e => {
  const link = e.target.closest("a[href^='#']");
  if (!link) return;
  const id = link.getAttribute("href").slice(1);
  const target = document.getElementById(id);
  if (!target) return;

  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth" });
});

// Optional: subtle nav shadow on scroll
const header = document.querySelector(".site-header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });
}

// 3D card tilt effect on mouse move
document.querySelectorAll('.card-3d').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// Animate stats on scroll
const animateStats = () => {
  const statNumbers = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent.trim();

        // Extract number from text like "4+" or "15+"
        const match = finalValue.match(/(\d+)/);
        if (match) {
          const num = parseInt(match[1]);
          let current = 0;
          const increment = num / 50; // 50 steps
          const duration = 1500; // 1.5 seconds
          const stepTime = duration / 50;

          const counter = setInterval(() => {
            current += increment;
            if (current >= num) {
              target.textContent = finalValue;
              clearInterval(counter);
            } else {
              target.textContent = Math.floor(current) + (finalValue.includes('+') ? '+' : '');
            }
          }, stepTime);
        }

        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => observer.observe(stat));
};

// Run stat animation
animateStats();

// Parallax effect on scroll for sections
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;

  // Parallax for gradient orbs
  const orbs = document.querySelectorAll('.gradient-orb');
  orbs.forEach((orb, index) => {
    const speed = 0.5 + (index * 0.2);
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});
