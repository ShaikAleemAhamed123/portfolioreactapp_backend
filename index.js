// To connect with your mongoDB database


//Creating an Express App ------------------------------
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


// Using Mongoose to connect to MongoDB --------------------
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://admin-aleemahamed:Aleem13mongodbatlas@cluster0.4ykgt.mongodb.net/", {
    dbName: 'yourDB-name',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) :
    console.log('Connected to yourDB-name database'));

//-------------------------------------------Home Route ---------------------------------------------------------------------

app.get("/", (req, resp) => {

    resp.send("App is Working Fine :)");
    // You can check backend is working or not by 
    // entering http://loacalhost:5000

    // If you see App is working means
    // backend working properly
});

//-------------------------------------------Users Section ---------------------------------------------------------------------

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const Message = mongoose.model('messages', MessageSchema);
Message.createIndexes();

app.post("/messages", async (req, resp) => {
    try {
        const message = new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        let result = await message.save();
        console.log(result);
        // result = result.toObject();
        // if (result) {
        //     delete result.password;
        //     resp.send(user);
        //     console.log(result);
        // } else {
        //     console.log("User already register");
        // }
        resp.send("Message Received Successfully !")

    } catch (e) {
        resp.send("Something Went Wrong while posting a Message. --> Error: " + e);
    }
});

app.get("/messages", async (req, res) => {
    Message.find({}, (err, foundMessages) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(foundMessages);
        }
    })
})


//-------------------------------------------Education Section ---------------------------------------------------------------------
const EducationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    degree: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const Education = mongoose.model('educations', EducationSchema);
Education.createIndexes();

app.get("/educations", async (req, res) => {
    Education.find({}, (err, foundEducations) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(foundEducations);
        }
    })
})

app.post("/educations", async (req, resp) => {
    try {
        const education = new Education({
            title: req.body.title,
            degree: req.body.degree,
            grade: req.body.grade,
            image: req.body.image
        });
        let result = await education.save();
        console.log(result);
        // result = result.toObject();
        // if (result) {
        //     delete result.password;
        //     resp.send(user);
        //     console.log(result);
        // } else {
        //     console.log("User already register");
        // }
        resp.send("Education Added Successfully !")

    } catch (e) {
        resp.send("Something Went Wrong while adding Education. --> Error: " + e);
    }
});

app.delete("/educations", async (req, res) => {

    const title = req.query.title;
    // let resp = await Education.deleteOne({ title: title }, (err, obj) => {
    //     if (err) {
    //         console.log("Error while deleting document !");
    //         res.send("Error while deleting document. --> Error: " + err);
    //     }
    //     else {
    //         console.log("Education Deletion Successfull !");
    //         res.send("Education " + obj.title + " deleted Successfully !");
    //     }
    // });

    let resp = await Education.deleteOne({ title: title }).then(
        (err, obj) => {
            if (err) {
                console.log("Error while deleting document !");
                res.send("Error while deleting document. --> Error: " + err);
            }
            else {
                console.log("Education Deletion Successfull !");
                res.send("Education " + obj.title + " deleted Successfully !");
            }
        }

    )
})



//-------------------------------------------Projects Section ---------------------------------------------------------------------
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    tech: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const Project = mongoose.model('projects', ProjectSchema);
Project.createIndexes();

app.get("/projects", async (req, res) => {
    Project.find({}, (err, foundProjects) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(foundProjects);
        }
    })
})

app.post("/projects", async (req, resp) => {
    try {
        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            tech: req.body.tech,
            code: req.body.code,
            project: req.body.project,
            image: req.body.image
        });
        let result = await project.save();
        console.log(result);
        // result = result.toObject();
        // if (result) {
        //     delete result.password;
        //     resp.send(user);
        //     console.log(result);
        // } else {
        //     console.log("User already register");
        // }
        resp.send("Project Added Successfully !")

    } catch (e) {
        resp.send("Something Went Wrong while adding Project. --> Error: " + e);
    }
});

app.delete("/projects", async (req, res) => {

    const title = req.query.title;
    // let resp = await Project.deleteOne({ title: title }, (err, obj) => {
    //     if (err) {
    //         console.log("Error while deleting document !");
    //         res.send("Error while deleting document. --> Error: " + err);
    //     }
    //     else {
    //         console.log("Project Deletion Successfull !");
    //         res.send("Project " + obj.title + " deleted Successfully !");
    //     }
    // });

    let resp = await Project.deleteOne({ title: title }).then(
        (err, obj) => {
            if (err) {
                console.log("Error while deleting document !");
                res.send("Error while deleting document. --> Error: " + err);
            }
            else {
                console.log("Project Deletion Successfull !");
                res.send("Project " + obj.title + " deleted Successfully !");
            }
        }

    )
})

//-------------------------------------------  Skills Section ---------------------------------------------------------------------

const SkillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const Skill = mongoose.model('skills', SkillSchema);
Skill.createIndexes();

app.get("/skills", async (req, res) => {
    Skill.find({}, (err, foundSkills) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(foundSkills);
        }
    })
})

app.post("/skills", async (req, resp) => {
    try {
        const skill = new Skill({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
        });
        let result = await skill.save();
        console.log(result);
        // result = result.toObject();
        // if (result) {
        //     delete result.password;
        //     resp.send(user);
        //     console.log(result);
        // } else {
        //     console.log("User already register");
        // }
        resp.send("Skill Added Successfully !")

    } catch (e) {
        resp.send("Something Went Wrong while adding Skill. --> Error: " + e);
    }
});

app.put("/skills", async (req, res) => {
    let oldTitle = req.body.oldTitle;
    let myJson = JSON.stringify(req.body);
    let updateObject = JSON.parse(myJson);
    delete (updateObject.oldTitle);
    // if (req.body.title) {
    //     console.log(req.body.title);
    //     updateObject[title] = req.body.title;
    // }
    // if (req.body.time) {
    //     console.log(req.body.time);
    //     updateObject[time] = req.body.time;
    // }
    // if (req.body.role) {
    //     console.log(req.body.title);
    //     updateObject[role] = req.body.role;
    // }
    // if (req.body.description1) {
    //     console.log(req.body.description1);
    //     updateObject[description1] = req.body.description1;
    // }
    // if (req.body.description2) {
    //     console.log(req.body.description2);
    //     updateObject[description2] = req.body.description2;
    // }


    let resp = await Skill.updateOne({ title: oldTitle }, { $set: updateObject });
    res.send("Skill Updated Successfully !")
})


app.delete("/skills", async (req, res) => {

    const title = req.query.title;
    // let resp = await Skill.deleteOne({ title: title }, (err, obj) => {
    //     if (err) {
    //         console.log("Error while deleting document !");
    //         res.send("Error while deleting document. --> Error: " + err);
    //     }
    //     else {
    //         console.log("Skill Deletion Successfull !");
    //         res.send("Skill " + obj.title + " deleted Successfully !");
    //     }
    // });

    let resp = await Skill.deleteOne({ title: title }).then(
        (err, obj) => {
            if (err) {
                console.log("Error while deleting document !");
                res.send("Error while deleting document. --> Error: " + err);
            }
            else {
                console.log("Skill Deletion Successfull !");
                res.send("Skill " + obj.title + " deleted Successfully !");
            }
        }

    )
})

//-------------------------------------------  Experience Section ---------------------------------------------------------------------

const ExperienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    description1: {
        type: String,
        required: true
    },
    description2: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const Experience = mongoose.model('experiences', ExperienceSchema);
Experience.createIndexes();

app.get("/experiences", async (req, res) => {
    Experience.find({}, (err, foundExperiences) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(foundExperiences);
        }
    })
})

app.post("/experiences", async (req, resp) => {
    try {
        const experience = new Experience({
            title: req.body.title,
            time: req.body.time,
            role: req.body.role,
            description1: req.body.description1,
            description2: req.body.description2
        });
        let result = await experience.save();
        console.log(result);
        // result = result.toObject();
        // if (result) {
        //     delete result.password;
        //     resp.send(user);
        //     console.log(result);
        // } else {
        //     console.log("User already register");
        // }
        resp.send("Experience Added Successfully !")

    } catch (e) {
        resp.send("Something Went Wrong while adding Experience. --> Error: " + e);
    }
});

app.put("/experiences", async (req, res) => {
    let oldTitle = req.body.oldTitle;
    let myJson = JSON.stringify(req.body);
    let updateObject = JSON.parse(myJson);
    delete (updateObject.oldTitle);
    // if (req.body.title) {
    //     console.log(req.body.title);
    //     updateObject[title] = req.body.title;
    // }
    // if (req.body.time) {
    //     console.log(req.body.time);
    //     updateObject[time] = req.body.time;
    // }
    // if (req.body.role) {
    //     console.log(req.body.title);
    //     updateObject[role] = req.body.role;
    // }
    // if (req.body.description1) {
    //     console.log(req.body.description1);
    //     updateObject[description1] = req.body.description1;
    // }
    // if (req.body.description2) {
    //     console.log(req.body.description2);
    //     updateObject[description2] = req.body.description2;
    // }


    let resp = await Experience.updateOne({ title: oldTitle }, { $set: updateObject });
    res.send("Experience Updated Successfully !")
})

app.delete("/experiences", async (req, res) => {

    const title = req.query.title;
    // let resp = await Experience.deleteOne({ title: title }, (err, obj) => {
    //     if (err) {
    //         console.log("Error while deleting document !");
    //         res.send("Error while deleting document. --> Error: " + err);
    //     }
    //     else {
    //         console.log("Experience Deletion Successfull !");
    //         res.send("Experience " + obj.title + " deleted Successfully !");
    //     }
    // });

    let resp = await Experience.deleteOne({ title: title }).then(
        (err, obj) => {
            if (err) {
                console.log("Error while deleting document !");
                res.send("Error while deleting document. --> Error: " + err);
            }
            else {
                console.log("Experience Deletion Successfull !");
                res.send("Experience " + obj.title + " deleted Successfully !");
            }
        }

    )
})


//----------------------------------------------------------------------------------------------------------------------------------


// Listening the express app on a Port
let port = process.env.PORT;
app.listen((port || 5000), () => {
    console.log("Port 5000 started")
});