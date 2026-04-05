# 💊 MediStore  
### Your Trusted Online Medicine Shop 

---
## 🔗 Live Demo

👉 **Live Site:** https://medi-store-pi.vercel.app

👉 **Server Repo:** https://github.com/Shohel-Raj/MediStore-Backend


---

## 📌 Project Overview

**MediStore** is a full-stack e-commerce web application designed for purchasing over-the-counter (OTC) medicines online.  

It enables:
- Customers to browse, purchase, and track medicines  
- Sellers to manage inventory and fulfill orders  
- Admins to oversee the entire platform  

The platform ensures a seamless, secure, and user-friendly experience for all roles.

---

## 🚀 Features

### 🌐 Public Features
- Browse all available medicines  
- Search and filter by category, price, manufacturer  
- View detailed medicine information  

---

### 👤 Customer Features
- Register & login  
- Add medicines to cart  
- Place orders (Cash on Delivery)  
- Track order status  
- Leave reviews  
- Manage profile  

---

### 🏪 Seller Features
- Register & login as seller  
- Add, edit, delete medicines  
- Manage stock levels  
- View incoming orders  
- Update order status  

---

### 🛡️ Admin Features
- Manage all users (ban/unban)  
- View all medicines and orders  
- Manage categories  
- Platform-wide monitoring  

---

## 👥 Roles & Permissions

| Role      | Description                     | Permissions |
|----------|--------------------------------|------------|
| Customer | Medicine buyers                | Browse, cart, order, review |
| Seller   | Medicine vendors/pharmacies   | Manage inventory, orders |
| Admin    | Platform moderators           | Manage users, orders, categories |

> 💡 Users select roles during registration. Admin accounts should be seeded in the database.

---

## 🧱 Tech Stack

### Frontend
- Next.js (App Router)
- React 19
- Tailwind CSS
- Radix UI
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB / Prisma (based on implementation)

### Authentication
- Better Auth

---

## 📂 Project Structure (Simplified)
```
📦src
 ┣ 📂actions
 ┃ ┣ 📜create-product.action.ts
 ┃ ┗ 📜getUserData.ts
 ┣ 📂app
 ┃ ┣ 📂(auth)
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📂register
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(commonLayout)
 ┃ ┃ ┣ 📂about
 ┃ ┃ ┃ ┗ 📜page.jsx
 ┃ ┃ ┣ 📂all-medicine
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂blogs
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂cart
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂privacy
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂refund
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂terms
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂verify-email
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂(dashboardLayout)
 ┃ ┃ ┣ 📂@admin
 ┃ ┃ ┃ ┣ 📂admin-dashboard
 ┃ ┃ ┃ ┃ ┣ 📂create-product
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂my-products
 ┃ ┃ ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂orders
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂products
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂users
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📜loading.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.jsx
 ┃ ┃ ┃ ┗ 📜default.jsx
 ┃ ┃ ┣ 📂@seller
 ┃ ┃ ┃ ┣ 📂seller-dashboard
 ┃ ┃ ┃ ┃ ┣ 📂create-product
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂my-products
 ┃ ┃ ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂orders
 ┃ ┃ ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜default.jsx
 ┃ ┃ ┣ 📂@user
 ┃ ┃ ┃ ┣ 📂dashboard
 ┃ ┃ ┃ ┃ ┣ 📂orders
 ┃ ┃ ┃ ┃ ┃ ┣ 📂[orderId]
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜default.jsx
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┗ 📜not-found.tsx
 ┣ 📂components
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📜AdminOverviewClient.tsx
 ┃ ┃ ┣ 📜AdminUserManagement.tsx
 ┃ ┃ ┣ 📜MonthlySalesChart.tsx
 ┃ ┃ ┗ 📜ProductsTable.tsx
 ┃ ┣ 📂All-product
 ┃ ┃ ┣ 📜AddToCartButton.tsx
 ┃ ┃ ┣ 📜ProductCard.tsx
 ┃ ┃ ┗ 📜ProductFilterClient.tsx
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜login-form.tsx
 ┃ ┃ ┗ 📜register-form.tsx
 ┃ ┣ 📂cart
 ┃ ┃ ┣ 📜CartIconButton.tsx
 ┃ ┃ ┣ 📜CartItemActions.tsx
 ┃ ┃ ┣ 📜CartItemCard.tsx
 ┃ ┃ ┣ 📜CartItemsPanel.tsx
 ┃ ┃ ┣ 📜CheckoutButton.tsx
 ┃ ┃ ┗ 📜OrderSummaryPanel.tsx
 ┃ ┣ 📂home
 ┃ ┃ ┣ 📜hero-slider.tsx
 ┃ ┃ ┣ 📜ProductSection.tsx
 ┃ ┃ ┗ 📜SectionWrapper.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜app-sidebar.tsx
 ┃ ┃ ┣ 📜dashboard-topbar.tsx
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜ModeToggle.tsx
 ┃ ┃ ┗ 📜Navbar.tsx
 ┃ ┣ 📂logo
 ┃ ┃ ┗ 📜logo.tsx
 ┃ ┣ 📂module
 ┃ ┃ ┗ 📂seller
 ┃ ┃ ┃ ┣ 📜CreateProductFormClient.tsx
 ┃ ┃ ┃ ┣ 📜CreateProductFormServer.tsx
 ┃ ┃ ┃ ┗ 📜CreateProductSubmitButton.tsx
 ┃ ┣ 📂orders
 ┃ ┃ ┗ 📜OrdersTable.tsx
 ┃ ┣ 📂seller
 ┃ ┃ ┣ 📜DeleteProductButton.tsx
 ┃ ┃ ┣ 📜ProductsTable.tsx
 ┃ ┃ ┣ 📜SellerOverViewClient.tsx
 ┃ ┃ ┣ 📜UpdateOrderItemStatusButton.tsx
 ┃ ┃ ┗ 📜UpdateProductFormClient.tsx
 ┃ ┣ 📂ui
 ┃ ┃ ┣ 📜accordion.tsx
 ┃ ┃ ┣ 📜avatar.tsx
 ┃ ┃ ┣ 📜breadcrumb.tsx
 ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┣ 📜card.tsx
 ┃ ┃ ┣ 📜carousel.tsx
 ┃ ┃ ┣ 📜dropdown-menu.tsx
 ┃ ┃ ┣ 📜field.tsx
 ┃ ┃ ┣ 📜input.tsx
 ┃ ┃ ┣ 📜label.tsx
 ┃ ┃ ┣ 📜navigation-menu.tsx
 ┃ ┃ ┣ 📜select.tsx
 ┃ ┃ ┣ 📜separator.tsx
 ┃ ┃ ┣ 📜sheet.tsx
 ┃ ┃ ┣ 📜sidebar.tsx
 ┃ ┃ ┣ 📜skeleton.tsx
 ┃ ┃ ┣ 📜sonner.tsx
 ┃ ┃ ┣ 📜table.tsx
 ┃ ┃ ┣ 📜textarea.tsx
 ┃ ┃ ┗ 📜tooltip.tsx
 ┃ ┗ 📂verify-email
 ┃ ┃ ┗ 📜VerifyEmailClient.tsx
 ┣ 📂hooks
 ┃ ┗ 📜use-mobile.ts
 ┣ 📂lib
 ┃ ┣ 📜auth-client.ts
 ┃ ┣ 📜auth.ts
 ┃ ┗ 📜utils.ts
 ┣ 📂providers
 ┃ ┗ 📜theme-provider.tsx
 ┣ 📂services
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📜admin.service.client.ts
 ┃ ┃ ┗ 📜admin.service.server.ts
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜cartService.server.ts
 ┃ ┃ ┗ 📜order.server.ts
 ┃ ┣ 📂home
 ┃ ┃ ┗ 📜home.server.ts
 ┃ ┣ 📂product
 ┃ ┃ ┣ 📜getMyProducts.client.ts
 ┃ ┃ ┣ 📜getMyProducts.server.ts
 ┃ ┃ ┗ 📜productService.server.ts
 ┃ ┗ 📂seller
 ┃ ┃ ┣ 📜getSellerDashboardData.ts
 ┃ ┃ ┣ 📜orderService.client.ts
 ┃ ┃ ┣ 📜orderService.ts
 ┃ ┃ ┗ 📜sellerDashboardService.ts
 ┗ 📜proxy.ts
 ```

 ## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Shohel-Raj/MediStore-Frontend

# Navigate to project
cd medistore

# Install dependencies
npm install

# Run development server
npm run dev

```
# Add .env

```
NEXT_PUBLIC_API_URL=http://localhost:5000
API_URL=http://localhost:5000

NEXT_PUBLIC_BASE_URL=http://localhost:3000

```