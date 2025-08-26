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