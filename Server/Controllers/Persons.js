import express from "express";
import Person from "../Modals/Person.js";
import jwt from "jsonwebtoken";
import AuthenticateToken from "../Middleware/AuthenticateToken.js";

const accessKey = process.env.JWTACCESS;

const Persons = express();

Persons.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const data = {
      username: username,
      email: email,
      password: password,
      hasTeam:false
    };
    const UniquePerson = await Person.findOne({ username: username });
    const CheckPerson = await Person.findOne({ email: email });

    if (UniquePerson || CheckPerson) {
      res
        .status(200)
        .json({ msg: "try dfferent Username or email", valid: false });
    } else {
       const ExistingUser = await Person.create(data);
      const accessToken = jwt.sign({ ExistingUser }, accessKey, { expiresIn: "2d" });
      console.log("User Added");
      res
        .status(200)
        .json({ access: accessToken, valid: true, PersonInfo: ExistingUser });
    }
  } catch (error) {
    console.log(error);
  }
});

Persons.post("/login", async (req, res) => {
  const { username, password } = req.body;

  
  try {
    const ExistingUser = await Person.findOne({ password: password , username:username });

    if (!ExistingUser) {
      res.status(200).json({ valid: false });
    } else {
      const accessToken = jwt.sign({ ExistingUser }, accessKey, {expiresIn: "2d", });
      res.status(200).json({ access: accessToken, valid: true, PersonInfo: ExistingUser });
    }
  } catch (error) {
    console.log(error);
  }
});

Persons.get("/Token", AuthenticateToken, async(req, res) => {
  const TokenData = req.user;
  res.status(200).json(TokenData);
});


Persons.get("/hasteam", AuthenticateToken, async(req, res) => {
  const id = req.user.ExistingUser._id;
  const data = await Person.findOne({_id:id});

  
  res.status(200).json({valid:true, isTeam:data.hasTeam});
});

export default Persons;
