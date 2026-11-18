// 1. Array of 8 Products
const products = [
    { name: "Wireless Mouse", category: "ELECTRONICS", price: 25.99 },
    { name: "Bluetooth Headphones", category: "ELECTRONICS", price: 59.99 },
    { name: "Spiral Notebook", category: "STATIONERY", price: 3.50 },
    { name: "Gel Pen Set (Pack of 5)", category: "STATIONERY", price: 6.99 },
    { name: "Cotton Hoodie", category: "FASHION", price: 34.99 },
    { name: "Graphic T-Shirt", category: "FASHION", price: 18.50 },
    { name: "USB-C Hub Adapter", category: "ELECTRONICS", price: 29.99 },
    { name: "Desk Organizer", category: "STATIONERY", price: 12.00 }
];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const productGrid = document.getElementById('productGrid');
const productCounter = document.getElementById('productCounter');
const noProductsMsg = document.getElementById('noProductsMsg');

// Function to render products and handle filters
function displayProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    // Filter array based on search text and category dropdown together
    const filteredProducts = products.filter(product => {
        const matchesName = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = (selectedCategory === 'ALL' || product.category === selectedCategory);
        
        return matchesName && matchesCategory;
    });

    // Clear current grid
    productGrid.innerHTML = '';

    // Handle empty state vs results
    if (filteredProducts.length === 0) {
        productCounter.textContent = `Showing 0 of ${products.length} products`;
        noProductsMsg.classList.remove('hidden');
        return;
    }

    noProductsMsg.classList.add('hidden');
    productCounter.textContent = `Showing ${filteredProducts.length} of ${products.length} products`;

    // Render cards into the two-column grid
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';

        card.innerHTML = `
            <div class="card-header">
                <span class="product-name">${product.name}</span>
                <span class="category-tag">${product.category}</span>
            </div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
        `;

        productGrid.appendChild(card);
    });
}

// Event Listeners for real-time filtering
searchInput.addEventListener('input', displayProducts);
categoryFilter.addEventListener('change', displayProducts);

// Initial display on page load
displayProducts();