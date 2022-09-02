// const express = require('express');
// const router = express.Router()
// router.use(express.json());
const user = require('../service/users')

const user_registration = async(req, res) => {
    try{
        const data = req.body
        const result = await user.sign_up(data.fname, data.lname, data.password, data.email , data.contact);
        res.send(result);
    }catch(err){
        res.send(err.message);
    }
}

const user_login = async (req, res) =>{
    try{
        const data = req.body
        const result = await user.login(data.email , data.password);
        res.send(result);
    }catch(err){
        res.send(err.message)
    }
}

module.exports = {user_registration , user_login}