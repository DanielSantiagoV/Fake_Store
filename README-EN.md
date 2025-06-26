# 🛒 ShopSmart - E-commerce Web Application

<p align="center"> 
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="MIT License">
</p>

---

## 📝 Project Description

ShopSmart is a modern, responsive e-commerce web application built with HTML5, CSS3, and vanilla JavaScript. It offers a smooth shopping experience with product navigation, filtering, cart management, and (in the advanced version) a simulated payment system. Designed for clarity, usability, and mobile compatibility, ShopSmart is ideal for learning, prototyping, or as a foundation for real online stores. 🚀

### ✨ Main Features

- **🛍️ Product Catalog**: Browse, filter, and sort products
- **🛒 Shopping Cart**: Add, remove, and update items with persistent storage
- **🔎 Filters & Sorting**: By category, price, and search
- **💳 Payment Simulation**: (Advanced version) Checkout with payment form
- **📱 Responsive Design**: Optimized for all devices, with mobile navigation
- **🔔 User Feedback**: Toast messages for actions and errors
- **🌙 Modern UI**: Clean, accessible, and visually appealing

---

## 🚀 Implemented Features

### Core Features
- ✅ Product listing with images, price, and details
- ✅ Add/remove/update cart items
- ✅ Cart persistence (localStorage)
- ✅ Product filtering and sorting
- ✅ Responsive mobile navigation menu
- ✅ Toast notifications for user actions

### Advanced Features (index2.html + main.js)
- **💳 Payment System**: Simulated checkout with form validation
- **🧾 Order Summary**: Review before confirming purchase
- **🔒 Input Validation**: Prevents invalid data at checkout

---

## 🔧 Technologies Used

### Frontend
- **HTML5**: Semantic, accessible markup
- **CSS3**: 
  - Responsive layout with Flexbox & media queries
  - Modern UI with transitions and effects
  - Shared stylesheet for all versions
- **JavaScript (ES6+)**:
  - Modular, event-driven code
  - Cart and product logic
  - DOM manipulation and localStorage

### Development Tools
- **Git & GitHub**: Version control
- **VSCode**: Recommended editor

---

## 🗂️ Project Structure

```
Proyect javascript/
│
├── index2.html         # Main app with payment system
├── main.js             # JS logic for advanced version
├── index-simple.html   # Simple version (no payment)
├── main-simple.js      # JS logic for simple version
├── style.css           # Shared styles
├── README.md           # Main documentation (Spanish)
├── README-EN.md        # English documentation
├── README-VERSIONS.md  # Version comparison
├── QUICK-START.md      # Quick usage guide
├── analisis.md         # Design & technical analysis
├── wireframes.md       # Wireframes & user flows
└── ...                 # Other docs
```

---

## 🎮 How to Use the Application

### Quick Start
1. Open `index-simple.html` for the basic shop (no payment)
2. Open `index2.html` for the full shop with payment simulation
3. Browse products, add to cart, and (in advanced version) checkout

See [QUICK-START.md](./docs/QUICK-START.md) for detailed steps.

---

## 🎨 Design and UX

### Color Palette
- **Primary**: #4F8EF7 (Blue)
- **Accent**: #F7C948 (Yellow)
- **Background**: #f9f9f9 (Light) / #222 (Dark elements)

### Design Features
- **🧩 Clean Layout**: Focus on usability and clarity
- **📱 Mobile-First**: Hamburger menu, touch-friendly controls
- **🔔 Feedback**: Toasts for actions/errors
- **♿ Accessibility**: Good contrast, keyboard navigation

---

## 💻 Code Architecture

### Main Structure
```javascript
// Example: Cart logic (main.js)
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
  // Add product, update localStorage, show toast
}

function renderCart() {
  // Update cart UI
}

// ... more modular functions for filtering, sorting, payment, etc.
```

### Code Features
- **🔧 Modular**: Functions for cart, filters, UI, payment
- **🛡️ Robust**: Handles edge cases and errors
- **⚡ Efficient**: Minimal DOM updates
- **📖 Readable**: Well-commented, clear naming
- **🔄 Maintainable**: Easy to extend (add products, features)

---

## 🧪 HIGHLIGHTED CODE

### Modern CSS Example
```css
:root {
  --primary: #4F8EF7;
  --accent: #F7C948;
  --bg: #f9f9f9;
  --text: #222;
  --transition: all 0.2s ease;
}

.button-primary {
  background: var(--primary);
  color: #fff;
  transition: var(--transition);
}
```

### JavaScript: Toast Notification
```javascript
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}
```

---

## 💬 Conclusion

ShopSmart demonstrates how to build a modern, user-friendly e-commerce site with only HTML, CSS, and JavaScript. It balances simplicity and functionality, making it a great base for learning or further development.

### Technical Achievements
- ✅ **Modern UI**: Clean, responsive, and accessible
- ✅ **Cart Persistence**: Data saved in browser
- ✅ **User Feedback**: Toasts and error handling
- ✅ **Versioned**: Two modes for different needs

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Developed with ❤️ by [Your Name]<br>
  📦 <b>ShopSmart E-commerce Project</b> 🛒
</p> 