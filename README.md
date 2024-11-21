# **Next.js Role-Based Access Control (RBAC) Application**

This project is a sample application built with **Next.js**, implementing role-based access control (RBAC), authentication, and user management. The project structure is modular and designed for scalability, supporting features like protected routes, user roles, and admin dashboards.

---

## **Features**

- **Authentication System**: 
  - Signup, Login, and Logout functionality.
- **Role-Based Access Control (RBAC)**:
  - Admin and User roles with restricted access to specific pages.
- **Protected Routes**:
  - `/admin/*` for admin users only.
  - `/user/*` for authenticated users.
- **Dynamic Page Management**:
  - Modular folder structure for pages and APIs.
- **Additional Sections**:
  - About and Contact pages for basic information.

---

## **Folder Structure**

### **Frontend (App Directory)**

- **`app`**:
  - **about**: Contains the About page (`page.js`).
  - **admin**: Contains the Admin Table page:
    - `layout.js`: Layout for admin pages.
    - `page.js`: Admin dashboard/table interface.
  - **login**: Login page (`page.js`).
  - **register**: Signup/Register page (`page.js`).
  - **user**:
    - `layout.js`: Layout for user-specific pages.
    - `page.js`: User dashboard or profile page.
  - **contact**: Contact page (`page.js`).
  - **fonts**: Font-related files.

### **Backend (API Directory)**

- **`api`**:
  - **auth**:
    - `login/route.js`: API for user login.
    - `logout/route.js`: API for user logout.
    - `signup/route.js`: API for user signup.
    - `getRole.js`: API to fetch the role of a user.
  - **users**:
    - `route.js`: API to manage user data (e.g., fetching user list).

---

## **Tech Stack**

- **Frontend**: Next.js 15 (App Router).
- **Authentication**: Lucia Auth.
- **Database**: MySQL with `mysql2`.
- **Styling**: Tailwind CSS.

---

## **Setup Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/amansherjada/nextjs-role-based-auth.git
cd nextjs-role-based-auth
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure Environment Variables**
Create a `.env.local` file in the root directory:
```
DATABASE_URL=mysql://username:password@localhost:3306/your-database-name
LUCIA_SECRET=your-lucia-secret
NODE_ENV=development
```

### **4. Set Up Database**
Run the following SQL to set up the users table:
```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **5. Run the Development Server**
```bash
npm run dev
```

---

## **Usage**

### **Authentication Flow**
- **Signup**: Accessible at `/register`.
- **Login**: Accessible at `/login`.
- **Logout**: API endpoint `/api/auth/logout`.

### **Role-Based Access**
- `/admin/*`: Restricted to admin users.
- `/user/*`: Restricted to authenticated users.

### **Admin Dashboard**
- Manage user data through the admin table interface.

---

## **API Endpoints**

### **Authentication**
- **POST /api/auth/signup**: Registers a new user.
- **POST /api/auth/login**: Logs in a user.
- **GET /api/auth/logout**: Logs out a user.

### **Role Management**
- **GET /api/auth/getRole**: Fetches the role of the logged-in user.

### **User Management**
- **GET /api/users**: Fetches a list of all users (admin-only).

---

## **Future Enhancements**
- Integrate more roles (e.g., Editor, Moderator).
- Enhance the Admin Dashboard with additional analytics.

---