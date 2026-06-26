const express = require("express")
const app= express();
const session = require("express-session")
const flash=require("connect-flash");
const path= require("path")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

const sessionOptions = {
    secret: "mysupersecretsstring",
    resave:false,
    saveUninitialized:true
}
app.use(session(sessionOptions));
 app.use(flash());
 app.use((req,res,next)=>{
      res.locals.successMsg = req.flash("success")
     res.locals.errorMsg = req.flash("error")
     next();
 })
app.get("/register",(req,res)=>{
    let { name="ananymous"}=req.query
    req.session.name=name
    // req.flash("success","user registered succesfully")
    if(name==="ananymous"){
        req.flash("error","user not registered")
    }
    else{
           req.flash("success","user registered succesfully")
    }
    console.log(req.session.name);
    res.redirect("/hello")
});
app.get("/hello",(req,res)=>{
    // res.send(`hello, ${req.session.name}`)
    // console.log(req.flash("success"))
 
    res.render("page.ejs",{name:req.session.name});
})
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//     req.session.count++;
//     }
//     else{
//          req.session.count = 1
//     }
//     res.send(`you sent a request ${req.session.count} times`)
// })
// app.get("/test",(req,res)=>{
//   res.send("test successful!")
// })
// const cookieParser = require("cookie-parser")
// app.use(cookieParser("secretcode")) 
// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","india",{signed:true});
//     res.send("signed cookie sent")
// })
// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies)
//     res.send("verified")
// })

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","namaste")
//     res.cookie("madeIn","India")
//     res.send("sent you some cookies")
// })
// app.get("/greet",(req,res)=>{
//     let {name = "annanya"} = req.cookies
//     res.send(`hi , ${name}`)
// })
// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi, I am root")
// });
app.listen(3000,()=>{
    console.log("server is listening toport 3000")
})