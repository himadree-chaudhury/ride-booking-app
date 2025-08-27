# Ride Booking App <sup><small><sub>`v1.0.0`</sub></small></sup>

![Static Badge](https://img.shields.io/badge/v19.1.1-version?style=flat&logo=react&logoColor=%2361DAFB&logoSize=auto&label=React&labelColor=%23091a23&color=%2361DAFB)
![Static Badge](https://img.shields.io/badge/v5.8.3-package?style=flat&logo=typescript&logoColor=white&logoSize=auto&label=TypeScript&labelColor=blue&color=gray)
![Static Badge](https://img.shields.io/badge/v4.1.11-package?style=flat&logo=tailwindcss&logoColor=%2306B6D4&logoSize=auto&label=Tailwind%20CSS&labelColor=%23091a23&color=%2306B6D4)
![Static Badge](https://img.shields.io/badge/v2.8.2-package?style=flat&logo=redux&logoColor=%23764ABC&logoSize=auto&label=Redux%20Toolkit&labelColor=white&color=%23764ABC)
![Static Badge](https://img.shields.io/badge/v7.8.1-package?style=flat&logo=reactrouter&logoColor=%23CA4245&logoSize=auto&label=React%20Router&labelColor=white&color=%23CA4245)
![Static Badge](https://img.shields.io/badge/v2.9.3-package?style=flat&logo=shadcnui&logoColor=black&logoSize=auto&label=shadcn%2Fui&labelColor=white&color=000000)


## Overview

The **Ride Booking App Frontend** is a production-grade, fully responsive, and role-based single-page application built for a ride-sharing platform similar to Uber or Pathao. Developed using **React.js**, **Redux Toolkit**, **RTK Query**, and **TypeScript**, it provides an intuitive and polished user experience for **Riders**, **Drivers**, and **Admins**. The frontend integrates seamlessly with the [Ride Booking Backend API](https://ride-booking-backend-himadree.vercel.app/) to deliver features like ride booking, driver availability management, admin analytics, and more.

The application features a modern, accessible UI with **Tailwind CSS** for styling, **Framer Motion** for animations, and **Recharts** for data visualization. It supports role-based authentication, real-time updates, and safety features like an SOS button, ensuring a robust and user-friendly experience across mobile, tablet, and desktop devices.

[![Live Link](https://img.shields.io/badge/Live%20Link-link?style=for-the-badge&logo=vercel&logoColor=white&logoSize=auto&label=Vercel&labelColor=black&color=white)](https://ride-booking-frontend-cabsy.vercel.app/)

## Features

- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop with consistent typography and color palette.
- **Public Landing Pages**:
  - **Home**: Five distinct sections including Hero Banner, How-it-works, Service Highlights, Testimonials, and Promotions (e.g., Offers component with dynamic countdowns).
  - **About Us**: Company mission, vision, and team profiles.
  - **Features**: Detailed breakdown of Rider, Driver, and Admin capabilities.
  - **Contact**: Validated contact form with simulated submission.
  - **FAQ**: Searchable FAQ list with common questions.
- **Authentication & Authorization**:
  - JWT-based login and registration with role selection (Rider, Driver, Admin).
  - Persistent authentication state across sessions.
  - Blocked/suspended user handling with a dedicated status page.
  - Offline Driver mode with restricted access to ride acceptance features.
- **Rider Features**:
  - Ride Request Form with pickup/destination fields, fare estimation, and payment method selection.
  - Ride History with pagination, search, and filters (date, fare, status).
  - Ride Details Page with driver info and status timeline.
  - Profile Management for updating name, phone, and password.
  - SOS Button for emergency actions (e.g., call police, notify contacts, share live location).
- **Driver Features**:
  - Online/Offline toggle for availability control.
  - Incoming ride request management (Accept/Reject).
  - Active ride status updates (Accepted → Picked Up → In Transit → Completed).
  - Earnings Dashboard with daily, weekly, and monthly charts using Recharts.
  - Ride History with pagination and filters.
  - Profile Management for vehicle and contact details.
- **Admin Features**:
  - User Management: Search, filter, block/unblock riders, approve/suspend drivers.
  - Ride Oversight: View all rides with advanced filtering (date, status, driver, rider).
  - Analytics Dashboard: Visualizations for ride volume, revenue, and driver activity.
  - Profile Management for admin details and password updates.
- **UI/UX Enhancements**:
  - Sticky navigation with role-based menu options and profile dropdown.
  - Interactive elements like carousels, dynamic ride cards, and responsive charts.
  - Skeleton loaders and smooth transitions for improved performance.
  - Strict form validation and user-friendly error messages using `react-hot-toast`.
  - Accessibility-compliant components with semantic HTML.
  - Lazy-loading for heavy assets like maps and tables.
  - Theme support (light, dark, system) with dynamic loading spinners.

## Technologies Used and Rationale

| Package                  | Purpose                       | Reason                                                                                      |
|--------------------------|-------------------------------|--------------------------------------------------------------------------------------------|
| **React.js**             | Frontend framework            | Enables component-based UI development with fast rendering and reusable components.         |
| **TypeScript**           | Type-safe JavaScript          | Ensures type safety, reduces runtime errors, and improves code maintainability.             |
| **Redux Toolkit**        | State management              | Simplifies state management with predictable state updates and RTK Query for API handling.  |
| **RTK Query**            | API integration               | Streamlines data fetching, caching, and state synchronization with the backend API.         |
| **React Router**         | Client-side routing           | Manages navigation and role-based protected routes for a seamless SPA experience.           |
| **Tailwind CSS**         | Styling                       | Provides utility-first CSS for rapid, responsive, and consistent UI development.            |
| **Framer Motion**        | Animations                    | Adds smooth animations for cards, transitions, and interactive elements like Offers.        |
| **Recharts**             | Data visualization            | Enables dynamic charts for earnings and analytics dashboards.                               |
| **react-hook-form**      | Form management               | Simplifies form handling with validation and integration with Zod for type safety.          |
| **Zod**                  | Schema validation             | Validates form inputs and API responses for robust error handling.                         |
| **sonner**               | Toast notifications           | Provides elegant success/error notifications for user feedback.                            |
| **Leaflet/react-leaflet**| Maps                          | Supports optional live ride tracking and location-based features like SOS.                 |
| **lucide-react**         | Icons                         | Lightweight, customizable icons for UI elements like SOS and navigation.                   |

## Setup & Environment Instructions

### Prerequisites

- **Node.js**: v20.17.0 or higher
- **Git**: For cloning the repository
- **Backend API**: Running instance of the [Ride Booking Backend API](https://ride-booking-backend-himadree.vercel.app/)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/himadree-chaudhury/ride-booking-app
   cd ride-booking-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure the following:

   ```env
   VITE_API_BASE_URL=https://ride-booking-backend-himadree.vercel.app
   VITE_GRAPHHOPPER_MAP_KEY=your_graphhopper_api_key_here
   ```

4. **Run the Application**:

   - Development mode (with hot-reload):
     ```bash
     npm run dev
     ```
   - Build for production:
     ```bash
     npm run build
     npm run preview
     ```

5. **Linting**:
   - Check code quality:
     ```bash
     npm run lint
     ```
   - Fix linting issues:
     ```bash
     npm run lint:fix
     ```

### Environment Variables

- **VITE_API_BASE_URL**: The base URL of the backend API (e.g., `https://ride-booking-backend-himadree.vercel.app`).
- **VITE_GRAPHHOPPER_MAP_KEY**: API key for GraphHopper (optional, for routing and navigation features).

## Project Structure

```
ride-booking-frontend/
├── src/
│   ├── assets/                  # Static assets (images, icons, svgs)
│   ├── components/              # Reusable UI components
│   │   ├── ui/                 # Shared UI components (Button, Input, etc.)
│   │   ├── layout/             # Layout components (Header, Footer, etc.)
│   │   ├── modules/            # Feature-specific components (RideRequest, UserProfile, etc.)
│   ├── config/                # Configuration files (e.g., Axios instance)
│   ├── contexts/                # React context (e.g., ThemeProvider)
│   ├── constants/               # Application-wide constants
│   ├── hooks/                   # Custom hooks (e.g., useTheme)
│   ├── lib/                     # Utility functions and libraries
│   ├── pages/                   # Page components (Home, About, Features, etc.)
│   │   ├── admin/                 # Admin-specific pages (UserManagement, RideManagement, etc.)
│   │   ├── driver/                 # Driver-specific pages (RideRequest, RideHistory, etc.)
│   │   ├── rider/                  # Rider-specific pages (RideRequest, RideHistory, etc.)
│   │   ├── common/                  # Common components (e.g., Header, Footer)
│   ├── providers/                # Context providers (e.g., ThemeProvider)
│   ├── redux/                   # Redux Toolkit and RTK Query setup
│   ├── routes/                   # Route definitions and configurations
│   ├── types/                   # TypeScript type definitions
│   ├── utils/                   # Utility functions and libraries
│   ├── App.tsx                  # Root component with Router and ThemeProvider
│   ├── main.tsx                 # Entry point with React Router configuration
├── public/                      # Public assets
├── .env                         # Environment variables
├── package.json                 # Project dependencies and scripts
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
├── README.md                    # Project documentation
```

## API Integration

The frontend integrates with the [Ride Booking Backend API](https://ride-booking-backend-himadree.vercel.app/) using RTK Query. Key endpoints include:

- **User**: `/user/register`, `/user/update`, `/user/me`, `/user/block/:userId`, `/user/add-sos-contact`, `/user/contact`
- **Auth**: `/auth/login`, `/auth/logout`, `/auth/refresh-token`
- **Driver**: `/driver/register`, `/driver/availability`, `/driver/me`
- **Ride**: `/ride/request`, `/ride/accept/:rideId`, `/ride/all`
- **Stats**: `/stat/users`, `/stat/rider-stats`, `/stat/driver-stats`

All API calls include:
- JWT authentication headers for protected routes
- Zod validation for form inputs and API responses
- Error handling with `sonner` toast notifications
- Caching and optimistic updates via RTK Query

## Testing Credentials

For testing purposes, use the following credentials:

- **Admin**:
  - Email: `admin@email.com`
  - Password: `123Abc`!@`
- **Rider**:
  - Email: `driver@email.com`
  - Password: `456deF=-)`
- **Driver**:
  - Email: `himadreebd@gmail.com`
  - Password: `123456Aa`

## Future Enhancements

- Implement **Google/Facebook login** for seamless authentication.
- Add **real-time ride tracking** with WebSockets and Leaflet maps.
- Integrate **payment gateways** for in-app transactions.
- Support **ride ratings** for feedback from riders and drivers.
- Add **multi-language support** for accessibility.
- Implement **push notifications** and **in-app chat** for improved communication.

## Contributing

Contributions are welcome! Please follow these steps:

1. Create an issue for your feature or bug.
2. Fork the repository.
3. Create a feature branch (`git checkout -b feature/your-feature`).
4. Commit changes (`git commit -m 'Add your feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## Read Followings For Better Understanding

- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [License](LICENSE.md)

## Author

![Static Badge](https://img.shields.io/badge/Himadree%20Chaudhury-author?style=social&label=%F0%9F%A7%91%E2%80%8D%F0%9F%92%BB&color=black)