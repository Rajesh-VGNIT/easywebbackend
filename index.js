// import express from "express"
// import cors from "cors"
// import mongoose from "mongoose"

// const app = express()
// app.use(express.json())
// app.use(express.urlencoded())
// app.use(cors())

// mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }, () => {
//     console.log("DB connected")
// })

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// })

// const User = new mongoose.model("User", userSchema)

// //Routes
// app.post("/login", (req, res)=> {
//     const { email, password} = req.body
//     User.findOne({ email: email}, (err, user) => {
//         if(user){
//             if(password === user.password ) {
//                 res.send({message: "Login Successfull", user: user})
//             } else {
//                 res.send({ message: "Password didn't match"})
//             }
//         } else {
//             res.send({message: "User not registered"})
//         }
//     })
// })

// app.post("/register", (req, res)=> {
//     const { name, email, password} = req.body
//     User.findOne({email: email}, (err, user) => {
//         if(user){
//             res.send({message: "User already registerd"})
//         } else {
//             const user = new User({
//                 name,
//                 email,
//                 password
//             })
//             user.save(err => {
//                 if(err) {
//                     res.send(err)
//                 } else {
//                     res.send( { message: "Successfully Registered, Please login now." })
//                 }
//             })
//         }
//     })

// })

// app.listen(5001,() => {
//     console.log("BE started at port 5001")
// })

// const express = require("express");
// const path = require("path");
// const app = express();
// const port = process.env.PORT || 5003

// const static_path = path.join(__dirname, "../public");
// app.use(express.static(static_path));

// app.post("/register", (req, res)=> {
//         const { name, email, password} = req.body
//         User.findOne({email: email}, (err, user) => {
//             if(user){
//                 res.send({message: "User already registerd"})
//             } else {
//                 const user = new User({
//                     name,
//                     email,
//                     password
//                 })
//                 user.save(err => {
//                     if(err) {
//                         res.send(err)
//                     } else {
//                         res.send( { message: "Successfully Registered, Please login now." })
//                     }
//                 })
//             }

//         })

//     })

// app.get("/about", (req, res) => {
//     res.send("Welcome")
// });

// app.get("/weather", (req, res) => {
//     res.send("Welcome to my new weather page")
// });

// app.get("*", (req, res) => {
//     res.send("404 error page opps")
// });

// app.listen(port, () => {
//     console.log(`listening to the port at ${port}`)
// });

// new connection db
require('dotenv').config()
const express = require("express");
// const config = require("./db/config");
const User = require("./db/User");

const path = require("path");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const mongoose = require('./db/config')
// const mongoose = require('mongoose')

const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm';
// const mongoose = require('mongoose')
// const DB = "mongodb://127.0.0.1:27017/e-commerce";
// try {
//   mongoose.connect(DB)
//   console.log('mongodb is connected')

// } catch (error) {
//   console.log('mongodb is not connected', error)
// }


const app = express();

app.use(express.json());
app.use(cors());

const static_path = path.join(__dirname, "../public");
app.use(express.static(static_path));

// register form
app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password
  Jwt.sign({ result }, jwtKey, { expiresIn: "30m" }, (err, token) => {
    if (err) {
      resp.send({ result: "something went wrong, Please try after sometime" });
    }
    resp.send({ result, auth: token });
  })
});
// login form
app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "30m" }, (err, token) => {
        if (err) {
          resp.send({ result: "something went wrong, Please try after sometime" });
        }
        resp.send({ user, auth: token });
      })
    } else {
      resp.send({ result: "No User Found" });
    }
  } else {
    resp.send({ result: "No User Found" });
  }
});

app.listen(PORT, () => {
  console.log(`listening to the port at ${PORT}`);
});
