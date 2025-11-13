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
