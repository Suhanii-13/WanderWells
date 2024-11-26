const sampleListings = [
  {
    title: "Secluded Island Retreat in Chuuk Lagoon",
    description: "Escape to a private paradise on Weno Island in Chuuk Lagoon. Ideal for those seeking tranquility and natural beauty.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1553603227-2358aabe821e?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXNsYW5kfGVufDB8fDB8fHww",
    },
    price: 9800,
    location: "Weno Island, Chuuk Lagoon",
    country: "Federated States of Micronesia",
    category: "Islands"
  },
  {
    title: "Historic Castle in Postojna",
    description: "Step back in time at this magnificent castle in Castel Lueghi, Postojna. Experience medieval charm and grandeur.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1704143573140-b3efb0ff9a55?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhc3RlbHN8ZW58MHx8MHx8fDA%3D",
    },
    price: 13500,
    location: "Castel Lueghi",
    country: "Slovenia",
    category: "Castles"
  },
  {
    title: "Mountain Retreat in Sale Marasino",
    description: "Escape to the serene mountains of Sale Marasino, Province of Brescia, Italy. Enjoy breathtaking views and peaceful surroundings.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1560426961-14f633bb774f?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9tZSUyMG1vdXRhaW5zfGVufDB8fDB8fHww",
    },
    price: 9800,
    location: "Sale Marasino",
    country: "Italy",
    category: "Mountains"
  },
  {
    title: "Luxury Villa with Ocean View",
    description: "Experience luxury living in this exquisite villa overlooking the ocean. Ideal for relaxation and enjoying breathtaking sunsets.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
    },
    price: 14500,
    location: "Jodhpur",
    country: "India",
    category: "Villa"
  },
  {
    title: "Rustic Camping Adventure",
    description: "Enjoy a rustic camping experience surrounded by nature's beauty. Perfect for outdoor enthusiasts looking to disconnect and recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D",
    },
    price: 5000,
    location: "Northern California",
    country: "United States",
    category: "Camping"
  },
  {
    title: "Luxury Poolside Villa",
    description: "Indulge in luxury at this stunning villa with a private pool. Perfect for relaxation and enjoying sunny days.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1682377521625-c656fc1ff3e1?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3dpbW1pbmclMjBwb29sc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    price: 15000,
    location: "Miami Beach",
    country: "United States",
    category: "Pools"
  },
  {
    title: "Tranquil Houseboat Living",
    description: "Experience peaceful living on the water in this cozy houseboat with stunning views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1634141693341-9d51836aa188?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2Vib2F0fGVufDB8fDB8fHww",
    },
    price: 9800,
    location: "California",
    country: "United States",
    category: "Boat"
  },
  {
    title: "Cozy Cabin Retreat",
    description: "Escape to this charming cabin nestled in the countryside, perfect for a peaceful getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1537197518227-a36efeafd477?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fENBQklOU3xlbnwwfHwwfHx8MA%3D%3D",
    },
    price: 8500,
    location: "Cabin in the Woods",
    country: "United States",
    category: "Cabins"
  },
  {
    title: "Rustic Farmhouse Retreat",
    description: "Experience the serenity of rural life at this picturesque farmhouse, surrounded by rolling fields and fresh air.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1527368717868-ff088cc80d0a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEZBUk1TfGVufDB8fDB8fHww",
    },
    price: 9500,
    location: "California",
    country: "United States",
    category: "Farms"
  },
  {
    title: "Beautiful Beachfront Bungalow",
    description: "Escape to this charming beachfront bungalow, where the soothing sound of waves and breathtaking sunsets await.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJlYWNoJTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    price: 12500,
    location: "Maldives",
    country: "Maldives",
    category: "Beach"
  },
  {
    title: "Arctic Wilderness Lodge",
    description: "Experience the untouched beauty of the Arctic wilderness in this cozy lodge, surrounded by stunning natural landscapes and northern lights.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1553550319-d8d5393e1c80?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2ludGVyJTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    price: 9800,
    location: "Arctic Circle",
    country: "Norway",
    category: "Arctic"
  }
];

module.exports = { data: sampleListings };
