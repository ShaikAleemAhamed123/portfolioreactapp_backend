// To connect with your mongoDB database


//Creating an Express App
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


//Using Mongoose to connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin-aleemahamed:Aleem13%40mongodbatlas@cluster0.4ykgt.mongodb.net/", {
    dbName: 'yourDB-name',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) :
    console.log('Connected to yourDB-name database'));



// Schema for users of app
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();




// Creating Express Routes

app.get("/", (req, resp) => {

    resp.send("App is Working Fine :)");
    // You can check backend is working or not by 
    // entering http://loacalhost:5000

    // If you see App is working means
    // backend working properly
});

app.post("/register", async (req, resp) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        let result = await user.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(user);
            console.log(result);
        } else {
            console.log("User already register");
        }

    } catch (e) {
        resp.send("Something Went Wrong  whats going on ? " + e);
    }
});

app.get("/messages", async (req, res) => {
    User.find({}, (err, foundUsers) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(foundUsers);
        }
    })
})



// Listening the express app on a Port
let port = process.env.PORT;
app.listen((port || 5000), () => {
    console.log("Port 5000 started")
});