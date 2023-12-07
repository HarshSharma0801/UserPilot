import mongoose from "mongoose";

const TeamSchema = mongoose.Schema({

    id:{type:String},
    Creater:{type:mongoose.Schema.Types.ObjectId , ref:'Persons'},
    TeamName:{type:String},
    TotalUsers:{type:String},
    Users:[]


  
});

const Team = mongoose.model("Teams", TeamSchema);

export default Team;
