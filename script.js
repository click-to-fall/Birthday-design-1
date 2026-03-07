const countNumber = document.getElementById("countNumber");
const birthdayText = document.getElementById("birthdayText");
const cakeArea = document.getElementById("cakeArea");
const candle = document.getElementById("candle");
const flame = document.getElementById("flame");
const introScreen = document.getElementById("introScreen");
const mainPage = document.getElementById("mainPage");

const slides = document.querySelectorAll(".slide");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sliderDots = document.getElementById("sliderDots");

const floatingHearts = document.getElementById("floatingHearts");
const confettiLayer = document.getElementById("confettiLayer");

const surpriseBtn = document.getElementById("surpriseBtn");
const surprisePopup = document.getElementById("surprisePopup");
const closePopup = document.getElementById("closePopup");

let currentSlide = 0;
let autoSlide;
let birthdayOpened = false;

function startIntroCountdown() {
  const numbers = ["3", "2", "1"];
  let index = 0;

  countNumber.textContent = numbers[index];

  const interval = setInterval(() => {
    index++;

    if (index < numbers.length) {
      countNumber.textContent = numbers[index];
    } else {
      clearInterval(interval);
      countNumber.classList.add("hidden");
      birthdayText.classList.remove("hidden");

      setTimeout(() => {
        cakeArea.classList.remove("hidden");
      }, 1200);
    }
  }, 1000);
}

function openBirthdayPage() {
  if (birthdayOpened) return;
  birthdayOpened = true;

  flame.classList.add("off");

  setTimeout(() => {
    introScreen.classList.add("hidden");
    mainPage.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "instant" });

    createDots();
    showSlide(currentSlide);
    startAutoSlide();

    launchConfettiBurst(120);
    launchConfettiRain(80);
    launchHearts(18);
    startFloatingHeartsLoop();
  }, 700);
}

candle.addEventListener("click", openBirthdayPage);

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  const dots = document.querySelectorAll(".slider-dots button");
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[index].classList.add("active");
  if (dots[index]) {
    dots[index].classList.add("active");
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function createDots() {
  if (sliderDots.children.length > 0) return;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
      restartAutoSlide();
    });

    sliderDots.appendChild(dot);
  });
}

function startAutoSlide() {
  autoSlide = setInterval(() => {
    nextSlide();
  }, 3500);
}

function restartAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

let touchStartX = 0;
let touchEndX = 0;

const slider = document.getElementById("slider");

slider.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > 50) {
    prevSlide();
    restartAutoSlide();
  } else if (swipeDistance < -50) {
    nextSlide();
    restartAutoSlide();
  }
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  restartAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  restartAutoSlide();
});

/* hearts */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = ["💖", "💗", "💘", "💕", "💓"][Math.floor(Math.random() * 5)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 4 + "s";
  heart.style.fontSize = 16 + Math.random() * 20 + "px";
  floatingHearts.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8500);
}

function launchHearts(count = 10) {
  for (let i = 0; i < count; i++) {
    setTimeout(createHeart, i * 120);
  }
}

function startFloatingHeartsLoop() {
  setInterval(() => {
    createHeart();
  }, 900);
}

/* confetti */
function randomConfettiColor() {
  const colors = ["#ff4fa0", "#ffd36e", "#9f6bff", "#6effc6", "#ff7d7d", "#ffffff"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createConfettiPiece(startFromCenter = false) {
  const piece = document.createElement("div");
  piece.className = "confetti-piece";
  piece.style.background = randomConfettiColor();
  piece.style.left = startFromCenter
    ? 45 + Math.random() * 10 + "vw"
    : Math.random() * 100 + "vw";
  piece.style.width = 6 + Math.random() * 8 + "px";
  piece.style.height = 10 + Math.random() * 16 + "px";
  piece.style.borderRadius = Math.random() > 0.5 ? "2px" : "50%";
  piece.style.animationDuration = 3 + Math.random() * 3 + "s";
  confettiLayer.appendChild(piece);

  setTimeout(() => {
    piece.remove();
  }, 6500);
}

function launchConfettiBurst(count = 80) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createConfettiPiece(true), i * 20);
  }
}

function launchConfettiRain(count = 50) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createConfettiPiece(false), i * 70);
  }
}

/* surprise popup */
surpriseBtn.addEventListener("click", () => {
  surprisePopup.classList.remove("hidden");
  launchConfettiBurst(70);
  launchHearts(12);
});

closePopup.addEventListener("click", () => {
  surprisePopup.classList.add("hidden");
});

surprisePopup.addEventListener("click", (e) => {
  if (e.target === surprisePopup) {
    surprisePopup.classList.add("hidden");
  }
});

startIntroCountdown();