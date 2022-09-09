const express = require('express');
const cors = require('cors')
// const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8000;


// const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')

app.use(express.json());
app.use(cors({
    origin : ['http://localhost:3000'] , credentials: true
}))
// app.use('/api', indexRouter)
app.use('/api' , userRouter)
app.use('/api', productRouter)
app.use('/api' , cartRouter)
app.use('/api', orderRouter)

app.get("/", async(req, res) => {
    res.send("Hello!, This is from root API")
})
app.listen(PORT, (err) =>{
    if (err){
        return console.log("ERROR", err);
    }else{
        console.log("Server Started on port:" + PORT);
    }   
}); 