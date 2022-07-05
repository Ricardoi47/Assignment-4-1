
const validator = require('validator')
const express = require('express')
const {response} =require('express')
const app = express()
const bodyParser= require('body-parser')
const base= `${__dirname}/public`
const port=8080

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/iServiceDB',{useNewUrlParser:true})
const db = mongoose.connection;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.listen(8080,(req,res)=>{
    console.log('Server on port 8080')
})


//schema
const userSchema = new mongoose.Schema({
    country:{
        type:String,
        require: [true,'Must select a Country']
    },
    fname: {
        type: String,
        minlength:[2,'First Name must have 2 or more characters'],
        required: [true, 'Please Enter a First Name']
    },
    lname:{
        type:String,
        minlength:[2,'Last Name must have 2 or more characters'],
        required: [true, 'Please Enter a Last Name']
    },
    email:{
        type:String,lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw  new Error("Email is not valid")
            }
        }
    },
    password: {
        type: String,
        minlength: [8,'Password must have 8 Characters or more']
    },
    passwordrepeat: {
        type:String,
        validate(value){
            if(!validator.equals(value,this.password)){
                throw new Error('ERROR Passwords do not match')
            }
        }
    },
    address: {
        type:String,
        required:[true,'Please Enter your Address']
    },
    addressline2:String,
    city: {
        type:String,
        required: [true,'Please enter your city']
    },
    state: {
        type:String,
        required: [true,'Please enter your State']
    },
    zip:Number,
    pnumber:Number
})
const User = mongoose.model('User',userSchema)


app.post('/' ,(req, res) =>{
    const NewUser = new User({
      country:req.body.country,
      fname:req.body.fname,
      lname:req.body.lname,
      email:req.body.email,
      password:req.body.password,
      passwordrepeat:req.body.passwordrepeat,
      address:req.body.address,
      city:req.body.city,
      state:req.body.state,
      zip:req.body.zip,
      pnumber:req.body.pnumber
    })

    NewUser.save((err)=>{
        if(err)
        {console.log(err)}
        else
        {console.log("successfully saved")}
    })
})


