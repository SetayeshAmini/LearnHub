/**
 * LearnHub - About Page JavaScript
 * Contains all interactions, animations, and dynamic functionality
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL REVEAL ANIMATIONS

    const revealElements = document.querySelectorAll(
        '.mission-card, .process-card, .timeline-item, .cta-wrapper'
    );

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for scroll reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Trigger on load and scroll
    window.addEventListener('load', () => {
        setTimeout(revealOnScroll, 300);
    });

    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('resize', revealOnScroll);

    // 2. STATISTICS COUNTER ANIMATIO

    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const currentValue = parseInt(stat.textContent);

            if (currentValue < target) {
                const increment = Math.ceil(target / 60);
                const newValue = Math.min(currentValue + increment, target);
                stat.textContent = newValue;
            }
        });
    };

    // Counter animation with Intersection Observer
    let counterStarted = false;
    let counterInterval = null;

    const startCounter = () => {
        if (counterStarted) return;
        counterStarted = true;

        // Reset to 0
        statNumbers.forEach(stat => {
            stat.textContent = '0';
        });

        counterInterval = setInterval(() => {
            let allComplete = true;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const current = parseInt(stat.textContent);

                if (current < target) {
                    allComplete = false;
                    const increment = Math.max(1, Math.ceil(target / 50));
                    const newValue = Math.min(current + increment, target);
                    stat.textContent = newValue;
                }
            });

            if (allComplete) {
                clearInterval(counterInterval);
                counterInterval = null;
            }
        }, 30);
    };

    // Intersection Observer for counter
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterStarted) {
                startCounter();
            }
        });
    }, { threshold: 0.3 });

    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }

    // 3. FOUNDER SKILLS INTERACTIVE TOGGL

    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        tag.addEventListener('click', function () {
            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                this.style.backgroundColor = 'var(--primary-color)';
                this.style.color = '#ffffff';
                this.style.borderColor = 'var(--primary-color)';
            } else {
                this.style.backgroundColor = 'var(--bg-main)';
                this.style.color = 'var(--text-muted)';
                this.style.borderColor = 'var(--border-color)';
            }
        });
    });

    // 4. TIMELINE HOVER ENHANCEMEN

    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function () {
            timelineItems.forEach(other => {
                other.style.opacity = '0.5';
                other.style.transform = 'scale(0.98)';
            });
            this.style.opacity = '1';
            this.style.transform = 'scale(1.02)';
        });

        item.addEventListener('mouseleave', function () {
            timelineItems.forEach(other => {
                other.style.opacity = '1';
                other.style.transform = 'scale(1)';
            });
        });
    });
    

    // 5. SMOOTH SCROLL FOR INTERNAL LINK
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    const navbarHeight = document.querySelector('.custom-navbar')?.offsetHeight || 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 6. TEAM CAROUSEL - CONTINUOUS SMOOTH MOVEMEN

    // Team members data - 4 cards
    const teamMembers = [
        {
            id: 1,
            name: 'Alex Morgan',
            role: 'Co-founder — Vision, Product & Business',
            description: 'Fractional CTO, Lead PM, and business systems architect. Alex is the one who talks to partners, understands their needs, designs the solution, and makes sure everything comes together.',
            image: 'image/cli1.jpg',
            skills: ['Product Management', 'CTO', 'Consulting', 'Platform Architecture', 'Business Strategy']
        },
        {
            id: 2,
            name: 'James Chen',
            role: 'Co-founder — Engineering',
            description: 'Based in Singapore, James is the technical heart of LearnHub. He built the platform — every activity type, every integration, every line of code. Where others would say "that\'s not possible," James finds a way.',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            skills: ['Full Stack', 'Backend', 'Frontend', 'React', 'Python', 'Cloud Architecture']
        },
        {
            id: 3,
            name: 'Sarah Johnson',
            role: 'Lead Instructor — Curriculum Design',
            description: 'With over 10 years of teaching experience, Sarah designs all learning paths at LearnHub. She ensures every course is practical, project-based, and aligned with industry needs.',
            image: 'image/word7.jpg',
            skills: ['Curriculum Design', 'JavaScript', 'Python', 'Teaching', 'Mentorship']
        },
        {
            id: 4,
            name: 'Michael Torres',
            role: 'Technical Lead — Platform Development',
            description: 'Michael oversees the LearnHub platform architecture. He ensures our learning environment is fast, reliable, and provides the best experience for students worldwide.',
            image: 'image/tt6.jpg',
            skills: ['Cloud Architecture', 'DevOps', 'React', 'Node.js', 'Scalability']
        }
    ];

    // Get carousel elements
    const track = document.getElementById('teamCarouselTrack');
    const dotsContainer = document.getElementById('teamCarouselDots');

    let currentIndex = 0;
    let animationId = null;
    let isPaused = false;
    let position = 0;
    let slideWidth = 0;
    let gapWidth = 30;
    let totalWidth = 0;

    // CHANGED: Increased speed from 0.5 to 0.8 for noticeably faster rotation
    let speed = 0.8; // Smooth, continuous movement (pixels per frame at 60fps)

    // Track active card state
    let activeIndex = 0; // Start with card 0 active
    let previousPosition = 0;
    let accumulatedDistance = 0;
    let cardCycleComplete = false;

    // Function to create card HTML
    const createCardHTML = (member) => {
        return `
            <div class="team-carousel-slide" data-id="${member.id}">
                <div class="founder-card">
                    <div class="founder-image-wrapper">
                        <img src="${member.image}" alt="${member.name}" class="founder-image">
                        <div class="founder-social">
                            <a href="#"><i class="bi bi-github"></i></a>
                            <a href="#"><i class="bi bi-linkedin"></i></a>
                            <a href="#"><i class="bi bi-twitter"></i></a>
                        </div>
                    </div>
                    <div class="founder-content">
                        <h3>${member.name}</h3>
                        <span class="founder-role">${member.role}</span>
                        <p>${member.description}</p>
                        <div class="founder-skills">
                            ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    // Function to render carousel with duplicated cards for seamless loop
    const renderCarousel = () => {
        // Create extended array: [last, 0, 1, 2, 3, 0] for seamless loop
        const extendedMembers = [
            teamMembers[teamMembers.length - 1],
            ...teamMembers,
            teamMembers[0]
        ];

        let html = '';
        extendedMembers.forEach((member) => {
            html += createCardHTML(member);
        });

        track.innerHTML = html;

        // Calculate slide width after render
        updateDimensions();

        // Set initial position to show first card
        position = 0;
        previousPosition = 0;
        accumulatedDistance = 0;
        track.style.transform = `translateX(0px)`;

        // Create dots
        createDots();

        // Re-apply skill tag click handlers
        document.querySelectorAll('.team-carousel-slide .skill-tag').forEach(tag => {
            tag.addEventListener('click', function () {
                this.classList.toggle('active');
                if (this.classList.contains('active')) {
                    this.style.backgroundColor = 'var(--primary-color)';
                    this.style.color = '#ffffff';
                    this.style.borderColor = 'var(--primary-color)';
                } else {
                    this.style.backgroundColor = 'var(--bg-main)';
                    this.style.color = 'var(--text-muted)';
                    this.style.borderColor = 'var(--border-color)';
                }
            });
        });

        // Initialize active state - Card 1 is active
        updateActiveCard(0);
    };

    // Update dimensions based on current viewport
    const updateDimensions = () => {
        const slides = track.querySelectorAll('.team-carousel-slide');
        if (slides.length === 0) return;

        // Get the first slide width
        slideWidth = slides[0].offsetWidth;
        gapWidth = 30; // Gap from CSS

        // Total width of one slide + gap
        totalWidth = slideWidth + gapWidth;
    };

    // Create dots
    const createDots = () => {
        dotsContainer.innerHTML = '';
        teamMembers.forEach((member, index) => {
            const dot = document.createElement('button');
            dot.className = `team-carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.dataset.index = index;
            dot.addEventListener('click', () => {
                // Jump to the clicked slide
                const targetPosition = index * totalWidth;
                position = targetPosition;
                previousPosition = position;
                accumulatedDistance = 0;
                track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                track.style.transform = `translateX(-${position}px)`;
                setTimeout(() => {
                    track.style.transition = 'none';
                    activeIndex = index;
                    updateActiveCard(activeIndex);
                }, 800);
            });
            dotsContainer.appendChild(dot);
        });
    };

    // Update active state of dots
    const updateDots = (index) => {
        const dots = dotsContainer.querySelectorAll('.team-carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };

    // Function to update which card is active
    const updateActiveCard = (index) => {
        // Get all slides
        const slides = track.querySelectorAll('.team-carousel-slide');

        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');

            // Reset card border
            const card = slide.querySelector('.founder-card');
            if (card) {
                card.style.borderColor = 'var(--border-color)';
                card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }
        });

        // Determine which slide index corresponds to the active card
        // The extended array has structure: [last, 0, 1, 2, 3, 0]
        // So the actual team members are at indices 1, 2, 3, 4
        const slideIndex = index + 1; // +1 because first slide is the duplicated last card

        // Get the active slide
        const activeSlide = slides[slideIndex];
        if (activeSlide) {
            activeSlide.classList.add('active');

            // Update card styling
            const card = activeSlide.querySelector('.founder-card');
            if (card) {
                card.style.borderColor = 'var(--primary-color)';
                card.style.boxShadow = '0 8px 40px rgba(217, 70, 239, 0.15)';
            }

            // Update prev and next slides for visual context
            const prevSlide = slides[slideIndex - 1];
            const nextSlide = slides[slideIndex + 1];
            if (prevSlide) prevSlide.classList.add('prev');
            if (nextSlide) nextSlide.classList.add('next');
        }

        // Update dots
        updateDots(index);

        // Update current index tracking
        currentIndex = index;
        activeIndex = index;
    };

    // Update slide visual states based on position
    const updateSlideStates = () => {
        const slides = track.querySelectorAll('.team-carousel-slide');
        if (slides.length === 0) return;

        const containerWidth = track.parentElement.offsetWidth;
        const centerPosition = containerWidth / 2;

        slides.forEach((slide, index) => {
            const slideRect = slide.getBoundingClientRect();
            const trackRect = track.getBoundingClientRect();
            const slideCenter = slideRect.left + slideRect.width / 2 - trackRect.left;
            const distanceFromCenter = Math.abs(slideCenter - centerPosition);

            // Calculate prominence based on distance from center
            const maxDistance = containerWidth;
            const normalizedDistance = Math.min(distanceFromCenter / (maxDistance / 2), 1);

            // Opacity: 1.0 at center, 0.5 at edges
            const opacity = 1 - (normalizedDistance * 0.5);
            slide.style.opacity = Math.max(0.5, opacity);

            // Scale: 1.0 at center, 0.85 at edges
            const scale = 1 - (normalizedDistance * 0.15);
            slide.style.transform = `scale(${Math.max(0.85, scale)})`;

            // Blur: 0 at center, 1px at edges
            const blur = normalizedDistance * 1;
            slide.style.filter = `blur(${Math.min(1, blur)}px)`;
        });
    };

    // Animation loop for continuous movement
    const animateCarousel = () => {
        if (!isPaused) {
            // Store previous position for distance calculation
            previousPosition = position;

            // Move position continuously
            position += speed;

            // Get total width of all slides (including the extra ones)
            const slides = track.querySelectorAll('.team-carousel-slide');
            const totalSlidesWidth = slides.length * (slideWidth + gapWidth);

            // Reset position when reaching the end for seamless loop
            if (position >= totalSlidesWidth - totalWidth * 2) {
                position = position - totalWidth * teamMembers.length;
                previousPosition = position;
            }

            // Calculate how much distance has been traveled
            const distanceTraveled = position - previousPosition;
            accumulatedDistance += Math.abs(distanceTraveled);

            // Check if we've traveled one full card width
            // This means one card has completed its rotation through the carousel
            if (accumulatedDistance >= totalWidth) {
                // Reset accumulated distance
                accumulatedDistance = 0;

                // Move to the next card in the cycle
                const nextIndex = (activeIndex + 1) % teamMembers.length;

                // Update active card
                updateActiveCard(nextIndex);

                console.log(`🔄 Card ${nextIndex + 1} is now active`);
            }

            // Apply transform with smooth continuous movement
            track.style.transition = 'none';
            track.style.transform = `translateX(-${position}px)`;

            // Update slide visual states
            updateSlideStates();
        }

        // Continue animation loop
        animationId = requestAnimationFrame(animateCarousel);
    };

    // Start the continuous animation
    const startCarousel = () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        renderCarousel();
        // Start animation after a small delay to ensure rendering is complete
        setTimeout(() => {
            animateCarousel();
        }, 100);
    };

    // Pause/resume carousel
    const togglePause = (pause) => {
        isPaused = pause;
    };

    // Initialize carousel
    if (track && dotsContainer) {
        startCarousel();

        // Pause on hover
        const carouselWrapper = document.querySelector('.team-carousel-wrapper');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', () => togglePause(true));
            carouselWrapper.addEventListener('mouseleave', () => togglePause(false));
        }

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateDimensions();
            }, 200);
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchStartY = 0;
        let isSwiping = false;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            isSwiping = false;
            togglePause(true);
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            const touchX = e.changedTouches[0].screenX;
            const touchY = e.changedTouches[0].screenY;
            const diffX = touchStartX - touchX;
            const diffY = touchStartY - touchY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
                isSwiping = true;
                // Adjust position based on swipe
                const swipeSpeed = diffX * 0.05;
                position += swipeSpeed;
                previousPosition = position;
                accumulatedDistance = 0;
                track.style.transition = 'none';
                track.style.transform = `translateX(-${position}px)`;
                updateSlideStates();
            }
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            togglePause(false);
            if (isSwiping) {
                // Snap to nearest slide
                const slides = track.querySelectorAll('.team-carousel-slide');
                const slideWidth = slides[0]?.offsetWidth || 0;
                const gap = 30;
                const totalSlideWidth = slideWidth + gap;
                const targetIndex = Math.round(position / totalSlideWidth);
                position = targetIndex * totalSlideWidth;
                previousPosition = position;
                accumulatedDistance = 0;
                track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                track.style.transform = `translateX(-${position}px)`;
                setTimeout(() => {
                    track.style.transition = 'none';
                    updateSlideStates();
                }, 800);
            }
        }, { passive: true });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                // Move left (go to previous)
                const slides = track.querySelectorAll('.team-carousel-slide');
                const slideWidth = slides[0]?.offsetWidth || 0;
                const gap = 30;
                const totalSlideWidth = slideWidth + gap;
                position = Math.max(0, position - totalSlideWidth);
                previousPosition = position;
                accumulatedDistance = 0;
                track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                track.style.transform = `translateX(-${position}px)`;
                setTimeout(() => {
                    track.style.transition = 'none';
                    updateSlideStates();
                }, 800);
            } else if (e.key === 'ArrowRight') {
                // Move right (go to next)
                const slides = track.querySelectorAll('.team-carousel-slide');
                const slideWidth = slides[0]?.offsetWidth || 0;
                const gap = 30;
                const totalSlideWidth = slideWidth + gap;
                position = position + totalSlideWidth;
                previousPosition = position;
                accumulatedDistance = 0;
                track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                track.style.transform = `translateX(-${position}px)`;
                setTimeout(() => {
                    track.style.transition = 'none';
                    updateSlideStates();
                }, 800);
            }
        });
    }

    // Console logging for carousel data
    console.log('👥 Team Members:');
    teamMembers.forEach(member => {
        console.log(`  👤 ${member.name} — ${member.role}`);
    });

    // 7. COURSE DATA (Array of Objects

    const courses = [
        { id: 1, name: 'HTML & CSS Mastery', level: 'Beginner', duration: '6 weeks', students: 150 },
        { id: 2, name: 'JavaScript Fundamentals', level: 'Beginner', duration: '8 weeks', students: 200 },
        { id: 3, name: 'React Development', level: 'Intermediate', duration: '10 weeks', students: 120 },
        { id: 4, name: 'Python for Data Science', level: 'Intermediate', duration: '12 weeks', students: 90 },
        { id: 5, name: 'Full-Stack Web Development', level: 'Advanced', duration: '16 weeks', students: 75 },
        { id: 6, name: 'Cloud Architecture', level: 'Advanced', duration: '14 weeks', students: 60 }
    ];

    // Use array methods for course data
    const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
    console.log(`📊 Total students across all courses: ${totalStudents}`);

    const beginnerCourses = courses.filter(course => course.level === 'Beginner');
    console.log(`📖 Beginner courses: ${beginnerCourses.map(c => c.name).join(', ')}`);

    const courseNames = courses.map(course => course.name);
    console.log('📋 All course names:', courseNames);

    // Find a specific course
    const reactCourse = courses.find(course => course.name.includes('React'));
    if (reactCourse) {
        console.log(`✅ Found: ${reactCourse.name} (${reactCourse.level})`);
    }

    // 8. INTERACTIVE MISSION CARD

    const missionCards = document.querySelectorAll('.mission-card');

    missionCards.forEach((card, index) => {
        card.addEventListener('click', function () {
            this.classList.toggle('expanded');

            const description = this.querySelector('p');
            if (description) {
                if (this.classList.contains('expanded')) {
                    description.style.maxHeight = 'none';
                    this.style.transform = 'scale(1.03)';
                    this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
                } else {
                    description.style.maxHeight = '';
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }
            }
        });
    });

    // 9. SCROLL PROGRESS INDICATO

    const createProgressIndicator = () => {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--primary-hover));
            z-index: 9999;
            transition: width 0.1s ease;
            width: 0%;
        `;
        progressBar.id = 'scrollProgress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    };

    createProgressIndicator();

    // 10. DYNAMIC YEAR IN FOOTE

    const updateCopyrightYear = () => {
        const copyrightElement = document.querySelector('.copyright-text');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.textContent = `© ${currentYear} LearnHub Academy. All global rights reserved.`;
        }
    };

    updateCopyrightYear();

    // 11. PARALLAX EFFECT ON HER

    const heroSection = document.querySelector('.about-hero');
    const heroContent = heroSection?.querySelector('.hero-title');

    if (heroSection && heroContent) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < 600) {
                const parallaxOffset = scrollPosition * 0.3;
                heroContent.style.transform = `translateY(${parallaxOffset * 0.1}px)`;
                heroContent.style.opacity = 1 - (scrollPosition / 800);
            }
        });
    }

    // 12. CLEANUP

    const cleanup = () => {
        if (counterInterval) {
            clearInterval(counterInterval);
            counterInterval = null;
        }
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    };

    window.addEventListener('beforeunload', cleanup);

    console.log('✅ LearnHub About Page initialized successfully!');

}); // End DOMContentLoaded