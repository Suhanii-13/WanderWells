const mongoose = require("mongoose");
const initData = require("./data.js");//data 
const Listing = require("../models/listing.js");//schema
require('dotenv').config({ path: '../.env' }); 

const MONGO_URL = process.env.Mongodb_url

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({...obj,owner:"684dac2f71250db441149678"}))
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();