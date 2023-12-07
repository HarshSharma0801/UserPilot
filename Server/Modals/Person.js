import mongoose from "mongoose";

const PersonSchema = mongoose.Schema({


  username: { type: String },
  email: { type: String },
  password: { type: String },
  hasTeam: { type: Boolean },

  
});

const Person = mongoose.model("Persons", PersonSchema);

export default Person;
