let swiper = null;
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  if (swiper) {
    swiper.destroy(true, true);
    swiper = null;
    btn.textContent = "Initialize Swiper";
    console.log("Swiper destroyed");
  } else {
    swiper = new Swiper(".mySwiper", {
      slidesPerView: "auto",
      spaceBetween: 8,
      centeredSlides: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      on: {
        init: () => console.log("Swiper initialised"),
        activeIndexChange: (s) => console.log("active", s.realIndex + 1),
      },
    });
    btn.textContent = "Destroy Swiper";
  }
});
