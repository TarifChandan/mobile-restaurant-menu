import { menuArray, savedOrders } from "/data.js";

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("menu-card-add-btn")) {
    saveOrders(e.target.dataset.menuId);
    renderOrderSummary();
  }
});

function saveOrders(selectedItemId) {
  const selectedMenuItemObj = menuArray.find(
    (menuItem) => menuItem.id === +selectedItemId
  );

  savedOrders.push(selectedMenuItemObj);
}

function getOrderSummaryHtml() {
  let totalPrice = 0;

  const orderSummaryHtml = savedOrders.map(function (menuItem) {
    const { name, id, price } = menuItem;

    totalPrice += price;
    return `
      <div class="order-item">
          <span class="order-item-name">${name}</span>
          <button class="order-item-remove">remove</button>
          <span class="order-item-price">$${price}</span>
      </div>`;
  });

  orderSummaryHtml.push(`
    <div class="order-total">
        <span class="order-total-title">Total price:</span>
        <span class="order-total-price">$${totalPrice}</span>
    </div>

    <button class="place-order-btn">Complete order</button>
  `);

  orderSummaryHtml.unshift(
    `<span class="order-summary-title">Your order</span>`
  );

  return orderSummaryHtml.join("");
}

function renderOrderSummary() {
  document.querySelector(".order-summary").innerHTML = getOrderSummaryHtml();
}

function getMenuHtml() {
  return menuArray
    .map(function (menuItem) {
      const { name, ingredients, id, price, emoji } = menuItem;
      return `<div class="menu-card">
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
    })
    .join("");
}

function renderMenu() {
  document.querySelector(".menu-container").innerHTML = getMenuHtml();
}

renderMenu();
