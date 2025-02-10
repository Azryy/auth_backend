
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password : {
    type : String,
    required: true
  },

  srcode: {
    type: String,
    required: true,
    unique: true,
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  adminApproval: { 
    type: Boolean, 
    default: false 
  },

},{timestamps:true});

export default mongoose.model("User", userSchema);


