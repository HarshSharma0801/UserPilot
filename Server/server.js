import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import Persons from './Controllers/Persons.js'
import Users from './Controllers/Users.js'
import Teams from './Controllers/Teams.js'

const app = express();

const PORT = process.env.PORT || 3000;

//Some Boiler Plate
app.use(express.json({
  limit: '50mb'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


//db
mongoose.connect(process.env.Mongo_ConnectionString);
  
  const db = mongoose.connection;
  db.on("error", function () {
    console.log("Error Connecting");
  });
  
  
  db.on("open", function () {
    console.log("Successfull Connected to Database ");
  });



//Routes
app.use(Persons);
app.use(Users);
app.use(Teams);



  app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`)
})