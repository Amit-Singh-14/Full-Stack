const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { url } = require("inspector");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// static file jo h usno access kr paiye
// like css and images

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const firstname = req.body.firstname;
  const secondname = req.body.secondname;
  const email = req.body.email;

  var data = {
    member: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: secondname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "";
  https.request(url, optio);
});

app.listen(3000, () => {
  console.log("server runnning on port 3000.");
});

// api key
// a4a6b73173561fb6cec2834e6388cc8d-us21
// audiance id
// fdb03abd1d
