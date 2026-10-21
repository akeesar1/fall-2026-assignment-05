import products from "./data/products.json";
import "./styles/main.css";

document.querySelectorAll("[data-year]").forEach((item) => {
  item.textContent = new Date().getFullYear();
});

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("header nav a").forEach((link) => {
  if (link.getAttribute("href") === `./${currentPage}`) {
    link.setAttribute("aria-current", "page");
  }
});

const grid = document.querySelector("#product-grid");
if (grid) {
  const perPage = 5;
  const totalPages = Math.ceil(products.length / perPage);
  let page = 1;
  const previous = document.querySelector("#previous-page");
  const next = document.querySelector("#next-page");
  const indicator = document.querySelector("#page-indicator");
  const count = document.querySelector("#result-count");

  function showProducts() {
    const start = (page - 1) * perPage;
    const shown = products.slice(start, start + perPage);
    grid.innerHTML = shown.map((product) => `
      <article>
        <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
        <div>
          <p>${product.category}</p>
          <h2>${product.name}</h2>
          <strong>$${product.price.toFixed(2)}</strong>
          <p>${product.description}</p>
        </div>
      </article>
    `).join("");
    indicator.textContent = `Page ${page} of ${totalPages}`;
    count.textContent = `Showing ${start + 1}–${Math.min(start + perPage, products.length)} of ${products.length} products`;
    previous.disabled = page === 1;
    next.disabled = page === totalPages;
  }

  previous.addEventListener("click", () => {
    if (page > 1) { page--; showProducts(); }
  });
  next.addEventListener("click", () => {
    if (page < totalPages) { page++; showProducts(); }
  });
  showProducts();
}
