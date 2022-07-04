const express = require("express");
const app = express();
const port = 4000;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

app.use(express.static(path.join(__dirname, '../build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'))
})

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.mongo_url).then(console.log("connected to mongo")).catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "images");
    }, filename:(req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req,res) => {
    res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoryRoute);

app.listen(port, () => {
    console.log("backend is running");
})