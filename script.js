const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");


// MOBILE MENU

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });

});


// SEARCH

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const search = searchInput.value.toLowerCase().trim();

    const products = document.querySelectorAll(".searchable");

    products.forEach(product => {

        const name =
            product.dataset.name.toLowerCase();

        const category =
            product.dataset.category.toLowerCase();

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


// POPUP

function showMessage(message) {

    document.getElementById("popupText").textContent = message;

    document.getElementById("popup").classList.add("active");
}


function closePopup() {

    document.getElementById("popup").classList.remove("active");
}


document.getElementById("popup").addEventListener("click", (event) => {

    if (event.target.id === "popup") {
        closePopup();
    }

});


// CONTACT FORM

document.getElementById("contactForm").addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    showMessage(
        "Thanks, " + name + "! Your message has been received."
    );

    event.target.reset();

});