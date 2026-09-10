/* ==============================
   MIND MOVE
   MAIN JAVASCRIPT
   ============================== */


/* ==============================
   MOBILE NAVIGATION
   ============================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

}


/* ==============================
   SEARCH
   ============================== */

const searchInput = document.getElementById("searchInput");

const gamesGrid = document.getElementById("gamesGrid");
const appsSection = document.querySelector(".featured-app");
const storeGrid = document.getElementById("storeGrid");

const gamesEmpty = document.getElementById("gamesEmpty");
const appsEmpty = document.getElementById("appsEmpty");
const storeEmpty = document.getElementById("storeEmpty");

if (searchInput) {

  searchInput.addEventListener("input", () => {

    const query = searchInput.value.toLowerCase().trim();

    /* GAMES */
    if (gamesGrid) {

      const cards = gamesGrid.querySelectorAll(".product-card");
      let found = 0;

      cards.forEach((card) => {
        const searchableText = (
          card.dataset.name + " " + card.dataset.category + " " + card.innerText
        ).toLowerCase();

        const match = searchableText.includes(query);
        card.style.display = match ? "" : "none";
        if (match) found++;
      });

      if (gamesEmpty) {
        gamesEmpty.style.display = found === 0 ? "block" : "none";
      }

    }

    /* APPS */
    if (appsSection) {

      const appText = appsSection.innerText.toLowerCase();
      const appMatch =
        appText.includes(query) ||
        "app ai the adop game development".includes(query);

      if (query === "") {
        appsSection.style.display = "";
        if (appsEmpty) appsEmpty.style.display = "none";
      } else {
        appsSection.style.display = appMatch ? "" : "none";
        if (appsEmpty) appsEmpty.style.display = appMatch ? "none" : "block";
      }

    }

    /* STORE */
    if (storeGrid) {

      const rows = storeGrid.querySelectorAll(".store-row");
      let found = 0;

      rows.forEach((row) => {
        const searchableText = (
          row.dataset.name + " " + row.dataset.category + " " + row.innerText
        ).toLowerCase();

        const match = searchableText.includes(query);
        row.style.display = match ? "" : "none";
        if (match) found++;
      });

      if (storeEmpty) {
        storeEmpty.style.display = found === 0 ? "block" : "none";
      }

    }

  });

}


/* ==============================
   TOAST MESSAGE
   ============================== */

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

let toastTimer;

function showToast(message) {

  if (!toast) return;

  if (toastMessage) toastMessage.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);

}


/* ==============================
   CONTACT FORM / FORMSPREE
   ============================== */

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

if (contactForm) {

  contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.querySelector("span").textContent = "Sending…";
    }

    const formData = new FormData(contactForm);

    try {

      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      });

      if (response.ok) {

        contactForm.reset();

        if (submitBtn) {
          submitBtn.querySelector("span").textContent = "Feedback sent ✓";
        }

        showToast("Your feedback has been sent successfully.");

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.querySelector("span").textContent = "Send feedback";
          }
        }, 2500);

      } else {
        throw new Error("Form submission failed");
      }

    } catch (error) {

      showToast("Something went wrong. Please try again.");

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.querySelector("span").textContent = "Send feedback";
      }

    }

  });

}


/* ==============================
   FOOTER YEAR
   ============================== */

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();


/* ==============================
   CLOSE TOAST
   ============================== */

if (toast) {
  toast.addEventListener("click", () => {
    toast.classList.remove("show");
  });
}