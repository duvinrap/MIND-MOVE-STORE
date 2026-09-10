/* ==============================
   MOBILE MENU
   ============================== */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

  menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });


  navMenu.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });

  });

}


/* ==============================
   SEARCH
   ============================== */

const searchInput = document.getElementById("searchInput");

const allCards = document.querySelectorAll(".product-card");

const gamesEmpty = document.getElementById("gamesEmpty");
const appsEmpty = document.getElementById("appsEmpty");
const storeEmpty = document.getElementById("storeEmpty");


if (searchInput) {

  searchInput.addEventListener("input", () => {

    const searchText =
      searchInput.value
        .toLowerCase()
        .trim();


    let gamesFound = 0;
    let appsFound = 0;
    let storeFound = 0;


    allCards.forEach((card) => {

      const name =
        card.dataset.name
          ? card.dataset.name.toLowerCase()
          : "";

      const category =
        card.dataset.category
          ? card.dataset.category.toLowerCase()
          : "";

      const text =
        card.innerText.toLowerCase();


      const matched =
        name.includes(searchText) ||
        category.includes(searchText) ||
        text.includes(searchText);


      card.style.display =
        matched ? "flex" : "none";


      if (matched) {

        if (
          card.closest("#gamesGrid")
        ) {
          gamesFound++;
        }

        if (
          card.closest("#appsGrid")
        ) {
          appsFound++;
        }

        if (
          card.closest("#storeGrid")
        ) {
          storeFound++;
        }

      }

    });


    if (gamesEmpty) {
      gamesEmpty.style.display =
        gamesFound === 0
          ? "block"
          : "none";
    }

    if (appsEmpty) {
      appsEmpty.style.display =
        appsFound === 0
          ? "block"
          : "none";
    }

    if (storeEmpty) {
      storeEmpty.style.display =
        storeFound === 0
          ? "block"
          : "none";
    }

  });

}


/* ==============================
   POPUP
   ============================== */

const popup =
  document.getElementById("messagePopup");

const popupText =
  document.getElementById("popupText");


function showMessage(message) {

  if (!popup || !popupText) {
    return;
  }

  popupText.textContent = message;

  popup.classList.add("show");

}


function closeMessage() {

  if (!popup) {
    return;
  }

  popup.classList.remove("show");

}


/* Close popup when clicking outside */

if (popup) {

  popup.addEventListener("click", (event) => {

    if (event.target === popup) {
      closeMessage();
    }

  });

}


/* ==============================
   CONTACT / FORMSPREE
   ============================== */

const contactForm =
  document.getElementById("contactForm");

const submitBtn =
  document.getElementById("submitBtn");


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      if (submitBtn) {

        submitBtn.disabled = true;

        submitBtn.textContent =
          "Sending...";

      }


      const formData =
        new FormData(contactForm);


      try {

        const response =
          await fetch(
            contactForm.action,
            {
              method: "POST",

              body: formData,

              headers: {
                "Accept":
                  "application/json"
              }
            }
          );


        if (response.ok) {

          contactForm.reset();

          showMessage(
            "Your feedback has been sent successfully. Thank you!"
          );

        } else {

          showMessage(
            "Something went wrong. Please try again."
          );

        }

      } catch (error) {

        showMessage(
          "Network error. Please check your internet connection and try again."
        );

      }


      if (submitBtn) {

        submitBtn.disabled = false;

        submitBtn.textContent =
          "Send Feedback →";

      }

    }
  );

}


/* ==============================
   YEAR
   ============================== */

const yearText =
  document.querySelector(".footer-bottom p");

if (yearText) {

  const currentYear =
    new Date().getFullYear();

  yearText.textContent =
    `© ${currentYear} MIND MOVE. All rights reserved.`;

}