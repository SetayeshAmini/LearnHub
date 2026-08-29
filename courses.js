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


    // Close button
    if (closeBubbleBtn) {

        closeBubbleBtn.addEventListener("click", (event) => {

            event.stopPropagation();

            hideBubble();

        });

    }

});
/* ==========================================================
   COURSES FILTER + LOAD MORE + DETAILS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const coursesGrid = document.getElementById("coursesGrid");
  const courseSearch = document.getElementById("courseSearch");
  const courseCategory = document.getElementById("courseCategory");
  const courseType = document.getElementById("courseType");
  const courseLevel = document.getElementById("courseLevel");
  const courseSort = document.getElementById("courseSort");

  const courseCount = document.getElementById("courseCount");
  const loadMoreBtn = document.getElementById("loadMoreCourses");
  const loadMoreWrapper = document.getElementById("loadMoreWrapper");

  const emptyState = document.getElementById("coursesEmptyState");
  const clearFiltersBtn = document.getElementById("clearCourseFilters");
  const emptyClearBtn = document.getElementById("emptyClearBtn");

  /* ======================================================
       21 COURSES
    ====================================================== */

  const courses = [
    {
      id: 1,
      title: "Git & GitHub for Developers",
      description:
        "Master Git and GitHub workflows used by professional software developers.",
      category: "Programming",
      type: "Online",
      level: "Beginner",
      duration: "4 Weeks",
      language: "Dari / English",
      instructor: "Alex Morgan",
      students: 210,
      rating: 4.7,
      price: "Free",
      popular: true,
      date: 21,
      image:
  "https://images.pexels.com/photos/5483075/pexels-photo-5483075.jpeg",
details: {
  overview:
    "Learn Git and GitHub from the basics and build a strong workflow for managing and collaborating on software projects.",

  learning: [
    "Git Basics & Commands",
    "Branches & Merging",
    "GitHub Repositories",
    "Team Collaboration"
  ],

  requirements:
    "Basic computer and programming knowledge is recommended."
}
    },

    {
      id: 2,
      title: "HTML & CSS Foundations",
      description:
        "Learn how websites are structured and styled using modern HTML5 and CSS3.",
      category: "Web Development",
      type: "Online",
      level: "Beginner",
      duration: "4 Weeks",
      language: "English",
      instructor: "Sarah Mitchell",
      students: 185,
      rating: 4.8,
      price: "Free",
      popular: true,
      date: 20,
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    details: {
  overview:
    "Learn how to build well-structured and responsive web pages using modern HTML5 and CSS3.",

  learning: [
    "HTML5 Structure",
    "CSS3 Styling",
    "Responsive Design",
    "Web Page Projects"
  ],

  requirements:
    "No prior web development experience is required."
},
      },

    {
      id: 3,
      title: "Python Programming",
      description:
        "Start programming with Python and build a strong foundation in modern development.",
      category: "Programming",
      type: "Online",
      level: "Beginner",
      duration: "3 Months",
      language: "Dari / English",
      instructor: "Emma Wilson",
      students: 160,
      rating: 4.8,
      price: "$25",
      popular: true,
      date: 19,
      image:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
   details: {
  overview:
    "Build a strong foundation in Python programming and learn how to write practical programs using modern programming concepts.",

  learning: [
    "Python Basics",
    "Variables & Functions",
    "Lists & Dictionaries",
    "Practical Projects"
  ],

  requirements:
    "No prior programming experience is required."
},
      },

    {
      id: 4,
      title: "JavaScript Masterclass",
      description:
        "Build interactive web applications and understand modern JavaScript.",
      category: "Programming",
      type: "Online",
      level: "Intermediate",
      duration: "3 Months",
      language: "English",
      instructor: "Daniel Carter",
      students: 145,
      rating: 4.9,
      price: "$35",
      popular: true,
      date: 18,
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=900&q=80",
   details: {
  overview:
    "Build interactive web applications and strengthen your JavaScript skills through modern concepts and practical development.",

  learning: [
    "Modern JavaScript",
    "DOM & Events",
    "Async JavaScript",
    "Real Projects"
  ],

  requirements:
    "Basic HTML and CSS knowledge is required."
},
      },

    {
      id: 5,
      title: "Full-Stack Web Development",
      description:
        "Learn frontend and backend development and build complete web applications.",
      category: "Web Development",
      type: "In-Person",
      level: "Advanced",
      duration: "5 Months",
      language: "Dari / English",
      instructor: "Michael Brown",
      students: 120,
      rating: 4.9,
      price: "$60",
      popular: true,
      date: 17,
      image:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=900&q=80",
   details: {
  overview:
    "Learn how frontend and backend technologies work together to build complete, responsive and functional web applications.",

  learning: [
    "Frontend Development",
    "Backend Development",
    "Databases & APIs",
    "Full-Stack Projects"
  ],

  requirements:
    "Strong HTML, CSS and JavaScript knowledge is recommended."
},
      },

    {
      id: 6,
      title: "SQL & Database Fundamentals",
      description:
        "Understand relational databases, SQL queries and database design.",
      category: "Database",
      type: "Online",
      level: "Beginner",
      duration: "6 Weeks",
      language: "English",
      instructor: "Olivia Martin",
      students: 98,
      rating: 4.6,
      price: "$20",
      popular: false,
      date: 16,
 image:
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
details: {
  overview:
    "Learn the fundamentals of relational databases and SQL through practical examples and real-world database tasks.",

  learning: [
    "SQL Queries",
    "Database Tables",
    "Joins & Relationships",
    "Database Design"
  ],

  requirements:
    "Basic computer skills and logical thinking are recommended."
},
      },

    {
      id: 7,
      title: "Advanced SQL & Database Design",
      description:
        "Learn advanced queries, optimization and professional database architecture.",
      category: "Database",
      type: "In-Person",
      level: "Advanced",
      duration: "8 Weeks",
      language: "English",
      instructor: "James Anderson",
      students: 72,
      rating: 4.7,
      price: "$30",
      popular: false,
      date: 15,
      image:
  "https://images.pexels.com/photos/3861976/pexels-photo-3861976.jpeg",
   details: {
  overview:
    "Develop advanced SQL skills and learn how to design, optimize and manage professional relational databases.",

  learning: [
    "Advanced SQL Queries",
    "Database Optimization",
    "Database Architecture",
    "Professional Database Design"
  ],

  requirements:
    "Basic SQL knowledge and database fundamentals are recommended."
},
      },

    {
      id: 8,
      title: "Computer Networking Basics",
      description:
        "Understand networking concepts, protocols, devices and network security.",
      category: "Networking",
      type: "In-Person",
      level: "Beginner",
      duration: "2 Months",
      language: "Dari / English",
      instructor: "Robert Taylor",
      students: 110,
      rating: 4.6,
      price: "$25",
      popular: false,
      date: 14,
      image:
  "https://images.pexels.com/photos/2881229/pexels-photo-2881229.jpeg",
   details: {
  overview:
    "Learn the fundamentals of computer networking, including network devices, protocols, communication and basic security concepts.",

  learning: [
    "Networking Fundamentals",
    "Network Devices",
    "Protocols & Communication",
    "Basic Network Security"
  ],

  requirements:
    "Basic computer knowledge is recommended."
},
      },

    {
      id: 9,
      title: "Cybersecurity Essentials",
      description:
        "Learn the fundamentals of cybersecurity, threats and protection techniques.",
      category: "Cybersecurity",
      type: "Online",
      level: "Intermediate",
      duration: "3 Months",
      language: "English",
      instructor: "William Davis",
      students: 91,
      rating: 4.8,
      price: "$40",
      popular: true,
      date: 13,
      image:
  "https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=900&q=80",
    details: {
  overview:
    "Build a strong foundation in cybersecurity by understanding common threats, security principles and practical protection techniques.",

  learning: [
    "Cybersecurity Fundamentals",
    "Common Security Threats",
    "Data Protection",
    "Security Best Practices"
  ],

  requirements:
    "Basic computer and internet knowledge is recommended."
},
      },

    {
      id: 10,
      title: "Data Analysis with Python",
      description:
        "Analyze real-world data using Python, Pandas and practical data techniques.",
      category: "Data Science",
      type: "Online",
      level: "Intermediate",
      duration: "3 Months",
      language: "English",
      instructor: "Sophia Adams",
      students: 86,
      rating: 4.8,
      price: "$45",
      popular: false,
      date: 12,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
   details: {
  overview:
    "Learn how to analyze real-world data with Python and Pandas while developing practical data analysis skills.",

  learning: [
    "Python for Data Analysis",
    "Pandas & DataFrames",
    "Data Cleaning",
    "Real-World Data Projects"
  ],

  requirements:
    "Basic Python programming knowledge is recommended."
},
      },

    {
      id: 11,
      title: "Graphic Design Fundamentals",
      description:
        "Learn professional design principles, typography, color and visual communication.",
      category: "Graphic Design",
      type: "In-Person",
      level: "Beginner",
      duration: "2 Months",
      language: "Dari / English",
      instructor: "Mia Thompson",
      students: 135,
      rating: 4.7,
      price: "$30",
      popular: false,
      date: 11,
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
   details: {
  overview:
    "Learn essential graphic design principles and develop practical skills in typography, color, layout and visual communication.",

  learning: [
    "Design Principles",
    "Typography & Layout",
    "Color Theory",
    "Visual Communication"
  ],

  requirements:
    "No previous graphic design experience is required."
},
      },

    {
      id: 12,
      title: "Adobe Photoshop",
      description:
        "Master Photoshop tools and create professional graphics and designs.",
      category: "Graphic Design",
      type: "Online",
      level: "Intermediate",
      duration: "6 Weeks",
      language: "English",
      instructor: "Emily Clark",
      students: 102,
      rating: 4.7,
      price: "$25",
      popular: false,
      date: 10,
      image:
        "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=900&q=80",
   details: {
  overview:
    "Master essential Adobe Photoshop tools and techniques to create professional graphics, edit images and develop creative designs.",

  learning: [
    "Photoshop Tools & Layers",
    "Image Editing",
    "Graphic Design Techniques",
    "Practical Design Projects"
  ],

  requirements:
    "Basic computer knowledge is recommended."
},
      },

    {
      id: 13,
      title: "Microsoft Excel Professional",
      description:
        "Learn Excel formulas, functions, charts and professional data management.",
      category: "Microsoft Office",
      type: "In-Person",
      level: "Intermediate",
      duration: "6 Weeks",
      language: "Dari / English",
      instructor: "John Wilson",
      students: 155,
      rating: 4.9,
      price: "$20",
      popular: true,
      date: 9,
      image:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80",
   details: {
  overview:
    "Develop practical Excel skills for professional data management, including formulas, functions, charts and organized worksheets.",

  learning: [
    "Excel Formulas & Functions",
    "Data Management",
    "Charts & Visualization",
    "Practical Excel Projects"
  ],

  requirements:
    "Basic computer knowledge is recommended."
},
      },

    {
      id: 14,
      title: "Microsoft Word & PowerPoint",
      description:
        "Improve your professional office skills with Word and PowerPoint.",
      category: "Microsoft Office",
      type: "Online",
      level: "Beginner",
      duration: "4 Weeks",
      language: "Dari",
      instructor: "Mary Johnson",
      students: 140,
      rating: 4.6,
      price: "Free",
      popular: false,
      date: 8,
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
   details: {
  overview:
    "Build essential professional skills with Microsoft Word and PowerPoint for creating documents, presentations and everyday office work.",

  learning: [
    "Word Documents",
    "PowerPoint Presentations",
    "Formatting & Design",
    "Practical Office Skills"
  ],

  requirements:
    "No previous Microsoft Office experience is required."
},
      },

    {
      id: 15,
      title: "English Communication Skills",
      description:
        "Improve your speaking, listening and professional English communication skills.",
      category: "English",
      type: "In-Person",
      level: "Beginner",
      duration: "3 Months",
      language: "English",
      instructor: "Linda Smith",
      students: 180,
      rating: 4.8,
      price: "$25",
      popular: true,
      date: 7,
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
details: {
  overview:
    "Improve your English communication through practical speaking, listening and everyday professional activities.",

  learning: [
    "Speaking Skills",
    "Listening Practice",
    "Daily Conversations",
    "Professional Communication"
  ],

  requirements:
    "Basic English knowledge is recommended."
},
      },

    {
      id: 16,
      title: "Advanced English Speaking",
      description:
        "Develop confident English speaking skills for academic and professional situations.",
      category: "English",
      type: "Online",
      level: "Advanced",
      duration: "3 Months",
      language: "English",
      instructor: "David Miller",
      students: 95,
      rating: 4.9,
      price: "$35",
      popular: false,
      date: 6,
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
   details: {
  overview:
    "Develop confident and fluent English speaking skills through practical conversations, presentations and professional communication.",

  learning: [
    "Fluent Speaking",
    "Advanced Conversations",
    "Presentation Skills",
    "Professional English"
  ],

  requirements:
    "Intermediate English speaking skills are recommended."
},
      },

    {
      id: 17,
      title: "Business Management",
      description:
        "Learn essential business management concepts and leadership skills.",
      category: "Business",
      type: "In-Person",
      level: "Intermediate",
      duration: "3 Months",
      language: "Dari / English",
      instructor: "Thomas Lee",
      students: 88,
      rating: 4.6,
      price: "$40",
      popular: false,
      date: 5,
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
details: {
  overview:
    "Learn practical business management and leadership skills to understand teams, planning and effective decision-making.",

  learning: [
    "Business Fundamentals",
    "Team Management",
    "Leadership Skills",
    "Decision Making"
  ],

  requirements:
    "Basic business knowledge is helpful but not required."
},
      },

    {
      id: 18,
      title: "Digital Marketing",
      description:
        "Learn social media marketing, content strategy, SEO and digital campaigns.",
      category: "Business",
      type: "Online",
      level: "Intermediate",
      duration: "2 Months",
      language: "English",
      instructor: "Jessica White",
      students: 115,
      rating: 4.8,
      price: "$35",
      popular: true,
      date: 4,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    details: {
  overview:
    "Learn practical digital marketing strategies including social media, content creation, SEO and online campaigns.",

  learning: [
    "Social Media Marketing",
    "Content Strategy",
    "SEO Fundamentals",
    "Digital Campaigns"
  ],

  requirements:
    "Basic computer and internet knowledge is recommended."
},
      },

    {
      id: 19,
      title: "React for Modern Web",
      description:
        "Build modern interactive interfaces using React and component-based development.",
      category: "Web Development",
      type: "Online",
      level: "Advanced",
      duration: "3 Months",
      language: "English",
      instructor: "Chris Evans",
      students: 76,
      rating: 4.9,
      price: "$45",
      popular: true,
      date: 3,
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
  details: {
  overview:
    "Learn React and build modern interactive web interfaces using components, state and practical development techniques.",

  learning: [
    "React Components",
    "Props & State",
    "React Hooks",
    "Real Web Projects"
  ],

  requirements:
    "Good knowledge of HTML, CSS and JavaScript is recommended."
},
      },

    {
      id: 20,
      title: "Flutter Mobile Development",
      description:
        "Create cross-platform mobile applications with Flutter and Dart.",
      category: "Mobile Development",
      type: "In-Person",
      level: "Intermediate",
      duration: "4 Months",
      language: "English",
      instructor: "Daniel Moore",
      students: 64,
      rating: 4.7,
      price: "$50",
      popular: false,
      date: 2,
      image:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80",
details: {
  overview:
    "Learn to build cross-platform mobile applications with Flutter and Dart using practical development techniques.",

  learning: [
    "Dart Programming",
    "Flutter Widgets",
    "App Navigation",
    "Mobile App Projects"
  ],

  requirements:
    "Basic programming knowledge is recommended."
},
      },

    {
      id: 21,
      title: "Django Web Development",
      description:
        "Build secure and scalable web applications using Python and Django.",
      category: "Web Development",
      type: "Online",
      level: "Advanced",
      duration: "4 Months",
      language: "English",
      instructor: "Mark Harris",
      students: 59,
      rating: 4.8,
      price: "$45",
      popular: false,
      date: 1,
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
details: {
  overview:
    "Learn to build secure and scalable web applications with Python and Django through practical development projects.",

  learning: [
    "Django Fundamentals",
    "Models & Databases",
    "Views & Templates",
    "Real Web Projects"
  ],

  requirements:
    "Good knowledge of Python and basic web development is recommended."
},
      },
      {
  id: 22,
  title: "C++ Programming Fundamentals",
  description:
    "Learn programming fundamentals and object-oriented concepts using C++.",
  category: "Programming",
  type: "Online",
  level: "Intermediate",
  duration: "3 Months",
  language: "Dari / English",
  instructor: "Andrew Wilson",
  students: 94,
  rating: 4.7,
  price: "$30",
  popular: false,
  date: 22,
  image:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",

  details: {
    overview:
      "Build a strong C++ programming foundation through practical coding and object-oriented programming.",

    learning: [
      "C++ Fundamentals",
      "OOP Concepts",
      "Functions & Classes",
      "Coding Projects"
    ],

    requirements:
      "Basic programming knowledge is recommended."
  }
},
{
  id: 23,
  title: "Bootstrap Web Design",
  description:
    "Create responsive and professional websites using HTML, CSS and Bootstrap.",
  category: "Web Development",
  type: "In-Person",
  level: "Intermediate",
  duration: "6 Weeks",
  language: "English",
  instructor: "Ryan Miller",
  students: 87,
  rating: 4.8,
  price: "$25",
  popular: true,
  date: 23,
  image:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",

  details: {
    overview:
      "Learn to build responsive websites faster using Bootstrap and modern web development techniques.",

    learning: [
      "Bootstrap Grid",
      "Responsive Design",
      "Components & Utilities",
      "Website Projects"
    ],

    requirements:
      "Basic HTML and CSS knowledge is recommended."
  }
},
{
  id: 24,
  title: "MySQL Database Development",
  description:
    "Learn database creation, SQL queries and practical MySQL database management.",
  category: "Database",
  type: "Online",
  level: "Intermediate",
  duration: "6 Weeks",
  language: "Dari / English",
  instructor: "Daniel Adams",
  students: 79,
  rating: 4.7,
  price: "$25",
  popular: false,
  date: 24,
image:
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",

  details: {
    overview:
      "Learn how to create, manage and work with MySQL databases using practical SQL techniques.",

    learning: [
      "MySQL Fundamentals",
      "SQL Queries",
      "Database Tables",
      "Practical Database Projects"
    ],

    requirements:
      "Basic computer and programming knowledge is recommended."
  }
},
  ];

  /* ======================================================
       SETTINGS
    ====================================================== */

  const INITIAL_VISIBLE = 6;

  let visibleCount = INITIAL_VISIBLE;
  let filteredCourses = [...courses];

  /* ======================================================
       CREATE CARD
    ====================================================== */

  function createCourseCard(course) {
    const priceClass = course.price !== "Free" ? "paid" : "";

    return `
            <div class="col-12 col-md-6 col-xl-4 course-card-wrapper">

                <article class="course-card">

                    <div class="course-card-image">

                        <img
                            src="${course.image}"
                            alt="${course.title}"
                            loading="lazy"
                        >

                        <span class="course-category-badge">
                            ${course.category}
                        </span>

                        ${
                          course.popular
                            ? `
                                    <span class="course-popular-badge">
                                        <i class="bi bi-fire me-1"></i>
                                        POPULAR
                                    </span>
                                  `
                            : ""
                        }

                    </div>


                    <div class="course-card-body">

                        <h3 class="course-card-title">
                            ${course.title}
                        </h3>

                        <p class="course-card-description">
                            ${course.description}
                        </p>


                        <div class="course-instructor">

                            <i class="bi bi-person"></i>

                            <span>
                                ${course.instructor}
                            </span>

                        </div>


                        <div class="course-rating">

                            <span class="course-rating-stars">
                                ★★★★★
                            </span>

                            <strong>
                                ${course.rating}
                            </strong>

                            <span>
                                (${course.students} students)
                            </span>

                        </div>


                        <div class="course-meta">

                            <span class="course-meta-item">
                                <i class="bi bi-bar-chart"></i>
                                ${course.level}
                            </span>

                            <span class="course-meta-item">
                                <i class="bi bi-clock"></i>
                                ${course.duration}
                            </span>

                            <span class="course-meta-item">
                                <i class="bi bi-display"></i>
                                ${course.type}
                            </span>

                        </div>


                        <div class="course-card-bottom">

                            <strong class="course-price ${priceClass}">
                                ${course.price}
                            </strong>


                            <div class="course-actions">

                                <button
                                    type="button"
                                    class="btn course-details-btn"
                                    data-course-id="${course.id}"
                                >
                                    Details
                                </button>

                                <a
                                    href="contact.html"
                                    class="btn course-enroll-btn"
                                >
                                    Enroll
                                </a>

                            </div>

                        </div>

                    </div>

                </article>

            </div>
        `;
  }

  /* ======================================================
       RENDER
    ====================================================== */

  function renderCourses() {
    coursesGrid.innerHTML = "";

    const coursesToShow = filteredCourses.slice(0, visibleCount);

    coursesToShow.forEach((course) => {
      coursesGrid.insertAdjacentHTML("beforeend", createCourseCard(course));
    });

    /* Count */

    const showingCount = coursesToShow.length;

    courseCount.textContent = `Showing ${showingCount} of ${filteredCourses.length} courses`;

    /* Empty */

    if (filteredCourses.length === 0) {
      coursesGrid.classList.add("d-none");
      emptyState.classList.remove("d-none");
      loadMoreWrapper.classList.add("d-none");
    } else {
      coursesGrid.classList.remove("d-none");
      emptyState.classList.add("d-none");

      if (visibleCount < filteredCourses.length) {
        loadMoreWrapper.classList.remove("d-none");
      } else {
        loadMoreWrapper.classList.add("d-none");
      }
    }
  }

  /* ======================================================
       FILTER
    ====================================================== */

  function applyFilters() {
    const searchValue = courseSearch.value.trim().toLowerCase();

    const categoryValue = courseCategory.value;

    const typeValue = courseType.value;

    const levelValue = courseLevel.value;

    filteredCourses = courses.filter((course) => {
      const searchableText = `
                    ${course.title}
                    ${course.description}
                    ${course.instructor}
                    ${course.category}
                `.toLowerCase();

      const matchesSearch =
        !searchValue || searchableText.includes(searchValue);

      const matchesCategory =
        categoryValue === "all" || course.category === categoryValue;

      const matchesType = typeValue === "all" || course.type === typeValue;

      const matchesLevel = levelValue === "all" || course.level === levelValue;

      return matchesSearch && matchesCategory && matchesType && matchesLevel;
    });

    applySorting();

    visibleCount =
      filteredCourses.length > INITIAL_VISIBLE
        ? INITIAL_VISIBLE
        : filteredCourses.length;

    renderCourses();
  }

  /* ======================================================
       SORT
    ====================================================== */

  function applySorting() {
    const sortValue = courseSort.value;

    if (sortValue === "newest") {
      filteredCourses.sort((a, b) => b.date - a.date);
    } else if (sortValue === "oldest") {
      filteredCourses.sort((a, b) => a.date - b.date);
    }
  }

  /* ======================================================
       LOAD MORE
    ====================================================== */

  loadMoreBtn.addEventListener("click", () => {
    visibleCount += 6;

    renderCourses();

    if (visibleCount >= filteredCourses.length) {
      loadMoreWrapper.classList.add("d-none");
    }
  });

  /* ======================================================
       FILTER EVENTS
    ====================================================== */

  courseSearch.addEventListener("input", applyFilters);

  courseCategory.addEventListener("change", applyFilters);

  courseType.addEventListener("change", applyFilters);

  courseLevel.addEventListener("change", applyFilters);

  courseSort.addEventListener("change", applyFilters);


/* ======================================================
   HOVER FILTER DROPDOWNS
====================================================== */

const filterGroups = document.querySelectorAll(".hover-filter");

filterGroups.forEach((group) => {

  const select = group.querySelector(".filter-original");
  const button = group.querySelector(".hover-filter-button");
  const menu = group.querySelector(".hover-filter-menu");

  const options = group.querySelectorAll(
    ".hover-filter-menu button"
  );

  if (!select || !button || !menu) return;


  options.forEach((option) => {

    option.addEventListener("click", (event) => {

      event.preventDefault();
      event.stopPropagation();

      const value = option.dataset.value;


      /*main select */
      select.value = value;


      /* change text button */
      button.childNodes[0].textContent =
        option.textContent.trim();


      /* active slect*/

      options.forEach((item) => {
        item.classList.remove("active");
      });

      option.classList.add("active");


      select.dispatchEvent(
        new Event("change", {
          bubbles: true
        })
      );


      group.classList.add("filter-closed");


      setTimeout(() => {

        group.classList.remove("filter-closed");

      }, 500);

    });

  });



  select.addEventListener("change", () => {

    const selected =
      select.options[select.selectedIndex];

    if (selected) {

      button.childNodes[0].textContent =
        selected.textContent.trim();

    }

  });

});
  /* ======================================================
       CLEAR FILTERS
    ====================================================== */

  function clearFilters() {
    courseSearch.value = "";

    courseCategory.value = "all";

    courseType.value = "all";

    courseLevel.value = "all";

    courseSort.value = "newest";
    const filterGroups =
  document.querySelectorAll(".hover-filter");

filterGroups.forEach((group) => {

  const select =
    group.querySelector(".filter-original");

  const button =
    group.querySelector(".hover-filter-button");

  if (select && button) {

    const selected =
      select.options[select.selectedIndex];

    if (selected) {
      button.textContent =
        selected.textContent.trim();
    }

  }

});

    filteredCourses = [...courses];

    visibleCount = INITIAL_VISIBLE;

    renderCourses();
  }

  clearFiltersBtn.addEventListener("click", clearFilters);

  emptyClearBtn.addEventListener("click", clearFilters);

  /* ======================================================
       COURSE DETAILS MODAL
    ====================================================== */

  const modalElement = document.getElementById("courseDetailsModal");

  const courseModal = new bootstrap.Modal(modalElement);

function openCourseDetails(courseId) {

  const course = courses.find(
    item => item.id === Number(courseId)
  );

  if (!course) return;

  /* =========================
     BASIC COURSE INFO
  ========================= */

  document.getElementById(
    "courseDetailsModalLabel"
  ).textContent = course.title;


  document.getElementById(
    "modalCourseImage"
  ).src = course.image;


  document.getElementById(
    "modalCourseImage"
  ).alt = course.title;


  document.getElementById(
    "modalCourseType"
  ).textContent = course.type;


  /* =========================
     COURSE INFORMATION
  ========================= */

  document.getElementById(
    "modalCourseDuration"
  ).textContent = course.duration;


  document.getElementById(
    "modalCourseLevel"
  ).textContent = course.level;


  document.getElementById(
    "modalCourseInstructor"
  ).textContent = course.instructor;


  document.getElementById(
    "modalCourseStudents"
  ).textContent =
    `${course.students} Students`;


  /* =========================
     EXTRA DETAILS
  ========================= */


  /* =========================
   EXTRA DETAILS
========================= */

if (course.details) {

  document.getElementById(
    "modalCourseOverview"
  ).textContent =
    course.details.overview || "";


  document.getElementById(
    "modalCourseRequirements"
  ).textContent =
    course.details.requirements || "";


  const learningContainer =
    document.getElementById("modalLearningPoints");


  const learningItems =
    course.details.learning || [];


  learningContainer.innerHTML =
    learningItems
      .map(
        (item) => `
          <div class="col-6">

            <div style="
              display:flex;
              align-items:center;
              gap:7px;
              padding:7px 9px;
              margin:8px;
              border:1px solid var(--border-color);
              border-radius:8px;
              font-size:12px;
              line-height:1.3;
            ">

              <i
                class="bi bi-check-circle-fill"
                style="
                  color:var(--primary-color);
                  font-size:13px;
                  flex-shrink:0;
                "
              ></i>

              <span style="
                font-size:12px;
                font-weight:500;
                line-height:1.3;
              ">
                ${item}
              </span>

            </div>

          </div>
        `
      )
      .join("");
}

  /* =========================
     SHOW MODAL
  ========================= */

  courseModal.show();

}

  /* ======================================================
       DETAILS + ENROLL BUTTONS
    ====================================================== */

  coursesGrid.addEventListener("click", (event) => {
    const detailsButton = event.target.closest(".course-details-btn");

    if (detailsButton) {
      openCourseDetails(detailsButton.dataset.courseId);
    }
  });

  /* ======================================================
       INITIAL RENDER
    ====================================================== */

  renderCourses();
});

/* ==========================================================
   LEARNING PROCESS ANIMATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("learningProcess");

  if (!section) return;

  const steps = section.querySelectorAll(".learning-step");

  const progress = section.querySelector(".learning-line-progress");

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;

      steps.forEach((step, index) => {
        setTimeout(() => {
          step.classList.add("show");
        }, index * 180);
      });

      setTimeout(() => {
        if (progress) {
          progress.style.width = "100%";
        }
      }, 400);

      observer.disconnect();
    },
    {
      threshold: 0.2,
    },
  );

  observer.observe(section);
});
/* =========================================================
   FAQ ACCORDION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const faqCards = document.querySelectorAll(".faq-card");

  faqCards.forEach((card) => {
    const button = card.querySelector(".faq-question");

    if (!button) return;

    button.addEventListener("click", () => {
      const isActive = card.classList.contains("active");

      /* Close every FAQ */

      faqCards.forEach((item) => {
        item.classList.remove("active");

        const itemButton = item.querySelector(".faq-question");

        if (itemButton) {
          itemButton.setAttribute("aria-expanded", "false");
        }
      });

      /* Open clicked FAQ */

      if (!isActive) {
        card.classList.add("active");

        button.setAttribute("aria-expanded", "true");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded",()=>{

const tabs=document.querySelectorAll(".journey-tab");
const bar=document.getElementById("journeyBar");
const info=document.getElementById("journeyInfo");
const icon=document.getElementById("journeyIcon");
const step=document.getElementById("journeyStep");
const title=document.getElementById("journeyTitle");
const text=document.getElementById("journeyText");
const tags=document.getElementById("journeyTags");
const count=document.getElementById("journeyCount");

const data=[
{
icon:"bi-search",
title:"Discover Your Path",
text:"Explore our courses and find the right skill for your goals, interests and future plans.",
tags:["Find Your Course","Choose Your Goal","Explore Skills"]
},
{
icon:"bi-lightbulb",
title:"Learn From Experts",
text:"Join live classes and learn directly from experienced instructors through an engaging learning experience.",
tags:["Live Classes","Expert Instructors","Interactive Learning"]
},
{
icon:"bi-pencil-square",
title:"Practice Your Skills",
text:"Put your knowledge into practice through exercises, discussions and practical activities.",
tags:["Practice","Feedback","Real Exercises"]
},
{
icon:"bi-layers",
title:"Build Real Projects",
text:"Use what you have learned to create practical projects and gain valuable hands-on experience.",
tags:["Real Projects","Hands-on Work","Build Confidence"]
},
{
icon:"bi-trophy",
title:"Achieve Your Goals",
text:"Complete your learning journey, strengthen your skills and move confidently toward your future goals.",
tags:["Certificate","New Skills","Your Future"]
}
];

let current=0;
let timer;

function showStep(index){

current=index;

const item=data[index];

tabs.forEach((tab,i)=>{
tab.classList.toggle("active",i===index);
});

bar.style.width=`${((index+1)/data.length)*100}%`;

info.classList.remove("change");
void info.offsetWidth;
info.classList.add("change");

icon.innerHTML=`<i class="bi ${item.icon}"></i>`;
step.textContent=`STEP ${String(index+1).padStart(2,"0")}`;
title.textContent=item.title;
text.textContent=item.text;
count.textContent=`${String(index+1).padStart(2,"0")} / 05`;

tags.innerHTML=item.tags.map(tag=>
`<span class="journey-tag">${tag}</span>`
).join("");
}

function startAuto(){

timer=setInterval(()=>{
let next=(current+1)%data.length;
showStep(next);
},4000);

}

function restartAuto(){

clearInterval(timer);
startAuto();

}

tabs.forEach((tab,index)=>{

tab.addEventListener("click",()=>{
showStep(index);
restartAuto();
});

});

showStep(0);
startAuto();

});

/* ==========================================================
   ACADEMY CTA INTERACTION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const cta = document.querySelector(".academy-cta");

  if (!cta) return;

  const decoration = cta.querySelector(".cta-decoration");

  /* Mouse movement */

  cta.addEventListener("mousemove", (event) => {
    const rect = cta.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    decoration.style.transform = `translate(${x * 18}px, ${y * 18}px)`;
  });

  /* Reset */

  cta.addEventListener("mouseleave", () => {
    decoration.style.transform = "translate(0, 0)";
  });

  /* Button click animation */

  const buttons = cta.querySelectorAll(".cta-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      button.style.transform = "scale(.97)";

      setTimeout(() => {
        button.style.transform = "";
      }, 150);
    });
  });
});