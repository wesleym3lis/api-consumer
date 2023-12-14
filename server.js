const express = require('express');
const axios = require('axios');
require("dotenv").config();

const app = express();
const port = 3000;
let apiKey = process.env.API_KEY.replace(/^"(.*)"$/,'$1');
let latitude = process.env.LAT.replace(/^"(.*)"$/,'$1');
let longitude = process.env.LON.replace(/^"(.*)"$/,'$1');

app.get("/weather" , async (req , res) =>{
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
        const cityName = response.data.name;
        const temp =  Math.floor(response.data.main.temp - 273);
        const realFeel = Math.floor(response.data.main.feels_like - 273);
        res.render("index.ejs", { cityName, temp, realFeel });
        
        console.log("Response successful!", response.status);
    } catch (error) {
        console.error("There was a problem calling weather API", error.message);
        res.status(500).send(error.message);
    }
    
} );

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });2