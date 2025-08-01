// Gutschein-Flip-Funktion
const vouchers = document.querySelectorAll('.voucher');
let openedVouchers = 0;

vouchers.forEach(voucher => {
  voucher.addEventListener('click', () => {
    const id = voucher.getAttribute('data-id');
    voucher.classList.toggle('flipped');
    if (!voucher.classList.contains('opened')) {
      voucher.classList.add('opened');
      openedVouchers++;
      updateProgress();
      triggerConfetti();
      triggerHearts(5);
      triggerSparkles();
    }
  });
});

// Fortschrittsbalken aktualisieren
function updateProgress() {
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const percentage = (openedVouchers / 20) * 100;
  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${openedVouchers}/20 Gutscheine geöffnet`;
  if (openedVouchers === 20) {
    triggerConfetti();
    alert('Du hast alle Gutscheine geöffnet! Ich liebe dich! ❤️');
  }
}

// Liebesbrief mit Schreibmaschinen-Effekt
const letterText = `Mein Liebling,

Du bist mein Ein und Alles. Ich weiß, dass ich manchmal Fehler gemacht habe, indem ich im Streit gegangen bin oder dich allein gelassen habe. Das tut mir unendlich leid. Mit diesen Gutscheinen verspreche ich dir, dass ich immer an deiner Seite bleibe, dich liebe und respektiere. Ich will nie wieder weglaufen, sondern an uns arbeiten, damit du dich immer sicher und geliebt fühlst. Du bist mein Zuhause, und ich werde alles tun, um dich glücklich zu machen. Ich liebe dich von ganzem Herzen. ❤️

Dein Schatz`;

document.getElementById('loveLetterButton').addEventListener('click', () => {
  document.getElementById('loveLetter').classList.remove('hidden');
  document.getElementById('overlay').classList.remove('hidden');
  typeWriterEffect(letterText, 'letterText', 50);
  triggerConfetti();
  triggerHearts(10);
});

function closeLoveLetter() {
  document.getElementById('loveLetter').classList.add('hidden');
  document.getElementById('overlay').classList.add('hidden');
}

function typeWriterEffect(text, elementId, speed) {
  const element = document.getElementById(elementId);
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Zufällige Liebesbotschaften
const loveMessages = [
  'Du bist mein Sonnenschein an jedem Tag. ☀️',
  'Mit dir ist jede Sekunde magisch. ✨',
  'Ich liebe dein Lachen mehr als alles andere. 😊',
  'Du machst mein Herz jeden Tag aufs Neue glücklich. ❤️',
  'Mit dir an meiner Seite kann ich alles schaffen. 💪',
  'Du bist mein größtes Abenteuer. 🌍',
  'Ich bin so dankbar, dass du an meiner Seite bist. 🙏',
  'Deine Liebe gibt mir Flügel. 🕊️'
];

document.getElementById('randomMessageButton').addEventListener('click', () => {
  const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
  alert(message);
  triggerHearts(3);
});

// Hintergrundwechsel
const backgrounds = [
  'linear-gradient(135deg, #8B0000, #4B0082)',
  'linear-gradient(135deg, #FF69B4, #800080)',
  'linear-gradient(135deg, #C71585, #483D8B)',
  'linear-gradient(135deg, #B22222, #2F4F4F)'
];

let currentBackground = 0;
document.getElementById('changeBackgroundButton').addEventListener('click', () => {
  currentBackground = (currentBackground + 1) % backgrounds.length;
  document.body.style.background = backgrounds[currentBackground];
  triggerSparkles();
});

// Herz-Regen
function triggerHearts(count) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * window.innerWidth}px`;
    heart.style.top = `${window.innerHeight}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }
}

// Konfetti-Effekt
function triggerConfetti() {
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 },
    colors: ['#C0C0C0', '#8B0000', '#FFFFFF'],
  });
}

// Funkeln-Effekt
const sparkleCanvas = document.getElementById('sparkleCanvas');
const ctx = sparkleCanvas.getContext('2d');
sparkleCanvas.width = window.innerWidth;
sparkleCanvas.height = window.innerHeight;

const sparkles = [];
function createSparkle() {
  return {
    x: Math.random() * sparkleCanvas.width,
    y: Math.random() * sparkleCanvas.height,
    size: Math.random() * 5 + 2,
    speed: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.5
  };
}

function triggerSparkles() {
  for (let i = 0; i < 20; i++) {
    sparkles.push(createSparkle());
  }
}

function animateSparkles() {
  ctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
  sparkles.forEach((sparkle, index) => {
    ctx.beginPath();
    ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(192, 192, 192, ${sparkle.opacity})`;
    ctx.fill();
    sparkle.y -= sparkle.speed;
    sparkle.opacity -= 0.01;
    if (sparkle.opacity <= 0) {
      sparkles.splice(index, 1);
    }
  });
  requestAnimationFrame(animateSparkles);
}

window.addEventListener('resize', () => {
  sparkleCanvas.width = window.innerWidth;
  sparkleCanvas.height = window.innerHeight;
});

animateSparkles();

// Polaroid-Klick-Effekt
const polaroids = document.querySelectorAll('.polaroid');
polaroids.forEach(polaroid => {
  polaroid.addEventListener('click', () => {
    polaroid.style.transform = `rotate(${Math.random() * 4 - 2}deg) scale(1.1)`;
    setTimeout(() => {
      polaroid.style.transform = polaroid.classList.contains('even') ? 'rotate(2deg)' : 'rotate(-2deg)';
    }, 300);
    triggerHearts(3);
  });
});
