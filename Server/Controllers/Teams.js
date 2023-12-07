import express from 'express'
import Team from '../Modals/Team.js'
import Person from '../Modals/Person.js'
import AuthenticateToken from '../Middleware/AuthenticateToken.js'




const Teams = express();


Teams.post('/createteam' , AuthenticateToken , async(req,res)=>{
      
    try {
        const TeamName = req.body.name;
        const CreaterId = req.user.ExistingUser._id;
        const count = await Team.countDocuments({}) + 1;
        const InitialTeamData = {
            id:count,
            Creater:CreaterId,
            TeamName:TeamName,
            TotalUsers:'0',
            Users:[]
        }
        await Person.findOneAndUpdate({_id:CreaterId} , {hasTeam:true});
        await Team.create(InitialTeamData);
        
        res.status(200).json({valid:true});
    } catch (error) {
        console.log(error);
    }



})


Teams.post('/maketeam' , AuthenticateToken , async(req,res)=>{
    
    try {
        const CreaterId = req.user.ExistingUser._id;
     
     

        await Team.findOneAndUpdate({ Creater:CreaterId },
            { $set: {  TotalUsers:req.body.totalmembers ,
            Users: req.body.members, } },
            { sort: { _id: -1 }})
        await Person.findOneAndUpdate({_id:CreaterId} , {hasTeam:false});
        res.status(200).json({valid:true});

        
    } catch (error) {
        console.log(error);
    }
     

})


Teams.get('/getTeams' , async(req,res)=>{

  try {
    const teams = await Team.find({});
    res.status(200).json({valid:true , teams:teams});
    
  } catch (error) {
    console.log(error)
  }

})


export default Teams


