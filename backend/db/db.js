const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect=async()=>{
     try {
        await mongoose.connect(process.env.MONGODB_KEY)
        .then((res)=>console.log("Db connectd successful."))
        .catch((err)=>console.log(err.message))
        
     } catch (error) {
        console.log(err.message)
     }
}

dbConnect();