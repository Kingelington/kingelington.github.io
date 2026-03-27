// footer.js
document.addEventListener("DOMContentLoaded", () => {
  const footer = document.createElement("footer");
  footer.classList.add("site-footer");

  footer.innerHTML = `
    <div class="footer-left">
     <p>© ${new Date().getFullYear()} Anton Krook</p>
    </div>

    <div class="footer-center">
      <p>I am part of The Game Assembly's internship program.
       As per the agreement between the Games Industry and The Game Assembly,
        neither student nor company may be in contact with one another regarding internships before April 23rd. 
        Any internship offers can be made on May 5th, at the earliest.</p>
    </div>

   <div class="footer-right">
  <h4>Contact</h4>
  <p>Email: yourmail@example.com</p>

  <a class="social-icon" href="https://www.linkedin.com/in/yourprofile" target="_blank">
    <img src="icons/InBug-White.png" alt="LinkedIn" class="icon-img">
  </a>
</div>
  `;

  document.body.appendChild(footer);
});
