document.addEventListener("DOMContentLoaded", () => {
  const farmerBtn = document.getElementById("farmerBtn"),
        buyerBtn = document.getElementById("buyerBtn"),
        farmerForm = document.getElementById("farmerForm"),
        buyerForm = document.getElementById("buyerForm"),
        cartCountElement = document.getElementById("cartCount"),
        addToCartButtons = document.querySelectorAll(".add-to-cart"),
        productCards = document.querySelectorAll("[data-category]"),
        searchInput = document.querySelector("input[type='search']"),
        searchForm = document.querySelector("form[role='search']"),
        heroSection = document.querySelector(".hero-section"),
        resultsContainer = document.getElementById("searchResultsContainer"),
        resultsSection = document.getElementById("searchResults");

  let cartCount = 0;

  // Toggle Farmer/Buyer forms
  farmerBtn.onclick = () => {
    farmerForm.style.display = "block";
    buyerForm.style.display = "none";
    farmerBtn.classList.add("active-tab");
    buyerBtn.classList.remove("active-tab");
  };
  buyerBtn.onclick = () => {
    buyerForm.style.display = "block";
    farmerForm.style.display = "none";
    buyerBtn.classList.add("active-tab");
    farmerBtn.classList.remove("active-tab");
  };

  // Cart Count Script
  function bindCartButtons(container) {
    container.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", () => {
        cartCount++;
        cartCountElement.textContent = cartCount;
      });
    });
  }
  bindCartButtons(document);

  // Hero helpers
  function hideHero() { if (heroSection) heroSection.style.display = "none"; }
  function showHero() { if (heroSection) heroSection.style.display = "flex"; }

  // Dropdown filtering
  document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", e => {
      e.preventDefault();
      const selected = item.textContent.trim().toLowerCase();
      hideHero();

      productCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const category = card.dataset.category.toLowerCase();
        card.style.display =
          name.includes(selected) || category.includes(selected) ? "block" : "none";
      });
    });
  });

  
 // Home button
  const homeLink = document.querySelector(".nav-link.active");
  if (homeLink) {
    homeLink.addEventListener("click", e => {
      e.preventDefault();
      showHero();
      productCards.forEach(card => (card.style.display = "block"));
    });
  }



  // Live search (typing) → show results separately
if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const query = searchInput.value.trim().toLowerCase();
    resultsContainer.innerHTML = "";

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
        const clone = card.cloneNode(true);
        resultsContainer.appendChild(clone);
      }
    });

    if (found) {
      resultsSection.style.display = "block";
      bindCartButtons(resultsContainer); // rebind cart
    } else {
      resultsSection.style.display = "block";
      resultsContainer.innerHTML = `<p class="text-center text-danger">No product found!</p>`;
    }
  });
}

// On search submit (press Enter)
if (searchForm) {
  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    searchInput.dispatchEvent(new Event("keyup")); // trigger same logic
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

  // Bootstrap tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(el => new bootstrap.Tooltip(el));
});
