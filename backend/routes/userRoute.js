import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

//create
router.post('/',async(req,res)=>{
    const {name,email,age} = await req.body;
    try{
        const user = await User.create({name,email,age});
        res.status(201).json(user);
    }catch(error){
        res.status(400).json(error.message);
    }
})

//read
router.get("/", async(req, res) => {
    const users = await User.find({});
    res.send(users);
});

//get single user
router.get('/:id',async(req,res)=>{
    const user = await User.findById({_id:req.params.id});
    res.send(user);
})

//deleting a single user
router.delete('/:id',async(req,res)=>{
    const user = await User.findByIdAndDelete({_id:req.params.id});
    res.send({message: ' User Deleted Succesfully'});
})

//updating the attributes of a single user 
router.patch('/:id',async(req,res)=>{
    const body = await req.body;
    const user = await User.findByIdAndUpdate({_id:req.params.id},body,{new :true});

    res.send({message: ' User Updated Succesfully',user});
})

export default router;