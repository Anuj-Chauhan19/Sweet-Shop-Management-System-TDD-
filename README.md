# 🍬 Full-Stack Sweet Shop Application

A modern, responsive MERN Stack application for managing a sweet shop inventory. This project features a robust backend built with **Test-Driven Development (TDD)** and a beautiful, mobile-responsive frontend using **React & Tailwind CSS**.

---

## 🚀 Live Demo & Screenshots

### 📂 File Directory Structure
<img width="170" height="866" alt="image" src="https://github.com/user-attachments/assets/93eb6012-bb75-4cdc-8ceb-5e1efa7c3a1a" />


### 🌐 Website Preview

**For Admin**

<img width="1901" height="843" alt="image" src="https://github.com/user-attachments/assets/e98b663d-f1a2-4488-9714-3c780d3ffa43" />
<img width="1883" height="814" alt="image" src="https://github.com/user-attachments/assets/14da9324-0739-4dd1-b2c3-e3fce2cfd0c4" />
<img width="1880" height="826" alt="image" src="https://github.com/user-attachments/assets/5b466181-5c10-4471-8a69-673512191d52" />

**For User**

<img width="1892" height="823" alt="image" src="https://github.com/user-attachments/assets/b765d120-3d9d-4c81-8d34-b60625060c47" />
<img width="1898" height="825" alt="image" src="https://github.com/user-attachments/assets/5b5edda0-e748-4be4-90ce-9481a9fe763e" />
<img width="1902" height="825" alt="image" src="https://github.com/user-attachments/assets/7cf9ca63-77da-4928-85be-78c7d95d9aec" />
<img width="1905" height="818" alt="image" src="https://github.com/user-attachments/assets/665864f5-752e-43df-83cd-893601652364" />
<img width="1888" height="819" alt="image" src="https://github.com/user-attachments/assets/a5575534-2474-45a9-bdf7-b48af9d02bb4" />
<img width="1880" height="823" alt="image" src="https://github.com/user-attachments/assets/e36ef06f-a164-41dd-b4c9-866c28402842" />



---

## 🛠️ Tech Stack

### **Frontend**
* **React (Vite):** Fast, modern UI development.
* **Tailwind CSS:** Utility-first styling for a custom, responsive design.
* **Context API:** Global state management for Authentication.
* **Lucide React:** Modern, lightweight icons.
* **Axios:** For handling HTTP requests.

### **Backend**
* **Node.js & Express:** Scalable server-side logic.
* **MongoDB & Mongoose:** NoSQL database for flexible data modeling.
* **JWT (JSON Web Tokens):** Secure user authentication.
* **Jest & Supertest:** For rigorous Unit and Integration Testing (TDD).

---

## ✨ Key Features

* **Authentication:** Secure User Registration & Login (JWT-based).
* **Role-Based Access:**
    * **Customers:** Can browse, search, filter, and "purchase" sweets.
    * **Admins:** Have access to a dedicated **Dashboard** to Add, Delete, and Restock items.
* **Product Management:** Real-time inventory tracking (Stock decreases on purchase).
* **Advanced Search:** Filter sweets by Name or Category instantly.
* **Responsive Design:** Fully optimized for Desktops, Tablets, and Mobile phones.

---

### 📈 Project Evolution

The development process followed a structured, iterative workflow to ensure stability and code quality:

1.  **Phase 1: Backend Foundation (The TDD Approach)**
    * I started by defining the **API Requirements** (What endpoints do I need?).
    * Following TDD, I wrote **failing tests** (Red) using Jest & Supertest for the Sweets CRUD operations.
    * I implemented the **Controllers & Models** to make those tests pass (Green).
    * Finally, I refactored the code for better modularity (Refactor).

2.  **Phase 2: Database & Security**
    * Integrated **MongoDB** via Mongoose and designed the `User` and `Sweet` schemas.
    * Implemented **JWT Authentication** and `bcrypt` password hashing to secure the system.
    * Created middleware (`protect` and `admin`) to lock down sensitive routes like "Add Product" and "Delete."

3.  **Phase 3: Frontend Initialization**
    * Initialized the client using **Vite + React** for a fast development environment.
    * Configured **Tailwind CSS** and defined the custom "Citrus/Orange" color palette (`tailwind.config.js`).
    * Built reusable UI components like the `SweetCard` and the responsive `Navbar`.

4.  **Phase 4: Full-Stack Integration**
    * Connected the Frontend to the Backend using **Axios** with interceptors for token handling.
    * Implemented the **Auth Context** to manage user sessions globally across the app.
    * Built the **Admin Dashboard** to allow real-time management of the inventory via the UI.

5.  **Phase 5: Refinement & Mobile Optimization**
    * Refined the **Search & Filter** logic for instant results using React state.
    * Optimized the layout for **Mobile Devices** (implemented the Hamburger menu and responsive grids).
    * Added **Toast Notifications** (`react-toastify`) to provide immediate visual feedback to users.

## 🤖 My AI Usage

This project was built with the assistance of AI tools to accelerate development and learning:

* **Gemini (Google):**
    * Used for **Frontend Development** (React components, Tailwind styling).
    * Assisted with **Error Debugging** and specific implementation details.
    * Helped generate and format **Project Documentation** (including this README).

* **Claude AI (Anthropic):**
    * Used for **Backend Architecture** and Logic.
    * Provided guidance on **Test-Driven Development (TDD)** concepts and best practices.
    * Assisted in writing robust **Jest Tests** for the API.

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone (https://github.com/Anuj-Chauhan19/Sweet-Shop-Management-System-TDD-.git)
cd sweet-shop-mern
```
###2. Backend Setup
```bash
cd Backend
npm install
```

## Create a .env file in the Backend folder
echo "PORT=5000" > .env
echo "MONGO_URI=mongodb://127.0.0.1:27017/sweetshop" >> .env
echo "JWT_SECRET=your_super_secret_key" >> .env

# Start the Server
```bash
npm run dev
```

###3. Frontend Setup
```bash
cd client
npm install
```

# Start the React App
```bash
npm run dev
```

### Now visit http://localhost:5173 to view the app.

## 🧪 Testing Guidelines

You can test the robustness of the application by trying the following scenarios:

✅ **Product Management:**
* Add a sweet with a **valid category** (e.g., 'Chocolate', 'Gummy').
* Try adding a sweet with an **invalid category** (e.g., 'Pizza') to see the validation error.

✅ **User Transactions:**
* **Purchase** an item and verify that the stock count decreases immediately.
* Try to **buy an item with 0 stock** to ensure the system prevents the sale.

✅ **Inventory Control:**
* **Restock** an item via the Admin Dashboard and verify the updated count on the Home Page.
* **Delete** an item and confirm it disappears from the grid.

✅ **Search & Discovery:**
* **Search** for a specific name (e.g., "Silk") and verify the results.
* **Filter** items by specific categories to test the query logic.

✅ **Validation & Security:**
* Try submitting **invalid data** (e.g., negative price, blank fields, or negative quantity).
* Try accessing `/admin` pages without being logged in as an Admin.

ℹ️ **Note:** All errors and validations are strictly handled at the backend using custom exception classes and Mongoose schema validation.

## 🔚 Conclusion

### 🧪 Test-Driven Development (TDD)
The Backend was implemented using **TDD practices**, with unit tests written *before* the actual implementation. This ensured reliable and maintainable code with proper error handling and edge case coverage.

### 📝 Conventional Commits
This project followed **Conventional Commits** for structured commit messages:
* `feat`: for new features
* `fix`: for bug fixes
* `refactor`: for code refactoring
* `test`: for writing tests
* `style`: for UI/styling updates

### 👤 Author

**Anuj Chauhan** GitHub: [@Anuj-Chauhan19](https://github.com/Anuj-Chauhan19)

If you have any suggestions or feedback, feel free to raise an issue or contact me!

