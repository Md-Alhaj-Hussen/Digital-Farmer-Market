// Toggle Farmer/Buyer forms
  const farmerBtn = document.getElementById("farmerBtn"),
        buyerBtn = document.getElementById("buyerBtn"),
        farmerForm = document.getElementById("farmerForm"),
        buyerForm = document.getElementById("buyerForm");

  farmerBtn.onclick = () => {
    farmerForm.style.display = "block";
    buyerForm.style.display = "none";
    farmerBtn.classList.add("active-tab");
    buyerBtn.classList.remove("active-tab");
  }
  buyerBtn.onclick = () => {
    buyerForm.style.display = "block";
    farmerForm.style.display = "none";
    buyerBtn.classList.add("active-tab");
    farmerBtn.classList.remove("active-tab");
  }

  // Cart Count Script
  let cartCount = 0;
  const cartCountElement = document.getElementById("cartCount");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      cartCount++;
      cartCountElement.textContent = cartCount;
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll("[data-category]");
  const searchInput = document.querySelector("input[type='search']");
  const searchForm = document.querySelector("form[role='search']");
  const heroSection = document.querySelector(".hero-section");

  function hideHero() {
    if (heroSection) heroSection.style.display = "none";
  }
  function showHero() {
    if (heroSection) heroSection.style.display = "flex";
  }

  // 🔹 Dropdown filtering
  document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      const selected = item.textContent.trim().toLowerCase();
      hideHero();

      productCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const category = card.dataset.category.toLowerCase();

        card.style.display =
          name.includes(selected) || category.includes(selected)
            ? "block"
            : "none";
      });
    });
  });

  // 🔹 Home button
  const homeLink = document.querySelector(".nav-link.active");
  if (homeLink) {
    homeLink.addEventListener("click", e => {
      e.preventDefault();
      showHero();
      productCards.forEach(card => (card.style.display = "block"));
    });
  }

  // 🔹 Live search filtering (typing)
  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      const query = searchInput.value.trim().toLowerCase();

      if (query) {
        hideHero();
      } else {
        showHero();
      }

      productCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const category = card.dataset.category.toLowerCase();

        card.style.display =
          name.includes(query) || category.includes(query)
            ? "block"
            : "none";
      });
    });
  }

  // 🔹 On Search submit → open product in new tab
  if (searchForm) {
    searchForm.addEventListener("submit", e => {
      e.preventDefault();
      const query = searchInput.value.trim().toLowerCase();

      if (!query) return;

      let foundCard = null;
      productCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        if (name.includes(query) && !foundCard) {
          foundCard = card;
        }
      });

      if (foundCard) {
        const productTitle = foundCard.querySelector(".card-title").textContent;
        const productImg = foundCard.querySelector("img").src;
        const productPrice = foundCard.querySelector(".card-text").textContent;
      } else {
        alert("No product found!");
      }
    });
  }
});


  // 🔹 On Search submit → show results at top
if (searchForm) {
  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const query = searchInput.value.trim().toLowerCase();
    const resultsContainer = document.getElementById("searchResultsContainer");
    const resultsSection = document.getElementById("searchResults");

    resultsContainer.innerHTML = ""; // clear old results

    if (!query) {
      resultsSection.style.display = "none";
      return;
    }

    let found = false;
    productCards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const category = card.dataset.category.toLowerCase();

      if (name.includes(query) || category.includes(query)) {
        found = true;
        resultsContainer.appendChild(card.cloneNode(true)); // clone product card
      }
    });

    if (found) {
      resultsSection.style.display = "block";
      hideHero();
      window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
    } else {
      resultsSection.style.display = "block";
      resultsContainer.innerHTML = `<p class="text-center text-danger">No product found!</p>`;
    }
  });
}


// Hide search results when clicking outside
document.addEventListener("click", e => {
  const resultsSection = document.getElementById("searchResults");
  if (resultsSection && !resultsSection.contains(e.target) && !searchForm.contains(e.target)) {
    resultsSection.style.display = "none";
    showHero();
  }
});

// Initialize Bootstrap tooltips
document.addEventListener("DOMContentLoaded", () => {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});
