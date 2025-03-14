document.addEventListener("DOMContentLoaded", function () {
    let currentPage = 1;
    const totalPages = 5;
    const pages = document.querySelectorAll(".page");
    const nextButtons = document.querySelectorAll('[id^="next"]');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const proposalMessage = document.getElementById('proposal-message');

    // Function to show a specific page
    function showPage(pageNumber) {
        pages.forEach(page => page.classList.remove("active"));
        pages[pageNumber - 1].classList.add("active");
    }

    // Handle next button clicks for transitions
    nextButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            if (index + 1 < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });
    });

    // Yes Button Click: Show popup and redirect
    yesButton.addEventListener("click", function () {
        showPopup("Yay! You chose me! ❤️", () => {
            window.location.href = "yes.html"; 
        });
    });

    // No Button playful movement
    let attempt = 0;
    const messages = [
        "Are you sure? 🥺", 
        "Think again! 🤔", 
        "Give it another thought... 😢", 
        "Really? This hurts... 💔", 
        "Fine, but just know I still like you! 🥹", 
        "Okay, no more running away! 😏",
        "really 😢",
        "sorry, to say but...",
        "I don't want you to say no 🥹",
        "so, i have removed the no button 😏"

    ];

    noButton.addEventListener("mouseover", function () {
        if (attempt < messages.length - 1) {
            const x = Math.random() * (window.innerWidth - noButton.offsetWidth);
            const y = Math.random() * (window.innerHeight - noButton.offsetHeight);
            noButton.style.position = 'absolute';
            noButton.style.left = `${x}px`;
            noButton.style.top = `${y}px`;
            alert(messages[attempt]); 
            attempt++;
        } else {
            alert(messages[messages.length - 1]);
            noButton.style.display = 'none';
            yesButton.style.transform = 'scale(1.5)';
            yesButton.style.backgroundColor = '#ff4a3d';
        }
    });

    // No Button Click: Final Message & Redirect
    noButton.addEventListener("click", function () {
        showPopup("Just kidding! You can't say no! 😉", () => {
            window.location.href = "no.html"; 
        });
    });

    // Function to show a popup with a countdown
    function showPopup(message, callback) {
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.top = "0";
        popup.style.left = "0";
        popup.style.width = "100%";
        popup.style.height = "100%";
        popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        popup.style.display = "flex";
        popup.style.justifyContent = "center";
        popup.style.alignItems = "center";
        popup.style.color = "white";
        popup.style.fontSize = "2rem";
        popup.style.zIndex = "1000";
        document.body.appendChild(popup);

        let countdown = 3;
        popup.textContent = `Take a deep breath... 😌`;

        const interval = setInterval(() => {
            if (countdown > 0) {
                popup.textContent = `${countdown}...`;
                countdown--;
            } else {
                clearInterval(interval);
                popup.textContent = message;
                setTimeout(() => {
                    document.body.removeChild(popup);
                    if (callback) callback();
                }, 3000);
            }
        }, 1000);
    }
});
