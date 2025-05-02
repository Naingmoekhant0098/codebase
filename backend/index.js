const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const postRouter = require("./routes/postRouter");
const categoryRouter = require("./routes/categoryRouter");
const dbConnect = require("./db/db");
const socket = require('socket.io');
const path = require("path");
const http = require('http');
// const Message = require('./models/Message'); // Assuming you have a Message model

require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials : true
  })
);
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials : true
  },
});
const activeUsers = [];
io.on('connection', (socket) => {
  console.log('sever is connected')
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on("new-user-add", (newUserId) => {
  
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
   
    io.emit("get-users", activeUsers);
  });
  socket.on('sendMessage', (msg) => {
    const user = activeUsers.find((u) => u.userId == msg.receiverId);
    
    if (user) {
      // Send the message to the recipient if they are online
      socket.to(user.socketId).emit('receiveMessage', msg);
      console.log("message send")
    } else {
      console.log(`User with ID ${msg.receiverId} is not online.`);
      
    }
  });

});


const __dir = path.resolve();

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("app is running");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);

app.use("/api/v1/category", categoryRouter);
server.listen(process.env.PORT, () => {
  console.log("sever is running at port 3000");
});
app.use(express.static(path.join(__dir,'client/dist')))
app.use('*',(req,res)=>{
  res.sendFile(path.join(__dir,'client','dist','index.html'))
})
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  const error_code = err.code || "Error_Code";
  res.status(status).json({ error: error_code, message: message , status : status });
});
