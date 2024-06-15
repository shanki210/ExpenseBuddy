import asyncHandler from 'express-async-handler'
import User from '../models/user.model.js'
import { generateToken } from '../utils/config.js';

export const register = asyncHandler(async (req,res)=>{
    const {name,email,password,image} = req.body;
    //check if user exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
        image
    })

    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

export const login = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user&&(await user.matchPassword(password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

export const getUser = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            image: user.image
        })
    }else{
        res.status(401)
        throw new Error('User not found')
    }
})