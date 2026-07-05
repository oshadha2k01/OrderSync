# OrderSync - Sales Order Management System

OrderSync is a premium web application for managing sales orders and item lines, developed using a **.NET Core Web API** backend, **SQL Server** database, and **React + Redux Toolkit** frontend.

The project follows clean architecture principles for the backend, and uses modern, responsive UI design utilizing **Tailwind CSS** on the frontend.

---

## Key Features

### 1. Sales Order Creation & Operations

- **Customer Auto-Population**: Select a customer from the dropdown, and all address fields (Address lines, Suburb, State, Post Code) are automatically populated. These fields remain editable if override is desired.
- **Twin Item Selection**: Select an item from either the **Item Code** or **Description** dropdown; the corresponding dropdown, description, and price auto-fill instantly.
- **Dynamic Calculations**: Real-time line item calculations and grand totals update instantly:
  - $\text{Excl Amount} = \text{Quantity} \times \text{Price}$
  - $\text{Tax Amount} = \text{Excl Amount} \times \frac{\text{Tax Rate}}{100}$
  - $\text{Incl Amount} = \text{Excl Amount} + \text{Tax Amount}$
- **Bottom Summary**: Displays dynamic calculations for **Total Excl**, **Total Tax**, and **Total Incl** for the entire sales order.
- **Print Invoices**: Clean print stylesheet rules hide navigation/buttons and optimize page layout for clean paper printing.

### 2. Dashboard & Row Modifications

- **Root Home View**: Lists all saved sales orders directly from SQL Server with key columns (Invoice No, Customer, Date, Total Excl, Total Tax, Total Incl).
- **Double-Click to Edit**: Double-click any row in the orders table to load it back into the editor, allowing in-place edits and saving back to the database without duplicate generation.

---

## Technology Stack

### Backend Architecture

- **.NET Core Web API** (v9.0)
- **Entity Framework Core** as ORM
- **MS SQL Server** for persistence
- **AutoMapper** for DTO to Domain Entity transformations
- **Dependency Injection** for loose coupling

### Frontend Architecture

- **React** (v19) using functional components and hooks
- **Redux Toolkit** for global state management
- **React Router** (v7) for page navigation
- **Axios** for communication with backend endpoints
- **Tailwind CSS** (v3) for utility-first styling

---

## Project Structure

```text
/OrderSync
├── /backend
│   ├── /API                 # Routing, Controllers, and DTO Models
│   ├── /Application         # Services, DTO definitions, AutoMapper Profile
│   ├── /Domain              # Entity models and Interface abstractions
│   ├── /Infrastructure      # DbContext, Repositories, and migrations
│   └── SalesFlow.sln        # Visual Studio Solution file
├── /frontend
│   ├── /public              # Static assets and template index.html
│   ├── /src
│   │   ├── /components      # Reusable controls (ActionButton, FormInput, OrderTable)
│   │   ├── /hooks           # Custom hooks for decimal calculations
│   │   ├── /pages           # App views (Home page, Sales Order page)
│   │   ├── /redux           # Store configurations and slice reducers
│   │   ├── /services        # Axios client instance configurations
│   │   ├── /utils           # Formatters (currency, dates)
│   │   ├── App.js           # Routes definitions and navigation elements
│   │   ├── index.css        # Tailwind styling rules and print overrides
│   │   └── index.js         # Redux provider bootstrap element
│   ├── package.json         # Scripts and npm dependencies
│   └── tailwind.config.js   # Tailwind custom theme definitions
└── README.md                # System documentation
```

---

## Setting Up & Running Locally

### Prerequisites

1.  **.NET SDK 9.0** installed.
2.  **Node.js** (v18 or higher) & **npm** installed.
3.  **Local MS SQL Server** running.

### 1. Database Configuration

By default, the backend expects a local SQL Server instance named `localhost`. You can modify the connection string in `backend/API/appsettings.json` under `"DefaultConnection"`.

Apply migrations to create tables and seed default Client & Item records:

```bash
cd backend
dotnet ef database update --project Infrastructure --startup-project API
```

### 2. Run Backend API

Start the backend server using the http launch profile (runs on `http://localhost:5271`):

```bash
cd backend
dotnet run --project API --launch-profile http
```

### 3. Run Frontend App

Install npm dependencies and launch the React development server:

```bash
cd frontend
npm install
npm start
```

The application will open automatically at `http://localhost:3000`.

---

## Printing layout

When viewing a saved order, click the **Print Order** button. The browser print window will open. The elements decorated with `.no-print` classes will be automatically hidden to provide a clean document.
