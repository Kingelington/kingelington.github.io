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
        neither student nor company may be in contact with one another regarding internships before April 15th. 
        Any internship offers can be made on April 27th, at the earliest.</p>
    </div>

   <div class="footer-right">
  <h4>Contact:</h4>
  <p>Email: anton.r.krook@gmail.com </p>
  <a class="social-icon" href="https://www.linkedin.com/in/anton-krook-12b324182" target="_blank" rel="noopener">
   <svg viewBox="0 0 24 24" style="width:24px; height: 24px; fill:currentColor; margin-right: 8px;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
  </a>
</div>
  `;

  document.body.appendChild(footer);
});
