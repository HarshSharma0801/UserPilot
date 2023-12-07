import mongoose from 'mongoose'


const UserSchema = mongoose.Schema({

    Owner:{type:mongoose.Schema.Types.ObjectId , ref:'Persons'},
    id: {type:Number},
    first_name: {type:String},
    last_name:{type:String},
    email: {type:String},
    gender: {type:String},
    avatar: {type:String},
    domain: {type:String},
    available: {type:Boolean},


})


const User = mongoose.model('Users' , UserSchema);


export default User