const express = require('express')

const Testrouter = express.Router()
const app = express()
const bodyParser = require('body-parser')


app.use('/' , Testrouter)
app.use(bodyParser.json())
// app.use(express.json())

app.post('/api/product/:key' , (req,res) => {
    const param = req.params.key
    const data = req.body
    console.log(req.body);
    res.send('working fine change perform' + data + param)
})

app.listen(5432 , console.log("wroking on port 5432"))
