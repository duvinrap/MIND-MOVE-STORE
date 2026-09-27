const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


// =========================
// MOBILE MENU
// =========================

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

}


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

    });

});


// =========================
// SEARCH
// =========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const search = searchInput.value
            .toLowerCase()
            .trim();

        const products = document.querySelectorAll(".searchable");

        products.forEach(product => {

            const name =
                (product.dataset.name || "").toLowerCase();

            const category =
                (product.dataset.category || "").toLowerCase();

            if (
                name.includes(search) ||
                category.includes(search)
            ) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

}


// =========================
// POPUP
// =========================

function showMessage(message) {

    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popupText");

    if (!popup || !popupText) return;

    popupText.textContent = message;

    popup.classList.add("active");
}


function closePopup() {

    const popup = document.getElementById("popup");

    if (!popup) return;

    popup.classList.remove("active");
}


const popup = document.getElementById("popup");

if (popup) {

    popup.addEventListener("click", (event) => {

        if (event.target.id === "popup") {

            closePopup();

        }

    });

}


// =========================
// FORMSPREE CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");


if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        // Prevent double submission

        if (submitBtn) {

            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";

        }


        const formData = new FormData(contactForm);


        try {

            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


            if (response.ok) {

                const name =
                    document.getElementById("name").value.trim();

                contactForm.reset();

                showMessage(
                    "Thanks, " +
                    (name || "there") +
                    "! Your feedback has been sent successfully."
                );


            } else {

                showMessage(
                    "Sorry, your message could not be sent. Please try again."
                );

            }


        } catch (error) {

            showMessage(
                "Connection error. Please check your internet and try again."
            );

        }


        // Restore button

        if (submitBtn) {

            submitBtn.disabled = false;
            submitBtn.textContent = "Send Feedback →";

        }

    });

}