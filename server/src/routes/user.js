const express = require('express')
const router = express.Router()
const user = require('../controller/userApi')

router.get('/', (req, res) =>{
    res.send('hello')
})

 //user

router.post("/user/adduser", user.user_registration)
router.post("/user/signin", user.user_login)

module.exports = router;




