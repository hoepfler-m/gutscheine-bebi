// Gutschein-Flip-Funktion
function revealVoucher(id) {
  const voucher = document.querySelector(`#voucher${id}`).parentElement;
  voucher.classList.toggle('flipped');
  triggerConfetti();
}

// Liebesbrief anzeigen/schließen
document.getElementById('loveLetterButton').addEventListener('click', () => {
  document.getElementById('loveLetter').classList.remove('hidden');
  document.getElementById('overlay').classList.remove('hidden');
  triggerConfetti();
});

function closeLoveLetter() {
  document.getElementById('loveLetter').classList.add('hidden');
  document.getElementById('overlay').classList.add('hidden');
}

// Musik ein/aus
const music = document.getElementById('backgroundMusic');
document.getElementById('toggleMusic').addEventListener('click', () => {
  if (music.paused) {
    music.play();
    document.getElementById('toggleMusic').textContent = '🎶 Musik aus';
  } else {
    music.pause();
    document.getElementById('toggleMusic').textContent = '🎶 Musik ein';
  }
});

// Herz-Effekt bei Klick
document.addEventListener('click', (e) => {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2000);
});

// Konfetti-Effekt
function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FFD700', '#8B0000', '#FFFFFF'],
  });
}

// Musik abspielen beim Laden (optional)
window.addEventListener('load', () => {
  music.volume = 0.5; // Leise starten
});
