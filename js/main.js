/**
 * ShopSmart - Aplicación E-commerce (Versión Simple)
 * Archivo principal de JavaScript sin sistema de pago
 *
 * Esta aplicación permite:
 * - Navegar y filtrar productos
 * - Usar un carrito de compras
 * - Ver bolsa de compras
 * - Navegación responsive
 *
 * NO INCLUYE SISTEMA DE PAGO
 */

// ==================== CONFIGURACIÓN GLOBAL ====================
// URLs y configuraciones globales de la aplicación
const CONFIG = {
    API_URL: 'https://fakestoreapi.com/products',
    TAX_RATE: 0.085, // 8.5% para demo
    SKELETON_COUNT: 8,
    TOAST_DURATION: {
        MOBILE: 2500,
        DESKTOP: 4000
    }
};

// ==================== INICIO DE LA APLICACIÓN ====================
// Este archivo contiene toda la lógica de la versión simple de ShopSmart (sin pagos)
// Cada bloque y función está comentado en español para facilitar la comprensión.

document.addEventListener('DOMContentLoaded', () => {
    // Siempre ocultar el menú móvil al cargar la página
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.remove('show');
    }
    
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
        productGrid: document.querySelector('.product-grid'), // Contenedor de productos
        searchInput: document.getElementById('product-search-input'), // Barra de búsqueda
        filterButtonsContainer: document.querySelector('.filter-buttons-container'), // Filtros
        sortContainer: document.querySelector('.sort-container'), // Ordenamiento
        
        // Elementos relacionados con el carrito
        cartSidebar: document.querySelector('.cart-sidebar'), // Barra lateral del carrito
        cartOverlay: document.querySelector('.cart-overlay'), // Fondo oscuro del carrito
        cartToggleBtn: document.getElementById('cart-toggle-btn'), // Botón para abrir/cerrar carrito
        closeCartBtn: document.querySelector('.close-cart-btn'), // Botón para cerrar carrito
        cartItemsContainer: document.querySelector('.cart-items-container'), // Lista de productos en carrito
        cartItemCount: document.querySelector('.cart-item-count'), // Contador de productos en carrito
        cartSubtotalPrice: document.getElementById('cart-subtotal-price'), // Subtotal del carrito
        viewBagBtn: document.getElementById('view-bag-btn'), // Botón para ver bolsa de compras
        
        // Navegación y vistas
        views: document.querySelectorAll('.view'), // Todas las vistas/páginas
        navLinks: document.querySelectorAll('.nav-links a, .nav-logo'), // Enlaces de navegación
        
        // Elementos del menú móvil
        mobileMenuToggle: document.getElementById('mobile-menu-toggle'), // Botón hamburguesa
        mobileMenu: document.getElementById('mobile-menu'), // Menú móvil
        
        // Elementos de la bolsa de compras
        shoppingBagItems: document.getElementById('shopping-bag-items'), // Lista de productos en bolsa
        bagItemCount: document.getElementById('bag-item-count'), // Contador de productos en bolsa
        bagSubtotal: document.getElementById('bag-subtotal'), // Subtotal en bolsa
        bagTax: document.getElementById('bag-tax'), // Impuesto en bolsa
        bagTotal: document.getElementById('bag-total'), // Total en bolsa
        continueShoppingBtn: document.getElementById('continue-shopping-btn') // Botón para seguir comprando
    };

    // ==================== INICIALIZACIÓN DE LA APLICACIÓN ====================
    /**
     * Función principal de inicialización
     * Configura la aplicación cuando el DOM está listo
     */
    async function initializeApplication() {
        console.log('🚀 Inicializando la aplicación ShopSmart Simple...');
        try {
            // Verifica si existe el botón del menú móvil
            const mobileBtn = document.getElementById('mobile-menu-toggle');
            if (mobileBtn) {
                console.log('✅ Botón de menú móvil encontrado');
            } else {
                console.error('❌ Botón de menú móvil no encontrado');
            }
            // Muestra mensaje de bienvenida
            showDemoMessage('¡Bienvenido a ShopSmart Simple! 🛍️', 'info');
            // Muestra la vista inicial (Home)
            showView('home-view');
            // Carga el carrito guardado en el navegador
            loadCartFromLocalStorage();
            updateCartUI();
            // Descarga los productos de la API
            await fetchProducts();
            // Configura todos los eventos de la app
            setupEventListeners();
            console.log('✅ ¡Aplicación simple inicializada correctamente!');
            // Muestra mensaje de listo para comprar
            setTimeout(() => {
                showDemoMessage('¡Listo para comprar! Explora nuestros productos 🎉', 'success');
            }, 1000);
        } catch (error) {
            console.error('❌ Error al inicializar la aplicación:', error);
            showDemoMessage('Error al inicializar la aplicación. Por favor, recarga la página.', 'error');
        }
    }

    // ==================== GESTIÓN DE PRODUCTOS ====================
    /**
     * Descarga los productos desde la API Fake Store
     * Maneja estados de carga y errores
     */
    async function fetchProducts() {
        console.log('📦 Descargando productos de la API...');
        try {
            appState.isLoading = true;
            showLoadingSkeletons(); // Muestra tarjetas de carga
            const response = await fetch(CONFIG.API_URL);
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
                showErrorMessage();
            }
        } finally {
            appState.isLoading = false;
        }
    }

    /**
     * Muestra mensaje de error cuando falla la carga de productos
     */
    function showErrorMessage() {
        clearElement(elements.productGrid);
        
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-message';
        
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-exclamation-triangle';
        
        const message = document.createElement('p');
        message.textContent = 'No se pudieron cargar los productos en este momento.';
        
        const retryBtn = document.createElement('button');
        retryBtn.className = 'retry-btn';
        retryBtn.textContent = 'Intentar de nuevo';
        retryBtn.onclick = () => location.reload();
        
        errorContainer.appendChild(icon);
        errorContainer.appendChild(message);
        errorContainer.appendChild(retryBtn);
        
        elements.productGrid.appendChild(errorContainer);
    }

    /**
     * Muestra los productos en la cuadrícula principal
     * Crea tarjetas de producto con toda la información necesaria
     */
    function renderProducts(productsToRender) {
        console.log(`🎨 Mostrando ${productsToRender.length} productos...`);
        // Limpia la cuadrícula antes de mostrar
        clearElement(elements.productGrid);
        
        // Si no hay productos, muestra mensaje de vacío
        if (productsToRender.length === 0) {
            showNoResultsMessage();
            return;
        }
        
        // Crea las tarjetas de producto
        productsToRender.forEach(producto => {
            const productCard = createProductCard(producto);
            elements.productGrid.appendChild(productCard);
        });
    }

    /**
     * Muestra mensaje cuando no hay resultados de búsqueda
     */
    function showNoResultsMessage() {
        const noResultsContainer = document.createElement('div');
        noResultsContainer.className = 'no-results-message';
        
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-search';
        
        const message1 = document.createElement('p');
        message1.textContent = 'No se encontraron productos que coincidan con tu búsqueda.';
        
        const message2 = document.createElement('p');
        message2.textContent = 'Prueba ajustando tu búsqueda o filtros.';
        
        noResultsContainer.appendChild(icon);
        noResultsContainer.appendChild(message1);
        noResultsContainer.appendChild(message2);
        
        elements.productGrid.appendChild(noResultsContainer);
    }

    /**
     * Crea una sola tarjeta de producto
     * Maneja el formato de datos del producto y la estructura de la tarjeta
     */
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        // Trunca títulos largos de producto para mejor UI
        const truncatedTitle = product.title.length > 50 
            ? product.title.substring(0, 50) + '...' 
            : product.title;
        
        // Crear contenedor de imagen
        const imageContainer = document.createElement('div');
        imageContainer.className = 'product-image-container';
        
        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.title;
        image.loading = 'lazy';
        
        // Crear contenedor de información
        const infoContainer = document.createElement('div');
        infoContainer.className = 'product-info';
        
        const name = document.createElement('p');
        name.className = 'product-name';
        name.textContent = truncatedTitle;
        
        const category = document.createElement('p');
        category.className = 'product-category';
        category.textContent = product.category;
        
        const price = document.createElement('p');
        price.className = 'product-price';
        price.textContent = `$${product.price.toFixed(2)}`;
        
        const addButton = document.createElement('button');
        addButton.className = 'add-to-cart-btn';
        addButton.dataset.productId = product.id;
        
        const cartIcon = document.createElement('i');
        cartIcon.className = 'fa-solid fa-cart-plus';
        
        const buttonText = document.createTextNode(' Add to Cart');
        
        // Ensamblar elementos
        imageContainer.appendChild(image);
        addButton.appendChild(cartIcon);
        addButton.appendChild(buttonText);
        
        infoContainer.appendChild(name);
        infoContainer.appendChild(category);
        infoContainer.appendChild(price);
        infoContainer.appendChild(addButton);
        
        card.appendChild(imageContainer);
        card.appendChild(infoContainer);
        
        return card;
    }

    /**
     * Muestra tarjetas de carga mientras se cargan los productos
     * Proporciona mejor experiencia de usuario durante la carga
     */
    function showLoadingSkeletons() {
        console.log('⏳ Mostrando tarjetas de carga...');
        
        clearElement(elements.productGrid);
        
        // Crea tarjetas de carga usando la constante global
        for (let i = 0; i < CONFIG.SKELETON_COUNT; i++) {
            const skeletonCard = createSkeletonCard();
            elements.productGrid.appendChild(skeletonCard);
        }
    }

    /**
     * Crea una tarjeta de carga (skeleton)
     */
    function createSkeletonCard() {
        const skeletonCard = document.createElement('div');
        skeletonCard.className = 'product-card skeleton-card';
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'product-image-container skeleton';
        
        const infoContainer = document.createElement('div');
        infoContainer.className = 'product-info';
        
        const nameSkeleton = document.createElement('p');
        nameSkeleton.className = 'product-name skeleton';
        nameSkeleton.style.cssText = 'height: 40px; margin: 0 auto;';
        
        const categorySkeleton = document.createElement('p');
        categorySkeleton.className = 'product-category skeleton';
        categorySkeleton.style.cssText = 'width: 60%; height: 20px; margin: 8px auto;';
        
        const priceSkeleton = document.createElement('p');
        priceSkeleton.className = 'product-price skeleton';
        priceSkeleton.style.cssText = 'width: 40%; height: 30px; margin: 12px auto;';
        
        const buttonSkeleton = document.createElement('div');
        buttonSkeleton.className = 'add-to-cart-btn skeleton';
        buttonSkeleton.style.cssText = 'height: 45px; margin-top: 16px;';
        
        infoContainer.appendChild(nameSkeleton);
        infoContainer.appendChild(categorySkeleton);
        infoContainer.appendChild(priceSkeleton);
        infoContainer.appendChild(buttonSkeleton);
        
        skeletonCard.appendChild(imageContainer);
        skeletonCard.appendChild(infoContainer);
        
        return skeletonCard;
    }

    // ==================== SHOPPING CART FUNCTIONALITY ====================
    /**
     * Agrega un producto al carrito de compras
     * Maneja incrementos de cantidad para elementos existentes
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
            showDemoMessage(`Increased quantity of "${product.title.substring(0, 25)}..."`, 'cart');
            console.log(`🛒 Increased quantity of ${product.title} in cart`);
        } else {
            appState.cart[productId] = { ...product, quantity: 1 };
            showDemoMessage(`"${product.title.substring(0, 25)}..." added to cart!`, 'cart');
            console.log(`🛒 Added ${product.title} to cart`);
        }
        
        updateAndSaveCart();
    }

    /**
     * Actualiza la cantidad de un elemento en el carrito
     * Elimina el elemento si la cantidad se vuelve 0
     */
    function updateItemQuantity(productId, newQuantity) {
        if (!appState.cart[productId]) return;
        
        const productName = appState.cart[productId].title.substring(0, 25) + '...';
        
        if (newQuantity > 0) {
            appState.cart[productId].quantity = newQuantity;
            showDemoMessage(`Updated quantity of "${productName}"`, 'cart');
            console.log(`🛒 Updated quantity of ${productName} to ${newQuantity}`);
        } else {
            delete appState.cart[productId];
            showDemoMessage(`"${productName}" removed from cart`, 'cart');
            console.log(`🗑️ Removed ${productName} from cart`);
        }
        
        updateAndSaveCart();
    }

    /**
     * Actualiza la interfaz de usuario del carrito y guarda en localStorage
     * Función central para el estado del carrito
     */
    function updateAndSaveCart() {
        updateCartUI();
        updateShoppingBagUI();
        saveCartToLocalStorage();
    }

    /**
     * Actualiza la representación visual del carrito
     * Maneja estado de carrito vacío y visualización de elementos
     */
    function updateCartUI() {
        // Limpia la interfaz de usuario actual del carrito
        clearElement(elements.cartItemsContainer);
        
        let subtotal = 0;
        let totalItems = 0;
        const cartItems = Object.values(appState.cart);
        
        // Maneja carrito vacío
        if (cartItems.length === 0) {
            showEmptyCartMessage();
        } else {
            // Renderiza cada elemento del carrito
            cartItems.forEach(item => {
                subtotal += item.price * item.quantity;
                totalItems += item.quantity;
                
                const cartItemElement = createCartItemElement(item);
                elements.cartItemsContainer.appendChild(cartItemElement);
            });
            
            // Agregar botón de vaciar carrito
            const clearCartBtn = createClearCartButton();
            elements.cartItemsContainer.appendChild(clearCartBtn);
        }
        
        // Actualiza resumen del carrito
        elements.cartSubtotalPrice.textContent = `$${subtotal.toFixed(2)}`;
        elements.cartItemCount.textContent = totalItems;
        elements.cartItemCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    /**
     * Muestra mensaje de carrito vacío
     */
    function showEmptyCartMessage() {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'cart-empty-message';
        
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-shopping-cart';
        
        const message1 = document.createElement('p');
        message1.textContent = 'Your cart is empty.';
        
        const message2 = document.createElement('p');
        message2.textContent = 'Add some products to get started!';
        
        emptyMessage.appendChild(icon);
        emptyMessage.appendChild(message1);
        emptyMessage.appendChild(message2);
        
        elements.cartItemsContainer.appendChild(emptyMessage);
    }

    /**
     * Crea botón para vaciar el carrito
     */
    function createClearCartButton() {
        const clearBtn = document.createElement('button');
        clearBtn.className = 'clear-cart-btn';
        clearBtn.onclick = clearCart;
        
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-trash-alt';
        
        const text = document.createTextNode(' Clear Cart');
        
        clearBtn.appendChild(icon);
        clearBtn.appendChild(text);
        
        return clearBtn;
    }

    /**
     * Actualiza la vista de bolsa de compras
     * Maneja la página de bolsa de compras dedicada
     */
    function updateShoppingBagUI() {
        if (!elements.shoppingBagItems) return;
        
        // Limpia la interfaz de usuario actual de bolsa de compras
        clearElement(elements.shoppingBagItems);
        
        let subtotal = 0;
        let totalItems = 0;
        const cartItems = Object.values(appState.cart);
        
        // Maneja carrito vacío
        if (cartItems.length === 0) {
            showEmptyShoppingBagMessage();
        } else {
            // Renderiza cada elemento del carrito en formato de bolsa de compras
            cartItems.forEach(item => {
                subtotal += item.price * item.quantity;
                totalItems += item.quantity;
                
                const shoppingBagItemElement = createShoppingBagItemElement(item);
                elements.shoppingBagItems.appendChild(shoppingBagItemElement);
            });
            
            // Agregar botón de vaciar carrito en la bolsa de compras
            const clearCartBtn = createClearCartButton();
            elements.shoppingBagItems.appendChild(clearCartBtn);
        }
        
        // Calcula impuesto usando la constante global
        const tax = subtotal * CONFIG.TAX_RATE;
        const total = subtotal + tax;
        
        // Actualiza resumen de bolsa de compras
        elements.bagItemCount.textContent = `(${totalItems} items)`;
        elements.bagSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        elements.bagTax.textContent = `$${tax.toFixed(2)}`;
        elements.bagTotal.textContent = `$${total.toFixed(2)}`;
    }

    /**
     * Muestra mensaje de bolsa de compras vacía
     */
    function showEmptyShoppingBagMessage() {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'cart-empty-message';
        
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-shopping-bag';
        
        const title = document.createElement('h3');
        title.textContent = 'Your shopping bag is empty';
        
        const message = document.createElement('p');
        message.textContent = 'Add some products to get started!';
        
        const continueBtn = document.createElement('button');
        continueBtn.className = 'continue-shopping-btn';
        continueBtn.onclick = () => showView('products-view');
        
        const btnIcon = document.createElement('i');
        btnIcon.className = 'fa-solid fa-arrow-left';
        
        const btnText = document.createTextNode(' Continue Shopping');
        
        continueBtn.appendChild(btnIcon);
        continueBtn.appendChild(btnText);
        
        emptyMessage.appendChild(icon);
        emptyMessage.appendChild(title);
        emptyMessage.appendChild(message);
        emptyMessage.appendChild(continueBtn);
        
        elements.shoppingBagItems.appendChild(emptyMessage);
    }

    /**
     * Crea un solo elemento de carrito
     * Maneja visualización y control de elementos del carrito
     */
    function createCartItemElement(item) {
        const element = document.createElement('div');
        element.className = 'cart-item';
        
        // Crear imagen
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;
        image.className = 'cart-item-img';
        
        // Crear contenedor de información
        const infoContainer = document.createElement('div');
        infoContainer.className = 'cart-item-info';
        
        const title = document.createElement('p');
        title.className = 'cart-item-title';
        title.textContent = item.title;
        
        const price = document.createElement('p');
        price.className = 'cart-item-price';
        price.textContent = `$${item.price.toFixed(2)}`;
        
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'cart-item-controls';
        
        // Crear controles de cantidad
        const quantityControls = document.createElement('div');
        quantityControls.className = 'quantity-controls';
        
        const decreaseBtn = document.createElement('button');
        decreaseBtn.className = 'quantity-btn';
        decreaseBtn.dataset.id = item.id;
        decreaseBtn.dataset.action = 'decrease';
        
        const decreaseIcon = document.createElement('i');
        decreaseIcon.className = 'fa-solid fa-minus';
        
        const quantityDisplay = document.createElement('span');
        quantityDisplay.className = 'quantity-display';
        quantityDisplay.textContent = item.quantity;
        
        const increaseBtn = document.createElement('button');
        increaseBtn.className = 'quantity-btn';
        increaseBtn.dataset.id = item.id;
        increaseBtn.dataset.action = 'increase';
        
        const increaseIcon = document.createElement('i');
        increaseIcon.className = 'fa-solid fa-plus';
        
        // Crear botón de eliminar
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-item-btn';
        removeBtn.dataset.id = item.id;
        
        const removeIcon = document.createElement('i');
        removeIcon.className = 'fa-solid fa-trash';
        
        const removeText = document.createTextNode(' Remove');
        
        // Ensamblar elementos
        decreaseBtn.appendChild(decreaseIcon);
        increaseBtn.appendChild(increaseIcon);
        removeBtn.appendChild(removeIcon);
        removeBtn.appendChild(removeText);
        
        quantityControls.appendChild(decreaseBtn);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(increaseBtn);
        
        controlsContainer.appendChild(quantityControls);
        controlsContainer.appendChild(removeBtn);
        
        infoContainer.appendChild(title);
        infoContainer.appendChild(price);
        infoContainer.appendChild(controlsContainer);
        
        element.appendChild(image);
        element.appendChild(infoContainer);
        
        return element;
    }

    /**
     * Crea un solo elemento de bolsa de compras
     * Maneja visualización y control de elementos de bolsa de compras
     */
    function createShoppingBagItemElement(item) {
        const element = document.createElement('div');
        element.className = 'cart-item';
        
        // Crear imagen
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;
        image.className = 'cart-item-img';
        
        // Crear contenedor de información
        const infoContainer = document.createElement('div');
        infoContainer.className = 'cart-item-info';
        
        const title = document.createElement('p');
        title.className = 'cart-item-title';
        title.textContent = item.title;
        
        const attributes = document.createElement('p');
        attributes.className = 'cart-item-attributes';
        attributes.textContent = `Category: ${item.category}`;
        
        const price = document.createElement('p');
        price.className = 'cart-item-price';
        price.textContent = `$${item.price.toFixed(2)}`;
        
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'cart-item-controls';
        
        // Crear controles de cantidad
        const quantityControls = document.createElement('div');
        quantityControls.className = 'quantity-controls';
        
        const decreaseBtn = document.createElement('button');
        decreaseBtn.className = 'quantity-btn';
        decreaseBtn.dataset.id = item.id;
        decreaseBtn.dataset.action = 'decrease';
        
        const decreaseIcon = document.createElement('i');
        decreaseIcon.className = 'fa-solid fa-minus';
        
        const quantityDisplay = document.createElement('span');
        quantityDisplay.className = 'quantity-display';
        quantityDisplay.textContent = item.quantity;
        
        const increaseBtn = document.createElement('button');
        increaseBtn.className = 'quantity-btn';
        increaseBtn.dataset.id = item.id;
        increaseBtn.dataset.action = 'increase';
        
        const increaseIcon = document.createElement('i');
        increaseIcon.className = 'fa-solid fa-plus';
        
        // Crear botón de eliminar
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-item-btn';
        removeBtn.dataset.id = item.id;
        
        const removeIcon = document.createElement('i');
        removeIcon.className = 'fa-solid fa-trash';
        
        const removeText = document.createTextNode(' Remove');
        
        // Ensamblar elementos
        decreaseBtn.appendChild(decreaseIcon);
        increaseBtn.appendChild(increaseIcon);
        removeBtn.appendChild(removeIcon);
        removeBtn.appendChild(removeText);
        
        quantityControls.appendChild(decreaseBtn);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(increaseBtn);
        
        controlsContainer.appendChild(quantityControls);
        controlsContainer.appendChild(removeBtn);
        
        infoContainer.appendChild(title);
        infoContainer.appendChild(attributes);
        infoContainer.appendChild(price);
        infoContainer.appendChild(controlsContainer);
        
        element.appendChild(image);
        element.appendChild(infoContainer);
        
        return element;
    }

    /**
     * Limpia todos los elementos del carrito
     */
    function clearCart() {
        const itemCount = Object.keys(appState.cart).length;
        if (itemCount === 0) {
            showDemoMessage('Cart is already empty!', 'info');
            return;
        }
        
        appState.cart = {};
        updateAndSaveCart();
        showDemoMessage(`Cart cleared! Removed ${itemCount} items`, 'cart');
        console.log(`🗑️ Cart cleared - removed ${itemCount} items`);
    }

    /**
     * Guarda datos del carrito en localStorage para persistencia
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
     * Carga datos del carrito desde localStorage en inicio de aplicación
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
     * Alterna la visibilidad de la barra lateral del carrito
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
     * Popula botones de filtro y opciones de orden
     * Crea filtros dinámicos basados en productos disponibles
     */
    function populateFilters() {
        // Obtén categorías únicas de productos
        const categories = ['all', ...new Set(appState.allProducts.map(p => p.category))];
        
        // Limpia contenedor de filtros
        clearElement(elements.filterButtonsContainer);
        
        // Crea botones de filtro
        categories.forEach(category => {
            const filterBtn = document.createElement('button');
            filterBtn.className = `filter-btn ${category === appState.activeCategory ? 'active' : ''}`;
            filterBtn.dataset.category = category;
            filterBtn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            elements.filterButtonsContainer.appendChild(filterBtn);
        });
        
        // Limpia contenedor de ordenamiento
        clearElement(elements.sortContainer);
        
        // Crea menú de ordenación
        const sortSelect = document.createElement('select');
        sortSelect.id = 'sort-filter';
        
        const options = [
            { value: 'default', text: 'Sort by' },
            { value: 'price-asc', text: 'Price: Low to High' },
            { value: 'price-desc', text: 'Price: High to Low' },
            { value: 'name-asc', text: 'Name: A-Z' },
            { value: 'name-desc', text: 'Name: Z-A' }
        ];
        
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            sortSelect.appendChild(optionElement);
        });
        
        elements.sortContainer.appendChild(sortSelect);
    }

    /**
     * Aplica filtros y orden actuales a productos
     * Maneja búsqueda, filtrado por categoría y orden
     */
    function applyFiltersAndSort() {
        const searchTerm = elements.searchInput.value.toLowerCase();
        const sortValue = document.getElementById('sort-filter')?.value || 'default';
        
        // Filtra productos por categoría y término de búsqueda
        let filteredProducts = appState.allProducts.filter(product => {
            const matchesCategory = appState.activeCategory === 'all' || 
                                  product.category === appState.activeCategory;
            const matchesSearch = product.title.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
        
        // Aplica ordenación
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
        
        // Muestra retroalimentación para resultados de filtrado
        if (searchTerm && filteredProducts.length > 0) {
            showDemoMessage(`Found ${filteredProducts.length} products matching "${searchTerm}"`, 'search');
        } else if (searchTerm && filteredProducts.length === 0) {
            showDemoMessage(`No products found for "${searchTerm}"`, 'warning');
        }
        
        renderProducts(filteredProducts);
    }

    // ==================== NAVIGATION AND VIEWS ====================
    /**
     * Muestra una vista específica y maneja estado de navegación
     * Maneja transiciones de vista y estados activos
     */
    function showView(viewId) {
        console.log(`🔄 Switching to view: ${viewId}`);
        
        // Oculta todas las vistas
        elements.views.forEach(view => view.classList.add('hidden'));
        
        // Elimina clase activa de todos los enlaces de navegación
        document.querySelectorAll('.nav-links a').forEach(link => 
            link.classList.remove('active')
        );
        
        // Muestra vista objetivo
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.remove('hidden');
        }
        
        // Actualiza enlace de navegación activo
        const activeLink = document.querySelector(`.nav-links a[data-view="${viewId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Muestra retroalimentación de navegación
        const viewNames = {
            'home-view': 'Home',
            'products-view': 'Products',
            'about-view': 'About Us',
            'contact-view': 'Contact',
            'shopping-bag-view': 'Shopping Bag'
        };
        
        const viewName = viewNames[viewId] || viewId;
        showDemoMessage(`Navigated to ${viewName}`, 'info');
        
        // Manejo especial para vista de productos
        if (viewId === 'products-view' && appState.allProducts.length > 0) {
            showLoadingSkeletons();
            setTimeout(applyFiltersAndSort, 100);
        }
        
        // Manejo especial para vista de bolsa de compras
        if (viewId === 'shopping-bag-view') {
            updateShoppingBagUI();
        }
        
        // Scroll to top for better UX
        window.scrollTo(0, 0);
    }

    // ==================== UTILITIES AND UX ENHANCEMENTS ====================
    /**
     * Limpia un elemento del DOM de forma segura
     */
    function clearElement(element) {
        if (element) {
            element.innerHTML = '';
        }
    }

    /**
     * Muestra un mensaje de demostración con estilo mejorado y emojis
     * Proporciona retroalimentación rica para interacciones de usuario
     */
    function showDemoMessage(message, type = 'info') {
        // Verifica si estamos en móvil y reduce la frecuencia de mensajes
        const isMobile = window.innerWidth <= 768;
        
        // Salta algunos mensajes en móvil para reducir ruido
        if (isMobile && (type === 'info' || type === 'filter')) {
            return; // No mostrar mensajes de info y filtro en móvil
        }
        
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        // Agrega emoji basado en tipo de mensaje
        const emojis = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️',
            'cart': '🛒',
            'search': '🔍',
            'filter': '🎯'
        };
        
        const emoji = emojis[type] || 'ℹ️';
        
        const emojiSpan = document.createElement('span');
        emojiSpan.className = 'toast-emoji';
        emojiSpan.textContent = emoji;
        
        const textSpan = document.createElement('span');
        textSpan.className = 'toast-text';
        textSpan.textContent = message;
        
        toast.appendChild(emojiSpan);
        toast.appendChild(textSpan);
        
        toastContainer.appendChild(toast);
        
        // Duración más corta en móvil para experiencia menos intrusiva
        const duration = isMobile ? CONFIG.TOAST_DURATION.MOBILE : CONFIG.TOAST_DURATION.DESKTOP;
        
        // Elimina toast después de duración específica
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, duration);
    }

    // ==================== EVENT LISTENERS SETUP ====================
    /**
     * Configura todos los eventos de la aplicación
     * Organiza todas las interacciones de usuario en un lugar
     */
    function setupEventListeners() {
        console.log('🎧 Configurando eventos...');
        
        // Interacciones de cuadrícula de producto
        elements.productGrid.addEventListener('click', handleProductGridClick);
        
        // Interacciones de carrito
        elements.cartItemsContainer.addEventListener('click', handleCartItemClick);
        
        // Interacciones de bolsa de compras
        if (elements.shoppingBagItems) {
            elements.shoppingBagItems.addEventListener('click', handleCartItemClick);
        }
        
        // Funcionalidad de búsqueda
        elements.searchInput.addEventListener('input', applyFiltersAndSort);
        
        // Interacciones de filtro
        elements.filterButtonsContainer.addEventListener('click', handleFilterClick);
        elements.sortContainer.addEventListener('change', handleSortChange);
        
        // Interacciones de carrito
        elements.cartToggleBtn.addEventListener('click', toggleCart);
        elements.closeCartBtn.addEventListener('click', toggleCart);
        elements.cartOverlay.addEventListener('click', toggleCart);
        
        // Navegación
        elements.navLinks.forEach(link => {
            link.addEventListener('click', handleNavigationClick);
        });
        
        // Menú móvil - simple y directo
        const mobileToggle = document.getElementById('mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', toggleMobileMenu);
            console.log('Mobile menu button found and connected');
        } else {
            console.error('Mobile menu button not found');
        }
        
        // Botón de bolsa de compras
        if (elements.viewBagBtn) {
            elements.viewBagBtn.addEventListener('click', handleViewBagClick);
        }
        
        // Botón para seguir comprando
        if (elements.continueShoppingBtn) {
            elements.continueShoppingBtn.addEventListener('click', handleContinueShoppingClick);
        }
        
        // Cierra en clic de enlace
        if (elements.mobileMenu) elements.mobileMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') closeMobileMenu();
        });
        
        // Optional: Cierra en clic fuera
        document.addEventListener('click', function(e) {
            if (elements.mobileMenu && elements.mobileMenu.style.display === 'block' && !elements.mobileMenu.contains(e.target) && e.target.id !== 'mobile-menu-toggle') {
                closeMobileMenu();
            }
        });
        
        console.log('✅ Event listeners set up successfully!');
    }

    // Event handler functions for better organization
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
        
        appState.activeCategory = event.target.dataset.category;
        
        // Actualiza botón de filtro activo
        elements.filterButtonsContainer.querySelector('.active').classList.remove('active');
        event.target.classList.add('active');
        
        // Muestra retroalimentación de filtro
        if (appState.activeCategory === 'all') {
            showDemoMessage('Showing all products', 'filter');
        } else {
            showDemoMessage(`Filtered by ${appState.activeCategory}`, 'filter');
        }
        
        applyFiltersAndSort();
    }

    function handleSortChange(event) {
        if (event.target.id === 'sort-filter') {
            const sortValue = event.target.value;
            const sortMessages = {
                'price-asc': 'Sorted by price: Low to High',
                'price-desc': 'Sorted by price: High to Low',
                'name-asc': 'Sorted by name: A-Z',
                'name-desc': 'Sorted by name: Z-A'
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
        
        // Cierra menú móvil si está abierto
        closeMobileMenu();
    }

    function handleViewBagClick() {
        if (Object.keys(appState.cart).length > 0) {
            toggleCart();
            showView('shopping-bag-view');
        } else {
            showDemoMessage('Your cart is empty. Add some products first!', 'warning');
        }
    }

    function handleContinueShoppingClick() {
        showView('products-view');
    }

    // ==================== APPLICATION STARTUP ====================
    // Initialize the application when DOM is ready
    initializeApplication();
}); 