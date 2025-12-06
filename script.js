import menuArray from "/data.js";

function getMenuHtml() {
  return menuArray
    .map(function (menuItem) {
      const { name, ingredients, id, price, emoji } = menuItem;
      return `<div class="menu-card">
          <div class="menu-card-image">${emoji}</div>
          <div class="menu-card-details">
            <span class="menu-card-title">${name}</span>
            <p class="menu-card-description">${ingredients.join(", ")}</p>
            <span class="menu-card-price">${price}</span>
          </div>
          <div class="menu-card-actions">
            <button class="menu-card-add-btn">+</button>
          </div>
        </div>`;
    })
    .join("");
}

function renderMenu() {
  document.querySelector(".menu-container").innerHTML = getMenuHtml();
}

renderMenu();
