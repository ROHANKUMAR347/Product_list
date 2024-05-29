let products = [];

// Fetch data from the Fake Store API
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    displayProducts(products);
    populateCategories(products);
  })
  .catch((error) => console.error("Error fetching products:", error));

function displayProducts(productsToDisplay) {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";

  productsToDisplay.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="info">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Category: ${product.category}</p>
            </div>
        `;
    productContainer.appendChild(card);
  });
}

// Function to populate categories for the filter
function populateCategories(products) {
  const filterSelect = document.getElementById("filterSelect");
  const categories = [...new Set(products.map((product) => product.category))];

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filterSelect.appendChild(option);
  });
}

// Function to sort products by name
function sortByName() {
  const sortedProducts = [...products].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  displayProducts(sortedProducts);
}

// Function to sort products by price
function sortByPrice() {
  const sortedProducts = [...products].sort((a, b) => a.price - b.price);
  displayProducts(sortedProducts);
}

// Function to filter products based on search input and selected category
function filterProducts() {
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const filterSelect = document.getElementById("filterSelect").value;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchInput);
    const matchesCategory = filterSelect
      ? product.category === filterSelect
      : true;
    return matchesSearch && matchesCategory;
  });

  displayProducts(filteredProducts);
}

function toggleView() {
  const productContainer = document.getElementById("productContainer");
  productContainer.classList.toggle("list-view");
}
