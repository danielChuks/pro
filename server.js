const express = require('express'); 
const bodyParser = require("body-parser");
const cors  = require("cors");
const knex  = require("knex");
const bcrypt = require("bcrypt");
const register = require("./controllers/register")
const signin = require("./controllers/signin");
const profileid = require("./controllers/profileid");
const image = require("./controllers/image");




const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : '5432',
    user : 'postgres',
    password : '781227',
    database : 'smartbrain'
  }
});



const app = express();
const PORT = 4000;


//this code tells bodyParser about urlencoded....
app.use(bodyParser.urlencoded({ extended: false }));

//this code tells bodyParser about req.body....
app.use(bodyParser.json());

app.use(cors());


app.get('/', (req, res) => {
    res.json(dataBase.users)
})

//Signin ......
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt)});

//Register.... posting a new user from the front end... 
app.post('/register', (req, res) => { register.handleRegister( req, res, db, bcrypt )});


//This code will get the user id by looping though each users...
//This code is looping through the id to find a match and once that is done
//Found becames true and we exit the loop....................
app.get('/profile/:id', (req, res) => { profileid.profileId(req, res ) });
        

//this code take coounts of how many image entries the user has made.
app.put('/image', (req, res) => { image.imageHandle( req, res, db )});
     


app.listen((PORT), console.log(`app is running on localhost ${PORT}`))