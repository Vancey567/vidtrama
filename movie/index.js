const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const formidable = require('formidable');


const app = express();
const PORT = process.env.PORT || 5000;

// Importing files
const userModel = require('./models/user-model');
const videoModel = require('./models/video-model');             
const userVideoModel = require('./models/user-video-model');             
const verifyToken = require('./verify-token');

mongoose.connect("mongodb://localhost:27017/video-streaming")
.then(() => {console.log("DB connected")})
.catch(err => {console.log(err);})

app.use(cors());
app.use(express.json());

// Login user
app.post('/login', (req, res) => {
    let userCred = req.body;

    userModel.findOne({ username: userCred.username })
    .then((user) => {
        if(user !== null) { // user found in DB then compare the hashed password given by the user at the time of login with the hashed password stored in the DB.
           bcrypt.compare(userCred.password, user.password, (err, status) => {
               if(status === true) { // Correct password
                    // If password matches Generate token using jwt.sing() method which take the user credentials that was used at the time of login 
                    jwt.sign(userCred, "secretkey", (err, token) => {// 1st is something user to the user, the userCread has username and password
                        if(err === null) { // If there no problem while generating the token
                            res.send({message: "Welcome User", token: token, user_id: user_id, success: true}); // everytime a new token is generated. Token expires after some time.
                        }
                    })
               } else {
                res.send({message: "Wrong Password", success: false})
               }
           })
        } else {
            res.send({message: "Username not found", success: false});
        }
    }).catch((err) => {
        console.log(err);
        res.send({message: "user not found!!"});
    })
})

app.post("/register", (req, res) => {
    let user = req.body;
    console.log(user);
    bcrypt.genSalt(10, (err, salt) => {
        if(err === null) {
            bcrypt.hash(user.password, salt, (err, newPassword) => {
                user.password = newPassword;
                let userObj = new userModel(user);

                userObj.save()
                .then(() => {
                    res.status(201).json({message: "User registered", success: true}); // To frontend to display message is green 
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({message: "Problem Creating User", success: false});// To frontend to display message is red
                })
            })
        }
    })
})



// Fetch all the video. You should be valid user by sending the valid token
// verify token
app.get("/videos", verifyToken, async(req, res) => {
    let video = await videoModel.find().catch((err) => { console.log("Fecthing video error") });
    res.send(video);
})

app.get("/videos/:id", async(req, res) => {
    let id = req.params.id;
    let video = videoModel.find({ _id: id });
    res.send(video);
})

app.get('/stream/:videoid/:userId', async(req, res) => {
    // If you try to stream then there should be a range header
    const range = req.header.range;
    if(!range) {
        res.status(400).send({message: "Range header not found."});
    }

    let id = req.params.videoid; 
    let userId = req.params.userId; 
    let video = videoModel.find({ _id: id });

    const videoSize = fs.statSync(video.videoPath).size; // Get the video path dynamically from the video data we get from the id

    // Start by chunk
    const start = Number(range.replace(/\D/g, ""));

    // end Of chunk 
    const end = range();

    // IF we do the streaming here then we will call this end point again and again.
    // so we 
})


app.listen(PORT, (req, res) => {
    console.log(`Listning on PORT ${PORT}`);
})

// require : module.exports, If we use "require" then the module/file must have been exported using "module.exports" syntax 
// import : export default, If we use "import" then the module/file must be exported using "export default fileName" syntax

// or you can remember like this 
// Backend:  [ require(), module.exports = router ] is a nodejs way called common JS syntax
// Frontend: [ import from './path', export default App ] is Javascript ES6 module system(react uses this)

// Representational State Transfer API
// SOAP needs more bandwidth for its usage whereas REST doesn't need much bandwidth.
// State means data at that moment.
// State is defined with the property of that things.
// 

// Signup/Login
// Fetch Movie video information
// Fetch the info of a single video based on id
// stream a video When you click on play 
// on close the player record the time of stoping. So we will start the video
// Post method. From a client the information will come about video and we will create, update, data;  





// app.get('/movies', (req, res) => {
//     const filter = req.body;
//     videoModel.find(filter)
//     .then((movie) => {
//         res.send(movie);
//     })
//     .catch((err) => {
//         console.log(err);
//         res.send({message: "Error while fetching movie"})
//     })
// })

// app.post('/movies', (req, res) => {
//     const form = new formidable.IncomingForm();

//     form.parse(req, (err, fields, files) => {
//         console.log(fields);
//         let extention = files.name.
//     })

// })


// May be changed (Sir might change it today)
// app.post('/movies', (req, res) => {
//     let movie = req.body;
//     // Create a object of model by passing the data from the body in the model
//     let movieOBJ = new movieModel(movie);
//     movieOBJ.save()
//     .then(() => {
//         res.send({message: 'Movie Created'});
//     })
//     .catch((err) => {
//         console.log(err);
//         res.send({message: err.message});
//     })
// })

// // Fetch
// app.get('/movies/', (req, res) => {
//     movieModel.find()
//     .then((movies) => {
//         res.send(movies)
//     })
//     .catch((err) => {
//         console.log(err);
//         res.send({message: err.message});
//     })
// })

// // Fetch by id
// app.get('/movies/:id', (req, res) => {
//     const id = req.params.id;

//     movieModel.findOne({_id: id})
//     .then((movies) => {
//         res.send(movies)
//     })
//     .catch((err) => {
//         console.log(err);
//         res.send({message: err.message});
//     })
// })

// // Delete
// app.delete('/movies/:id', (req, res) => {
//     let id = req.params.id;

//     movieModel.deleteOne({_id: id})
//     .then(() => {
//         res.send({message: 'Movie Delete'})
//     }).catch((err) => {
//         console.log(err);
//         res.send("Some Problem While deleting the movie")
//     })
// })


// // Update
// app.put('/movies/:id', (req, res) => {
//     let id = req.params.id;
//     let dataToUpdate = req.body;

//     movieModel.updateOne({_id: id}, dataToUpdate)
//     .then(() => {
//         res.send({message: 'Movie Updated'})
//     }).catch((err) => {
//         console.log(err);
//         res.send("Some Problem While updating the movie");
//     })
// })


// // Actors endpoints
// // Create Actors
// app.post("/actors", (req, res) => {
//     let actor = req.body;
//     let actorOBJ = new actorModel(actor)

//     actorOBJ.save()
//     .then(() => {
//         res.send({message: 'Actor Created'});
//     })
//     .catch((err) => {
//         console.log(err);
//         res.send({message: "Some Error while creating actor"});
//     })
// })


// //to connect movies and actors
// app.post("/movieactors", (req, res) => {
//     let movieActor = req.body;
//     let movieActorObj = new movieActorModel(movieActor)

//     movieActorObj.save()
//     .then(() => {
//         res.send(movieActorObj);
//     })
//     .catch((err) => {
//         console.log(err);
//         res.send({message: "Some Error while creating Actor In Movie"});
//     })
// })


// // To fetch
// app.get('/movieactors', (req, res) => {
//     movieActorModel.find().populate('movie_id').populate('actor_id')
//     .then((movies) => {
//         res.status(200).send(movies);
//         // res.json({"Movie Actor created"});
//     })
//     .catch((err) => {
//         console.log(err);
//         res.send({message: "Some Error while fetching movieActors"});
//     })
// })