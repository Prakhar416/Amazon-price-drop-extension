const express = require('express')
const mongoose = require('mongoose');
const config = require('./config.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 3000;
const app = express()
const user = require('./routes/user.js')


require('./config');

  
app.use(bodyParser.urlencoded({ extended: true }));
// shorter way for the above code. It is a middleware which parses request's body into js objects.
// middlewares are executed for all urls in the beginning

mongoose.connect("mongodb+srv://adminpanel:1234567890@cluster0.zihy0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ,{ useNewUrlParser: true ,useUnifiedTopology: true}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.get('/', (req,res)=>{
    res.send("Hi")
})

app.post('/products', cors(), (req,res)=>{
    console.log(req.body.testData);
   
    resp={
        data: "Hi i am the response from the server."
    }
    res.json(resp);
})

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
 app.use("/user", cors(), user);
 

app.listen(PORT,console.log(`Server is listening to port ${PORT}`));