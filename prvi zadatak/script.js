function toggleText() {
  const btn = document.getElementById("btn");
  const showSection = document.getElementById("hero-paragraph-show");
  btn.classList.toggle("open");
  showSection.classList.toggle("open");

  const isOpen = showSection.classList.contains("open");
}

class Segment extends HTMLElement {
  constructor() {
    super();
  }
}
const sections = document.querySelectorAll("Segment");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    });
  },
  {
    threshold: 0.4,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});
