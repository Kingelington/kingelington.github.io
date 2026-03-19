// Data
const navData = {
    logo: { text: "start", url: "index.html" },
    links: [
        { name: "Specialisering", url: "specialisering.html" },
        { name: "Projekt", url: "projects.html" },
        { name: "About Me", url: "about-me.html" },
        { name: "CV", url: "cv.html" }
    ],
    socials: [
        { url: "https://www.linkedin.com/in/dittnamn", icon: "icons/linkedin.svg", alt: "LinkedIn" },
        { url: "mailto:mejladress@example.com", icon: "icons/mail.svg", alt: "Mail" }
    ]
};

const navbar = document.getElementById("navbar");
const currentPage = window.location.pathname.split("/").pop();

// 🔹 Logo
const logoDiv = document.createElement("div");
logoDiv.classList.add("logo");
const logoLink = document.createElement("a");
logoLink.href = navData.logo.url;
logoLink.textContent = navData.logo.text;
logoDiv.appendChild(logoLink);

// 🔹 Nav + ul
const nav = document.createElement("nav");

const ul = document.createElement("ul");
ul.classList.add("nav-links");

navData.links.forEach(link => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = link.name;
    a.href = link.url;
    if (link.url === currentPage) a.classList.add("active");
    li.appendChild(a);
    ul.appendChild(li);
});

// 🔹 Social icons
const socialDiv = document.createElement("div");
socialDiv.classList.add("social-icons");

navData.socials.forEach(social => {
    const a = document.createElement("a");
    a.href = social.url;
    if (social.url.startsWith("http")) a.target = "_blank";
    const img = document.createElement("img");
    img.src = "";
    img.alt = "in";
    a.appendChild(img);
    socialDiv.appendChild(a);
});

// 🔹 Hamburger
const hamburger = document.createElement("div");
hamburger.classList.add("hamburger");
["","",""].forEach(() => {
    const span = document.createElement("span");
    hamburger.appendChild(span);
});

// 🔹 Sätt ihop allt
nav.appendChild(ul);
nav.appendChild(hamburger); // hamburger inuti nav

navbar.appendChild(logoDiv);
navbar.appendChild(nav);
navbar.appendChild(socialDiv);

// 🔹 Hamburger toggle
hamburger.addEventListener("click", () => {
    ul.classList.toggle("active");
    socialDiv.classList.toggle("active");
});