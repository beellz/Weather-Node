const express = require("express")
const app = express();
const https = require("https");
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {

   

    res.sendFile(__dirname + "/index.html")
     

});

app.post("/" , (req, res ) => {
    const url ="https://api.openweathermap.org/data/2.5/forecast?q="
    const city = req.body.cityName
    const appid = "&appid=cdefebdefc2001cd562f7af991ab145e&"
    const units = "units=metric"
    const urlAll = url + city + appid + units;
    


    https.get(urlAll , (response) => {
        console.log(response.statusCode);

        response.on("data",(data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.list[0].main.temp;
            const description = weatherData.list[0].weather[0].description;
            const icon = weatherData.list[0].weather[0].icon
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
            // const temp = weatherData[0].main.temp
            // const weatherData2 = JSON.stringify(weatherData);
            // console.log(weatherData2);
            // const weatherData3 = JSON.parse(weatherData2);
            // console.log(weatherData3);
            const city = weatherData.city.name
            console.log(temp, description);
            res.write(`<div class="root"> `)
            res.write(`<h1>the temperatur in ${city} is </h1> `)
            res.write(`<h1> ${temp} degree celcius and its describe as ${description}</h1>`)
            res.write(`<img src="${iconUrl}" alt="icon">`);
            res.write(`</div>`)
            res .send()
        });
    })


    
})



 app.listen(3000, () => { console.log("app is on port 3000")});