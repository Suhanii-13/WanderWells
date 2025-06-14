# 🏠 Rental Platform

Welcome to the **Rental Platform** project! This application allows users to rent out their houses to travelers. It includes features like property listings, booking systems, payment integration with Razorpay, and more.

## 🌟 Features

- **Property Listings:** Users can list their properties with details like price, images, and descriptions.
- **Review & Rating System:** Users can leave reviews and ratings for properties they have stayed in.
- **Multi-Language Support:** The platform supports multiple languages for a better user experience.
- **Dark Mode:** Toggle between light and dark themes.

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14 or later)
- **MongoDB** (for database)



## 🧩 Project Structure

```plaintext
rental-platform/
│
├── public/                     
│   ├── css/                    
│   ├── images/                 
│   └── js/                     
│
├── routes/                               
│   ├── listing.js              
│   ├── reviews.js              
│   └── user.js                 
│
├── views/                      
│   ├── layouts/                
│   ├── includes/               
│   ├── listings/               
│   ├── inbox/                            
│   └── user/                  
│
├── models/                                
│   ├── listing.js              
│   ├── reviews.js              
│   └── user.js                 
│
├── controllers/                          
│   ├── review.js               
│   ├── listing.js              
│   └── users.js                
│   └── index.js                
│
├── init/                       
│   └── data.js                 
│
├── .env                        
├── app.js                      
├── README.md                   
└── package.json                

```


## 🛠️ Technologies Used

- **Node.js & Express.js:** Server-side logic and routing.
- **MongoDB & Mongoose:** Database management and ORM.
- **EJS:** Templating engine for dynamic HTML rendering.
- **Bootstrap:** Frontend framework for responsive design.
