# ⚡ Mini Amazon - Modern E-Commerce Front Page

A sleek, responsive, and highly interactive E-Commerce web application built using modern web standards (Vanilla HTML5, CSS3, and JavaScript ES6+). Features a futuristic dark-mode design with neon cyan/purple accents, modal product details, real-time quantity controls, and local persistent cart storage.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

- **Responsive Product Grid**: Dynamic rendering of tech products with auto-adjusting responsive card layouts.
- **Product Details Modal**: Popup modal providing extended product details, ratings, descriptions, and quick add-to-cart functionality.
- **Interactive Cart Controls**:
  - Seamless toggle between `+ Add` button and dynamic `[- Qty +]` controls directly on product cards.
  - Interactive toast notifications confirming items added/updated/removed.
- **Cart Persistence**: Integrated browser `localStorage` syncing so cart state persists across page refreshes.
- **Dedicated Cart Page**: Itemized cart breakdown, real-time total price calculation, quantity modifier controls, and a simulated checkout flow.
- **Modern Glassmorphism UI**: High-contrast dark theme with glass-like transparency, glowing accents, and smooth hover effects.

---

## 📁 Project Structure

```text
mini-amazon/
│
├── index.html          # Main shop landing page (Product grid & Modal)
├── cart.html           # Dedicated cart summary & checkout page
├── style.css           # Global stylesheet with modern CSS variable theme
│
├── js/
│   ├── data.js         # Product dataset (15 Tech & Electronic products)
│   ├── app.js          # Main page logic (grid rendering, modal, & cart actions)
│   └── cart.js         # Cart page logic (localStorage parsing & checkout)
│
└── README.md           # Project documentation
