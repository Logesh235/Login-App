const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/models')

const app = express()
app.use(express.json())
app.use(cors())
const db_err = "";
mongoose.connect('mongodb+srv://admin:admin@mern.bwds09g.mongodb.net/?retryWrites=true&w=majority&appName=MERN').then(result=>{console.log("DB Connected")}).catch(err=>db_err)
console.log()

app.post("/register",(req,res)=>{
    UserModel.create(req.body)
    .then((result)=>res.json(result))
    .catch((err)=>{
        res.status(500)
        res.json(err)});
})

app.post("/login",(req,res)=>{
    const {email,password} = req.body;
    UserModel.findOne({email : email })
    .then(user=>{
        if(user){
            if(user.password === password){
                res.json("Success")
            }
            else{{
                res.json("Invaild credentials")
            }}
        }
        else{
            res.json("You`re not registered user")
        }
    })
})

app.listen(3001,()=>{
    console.log("Server Listening at 3001")
})