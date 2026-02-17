const express = require("express");
const path = require("path");

const app = express();

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Tell Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// parse the incoming data and put it into req.body.”
app.use(express.urlencoded({ extended: true }));

// Route
const usersRouter = require("./routes/usersRouter");
app.use("/", usersRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));