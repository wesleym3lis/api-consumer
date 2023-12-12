const express = require('express');
const axios = require('axios');
require("dotenv").config();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "API Response." });
  });

app.get("/weather" , async (req , res) =>{
    try{
        //TODO: add parametros como variavel de ambiente
        const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=-22.7699481&lon=-43.4217085&appid=6cc78c07724450b966c29e7ed9606026");
        const cityName = response.data.name;
        const temp =  Math.floor(response.data.main.temp - 273);
        const realFeel = Math.floor(response.data.main.feels_like - 273);
        res.render("index.ejs", { cityName, temp, realFeel });
        //retorna temperatura em Kelvin
        console.log("Response successful!", response.status);
    } catch (error) {
        console.error("There was a problem calling weather API", error.message);
        res.status(500).send(error.message);
    }
    
} );

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });2