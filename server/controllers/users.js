import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

import UserModel from '../models/user.js';


export const signin = async(req, res) => {
  const {email, password} = req.body;
  try {
    //findOne(): MongoDB
    const existingUser = await UserModel.findOne({email});
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password); //check a password
    //if the user doesn't exist
    if(!existingUser){
      return res.status(404).json({message: "User doesn't exist"})
    }

    if(!isPasswordCorrect){
      return res.status(400).json({message: "Invalid password or email"})
    }

    const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', {expiresIn: "1h"})
    res.status(200).json({result: existingUser, token});

  } catch (error) {
    res.status(500).json({message: 'Something went wrong'})
  }
}

export const signup = async(req, res) => {
  const { email, password, firstName, lastName } = req.body;
  console.log(req)

  try {
    const existingUser = await UserModel.findOne({ email });

      if(existingUser){
        return res.status(400).json({message: "User already exist"});
      }

      const hashedPassword = await bcrypt.hash(password, 12); //12: length
      //create user info 
      const result = await UserModel.create({email, password: hashedPassword, name : `${firstName} ${lastName} `});
    

      const token = jwt.sign({ email: result.email, id: result._id }, 'test', {expiresIn: "1h"} );
      
      res.status(201).json({result, token});
      
  } catch (error) {
    res.status(500).json({message: 'Something went wrong'});
    console.log(error);
  }
}