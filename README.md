# 🏠 Rental Platform

Welcome to the **Rental Platform** project! This application allows users to rent out their houses to travelers. It includes features like property listings, booking systems, payment integration with Razorpay, and more.

## 🌟 Features

- **Property Listings:** Users can list their properties with details like price, images, and descriptions.
- **Search Filters:** Easily find properties based on various filters like location, price range, and availability.
- **Review & Rating System:** Users can leave reviews and ratings for properties they have stayed in.
- **Interactive Map:** Visualize property locations on a map for easy navigation.
- **Multi-Language Support:** The platform supports multiple languages for a better user experience.
- **Dark Mode:** Toggle between light and dark themes.
- **Booking System:** Securely book properties with integrated payment options.
- **Payment Integration:** Razorpay integration for seamless payment processing.
- **Owner's Inbox:** Property owners receive booking notifications directly in their inbox.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or later)
- **MongoDB** (for database)
- **Razorpay Account** (for payment integration)


## 🧩 Project Structure

```plaintext
rental-platform/
│
├── public/                     # Static files (CSS, JS, images)
│   └── js/
│       └── razorpayCheckout.js  # Razorpay checkout logic
│
├── routes/                     # Route handlers
│   ├── index.js                # Main routes
│   └── bookings.js             # Booking-related routes
│
├── views/                      # EJS templates
│   ├── layouts/                # Layout files
│   ├── includes/               # Reusable EJS components
│   ├── listings/               # Listing-related pages
│   └── inbox/                  # Owner's inbox
│
├── models/                     # Mongoose models
│   ├── Booking.js              # Booking schema
│   └── User.js                 # User schema
│
├── controllers/                # Controllers for handling logic
│   ├── bookingController.js    # Booking-related logic
│   └── userController.js       # User-related logic
│
├── .env                        # Environment variables (not included in the repo)
├── app.js                      # Express application setup
├── README.md                   # Project documentation
└── package.json                # Project metadata and dependencies
```


## 🛠️ Technologies Used

- **Node.js & Express.js:** Server-side logic and routing.
- **MongoDB & Mongoose:** Database management and ORM.
- **EJS:** Templating engine for dynamic HTML rendering.
- **Bootstrap:** Frontend framework for responsive design.
- **Razorpay:** Payment integration.
