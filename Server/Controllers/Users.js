import express from "express";
import User from "../Modals/User.js";
import AuthenticateToken from '../Middleware/AuthenticateToken.js'

const Users = express();

Users.get("/users", async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 20;
    const UsersSkip = (page - 1) * 20;
    const DisplayUsers = await User.find().skip(UsersSkip).limit(20);
    const TotalUsers = await User.countDocuments();
    res
      .status(200)
      .json({
        DisplayUsers: DisplayUsers,
        TotalUsers: TotalUsers,
        page: page,
        limit: limit,
      });
  } catch (error) {
    console.log(error);
  }
});

Users.get("/users/search", async (req, res) => {
  try {
    const search = req.query.Search;
    const RegularExpression = new RegExp("^" + search);

    const key = {
      $or: [
        { first_name: { $regex: RegularExpression, $options: "i" } },
        { last_name: { $regex: RegularExpression, $options: "i" } },
      ],
    };

    const users = await User.find(key);

    res.status(200).json({ valid: true, users: users });
  } catch (error) {
    console.log(error);
  }
});

Users.get("/user/filtered", async (req, res) => {
  try {
    const Filter = req.query.filters;
    const query = [];
    if (Filter.available != "") {
      if (Filter.available == "true") {
        query.push({available:Boolean(true)})
      } else {
        query.push({available:Boolean(false)})
    }
    }

    if (Filter.domain != "") {
      query.push({domain : { $regex: new RegExp("^" + Filter.domain, "i") }})
    }

    if (Filter.gender != "") {
      query.push({gender:{ $regex: new RegExp("^" + Filter.gender, "i") }})
    }
 
     if(query.length>1){
        const finalQuery = { $and: query };

        const DisplayUsers = await User.find(finalQuery);
        res.status(200).json({ valid: true , users:DisplayUsers });

     }
     else if(query.length===1){
        const DisplayUsers = await User.find(query[0]);

        res.status(200).json({ valid: true , users:DisplayUsers });

     }
     else{
        res.status(200).json({ valid: false });

     }

  } catch (error) {
    console.log(error);
  }
});



Users.post('/adduser' , AuthenticateToken , async(req,res)=>{

   
  try {

    const OwnerId = req.user.ExistingUser._id;

    const {first_name, last_name,email,gender,avatar,domain} = req.body;
        const count = await User.countDocuments({}) + 1;

    const data = {
      Owner:OwnerId,
      id: count,
      first_name:first_name ,
      last_name:last_name,
      email: email,
      gender: gender,
      avatar: avatar,
      domain: domain,
      available: true,
    }


    await User.create(data);

    res.status(200).json({valid:true});
    

  } catch (error) {
    console.log(error)
  }


})



Users.get('/yourusers' , AuthenticateToken , async(req,res)=>{

    
  try {
    const Owner = req.user.ExistingUser._id;
    const users = await User.find({Owner:Owner});

    res.status(200).json({valid:true , users:users});
    
  } catch (error) {
    
  }


})

Users.get('/getuserid/:id' , async(req,res)=>{

    
  try {
    const id = req.params.id;
    const user = await User.findOne({_id:id});

    res.status(200).json({valid:true , user:user});
    
  } catch (error) {
    
  }


})


Users.post('/updateid/:id', AuthenticateToken , async(req,res)=>{

    
  try {
    const Owner = req.user.ExistingUser._id;
    const id = req.params.id;
    const data = req.body;
    const user = await User.findOne({_id:id});
    // console.log(user)
    const UpdatedUser = {
      Owner:Owner,
      id: user.id,
      first_name: data.first_name,
      last_name:data.last_name,
      email: data.email,
      gender:data.gender,
      avatar: data.avatar,
      domain: data.domain,
      available: data.available,
    };
    // console.log(UpdatedUser)
    await User.findOneAndUpdate({_id:id} , UpdatedUser);

    res.status(200).json({valid:true});
    
  } catch (error) {
    
  }


})



Users.post('/deleteuser' , async(req,res)=>{

    
  try {
    const id = req.body.id;
   await User.findOneAndDelete({_id:id});

    res.status(200).json({valid:true});
    
  } catch (error) {
    console.log(error)
  }


})
export default Users;
