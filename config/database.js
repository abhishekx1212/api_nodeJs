const mongoose = require('mongoose');
require('dotenv').config();
const db = async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected...");
    } catch (error) {
        console.log(error);
    }
}

module.exports = db