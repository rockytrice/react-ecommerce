// Require our dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");

//import routes
const userRoutes = require('./routes/user')

// Instantiate our Express App
const app = express();

/// middleware
// 🤦🏾‍♂️remember the order in which you declare routes/middleware!!! if the routes are declared before the bodyparser middleware (which is used to populate req.body), body-parser won't get called for request starting with /api 😅
// <=============parse incoming request into json=======================>
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cookieParser());

// db config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
    .connect(db)
    .then(() => console.log("🗄  MongoDB Connected"))
    .catch(err => console.log(err));

// App setup=================================================================
// middleware (morgan-logging framwork)
app.use(morgan("dev"));
app.use(cors());

//routes middleware
app.use("/api", userRoutes);
// Server Setup
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`🌎  Listening on port ${PORT}`));