const express = require("express");
const path = require("path");
const app = express();


const PORT = 5000||process.env.PORT;

app.use(express.static(path.join(__dirname,"..","build")));//order matters, serves react app
app.use(express.static("public"));

app.get("/",(req,res)=>{
    // res.send("Hola! Youve reached your server!");
    res.sendFile(path.join(__dirname,"public","index.html"));
})

app.listen(PORT,()=>{
    console.log(`Server has started on port: ${PORT}`);
});