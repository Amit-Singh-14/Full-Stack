const express = require("express");
const bodyParser = require("body-parser");

//stadnard way for api request
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// const url =
//   "https://api.weatherapi.com/v1/current.json?key=182d4a7ebf034e9da37115533231506&q=London";

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  // res.send("server runnning and up.");
});

app.post("/", (req, res) => {
  const query = req.body.cityInput;
  const apiKey = "d8cb4c7a770b810358f1d265e6baef8e";
  const unit = "metric";

  console.log(query);
  const url =
    "https://api.openweathermap.org/data/2.5/weather?&appid=" +
    apiKey +
    "&q=" +
    query +
    "&units=" +
    unit +
    "";
  https.get(url, (response) => {
    // .on() method evven listern h jaisa ki data aiyaga
    // it work data hexadecimal hi form mai hoa h
    response.on("data", (data) => {
      // convert into json
      var weatherdata = JSON.parse(data);
      // console.log(weatherdata);
      var desc = weatherdata.weather[0].description;
      var icon = weatherdata.weather[0].icon;
      var temp = weatherdata.main.temp;

      var imgurl = " https://openweathermap.org/img/wn/" + icon + "@2x.png";
      // we can only have only one res.send()
      // so to send multiple data we use res.write()

      res.write("<p>The weather is currently" + desc + ".</p>");
      res.write(
        "<h1>the temperature in london is " + temp + " degree Celcius. </h1>"
      );
      res.write("<img src = " + imgurl + ">");
      res.send();
    });
  });
});

app.listen(3000, () => console.log("server runnning on port 3000"));
