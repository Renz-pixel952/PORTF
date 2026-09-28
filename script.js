
document.addEventListener("DOMContentLoaded", () => {\n    document.body.classList.add("js-ready");
    const body = document.body;
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector("nav");
    const themeBtn = document.querySelector("#themeToggle");
    const backTop = document.querySelector(".back-top");

    if (localStorage.getItem("theme") === "dark") body.classList.add("dark");

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            body.classList.toggle("dark");
            localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
            themeBtn.textContent = body.classList.contains("dark") ? "☀" : "☾";
        });
        themeBtn.textContent = body.classList.contains("dark") ? "☀" : "☾";
    }

    if (menuBtn) {
        menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
    }

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => nav?.classList.remove("open"));
    });

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, { threshold: .12 });

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    window.addEventListener("scroll", () => {
        if (backTop) backTop.classList.toggle("show", window.scrollY > 400);
    });

    if (backTop) backTop.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filter = btn.dataset.filter;
            document.querySelectorAll(".project-card").forEach(card => {
                card.style.display = (filter === "all" || card.dataset.category === filter) ? "" : "none";
            });
        });
    });

    const modal = document.querySelector("#projectModal");
    const modalTitle = document.querySelector("#modalTitle");
    const modalText = document.querySelector("#modalText");
    const modalMedia = document.querySelector("#modalMedia");

    document.querySelectorAll(".project-open").forEach(btn => {
        btn.addEventListener("click", () => {
            modalTitle.textContent = btn.dataset.title;
            modalText.textContent = btn.dataset.description;
            modalMedia.textContent = btn.dataset.image || "Project image";
            modal?.classList.add("show");
        });
    });

    document.querySelectorAll(".modal-close").forEach(btn => {
        btn.addEventListener("click", () => modal?.classList.remove("show"));
    });

    modal?.addEventListener("click", e => {
        if (e.target === modal) modal.classList.remove("show");
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") modal?.classList.remove("show");
    });

    const contactForm = document.querySelector("#contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", e => {
            e.preventDefault();
            const name = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();
            const subject = document.querySelector("#subject").value.trim();
            const message = document.querySelector("#message").value.trim();

            if (!name || !email || !subject || !message) {
                alert("Please complete all fields.");
                return;
            }

            const mailBody =
                `Name: ${name}\nEmail: ${email}\n\n${message}`;
            window.location.href =
                `mailto:carlr6599@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
        });
    }
});
