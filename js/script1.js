
        document.addEventListener("DOMContentLoaded", () => {
            const productCards = document.querySelectorAll("[data-category]");
            const searchInput = document.getElementById("searchInput");
            const searchForm = document.getElementById("searchForm");
            const searchResults = document.getElementById("searchResults");
            const searchResultsContainer = document.getElementById("searchResultsContainer");
            const clearSearchBtn = document.getElementById("clearSearch");
            const heroSection = document.querySelector(".hero-section");
            const productsSection = document.querySelector(".container.my-5");

            // Login functionality
            const loginBtn = document.getElementById("loginBtn");
            const loginModal = document.getElementById("loginModal");
            const closeLogin = document.getElementById("closeLogin");
            const farmerBtn = document.getElementById("farmerBtn");
            const buyerBtn = document.getElementById("buyerBtn");
            const farmerForm = document.getElementById("farmerForm");
            const buyerForm = document.getElementById("buyerForm");

            // Cart functionality
            const cartIcon = document.getElementById("cartIcon");
            const cartSidebar = document.getElementById("cartSidebar");
            const cartOverlay = document.getElementById("cartOverlay");
            const closeCart = document.getElementById("closeCart");
            const cartItemsContainer = document.getElementById("cartItemsContainer");
            const cartCount = document.getElementById("cartCount");            
            const cartSubtotal = document.getElementById("cartSubtotal");
            const deliveryFee = document.getElementById("deliveryFee");
            const taxAmount = document.getElementById("taxAmount");
            const cartTotal = document.getElementById("cartTotal");
            const checkoutBtn = document.getElementById("checkoutBtn");
            const paymentMethods = document.querySelectorAll(".payment-method");
        
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
        

              

            // Feedback form
            const feedbackForm = document.getElementById("feedbackForm");

            let cart = [];
            let itemCount = 0;

            // Open login modal
            loginBtn.addEventListener("click", () => {
                loginModal.classList.add("open");
                document.body.style.overflow = "hidden";
            });

            // Close login modal
            closeLogin.addEventListener("click", () => {
                loginModal.classList.remove("open");
                document.body.style.overflow = "auto";
            });

            // Close modal when clicking outside
            loginModal.addEventListener("click", (e) => {
                if (e.target === loginModal) {
                    loginModal.classList.remove("open");
                    document.body.style.overflow = "auto";
                }
            });

            // Toggle Farmer/Buyer forms
            farmerBtn.addEventListener("click", () => {
                farmerForm.style.display = "block";
                buyerForm.style.display = "none";
                farmerBtn.classList.add("active-tab");
                buyerBtn.classList.remove("active-tab");
            });

            buyerBtn.addEventListener("click", () => {
                buyerForm.style.display = "block";
                farmerForm.style.display = "none";
                buyerBtn.classList.add("active-tab");
                farmerBtn.classList.remove("active-tab");
            });

            // Open cart sidebar
            cartIcon.addEventListener("click", function (e) {
                e.preventDefault();
                cartSidebar.classList.add("open");
                cartOverlay.classList.add("open");
                document.body.style.overflow = "hidden";
            });

            // Close cart sidebar
            closeCart.addEventListener("click", closeCartSidebar);
            cartOverlay.addEventListener("click", closeCartSidebar);

            function closeCartSidebar() {
                cartSidebar.classList.remove("open");
                cartOverlay.classList.remove("open");
                document.body.style.overflow = "auto";
            }

            // Payment method selection
            paymentMethods.forEach(method => {
                method.addEventListener("click", function () {
                    const radio = this.querySelector('input[type="radio"]');
                    radio.checked = true;

                    // Update visual selection
                    paymentMethods.forEach(m => m.classList.remove("selected"));
                    this.classList.add("selected");
                });
            });

            // Add to cart functionality
            const addToCartButtons = document.querySelectorAll(".add-to-cart");
            addToCartButtons.forEach(button => {
                button.addEventListener("click", function () {
                    const name = this.getAttribute("data-name");
                    const price = parseFloat(this.getAttribute("data-price"));
                    const img = this.getAttribute("data-img");

                    // Check if item already exists in cart
                    const existingItem = cart.find(item => item.name === name);

                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        cart.push({
                            name,
                            price,
                            img,
                            quantity: 1
                        });
                    }

                    itemCount++;
                    cartCount.textContent = itemCount;

                    updateCartDisplay();
                    showAddedToCartMessage(name);
                });
            });

            // Show notification when item is added to cart
            function showAddedToCartMessage(productName) {
                // Create toast notification
                const toast = document.createElement("div");
                toast.className = "position-fixed bottom-0 end-0 p-3";
                toast.style.zIndex = "1060";
                toast.innerHTML = `
        <div class="toast show" role="alert">
          <div class="toast-header">
            <i class="fas fa-check-circle text-success me-2"></i>
            <strong class="me-auto">Added to Cart</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
          </div>
          <div class="toast-body">
            ${productName} has been added to your cart.
          </div>
        </div>
      `;

                document.body.appendChild(toast);

                // Auto remove after 3 seconds
                setTimeout(() => {
                    toast.remove();
                }, 3000);
            }

            // Update cart display
            function updateCartDisplay() {
                if (cart.length === 0) {
                    cartItemsContainer.innerHTML = `
          <div class="empty-cart">
            <i class="fas fa-shopping-cart"></i>
            <h5>Your cart is empty</h5>
            <p>Start shopping to add items to your cart</p>
          </div>
        `;
                    checkoutBtn.disabled = true;
                } else {
                    let itemsHTML = "";
                    let subtotal = 0;

                    cart.forEach(item => {
                        const itemTotal = item.price * item.quantity;
                        subtotal += itemTotal;

                        itemsHTML += `
            <div class="cart-item">
              <div class="d-flex">
                <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                <div class="ms-3 flex-grow-1">
                  <h6>${item.name}</h6>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="quantity-control">
                      <button class="quantity-btn decrease-quantity" data-name="${item.name}">-</button>
                      <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-name="${item.name}">
                      <button class="quantity-btn increase-quantity" data-name="${item.name}">+</button>
                    </div>
                    <div class="text-end">
                      <div class="fw-bold">৳${itemTotal.toFixed(2)}</div>
                      <small class="text-muted">৳${item.price} each</small>
                    </div>
                  </div>
                </div>
                <button class="btn btn-sm btn-outline-danger remove-item" data-name="${item.name}">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          `;
                    });

                    cartItemsContainer.innerHTML = itemsHTML;

                    // Calculate totals
                    const delivery = 60;
                    const tax = subtotal * 0.05;
                    const total = subtotal + delivery + tax;

                    cartSubtotal.textContent = '৳${subtotal.toFixed(2)}';
                    taxAmount.textContent = '৳${tax.toFixed(2)}';
                    cartTotal.textContent = '৳${total.toFixed(2)}';

                    checkoutBtn.disabled = false;

                    // Add event listeners to quantity buttons
                    document.querySelectorAll(".increase-quantity").forEach(button => {
                        button.addEventListener("click", function () {
                            const itemName = this.getAttribute("data-name");
                            const item = cart.find(item => item.name === itemName);
                            item.quantity++;
                            itemCount++;
                            cartCount.textContent = itemCount;
                            updateCartDisplay();
                        });
                    });

                    document.querySelectorAll(".decrease-quantity").forEach(button => {
                        button.addEventListener("click", function () {
                            const itemName = this.getAttribute("data-name");
                            const item = cart.find(item => item.name === itemName);
                            if (item.quantity > 1) {
                                item.quantity--;
                                itemCount--;
                                cartCount.textContent = itemCount;
                                updateCartDisplay();
                            }
                        });
                    });

                    document.querySelectorAll(".quantity-input").forEach(input => {
                        input.addEventListener("change", function () {
                            const itemName = this.getAttribute("data-name");
                            const item = cart.find(item => item.name === itemName);
                            const newQuantity = parseInt(this.value);

                            if (newQuantity > 0) {
                                itemCount += newQuantity - item.quantity;
                                item.quantity = newQuantity;
                                cartCount.textContent = itemCount;
                                updateCartDisplay();
                            } else {
                                this.value = item.quantity;
                            }
                        });
                    });

                    document.querySelectorAll(".remove-item").forEach(button => {
                        button.addEventListener("click", function () {
                            const itemName = this.getAttribute("data-name");
                            const itemIndex = cart.findIndex(item => item.name === itemName);

                            if (itemIndex !== -1) {
                                itemCount -= cart[itemIndex].quantity;
                                cart.splice(itemIndex, 1);
                                cartCount.textContent = itemCount;
                                updateCartDisplay();
                            }
                        });
                    });
                }
            }

            // Checkout button
            checkoutBtn.addEventListener("click", function () {
                const address = document.getElementById("deliveryAddress").value;
                const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

                if (!address.trim()) {
                    alert("Please enter your delivery address");
                    return;
                }

                alert('Order placed successfully!\n\nDelivery to: ${address}\nPayment method: ${getPaymentMethodName(paymentMethod)}\nTotal: ${cartTotal.textContent}');

                // Clear cart
                cart = [];
                itemCount = 0;
                cartCount.textContent = "0";
                document.getElementById("deliveryAddress").value = "";
                updateCartDisplay();
                closeCartSidebar();
            });

            function getPaymentMethodName(value) {
                switch (value) {
                    case "cod": return "Cash on Delivery";
                    case "bkash": return "bKash";
                    case "nagad": return "Nagad";
                    case "rocket": return "Rocket";
                    case "card": return "Credit/Debit Card";
                    default: return "Unknown";
                }
            }

            // Feedback form submission
            feedbackForm.addEventListener("submit", function (e) {
                e.preventDefault();
                alert("Thank you for your valuable feedback!");
                this.reset();
            });

            function hideHero() {
                if (heroSection) heroSection.style.display = "none";
            }
            function showHero() {
                if (heroSection) heroSection.style.display = "flex";
            }

            function hideProducts() {
                if (productsSection) productsSection.style.display = "none";
            }
            function showProducts() {
                if (productsSection) productsSection.style.display = "block";
            }

            // Clear search functionality
            clearSearchBtn.addEventListener("click", () => {
                searchInput.value = "";
                searchResults.style.display = "none";
                showHero();
                showProducts();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });

            // Live search filtering (typing)
            if (searchInput) {
                searchInput.addEventListener("keyup", () => {
                    const query = searchInput.value.trim().toLowerCase();

                    if (query) {
                        hideHero();
                        hideProducts();
                        searchResults.style.display = "block";
                    } else {
                        showHero();
                        showProducts();
                        searchResults.style.display = "none";
                    }

                    searchResultsContainer.innerHTML = "";
                    let foundItems = false;

                    productCards.forEach(card => {
                        const name = card.dataset.name.toLowerCase();
                        const category = card.dataset.category.toLowerCase();

                        if (name.includes(query) || category.includes(query)) {
                            foundItems = true;
                            const cardClone = card.cloneNode(true);
                            searchResultsContainer.appendChild(cardClone);
                        }
                    });

                    if (!foundItems && query) {
                        searchResultsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
              <i class="fas fa-search fa-3x mb-3 text-muted"></i>
              <h4 class="text-muted">No products found</h4>
              <p class="text-muted">Try searching with different keywords</p>
            </div>
          `;
                    }
                });
            }

            // Search form submission
            if (searchForm) {
                searchForm.addEventListener("submit", e => {
                    e.preventDefault();
                    const query = searchInput.value.trim().toLowerCase();

                    if (!query) {
                        searchResults.style.display = "none";
                        showHero();
                        showProducts();
                        return;
                    }

                    hideHero();
                    hideProducts();
                    searchResults.style.display = "block";

                    searchResultsContainer.innerHTML = "";
                    let foundItems = false;

                    productCards.forEach(card => {
                        const name = card.dataset.name.toLowerCase();
                        const category = card.dataset.category.toLowerCase();

                        if (name.includes(query) || category.includes(query)) {
                            foundItems = true;
                            const cardClone = card.cloneNode(true);
                            searchResultsContainer.appendChild(cardClone);
                        }
                    });

                    if (!foundItems) {
                        searchResultsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
              <i class="fas fa-search fa-3x mb-3 text-muted"></i>
              <h4 class="text-muted">No products found</h4>
              <p class="text-muted">Try searching with different keywords</p>
            </div>
          `;
                    }

                    // Scroll to search results
                    window.scrollTo({ top: searchResults.offsetTop - 80, behavior: "smooth" });
                });
            }

            // Initialize cart display
            updateCartDisplay();
        });

    