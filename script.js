const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});


document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });

});


function showMessage(message) {

    document.getElementById("popupText").textContent = message;

    document.getElementById("popup").classList.add("active");
}


function closePopup() {

    document.getElementById("popup").classList.remove("active");
}


function sendMessage() {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {

        showMessage("Please fill in all fields.");

        return;
    }

    showMessage(
        "Thanks, " + name + "! Your message has been received."
    );

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}


document.getElementById("popup").addEventListener("click", function(event) {

    if (event.target === this) {
        closePopup();
    }

});