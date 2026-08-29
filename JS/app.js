// first line
window.onscroll = function () {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrollPercent = (scrollTop / scrollHeight) * 100;

    document.querySelector(".scroll-progress").style.width =
        scrollPercent + "%";
};
// navbar
document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById("mainNavbar");
    const navLinks = document.querySelectorAll(
        ".custom-navbar .nav-link"
    );

    const themeToggler =
        document.getElementById("themeToggler");

    const themeIcon =
        document.getElementById("themeIcon");

    const htmlElement =
        document.documentElement;

        

    /* ==========================================
       NAVBAR SCROLL EFFECT
    ========================================== */

    if (navbar) {

        const handleNavbarScroll = () => {

            if (window.scrollY > 40) {

                navbar.classList.add("navbar-shrink");

            } else {

                navbar.classList.remove("navbar-shrink");

            }

        };

        window.addEventListener(
            "scroll",
            handleNavbarScroll
        );

        handleNavbarScroll();
    }


    /* ==========================================
       NAVIGATION ACTIVE STATE
    ========================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });


    /* ==========================================
       THEME SYSTEM
    ========================================== */

    const savedTheme =
        localStorage.getItem("theme");

    const systemPrefersDark =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;


    const initialTheme =
        savedTheme ||
        (systemPrefersDark ? "dark" : "dark");


    setTheme(initialTheme);


    /* ==========================================
       THEME TOGGLE BUTTON
    ========================================== */

    if (themeToggler) {

        themeToggler.addEventListener(
            "click",
            () => {

                const currentTheme =
                    htmlElement.getAttribute(
                        "data-bs-theme"
                    );


                const newTheme =
                    currentTheme === "dark"
                        ? "light"
                        : "dark";


                setTheme(newTheme);

            }
        );

    }


    /* ==========================================
       SET THEME FUNCTION
    ========================================== */

    function setTheme(theme) {

        htmlElement.setAttribute(
            "data-bs-theme",
            theme
        );


        localStorage.setItem(
            "theme",
            theme
        );


        if (!themeIcon) {
            return;
        }


        if (theme === "dark") {

            themeIcon.className =
                "bi bi-sun-fill fs-5";

            themeToggler?.setAttribute(
                "title",
                "Switch to Light Mode"
            );

            themeToggler?.setAttribute(
                "aria-label",
                "Switch to Light Mode"
            );

        } else {

            themeIcon.className =
                "bi bi-moon-fill fs-5";

            themeToggler?.setAttribute(
                "title",
                "Switch to Dark Mode"
            );

            themeToggler?.setAttribute(
                "aria-label",
                "Switch to Dark Mode"
            );

        }

    }

});
// ==========================================================================
//  MOVING TECH TRACK SLIDER ENGINE
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const marqueeTrack = document.getElementById('techMarquee');
    
    if (marqueeTrack) {
        const initialContentBlock = marqueeTrack.querySelector('.marquee-content-block');
        
        if (initialContentBlock) {
            const clonedContentBlock = initialContentBlock.cloneNode(true);
            
            marqueeTrack.appendChild(clonedContentBlock);
        }
    }
});

// ==========================================================================
// INDEPENDENT NEWSLETTER EMAIL VALIDATION CONTROLLER
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('newsletterEmail');
    const joinBtn = document.getElementById('newsletterBtn');
    const errorMsg = document.getElementById('newsletterError');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailInput && joinBtn) {
        emailInput.addEventListener('input', () => {
            const currentInputValue = emailInput.value.trim();

            if (currentInputValue === "") {
                emailInput.style.borderColor = "var(--border-color)";
                emailInput.style.boxShadow = "none";
                errorMsg.style.display = "none";
                joinBtn.disabled = true;
                return;
            }

            if (emailRegex.test(currentInputValue)) {
                emailInput.style.borderColor = "var(--primary-color)";
                emailInput.style.boxShadow = "0 0 8px var(--primary-glow)";
                errorMsg.style.display = "none";
                joinBtn.disabled = false;
            } else {
                emailInput.style.borderColor = "#ef4444";
                emailInput.style.boxShadow = "0 0 8px rgba(239, 68, 68, 0.2)";
                errorMsg.style.display = "block";
                joinBtn.disabled = true;
            }
        });

        joinBtn.addEventListener('click', () => {
            alert(`🎉 Success! ${emailInput.value} has been subscribed to LearnHub Academy.`);
            emailInput.value = "";
            emailInput.style.borderColor = "var(--border-color)";
            emailInput.style.boxShadow = "none";
            joinBtn.disabled = true;
        });
    }
});

// robat section
// Robot / AI Assistant Section
document.addEventListener("DOMContentLoaded", () => {

    const closeBubbleBtn = document.getElementById("closeBubbleBtn");
    const aiBubble = document.getElementById("aiBubble");
    const aiTrigger = document.getElementById("aiTrigger");
    const aiTextElement = document.querySelector(".custom-footer .ai-text");

    // Check if required elements exist
    if (!aiBubble || !aiTrigger || !aiTextElement) {
        console.log("AI Assistant elements not found.");
        return;
    }

    const aiMessages = [
        "Hi! 👋 I'm Xpert, an AI assistant to help you find things.",
        "💡 Looking for something? Try asking about our JavaScript Masterclass!",
        "🔥 Limited Offer: Get 30% off on all Full-Stack Web Development paths today!",
        "🚀 Stuck on code? Tap me to launch our interactive coding sandbox.",
        "📚 Tip: Regular practice in our Workspaces boosts your retention by 80%!"
    ];

    let messageIndex = 0;
    let typingTimer = null;

    // Play notification sound
    const playNotificationSound = () => {

        try {

            const AudioContext =
                window.AudioContext || window.webkitAudioContext;

            if (!AudioContext) return;

            const audioCtx = new AudioContext();

            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(
                523.25,
                audioCtx.currentTime
            );

            gainNode.gain.setValueAtTime(
                0.03,
                audioCtx.currentTime
            );

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.start();

            oscillator.stop(
                audioCtx.currentTime + 0.1
            );

        } catch (error) {

            console.log("Audio playback is blocked.");

        }
    };


    // Typewriter effect
    const typeWriterEffect = (text) => {

        // Stop previous typing animation
        clearTimeout(typingTimer);

        aiTextElement.textContent = "";

        let index = 0;

        const type = () => {

            if (index < text.length) {

                aiTextElement.textContent += text.charAt(index);

                index++;

                typingTimer = setTimeout(type, 25);
            }
        };

        type();
    };


    // Get welcome message based on time
    const getTimedWelcome = () => {

        const hours = new Date().getHours();

        if (hours < 12) {

            return "Good morning! ☀️ Ready to crush some coding goals today?";

        } else if (hours < 18) {

            return "Good afternoon! ☕ Take a break and review your tech roadmap.";

        } else {

            return "Good night! 🌙 Owl coder? Let's check out some code challenges.";

        }
    };


    // Show AI bubble
    const showBubble = (message) => {

        aiBubble.style.display = "block";

        playNotificationSound();

        typeWriterEffect(message);
    };


    // Hide AI bubble
    const hideBubble = () => {

        aiBubble.style.display = "none";

        clearTimeout(typingTimer);
    };


    // Show welcome message after 2.5 seconds
    setTimeout(() => {

        showBubble(getTimedWelcome());

    }, 2500);


    // Change message every 12 seconds
    setInterval(() => {

        if (aiBubble.style.display === "block") {

            typeWriterEffect(
                aiMessages[messageIndex]
            );

            messageIndex =
                (messageIndex + 1) % aiMessages.length;
        }

    }, 12000);


    // AI trigger button
    aiTrigger.addEventListener("click", () => {

        const isHidden =
            aiBubble.style.display === "none" ||
            aiBubble.style.display === "";

        if (isHidden) {

            const randomMessage =
                aiMessages[
                    Math.floor(
                        Math.random() * aiMessages.length
                    )
                ];

            showBubble(randomMessage);

        } else {

            hideBubble();

        }

    });


    if (closeBubbleBtn) {

        closeBubbleBtn.addEventListener("click", (event) => {

            event.stopPropagation();

            hideBubble();

        });

    }

});











































/* =========================================================
   LEARNHUB HERO - TYPING EFFECT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const typingText = document.getElementById("typingText");

    if (!typingText) return;

    const words = [
        "your future.",
        "your skills.",
        "your career.",
        "your ideas."
    ];

    let wordIndex = 0;
    let characterIndex = 0;

    let isDeleting = false;

    const typingSpeed = 90;
    const deletingSpeed = 55;
    const pauseAfterTyping = 1500;
    const pauseAfterDeleting = 350;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!isDeleting) {

            characterIndex++;

            typingText.textContent =
                currentWord.substring(0, characterIndex);

            if (characterIndex === currentWord.length) {

                isDeleting = true;

                setTimeout(
                    typeEffect,
                    pauseAfterTyping
                );

                return;
            }

            setTimeout(
                typeEffect,
                typingSpeed
            );

        } else {

            characterIndex--;

            typingText.textContent =
                currentWord.substring(0, characterIndex);

            if (characterIndex === 0) {

                isDeleting = false;

                wordIndex++;

                if (wordIndex >= words.length) {
                    wordIndex = 0;
                }

                setTimeout(
                    typeEffect,
                    pauseAfterDeleting
                );

                return;
            }

            setTimeout(
                typeEffect,
                deletingSpeed
            );
        }
    }

    typeEffect();

});

/* =========================================================
   HERO CODE SKILL CHANGER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const codeSkill = document.getElementById("codeSkill");

    if (!codeSkill) return;

    const skills = [
        "JavaScript",
        "HTML",
        "CSS",
        "React",
        "Python",
        "Git"
    ];

    let skillIndex = 0;

    function changeSkill() {

        codeSkill.style.opacity = "0";

        setTimeout(() => {

            skillIndex++;

            if (skillIndex >= skills.length) {
                skillIndex = 0;
            }

            codeSkill.textContent =
                `"${skills[skillIndex]}"`;

            codeSkill.style.opacity = "1";

        }, 250);
    }

    setInterval(changeSkill, 2200);

});

/* =========================================================
   HERO CODE WINDOW MOUSE EFFECT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const visual = document.querySelector(".hero-visual");
    const codeWindow = document.querySelector(".code-window");

    if (!visual || !codeWindow) return;

    if (window.innerWidth <= 991) return;

    visual.addEventListener("mousemove", (event) => {

        const rect = visual.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateY =
            (x - centerX) / 35;

        const rotateX =
            (centerY - y) / 40;

        codeWindow.style.transform =
            `perspective(1000px)
             rotateY(${rotateY}deg)
             rotateX(${rotateX}deg)
             translateY(-3px)`;
    });

    visual.addEventListener("mouseleave", () => {

        codeWindow.style.transform =
            `perspective(1000px)
             rotateY(-4deg)
             rotateX(2deg)`;

    });

});

/* =========================================================
   HERO BUTTON MICRO INTERACTION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const buttons =
        document.querySelectorAll(".hero-btn");

    buttons.forEach((button) => {

        button.addEventListener("mouseenter", () => {

            button.style.transition =
                "transform 0.25s ease";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

});





/* =========================================================
   STATS COUNTER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const counters =
        document.querySelectorAll(".counter");

    if (!counters.length) return;


    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;


                    const counter =
                        entry.target;

                    const target =
                        Number(
                            counter.dataset.target
                        );


                    let current = 0;

                    const duration = 1400;

                    const step =
                        target / (duration / 16);


                    function updateCounter() {

                        current += step;


                        if (current >= target) {

                            counter.textContent =
                                target.toLocaleString();

                            return;
                        }


                        counter.textContent =
                            Math.floor(current)
                                .toLocaleString();


                        requestAnimationFrame(
                            updateCounter
                        );
                    }


                    updateCounter();

                    observer.unobserve(counter);

                });

            },

            {
                threshold: 0.5
            }
        );


    counters.forEach((counter) => {

        observer.observe(counter);

    });

});



/* =========================================
   LEARNING PATH
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const categoryButtons =
        document.querySelectorAll(".path-category");

    const selectedCategory =
        document.getElementById("selectedCategory");

    const pathCourseCount =
        document.getElementById("pathCourseCount");

    const roadSteps =
        document.getElementById("roadSteps");

    const roadProgress =
        document.getElementById("roadProgress");

    const currentCourseNumber =
        document.querySelector(".current-course-number");

    const currentCourseLabel =
        document.getElementById("currentCourseLabel");

    const currentCourseTitle =
        document.getElementById("currentCourseTitle");

    const currentCourseDescription =
        document.getElementById("currentCourseDescription");

    const courseNextBtn =
        document.getElementById("courseNextBtn");

    const totalCourses =
        document.getElementById("totalCourses");

    const totalSteps =
        document.getElementById("totalSteps");

    const totalProjects =
        document.getElementById("totalProjects");

    /* =========================================
       LEARNING PATH DATA
    ========================================= */

    const coursesData = {

        "Programming": [
            {
                title: "Programming Basics",
                label: "START HERE",
                description:
                    "Build a strong foundation in programming logic, variables, conditions and loops.",
                project: false
            },
            {
                title: "JavaScript Fundamentals",
                label: "BUILD SKILLS",
                description:
                    "Learn JavaScript fundamentals and turn programming concepts into interactive code.",
                project: false
            },
            {
                title: "Advanced JavaScript",
                label: "GO FURTHER",
                description:
                    "Explore modern JavaScript concepts, functions, arrays, objects and advanced techniques.",
                project: false
            },
            {
                title: "Programming Project",
                label: "BUILD",
                description:
                    "Put your programming knowledge together and build a complete practical project.",
                project: true
            }
        ],

        "Web Development": [
            {
                title: "HTML & CSS",
                label: "START HERE",
                description:
                    "Learn how websites are structured and create clean, responsive interfaces.",
                project: false
            },
            {
                title: "Bootstrap",
                label: "BUILD SKILLS",
                description:
                    "Build responsive layouts faster using Bootstrap components and utilities.",
                project: false
            },
            {
                title: "JavaScript for Web",
                label: "GO FURTHER",
                description:
                    "Make websites interactive by connecting JavaScript with the DOM.",
                project: false
            },
            {
                title: "Web Development Project",
                label: "BUILD",
                description:
                    "Combine your frontend skills and create a complete responsive website.",
                project: true
            }
        ],

        "Data Science": [
            {
                title: "Data Science Basics",
                label: "START HERE",
                description:
                    "Understand the foundations of data, analysis and data-driven thinking.",
                project: false
            },
            {
                title: "Data Analysis",
                label: "BUILD SKILLS",
                description:
                    "Learn how to explore, organize and understand datasets.",
                project: false
            },
            {
                title: "Data Visualization",
                label: "GO FURTHER",
                description:
                    "Turn complex datasets into clear and meaningful visual insights.",
                project: false
            },
            {
                title: "Data Science Project",
                label: "BUILD",
                description:
                    "Apply your analytical skills to a practical real-world data project.",
                project: true
            }
        ],

        "Graphic Design": [
            {
                title: "Design Fundamentals",
                label: "START HERE",
                description:
                    "Learn the core principles of composition, typography, color and visual balance.",
                project: false
            },
            {
                title: "Digital Design",
                label: "BUILD SKILLS",
                description:
                    "Create digital graphics and develop a stronger visual design workflow.",
                project: false
            },
            {
                title: "Advanced Graphic Design",
                label: "GO FURTHER",
                description:
                    "Explore advanced techniques and create more polished visual compositions.",
                project: false
            },
            {
                title: "Design Portfolio Project",
                label: "BUILD",
                description:
                    "Create a complete design project that brings your skills together.",
                project: true
            }
        ],

        "Cybersecurity": [
            {
                title: "Cybersecurity Basics",
                label: "START HERE",
                description:
                    "Understand the fundamentals of cybersecurity, threats and digital safety.",
                project: false
            },
            {
                title: "Network Security",
                label: "BUILD SKILLS",
                description:
                    "Learn how networks can be protected and how common security risks work.",
                project: false
            },
            {
                title: "Ethical Hacking",
                label: "GO FURTHER",
                description:
                    "Explore security testing concepts and responsible cybersecurity practices.",
                project: false
            },
            {
                title: "Security Project",
                label: "BUILD",
                description:
                    "Apply your cybersecurity knowledge through a practical security project.",
                project: true
            }
        ],

        "Mobile Development": [
            {
                title: "Mobile Development Basics",
                label: "START HERE",
                description:
                    "Understand the foundations of building applications for mobile devices.",
                project: false
            },
            {
                title: "Mobile UI Design",
                label: "BUILD SKILLS",
                description:
                    "Create clean and intuitive interfaces designed for mobile experiences.",
                project: false
            },
            {
                title: "App Development",
                label: "GO FURTHER",
                description:
                    "Learn how to build interactive mobile applications.",
                project: false
            },
            {
                title: "Mobile App Project",
                label: "BUILD",
                description:
                    "Turn your ideas into a complete practical mobile application.",
                project: true
            }
        ],

        "Database": [
            {
                title: "Database Fundamentals",
                label: "START HERE",
                description:
                    "Learn how databases store, organize and manage information.",
                project: false
            },
            {
                title: "SQL Basics",
                label: "BUILD SKILLS",
                description:
                    "Learn how to work with data using SQL queries and database operations.",
                project: false
            },
            {
                title: "Advanced Databases",
                label: "GO FURTHER",
                description:
                    "Explore relationships, optimization and more advanced database concepts.",
                project: false
            },
            {
                title: "Database Project",
                label: "BUILD",
                description:
                    "Design and build a practical database solution from the ground up.",
                project: true
            }
        ],

        "Networking": [
            {
                title: "Networking Fundamentals",
                label: "START HERE",
                description:
                    "Understand how computers, devices and networks communicate.",
                project: false
            },
            {
                title: "Network Administration",
                label: "BUILD SKILLS",
                description:
                    "Learn the fundamentals of managing and maintaining computer networks.",
                project: false
            },
            {
                title: "Network Security",
                label: "GO FURTHER",
                description:
                    "Understand the principles of protecting networks and connected systems.",
                project: false
            },
            {
                title: "Networking Project",
                label: "BUILD",
                description:
                    "Apply your networking knowledge in a practical network project.",
                project: true
            }
        ],

        "Microsoft Office": [
            {
                title: "Microsoft Word",
                label: "START HERE",
                description:
                    "Learn how to create, format and manage professional documents.",
                project: false
            },
            {
                title: "Microsoft Excel",
                label: "BUILD SKILLS",
                description:
                    "Work with data, formulas, tables and useful spreadsheet tools.",
                project: false
            },
            {
                title: "Microsoft PowerPoint",
                label: "GO FURTHER",
                description:
                    "Create clear and professional presentations with confidence.",
                project: false
            },
            {
                title: "Office Productivity Project",
                label: "BUILD",
                description:
                    "Combine your Office skills to complete a practical productivity project.",
                project: true
            }
        ],

        "English": [
            {
                title: "English Foundations",
                label: "START HERE",
                description:
                    "Build a strong foundation in essential English vocabulary and grammar.",
                project: false
            },
            {
                title: "Everyday English",
                label: "BUILD SKILLS",
                description:
                    "Develop practical English skills for everyday communication.",
                project: false
            },
            {
                title: "English Communication",
                label: "GO FURTHER",
                description:
                    "Improve your confidence in speaking, writing and real-world communication.",
                project: false
            },
            {
                title: "English Practice Project",
                label: "PRACTICE",
                description:
                    "Use your English skills in practical communication situations.",
                project: true
            }
        ],

        "Business": [
            {
                title: "Business Fundamentals",
                label: "START HERE",
                description:
                    "Understand the essential concepts behind modern business.",
                project: false
            },
            {
                title: "Business Communication",
                label: "BUILD SKILLS",
                description:
                    "Develop communication skills for professional and business environments.",
                project: false
            },
            {
                title: "Entrepreneurship",
                label: "GO FURTHER",
                description:
                    "Explore ideas, planning and the fundamentals of building a business.",
                project: false
            },
            {
                title: "Business Project",
                label: "BUILD",
                description:
                    "Apply your knowledge to a practical business case and project.",
                project: true
            }
        ]
    };

    /* =========================================
       STATE
    ========================================= */

    let currentCategory = "Programming";

    let currentCourseIndex = 0;

    /* =========================================
       FORMAT NUMBER
    ========================================= */

    function formatNumber(number) {

        return String(number).padStart(2, "0");

    }

    /* =========================================
       CREATE LEARNING ROAD
    ========================================= */

    function createRoad(courses) {

        roadSteps.innerHTML = "";

        courses.forEach((course, index) => {

            const step =
                document.createElement("div");

            step.className = "road-step";

            if (index < currentCourseIndex) {

                step.classList.add("completed");

            }

            if (index === currentCourseIndex) {

                step.classList.add("active");

            }

            step.innerHTML = `

                <div class="road-step-dot">
                    ${formatNumber(index + 1)}
                </div>

                <div class="road-step-title">
                    ${course.title}
                </div>

                <div class="road-step-number">
                    STEP ${formatNumber(index + 1)}
                </div>

            `;

            roadSteps.appendChild(step);

        });

        updateProgress(courses.length);

    }

    /* =========================================
       UPDATE PROGRESS
    ========================================= */

    function updateProgress(total) {

        if (total <= 1) {

            roadProgress.style.width = "0%";

            return;
        }

        const progress =
            (currentCourseIndex / (total - 1)) * 92;

        roadProgress.style.width =
            `${progress}%`;

    }

    /* =========================================
       UPDATE CURRENT COURSE
    ========================================= */

    function updateCurrentCourse(courses) {

        const course =
            courses[currentCourseIndex];

        if (!course) return;

        currentCourseNumber.textContent =
            formatNumber(currentCourseIndex + 1);

        currentCourseLabel.textContent =
            course.label;

        currentCourseTitle.textContent =
            course.title;

        currentCourseDescription.textContent =
            course.description;

        createRoad(courses);

        pathCourseCount.textContent =
            formatNumber(courses.length);

        totalCourses.textContent =
            formatNumber(courses.length);

        totalSteps.textContent =
            formatNumber(courses.length);

        const projectCount =
            courses.filter(
                course => course.project
            ).length;

        totalProjects.textContent =
            formatNumber(projectCount);

        /* Last course */

        if (
            currentCourseIndex ===
            courses.length - 1
        ) {

            courseNextBtn.innerHTML =
                `<i class="bi bi-check-lg"></i>`;

            courseNextBtn.setAttribute(
                "aria-label",
                "Learning path completed"
            );

        } else {

            courseNextBtn.innerHTML =
                `<i class="bi bi-arrow-right"></i>`;

            courseNextBtn.setAttribute(
                "aria-label",
                "Next course"
            );

        }

    }

    /* =========================================
       CHANGE CATEGORY
    ========================================= */

    function changeCategory(category) {

        if (!coursesData[category]) return;

        currentCategory =
            category;

        currentCourseIndex =
            0;

        categoryButtons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.category === category
            );

        });

        selectedCategory.textContent =
            category;

        const courses =
            coursesData[category];

        const card =
            document.querySelector(
                ".learning-path-card"
            );

        card.style.opacity = "0";

        card.style.transform =
            "translateY(8px)";

        setTimeout(() => {

            updateCurrentCourse(courses);

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";

        }, 180);

    }

    /* =========================================
       CATEGORY BUTTONS
    ========================================= */

    categoryButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                changeCategory(
                    button.dataset.category
                );

            }
        );

    });

    /* =========================================
       NEXT COURSE
    ========================================= */

    courseNextBtn.addEventListener(
        "click",
        () => {

            const courses =
                coursesData[currentCategory];

            if (!courses) return;

            if (
                currentCourseIndex <
                courses.length - 1
            ) {

                currentCourseIndex++;

                updateCurrentCourse(
                    courses
                );

            } else {

                currentCourseIndex = 0;

                updateCurrentCourse(
                    courses
                );

            }

        }
    );

    /* =========================================
       CLICK ON LEARNING STEPS
    ========================================= */

    roadSteps.addEventListener(
        "click",
        event => {

            const step =
                event.target.closest(
                    ".road-step"
                );

            if (!step) return;

            const steps =
                [...roadSteps.children];

            const index =
                steps.indexOf(step);

            if (index === -1) return;

            currentCourseIndex =
                index;

            updateCurrentCourse(
                coursesData[currentCategory]
            );

        }
    );

    /* =========================================
       KEYBOARD NAVIGATION
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            const courses =
                coursesData[currentCategory];

            if (!courses) return;

            if (
                event.key === "ArrowRight" &&
                currentCourseIndex <
                courses.length - 1
            ) {

                currentCourseIndex++;

                updateCurrentCourse(
                    courses
                );

            }

            if (
                event.key === "ArrowLeft" &&
                currentCourseIndex > 0
            ) {

                currentCourseIndex--;

                updateCurrentCourse(
                    courses
                );

            }

        }
    );

    /* =========================================
       INITIALIZE
    ========================================= */

    updateCurrentCourse(
        coursesData[currentCategory]
    );

});

















/* =========================================
   TOP COURSES
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       COURSE DATA
    ========================================= */

    const courses = [

        {
            title: "Modern Web Development",

            category: "WEB DEVELOPMENT",

            description:
                "Learn how to build beautiful, responsive and interactive websites from the ground up.",

            level: "Beginner",

            duration: "8 Weeks",

            image:
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=85&w=1200&auto=format&fit=crop",

            link: "courses.html"
        },


        {
            title: "JavaScript Fundamentals",

            category: "PROGRAMMING",

            description:
                "Build a strong programming foundation and bring your ideas to life with JavaScript.",

            level: "Beginner",

            duration: "6 Weeks",

            image:
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=85&w=1200&auto=format&fit=crop",

            link: "courses.html"
        },


        {
            title: "Data Analysis Essentials",

            category: "DATA SCIENCE",

            description:
                "Learn how to understand, explore and transform data into meaningful insights.",

            level: "Intermediate",

            duration: "10 Weeks",

            image:
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=85&w=1200&auto=format&fit=crop",

            link: "courses.html"
        }

    ];


    /* =========================================
       ELEMENTS
    ========================================= */

    const image =
        document.getElementById("topCourseImage");

    const category =
        document.getElementById("topCourseCategory");

    const title =
        document.getElementById("topCourseTitle");

    const description =
        document.getElementById("topCourseDescription");

    const level =
        document.getElementById("topCourseLevel");

    const duration =
        document.getElementById("topCourseDuration");

    const link =
        document.getElementById("topCourseLink");

    const number =
        document.getElementById("currentCourseNumber");

    const progressDots =
        document.querySelectorAll(
            "#topCourseProgress span"
        );

    const nextButton =
        document.getElementById("topCourseNext");

    const prevButton =
        document.getElementById("topCoursePrev");

    const showcase =
        document.querySelector(
            ".top-course-showcase"
        );


    /* =========================================
       STATE
    ========================================= */

    let currentIndex = 0;

    let autoPlay;


    /* =========================================
       UPDATE COURSE
    ========================================= */

    function updateCourse(index) {

        const course =
            courses[index];


        image.classList.add(
            "is-changing"
        );

        title.classList.add(
            "is-changing"
        );

        description.classList.add(
            "is-changing"
        );


        setTimeout(() => {

            image.src =
                course.image;

            image.alt =
                course.title;

            category.textContent =
                course.category;

            title.textContent =
                course.title;

            description.textContent =
                course.description;

            level.textContent =
                course.level;

            duration.textContent =
                course.duration;

            link.href =
                course.link;

            number.textContent =
                String(index + 1)
                    .padStart(2, "0");


            progressDots.forEach(
                (dot, dotIndex) => {

                    dot.classList.toggle(
                        "active",
                        dotIndex === index
                    );

                }
            );


            image.classList.remove(
                "is-changing"
            );

            title.classList.remove(
                "is-changing"
            );

            description.classList.remove(
                "is-changing"
            );

        }, 180);

    }


    /* =========================================
       NEXT
    ========================================= */

    function nextCourse() {

        currentIndex++;

        if (
            currentIndex >=
            courses.length
        ) {
            currentIndex = 0;
        }

        updateCourse(
            currentIndex
        );
    }


    /* =========================================
       PREVIOUS
    ========================================= */

    function previousCourse() {

        currentIndex--;

        if (currentIndex < 0) {

            currentIndex =
                courses.length - 1;
        }

        updateCourse(
            currentIndex
        );
    }


    /* =========================================
       BUTTONS
    ========================================= */

    nextButton.addEventListener(
        "click",
        () => {

            nextCourse();

            restartAutoPlay();

        }
    );


    prevButton.addEventListener(
        "click",
        () => {

            previousCourse();

            restartAutoPlay();

        }
    );


    /* =========================================
       PROGRESS DOTS
    ========================================= */

    progressDots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    currentIndex =
                        index;

                    updateCourse(
                        currentIndex
                    );

                    restartAutoPlay();

                }
            );

        }
    );


    /* =========================================
       KEYBOARD
    ========================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                "ArrowRight"
            ) {

                nextCourse();

                restartAutoPlay();
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousCourse();

                restartAutoPlay();
            }

        }
    );


    /* =========================================
       AUTOPLAY
    ========================================= */

    function startAutoPlay() {

        autoPlay =
            setInterval(() => {

                nextCourse();

            }, 6000);

    }


    function stopAutoPlay() {

        clearInterval(
            autoPlay
        );

    }


    function restartAutoPlay() {

        stopAutoPlay();

        startAutoPlay();

    }


    /* =========================================
       PAUSE ON HOVER
    ========================================= */

    showcase.addEventListener(
        "mouseenter",
        stopAutoPlay
    );


    showcase.addEventListener(
        "mouseleave",
        startAutoPlay
    );


    /* =========================================
       TOUCH / SWIPE
    ========================================= */

    let touchStartX = 0;

    let touchEndX = 0;


    showcase.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        { passive: true }
    );


    showcase.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0]
                    .screenX;

            const distance =
                touchEndX -
                touchStartX;


            if (
                Math.abs(distance) < 50
            ) {
                return;
            }


            if (distance < 0) {

                nextCourse();

            } else {

                previousCourse();

            }


            restartAutoPlay();

        },
        { passive: true }
    );


    /* =========================================
       INITIALIZE
    ========================================= */

    updateCourse(0);

    startAutoPlay();

});

