// Dark theme is now default - no toggle needed

// ========================================
// MOBILE NAVIGATION - Hamburger Menu
// ========================================
(function() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.getElementById('nav-menu');
  
  if (!hamburger || !menu) return;
  
  // Overlay erstellen - transparent für Scrollen
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    backdrop-filter: none;
    z-index: 998;
    display: none;
    pointer-events: none;
  `;
  document.body.appendChild(overlay);
  
  // Funktion zum Schließen des Menüs
  function closeMenu() {
    menu.classList.remove('is-open');
    hamburger.classList.remove('is-active');
    hamburger.classList.remove('is-open');
    overlay.style.display = 'none';
    hamburger.setAttribute('aria-expanded', 'false');
  }
  
  // Funktion zum Öffnen des Menüs
  function openMenu() {
    menu.classList.add('is-open');
    hamburger.classList.add('is-active');
    hamburger.classList.add('is-open');
    overlay.style.display = 'block';
    hamburger.setAttribute('aria-expanded', 'true');
  }
  
  // Toggle beim Klick auf Hamburger - mit Touch-Support
  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  
  // Zusätzlicher Touch-Support für mobile Geräte
  hamburger.addEventListener('touchend', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }, { passive: false });
  
  // Menü schließen beim Klick auf einen Link - Navigation zuerst ausführen
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Wenn es ein interner Anker ist (#...), sofort navigieren
      if (href && href.startsWith('#')) {
        // Navigation sofort ausführen
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Menü nach Navigation schließen
        setTimeout(() => {
          closeMenu();
        }, 300);
      } else {
        // Externe Links/Seiten: etwas länger warten
        setTimeout(() => {
          closeMenu();
        }, 200);
      }
    });
  });
  
  // Overlay ist jetzt transparent - kein Klick-Event mehr nötig
  
  // Menü schließen beim ESC-Taste
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });
})();

// IntersectionObserver reveal animations
(function() {
  // FAQ-Items separat behandeln
  const faqSection = document.querySelector('.section.faq');
  const faqItems = document.querySelectorAll('.faq-item.bounce-in');
  
  // Andere animierte Elemente (ohne FAQ-Items)
  const els = document.querySelectorAll('.reveal, .stack, .slide-in-left, .slide-in-right, .fade-in-scale');
  
  if (!('IntersectionObserver' in window)) {
    // Fallback für alte Browser
    els.forEach(el => el.classList.add('is-visible'));
    faqItems.forEach(item => item.classList.add('is-visible'));
    return;
  }
  
  // Observer für FAQ-Sektion: alle Items gleichzeitig animieren
  if (faqSection && faqItems.length > 0) {
    const faqObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          // Alle FAQ-Items gleichzeitig sichtbar machen
          faqItems.forEach(item => {
            item.classList.add('is-visible');
          });
          faqObserver.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    
    faqObserver.observe(faqSection);
  }
  
  // Observer für andere Elemente
  if (els.length > 0) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          // Individual animation for each element with delay
          setTimeout(() => {
            e.target.classList.add('is-visible');
          }, 200); // 200ms delay for smooth animation
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -20% 0px', threshold: 0.2 });
    
    els.forEach(el => io.observe(el));
  }
})();

// Mobile Card Click Functionality for Warum F&K
(function() {
  // Nur auf Touch-Geräten aktivieren UND nur auf größeren Tablets (> 768px)
  if (!('ontouchstart' in window)) return;
  
  // Auf Mobile (≤ 768px) ist der Detail-Text standardmäßig sichtbar, keine Click-Funktionalität benötigt
  if (window.innerWidth <= 768) return;
  
  const cards = document.querySelectorAll('.card.glass');
  if (cards.length === 0) return;
  
  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Alle anderen Cards zurücksetzen
      cards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('clicked');
        }
      });
      
      // Aktuelle Card umschalten
      this.classList.toggle('clicked');
    });
    
    // Klick außerhalb der Card schließt sie
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.card.glass')) {
        cards.forEach(card => {
          card.classList.remove('clicked');
        });
      }
    });
  });
})();


// Hero Carousel - Einfache Implementierung
(function() {
  const carousel = document.querySelector('.hero-carousel');
  if (!carousel) return;
  
  const slides = carousel.querySelectorAll('.hero-slide');
  const dots = carousel.querySelectorAll('.dot');
  const prevBtn = carousel.querySelector('.hero-prev');
  const nextBtn = carousel.querySelector('.hero-next');
  
  let currentSlide = 0;
  
  function showSlide(index) {
    // Alle Slides verstecken
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Aktuellen Slide anzeigen
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
  }
  
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }
  
  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }
  
  // Event Listeners
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });
  
  // Auto-play
  setInterval(nextSlide, 4000);
  
  // Ersten Slide anzeigen
  showSlide(0);
})();

// Gallery carousel: continuous drift with snap-to-center on click/arrows
(function() {
  const wrap = document.querySelector('.gallery-carousel');
  if (!wrap) return;
  const track = wrap.querySelector('.gallery-track');
  if (!track) return;
  let slides = Array.from(track.children);
  const prev = wrap.querySelector('.gallery-arrow.prev');
  const next = wrap.querySelector('.gallery-arrow.next');

  // Duplicate slides for seamless loop
  slides.forEach(s => track.appendChild(s.cloneNode(true)));
  slides = Array.from(track.children);

  let currentX = 0; // px
  let lastTs = 0;
  let driftActive = true;
  let snapAnimating = false;
  let snapStartX = 0;
  let snapTargetX = 0;
  let snapStartTs = 0;
  const snapDuration = 450; // ms

  function getGapPx() {
    const g = getComputedStyle(track).gap || '0px';
    return parseFloat(g) || 0;
  }
  function getSlideWidthPx() {
    const first = track.querySelector('.gslide');
    return first ? first.clientWidth : 0;
  }
  function setTransform() {
    track.style.transform = `translateX(${currentX}px)`;
  }
  function wrapIfNeeded() {
    const unit = getSlideWidthPx() + getGapPx();
    if (!unit) return;
    // Move first to end when we've scrolled past one unit
    while (currentX <= -unit) {
      currentX += unit;
      track.appendChild(track.firstElementChild);
    }
    // Move last to front if scrolling right
    while (currentX > 0) {
      currentX -= unit;
      track.insertBefore(track.lastElementChild, track.firstElementChild);
    }
  }
  function markCenter() {
    // Keine Markierung des mittleren Bildes mehr
    // Alle Bilder bleiben gleich groß
  }

  function tick(ts) {
    if (!lastTs) lastTs = ts;
    const dt = ts - lastTs; // ms
    lastTs = ts;

    if (snapAnimating) {
      const t = Math.min(1, (ts - snapStartTs) / snapDuration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      currentX = snapStartX + (snapTargetX - snapStartX) * eased;
      if (t >= 1) { snapAnimating = false; setTimeout(() => { driftActive = true; }, 1200); }
    } else if (driftActive) {
      const pxPerSec = 140; // continuous speed
      currentX -= (pxPerSec * dt) / 1000;
    }

    wrapIfNeeded();
    setTransform();
    markCenter();
    requestAnimationFrame(tick);
  }

  function snapToSlide(slide) {
    if (!slide) return;
    driftActive = false;
    snapAnimating = true;
    snapStartTs = performance.now();
    snapStartX = currentX;
    const wrapRect = wrap.getBoundingClientRect();
    const targetCenter = wrapRect.left + wrapRect.width / 2;
    const slideRect = slide.getBoundingClientRect();
    const slideCenter = slideRect.left + slideRect.width / 2;
    const delta = targetCenter - slideCenter;
    snapTargetX = currentX + delta;
  }

  // Controls
  if (prev) prev.addEventListener('click', () => {
    driftActive = false; snapAnimating = false;
    const unit = getSlideWidthPx() + getGapPx();
    currentX += unit;
    setTransform(); markCenter();
    setTimeout(() => { driftActive = true; }, 600);
  });
  if (next) next.addEventListener('click', () => {
    driftActive = false; snapAnimating = false;
    const unit = getSlideWidthPx() + getGapPx();
    currentX -= unit;
    setTransform(); markCenter();
    setTimeout(() => { driftActive = true; }, 600);
  });
  track.addEventListener('click', (e) => {
    const s = e.target && (e.target.closest ? e.target.closest('.gslide') : null);
    if (!s) return;
    
    // Prüfe ob auf ein Bild mit data-lightbox geklickt wurde
    const img = s.querySelector('img[data-lightbox]');
    if (img) {
      // Lass die bestehende Lightbox-Funktionalität das übernehmen
      // durch Simulation eines Klicks auf das Bild
      img.click();
    } else {
      // Fallback: Snap-to-Slide für andere Klicks
      snapToSlide(s);
    }
  });
  // Karussell rotiert kontinuierlich weiter, auch bei Hover
  // Hover stoppt die Bewegung nicht mehr - Animation läuft immer

  requestAnimationFrame(tick);
})();

// Offers: only micro hover effect kept (glow/scale via CSS); remove reordering/centering logic
(function() {
  const wrap = document.querySelector('.offers-spotlight');
  if (!wrap) return;
  const track = wrap.querySelector('.offers-track');
  const cards = Array.from(track.querySelectorAll('.offer-card'));
  const prev = wrap.querySelector('.offers-arrow.prev');
  const next = wrap.querySelector('.offers-arrow.next');
  let index = 0;

  function update() {
    const total = cards.length;
    const leftIndex = (index - 1 + total) % total;
    const rightIndex = (index + 1) % total;
    const right2Index = (index + 2) % total;
    cards.forEach((card, i) => {
      card.classList.remove('is-center', 'is-left', 'is-right', 'is-right2');
      if (i === index) card.classList.add('is-center');
      else if (i === leftIndex) card.classList.add('is-left');
      else if (i === rightIndex) card.classList.add('is-right');
      else if (i === right2Index) card.classList.add('is-right2');
    });
    // Normalize height based on tallest card so page doesn't jump
    const maxHeight = cards.reduce((m, c) => Math.max(m, c.offsetHeight || 0), 0);
    if (wrap) {
      requestAnimationFrame(() => {
        // Ensure the container height accommodates normalized offer height plus spacing
        const normalized = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--offer-height')) || maxHeight;
        wrap.style.height = `${Math.max(maxHeight, normalized) + 64}px`;
      });
    }
  }

  function go(delta) {
    index = (index + delta + cards.length) % cards.length;
    update();
  }

  if (prev) prev.addEventListener('click', () => go(-1));
  if (next) next.addEventListener('click', () => go(1));

  // Initialize absolute positions stacking
  track.style.position = 'relative';
  cards.forEach((c) => { c.style.position = 'absolute'; });
  update();

  // Click to focus a card to center
  track.addEventListener('click', (e) => {
    const card = e.target && (e.target.closest ? e.target.closest('.offer-card') : null);
    if (!card) return;
    const idx = cards.indexOf(card);
    if (idx === -1) return;
    index = idx;
    update();
  });
  
  // Touch/Swipe navigation for mobile
  let offerTouchStartX = 0;
  let offerTouchEndX = 0;
  let offerTouchStartY = 0;
  let offerTouchEndY = 0;
  
  wrap.addEventListener('touchstart', (e) => {
    offerTouchStartX = e.changedTouches[0].screenX;
    offerTouchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  wrap.addEventListener('touchend', (e) => {
    offerTouchEndX = e.changedTouches[0].screenX;
    offerTouchEndY = e.changedTouches[0].screenY;
    handleOfferSwipe();
  }, { passive: true });
  
  function handleOfferSwipe() {
    const swipeThreshold = 50; // Minimum distance for swipe
    const diffX = offerTouchStartX - offerTouchEndX;
    const diffY = Math.abs(offerTouchStartY - offerTouchEndY);
    
    // Only swipe horizontally if vertical movement is small
    if (Math.abs(diffX) > swipeThreshold && diffY < swipeThreshold) {
      if (diffX > 0) {
        // Swiped left - show next
        go(1);
      } else {
        // Swiped right - show previous
        go(-1);
      }
    }
  }
})();

// Lightbox mit Navigation
(function() {
  const overlay = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImage');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  
  if (!overlay || !img || !closeBtn) return;

  let currentImageIndex = 0;
  let allImages = [];

  function getAllImages() {
    // Sammle alle Bilder aus der Galerie
    const galleryImages = document.querySelectorAll('.gslide img[data-lightbox]');
    return Array.from(galleryImages).map(img => ({
      src: img.src,
      alt: img.alt
    }));
  }

  function open(src, alt, index = 0) {
    allImages = getAllImages();
    currentImageIndex = index;
    
    img.src = src; 
    img.alt = alt || 'Großansicht';
    overlay.classList.add('is-open');
    overlay.style.display = 'flex'; // Explicit display
    overlay.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
    
    // Navigation-Pfeile anzeigen/verstecken
    if (allImages.length > 1) {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
  }
  
  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.display = 'none'; // Extra failsafe
    img.src = '';
    // Re-enable body scroll
    document.body.style.overflow = '';
  }

  function showNext() {
    if (allImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    const nextImage = allImages[currentImageIndex];
    img.src = nextImage.src;
    img.alt = nextImage.alt;
  }

  function showPrev() {
    if (allImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    const prevImage = allImages[currentImageIndex];
    img.src = prevImage.src;
    img.alt = prevImage.alt;
  }

  // Event Listeners
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t instanceof HTMLImageElement && (t.dataset.lightbox || t.closest('.gallery-item'))) {
      e.preventDefault();
      allImages = getAllImages();
      const clickedIndex = allImages.findIndex(img => img.src === t.src);
      open(t.currentSrc || t.src, t.alt, clickedIndex);
    }
  });
  
  // Overlay click to close - separate event listener
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      close();
    }
  });
  
  // Touch event for overlay on mobile
  overlay.addEventListener('touchend', (e) => {
    if (e.target === overlay) {
      e.preventDefault();
      close();
    }
  });
  
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      close();
    });
    closeBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      close();
    });
    // Extra failsafe for mobile
    closeBtn.addEventListener('touchstart', (e) => {
      e.stopPropagation();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', showPrev);
    prevBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      showPrev();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', showNext);
    nextBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      showNext();
    });
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('is-open')) return;
    
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
  
  // Touch/Swipe navigation for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  
  img.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  img.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for swipe
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);
    
    // Only swipe horizontally if vertical movement is small
    if (Math.abs(diffX) > swipeThreshold && diffY < swipeThreshold) {
      if (diffX > 0) {
        // Swiped left - show next
        showNext();
      } else {
        // Swiped right - show previous
        showPrev();
      }
    }
  }
})();

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16); // 60fps
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  
  updateCounter();
}

// Stats Counter Observer
(function() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => observer.observe(stat));
})();

// Simple Scroll Arrow Functionality - V2
(function() {
  const scrollArrow = document.getElementById('scrollDown');
  if (!scrollArrow) return;
  
  let hasScrolled = false;
  let isClicking = false;
  
  // Funktion zum Verstecken des Pfeils
  function hideArrow() {
    scrollArrow.style.opacity = '0';
    scrollArrow.style.visibility = 'hidden';
    scrollArrow.style.pointerEvents = 'none';
    scrollArrow.style.display = 'none';
    scrollArrow.classList.add('hidden');
  }
  
  // Funktion zum Scrollen zur nächsten Sektion
  function scrollToNextSection(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Verhindere mehrfache Ausführung
    if (isClicking || hasScrolled) return;
    
    isClicking = true;
    
    const nextSection = document.querySelector('.section.why');
    if (nextSection) {
      const headerHeight = 64;
      const targetPosition = nextSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Pfeil nach 1.2 Sekunden mit inline styles verstecken
      setTimeout(() => {
        hasScrolled = true;
        isClicking = false;
        hideArrow();
      }, 1200);
    } else {
      isClicking = false;
    }
  }
  
  // Click-Event (Desktop & Mobile)
  scrollArrow.addEventListener('click', scrollToNextSection);
  
  // Touch-Event für Mobile
  scrollArrow.addEventListener('touchstart', scrollToNextSection, { passive: false });
  
  // Hide arrow after manual scrolling down
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    // Wenn gerade am Scrollen durch Klick, ignoriere manuelles Scrollen
    if (isClicking) return;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      const currentScroll = window.scrollY || window.pageYOffset;
      
      if (currentScroll > 100 && !hasScrolled) {
        hasScrolled = true;
        hideArrow();
      }
    }, 100);
  }, { passive: true });
})();

// Smooth scroll for navigation links with fixed header offset
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year'); if (y) y.textContent = String(new Date().getFullYear());
  
  // Hero title animation
  const titleLine1 = document.querySelector('.title-line-1');
  const titleLine2 = document.querySelector('.title-line-2');
  
  if (titleLine1 && titleLine2) {
    // Trigger animation after a short delay
    setTimeout(() => {
      titleLine1.classList.add('is-visible');
      titleLine2.classList.add('is-visible');
    }, 300);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = 64; // Fixed header height from CSS
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});




