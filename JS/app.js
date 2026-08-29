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
document.addEventListener('DOMContentLoaded', () => {
    const closeBubbleBtn = document.getElementById('closeBubbleBtn');
    const aiBubble = document.getElementById('aiBubble');
    const aiTrigger = document.getElementById('aiTrigger');
    const aiTextElement = document.querySelector('.custom-footer .ai-text');

    const aiMessages = [
        "Hi! 👋 I'm Xpert, an AI assistant to help you find things.",
        "💡 Looking for something? Try asking about our Javascript Masterclass!",
        "🔥 Limited Offer: Get 30% off on all Full-Stack Web Development paths today!",
        "🚀 Stuck on code? Tap me to launch our interactive coding sandbox.",
        "📚 Tip: Regular practice in our Workspaces boosts your retention by 80%!"
    ];

    const playNotificationSound = () => {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.03, audioCtx.currentTime);

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        } catch (e) {
            console.log("Audio playback blocked by browser setup.");
        }
    };

    const typeWriterEffect = (text, index = 0) => {
        if (!aiTextElement) return;
        if (index === 0) aiTextElement.innerHTML = '';
        if (index < text.length) {
            aiTextElement.innerHTML += text.charAt(index);
            setTimeout(() => typeWriterEffect(text, index + 1), 25);
        }
    };

    const getTimedWelcome = () => {
        const hours = new Date().getHours();
        if (hours < 12) return "Good morning!☀️ Ready to crush some coding goals today?";
        if (hours < 18) return "Good afternoon!☕ Take a break and review your tech roadmap.";
        return "Good Night!🌙 owl coder? Let's check out some code challenges.";
    };

    setTimeout(() => {
        if (aiBubble) {
            aiBubble.style.display = 'block';
            playNotificationSound();
            typeWriterEffect(getTimedWelcome());
        }
    }, 2500);

    let messageIndex = 0;
    setInterval(() => {
        if (aiBubble && aiBubble.style.display === 'block') {
            typeWriterEffect(aiMessages[messageIndex]);
            messageIndex = (messageIndex + 1) % aiMessages.length;
        }
    }, 12000);

    if (aiTrigger && aiBubble) {
        aiTrigger.addEventListener('click', () => {
            if (aiBubble.style.display === 'none' || aiBubble.style.display === '') {
                aiBubble.style.display = 'block';
                playNotificationSound();
                typeWriterEffect(aiMessages[Math.floor(Math.random() * aiMessages.length)]);
            } else {
                aiBubble.style.display = 'none';
            }
        });
    }

    if (closeBubbleBtn && aiBubble) {
        closeBubbleBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            aiBubble.style.display = 'none';
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

