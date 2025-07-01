// Product Data
const products = {
    suits: [
        {
            id: 1,
            name: "Premium Navy Blue Suit",
            price: 299.99,
            originalPrice: 399.99,
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Our premium navy blue suit is crafted from high-quality wool blend fabric for exceptional comfort and durability.",
            category: "suits"
        },
        {
            id: 2,
            name: "Classic Black Tuxedo",
            price: 349.99,
            originalPrice: 449.99,
            image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "The perfect tuxedo for formal occasions with satin lapels and matching trousers.",
            category: "suits"
        },
        // Add 10 more suits
    ],
    shirts: [
        {
            id: 101,
            name: "Classic White Dress Shirt",
            price: 59.99,
            originalPrice: 79.99,
            image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "100% cotton dress shirt with spread collar and double cuffs.",
            category: "shirts"
        },
        {
            id: 102,
            name: "Blue Oxford Button-Down",
            price: 49.99,
            originalPrice: 69.99,
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Versatile oxford shirt perfect for business casual or smart casual occasions.",
            category: "shirts"
        },
        // Add 10 more shirts
    ],
    shoes: [
        {
            id: 201,
            name: "Oxford Leather Dress Shoes",
            price: 129.99,
            originalPrice: 159.99,
            image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Classic black oxford shoes made from genuine leather with cushioned insoles.",
            category: "shoes"
        },
        {
            id: 202,
            name: "Brown Brogue Dress Shoes",
            price: 149.99,
            originalPrice: 179.99,
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            description: "Elegant brogue detailing with comfortable leather soles.",
            category: "shoes"
        },
        // Add 10 more shoes
    ],
    // Add other categories with 12 products each
};

// Shopping Cart
let cart = [];

// DOM Elements
const pages = document.querySelectorAll('.page');
const cartCount = document.getElementById('cart-count');
const featuredProductsGrid = document.getElementById('featured-products');
const shopProductsGrid = document.getElementById('shop-products');
const categoryTitle = document.getElementById('category-title');
const productCount = document.getElementById('product-count');
const cartItemsList = document.getElementById('cart-items-list');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTax = document.getElementById('cart-tax');
const cartTotal = document.getElementById('cart-total');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
    loadFeaturedProducts();
    updateCartCount();
});

// Page Navigation
function showPage(pageName, category = null) {
    // Hide all pages
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Show the requested page
    const page = document.getElementById(`${pageName}-page`);
    if (page) {
        page.style.display = 'block';
    }

    // Special handling for shop page with category
    if (pageName === 'shop') {
        loadShopProducts(category);
    }
}

// Product Loading Functions
function loadFeaturedProducts() {
    featuredProductsGrid.innerHTML = '';
    
    // Get 6 random products from all categories
    const allProducts = [];
    Object.values(products).forEach(category => {
        allProducts.push(...category);
    });
    
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);
    
    selected.forEach(product => {
        featuredProductsGrid.appendChild(createProductCard(product));
    });
}

function loadShopProducts(category = null) {
    shopProductsGrid.innerHTML = '';
    
    let productsToShow = [];
    if (category && products[category]) {
        // Show products from specific category
        productsToShow = products[category];
        categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    } else {
        // Show all products
        Object.values(products).forEach(cat => {
            productsToShow.push(...cat);
        });
        categoryTitle.textContent = 'All Products';
    }
    
    productCount.textContent = `Showing ${productsToShow.length} products`;
    
    productsToShow.forEach(product => {
        shopProductsGrid.appendChild(createProductCard(product));
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => showProductDetail(product);
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
            <h3>${product.name}</h3>
            <div class="product-price">
                <span class="current-price">R${product.price.toFixed(2)}</span>
                <span class="original-price">R${product.originalPrice.toFixed(2)}</span>
                <span class="discount">${discount}% OFF</span>
            </div>
        </div>
    `;
    
    return card;
}

function showProductDetail(product) {
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('main-product-image').src = product.image;
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    document.querySelector('.current-price').textContent = `R${product.price.toFixed(2)}`;
    document.querySelector('.original-price').textContent = `R${product.originalPrice.toFixed(2)}`;
    document.querySelector('.discount').textContent = `${discount}% OFF`;
    
    document.getElementById('product-description').querySelector('p').textContent = product.description;
    
    // Store current product in data attribute for cart
    document.getElementById('add-to-cart').dataset.productId = product.id;
    
    showPage('product');
}

// Product Page Functions
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = thumbnail.src;
    
    document.querySelectorAll('.thumbnail').forEach(img => {
        img.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

function adjustQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let newValue = parseInt(quantityInput.value) + change;
    if (newValue < 1) newValue = 1;
    quantityInput.value = newValue;
}

function changeTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
        if (content.id === tabName) {
            content.classList.add('active');
        }
    });
}

// Cart Functions
function addToCart() {
    const productId = parseInt(document.getElementById('add-to-cart').dataset.productId);
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    
    if (!size || !color) {
        alert('Please select size and color');
        return;
    }
    
    // Find the product in our data
    let product;
    Object.values(products).some(category => {
        return category.some(p => {
            if (p.id === productId) {
                product = p;
                return true;
            }
            return false;
        });
    });
    
    if (!product) return;
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId && item.size === size && item.color === color);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            size,
            color,
            quantity,
            image: product.image
        });
    }
    
    updateCartCount();
    alert('Product added to cart!');
}

function updateCart() {
    // This would update quantities based on inputs in the cart page
    // For now, we'll just reload the cart display
    displayCartItems();
}

function displayCartItems() {
    cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>Your cart is empty</p>';
        cartSubtotal.textContent = '$0.00';
        cartTax.textContent = '$0.00';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-product">
                <img src="${item.image}" alt="${item.name}">
                <div class="product-details">
                    <h3>${item.name}</h3>
                    <p>Size: ${item.size}</p>
                    <p>Color: ${item.color}</p>
                    <button class="remove-item" onclick="removeCartItem(${item.id}, '${item.size}', '${item.color}')">Remove</button>
                </div>
            </div>
            <div class="item-price">$${item.price.toFixed(2)}</div>
            <div class="item-quantity">
                <div class="quantity-selector">
                    <button class="quantity-btn minus" onclick="adjustCartQuantity(${item.id}, '${item.size}', '${item.color}', -1)">-</button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateCartItemQuantity(${item.id}, '${item.size}', '${item.color}', this.value)">
                    <button class="quantity-btn plus" onclick="adjustCartQuantity(${item.id}, '${item.size}', '${item.color}', 1)">+</button>
                </div>
            </div>
            <div class="item-subtotal">$${itemTotal.toFixed(2)}</div>
        `;
        
        cartItemsList.appendChild(cartItem);
    });
    
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTax.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function removeCartItem(id, size, color) {
    cart = cart.filter(item => !(item.id === id && item.size === size && item.color === color));
    updateCartCount();
    displayCartItems();
}

function adjustCartQuantity(id, size, color, change) {
    const item = cart.find(item => item.id === id && item.size === size && item.color === color);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1;
        displayCartItems();
        updateCartCount();
    }
}

function updateCartItemQuantity(id, size, color, newQuantity) {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) return;
    
    const item = cart.find(item => item.id === id && item.size === size && item.color === color);
    if (item) {
        item.quantity = quantity;
        displayCartItems();
        updateCartCount();
    }
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

function checkout() {
    alert('Checkout functionality would be implemented here');
    // In a real app, this would redirect to a checkout page or open a checkout modal
}

// Filter Functions
function applyFilters() {
    const priceFilter = document.getElementById('price-filter').value;
    const sortBy = document.getElementById('sort-by').value;
    
    let filteredProducts = [];
    Object.values(products).forEach(category => {
        filteredProducts.push(...category);
    });
    
    // Apply price filter
    if (priceFilter !== 'all') {
        const [min, max] = priceFilter.split('-').map(part => {
            if (part.endsWith('+')) {
                return parseFloat(part.slice(0, -1));
            }
            return parseFloat(part);
        });
        
        filteredProducts = filteredProducts.filter(product => {
            if (priceFilter.endsWith('+')) {
                return product.price >= min;
            }
            return product.price >= min && product.price <= max;
        });
    }
    
    // Apply sorting
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Default sorting (by ID or whatever)
            break;
    }
    
    // Display filtered products
    shopProductsGrid.innerHTML = '';
    productCount.textContent = `Showing ${filteredProducts.length} products`;
    filteredProducts.forEach(product => {
        shopProductsGrid.appendChild(createProductCard(product));
    });
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});