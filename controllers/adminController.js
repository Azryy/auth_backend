import express from "express";
import User from "../models/userModel.js";


export const handlingAccounts = async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: "pending" });
    res.status(200).json(pendingUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching pending registrations" });
  }
};

//admin approves the application
export const approveAccount = async (req, res) => {
  try {
    const { id } = req.params;

    //find the user by id and update the status
    const user = await User.findByIdAndUpdate(
      id,
      {
        status: "approved",
        adminApproval: true,
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Congrats your account is approved", user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error approving user", error: error.message });
  }
};

export const validAccount = async (req,res) => {
    try {
       
        const getApprove = await User.find({status:"approved"})
        if(!getApprove){
            res.status(400).json({message:"Account not approve"})
        }
        res.status(200).json({message:"You successfully get the approve accounts",getApprove})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error getting the approve accounts"})
        
    }
}


//admin rejects a registration
    export const rejectAccount = async(req,res) => {
        try {
            const {id} = req.params
            const user = await findByIdAndUpdate(id,{
                status:"rejected"
            },{new:true})

            if (!user) {
                res.status(404).json({ message: "User not found" });
              }

              res.status(200).json({ message: 'User rejected successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Error rejecting user', error: error.message });
        }
    }
