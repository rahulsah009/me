(function ($) {
  "use strict";

  // NAVBAR SCROLL with blur effect
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  });

  // SMOOTHSCROLL - Single implementation
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();
    var target = $(this.getAttribute("href"));
    if (target.length) {
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 80,
          },
          800,
          "linear"
        );
    }
  });

  // Mobile menu toggle
  $(".navbar-toggler").click(function () {
    $(this).toggleClass("active");
  });

  // Close mobile menu when clicking on a link
  $(".navbar-nav .nav-link").click(function () {
    $(".navbar-collapse").collapse("hide");
    $(".navbar-toggler").removeClass("active");
  });

  // Add animation classes when elements come into view
  function animateOnScroll() {
    $(".hero-title, .hero-subtitle, .social-links").each(function () {
      if (
        $(this).offset().top <
        $(window).scrollTop() + $(window).height() - 100
      ) {
        $(this).addClass("animate__animated animate__fadeInUp");
      }
    });

    $(".about-card, .project-item").each(function () {
      if (
        $(this).offset().top <
        $(window).scrollTop() + $(window).height() - 100
      ) {
        $(this).addClass("animate__animated animate__fadeInUp");
      }
    });
  }

  $(window).scroll(animateOnScroll);
  animateOnScroll();
})(jQuery);

// Typing animation for roles - Fixed version
$(document).ready(function () {
  const roles = [
    "Full Stack Developer",
    "Mern Stack Developer",
    "Web Developer",
    "Software Engineer",
    "AI/ML Learning Engineer",
  ];

  let currentRole = 0;
  let currentChar = 0;
  let isDeleting = false;

  function typeRole() {
    const rolesElement = document.getElementById("roles");

    // Check if element exists
    if (!rolesElement) {
      setTimeout(typeRole, 100);
      return;
    }

    const currentText = roles[currentRole];

    if (isDeleting) {
      rolesElement.textContent = currentText.substring(0, currentChar - 1);
      currentChar--;
    } else {
      rolesElement.textContent = currentText.substring(0, currentChar + 1);
      currentChar++;
    }

    let typeSpeed = isDeleting ? 100 : 150;

    if (!isDeleting && currentChar === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && currentChar === 0) {
      isDeleting = false;
      currentRole = (currentRole + 1) % roles.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeRole, typeSpeed);
  }

  // Start typing animation after a short delay
  setTimeout(typeRole, 1000);
});

// Skills View More Toggle Function
function toggleSkills() {
  const skillsGrid = document.querySelector(".skills-card .skills-grid");
  const skillsBtn = document.querySelector(".skills-card .view-more-btn");
  const skillsBtnText = skillsBtn.querySelector(".view-more-text");

  if (skillsGrid && skillsBtn && skillsBtnText) {
    if (skillsGrid.classList.contains("expanded")) {
      skillsGrid.classList.remove("expanded");
      skillsBtnText.textContent = "View More";
      skillsBtn.classList.remove("expanded");
    } else {
      skillsGrid.classList.add("expanded");
      skillsBtnText.textContent = "View Less";
      skillsBtn.classList.add("expanded");
    }
  }
}

// Achievements View More Toggle Function
function toggleAchievements() {
  const achievementsList = document.querySelector(
    ".achievements-card .achievements-list"
  );
  const achievementsBtn = document.querySelector(
    ".achievements-card .view-more-btn"
  );
  const achievementsBtnText = achievementsBtn.querySelector(".view-more-text");

  if (achievementsList && achievementsBtn && achievementsBtnText) {
    if (achievementsList.classList.contains("expanded")) {
      achievementsList.classList.remove("expanded");
      achievementsBtnText.textContent = "View More";
      achievementsBtn.classList.remove("expanded");
    } else {
      achievementsList.classList.add("expanded");
      achievementsBtnText.textContent = "View Less";
      achievementsBtn.classList.add("expanded");
    }
  }
}

// Add error styling for form validation
const style = document.createElement("style");
style.textContent = `
    .form-control.error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
`;
document.head.appendChild(style);

// Form submission with Formspree
$("#contact-form").submit(function (e) {
  e.preventDefault();

  const form = this;
  const formData = new FormData(form);
  const submitBtn = $(form).find('button[type="submit"]');
  const btnText = submitBtn.find(".btn-text");
  const btnLoading = submitBtn.find(".btn-loading");

  // Validation
  let isValid = true;
  $(form)
    .find("input[required], textarea[required]")
    .each(function () {
      if ($(this).val().trim() === "") {
        isValid = false;
        $(this).addClass("error");
      } else {
        $(this).removeClass("error");
      }
    });

  if (!isValid) {
    showNotification("Please fill in all required fields.", "error");
    return;
  }

  // Show loading state
  submitBtn.prop("disabled", true);
  btnText.hide();
  btnLoading.show();

  // Submit to Formspree
  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        showNotification(
          "Thank you! Your message has been sent successfully.",
          "success"
        );
        form.reset();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      showNotification(
        "Sorry, there was an error sending your message. Please try again.",
        "error"
      );
    })
    .finally(() => {
      // Reset button state
      submitBtn.prop("disabled", false);
      btnText.show();
      btnLoading.hide();
    });
});

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  $(".notification").remove();

  const notification = $(`
        <div class="notification notification-${type}">
            <div class="notification-content">
                <i class="fas ${
                  type === "success"
                    ? "fa-check-circle"
                    : type === "error"
                    ? "fa-exclamation-circle"
                    : "fa-info-circle"
                }"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        </div>
    `);

  $("body").append(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.fadeOut(() => notification.remove());
  }, 5000);

  // Manual close
  notification.find(".notification-close").click(() => {
    notification.fadeOut(() => notification.remove());
  });
}

$(function () {
  $(".tab-btn").click(function () {
    $(".tab-btn").removeClass("active");
    $(this).addClass("active");
    $(".resume-tab-content").hide();
    $("#" + $(this).data("tab")).show();
  });
});
