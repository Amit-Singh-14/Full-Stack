const express = require("express")

const app = express();

app.get("/", (req, res) => {
    res.send("<h1> hwllo world!</h1>")
})

app.get("/contact", (req, res) => {
    res.send("<h1> email: amitasdf246@gmail.com</h1>")
})

app.listen(3000 , function(){
    console.log("server stated at 3000");
});
