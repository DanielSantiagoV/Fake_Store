/**
 * ShopSmart - Aplicación E-commerce (Versión Completa)
 * Archivo principal de JavaScript con sistema de pago simulado
 *
 * Esta aplicación permite:
 * - Navegar y filtrar productos
 * - Usar un carrito de compras
 * - Realizar checkout y simular pago
 * - Navegación responsive
 */

// ==================== INICIO DE LA APLICACIÓN ====================
// Este archivo contiene toda la lógica de la versión completa de ShopSmart (con pagos)
// Cada bloque y función está comentado en español para facilitar la comprensión.

document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== GESTIÓN DEL ESTADO GLOBAL ====================
    /**
     * Variables de estado de la aplicación
     * Aquí se guarda toda la información principal que usa la tienda
     */
    const appState = {
        allProducts: [],           // Todos los productos descargados de la API
        cart: {},                  // Productos actuales en el carrito
        activeCategory: 'all',     // Categoría de productos seleccionada
        isLoading: false           // Estado de carga para mejorar la experiencia de usuario
    };

    // ==================== REFERENCIAS A ELEMENTOS DEL DOM ====================
    /**
     * Referencias a los elementos del HTML, organizadas por funcionalidad
     * Así es más fácil mantener y entender qué elementos se usan
     */
    const elements = {
        // Elementos relacionados con productos
        productGrid: document.querySelector('.product-grid'),
        searchInput: document.getElementById('product-search-input'),
        filterButtonsContainer: document.querySelector('.filter-buttons-container'),
        sortContainer: document.querySelector('.sort-container'),
        
        // Cart-related elements
        cartSidebar: document.querySelector('.cart-sidebar'),
        cartOverlay: document.querySelector('.cart-overlay'),
        cartToggleBtn: document.getElementById('cart-toggle-btn'),
        closeCartBtn: document.querySelector('.close-cart-btn'),
        cartItemsContainer: document.querySelector('.cart-items-container'),
        cartItemCount: document.querySelector('.cart-item-count'),
        cartSubtotalPrice: document.getElementById('cart-subtotal-price'),
        checkoutBtn: document.querySelector('.checkout-btn'),
        
        // Navigation and views
        views: document.querySelectorAll('.view'),
        navLinks: document.querySelectorAll('.nav-links a, .nav-logo, .back-to-shop-btn'),
        
        // Mobile menu elements
        mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
        mobileMenu: document.getElementById('mobile-menu'),
        
        // Payment form elements
        paymentForm: document.getElementById('payment-form'),
        cardNumberInput: document.getElementById('card-number'),
        expiryDateInput: document.getElementById('expiry-date'),
        cvcInput: document.getElementById('cvc'),
        cardTypeIcon: document.getElementById('card-type-icon'),
        cardLogos: document.querySelectorAll('.card-logo'),
        
        // Checkout summary elements
        checkoutSummaryContainer: document.getElementById('checkout-summary-items'),
        checkoutTotalPriceEl: document.getElementById('checkout-total-price')
    };

    // ==================== APPLICATION INITIALIZATION ====================
    /**
     * Main initialization function
     * Sets up the application when the DOM is ready
     */
    async function initializeApplication() {
        console.log('🚀 Inicializando la aplicación ShopSmart...');
        
        try {
            // Verifica si existe el botón del menú móvil
            const mobileBtn = document.getElementById('mobile-menu-toggle');
            if (mobileBtn) {
                console.log('✅ Botón de menú móvil encontrado');
            } else {
                console.error('❌ Botón de menú móvil no encontrado');
            }
            
            // Muestra mensaje de bienvenida
            showDemoMessage('¡Bienvenido a ShopSmart! 🛍️', 'info');
            
            // Muestra la vista inicial (Home)
            showView('home-view');
            
            // Carga el carrito guardado en el navegador
            loadCartFromLocalStorage();
            updateCartUI();
            
            // Descarga los productos de la API
            await fetchProducts();
            
            // Configura todos los eventos de la app
            setupEventListeners();
            
            console.log('✅ ¡Aplicación inicializada correctamente!');
            
            // Muestra mensaje de listo para comprar
            setTimeout(() => {
                showDemoMessage('¡Listo para comprar! Explora nuestros productos 🎉', 'success');
            }, 1000);
            
        } catch (error) {
            console.error('❌ Error al inicializar la aplicación:', error);
            showDemoMessage('Error al inicializar la aplicación. Por favor, recarga la página.', 'error');
        }
    }

    // ==================== PRODUCT MANAGEMENT ====================
    /**
     * Fetches products from the Fake Store API
     * Handles loading states and error scenarios
     */
    async function fetchProducts() {
        console.log('📦 Descargando productos de la API...');
        
        try {
            appState.isLoading = true;
            showLoadingSkeletons();
            
            const response = await fetch('https://fakestoreapi.com/products');
            
            if (!response.ok) {
                throw new Error(`Error HTTP! status: ${response.status}`);
            }
            
            appState.allProducts = await response.json();
            console.log(`✅ Se cargaron ${appState.allProducts.length} productos correctamente`);
            
            // Crea los filtros con los nuevos datos
            populateFilters();
            
            // Si estamos en la vista de productos, los muestra
            if (document.querySelector('#products-view.active')) {
                renderProducts(appState.allProducts);
            }
            
        } catch (error) {
            console.error('❌ Error al descargar productos:', error);
            
            if (document.querySelector('#products-view.active')) {
                elements.productGrid.innerHTML = `
                    <div class="error-message">
                        <i class="fa-solid fa-exclamation-triangle"></i>
                        <p>No se pudieron cargar los productos en este momento.</p>
                        <button onclick="location.reload()" class="retry-btn">Intentar de nuevo</button>
                    </div>
                `;
            }
        } finally {
            appState.isLoading = false;
        }
    }

    /**
     * Renders products in the product grid
     * Creates beautiful product cards with all necessary information
     */
    function renderProducts(productsToRender) {
        console.log(`🎨 Mostrando ${productsToRender.length} productos...`);
        
        // Limpia la cuadrícula antes de mostrar
        elements.productGrid.innerHTML = '';
        
        // Si no hay productos, muestra mensaje de vacío
        if (productsToRender.length === 0) {
            elements.productGrid.innerHTML = `
                <div class="no-results-message">
                    <i class="fa-solid fa-search"></i>
                    <p>No se encontraron productos que coincidan con tu búsqueda.</p>
                    <p>Prueba ajustando tu búsqueda o filtros.</p>
                </div>
            `;
            return;
        }
        
        // Crea las tarjetas de producto
        productsToRender.forEach(product => {
            const productCard = createProductCard(product);
            elements.productGrid.appendChild(productCard);
        });
    }

    /**
     * Creates a single product card element
     * Handles product data formatting and card structure
     */
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Truncate long product titles for better UI
        const truncatedTitle = product.title.length > 50 
            ? product.title.substring(0, 50) + '...' 
            : product.title;
        
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <p class="product-name">${truncatedTitle}</p>
                <p class="product-category">${product.category}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-product-id="${product.id}">
                    <i class="fa-solid fa-cart-plus"></i>
                    Add to Cart
                </button>
            </div>
        `;
        
        return card;
    }

    /**
     * Shows loading skeleton cards while products are being fetched
     * Provides better user experience during loading
     */
    function showLoadingSkeletons() {
        console.log('⏳ Mostrando tarjetas de carga...');
        
        elements.productGrid.innerHTML = '';
        
        // Create 8 skeleton cards
        for (let i = 0; i < 8; i++) {
            const skeletonCard = document.createElement('div');
            skeletonCard.className = 'product-card skeleton-card';
            skeletonCard.innerHTML = `
                <div class="product-image-container skeleton"></div>
                <div class="product-info">
                    <p class="product-name skeleton" style="height: 40px; margin: 0 auto;"></p>
                    <p class="product-category skeleton" style="width: 60%; height: 20px; margin: 8px auto;"></p>
                    <p class="product-price skeleton" style="width: 40%; height: 30px; margin: 12px auto;"></p>
                    <div class="add-to-cart-btn skeleton" style="height: 45px; margin-top: 16px;"></div>
                </div>
            `;
            elements.productGrid.appendChild(skeletonCard);
        }
    }

    // ==================== SHOPPING CART FUNCTIONALITY ====================
    /**
     * Agrega un producto al carrito de compras
     * Si el producto ya existe en el carrito, aumenta la cantidad
     */
    function addToCart(productId) {
        const product = appState.allProducts.find(prod => prod.id == productId);
        
        if (!product) {
            console.error('❌ Producto no encontrado:', productId);
            showDemoMessage('Producto no encontrado. Por favor, intenta nuevamente.', 'error');
            return;
        }
        
        // Verifica si el producto ya está en el carrito
        if (appState.cart[productId]) {
            appState.cart[productId].quantity++;
            showDemoMessage(`Cantidad aumentada de "${product.title.substring(0, 25)}..."`, 'cart');
            console.log(`🛒 Cantidad aumentada de ${product.title} en el carrito`);
        } else {
            appState.cart[productId] = { ...product, quantity: 1 };
            showDemoMessage(`"${product.title.substring(0, 25)}..." agregado al carrito!`, 'cart');
            console.log(`🛒 ${product.title} agregado al carrito`);
        }
        
        updateAndSaveCart();
    }

    /**
     * Actualiza la cantidad de un producto en el carrito
     * Si la cantidad es 0, elimina el producto del carrito
     */
    function updateItemQuantity(productId, newQuantity) {
        if (!appState.cart[productId]) return;
        
        const productName = appState.cart[productId].title.substring(0, 25) + '...';
        
        if (newQuantity > 0) {
            appState.cart[productId].quantity = newQuantity;
            showDemoMessage(`Cantidad actualizada de "${productName}"`, 'cart');
            console.log(`🛒 Cantidad actualizada de ${productName} a ${newQuantity}`);
        } else {
            delete appState.cart[productId];
            showDemoMessage(`"${productName}" eliminado del carrito`, 'cart');
            console.log(`🗑️ ${productName} eliminado del carrito`);
        }
        
        updateAndSaveCart();
    }

    /**
     * Actualiza la interfaz del carrito y guarda en localStorage
     * Función central para la gestión del estado del carrito
     */
    function updateAndSaveCart() {
        updateCartUI();
        saveCartToLocalStorage();
    }

    /**
     * Actualiza la representación visual del carrito
     * Muestra los productos, cantidades y subtotal
     */
    function updateCartUI() {
        // Limpia la visualización actual del carrito
        elements.cartItemsContainer.innerHTML = '';
        
        let subtotal = 0;
        let totalItems = 0;
        const cartItems = Object.values(appState.cart);
        
        // Si el carrito está vacío, muestra mensaje
        if (cartItems.length === 0) {
            elements.cartItemsContainer.innerHTML = `
                <div class="cart-empty-message">
                    <i class="fa-solid fa-shopping-cart"></i>
                    <p>Tu carrito está vacío.</p>
                    <p>¡Agrega productos para comenzar!</p>
                </div>
            `;
        } else {
            // Muestra cada producto en el carrito
            cartItems.forEach(item => {
                subtotal += item.price * item.quantity;
                totalItems += item.quantity;
                const cartItemElement = createCartItemElement(item);
                elements.cartItemsContainer.appendChild(cartItemElement);
            });
        }
        // Actualiza el resumen del carrito
        elements.cartSubtotalPrice.textContent = `$${subtotal.toFixed(2)}`;
        elements.cartItemCount.textContent = totalItems;
        elements.cartItemCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    /**
     * Creates a single cart item element
     * Handles cart item display and controls
     */
    function createCartItemElement(item) {
        const element = document.createElement('div');
        element.className = 'cart-item';
        
        element.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-img">
            <div class="cart-item-info">
                <p class="cart-item-title">${item.title}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" data-id="${item.id}" data-action="decrease">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" data-id="${item.id}" data-action="increase">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">
                        <i class="fa-solid fa-trash"></i>
                        Remove
                    </button>
                </div>
            </div>
        `;
        
        return element;
    }

    /**
     * Clears all items from the cart
     */
    function clearCart() {
        const itemCount = Object.keys(appState.cart).length;
        appState.cart = {};
        updateAndSaveCart();
        showDemoMessage(`Cart cleared! Removed ${itemCount} items`, 'cart');
        console.log(`🗑️ Cart cleared - removed ${itemCount} items`);
    }

    /**
     * Saves cart data to localStorage for persistence
     */
    function saveCartToLocalStorage() {
        try {
            localStorage.setItem('shoppingCart', JSON.stringify(appState.cart));
            console.log('💾 Cart saved to localStorage');
        } catch (error) {
            console.error('❌ Error saving cart to localStorage:', error);
            showDemoMessage('Failed to save cart data', 'error');
        }
    }

    /**
     * Loads cart data from localStorage on app startup
     */
    function loadCartFromLocalStorage() {
        try {
            const savedCart = localStorage.getItem('shoppingCart');
            appState.cart = savedCart ? JSON.parse(savedCart) : {};
            const itemCount = Object.keys(appState.cart).length;
            console.log(`📦 Cart loaded from localStorage - ${itemCount} items`);
            if (itemCount > 0) {
                showDemoMessage(`Loaded ${itemCount} items from previous session`, 'info');
            }
        } catch (error) {
            console.error('❌ Error loading cart from localStorage:', error);
            appState.cart = {};
            showDemoMessage('Failed to load previous cart data', 'warning');
        }
    }

    /**
     * Toggles the cart sidebar visibility
     */
    function toggleCart() {
        const isOpening = !elements.cartSidebar.classList.contains('open');
        elements.cartSidebar.classList.toggle('open');
        elements.cartOverlay.classList.toggle('open');
        
        if (isOpening) {
            const itemCount = Object.keys(appState.cart).length;
            if (itemCount > 0) {
                showDemoMessage(`Cart opened with ${itemCount} items`, 'cart');
            } else {
                showDemoMessage('Cart opened - ready to add items!', 'cart');
            }
        }
    }

    // ==================== MOBILE NAVIGATION (MINIMAL) ====================
    function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        const toggle = document.getElementById('mobile-menu-toggle');
        if (!menu || !toggle) return;
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
            toggle.textContent = '☰';
        } else {
            menu.style.display = 'block';
            toggle.textContent = '✕';
        }
    }

    function closeMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        const toggle = document.getElementById('mobile-menu-toggle');
        if (menu) menu.style.display = 'none';
        if (toggle) toggle.textContent = '☰';
    }

    // ==================== FILTERING AND SEARCH ====================
    /**
     * Populates filter buttons and sort options
     * Creates dynamic filters based on available products
     */
    function populateFilters() {
        // Get unique categories from products
        const categories = ['all', ...new Set(appState.allProducts.map(p => p.category))];
        
        // Create filter buttons
        elements.filterButtonsContainer.innerHTML = categories.map(category => `
            <button class="filter-btn ${category === appState.activeCategory ? 'active' : ''}" 
                    data-category="${category}">
                ${category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
        `).join('');
        
        // Create sort dropdown
        elements.sortContainer.innerHTML = `
            <select id="sort-filter">
                <option value="default">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
            </select>
        `;
    }

    /**
     * Applies current filters and sorting to products
     * Handles search, category filtering, and sorting
     */
    function applyFiltersAndSort() {
        const searchTerm = elements.searchInput.value.toLowerCase();
        const sortValue = document.getElementById('sort-filter')?.value || 'default';
        
        // Filter products by category and search term
        let filteredProducts = appState.allProducts.filter(product => {
            const matchesCategory = appState.activeCategory === 'all' || 
                                  product.category === appState.activeCategory;
            const matchesSearch = product.title.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
        
        // Apply sorting
        switch (sortValue) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }
        
        // Show feedback for filtering results
        if (searchTerm && filteredProducts.length > 0) {
            showDemoMessage(`Found ${filteredProducts.length} products matching "${searchTerm}"`, 'search');
        } else if (searchTerm && filteredProducts.length === 0) {
            showDemoMessage(`No products found for "${searchTerm}"`, 'warning');
        }
        
        renderProducts(filteredProducts);
    }

    // ==================== NAVIGATION AND VIEWS ====================
    /**
     * Shows a specific view and handles navigation state
     * Manages view transitions and active states
     */
    function showView(viewId) {
        console.log(`🔄 Switching to view: ${viewId}`);
        
        // Hide all views
        elements.views.forEach(view => view.classList.add('hidden'));
        
        // Remove active class from all nav links
        document.querySelectorAll('.nav-links a').forEach(link => 
            link.classList.remove('active')
        );
        
        // Show target view
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.remove('hidden');
        }
        
        // Update active nav link
        const activeLink = document.querySelector(`.nav-links a[data-view="${viewId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Show navigation feedback
        const viewNames = {
            'home-view': 'Home',
            'products-view': 'Products',
            'about-view': 'About Us',
            'contact-view': 'Contact',
            'checkout-view': 'Checkout',
            'success-view': 'Success'
        };
        
        const viewName = viewNames[viewId] || viewId;
        showDemoMessage(`Navigated to ${viewName}`, 'info');
        
        // Special handling for products view
        if (viewId === 'products-view' && appState.allProducts.length > 0) {
            showLoadingSkeletons();
            setTimeout(applyFiltersAndSort, 100);
        }
        
        // Scroll to top for better UX
        window.scrollTo(0, 0);
    }

    // ==================== CHECKOUT AND PAYMENT ====================
    /**
     * Renderiza el resumen del checkout con los productos del carrito
     * Muestra los detalles del pedido antes de pagar
     */
    function renderCheckoutSummary() {
        elements.checkoutSummaryContainer.innerHTML = '';
        let subtotal = 0;
        // Recorre los productos del carrito y los muestra en el resumen
        Object.values(appState.cart).forEach(item => {
            subtotal += item.price * item.quantity;
            elements.checkoutSummaryContainer.innerHTML += `
                <div class="summary-item">
                    <img src="${item.image}" class="summary-item-img" alt="${item.title}">
                    <div class="summary-item-info">
                        <p class="summary-item-title">${item.title}</p>
                        <p class="summary-item-details">Cantidad: ${item.quantity}</p>
                    </div>
                    <p class="summary-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
        });
        // Muestra el total
        elements.checkoutTotalPriceEl.textContent = `$${subtotal.toFixed(2)}`;
    }

    /**
     * Maneja el envío del formulario de pago
     * Simula el procesamiento del pago con validación
     */
    function handlePayment(event) {
        event.preventDefault();
        const submitButton = event.target.querySelector('.pay-btn');
        // Valida el formulario
        if (!event.target.checkValidity()) {
            showDemoMessage('Por favor, completa todos los campos correctamente', 'error');
            return;
        }
        // Deshabilita el botón y muestra estado de procesamiento
        submitButton.disabled = true;
        submitButton.textContent = 'Procesando...';
        // Muestra mensaje de procesamiento
        showDemoMessage('Procesando tu pago...', 'payment');
        // (Solo para demo) Muestra los datos en consola
        console.log('💳 Procesando pago con los siguientes datos:');
        console.log('Nombre en tarjeta:', document.getElementById('card-name').value);
        console.log('Número de tarjeta:', elements.cardNumberInput.value);
        console.log('Fecha de expiración:', elements.expiryDateInput.value);
        console.log('CVC:', elements.cvcInput.value);
        // Simula el procesamiento con mensajes y retrasos
        setTimeout(() => {
            showDemoMessage('Validando información de pago...', 'payment');
        }, 500);
        setTimeout(() => {
            showDemoMessage('Procesando transacción...', 'payment');
        }, 1500);
        setTimeout(() => {
            showDemoMessage('¡Pago exitoso! 🎉', 'success');
            clearCart();
            showView('success-view');
            // Reinicia el formulario
            elements.paymentForm.reset();
            updateCardType(null);
            // Habilita el botón nuevamente
            submitButton.disabled = false;
            submitButton.textContent = 'Pagar Ahora';
            console.log('✅ Pago procesado correctamente');
        }, 2000);
    }

    // ==================== UTILITIES AND UX ENHANCEMENTS ====================
    /**
     * Muestra una notificación tipo toast al usuario
     * Proporciona retroalimentación para acciones del usuario
     */
    function showToast(message) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        // Elimina el toast después de 3 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }

    /**
     * Muestra un mensaje de demostración con estilo y emojis
     * Proporciona retroalimentación visual para interacciones del usuario
     */
    function showDemoMessage(message, type = 'info') {
        // Verifica si estamos en móvil y reduce la frecuencia de mensajes
        const isMobile = window.innerWidth <= 768;
        // Omite algunos mensajes en móvil para evitar saturar
        if (isMobile && (type === 'info' || type === 'filter')) {
            return; // No mostrar mensajes de info y filtro en móvil
        }
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        // Agrega emoji según el tipo de mensaje
        const emojis = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️',
            'cart': '🛒',
            'payment': '💳',
            'search': '🔍',
            'filter': '🎯'
        };
        const emoji = emojis[type] || 'ℹ️';
        toast.innerHTML = `<span class="toast-emoji">${emoji}</span> <span class="toast-text">${message}</span>`;
        toastContainer.appendChild(toast);
        // Duración más corta en móvil para menos intrusión
        const duration = isMobile ? 2500 : 4000;
        // Elimina el toast después de la duración
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, duration);
    }

    /**
     * Da formato al número de tarjeta con espacios
     * Mejora la legibilidad del número de tarjeta
     */
    function formatCardNumber(event) {
        let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = value.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            event.target.value = parts.join(' ');
        } else {
            event.target.value = value;
        }
    }

    /**
     * Da formato a la fecha de expiración con barra
     * Asegura el formato MM/AA
     */
    function formatExpiryDate(event) {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        event.target.value = value;
    }

    /**
     * Actualiza la detección y visualización del tipo de tarjeta
     * Muestra el logo de la tarjeta según el número
     */
    function updateCardType(cardType) {
        // Quita la clase activa de todos los logos
        elements.cardLogos.forEach(logo => logo.classList.remove('active'));
        elements.cardTypeIcon.className = 'hidden';
        if (cardType) {
            const logo = document.querySelector(`.card-logo[data-card="${cardType}"]`);
            if (logo) {
                logo.classList.add('active');
            }
            elements.cardTypeIcon.className = `fab fa-cc-${cardType}`;
        }
    }

    // ==================== EVENT LISTENERS ====================
    /**
     * Configura todos los event listeners de la aplicación
     * Organiza todas las interacciones del usuario en un solo lugar
     */
    function setupEventListeners() {
        // Interacciones con la cuadrícula de productos (agregar al carrito)
        elements.productGrid.addEventListener('click', handleProductGridClick);
        // Interacciones con el carrito (cambiar cantidad, eliminar)
        elements.cartItemsContainer.addEventListener('click', handleCartItemClick);
        // Búsqueda de productos
        elements.searchInput.addEventListener('input', applyFiltersAndSort);
        // Filtros y ordenamiento
        elements.filterButtonsContainer.addEventListener('click', handleFilterClick);
        elements.sortContainer.addEventListener('change', handleSortChange);
        // Botones para abrir/cerrar carrito
        elements.cartToggleBtn.addEventListener('click', toggleCart);
        elements.closeCartBtn.addEventListener('click', toggleCart);
        elements.cartOverlay.addEventListener('click', toggleCart);
        // Navegación entre vistas
        elements.navLinks.forEach(link => {
            link.addEventListener('click', handleNavigationClick);
        });
        // Checkout
        elements.checkoutBtn.addEventListener('click', handleCheckoutClick);
        // Formulario de pago
        elements.paymentForm.addEventListener('submit', handlePayment);
        elements.cardNumberInput.addEventListener('input', handleCardNumberInput);
        elements.expiryDateInput.addEventListener('input', formatExpiryDate);
        elements.cvcInput.addEventListener('input', handleCvcInput);
        // Menú móvil
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', toggleMobileMenu);
            console.log('Botón de menú móvil conectado');
        } else {
            console.error('Botón de menú móvil no encontrado');
        }
        console.log('✅ Event listeners configurados correctamente');
    }

    // Funciones manejadoras de eventos para mejor organización
    function handleProductGridClick(event) {
        if (event.target.matches('.add-to-cart-btn')) {
            addToCart(event.target.dataset.productId);
        }
    }

    function handleCartItemClick(event) {
        const productId = event.target.dataset.id;
        if (!productId) return;
        if (event.target.matches('.quantity-btn')) {
            const action = event.target.dataset.action;
            const currentQuantity = appState.cart[productId].quantity;
            const newQuantity = action === 'increase' ? currentQuantity + 1 : currentQuantity - 1;
            updateItemQuantity(productId, newQuantity);
        } else if (event.target.matches('.remove-item-btn')) {
            updateItemQuantity(productId, 0);
        }
    }

    function handleFilterClick(event) {
        if (!event.target.matches('.filter-btn')) return;
        const previousCategory = appState.activeCategory;
        appState.activeCategory = event.target.dataset.category;
        // Actualiza el botón de filtro activo
        elements.filterButtonsContainer.querySelector('.active').classList.remove('active');
        event.target.classList.add('active');
        // Muestra retroalimentación
        if (appState.activeCategory === 'all') {
            showDemoMessage('Mostrando todos los productos', 'filter');
        } else {
            showDemoMessage(`Filtrado por ${appState.activeCategory}`, 'filter');
        }
        applyFiltersAndSort();
    }

    function handleSortChange(event) {
        if (event.target.id === 'sort-filter') {
            const sortValue = event.target.value;
            const sortMessages = {
                'price-asc': 'Ordenado por precio: menor a mayor',
                'price-desc': 'Ordenado por precio: mayor a menor',
                'name-asc': 'Ordenado por nombre: A-Z',
                'name-desc': 'Ordenado por nombre: Z-A'
            };
            if (sortMessages[sortValue]) {
                showDemoMessage(sortMessages[sortValue], 'filter');
            }
            applyFiltersAndSort();
        }
    }

    function handleNavigationClick(event) {
        event.preventDefault();
        showView(event.currentTarget.dataset.view);
        // Cierra el menú móvil si está abierto
        closeMobileMenu();
    }

    function handleCheckoutClick() {
        if (Object.keys(appState.cart).length > 0) {
            const itemCount = Object.keys(appState.cart).length;
            const totalItems = Object.values(appState.cart).reduce((sum, item) => sum + item.quantity, 0);
            showDemoMessage(`Procediendo al checkout con ${totalItems} productos`, 'payment');
            toggleCart();
            renderCheckoutSummary();
            showView('checkout-view');
        } else {
            showDemoMessage('Tu carrito está vacío. ¡Agrega productos primero!', 'warning');
        }
    }

    function handleCardNumberInput(event) {
        formatCardNumber(event);
        // Detecta el tipo de tarjeta
        const cardTypes = {
            visa: /^4/,
            mastercard: /^5[1-5]/,
            amex: /^3[47]/
        };
        const cardNumber = event.target.value.replace(/\s+/g, '');
        let detectedType = null;
        for (const [type, pattern] of Object.entries(cardTypes)) {
            if (pattern.test(cardNumber)) {
                detectedType = type;
                break;
            }
        }
        updateCardType(detectedType);
    }

    function handleCvcInput(event) {
        event.target.value = event.target.value.replace(/\D/g, '').substring(0, 3);
    }

    // ==================== MAIN EXECUTION ====================
    initializeApplication();
});