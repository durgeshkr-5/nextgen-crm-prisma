const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectMongoDB = require("./config/connectDB");
const authRouter = require("./routes/auth.routes");
const customerRoutes = require("./routes/customer.routes");
const leadRoutes = require("./routes/lead.routes");
const taskRoutes = require("./routes/task.route")

// constant
const app = express();
const port = process.env.PORT;


// Middleware
app.use(express.json());
app.use(cors());

// routes
app.get("/test",(req,res) => {
    return res.status(200).json({msg:"This is test route"})
})

// Auth routes
app.use("/api/auth",authRouter);
app.use("/api/customers", customerRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/tasks", taskRoutes);

// undefined routes
app.use((req,res) => {
    res.status(404).json({msg : "No Routes Found!!!"})
})

connectMongoDB().then(() => {
    try {
        app.listen(port,()=> {
            console.log(`Server is running at port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
})
.catch((err) => {
    console.log(err);
})