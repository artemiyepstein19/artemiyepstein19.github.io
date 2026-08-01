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
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      navigation.classList.toggle("is-open", !open);
      document.body.classList.toggle("menu-open", !open);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 920) closeMenu();
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll("[data-fill-service]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const form = document.querySelector("[data-contact-form]");
      const select = form?.querySelector('select[name="service"]');
      const value = trigger.getAttribute("data-fill-service");
      if (!select || !value) return;
      const option = Array.from(select.options).find(
        (item) => item.value === value,
      );
      if (option) select.value = value;
    });
  });

  document.querySelectorAll("[data-eur-rate]").forEach((section) => {
    const rate = Number(section.dataset.eurRate);
    const rateDate = section.dataset.rateDate;
    if (!Number.isFinite(rate) || rate <= 0) return;

    const formatRubles = new Intl.NumberFormat("ru-RU", {
      maximumFractionDigits: 0,
    });
    const roundedRubles = (euros) => Math.round((euros * rate) / 100) * 100;

    section.querySelectorAll("[data-rub-price]").forEach((node) => {
      const minimum = Number(node.dataset.eurMin);
      const maximum = Number(node.dataset.eurMax);
      if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) return;

      const plus = node.dataset.plus === "true" ? "+" : "";
      const minimumRubles = formatRubles.format(roundedRubles(minimum));
      const maximumRubles = formatRubles.format(roundedRubles(maximum));
      node.textContent =
        minimum === maximum
          ? `≈ ${minimumRubles}${plus} ₽`
          : `≈ ${minimumRubles}–${maximumRubles}${plus} ₽`;
    });

    const caption = section.querySelector("[data-rate-caption]");
    if (caption && rateDate) {
      const formattedRate = new Intl.NumberFormat("ru-RU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(rate);
      const formattedDate = new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(`${rateDate}T00:00:00Z`));

      caption.textContent = `Рублёвый эквивалент рассчитан по курсу 1 € = ${formattedRate} ₽ на ${formattedDate} и обновляется автоматически раз в сутки.`;
    }
  });

  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    const submit = form.querySelector('button[type="submit"]');
    const status = form.querySelector("[data-form-status]");
    const defaultLabel = submit?.innerHTML;
    const sendingLabel = form.dataset.sending || "Sending…";
    const successMessage =
      form.dataset.success || "Thank you. Your message has been sent.";
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
      if (submit) {
        submit.disabled = true;
        submit.textContent = sendingLabel;
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
      } catch (error) {
        showStatus(errorMessage, "error");
      } finally {
        submitting = false;
        if (submit) {
          submit.disabled = false;
          submit.innerHTML = defaultLabel;
        }
      }
    });
  });
})();
