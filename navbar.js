// Data
const navData = {
    logo: { text: "Anton Krook", url: "index.html" },
    links: [
        { name: "GOAP", url: "specialisering.html" },
        { name: "Projects", url: "projects.html" },
        { name: "About Me", url: "about-me.html" },
        { name: "CV", url: "CV.html"}
    ],
    socials: [
        { url: "https://www.linkedin.com/in/anton-krook-12b324182", svg: 
              `<svg viewBox="0 0 24 24" style="width:24px; height: 24px; fill:#fff; margin-right: 8px;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>`,
               alt: "LinkedIn" },
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
    if (social.url.startsWith("http"))
        {
            a.target = "_blank";
            a.rel = "noopener";
        }
    if(social.icon)
    {
        const img = document.createElement("img");
        img.src = social.icon;
        img.alt = social.alt;
        a.appendChild(img);
    }
    else if(social.svg)
    {
        a.innerHTML = social.svg
    }
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