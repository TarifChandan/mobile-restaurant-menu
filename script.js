import menuArray from "/data.js";

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("menu-card-add-btn")) {
    saveOrders(e.target.dataset.menuId);
    renderOrderSummary();
  }

  if (e.target.classList.contains("place-order-btn")) {
    document.querySelector(".modal").classList.remove("hidden");
  }

  if (e.target.classList.contains("modal")) {
    document.querySelector(".modal").classList.add("hidden");
  }

  if (e.target.classList.contains("payment-form-btn")) {
    e.preventDefault();
    submitPayment();
  }

  if (e.target.classList.contains("order-item-remove")) {
    removeOrderItem(+e.target.dataset.remove);
  }

  if (e.target.classList.contains("review-btn")) {
    submitReview();
    closeReviewModal();
    document.querySelector("main").style.pointerEvents = "none";
  }
});

function getMainHtml() {
  const mainHtml = menuArray.map(function (menuItem) {
    const { name, ingredients, id, price, emoji } = menuItem;
    return `
      <div class="menu-card">
          <div class="menu-card-image">${emoji}</div>
          <div class="menu-card-details">
            <span class="menu-card-title">${name}</span>
            <p class="menu-card-description">${ingredients.join(", ")}</p>
            <span class="menu-card-price">$${price}</span>
          </div>
          <div class="menu-card-actions">
            <button class="menu-card-add-btn" data-menu-id="${id}">+</button>
          </div>
        </div>`;
  });

  mainHtml.unshift(
    `<p class="discount-msg">Order three items together and get 15% off!</p>`
  );

  return mainHtml.join("");
}

function renderMenu() {
  document.querySelector(".menu-container").innerHTML = getMainHtml();
}

function saveOrders(selectedItemId) {
  const selectedMenuItemObj = menuArray.find(
    (menuItem) => menuItem.id === +selectedItemId
  );

  selectedMenuItemObj.quantity++;
}

function getOrderSummaryHtml() {
  let totalPrice = 0;

  let orderSummaryHtml = menuArray.map(function (menuItem) {
    const { name, price, quantity } = menuItem;

    if (quantity > 0) {
      totalPrice += price * quantity;
      return `
        <div class="order-item">
            <span class="order-item-name">${name} x${quantity}</span>
            <button class="order-item-remove" data-remove="${
              menuItem.id
            }">remove</button>
            <span class="order-item-price">$${price * quantity}</span>
        </div>`;
    }
  });

  orderSummaryHtml = orderSummaryHtml.filter((item) => item !== undefined);

  if (orderSummaryHtml.length > 0) {
    if (orderSummaryHtml.length === 3) {
      const discount = totalPrice * 0.15;
      orderSummaryHtml.push(`
        <div class="section-divider order-subtotal">
            <span>Subtotal:</span>
            <span>$${totalPrice}</span>
        </div>
        <div class="order-discount">
            <span>Discount (15%):</span>
            <span>-$${discount.toFixed(1)}</span>
        </div>
        <div class="order-total">
            <span class="order-total-label">Total price:</span>
            <span>$${totalPrice - discount}</span>
        </div>

        <button class="place-order-btn">Complete order</button>
      `);
    } else {
      orderSummaryHtml.push(`
        <div class="section-divider order-total">
            <span class="order-total-label">Total price:</span>
            <span>$${totalPrice}</span>
        </div>

        <button class="place-order-btn">Complete order</button>
      `);
    }

    orderSummaryHtml.unshift(
      `<span class="order-summary-title">Your order</span>`
    );
  }

  return orderSummaryHtml.join("");
}

function renderOrderSummary() {
  document.querySelector(".order-summary").innerHTML = getOrderSummaryHtml();
}

function removeOrderItem(targetId) {
  const toBeRemovedObj = menuArray.find(function (item) {
    return item.id === targetId;
  });

  toBeRemovedObj.quantity--;

  renderOrderSummary();
}

function submitPayment() {
  const userName = document.querySelector("#username").value;
  const orderSummaryEl = document.querySelector(".order-summary");

  orderSummaryEl.innerHTML = `Thanks, ${userName}! Your order is on its way!`;
  orderSummaryEl.classList.add("payment-successful");

  document.querySelector(".modal").classList.add("hidden");

  openReviewModal();
}

function openReviewModal() {
  setTimeout(function () {
    document
      .querySelector(".modal-review-container")
      .classList.remove("hidden");
  }, 1000);
}

function submitReview() {
  const selectedReview = document.querySelector(
    ".rating input[type='radio']:checked"
  ).value;

  document.querySelector(".modal-review").innerHTML = `
    <p class="review-success-msg">
      <span>🎉</span> 
      Thanks for the ${selectedReview}-star rating! We appreciate you helping us improve.
    </p>`;
}

function closeReviewModal() {
  setTimeout(function () {
    document.querySelector(".modal-review-container").classList.add("hidden");
  }, 1800);
}

renderMenu();
