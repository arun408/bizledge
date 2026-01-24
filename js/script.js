document.addEventListener("DOMContentLoaded", () => {

    /* --- 1. Reusable functions (Hoisting safe) --- */
    const setupButtonHover = (selector) => {
        const btns = document.querySelectorAll(selector);
        btns.forEach((btn) => {
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
    };

    const setupRotatingText = (btnSelector, textSelector) => {
        const btn = document.querySelector(btnSelector);
        const textEl = document.querySelector(textSelector);
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
    };

    /* --- 2. Button Animations Initialization --- */
    setupButtonHover('.sign-btn, .invoice-btn, .growth-section-btn, .pricing-section-btn, .location-btn');
    setupRotatingText('.hero-btn', '.rotate-text');
    setupRotatingText('.cta-btn', '.spin-text');
    setupRotatingText('.integrate-btn', '.integrate-btn .rotate-text');

    /* --- 3. Hero Section (Zoom & Tilt) --- */
    const hero = document.querySelector(".hero-section");
    if (hero) setTimeout(() => hero.classList.add("zoom-in"), 100);

    const tiltImage = document.querySelector('.hero-tilt');
    const container = document.querySelector('.hero-bottom-image');
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

    const heroElements = [".hero-title", ".hero-subtitle", ".hero-btn", ".hero-bottom-image"]
        .map(selector => document.querySelector(selector))
        .filter(el => el !== null);

    heroElements.forEach(el => el.classList.add("animate-up"));
    setTimeout(() => {
        heroElements.forEach(el => el.classList.add("active"));
    }, 400);

    /* --- 4. Intersection Observers (Scroll Effects) --- */
    const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    const sections = ['#discover', '#invoice-section', '#growth-section', '#care-section', '#pricing-section', '.testimonial-fluid-section'];
    sections.forEach(id => {
        const el = document.querySelector(id);
        if (el) scrollObserver.observe(el);
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el, index) => {
        el.style.transitionDelay = (index * 0.15) + "s";
        scrollObserver.observe(el);
    });

    /* --- 5. Specific Animations (Marquee, Care-list, Blog) --- */
    const marquee = document.getElementById('marquee');
    if (marquee) {
        marquee.innerHTML += marquee.innerHTML;
        marquee.style.animation = 'none';
        marquee.offsetHeight;
        marquee.style.animation = null;
    }

    const list = document.querySelector(".care-list");
    if (list) {
        list.innerHTML += list.innerHTML;
        const items = list.children;
        let y = 0;
        const speed = 0.35;
        function animate() {
            y -= speed;
            if (Math.abs(y) >= (items[0].offsetHeight * (items.length / 2))) {
                y = 0;
            }
            list.style.transform = `translateY(${y}px)`;
            requestAnimationFrame(animate);
        }
        animate();
    }

    const blogSection = document.querySelector("#blog-section");
    if (blogSection) {
        const blogObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const title = document.querySelector(".blog-section-title");
                    const subTitle = document.querySelector(".blog-section-sub-title");
                    const cards = document.querySelectorAll("#blog-section .col");

                    setTimeout(() => title?.classList.add("reveal-active"), 100);
                    setTimeout(() => subTitle?.classList.add("reveal-active"), 300);
                    cards.forEach((card, index) => {
                        setTimeout(() => card.classList.add("reveal-active"), 500 + index * 200);
                    });
                }
            });
        }, { threshold: 0.2 });
        blogObserver.observe(blogSection);
    }

    /* --- 6. Stacking Cards Scroll Effect --- */
    const track = document.getElementById('trigger');
    const moveAmount = 350 + 24; 

    window.addEventListener('scroll', () => {
        if (window.innerWidth >= 992 && track) {
            const trackRect = track.getBoundingClientRect();
            const trackHeight = trackRect.height - window.innerHeight;
            let progress = -trackRect.top / trackHeight;
            progress = Math.min(Math.max(progress, 0), 1);

            const xTranslate = progress * moveAmount;
            requestAnimationFrame(() => {
                document.querySelectorAll('.card-2, .card-3, .card-4').forEach(card => {
                    card.style.transform = `translateX(-${xTranslate}px)`;
                });
            });
        }
    });

    /* --- 7. Newsletter Form Handling --- */
    const newsletterForm = document.getElementById("newsletter-form");
    const statusMessage = document.getElementById("form-status");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const data = new FormData(event.target);
            const button = event.target.querySelector(".subscribe-btn");
            button.disabled = true;
            button.innerHTML = "Sending...";

            try {
                const response = await fetch(event.target.action, {
                    method: newsletterForm.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    statusMessage.innerHTML = "Thanks for subscribing!";
                    statusMessage.style.color = "#28a745";
                    newsletterForm.reset();
                    button.innerHTML = "Subscribed!";
                } else {
                    throw new Error("Form submission failed");
                }
            } catch (error) {
                statusMessage.innerHTML = "Oops! Problem submitting form.";
                statusMessage.style.color = "#dc3545";
                button.disabled = false;
                button.innerHTML = "Subscribe &rarr;";
            }
        });
    }

    /* --- 8. Statistic Counter & Section Reveal --- */
    const statisticSection = document.querySelector('#statistic-section');
    if (statisticSection) {
        // Counter Logic
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.counter');
                    counters.forEach(counter => {
                        counter.innerText = '0';
                        const updateCounter = () => {
                            const target = +counter.getAttribute('data-target');
                            const count = +counter.innerText;
                            const increment = target / 150; 
                            if (count < target) {
                                const nextCount = count + increment;
                                counter.innerText = nextCount >= target ? target : Math.ceil(nextCount);
                                setTimeout(updateCounter, 80); 
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCounter();
                    });
                }
            });
        }, { threshold: 0.5 });
        counterObserver.observe(statisticSection);

        // Statistic Visual Reveal
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const statWrap = document.querySelector(".statistic-widget-wrap");
                const title = document.querySelector(".statistic-section-title");
                const cards = document.querySelectorAll(".value-card");

                if (entry.isIntersecting) {
                    statWrap?.classList.add("reveal-active");
                    title?.classList.add("reveal-active");
                    cards.forEach((card, index) => {
                        setTimeout(() => card.classList.add("reveal-active"), index * 200);
                    });
                } else {
                    statWrap?.classList.remove("reveal-active");
                    title?.classList.remove("reveal-active");
                    cards.forEach(card => card.classList.remove("reveal-active"));
                }
            });
        }, { threshold: 0.3 });
        statObserver.observe(statisticSection);
    } 

    /* --- 9. Sticky Timeline Trigger --- */
    const steps = document.querySelectorAll(".innovation-step");
    const numDisplay = document.getElementById("current-num");
    const yearDisplay = document.getElementById("current-year");

    if (steps.length > 0) {
        const innovationObserverOptions = {
            root: null,
            rootMargin: "-70px 0px -80% 0px", 
            threshold: 0
        };

        const innovationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const newNum = entry.target.getAttribute("data-num");
                    const newYear = entry.target.getAttribute("data-year");

                    if (numDisplay) numDisplay.textContent = newNum;
                    if (yearDisplay) yearDisplay.textContent = newYear;
                }
            });
        }, innovationObserverOptions);

        steps.forEach((step) => innovationObserver.observe(step));
    }

    /* --- 10. Innovation Section Reveal (Title & Sub-title Only) --- */
    const innovSection = document.querySelector("#innovation-section");
    
    if (innovSection) {
        const innovRevealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const title = innovSection.querySelector(".innovation-section-title");
                const subTitle = innovSection.querySelector(".innovation-section-sub-title");
                const targetElements = [title, subTitle];

                if (entry.isIntersecting) {
                    targetElements.forEach((el, index) => {
                        if (el) {
                            setTimeout(() => {
                                el.classList.add("reveal-active");
                                el.style.opacity = "1";
                                el.style.transform = "translateY(0)";
                            }, index * 200);
                        }
                    });
                } else {
                    targetElements.forEach((el) => {
                        if (el) {
                            el.classList.remove("reveal-active");
                            el.style.opacity = "0";
                            el.style.transform = "translateY(40px)";
                        }
                    });
                }
            });
        }, { threshold: 0.1 });

        innovRevealObserver.observe(innovSection);
    }


    const msgSection = document.querySelector("#message-section");

        if(msgSection) {
            const msgObserver = new IntersectionObserver((entries) =>{
                entries.forEach((entry) =>{
                    const img = msgSection.querySelector(".founder-img");
                    const content = msgSection.querySelector(".message-description");
                    const sign = msgSection.querySelector(".sign-img");
                    const subContent = msgSection.querySelector(".designation");
                    const targetElements = [img, content, sign, subContent];

                    if (entry.isIntersecting) {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                setTimeout(() =>{
                                    el.classList.add("reveal-active");
                                    el.style.opacity = "1";
                                    el.style.transform = "translateY(0)";
                                }, index*200);
                            }
                        });
                    } else {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                el.classList.remove("reveal-active");
                                el.style.opacity = "0";
                                el.style.transform = "translateY(40px)";
                            }
                        });
                    }
                });
            }, {threshold:0.1});
            msgObserver.observe(msgSection);
        }



// Stacked card scroll effect
    const cards = document.querySelectorAll('.js-card');
    cards.forEach((card, index) => {
        card.style.zIndex = index + 1;
        card.style.top = `${60 + (index * 20)}px`;
    });

    window.addEventListener('scroll', () => {
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const innerCard = card.querySelector('.team-card');
            
            const stickyPoint = 60 + (index * 20);

            if (rect.top <= stickyPoint) {
                const nextCard = cards[index + 1];
                if (nextCard) {
                    const nextRect = nextCard.getBoundingClientRect();
                    const progress = Math.max(0, Math.min(1, (window.innerHeight - nextRect.top) / 500));
                    const baseRotate = (index === 1) ? -5 : 0;
                    const scale = 1 - (progress * 0.05);
                    innerCard.style.transform = `scale(${scale}) rotate(${baseRotate}deg)`;
                    innerCard.style.filter = `brightness(${1 - (progress * 0.1)})`;
                }
            } else {
                const baseRotate = (index === 1) ? -5 : 0;
                innerCard.style.transform = `scale(1) rotate(${baseRotate}deg)`;
                innerCard.style.filter = `brightness(1)`;
            }
        });
    });


// Team Section
    const teamSection = document.querySelector("#team-section");

        if(teamSection) {
            const teamObserver = new IntersectionObserver((entries) =>{
                entries.forEach((entry) =>{
                    const title = teamSection.querySelector(".team-section-title");
                    const stack = teamSection.querySelector(".stack-container");
                    const targetElements = [title, stack];

                    if (entry.isIntersecting) {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                setTimeout(() =>{
                                    el.classList.add("reveal-active");
                                    el.style.opacity = "1";
                                    el.style.transform = "translateY(0)";
                                }, index*200);
                            }
                        });
                    } else {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                el.classList.remove("reveal-active");
                                el.style.opacity = "0";
                                el.style.transform = "translateY(40px)";
                            }
                        });
                    }
                });
            }, {threshold:0.1});
            teamObserver.observe(teamSection);
        }


// Compare Section
    const compareSection = document.querySelector("#compare-section");

        if(compareSection) {
            const compareObserver = new IntersectionObserver((entries) =>{
                entries.forEach((entry) =>{
                    const title = compareSection.querySelector(".compare-section-title");
                    const subTitle = compareSection.querySelector(".compare-section-sub-title");
                    const table = compareSection.querySelector(".table-wrapper");
                    const targetElements = [title, subTitle, table];

                    if (entry.isIntersecting) {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                setTimeout(() =>{
                                    el.classList.add("reveal-active");
                                    el.style.opacity = "1";
                                    el.style.transform = "translateY(0)";
                                }, index*200);
                            }
                        });
                    } else {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                el.classList.remove("reveal-active");
                                el.style.opacity = "0";
                                el.style.transform = "translateY(40px)";
                            }
                        });
                    }
                });
            }, {threshold:0.1});
            compareObserver.observe(compareSection);
        }



// Location Section
    const locateSection = document.querySelector("#location-section");

if (locateSection) {
    const locateObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const title = locateSection.querySelector(".location-section-title");
                const subTitle = locateSection.querySelector(".location-section-sub-title");
                const locateBtn = locateSection.querySelector(".location-btn");
                const locateImg = locateSection.querySelector(".location-image-wrapper");
                const locateCards = locateSection.querySelectorAll(".location-card");
                const targetElements = [title, subTitle, locateBtn];
                locateCards.forEach(card => targetElements.push(card));
                targetElements.push(locateImg);
                targetElements.forEach((el, index) => {
                    if (el) {
                        setTimeout(() => {
                            el.classList.add("reveal-active");
                        }, index * 150);
                    }
                });
            } else {
                const allElements = locateSection.querySelectorAll(
                    ".location-section-title, .location-section-sub-title, .location-btn, .location-card, .location-image-wrapper"
                );
                allElements.forEach(el => el.classList.remove("reveal-active"));
            }
        });
    }, { threshold: 0.1 });

    locateObserver.observe(locateSection);
 }


// Faq Section
    const faqSection = document.querySelector("#faq-section");

        if(faqSection) {
            const faqObserver = new IntersectionObserver((entries) =>{
                entries.forEach((entry) =>{
                    const title = faqSection.querySelector(".faq-title");
                    const subTitle = faqSection.querySelector(".faq-sub-title");
                    const accordion = faqSection.querySelector(".accordion");
                    const targetElements = [title, subTitle, accordion];

                    if (entry.isIntersecting) {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                setTimeout(() =>{
                                    el.classList.add("reveal-active");
                                    el.style.opacity = "1";
                                    el.style.transform = "translateY(0)";
                                }, index*200);
                            }
                        });
                    } else {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                el.classList.remove("reveal-active");
                                el.style.opacity = "0";
                                el.style.transform = "translateY(40px)";
                            }
                        });
                    }
                });
            }, {threshold:0.1});
            faqObserver.observe(faqSection);
       }


// Feature Compare Section
    const featureComparesection = document.querySelector("#feature-compare-section");

        if(featureComparesection) {
            const featureCompareObserver = new IntersectionObserver((entries) =>{
                entries.forEach((entry) =>{
                    const title = featureComparesection.querySelector(".feature-compare-section-title");
                    const compareTable = featureComparesection.querySelector(".compare-table-wrapper");
                    const targetElements = [title, compareTable];

                    if (entry.isIntersecting) {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                setTimeout(() =>{
                                    el.classList.add("reveal-active");
                                    el.style.opacity = "1";
                                    el.style.transform = "translateY(0)";
                                }, index*200);
                            }
                        });
                    } else {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                el.classList.remove("reveal-active");
                                el.style.opacity = "0";
                                el.style.transform = "translateY(40px)";
                            }
                        });
                    }
                });
            }, {threshold:0.1});
            featureCompareObserver.observe(featureComparesection);
       }



// Automation Section
    const automateSection = document.querySelector("#automation-section");

if (automateSection) {
    const automateObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const title = automateSection.querySelector(".automation-section-title");
                const subTitle = automateSection.querySelector(".automation-section-sub-title");
                const automateCards = automateSection.querySelectorAll(".automation-card");
                const targetElements = [title, subTitle, automateCards];
                automateCards.forEach(card => targetElements.push(card));
                targetElements.forEach((el, index) => {
                    if (el) {
                        setTimeout(() => {
                            el.classList.add("reveal-active");
                        }, index * 150);
                    }
                });
            } else {
                const allElements = automateSection.querySelectorAll(
                    ".automation-section-title, .automation-section-sub-title, .automation-card"
                );
                allElements.forEach(el => el.classList.remove("reveal-active"));
            }
        });
    }, { threshold: 0.1 });

    automateObserver.observe(automateSection);
 }


// Step Section
    const stepSection = document.querySelector("#step-section");

if (stepSection) {
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const title = stepSection.querySelector(".step-section-title");
                const subTitle = stepSection.querySelector(".step-section-sub-title");
                const stepCards = stepSection.querySelectorAll(".step-card");
                const targetElements = [title, subTitle, stepCards];
                stepCards.forEach(card => targetElements.push(card));
                targetElements.forEach((el, index) => {
                    if (el) {
                        setTimeout(() => {
                            el.classList.add("reveal-active");
                        }, index * 150);
                    }
                });
            } else {
                const allElements = stepSection.querySelectorAll(
                    ".step-section-title, .step-section-sub-title, .step-card"
                );
                allElements.forEach(el => el.classList.remove("reveal-active"));
            }
        });
    }, { threshold: 0.1 });

    stepObserver.observe(stepSection);
 }


 //Sub-Step Section
const stepSectionOptions = {
    root: null,
    rootMargin: '0px', 
    threshold: 0.1 
};

const stepRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('sub-step-section-title')) {
                setTimeout(() => entry.target.classList.add("reveal-active"), 100);
            } 
            else if (entry.target.classList.contains('sub-step-section-sub-title')) {
                setTimeout(() => entry.target.classList.add("reveal-active"), 300);
            } 
            else if (entry.target.classList.contains('step-widget-wrap')) {
                setTimeout(() => entry.target.classList.add("reveal-active"), 500);
            }
        } else {
            if (entry.boundingClientRect.top > 0) { 
                entry.target.classList.remove("reveal-active");
            }
        }
    });
}, stepSectionOptions);

document.querySelectorAll('.sub-step-section-title, .sub-step-section-sub-title, .step-widget-wrap')
    .forEach(el => stepRevealObserver.observe(el));


// Integrate section marquee effect
const marqueeTrack = document.getElementById('marquee-track-img');

function setupMarquee() {
    const content = marqueeTrack.querySelector('.marquee-content-img');
    for (let i = 0; i < 3; i++) {
        const clone = content.cloneNode(true);
        marqueeTrack.appendChild(clone);
    }

    marqueeTrack.style.animation = "marquee-scroll 12s linear infinite";
}
window.addEventListener('load', setupMarquee);



// SVG Stroke Dash Offset Animation
function initPerfectComet() {
    const container = document.querySelector('.integrate-outer-box');
    const path = document.getElementById('master-path');
    
    if (!container || !path) return;

    const w = container.offsetWidth;
    const h = container.offsetHeight;
    const r = h / 2; 

    const d = `M ${r},1 L ${w - r},1 A ${r - 1},${r - 1} 0 0 1 ${w - r},${h - 1} L ${r},${h - 1} A ${r - 1},${r - 1} 0 0 1 ${r},1 Z`;
    path.setAttribute('d', d);
    const totalLength = path.getTotalLength();
    const topStraightLength = w - (2 * r);
    const topCenterPos = topStraightLength / 2;
    const dashLength = 220; 
    const half = totalLength / 2;
    const gap = half - dashLength;
    path.style.strokeDasharray = `${dashLength} ${gap} ${dashLength} ${gap}`;
    const slowPoint = topCenterPos; 
    const startPoint = slowPoint + (totalLength / 4);
    const endPoint = slowPoint - (totalLength / 4);

    path.animate([
        { strokeDashoffset: startPoint },
        { strokeDashoffset: endPoint }
    ], {
        duration: 5000, 
        iterations: Infinity,
        easing: 'cubic-bezier(0.95, 0.05, 0.05, 0.95)' 
    });
}

window.addEventListener('load', initPerfectComet);
window.addEventListener('resize', initPerfectComet);


// Integrate Section
    const integrateSection = document.querySelector("#integrate-section");

        if(integrateSection) {
            const integrateObserver = new IntersectionObserver((entries) =>{
                entries.forEach((entry) =>{
                    const title = integrateSection.querySelector(".integrate-section-title");
                    const subTitle = integrateSection.querySelector(".integrate-section-sub-title");
                    const integrateBox = integrateSection.querySelector(".integrate-outer-box");
                    const integrateBtn = integrateSection.querySelector(".integrate-btn");
                    const targetElements = [title, subTitle, integrateBox, integrateBtn];

                    if (entry.isIntersecting) {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                setTimeout(() =>{
                                    el.classList.add("reveal-active");
                                    el.style.opacity = "1";
                                    el.style.transform = "translateY(0)";
                                }, index*200);
                            }
                        });
                    } else {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                el.classList.remove("reveal-active");
                                el.style.opacity = "0";
                                el.style.transform = "translateY(40px)";
                            }
                        });
                    }
                });
            }, {threshold:0.2});
            integrateObserver.observe(integrateSection);
       }



// Integration Section
    const integrationSection = document.querySelector("#integration-section");

        if(integrationSection) {
            const integrationObserver = new IntersectionObserver((entries) =>{
                entries.forEach((entry) =>{
                    const title = integrationSection.querySelector(".integration-section-title");
                    const integrationRow = integrationSection.querySelector(".integration-row");
                    const targetElements = [title, integrationRow];

                    if (entry.isIntersecting) {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                setTimeout(() =>{
                                    el.classList.add("reveal-active");
                                    el.style.opacity = "1";
                                    el.style.transform = "translateY(0)";
                                }, index*200);
                            }
                        });
                    } else {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                el.classList.remove("reveal-active");
                                el.style.opacity = "0";
                                el.style.transform = "translateY(40px)";
                            }
                        });
                    }
                });
            }, {threshold:0.2});
            integrationObserver.observe(integrationSection);
       }


// Blog Detail Section
const blogdetailSection = document.querySelector(".blog-detail-section-row");

if (blogdetailSection) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-active");
                } else {
                    entry.target.classList.remove("reveal-active");
                }
            });
        },
        {
            threshold: 0.25
        }
    );

    observer.observe(blogdetailSection);
}


// Pricing Single
const monthlyBtn = document.getElementById('monthlyBtn');
const yearlyBtn = document.getElementById('yearlyBtn');
const planPrice = document.getElementById('planPrice');
const modalPrice = document.getElementById('modalPrice');
const modalDuration = document.getElementById('modalDuration');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutMsg = document.getElementById('checkoutMsg');
const revealElements1 = document.querySelectorAll('.pricing-detail-section-title, .pricing-detail-section-row');
const myModal = document.getElementById('staticBackdrop');

// --- ZAROORI FIX: Modal ko Transform Container se bahar nikalna ---
if (myModal) {
    document.body.appendChild(myModal); 
}

// 2. PRICING TOGGLE LOGIC
if (monthlyBtn && yearlyBtn) {
    monthlyBtn.onclick = function() {
        monthlyBtn.className = "monthly-pill active";
        yearlyBtn.className = "yearly-pill inactive";
        planPrice.innerText = "$ 99.00 USD";
        if(modalPrice) modalPrice.innerText = "$ 99.00 USD";
        if(modalDuration) modalDuration.innerText = "Plan: Monthly";
    };

    yearlyBtn.onclick = function() {
        yearlyBtn.className = "yearly-pill active";
        monthlyBtn.className = "monthly-pill inactive";
        planPrice.innerText = "$ 950.00 USD";
        if(modalPrice) modalPrice.innerText = "$ 950.00 USD";
        if(modalDuration) modalDuration.innerText = "Plan: Yearly";
    };
}

// 3. CHECKOUT MESSAGE LOGIC
if (checkoutBtn) {
    checkoutBtn.onclick = function() {
        if (checkoutMsg) {
            checkoutMsg.classList.remove('d-none');
            checkoutMsg.style.display = "block";
        }
    };
}

// 4. SCROLL REVEAL LOGIC (Intersection Observer)
const observerOptions1 = { threshold: 0.15 };

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
        } else {
            entry.target.classList.remove('reveal-active');
        }
    });
}, observerOptions1);

revealElements1.forEach(el => revealObserver.observe(el));


// Integration Single Section
const integrationsingleSection = document.querySelector(".integration-single-section-row");

  if (integrationsingleSection) {
      const observer = new IntersectionObserver(
          (entries) => {
              entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                      entry.target.classList.add("reveal-active");
                  } else {
                      entry.target.classList.remove("reveal-active");
                  }
              });
          },
          {
              threshold: 0.25
          }
      );

      observer.observe(integrationsingleSection);
  }



// Integration sub Section
    const integrationsinglesubSection = document.querySelector("#integration-single-sub-section");

        if(integrationsinglesubSection) {
            const integrationsinglesubObserver = new IntersectionObserver((entries) =>{
                entries.forEach((entry) =>{
                    const title = integrationsinglesubSection.querySelector(".integration-single-sub-section-title");
                    const integrationRow = integrationsinglesubSection.querySelector(".integration-single-sub-section-row");
                    const targetElements = [title, integrationRow];

                    if (entry.isIntersecting) {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                setTimeout(() =>{
                                    el.classList.add("reveal-active");
                                    el.style.opacity = "1";
                                    el.style.transform = "translateY(0)";
                                }, index*200);
                            }
                        });
                    } else {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                el.classList.remove("reveal-active");
                                el.style.opacity = "0";
                                el.style.transform = "translateY(40px)";
                            }
                        });
                    }
                });
            }, {threshold:0.2});
            integrationsinglesubObserver.observe(integrationsinglesubSection);
       }


// Early Request Access Form
const myForm = document.getElementById("earlyAccessForm");
const myStatus = document.getElementById("formStatus");
const myBtn = document.getElementById("mainSubmitBtn");

if (myForm) {
    myForm.addEventListener("submit", function(e) {
        e.preventDefault(); 
        if(myBtn) {
            myBtn.innerHTML = "Sending...";
            myBtn.disabled = true;
        }

        const data = new FormData(myForm);
        
        fetch(myForm.action, {
            method: myForm.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                myStatus.innerHTML = "Thanks! You're on the list. 🚀";
                myStatus.className = "mt-3 text-center text-success d-block";
                myForm.reset();
            } else {
                myStatus.innerHTML = "Oops! Something went wrong.";
                myStatus.className = "mt-3 text-center text-danger d-block";
            }
        })
        .catch(error => {
            myStatus.innerHTML = "Connection error.";
            myStatus.className = "mt-3 text-center text-danger d-block";
        })
        .finally(() => {
            if(myBtn) {
                myBtn.innerHTML = "Request early access";
                myBtn.disabled = false;
            }
        });
    });
}


// Integration sub Section
    const earlyaccessSection = document.querySelector("#early-access-section");

        if(earlyaccessSection) {
            const earlyaccessObserver = new IntersectionObserver((entries) =>{
                entries.forEach((entry) =>{
                    const title = earlyaccessSection.querySelector(".early-access-section-title");
                    const subTitle = earlyaccessSection.querySelector(".early-access-section-sub-title");
                    const emailBox = earlyaccessSection.querySelector(".email-box");
                    const targetElements = [title, subTitle, emailBox];

                    if (entry.isIntersecting) {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                setTimeout(() =>{
                                    el.classList.add("reveal-active");
                                    el.style.opacity = "1";
                                    el.style.transform = "translateY(0)";
                                }, index*200);
                            }
                        });
                    } else {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                el.classList.remove("reveal-active");
                                el.style.opacity = "0";
                                el.style.transform = "translateY(40px)";
                            }
                        });
                    }
                });
            }, {threshold:0.2});
            earlyaccessObserver.observe(earlyaccessSection);
       }


// Contact form
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contactStatus");
const contactBtn = document.getElementById("contactSubmitBtn");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        if(contactBtn) {
            contactBtn.innerHTML = "Sending...";
            contactBtn.disabled = true;
        }

        const data = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                contactStatus.innerHTML = "Message sent successfully! 📩";
                contactStatus.className = "mt-2 text-center text-success d-block";
                contactForm.reset();
            } else {
                contactStatus.innerHTML = "Error sending message.";
                contactStatus.className = "mt-2 text-center text-danger d-block";
            }
        })
        .catch(() => {
            contactStatus.innerHTML = "Connection error.";
            contactStatus.className = "mt-2 text-center text-danger d-block";
        })
        .finally(() => {
            if(contactBtn) {
                contactBtn.innerHTML = "Send Message";
                contactBtn.disabled = false;
            }
        });
    });
}

// Contact form page
    const contactformSection = document.querySelector("#contact-section");

        if(contactformSection) {
            const contactformObserver = new IntersectionObserver((entries) =>{
                entries.forEach((entry) =>{
                    const title = contactformSection.querySelector(".contact-section-title");
                    const contactBtn = contactformSection.querySelector(".contact-btn");
                    const contactsectionRow = contactformSection.querySelector(".contact-section-row");
                    const contactformRow = contactformSection.querySelector(".contact-form-row");
                    const targetElements = [title, contactBtn, contactsectionRow, contactformRow];

                    if (entry.isIntersecting) {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                setTimeout(() =>{
                                    el.classList.add("reveal-active");
                                    el.style.opacity = "1";
                                    el.style.transform = "translateY(0)";
                                }, index*200);
                            }
                        });
                    } else {
                        targetElements.forEach((el, index) =>{
                            if(el) {
                                el.classList.remove("reveal-active");
                                el.style.opacity = "0";
                                el.style.transform = "translateY(40px)";
                            }
                        });
                    }
                });
            }, {threshold:0.2});
            contactformObserver.observe(contactformSection);
       }
       
}); // DOMContentLoaded ends