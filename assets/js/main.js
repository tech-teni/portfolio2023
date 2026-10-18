(function () {
  "use strict";

  var menuLink = document.querySelector(".menu-link");
  var menu = document.getElementById("menu");

  if (menuLink && menu) {
    menuLink.addEventListener("click", function (e) {
      e.preventDefault();
      menuLink.classList.toggle("active");
      menu.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });
  }

  var sections = Array.prototype.slice.call(
    document.querySelectorAll(".section[data-section]")
  );
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".main-menu a")
  );

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href").slice(1);
      var target = document.querySelector('[data-section="' + id + '"]');
      if (!target) return;
      e.preventDefault();
      if (menu) {
        menu.classList.remove("active");
        menuLink.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
      var top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  function highlightActiveSection() {
    var scrollPos = window.scrollY + 140;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        var id = section.getAttribute("data-section");
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      }
    });
  }

  window.addEventListener("scroll", highlightActiveSection, { passive: true });
  highlightActiveSection();

  document.querySelectorAll("[data-open-modal]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var modal = document.getElementById(btn.getAttribute("data-open-modal"));
      if (!modal) return;
      modal.classList.add("open");
      document.body.classList.add("modal-open");
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach(function (el) {
    el.addEventListener("click", function () {
      var modal = el.closest(".project-modal");
      if (!modal) return;
      modal.classList.remove("open");
      document.body.classList.remove("modal-open");
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.querySelectorAll(".project-modal.open").forEach(function (modal) {
        modal.classList.remove("open");
      });
      document.body.classList.remove("modal-open");
    }
  });

  var emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.addEventListener("click", function () {
      var email = "yakubganiyat247@gmail.com";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).catch(function () {});
      }
      var toast = document.getElementById("email-toast");
      if (toast) {
        toast.classList.add("show");
        setTimeout(function () {
          toast.classList.remove("show");
        }, 2500);
      }
    });
  }
})();
