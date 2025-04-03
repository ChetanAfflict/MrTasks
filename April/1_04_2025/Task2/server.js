require('dotenv').config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
console.log("MongoDB URI:", uri);