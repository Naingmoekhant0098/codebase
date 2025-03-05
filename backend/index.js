const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/authRoutes');
const dbConnect = require('./db/db')

require('dotenv').config();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.get('/' , (req,res)=>{
     res.send("app is running");
})
app.use('/api/v1/auth',authRouter);

app.listen(process.env.PORT,()=>{
    console.log('sever is running at port 3000')
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message;
    const error_code = err.code || "Error_Code";
    res.status(status).json({ error: error_code, message: message });
  });