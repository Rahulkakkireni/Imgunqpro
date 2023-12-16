import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import axios from 'axios';
// require('./models/user.cjs')
const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/admin")
.then(
    ()=>{console.log("connected")}
)
.catch((err)=>{console.log(err)})
const userschmea= mongoose.Schema({
    email:String,
    password:String
})
const collection = new mongoose.model('data',userschmea)

//Routes
app.get("/",(req,res)=>{
    res.send("backend")
})
app.post("/login",async(req,res)=>{
    const{email,password}=req.body;
        console.log(email);
        console.log(password)
    collection.findOne({email:email})
    .then(user =>{
         if(user){
            if(user.email===email && user.password===password){
                res.send("successful")
            }
            else{
                 res.send("failure")
            }
         }
         else{
            res.send("user not found")
         }
    })
    .catch(err=>console.log(err));   
})
// app.post("/login", async (req, res) => {
//     try {
//       // Verify reCAPTCHA response
//       const recaptchaSecretKey = 'YOUR_RECAPTCHA_SECRET_KEY'; // Replace with your actual secret key
//       const recaptchaResponse = req.body['g-recaptcha-response'];
//       const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaResponse}`;
//       const recaptchaResponseData = await axios.post(verificationURL);
  
//       if (recaptchaResponseData.data.success) {
//         // reCAPTCHA verification succeeded
//         // Continue with user authentication
//         const { email, password } = req.body;
//         console.log(email);
//         console.log(password);
  
//         collection.findOne({ email: email })
//           .then(user => {
//             if (user) {
//               if (user.email === email && user.password === password) {
//                 res.send("successful");
//               } else {
//                 res.send("failure");
//               }
//             } else {
//               res.send("user not found");
//             }
//           })
//           .catch(err => console.log(err));
//       } else {
//         // reCAPTCHA verification failed
//         res.send('reCAPTCHA verification failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error verifying reCAPTCHA:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
  
app.post("/register",async(req,res)=>{
    const{email,password}=req.body;
    console.log(email);
    console.log(password)
    collection.insertMany({email,password})

})
app.listen(3001,()=>{
     console.log("be started at port 3001")
})