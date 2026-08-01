(() => {
  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector(".primary-nav");

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1120) closeMenu();
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    const submitButton = form.querySelector('button[type="submit"]');
    const status = form.querySelector("[data-form-status]");
    const defaultLabel = submitButton?.innerHTML;
    const sendingLabel = form.dataset.sending || "Sending…";
    const successMessage =
      form.dataset.success || "Thank you. Your request has been sent.";
    const errorMessage =
      form.dataset.error ||
      "The message could not be sent. Please email me directly.";
    let submitting = false;

    const showStatus = (message, type) => {
      if (!status) return;
      status.textContent = message;
      status.className = `form-status is-visible is-${type}`;
      status.setAttribute("role", type === "error" ? "alert" : "status");
    };

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (submitting || !form.reportValidity()) return;

      submitting = true;
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = sendingLabel;
      }
      if (status) status.className = "form-status";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Form submission failed");
        form.reset();
        showStatus(successMessage, "success");
      } catch {
        showStatus(errorMessage, "error");
      } finally {
        submitting = false;
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = defaultLabel;
        }
      }
    });
  });
})();
