const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const nodemailer = require('nodemailer');
const mongoose=require("mongoose");


mongoose.set("strictQuery",true);
mongoose
  .connect("mongodb://127.0.0.1:27017/TestDB")
  .then(()=>console.log("connected to teh database server at port 27017 !!!"));







const app = express()

app.set('view engine', 'ejs');


let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "manishmeher745@gmail.com",
    pass: "dewtyhyrpgpagskd",
  },
});


const UserSchema={
  email:{
    type:String,
    unique:true
  },
  password:String
}

const User=mongoose.model("User",UserSchema);




app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

function createotp(){
  const otp = Math.floor(Math.random() *100000);
  return otp;
}


app.get('/login', function (req, res) {
  res.render('login');
  
})
app.get("/signup",function(req,res){
  res.render("signup")
})


const otp=createotp();
app.post('/otp', function (req, res) {
  const user = req.body.email;
  const pass = req.body.password;

  const newUser=User({
    email:user,
    password:pass
  });

  console.log(user);
  console.log("password is " + pass);

  newotp=createotp();
  console.log(newotp);
  
  let mailDetail1 = {
    from: "manishmeher745@gmail.com",
    to: user,
    subject: "complaint Registered",
    text: `this is the OTP for account login in this portal OTP:${newotp} . Do not share your otp with other!!!`,
  };
  mailTransporter.sendMail(mailDetail1, (err) => {
    if (err) {
      console.log(`error at mail detail is : ${err}`);
    } else {
      console.log("Email sent successfully");
      newUser.save();
      res.render("/profile");
    }
  });

  res.render('otpveify')

})

app.get("/",function(req,res){
  res.render("flipkart")
})

app.get('/flipkart', function (req, res) {
  res.render('flipkart');
})
//code for shoes
app.get('/j1', function (req, res) {
  res.render('j1');
})
app.get('/j2', function (req, res) {
  res.render('j2');
})
app.get('/j3', function (req, res) {
  res.render('j3');
})
app.get('/j4', function (req, res) {
  res.render('j4');
})
app.get('/j5', function (req, res) {
  res.render('j5');
});



//code for t shirt
app.get('/l1', function (req, res) {
  res.render('l1');
})
app.get('/l2', function (req, res) {
  res.render('l2');
})
app.get('/l3', function (req, res) {
  res.render('l3');
})
app.get('/l4', function (req, res) {
  res.render('l4');
})
app.get('/l5', function (req, res) {
  res.render('l5');
})

//code for mobile
app.get('/m1', function (req, res) {
  res.render('m1');
})

app.get('/m2', function (req, res) {
  res.render('m2');
})

app.get('/m3', function (req, res) {
  res.render('m3');
})

app.get('/m4', function (req, res) {
  res.render('m4');
})

app.get('/m5', function (req, res) {
  res.render('m5');
})


//code for bag
app.get('/s1', function (req, res) {
  res.render('s1');
})

app.get('/s2', function (req, res) {
  res.render('s2');
})

app.get('/s3', function (req, res) {
  res.render('s3');
})

app.get('/s4', function (req, res) {
  res.render('s4');
})

app.get('/s5', function (req, res) {
  res.render('s5');
})

//code for toy
app.get('/t', function (req, res) {
  res.render('t');
})

app.get('/t1', function (req, res) {
  res.render('t1');
})

app.get('/t2', function (req, res) {
  res.render('t2');
})

app.get('/t3', function (req, res) {
  res.render('t3');
})

app.get('/t4', function (req, res) {
  res.render('t4');
})

//code for earphone
app.get('/k1', function (req, res) {
  res.render('k1');
})

app.get('/k2', function (req, res) {
  res.render('k2');
})

app.get('/k3', function (req, res) {
  res.render('k3');
})

app.get('/k4', function (req, res) {
  res.render('k4');
})

app.get('/k5', function (req, res) {
  res.render('k5');
})

app.post("/otpverify",function(req,res){
  let cotp=req.body.eotp
  if(cotp=newotp){
    res.render('flipkart');

  }
})





app.listen(3000, function () {
  console.log("server started on port no 3000")
})

