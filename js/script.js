const btn = document.querySelector('.sign-btn');

  btn.addEventListener('mouseenter', () => {
    btn.classList.remove('is-leaving', 'reset');
    btn.classList.add('is-hovered');
  });

  btn.addEventListener('mouseleave', () => {
    btn.classList.remove('is-hovered');
    btn.classList.add('is-leaving');
  });

  btn.addEventListener('transitionend', (e) => {
    if (btn.classList.contains('is-leaving')) {
      btn.classList.remove('is-leaving');
      btn.classList.add('reset');

      // force reflow so reset applies instantly
      btn.offsetHeight;

      btn.classList.remove('reset');
    }
  });

  
/* hero section */
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero-section");
    const btn = document.querySelector(".hero-btn");
    const textEl = document.querySelector(".rotate-text");
    const tiltImage = document.querySelector('.hero-tilt');
    const container = document.querySelector('.hero-bottom-image');

    // ---------- Hero Zoom ----------
    if (hero) {
        setTimeout(() => hero.classList.add("zoom-in"), 100);
    }

    // ---------- Button Rotate ----------
    if (btn && textEl) {
        const text = textEl.innerText;
        textEl.innerHTML = text
            .split("")
            .map(char => char === " " ? "&nbsp;" : `<span>${char}</span>`)
            .join("");

        btn.addEventListener("mouseenter", () => {
            btn.classList.remove("rotate");
            void btn.offsetWidth;
            btn.classList.add("rotate");
        });
    }

    // ---------- Bottom Image Tilt ----------
    if (tiltImage && container) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * 10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            tiltImage.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        });

        container.addEventListener('mouseleave', () => {
            tiltImage.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    }

    // ---------- Hero Content Slide Up (all at once) ----------
    const heroElements = [
        document.querySelector(".hero-title"),
        document.querySelector(".hero-subtitle"),
        document.querySelector(".hero-btn"),
        document.querySelector(".hero-bottom-image")
    ];

    heroElements.forEach(el => {
        if (el) {
            el.classList.add("animate-up");
        }
    });

    // Trigger animation for all elements together
    setTimeout(() => {
        heroElements.forEach(el => {
            if (el) el.classList.add("active");
        });
    }, 400); // small delay before starting
});


/* Feature section */
document.addEventListener("DOMContentLoaded", function() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach((el, index) => {
        el.style.transitionDelay = (index * 0.15) + "s"; 
        observer.observe(el);
    });

    const marquee = document.getElementById('marquee');
    if (marquee) {
        const content = marquee.innerHTML;
        marquee.innerHTML += content;
        marquee.style.animation = 'none';
        marquee.offsetHeight;
        marquee.style.animation = null; 
    }
});

/* Discover section */

document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector('#discover');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', 
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }, observerOptions);

    if(section) {
        observer.observe(section);
    }
});


/* Invoice button */
const buttons = document.querySelectorAll('.invoice-btn');

buttons.forEach((btn) => {
  btn.addEventListener('mouseenter', () => {
    btn.classList.remove('is-leaving', 'reset');
    btn.classList.add('is-hovered');
  });

  btn.addEventListener('mouseleave', () => {
    btn.classList.remove('is-hovered');
    btn.classList.add('is-leaving');
  });

  btn.addEventListener('transitionend', () => {
    if (btn.classList.contains('is-leaving')) {
      btn.classList.remove('is-leaving');
      btn.classList.add('reset');

      // force reflow so reset applies instantly
      btn.offsetHeight;

      btn.classList.remove('reset');
    }
  });
});


/* Invoice section */
document.addEventListener("DOMContentLoaded", function (){
    const section = document.querySelector('#invoice-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);
    if(section) {
        observer.observe(section);
    }
});


/* Growth Section button */
const growthBtn = document.querySelector('.growth-section-btn');

  growthBtn.addEventListener('mouseenter', () => {
    growthBtn.classList.remove('is-leaving', 'reset');
    growthBtn.classList.add('is-hovered');
  });

  growthBtn.addEventListener('mouseleave', () => {
    growthBtn.classList.remove('is-hovered');
    growthBtn.classList.add('is-leaving');
  });

  growthBtn.addEventListener('transitionend', (e) => {
    if (growthBtn.classList.contains('is-leaving')) {
      growthBtn.classList.remove('is-leaving');
      growthBtn.classList.add('reset');
      growthBtn.offsetHeight;
      growthBtn.classList.remove('reset');
    }
  });


/* Growth Section */
document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector('#growth-section');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.2 });

    observer.observe(section);
});


/* care list effect */
document.addEventListener("DOMContentLoaded", function () {
    const list = document.querySelector(".care-list");
    list.innerHTML += list.innerHTML;
    const items = list.children;
    const itemHeight = items[0].offsetHeight;
    const totalItems = items.length/2;

    let y = 0;
    const speed = 0.35;
    function animate () {
        y -= speed;
        if (Math.abs(y) >= itemHeight * totalItems) {
            y = 0;
        }
        list.style.transform = `translateY(${y}px)`;
        requestAnimationFrame(animate);
    }
    animate();
});


/* Care Section */
document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector('#care-section');
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.2 });

    observer.observe(section);
});


/* Pricing-section buttons */
const pricingBtn = document.querySelectorAll('.pricing-section-btn');
pricingBtn.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
        btn.classList.remove('is-leaving', 'reset');
        btn.classList.add('is-hovered');
    });

    btn.addEventListener('mouseleave', () => {
        btn.classList.remove('is-hovered');
        btn.classList.add('is-leaving');
    });

    btn.addEventListener('transitionend', () => {
        if (btn.classList.contains('is-leaving')) {
            btn.classList.remove('is-leaving');
            btn.classList.add('reset');
            btn.offsetHeight;
            btn.classList.remove('reset');
        }
    });
});


/* Pricing Section */
document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector('#pricing-section');
    if (!section) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {threshold: 0.2});
    observer.observe(section);
});


/* Stacking card effect */
const track = document.getElementById('trigger');
    const cardWidth = 350;
    const gap = 24;
    const moveAmount = cardWidth + gap;

    window.addEventListener('scroll', () => {
        if (window.innerWidth >= 992) {
            const trackRect = track.getBoundingClientRect();
            const trackTop = trackRect.top;
            const trackHeight = trackRect.height - window.innerHeight;

            let progress = -trackTop / trackHeight;
            progress = Math.min(Math.max(progress, 0), 1);

            const xTranslate = progress * moveAmount;
            
            requestAnimationFrame(() => {
                const targets = document.querySelectorAll('.card-2, .card-3, .card-4');
                targets.forEach(card => {
                    card.style.transform = `translateX(-${xTranslate}px)`;
                });
            });
        } else {
            const allCards = document.querySelectorAll('.custom-card');
            allCards.forEach(card => card.style.transform = `none`);
        }
});


/* testimonial Section */
document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector('.testimonial-fluid-section');
    if (!section) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {threshold: 0.2});
    observer.observe(section);
});



/* Blog Section */
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#blog-section");
  const title = document.querySelector(".blog-section-title");
  const subTitle = document.querySelector(".blog-section-sub-title");
  const cards = document.querySelectorAll("#blog-section .col");

  const observerOptions = {
    root: null,
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => title.classList.add("reveal-active"), 100);
        setTimeout(() => subTitle.classList.add("reveal-active"), 300);

        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("reveal-active");
          }, 500 + index * 200);
        });
      } else {
        title.classList.remove("reveal-active");
        subTitle.classList.remove("reveal-active");
        cards.forEach((card) => card.classList.remove("reveal-active"));
      }
    });
  }, observerOptions);

  observer.observe(section);
});



/* CTA Section */
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".cta-btn");
    const textEl = document.querySelector(".spin-text");
    const img = document.querySelector(".cta-img-section");
    img.style.animation = "none";
    img.offsetHeight;
    img.style.animation = null;

    if (btn && textEl) {
        const text = textEl.innerText;
        textEl.innerHTML = text
            .split("")
            .map(char => char === " " ? "&nbsp;" : `<span>${char}</span>`)
            .join("");

        btn.addEventListener("mouseenter", () => {
            btn.classList.remove("rotate");
            void btn.offsetWidth;
            btn.classList.add("rotate");
        });
    }
});


// Newsletter Validation
const newsletterForm = document.getElementById("newsletter-form");
const statusMessage = document.getElementById("form-status");

const handleSubmit = async (event) => {
  event.preventDefault(); 
  
  const data = new FormData(event.target);
  const button = event.target.querySelector(".subscribe-btn");
  button.disabled = true;
  button.innerHTML = "Sending...";

  try {
    const response = await fetch(event.target.action, {
      method: newsletterForm.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      statusMessage.innerHTML = "Thanks for subscribing! Check your inbox.";
      statusMessage.style.color = "#28a745"; 
      newsletterForm.reset(); 
      button.innerHTML = "Subscribed!";
    } else {
      const errorData = await response.json();
      if (Object.hasOwn(errorData, 'errors')) {
        statusMessage.innerHTML = errorData["errors"].map(err => err["message"]).join(", ");
      } else {
        statusMessage.innerHTML = "Oops! Problem submitting form.";
      }
      statusMessage.style.color = "#dc3545";
      button.disabled = false;
      button.innerHTML = "Subscribe &rarr;";
    }
  } catch (error) {
    statusMessage.innerHTML = "Oops! Network error. Try again.";
    statusMessage.style.color = "#dc3545";
    button.disabled = false;
    button.innerHTML = "Subscribe &rarr;";
  }
};
newsletterForm.addEventListener("submit", handleSubmit);