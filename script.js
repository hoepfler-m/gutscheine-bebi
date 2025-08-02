// Performance optimization: Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Cache DOM elements for better performance
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('.section');
  const vouchers = document.querySelectorAll('.voucher');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const progressBar = document.querySelector('.progress-bar');
  const tickerText = document.getElementById('tickerText');
  const overlay = document.getElementById('overlay');
  const loveLetter = document.getElementById('loveLetter');
  const loveLetterButton = document.getElementById('loveLetterButton');
  const randomMessageButton = document.getElementById('randomMessageButton');
  const changeBackgroundButton = document.getElementById('changeBackgroundButton');
  
  let openedVouchers = 0;
  let currentBackground = 0;
  
  // Constants
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
  
  const backgrounds = [
    'linear-gradient(135deg, #8B0000, #4B0082)',
    'linear-gradient(135deg, #FF69B4, #800080)',
    'linear-gradient(135deg, #C71585, #483D8B)',
    'linear-gradient(135deg, #B22222, #2F4F4F)'
  ];

  // Navigation with improved accessibility
  function initNavigation() {
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Hide all sections and show target
        sections.forEach(section => {
          section.classList.add('hidden');
          section.setAttribute('aria-hidden', 'true');
          if (section.id === targetId) {
            section.classList.remove('hidden');
            section.setAttribute('aria-hidden', 'false');
            // Focus management for accessibility
            const heading = section.querySelector('h2');
            if (heading) heading.focus();
          }
        });
        
        // Update active navigation state
        navLinks.forEach(l => {
          l.classList.remove('active');
          l.removeAttribute('aria-current');
        });
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      });
      
      // Keyboard navigation support
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          link.click();
        }
      });
    });
  }

  // Voucher functionality with accessibility improvements
  function initVouchers() {
    vouchers.forEach(voucher => {
      function toggleVoucher() {
        const isOpen = voucher.classList.contains('open');
        
        // Close other vouchers first
        vouchers.forEach(v => {
          if (v !== voucher) {
            v.classList.remove('open');
            v.setAttribute('aria-expanded', 'false');
          }
        });
        
        if (!isOpen) {
          voucher.classList.add('open');
          voucher.setAttribute('aria-expanded', 'true');
          
          if (!voucher.classList.contains('opened')) {
            voucher.classList.add('opened');
            openedVouchers++;
            updateProgress();
            
            // Delayed effects to improve performance
            requestAnimationFrame(() => {
              triggerConfetti();
              triggerHearts(5);
              triggerSparkles();
            });
          }
        } else {
          voucher.classList.remove('open');
          voucher.setAttribute('aria-expanded', 'false');
        }
      }
      
      voucher.addEventListener('click', toggleVoucher);
      voucher.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleVoucher();
        }
      });
    });
  }

  // Progress bar with ARIA support
  function updateProgress() {
    const percentage = (openedVouchers / 20) * 100;
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${openedVouchers}/20 Gutscheine geöffnet`;
    progressBar.setAttribute('aria-valuenow', openedVouchers);
    
    if (openedVouchers === 20) {
      requestAnimationFrame(() => triggerConfetti());
      // Use more accessible notification instead of alert
      const notification = document.createElement('div');
      notification.setAttribute('role', 'status');
      notification.setAttribute('aria-live', 'polite');
      notification.textContent = 'Alle Gutscheine geöffnet! Ich liebe dich! ❤️';
      notification.style.cssText = 'position: fixed; top: 20px; left: 50%; transform: translateX(-50%); background: var(--primary-red); color: white; padding: 15px 25px; border-radius: 8px; z-index: 2000;';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 5000);
    }
  }

  // Love letter functionality
  function initLoveLetter() {
    loveLetterButton.addEventListener('click', () => {
      loveLetter.classList.remove('hidden');
      overlay.classList.remove('hidden');
      loveLetter.setAttribute('aria-hidden', 'false');
      overlay.setAttribute('aria-hidden', 'false');
      
      // Focus management for modal
      const closeButton = loveLetter.querySelector('button');
      if (closeButton) closeButton.focus();
      
      requestAnimationFrame(() => {
        triggerConfetti();
        triggerHearts(10);
      });
    });
    
    // Close on overlay click
    overlay.addEventListener('click', closeLoveLetter);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !loveLetter.classList.contains('hidden')) {
        closeLoveLetter();
      }
    });
  }

  // Global close function for love letter
  window.closeLoveLetter = function() {
    loveLetter.classList.add('hidden');
    overlay.classList.add('hidden');
    loveLetter.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
    
    // Return focus to trigger button
    loveLetterButton.focus();
  };

  // Random message functionality
  function initRandomMessage() {
    randomMessageButton.addEventListener('click', () => {
      const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
      
      // Create accessible notification instead of alert
      const notification = document.createElement('div');
      notification.setAttribute('role', 'status');
      notification.setAttribute('aria-live', 'polite');
      notification.textContent = message;
      notification.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(139, 0, 0, 0.95); color: white; padding: 20px 30px; border-radius: 12px; z-index: 2000; max-width: 80%; text-align: center; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);';
      document.body.appendChild(notification);
      
      setTimeout(() => notification.remove(), 4000);
      requestAnimationFrame(() => triggerHearts(3));
    });
  }

  // Love ticker functionality
  function initLoveTicker() {
    tickerText.textContent = loveMessages.join(' • ');
    
    // Restart animation periodically
    setInterval(() => {
      tickerText.style.animation = 'none';
      requestAnimationFrame(() => {
        tickerText.style.animation = 'ticker 20s linear infinite';
      });
    }, 20000);
  }

  // Background change functionality
  function initBackgroundChanger() {
    changeBackgroundButton.addEventListener('click', () => {
      currentBackground = (currentBackground + 1) % backgrounds.length;
      document.body.style.background = backgrounds[currentBackground];
      requestAnimationFrame(() => triggerSparkles());
    });
  }

  // Heart animation with performance optimization
  function triggerHearts(count) {
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.style.left = `${Math.random() * window.innerWidth}px`;
      heart.style.top = `${window.innerHeight}px`;
      fragment.appendChild(heart);
      
      // Remove heart after animation
      setTimeout(() => heart.remove(), 2000);
    }
    
    document.body.appendChild(fragment);
  }

  // Confetti with error handling
  function triggerConfetti() {
    if (typeof confetti !== 'undefined') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C0C0C0', '#8B0000', '#FFFFFF']
      });
    }
  }

  // Sparkle effect with performance optimization
  function initSparkles() {
    const sparkleCanvas = document.getElementById('sparkleCanvas');
    const ctx = sparkleCanvas.getContext('2d');
    const sparkles = [];
    let animationId;
    
    function resizeCanvas() {
      sparkleCanvas.width = window.innerWidth;
      sparkleCanvas.height = window.innerHeight;
    }
    
    function createSparkle() {
      return {
        x: Math.random() * sparkleCanvas.width,
        y: Math.random() * sparkleCanvas.height,
        size: Math.random() * 5 + 2,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.5
      };
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
      
      if (sparkles.length > 0) {
        animationId = requestAnimationFrame(animateSparkles);
      }
    }
    
    window.triggerSparkles = function() {
      for (let i = 0; i < 20; i++) {
        sparkles.push(createSparkle());
      }
      if (!animationId) {
        animateSparkles();
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  // Polaroid click effects with accessibility
  function initPolaroids() {
    const polaroids = document.querySelectorAll('.polaroid');
    polaroids.forEach(polaroid => {
      function handlePolaroidInteraction() {
        const isEven = Array.from(polaroids).indexOf(polaroid) % 2 === 1;
        polaroid.style.transform = `rotate(${Math.random() * 4 - 2}deg) scale(1.1)`;
        
        setTimeout(() => {
          polaroid.style.transform = isEven ? 'rotate(2deg)' : 'rotate(-2deg)';
        }, 300);
        
        requestAnimationFrame(() => triggerHearts(3));
      }
      
      polaroid.addEventListener('click', handlePolaroidInteraction);
      polaroid.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlePolaroidInteraction();
        }
      });
    });
  }

  // Quiz functionality with better form handling
  window.checkQuiz = function() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const result = document.getElementById('quizResult');
    let score = 0;
    let message = '';

    if (q1 && q1.value === 'b') { // Angenommen, "Im Park" ist korrekt
      score++;
    }
    if (q2 && q2.value === 'c') { // Angenommen, "Pasta" ist korrekt
      score++;
    }

    if (score === 2) {
      message = 'Wow, du kennst mich so gut! Du bist mein perfekter Partner! ❤️';
      requestAnimationFrame(() => {
        triggerConfetti();
        triggerHearts(5);
      });
    } else if (score === 1) {
      message = 'Fast perfekt! Du machst mein Herz trotzdem schneller schlagen! 😊';
      requestAnimationFrame(() => triggerHearts(3));
    } else {
      message = 'Kein Problem, wir lernen uns jeden Tag besser kennen! Ich liebe dich! 💕';
      requestAnimationFrame(() => triggerHearts(3));
    }

    result.textContent = message;
  };

  // Performance optimization: Use Intersection Observer for animations
  function initIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, { threshold: 0.1 });

      // Observe sections for animations
      sections.forEach(section => observer.observe(section));
    }
  }

  // Initialize all functionality
  function init() {
    initNavigation();
    initVouchers();
    initLoveLetter();
    initRandomMessage();
    initLoveTicker();
    initBackgroundChanger();
    initSparkles();
    initPolaroids();
    initIntersectionObserver();
    
    // Performance: Preload images in viewport
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        img.src = img.dataset.src;
      });
    }
  }

  // Error handling
  window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Graceful degradation - continue functionality
  });

  // Initialize everything
  init();
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silently fail if no service worker available
    });
  });
}
