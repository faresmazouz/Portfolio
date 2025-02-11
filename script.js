// Données des projets
const projects = [
    {
        title: "CTF Challenge 1",
        description: "Résolution d'un challenge de cryptographie avec Python.",
        link: "#"
    },
    {
        title: "CTF Challenge 2",
        description: "Analyse de paquets réseau avec Wireshark.",
        link: "#"
    },
    {
        title: "CTF Challenge 3",
        description: "Exploration et exploitation d'une faille dans un site web.",
        link: "#"
    }
];

// Ajout dynamique des projets
const projectsContainer = document.getElementById("projects-container");
projects.forEach(project => {
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">Voir le projet</a>
    `;
    projectsContainer.appendChild(projectDiv);
});

// Bouton "Retour en haut"
const scrollTopButton = document.getElementById("scrollTopButton");
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollTopButton.style.display = "block";
    } else {
        scrollTopButton.style.display = "none";
    }
});

// Action du bouton "Retour en haut"
scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Message d'alerte pour le formulaire
//document.querySelector('form').addEventListener('submit', function(event) {
//    event.preventDefault();
//    alert('Merci pour votre message, Farès vous répondra bientôt !');
//});

