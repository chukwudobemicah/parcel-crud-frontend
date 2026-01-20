# Parcel Management System

A fully responsive web application for efficient parcel tracking and management. Built with **React**, **TypeScript**, and **Tailwind CSS**, this dashboard offers a seamless CRUD experience with a sleek dark-mode aesthetic and smooth animations.

## ✨ Key Features

- **Dashboard & CRUD**: Create, Read, Update, and Delete parcels with ease.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
  - _Mobile-First Navigation_: Absolute positioned mobile menu with smooth toggles.
  - _Adaptive Modals_: Form modals feature sticky headers and responsive grid layouts.
- **Advanced UI/UX**:
  - **Glassmorphism**: Premium glass-like effects using backdrop filters.
  - **Animations**: Fluid page transitions and micro-interactions powered by **Framer Motion**.
  - **Toast Notifications**: Custom toast system for real-time feedback (Success, Error, Info).
- **State Management**: Scalable global state management using **Zustand**.
- **Search & Filter**: Real-time filtering of parcels by name or description.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Custom SVG Icon system

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd parcel-crud-ui
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components (Navbar, Modal, Input, etc.)
├── store/          # Global state stores (Zustand)
├── utils/          # Helper functions and validation logic
├── types/          # TypeScript interfaces and types
├── App.tsx         # Main application component
└── main.tsx        # Entry point
```

## 🎨 Design Decisions

- **Dark Theme**: The application uses a custom dark theme (`#1a1718`) with vibrant accent colors (`var(--color-primary)`).
- **Mobile responsiveness**: Special attention was paid to mobile usability, including stacking action buttons and resizing text for smaller viewports.
- **Performance**: Minimized re-renders and optimized bundle size using Vite.

---

Built with ❤️ by [Your Name]
