// const express = require('express');
// const router = express.Router()
// router.use(express.json());
const user = require('../service/users')

const user_registration = async(req, res) => {
    try{
        const data = req.body
        const result = await user.sign_up(data.firstName, data.lastName, data.password, data.email , data.contact);
        res.status(200).send({data:result})
    }catch(err){
        res.status(400).send({data:err.message});
    }
}

const user_login = async (req, res) =>{
    try{
        const data = req.body
        const result = await user.login(data.email , data.password);
        res.status(200).send({data:result})
    }catch(err){
        res.status(400).send({data:err.message});
    }
}

module.exports = {user_registration , user_login}