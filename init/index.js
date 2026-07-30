const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const MONGO_URL = process.env.Mongodb_url;

if (!MONGO_URL) {
  console.error("ERROR: Mongodb_url is not set in .env file");
  process.exit(1);
}

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => { console.log("DB connection error:", err); process.exit(1); });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  // Create or find a demo user to be the owner of all listings
  let demoUser = await User.findOne({ username: "wanderwells_demo" });
  if (!demoUser) {
    demoUser = new User({ username: "wanderwells_demo", email: "demo@wanderwells.com" });
    await User.register(demoUser, "Demo@12345");
    console.log("✅ Demo user created: username=wanderwells_demo, password=Demo@12345");
  } else {
    console.log("ℹ️  Demo user already exists");
  }

  await Listing.deleteMany({});
  
  const listingsWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: demoUser._id,
    geometry: { type: "Point", coordinates: [0, 0] }
  }));
  
  await Listing.insertMany(listingsWithOwner);
  console.log("✅ Sample data seeded! (" + listingsWithOwner.length + " listings)");
  console.log("\n🔐 Login with: username=wanderwells_demo  password=Demo@12345");
  mongoose.connection.close();
};

initDB();